import { BeforeMiddleware } from 'bonfire-rest/decorators/middleware/before-middleware.decorator';
import { AccessMiddleware } from './auth.middleware';

export const Role = (role: string) => {
    return BeforeMiddleware(new AccessMiddleware(role));
};
