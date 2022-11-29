import { Body, Req, Controller, Env, Post, UnauthorizedError, Request } from 'bonfire-rest';
import { LoginDto } from '../dto/login.dto';
import { IPayload, JwtAuthService } from '../auth.middleware';
import { UserModel } from '../../users/schema/user.schema';

@Controller()
export class AuthController {
    constructor(private readonly jwtAuthService: JwtAuthService) {}

    @Post('login')
    async login(@Body() body: LoginDto, @Req() req: Request & { user: IPayload }) {
        const user = await UserModel.findOne({ username: body.username, password: body.password });
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
}
