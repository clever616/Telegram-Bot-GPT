import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseService } from './db/mongoose.config';
import { UserModule } from './user/user.module';
import { MessagesModule } from './messages/messages.module';
import { ChatGptModule } from './chat-gpt/chat-gpt.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TelegrafModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                token: configService.get<string>('BOT_TOKEN'),
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useClass: MongooseService,
            inject: [ConfigService],
        }),
        UserModule,
        MessagesModule,
        ChatGptModule,
        TelegramModule,
    ],
})
export class AppModule {}
