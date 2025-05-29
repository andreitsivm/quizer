import { QuizSettingsFormState } from '@quizer/config/quiz-settings';
import { generateQuiz } from '@quizer/lib/fetch';
import { ChoiceTestQuestion } from '@quizer/types/quizes';
import { create } from 'zustand';

interface QuizResult {
  quiz: ChoiceTestQuestion[];
}

interface QuizStore {
  isLoading: boolean;
  result: QuizResult | null;
  setResult: (res: QuizResult) => void;
  generateQuizRequest: (data: QuizSettingsFormState) => void;
}

export const useChoiceQuizStore = create<QuizStore>(set => ({
  isLoading: false,
  result: null,
  setResult: res => set({ result: res }),
  generateQuizRequest: async (data: QuizSettingsFormState) => {
    set({ isLoading: true });
    try {
      set({ isLoading: true });
      const result = await generateQuiz(data);

      set({ result, isLoading: false });
    } catch (error) {
      console.error('Error generating quiz:', error);
      set({ isLoading: false });
    }
  },
}));
