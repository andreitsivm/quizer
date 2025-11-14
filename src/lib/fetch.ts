import { ApiRoutes } from '@quizer/config/app';
import { QuizSettingsFormState, QuizTypes } from '@quizer/config/quiz-settings';

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
  let apiRoute: string;
  
  switch (data.quiz_type) {
    case QuizTypes.multipleChoice:
      apiRoute = ApiRoutes.generateMultipleChoiceQuiz;
      break;
    case QuizTypes.wordMatching:
      apiRoute = ApiRoutes.generateWordMatchingQuiz;
      break;
    case QuizTypes.sentenceOrdering:
      apiRoute = ApiRoutes.generateSentenceOrderingQuiz;
      break;
    case QuizTypes.singleChoice:
    default:
      apiRoute = ApiRoutes.generateChoiceQuiz;
      break;
  }

  const res = await baseFetch(apiRoute, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
    }),
  });

  return res;
};
