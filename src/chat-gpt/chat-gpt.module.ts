import { Module } from '@nestjs/common';
import { ChatGPTService } from './chat-gpt.service';

@Module({
    providers: [ChatGPTService],
})
export class ChatGptModule { }
