import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbService } from 'src/db/db.service';
import { Client as StytchClient, envs, StytchError } from "stytch";
import { AuthenticateEmailOtpDto, AuthenticatePhoneOtpDto, EmailRegisterDto, PhoneRegisterDto } from './dto';

@Injectable()
export class AuthService extends StytchClient {
    constructor(config: ConfigService, private db_service: DbService) {
        super({
            project_id: config.get('STYTCH_PROJECT_ID'),
            secret: config.get('STYTCH_PROJECT_SECRET'),
            env: config.get("ENV") === "PRODUCTION" ? envs.live : envs.test
        })
    }

    async email_register(data: EmailRegisterDto) {
        try {
            // create user on stytch and send an email with an otp
            const stytch_response = await this.otps.email.loginOrCreate({
                expiration_minutes: 5,
                ...data
            });

            //  create user in db with stytch id
            const user = await this.db_service.user.create({
                data: {
                    email: data.email,
                    stytch_user_id: stytch_response.user_id,
                    stytch_auth_id: stytch_response.email_id
                }
            });

            return user;
        } catch (error) {
            throw error
        }
    }

    async phone_register(data: PhoneRegisterDto) {
        try {
            // create user on stytch and send an sms with an otp
            const stytch_response = await this.otps.sms.loginOrCreate({
                phone_number: data.phone,
                expiration_minutes: 5
            });

            //  create user in db with stytch id
            const user = await this.db_service.user.create({
                data: {
                    phone: data.phone,
                    stytch_user_id: stytch_response.user_id,
                    stytch_auth_id: stytch_response.phone_id
                }
            });

            return user;
        } catch (error) {
            throw error
        }
    }

    async email_register_confirm(data: AuthenticateEmailOtpDto) {
        try {
            // get user with email
            const user = await this.db_service.user.findUnique({
                where: {
                    email: data.email
                }
            })

            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }

            if (user.verified_email) {
                throw new BadRequestException('Email already verified');
            }

            // authenticate the otp given with stytch
            const stytch_reponse = await this.otps.authenticate({
                method_id: user.stytch_auth_id,
                code: data.code
            });

            // update user verified status
            await this.db_service.user.update({
                where: {
                    id: user.id
                },
                data: {
                    verified_email: true
                }
            })

        } catch (error) {
            if (error instanceof StytchError) {
                throw new BadRequestException(JSON.parse(error.message).error_message);
            }

            throw error;
        }
    }

    async phone_register_confirm(data: AuthenticatePhoneOtpDto) {
        try {
            // get user with phone
            const user = await this.db_service.user.findUnique({
                where: {
                    phone: data.phone
                }
            })

            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }

            if (user.verified_phone) {
                throw new BadRequestException('Phone number already verified');
            }

            // authenticate the otp given with stytch
            const stytch_reponse = await this.otps.authenticate({
                method_id: user.stytch_auth_id,
                code: data.code
            });

            // update user verified status
            await this.db_service.user.update({
                where: {
                    id: user.id
                },
                data: {
                    verified_phone: true
                }
            })

        } catch (error) {
            if (error instanceof StytchError) {
                throw new BadRequestException(JSON.parse(error.message).error_message);
            }

            throw error;
        }
    }


}
