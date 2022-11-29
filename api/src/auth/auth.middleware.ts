import { IMiddleware } from 'bonfire-rest/middleware/middleware.interface';
import e from 'express';
import * as jwt from 'jsonwebtoken';
import { Env, Injectable, UnauthorizedError } from 'bonfire-rest';

export interface IPayload {
    roles: string[];
    userId: string;
}

@Injectable({ instantiation: 'singleton' })
export class JwtAuthService {
    requestHandler(
        req: e.Request & { user: IPayload },
        res: e.Response,
        isBearer: boolean,
        privateKey: string = 'key',
    ) {
        const authentication: string = req.headers['authentication'] as string;
        if (!authentication) {
            return;
        }
        const token = isBearer ? authentication.split(' ')[1] : authentication;
        if (!token) {
            return;
        }
        const content: IPayload = jwt.verify(token, privateKey) as IPayload;
        req['user'] = content;
    }

    tokenProvider<P extends string | object | Buffer>(privateKey: string, payload: P & IPayload): string {
        return jwt.sign(payload, privateKey);
    }
}

@Injectable({ instantiation: 'singleton' })
export class JwtMiddleware implements IMiddleware {
    constructor(private readonly jwtAuthService: JwtAuthService) {}

    handle(req: e.Request & { user: IPayload }, res: e.Response, next: Function) {
        this.jwtAuthService.requestHandler(req, res, true, Env.asString('SECRET', 'secret'));
        next();
    }
}

@Injectable({ instantiation: 'singleton' })
export class AccessMiddleware implements IMiddleware {
    constructor(private readonly role: string) {}

    handle(req: e.Request & { user: IPayload }, res: e.Response, next: Function, actionMeta?: any) {
        if (!req.user.roles.includes(this.role)) {
            throw new UnauthorizedError('You dont have proper role');
        }

        next();
    }
}
