export const Routes = {
  home: '/',
  singleChoiceQuiz: '/single-choice-quiz/',
  multipleChoiceQuiz: '/multiple-choice-quiz/',
  wordMatchingQuiz: '/word-matching-quiz/',
  sentenceOrderingQuiz: '/sentence-ordering-quiz/',
} as const;

export const ApiRoutes = {
  generateChoiceQuiz: '/api/generate-choice-quiz/',
} as const;
