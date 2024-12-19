import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/db/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async createUser(userDto: User): Promise<void> {
        await this.userModel.create(userDto);
    }

    async isUserExist(user_id: number): Promise<boolean> {
        const user: User = await this.userModel.findOne<User>({ user_id });
        return !!user;
    }
}
