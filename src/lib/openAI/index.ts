import OpenAI from 'openai';

export const openaiAPI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
