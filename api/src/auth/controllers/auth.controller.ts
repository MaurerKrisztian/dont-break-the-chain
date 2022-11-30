import { Body, Req, Controller, Env, Post, UnauthorizedError, Request, BadRequestError } from 'bonfire-rest';
import { LoginDto } from '../dto/login.dto';
import { IPayload, JwtAuthService } from '../auth.middleware';
import { UserModel } from '../../users/schema/user.schema';
import { RegisterDto } from '../dto/register.dto';

@Controller()
export class AuthController {
    constructor(private readonly jwtAuthService: JwtAuthService) {}

    @Post('login')
    async login(@Body() body: LoginDto, @Req() req: Request & { user: IPayload }) {
        const user = await UserModel.findOne({ email: body.email, password: body.password });
        if (!user) {
            throw new UnauthorizedError('Wrong username/password');
        }
        const resp = {
            token: this.jwtAuthService.tokenProvider(Env.asString('SECRET', 'secret'), {
                roles: ['user'],
                userId: user._id.toString(),
            }),
        };
        return resp;
    }

    @Post('register')
    async register(@Body() data: RegisterDto) {
        if (data.password !== data.password2) {
            throw new BadRequestError('Password is not the same.');
        }
        return UserModel.create({ email: data.email, username: data.username, password: data.password }); // todo encrypt
    }
}
