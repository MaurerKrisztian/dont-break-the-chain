import { IUser } from '../interfaces/user.interface';
import { UserModel } from '../schema/user.schema';

export class UserService {
    create(user: IUser) {
        return UserModel.create(user);
    }
}
