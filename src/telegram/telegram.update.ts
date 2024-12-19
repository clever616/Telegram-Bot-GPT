import { Ctx, On, Start, Update } from 'nestjs-telegraf';
import { MessagesService } from 'src/messages/messages.service';
import { UserService } from 'src/user/user.service';
import { Context } from 'telegraf';
import { ChatGPTService } from 'src/chat-gpt/chat-gpt.service';
import { ChatCompletionResponseMessage } from 'openai';

@Update()
export class TelegramUpdate {
    constructor(
        private readonly userService: UserService,
        private readonly messagesService: MessagesService,
        private readonly chatGPTService: ChatGPTService,
    ) { }

    @Start()
    async start(@Ctx() ctx: Context): Promise<void> {
        try {
            const isUserExist: boolean = await this.userService.isUserExist(ctx.from.id);
            if (!isUserExist) {
                await this.userService.createUser({
                    user_id: ctx.from.id,
                    username: ctx.from.username,
                    name: ctx.from.first_name,
                    createdAt: new Date(),
                });
            }
        } catch (err) {
            console.log(err);
        }

        try {
            await ctx.reply('Hello! Send me message 🤖');
        } catch (err) {
            console.log(err);
        }
    }

    @On('message')
    async onMessage(@Ctx() ctx: Context): Promise<void> {
        try {
            if (!('text' in ctx.message)) return;
            await this.messagesService.addMessage(ctx.from.id, 'user', ctx.message.text);
        } catch (err) {
            console.log(err);
        }

        try {
            await ctx.persistentChatAction('typing', async () => {
                const messages: ChatCompletionResponseMessage[] = await this.messagesService.getMessages(ctx.from.id);
                const response: string = await this.chatGPTService.sendMessage(messages);
                await this.messagesService.addMessage(ctx.from.id, 'assistant', response);
                await ctx.reply(response);
            });
        } catch (err) {
            if (err.response.statusText === 'Too Many Requests') {
                await ctx.sendMessage('Too many requests. Please try again later');
                return;
            }

            await ctx.sendMessage('Something went wrong. Please try again later');
            console.log(err);
        }
    }
}
