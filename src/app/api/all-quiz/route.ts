import { parseCompletion } from '@quizer/lib/parseCompetion';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const {
      topic = 'Basic English',
      level = 'beginner',
      type = 'multiple_choice',
    } = await req.json();

    const prompts = {
      multiple_choice: `
        Generate 5 multiple-choice questions in English for testing language skills.
        Each question should have:
        - A "question" string
        - Three options: A, B, C
        - One correct answer, marked as "correct"

        Return as JSON:
        [
          {
            "question": "What is the capital of France?",
            "options": {
              "A": "Paris",
              "B": "London",
              "C": "Berlin"
            },
            "correct": "A"
          },
          ...
        ]
      `,
      matching: `
        Generate 5 word-matching exercises for English learning.
        Each exercise should contain:
        - A list of 5 English words
        - A shuffled list of 5 corresponding Ukrainian translations

        Return as JSON:
        [
          {
            "words": ["cat", "house", "car", "apple", "sun"],
            "translations": ["кіт", "дім", "машина", "яблуко", "сонце"]
          },
          ...
        ]
      `,
      sentence_ordering: `
        Generate 5 sentence ordering exercises.
        Each item should include:
        - A correct English sentence (string)
        - A shuffled list of the sentence's words

        Return as JSON:
        [
          {
            "sentence": "I go to school every day.",
            "shuffled": ["go", "school", "I", "every", "to", "day."]
          },
          ...
        ]
      `,
    };

    const prompt =
      prompts[type as keyof typeof prompts] +
      `\nTopic: ${topic}\nLevel: ${level}`;

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
