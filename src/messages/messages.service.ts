import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatCompletionResponseMessage, ChatCompletionResponseMessageRoleEnum } from 'openai';
import { Message } from 'src/db/schemas/message.schema';

@Injectable()
export class MessagesService {
    constructor(@InjectModel(Message.name) private readonly messageModel: Model<Message>) { }

    async addMessage(user_id: number, role: ChatCompletionResponseMessageRoleEnum, message: any): Promise<void> {
        await this.messageModel.create({
            user_id,
            message: { role, content: message },
            createdAt: new Date(),
        });
    }

    async getMessages(user_id: number): Promise<ChatCompletionResponseMessage[]> {
        const messages: Message[] = await this.messageModel
            .find<Message>({ user_id })
            .sort({ createdAt: -1 })
            .limit(20);
        return messages.map((el) => el.message).reverse();
    }
}
