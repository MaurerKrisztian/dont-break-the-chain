import { IsEmail, IsString } from 'bonfire-rest';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    password2: string;
}
