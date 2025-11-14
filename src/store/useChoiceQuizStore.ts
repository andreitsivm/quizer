import { QuizSettingsFormState, QuizTypes } from '@quizer/config/quiz-settings';
import { generateQuiz } from '@quizer/lib/fetch';
import { 
  ChoiceTestQuestion, 
  WordMatchingQuestion, 
  SentenceOrderingQuestion 
} from '@quizer/types/quizes';
import { create } from 'zustand';

interface QuizResult {
  quiz: ChoiceTestQuestion[] | WordMatchingQuestion[] | SentenceOrderingQuestion[];
  quizType?: string;
}

interface QuizStore {
  isLoading: boolean;
  result: QuizResult | null;
  quizType: string | null;
  setResult: (res: QuizResult) => void;
  generateQuizRequest: (data: QuizSettingsFormState) => void;
}

export const useChoiceQuizStore = create<QuizStore>(set => ({
  isLoading: false,
  result: null,
  quizType: null,
  setResult: res => set({ result: res }),
  generateQuizRequest: async (data: QuizSettingsFormState) => {
    set({ isLoading: true, quizType: data.quiz_type });
    try {
      // Ensure questions_qty is a number
      const formattedData = {
        ...data,
        questions_qty: typeof data.questions_qty === 'string' 
          ? parseInt(data.questions_qty, 10) 
          : data.questions_qty,
      };
      const result = await generateQuiz(formattedData);

      set({ 
        result: { ...result, quizType: formattedData.quiz_type }, 
        isLoading: false 
      });
    } catch (error) {
      console.error('Error generating quiz:', error);
      set({ isLoading: false });
    }
  },
}));
