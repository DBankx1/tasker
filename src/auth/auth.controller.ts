import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateEmailOtpDto, AuthenticatePhoneOtpDto, EmailRegisterDto, PhoneRegisterDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private auth_service: AuthService) { }

    // Endpoint for email registration
    @Post('/register/email')
    email_register(@Body() data: EmailRegisterDto) {
        return this.auth_service.email_register(data);
    }

    // Endpoint for phone registration
    @Post('/register/phone')
    phone_register(@Body() data: PhoneRegisterDto) {
        return this.auth_service.phone_register(data);
    }

    // Endpoint for email registeration confirmation with otp code
    @Post('/register/email/confirm')
    email_register_confirm(@Body() data: AuthenticateEmailOtpDto) {
        return this.auth_service.email_register_confirm(data);
    }

    // Endpoint for phone registeration confirmation with otp code
    @Post('/register/phone/confirm')
    phone_register_confirm(@Body() data: AuthenticatePhoneOtpDto) {
        return this.auth_service.phone_register_confirm(data);
    }
}
