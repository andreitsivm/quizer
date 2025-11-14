export const Routes = {
  home: '/',
  singleChoiceQuiz: '/single-choice-quiz/',
  multipleChoiceQuiz: '/multiple-choice-quiz/',
  wordMatchingQuiz: '/word-matching-quiz/',
  sentenceOrderingQuiz: '/sentence-ordering-quiz/',
} as const;

export const ApiRoutes = {
  generateChoiceQuiz: '/api/generate-choice-quiz/',
  generateMultipleChoiceQuiz: '/api/generate-multiple-choice-quiz/',
  generateWordMatchingQuiz: '/api/generate-word-matching-quiz/',
  generateSentenceOrderingQuiz: '/api/generate-sentence-ordering-quiz/',
} as const;
