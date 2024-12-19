import { Injectable } from '@nestjs/common';
import { ChatCompletionResponseMessage, OpenAIApi } from 'openai';
import { chatGPTConfig } from './chat-gpt.config';

@Injectable()
export class ChatGPTService {
    private readonly openAI: OpenAIApi;
    constructor() {
        this.openAI = new OpenAIApi(chatGPTConfig);
    }

    async sendMessage(messages: ChatCompletionResponseMessage[]): Promise<string> {
        const { data } = await this.openAI.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages,
        });

        return data.choices[0].message.content;
    }
}
