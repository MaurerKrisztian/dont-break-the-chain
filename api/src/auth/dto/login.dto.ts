import { IsString } from 'bonfire-rest';

export class LoginDto {
    @IsString()
    email: string;

    @IsString()
    password: string;
}
