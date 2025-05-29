type SingleChoiceQuizArgs = {
  topic: string;
  amount: number;
  level: 'beginner' | 'intermediate' | 'advanced';
};

export const generateSingleQuizPrompt = ({
  topic,
  amount,
  level,
}: SingleChoiceQuizArgs): string => {
  const prompt = `
      Generate ${amount} single-choice questions in English for testing language skills.
      Format:
      - Each question has a question string and 4 options: A, B, C, D
      - Only one correct answer
      - Mark correct answer with a "correct" field

      Topic: ${topic}
      Difficulty: ${level}

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
