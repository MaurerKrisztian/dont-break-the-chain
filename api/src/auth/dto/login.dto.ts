import { IsString } from 'bonfire-rest';

export class LoginDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
}
