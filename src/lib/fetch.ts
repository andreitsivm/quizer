import { ApiRoutes } from '@quizer/config/app';
import { QuizSettingsFormState } from '@quizer/config/quiz-settings';

const baseFetch = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);

    if (!res.ok) throw new Error('Failed to fetch');

    return res.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const generateQuiz = async (data: QuizSettingsFormState) => {
  const res = await baseFetch(ApiRoutes.generateChoiceQuiz, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
    }),
  });

  return res;
};
