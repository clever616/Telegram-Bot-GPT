import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGPTService } from 'src/chat-gpt/chat-gpt.service';
import { Message, MessageSchema } from 'src/db/schemas/message.schema';
import { User, UserSchema } from 'src/db/schemas/user.schema';
import { MessagesService } from 'src/messages/messages.service';
import { UserService } from 'src/user/user.service';
import { TelegramUpdate } from './telegram.update';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
            {
                name: Message.name,
                schema: MessageSchema,
            },
        ]),
    ],

    providers: [TelegramUpdate, MessagesService, UserService, ChatGPTService],
})
export class TelegramModule { }
