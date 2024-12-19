import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ChatCompletionResponseMessage } from 'openai';

@Schema()
export class Message {
    @Prop()
    user_id: number;

    @Prop(
        raw({
            role: String,
            content: String,
        }),
    )
    message: ChatCompletionResponseMessage;

    @Prop()
    createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
