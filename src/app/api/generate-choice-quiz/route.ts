import { generateSingleQuizPrompt } from '@quizer/lib/generateQuizPrompt';
import { parseCompletion } from '@quizer/lib/parseCompetion';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { topic = 'Basic English', level = 'beginner' } = await req.json();

    const prompt = generateSingleQuizPrompt({
      topic,
      amount: 5,
      level,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const parsed = parseCompletion(completion);

    return NextResponse.json({ quiz: parsed });
  } catch (error) {
    console.error('Error generating quiz:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz' },
      { status: 500 },
    );
  }
}
