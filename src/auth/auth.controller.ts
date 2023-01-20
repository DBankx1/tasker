import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateEmailOtpDto, AuthenticatePhoneOtpDto, EmailAuthDto, PhoneAuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private auth_service: AuthService) { }

    // Endpoint for email registration
    @Post('/register/email')
    email_register(@Body() data: EmailAuthDto) {
        return this.auth_service.email_register(data);
    }

    // Endpoint for phone registration
    @Post('/register/phone')
    phone_register(@Body() data: PhoneAuthDto) {
        return this.auth_service.phone_register(data);
    }

    // Endpoint for email confirmation with otp code
    @Post('/email/confirm')
    email_register_confirm(@Body() data: AuthenticateEmailOtpDto) {
        return this.auth_service.email_auth_confirm(data);
    }

    // Endpoint for phone confirmation with otp code
    @Post('/phone/confirm')
    phone_register_confirm(@Body() data: AuthenticatePhoneOtpDto) {
        return this.auth_service.phone_auth_confirm(data);
    }

    // Endpoint for email login with otp code
    @Post('/login/email')
    email_login(@Body() data: EmailAuthDto) {
        return this.auth_service.email_login(data);
    }

    // Endpoint for phone login with otp code
    @Post('/login/phone')
    phone_login(@Body() data: PhoneAuthDto) {
        return this.auth_service.phone_login(data);
    }
}
