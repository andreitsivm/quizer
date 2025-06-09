import { QuizSettingsFormState } from '@quizer/config/quiz-settings';

export const generateSingleQuizPrompt = ({
  topic,
  questions_qty,
  difficulty,
  learningFocus,
}: QuizSettingsFormState): string => {
  const prompt = `
    Generate ${questions_qty} single-choice questions in English to help learners improve their language skills.
    Context:
    - Topic: "${
      topic || 'Random any topic that usually use for study purposes'
    }"
    - Difficulty: "${difficulty}"
    - Learning Focus: "${learningFocus}" (e.g. grammar, vocabulary, listening, etc.)

    Requirements:
    - Each question must be unique and appropriate to the specified topic and focus
    - Avoid repeating questions or reusing structures from previously generated quizzes
    - Questions must be clear, concise, and free of ambiguity
    - Each question must have exactly 4 answer options: A, B, C, and D
    - Only one correct answer per question
    - The correct answer must be clearly marked using a "correct" key (e.g., "correct": "A")
    - Use this format with blank space to train tenses "When our flight ______, we were having dinner."

    Output format (JSON array):
    [
      {
        "question": "Which of the following is a synonym for 'happy'?",
        "options": {
          "A": "Sad",
          "B": "Angry",
          "C": "Joyful",
          "D": "Tired"
        },
        "correct": "C"
      },
      ...
    ]

    Only return a valid JSON array as specified above. Do not include any extra commentary or explanation.
  `;
  return prompt.trim();
};
