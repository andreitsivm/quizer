type ChoiceOption = Record<string, string>;

export interface SingleChoiceTestQuestion {
  question: string;
  options: ChoiceOption;
  correct: keyof ChoiceOption;
  explanation?: string;
}

export interface MultipleChoiceTestQuestion {
  question: string;
  options: ChoiceOption;
  correct: (keyof ChoiceOption)[];
  explanation?: string;
}

export type ChoiceTestQuestion = SingleChoiceTestQuestion | MultipleChoiceTestQuestion;

export function isMultipleChoice(question: ChoiceTestQuestion): question is MultipleChoiceTestQuestion {
  return Array.isArray(question.correct);
}

export interface WordPair {
  english: string;
  translation: string;
}

export interface WordMatchingQuestion {
  words: string[];
  translations: string[];
  pairs: WordPair[];
}

export interface SentenceOrderingQuestion {
  sentence: string;
  shuffled: string[];
  words: string[];
}
