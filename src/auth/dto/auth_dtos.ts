import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, Length, MinLength } from "class-validator";

export class EmailAuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class PhoneAuthDto {
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;
}

export class AuthenticatePhoneOtpDto {
    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @Length(6, 6)
    code: string;
}

export class AuthenticateEmailOtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @Length(6, 6)
    code: string;
}
