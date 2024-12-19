import { config } from 'dotenv';
import { Configuration } from 'openai';
config();

export const chatGPTConfig = new Configuration({
    apiKey: process.env.OPENAI_TOKEN,
});
