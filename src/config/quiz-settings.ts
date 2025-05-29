export enum SettingsFormFields {
  topic = 'topic',
  quizType = 'quiz_type',
  language = 'language',
  level = 'difficulty',
  questionsQty = 'questions_qty',
}

export type QuizSettingsFormState = {
  [SettingsFormFields.topic]: string;
  [SettingsFormFields.quizType]: string;
  [SettingsFormFields.language]: string;
  [SettingsFormFields.level]: string;
  [SettingsFormFields.questionsQty]: number;
  [SettingsFormFields.topic]: string;
};

export enum QuizTypes {
  singleChoice = 'single_choice',
  multipleChoice = 'multiple_choice',
  wordMatching = 'word_matching',
  sentenceOrdering = 'sentence_ordering',
}

export const quizTypesOptions = [
  { value: [QuizTypes.singleChoice], label: 'Single Choice' },
  { value: [QuizTypes.multipleChoice], label: 'Multiple Choice' },
  { value: [QuizTypes.wordMatching], label: 'Word Matching' },
  { value: [QuizTypes.sentenceOrdering], label: 'Sentence Ordering' },
];

export const languagesOptions = [
  { value: 'English', label: 'English' },
  { value: 'Spanish', label: 'Spanish' },
];

export const levelsOptions = [
  { value: 'A1', label: 'Beginner' },
  { value: 'A2', label: 'Elementary' },
  { value: 'B1', label: 'Intermediate' },
  { value: 'B2', label: 'Upper Intermediate' },
  { value: 'C1', label: 'Advanced' },
  { value: 'C2', label: 'Proficient' },
];

export const initialSettingsValues: Partial<QuizSettingsFormState> = {
  [SettingsFormFields.topic]: 'Basic English',
  [SettingsFormFields.quizType]: 'single_choice',
  [SettingsFormFields.language]: 'English',
  [SettingsFormFields.level]: levelsOptions[0].value, // Default to Beginner
  [SettingsFormFields.questionsQty]: 10,
};
