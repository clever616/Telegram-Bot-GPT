import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseService implements MongooseOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        return {
            uri: `mongodb://${this.configService.get<string>('MONGO_USER')}:${this.configService.get<string>(
                'MONGO_PASSWORD',
            )}@${this.configService.get<string>('MONGO_HOST')}:${this.configService.get<number>('MONGO_PORT')}`,
        };
    }
}
