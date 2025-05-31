import { QuizSettingsFormState } from '@quizer/config/quiz-settings';

export const generateSingleQuizPrompt = ({
  topic,
  questions_qty,
  difficulty,
  accent,
}: QuizSettingsFormState): string => {
  const prompt = `
      Generate ${questions_qty} single-choice questions in English for testing language skills.
      If you already generate similar test, pleas create completely different output for test.
      Format:
      - Each question has a question string and 4 options: A, B, C, D
      - Only one correct answer
      - Mark correct answer with a "correct" field

      Topic: ${topic}
      Difficulty: ${difficulty}
      Accent: ${accent}

      Respond in JSON format like:
      [
        {
          "question": "What is the capital of England?",
          "options": {
            "A": "London",
            "B": "Paris",
            "C": "Berlin"
            "D": "Madrid"
          },
          "correct": "A"
        },
        ...
      ]
    `;
  return prompt.trim();
};
