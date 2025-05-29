type ChoiceOption = Record<string, string>;

export interface ChoiceTestQuestion {
  question: string;
  options: ChoiceOption;
  correct: keyof ChoiceOption;
}
