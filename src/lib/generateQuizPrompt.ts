import { QuizSettingsFormState } from '@quizer/config/quiz-settings';

const getDifficultyGuidelines = (difficulty: string): string => {
  const guidelines: Record<string, string> = {
    A1: 'Use simple vocabulary, basic sentence structures, present tense, and everyday topics. Questions should test fundamental understanding.',
    A2: 'Use common vocabulary, simple past and future tenses, basic grammar structures. Questions should test comprehension of familiar topics.',
    B1: 'Use intermediate vocabulary, complex sentences, various tenses, and abstract concepts. Questions should test understanding and application.',
    B2: 'Use advanced vocabulary, nuanced grammar, idiomatic expressions, and sophisticated topics. Questions should test analysis and inference.',
    C1: 'Use sophisticated vocabulary, complex grammatical structures, subtle distinctions, and academic/professional topics. Questions should test critical thinking.',
    C2: 'Use near-native vocabulary, highly complex structures, cultural nuances, and specialized topics. Questions should test mastery and subtle understanding.',
  };
  return guidelines[difficulty] || guidelines['B1'];
};

const getLearningFocusGuidelines = (learningFocus: string): string => {
  const focusMap: Record<string, string> = {
    present_simple:
      'Focus on habitual actions, general truths, and routines. Use time expressions like "always", "usually", "every day".',
    present_continuous:
      'Focus on actions happening now or temporary situations. Use time expressions like "now", "at the moment", "currently".',
    present_perfect:
      'Focus on experiences, completed actions with present relevance, and life experiences. Use "ever", "never", "already", "yet".',
    present_perfect_continuous:
      'Focus on actions that started in the past and continue to the present, emphasizing duration.',
    past_simple:
      'Focus on completed actions in the past with specific time references. Use "yesterday", "last week", "in 2020".',
    past_continuous:
      'Focus on actions in progress at a specific time in the past, or interrupted actions.',
    past_perfect:
      'Focus on actions completed before another past action. Emphasize sequence of past events.',
    past_perfect_continuous:
      'Focus on duration of actions up to a point in the past.',
    future_simple:
      'Focus on predictions, spontaneous decisions, and future plans. Use "will" and "going to".',
    future_continuous:
      'Focus on actions in progress at a specific future time.',
    future_perfect: 'Focus on actions completed before a specific future time.',
    future_perfect_continuous:
      'Focus on duration of actions up to a specific future time.',
    modal_verbs:
      'Focus on ability, possibility, permission, obligation, and advice. Use "can", "could", "may", "might", "must", "should", "ought to".',
    zero_conditional:
      'Focus on general truths and scientific facts. Use "if + present, present".',
    first_conditional:
      'Focus on real future possibilities. Use "if + present, will/can/might".',
    second_conditional:
      'Focus on hypothetical present/future situations. Use "if + past simple, would/could".',
    third_conditional:
      'Focus on hypothetical past situations. Use "if + past perfect, would have + past participle".',
    mixed_conditionals:
      'Focus on combinations of different conditional types, connecting past and present/future.',
    passive_voice:
      'Focus on when the action is more important than the doer. Include various tenses in passive form.',
    reported_speech:
      'Focus on transforming direct speech to indirect speech, including tense changes and pronoun shifts.',
    question_forms:
      'Focus on yes/no questions, wh-questions, tag questions, and indirect questions.',
    articles:
      'Focus on correct use of "a", "an", "the", and zero article. Include specific vs. general references.',
    gerunds_infinitives:
      'Focus on verbs followed by gerunds vs. infinitives, and verbs that can take both with different meanings.',
    relative_clauses:
      'Focus on defining and non-defining relative clauses, relative pronouns (who, which, that, whose, whom).',
    comparatives_superlatives:
      'Focus on comparative and superlative forms of adjectives and adverbs, including irregular forms.',
    prepositions:
      'Focus on time, place, and movement prepositions, phrasal verbs, and prepositional phrases.',
    conjunctions:
      'Focus on coordinating, subordinating, and correlative conjunctions, and their correct usage.',
    noun_phrases:
      'Focus on complex noun phrases, determiners, modifiers, and noun clauses.',
    adjective_order:
      'Focus on the correct order of multiple adjectives before nouns (opinion, size, age, shape, color, origin, material, purpose).',
    vocabulary:
      'Focus on word meanings, synonyms, antonyms, collocations, idioms, and context-appropriate word choice.',
  };
  return (
    focusMap[learningFocus] ||
    'Focus on general English language skills appropriate to the difficulty level.'
  );
};

export const generateSingleQuizPrompt = ({
  topic,
  questions_qty,
  difficulty,
  learningFocus,
}: QuizSettingsFormState): string => {
  const difficultyGuidelines = getDifficultyGuidelines(difficulty || 'B1');
  const focusGuidelines = getLearningFocusGuidelines(
    learningFocus || 'vocabulary',
  );
  const topicContext = topic?.trim() || 'general English language learning';

  const prompt = `
You are an expert English language teacher creating high-quality assessment questions. Generate exactly ${questions_qty} single-choice questions in English.

CONTEXT:
- Topic: "${topicContext}"
- Difficulty Level: ${difficulty} (CEFR)
- Learning Focus: ${learningFocus}

DIFFICULTY GUIDELINES:
${difficultyGuidelines}

LEARNING FOCUS GUIDELINES:
${focusGuidelines}

STRICT REQUIREMENTS:
1. Each question must be pedagogically sound and test genuine understanding, not just memorization
2. Questions must be unambiguous and have only one clearly correct answer
3. All distractors (incorrect options) must be plausible and test common mistakes learners make at this level
4. Questions should progressively increase in complexity within the set
5. Use authentic, natural English - avoid artificial or overly formal language
6. Each question must have exactly 4 options labeled A, B, C, and D
7. Distractors should reflect common errors related to the learning focus (e.g., if testing present perfect, include past simple as a distractor)
8. For grammar questions, include context sentences that make the grammatical choice meaningful
9. For vocabulary questions, use words in context, not in isolation
10. Avoid trick questions or overly subtle distinctions that would confuse even native speakers
11. Ensure questions are culturally appropriate and accessible
12. Mix question types: fill-in-the-blank, sentence completion, error correction, meaning identification

OUTPUT FORMAT (valid JSON array only):
[
  {
    "question": "Complete the sentence: When I arrived at the station, the train ______.",
    "options": {
      "A": "already left",
      "B": "has already left",
      "C": "had already left",
      "D": "was already leaving"
    },
    "correct": "C",
    "explanation": "Past perfect is used for an action completed before another past action."
  },
  ...
]

CRITICAL: Return ONLY a valid JSON array. No markdown, no code blocks, no explanations outside the JSON structure. The array must be parseable JSON.
  `;
  return prompt.trim();
};

export const generateMultipleQuizPrompt = ({
  topic,
  questions_qty,
  difficulty,
  learningFocus,
}: QuizSettingsFormState): string => {
  const difficultyGuidelines = getDifficultyGuidelines(difficulty || 'B1');
  const focusGuidelines = getLearningFocusGuidelines(
    learningFocus || 'vocabulary',
  );
  const topicContext = topic?.trim() || 'general English language learning';

  const prompt = `
You are an expert English language teacher creating high-quality assessment questions. Generate exactly ${questions_qty} multiple-choice questions in English where each question can have MULTIPLE correct answers.

CONTEXT:
- Topic: "${topicContext}"
- Difficulty Level: ${difficulty} (CEFR)
- Learning Focus: ${learningFocus}

DIFFICULTY GUIDELINES:
${difficultyGuidelines}

LEARNING FOCUS GUIDELINES:
${focusGuidelines}

STRICT REQUIREMENTS:
1. Each question must have at least 2 correct answers and at least 1 incorrect answer (distractor)
2. Each question must have exactly 4 options labeled A, B, C, and D
3. Questions should test understanding of multiple related concepts or rules
4. All correct answers must be clearly correct based on the question's requirements
5. Distractors must be plausible but clearly incorrect
6. Questions must be unambiguous - it should be clear why each answer is correct or incorrect
7. Use authentic, natural English
8. Questions should progressively increase in complexity
9. For grammar questions, test multiple related rules or exceptions
10. For vocabulary questions, test understanding of word relationships, collocations, or multiple meanings
11. Ensure questions are culturally appropriate and accessible

OUTPUT FORMAT (valid JSON array only):
[
  {
    "question": "Which of the following modal verbs can express possibility? (Select all that apply)",
    "options": {
      "A": "can",
      "B": "must",
      "C": "might",
      "D": "should"
    },
    "correct": ["A", "C"],
    "explanation": "Both 'can' and 'might' express possibility. 'Must' expresses obligation or strong probability, and 'should' expresses advice or expectation."
  },
  ...
]

CRITICAL: Return ONLY a valid JSON array. No markdown, no code blocks, no explanations outside the JSON structure. The "correct" field must be an array of strings (e.g., ["A", "C"]). The array must be parseable JSON.
  `;
  return prompt.trim();
};

export const generateWordMatchingPrompt = ({
  topic,
  questions_qty,
  difficulty,
  learningFocus,
  language = 'English',
}: QuizSettingsFormState): string => {
  const difficultyGuidelines = getDifficultyGuidelines(difficulty || 'B1');
  const focusGuidelines = getLearningFocusGuidelines(
    learningFocus || 'vocabulary',
  );
  const topicContext = topic?.trim() || 'general English language learning';

  // Determine target language based on context (defaulting to Ukrainian as mentioned in original)
  const targetLanguage = language === 'English' ? 'Ukrainian' : 'English';

  const prompt = `
You are an expert English language teacher creating word matching exercises. Generate exactly ${questions_qty} word matching exercises in English.

CONTEXT:
- Topic: "${topicContext}"
- Difficulty Level: ${difficulty} (CEFR)
- Learning Focus: ${learningFocus}
- Target Language: ${targetLanguage}

DIFFICULTY GUIDELINES:
${difficultyGuidelines}

LEARNING FOCUS GUIDELINES:
${focusGuidelines}

STRICT REQUIREMENTS:
1. Each exercise must contain exactly 5-8 word pairs (English word and its ${targetLanguage} translation)
2. Words must be appropriate for the specified difficulty level
3. Words should be relevant to the topic and learning focus
4. Translations must be accurate and commonly used
5. English words should be shuffled randomly in the output
6. ${targetLanguage} translations should be shuffled separately (different order than English)
7. Avoid ambiguous translations - each word should have one clear primary translation
8. Include a mix of word types: nouns, verbs, adjectives, adverbs based on learning focus
9. For vocabulary focus, include words that are commonly confused or difficult
10. For grammar focus, include key vocabulary related to that grammar topic
11. Words should be practical and useful for language learning
12. Ensure all words are appropriate for the difficulty level

OUTPUT FORMAT (valid JSON array only):
[
  {
    "words": ["cat", "house", "beautiful", "quickly", "understand"],
    "translations": ["кіт", "дім", "красивий", "швидко", "розуміти"],
    "pairs": [
      { "english": "cat", "translation": "кіт" },
      { "english": "house", "translation": "дім" },
      { "english": "beautiful", "translation": "красивий" },
      { "english": "quickly", "translation": "швидко" },
      { "english": "understand", "translation": "розуміти" }
    ]
  },
  ...
]

CRITICAL: 
- Return ONLY a valid JSON array. No markdown, no code blocks, no explanations.
- The "words" array contains English words in RANDOM order (shuffled)
- The "translations" array contains ${targetLanguage} translations in DIFFERENT random order (also shuffled)
- The "pairs" array contains the correct matches for validation
- The array must be parseable JSON.
  `;
  return prompt.trim();
};

export const generateSentenceOrderingPrompt = ({
  topic,
  questions_qty,
  difficulty,
  learningFocus,
}: QuizSettingsFormState): string => {
  const difficultyGuidelines = getDifficultyGuidelines(difficulty || 'B1');
  const focusGuidelines = getLearningFocusGuidelines(
    learningFocus || 'vocabulary',
  );
  const topicContext = topic?.trim() || 'general English language learning';

  const prompt = `
You are an expert English language teacher creating sentence ordering exercises. Generate exactly ${questions_qty} sentence ordering exercises in English.

CONTEXT:
- Topic: "${topicContext}"
- Difficulty Level: ${difficulty} (CEFR)
- Learning Focus: ${learningFocus}

DIFFICULTY GUIDELINES:
${difficultyGuidelines}

LEARNING FOCUS GUIDELINES:
${focusGuidelines}

STRICT REQUIREMENTS:
1. Each exercise must contain a complete, grammatically correct English sentence
2. Sentences must be appropriate for the specified difficulty level
3. Sentences should demonstrate the learning focus (e.g., if focus is past perfect, include past perfect in sentences)
4. Sentences should be 6-12 words long (appropriate for the difficulty level)
5. Break sentences into individual words, preserving punctuation with the word it belongs to
6. Shuffle the words completely randomly
7. Each sentence must be meaningful and educational
8. Include proper capitalization in the original sentence (first word capitalized)
9. Preserve punctuation marks (periods, commas, question marks) attached to the words
10. For grammar-focused exercises, ensure sentences clearly demonstrate the target grammar structure
11. For vocabulary-focused exercises, include target vocabulary words in context
12. Sentences should be natural and authentic English
13. Avoid overly complex sentences that would be confusing even when correctly ordered
14. Ensure word order exercises help learners understand sentence structure
15. CRITICAL: If a word appears multiple times in the sentence, it MUST appear that exact number of times in both the "words" and "shuffled" arrays. For example, if "she" appears twice, include "she" twice in both arrays.

OUTPUT FORMAT (valid JSON array only):
[
  {
    "sentence": "I have been studying English for three years.",
    "shuffled": ["studying", "I", "years.", "for", "English", "three", "have", "been"],
    "words": ["I", "have", "been", "studying", "English", "for", "three", "years."]
  },
  {
    "sentence": "She had never seen such a beautiful sunset until she visited Hawaii.",
    "shuffled": ["visited", "She", "Hawaii.", "had", "never", "seen", "such", "a", "beautiful", "sunset", "until", "she"],
    "words": ["She", "had", "never", "seen", "such", "a", "beautiful", "sunset", "until", "she", "visited", "Hawaii."]
  },
  ...
]

CRITICAL: 
- Return ONLY a valid JSON array. No markdown, no code blocks, no explanations.
- The "sentence" field contains the complete, correct sentence
- The "words" array contains words in the CORRECT order (for validation) - if a word appears multiple times, include it multiple times
- The "shuffled" array contains the EXACT SAME words (same count, same words) but in RANDOM order - if a word appears twice in "words", it must appear twice in "shuffled"
- Preserve punctuation with words (e.g., "years." not "years" and "." separately)
- The array must be parseable JSON.
  `;
  return prompt.trim();
};
