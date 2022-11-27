import {Body, Controller, Get, Param, Post} from "bonfire-rest";
import {User, UserCreateDto} from "../dto/user-create.dto";
import {UserService} from "../services/user.service";
import {UserModel} from "../schema/user.schema";

@Controller( "users")
export class UsersController {
    constructor(private readonly userService: UserService) {
    }

    @Get()
    get(){
        return UserModel.find({})
    }

    @Get(":id")
    async getById(@Param("id") id: string): Promise<User> {
        const user = await UserModel.findOne({_id: id}).lean()
        if (!user){
            throw new Error("USER not found")
        }
        return user;
    }


    @Post()
    create(@Body() user: UserCreateDto) {
        if (user.password !== user.password2){
            throw new Error("Password is not the same.")
        }
        return this.userService.create(user);
    }

}
