export enum SettingsFormFields {
  topic = 'topic',
  quizType = 'quiz_type',
  language = 'language',
  level = 'difficulty',
  questionsQty = 'questions_qty',
  learningFocus = 'learningFocus',
}

export type QuizSettingsFormState = {
  [SettingsFormFields.topic]: string;
  [SettingsFormFields.quizType]: string;
  [SettingsFormFields.language]: string;
  [SettingsFormFields.level]: string;
  [SettingsFormFields.questionsQty]: number;
  [SettingsFormFields.learningFocus]: string;
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

export const learningFocusOptions = [
  // Present Tenses
  { value: 'present_simple', label: 'Present Simple' },
  { value: 'present_continuous', label: 'Present Continuous' },
  { value: 'present_perfect', label: 'Present Perfect' },
  { value: 'present_perfect_continuous', label: 'Present Perfect Continuous' },

  // Past Tenses
  { value: 'past_simple', label: 'Past Simple' },
  { value: 'past_continuous', label: 'Past Continuous' },
  { value: 'past_perfect', label: 'Past Perfect' },
  { value: 'past_perfect_continuous', label: 'Past Perfect Continuous' },

  // Future Tenses
  { value: 'future_simple', label: 'Future Simple' },
  { value: 'future_continuous', label: 'Future Continuous' },
  { value: 'future_perfect', label: 'Future Perfect' },
  { value: 'future_perfect_continuous', label: 'Future Perfect Continuous' },

  // Modal Verbs
  { value: 'modal_verbs', label: 'Modal Verbs' },

  // Conditionals
  { value: 'zero_conditional', label: 'Zero Conditional' },
  { value: 'first_conditional', label: 'First Conditional' },
  { value: 'second_conditional', label: 'Second Conditional' },
  { value: 'third_conditional', label: 'Third Conditional' },
  { value: 'mixed_conditionals', label: 'Mixed Conditionals' },

  // Passive Voice
  { value: 'passive_voice', label: 'Passive Voice' },

  // Reported Speech
  { value: 'reported_speech', label: 'Reported Speech' },

  // Questions
  { value: 'question_forms', label: 'Question Forms' },

  // Articles
  { value: 'articles', label: 'Articles (a, an, the)' },

  // Gerunds and Infinitives
  { value: 'gerunds_infinitives', label: 'Gerunds & Infinitives' },

  // Relative Clauses
  { value: 'relative_clauses', label: 'Relative Clauses' },

  // Comparatives & Superlatives
  { value: 'comparatives_superlatives', label: 'Comparatives & Superlatives' },

  // Other grammar topics
  { value: 'prepositions', label: 'Prepositions' },
  { value: 'conjunctions', label: 'Conjunctions' },
  { value: 'noun_phrases', label: 'Noun Phrases' },
  { value: 'adjective_order', label: 'Adjective Order' },
  { value: 'vocabulary', label: 'vocabulary' },
];

export const initialSettingsValues: Partial<QuizSettingsFormState> = {
  [SettingsFormFields.quizType]: 'single_choice',
  [SettingsFormFields.language]: 'English',
  [SettingsFormFields.questionsQty]: 10,
};
