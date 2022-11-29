import { IsEmail, IsString } from 'bonfire-rest';
import { IUser } from '../interfaces/user.interface';

export class UserCreateDto implements IUser {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    password2: string;
}

export class User implements IUser {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string;
}
