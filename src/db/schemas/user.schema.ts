import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop()
    user_id: number;

    @Prop()
    username: string;

    @Prop()
    name: string;

    @Prop()
    createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
