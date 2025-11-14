import { QuizSettingsFormState } from '@quizer/config/quiz-settings';

const getDifficultyGuidelines = (difficulty: string): string => {
  const guidelines: Record<string, string> = {
    A1: `BEGINNER LEVEL (A1) - Absolute Basics:
- Vocabulary: Only the 100-200 most common English words (cat, dog, house, water, eat, drink, go, come, I, you, he, she, etc.)
- Sentence length: Maximum 5-7 words. Use only simple, declarative sentences.
- Grammar: Present simple tense ONLY. Basic subject-verb-object structure. No complex grammar.
- Topics: Personal information, family, daily routines, basic objects, numbers 1-20, colors, simple actions.
- Question complexity: Direct questions with obvious answers. No inference required.
- Example vocabulary range: "I eat bread", "She goes to school", "The cat is black"
- Distractors: Common beginner mistakes like wrong verb forms, missing articles, word order errors.
- Context: Single sentences only. No complex contexts or multiple sentences.`,

    A2: `ELEMENTARY LEVEL (A2) - Basic Communication:
- Vocabulary: 500-1000 most common words. Basic everyday vocabulary (weather, food, hobbies, travel basics, time expressions).
- Sentence length: 6-10 words. Simple and compound sentences with "and", "but", "or".
- Grammar: Present simple, present continuous, past simple, future with "will" and "going to". Basic question forms. Simple comparatives.
- Topics: Daily life, routines, past events, future plans, shopping, directions, basic descriptions.
- Question complexity: Straightforward comprehension. May require understanding of time references.
- Example vocabulary range: "I went to the store yesterday", "She is reading a book", "We will visit Paris next week"
- Distractors: Tense confusion, basic preposition errors, simple word choice mistakes.
- Context: Short, simple contexts (1-2 sentences).`,

    B1: `INTERMEDIATE LEVEL (B1) - Independent User:
- Vocabulary: 2000-3000 words. Abstract concepts, opinions, feelings, work, education, current events.
- Sentence length: 10-15 words. Complex sentences with subordinate clauses, relative clauses, conditionals.
- Grammar: All basic tenses (present, past, future in all forms), present perfect, past perfect, modals, passive voice, reported speech, first and second conditionals.
- Topics: Work, education, travel, culture, opinions, experiences, plans, hypothetical situations.
- Question complexity: Requires understanding context, inference, and application of grammar rules.
- Example vocabulary range: "If I had more time, I would learn another language", "The report was written by the team last month"
- Distractors: Subtle grammar distinctions, collocation errors, register mistakes (formal vs informal).
- Context: Paragraph-length contexts (3-5 sentences) with multiple pieces of information.`,

    B2: `UPPER INTERMEDIATE LEVEL (B2) - Advanced Independent:
- Vocabulary: 4000-6000 words. Idiomatic expressions, phrasal verbs, academic vocabulary, nuanced word choices, synonyms with subtle differences.
- Sentence length: 15-25 words. Complex sentences with multiple clauses, embedded structures, advanced connectors.
- Grammar: All tenses including perfect continuous forms, third conditionals, mixed conditionals, advanced passives, cleft sentences, inversion, advanced modals with subtle distinctions.
- Topics: Academic subjects, professional contexts, abstract ideas, cultural topics, current affairs, specialized domains.
- Question complexity: Requires analysis, inference, understanding of nuance, and recognition of subtle grammatical distinctions.
- Example vocabulary range: "Notwithstanding the economic downturn, the company managed to thrive", "Had I known about the meeting, I would have prepared differently"
- Distractors: Sophisticated errors involving register, style, subtle grammar rules, collocation nuances, idiomatic usage.
- Context: Extended contexts (5-8 sentences) with complex information and multiple layers of meaning.`,

    C1: `ADVANCED LEVEL (C1) - Proficient User:
- Vocabulary: 7000-10000+ words. Sophisticated academic and professional vocabulary, low-frequency words, precise terminology, domain-specific language, subtle semantic distinctions.
- Sentence length: 20-35 words. Highly complex sentences with multiple embedded clauses, advanced syntactic structures, sophisticated punctuation.
- Grammar: Mastery of all grammatical structures including rare forms, advanced conditionals, complex passives, stylistic variations, formal register, literary devices.
- Topics: Academic research, professional expertise, abstract philosophy, specialized knowledge, cultural criticism, nuanced discussions.
- Question complexity: Requires critical thinking, deep analysis, understanding of subtle distinctions, cultural awareness, and recognition of stylistic choices.
- Example vocabulary range: "The paradigm shift in pedagogical approaches has precipitated a re-evaluation of traditional assessment methodologies", "Were it not for the mitigating circumstances, the verdict might have been more severe"
- Distractors: Highly sophisticated errors involving register, style, subtle semantic differences, advanced collocations, cultural appropriateness.
- Context: Complex, extended contexts (8-12 sentences) with dense information, multiple perspectives, and sophisticated discourse.`,

    C2: `PROFICIENCY LEVEL (C2) - Mastery:
- Vocabulary: Near-native range (10000+ words). Rare and sophisticated vocabulary, archaic forms, literary language, highly specialized terminology, cultural references, subtle connotations.
- Sentence length: 25-40+ words. Extremely complex sentences with multiple levels of embedding, advanced rhetorical structures, sophisticated stylistic choices.
- Grammar: Complete mastery including rare constructions, stylistic variations, register shifts, literary devices, advanced punctuation, sophisticated sentence patterns.
- Topics: Highly specialized academic or professional domains, literary analysis, philosophical discourse, cultural critique, nuanced argumentation, abstract theoretical concepts.
- Question complexity: Requires near-native intuition, understanding of subtle cultural and linguistic nuances, recognition of stylistic choices, and appreciation of register and tone.
- Example vocabulary range: "The epistemological underpinnings of this theoretical framework necessitate a paradigmatic reconceptualization", "Had circumstances been otherwise, one might have surmised that the outcome would have been markedly different"
- Distractors: Extremely subtle distinctions that even native speakers might debate, stylistic preferences, register nuances, cultural appropriateness, advanced collocational patterns.
- Context: Highly sophisticated, extended contexts (10-15+ sentences) with dense academic or professional discourse, multiple layers of meaning, and complex argumentation.`,
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

STRICT REQUIREMENTS FOR ${difficulty} LEVEL:
1. Vocabulary complexity: ${
    difficulty === 'A1'
      ? 'ONLY the 100-200 most common words. Use basic vocabulary like: cat, dog, house, water, eat, drink, go, come.'
      : difficulty === 'A2'
      ? '500-1000 most common words. Everyday vocabulary: weather, food, hobbies, time expressions.'
      : difficulty === 'B1'
      ? '2000-3000 words. Abstract concepts, opinions, work-related terms.'
      : difficulty === 'B2'
      ? '4000-6000 words. Include idiomatic expressions, phrasal verbs, academic vocabulary, nuanced word choices.'
      : difficulty === 'C1'
      ? '7000-10000+ words. Sophisticated academic vocabulary, low-frequency words, precise terminology, domain-specific language.'
      : '10000+ words. Rare and sophisticated vocabulary, archaic forms, literary language, highly specialized terminology, cultural references.'
  }

2. Sentence complexity: ${
    difficulty === 'A1'
      ? 'Maximum 5-7 words. Simple declarative sentences only.'
      : difficulty === 'A2'
      ? '6-10 words. Simple and compound sentences with basic connectors.'
      : difficulty === 'B1'
      ? '10-15 words. Complex sentences with subordinate clauses, relative clauses.'
      : difficulty === 'B2'
      ? '15-25 words. Complex sentences with multiple clauses, embedded structures, advanced connectors.'
      : difficulty === 'C1'
      ? '20-35 words. Highly complex sentences with multiple embedded clauses, advanced syntactic structures.'
      : '25-40+ words. Extremely complex sentences with multiple levels of embedding, advanced rhetorical structures.'
  }

3. Grammar complexity: ${
    difficulty === 'A1'
      ? 'Present simple tense ONLY. Basic subject-verb-object. No complex grammar.'
      : difficulty === 'A2'
      ? 'Present simple, present continuous, past simple, future with will/going to. Basic question forms. Simple comparatives.'
      : difficulty === 'B1'
      ? 'All basic tenses, present perfect, past perfect, modals, passive voice, reported speech, first/second conditionals.'
      : difficulty === 'B2'
      ? 'All tenses including perfect continuous, third conditionals, mixed conditionals, advanced passives, cleft sentences, inversion.'
      : difficulty === 'C1'
      ? 'Mastery of all structures including rare forms, advanced conditionals, complex passives, stylistic variations, formal register.'
      : 'Complete mastery including rare constructions, stylistic variations, register shifts, literary devices, advanced punctuation.'
  }

4. Context complexity: ${
    difficulty === 'A1'
      ? 'Single sentences only. No complex contexts.'
      : difficulty === 'A2'
      ? 'Short, simple contexts (1-2 sentences).'
      : difficulty === 'B1'
      ? 'Paragraph-length contexts (3-5 sentences) with multiple pieces of information.'
      : difficulty === 'B2'
      ? 'Extended contexts (5-8 sentences) with complex information and multiple layers.'
      : difficulty === 'C1'
      ? 'Complex, extended contexts (8-12 sentences) with dense information, multiple perspectives.'
      : 'Highly sophisticated contexts (10-15+ sentences) with dense academic/professional discourse, complex argumentation.'
  }

5. Question sophistication: ${
    difficulty === 'A1'
      ? 'Direct questions with obvious answers. No inference required.'
      : difficulty === 'A2'
      ? 'Straightforward comprehension. May require understanding time references.'
      : difficulty === 'B1'
      ? 'Requires understanding context, inference, and application of grammar rules.'
      : difficulty === 'B2'
      ? 'Requires analysis, inference, understanding of nuance, recognition of subtle distinctions.'
      : difficulty === 'C1'
      ? 'Requires critical thinking, deep analysis, understanding of subtle distinctions, cultural awareness.'
      : 'Requires near-native intuition, understanding of subtle cultural/linguistic nuances, recognition of stylistic choices.'
  }

6. Distractor sophistication: ${
    difficulty === 'A1'
      ? 'Common beginner mistakes: wrong verb forms, missing articles, word order errors.'
      : difficulty === 'A2'
      ? 'Tense confusion, basic preposition errors, simple word choice mistakes.'
      : difficulty === 'B1'
      ? 'Subtle grammar distinctions, collocation errors, register mistakes (formal vs informal).'
      : difficulty === 'B2'
      ? 'Sophisticated errors involving register, style, subtle grammar rules, collocation nuances, idiomatic usage.'
      : difficulty === 'C1'
      ? 'Highly sophisticated errors involving register, style, subtle semantic differences, advanced collocations.'
      : 'Extremely subtle distinctions that even native speakers might debate, stylistic preferences, register nuances.'
  }

7. Each question must be pedagogically sound and test genuine understanding appropriate for ${difficulty} level
8. Questions must be unambiguous and have only one clearly correct answer
9. Questions should progressively increase in complexity within the set
10. Use authentic, natural English appropriate for ${difficulty} level
11. Each question must have exactly 4 options labeled A, B, C, and D
12. Distractors should reflect common errors that ${difficulty} level learners make
13. For grammar questions, include context sentences that make the grammatical choice meaningful
14. For vocabulary questions, use words in context with appropriate complexity for ${difficulty}
15. Ensure questions are culturally appropriate and accessible
16. Mix question types: fill-in-the-blank, sentence completion, error correction, meaning identification
17. ${
    difficulty === 'A1' || difficulty === 'A2'
      ? 'Keep questions simple and direct. Avoid complex reasoning.'
      : difficulty === 'B1' || difficulty === 'B2'
      ? 'Include questions that require some analysis and inference.'
      : 'Include questions that require sophisticated analysis, critical thinking, and recognition of subtle distinctions.'
  }

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

STRICT REQUIREMENTS FOR ${difficulty} LEVEL:
1. Vocabulary complexity: ${
    difficulty === 'A1'
      ? 'ONLY the 100-200 most common words. Use basic vocabulary like: cat, dog, house, water, eat, drink, go, come.'
      : difficulty === 'A2'
      ? '500-1000 most common words. Everyday vocabulary: weather, food, hobbies, time expressions.'
      : difficulty === 'B1'
      ? '2000-3000 words. Abstract concepts, opinions, work-related terms.'
      : difficulty === 'B2'
      ? '4000-6000 words. Include idiomatic expressions, phrasal verbs, academic vocabulary, nuanced word choices.'
      : difficulty === 'C1'
      ? '7000-10000+ words. Sophisticated academic vocabulary, low-frequency words, precise terminology, domain-specific language.'
      : '10000+ words. Rare and sophisticated vocabulary, archaic forms, literary language, highly specialized terminology, cultural references.'
  }

2. Sentence complexity: ${
    difficulty === 'A1'
      ? 'Maximum 5-7 words. Simple declarative sentences only.'
      : difficulty === 'A2'
      ? '6-10 words. Simple and compound sentences with basic connectors.'
      : difficulty === 'B1'
      ? '10-15 words. Complex sentences with subordinate clauses, relative clauses.'
      : difficulty === 'B2'
      ? '15-25 words. Complex sentences with multiple clauses, embedded structures, advanced connectors.'
      : difficulty === 'C1'
      ? '20-35 words. Highly complex sentences with multiple embedded clauses, advanced syntactic structures.'
      : '25-40+ words. Extremely complex sentences with multiple levels of embedding, advanced rhetorical structures.'
  }

3. Grammar complexity: ${
    difficulty === 'A1'
      ? 'Present simple tense ONLY. Basic subject-verb-object. No complex grammar.'
      : difficulty === 'A2'
      ? 'Present simple, present continuous, past simple, future with will/going to. Basic question forms. Simple comparatives.'
      : difficulty === 'B1'
      ? 'All basic tenses, present perfect, past perfect, modals, passive voice, reported speech, first/second conditionals.'
      : difficulty === 'B2'
      ? 'All tenses including perfect continuous, third conditionals, mixed conditionals, advanced passives, cleft sentences, inversion.'
      : difficulty === 'C1'
      ? 'Mastery of all structures including rare forms, advanced conditionals, complex passives, stylistic variations, formal register.'
      : 'Complete mastery including rare constructions, stylistic variations, register shifts, literary devices, advanced punctuation.'
  }

4. Context complexity: ${
    difficulty === 'A1'
      ? 'Single sentences only. No complex contexts.'
      : difficulty === 'A2'
      ? 'Short, simple contexts (1-2 sentences).'
      : difficulty === 'B1'
      ? 'Paragraph-length contexts (3-5 sentences) with multiple pieces of information.'
      : difficulty === 'B2'
      ? 'Extended contexts (5-8 sentences) with complex information and multiple layers.'
      : difficulty === 'C1'
      ? 'Complex, extended contexts (8-12 sentences) with dense information, multiple perspectives.'
      : 'Highly sophisticated contexts (10-15+ sentences) with dense academic/professional discourse, complex argumentation.'
  }

5. Question sophistication: ${
    difficulty === 'A1'
      ? 'Direct questions with obvious answers. No inference required.'
      : difficulty === 'A2'
      ? 'Straightforward comprehension. May require understanding time references.'
      : difficulty === 'B1'
      ? 'Requires understanding context, inference, and application of grammar rules.'
      : difficulty === 'B2'
      ? 'Requires analysis, inference, understanding of nuance, recognition of subtle distinctions.'
      : difficulty === 'C1'
      ? 'Requires critical thinking, deep analysis, understanding of subtle distinctions, cultural awareness.'
      : 'Requires near-native intuition, understanding of subtle cultural/linguistic nuances, recognition of stylistic choices.'
  }

6. Distractor sophistication: ${
    difficulty === 'A1'
      ? 'Common beginner mistakes: wrong verb forms, missing articles, word order errors.'
      : difficulty === 'A2'
      ? 'Tense confusion, basic preposition errors, simple word choice mistakes.'
      : difficulty === 'B1'
      ? 'Subtle grammar distinctions, collocation errors, register mistakes (formal vs informal).'
      : difficulty === 'B2'
      ? 'Sophisticated errors involving register, style, subtle grammar rules, collocation nuances, idiomatic usage.'
      : difficulty === 'C1'
      ? 'Highly sophisticated errors involving register, style, subtle semantic differences, advanced collocations.'
      : 'Extremely subtle distinctions that even native speakers might debate, stylistic preferences, register nuances.'
  }

7. Each question must have at least 2 correct answers and at least 1 incorrect answer (distractor)
8. Each question must have exactly 4 options labeled A, B, C, and D
9. Questions should test understanding of multiple related concepts or rules appropriate for ${difficulty} level
10. All correct answers must be clearly correct based on the question's requirements
11. Distractors must be plausible but clearly incorrect, reflecting ${difficulty} level learner mistakes
12. Questions must be unambiguous - it should be clear why each answer is correct or incorrect
13. Use authentic, natural English appropriate for ${difficulty} level
14. Questions should progressively increase in complexity within the set
15. For grammar questions, test multiple related rules or exceptions at ${difficulty} level
16. For vocabulary questions, test understanding of word relationships, collocations, or multiple meanings appropriate for ${difficulty}
17. Ensure questions are culturally appropriate and accessible

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

STRICT REQUIREMENTS FOR ${difficulty} LEVEL:
1. Vocabulary complexity: ${
    difficulty === 'A1'
      ? 'ONLY the 100-200 most common words. Basic words like: cat, dog, house, water, eat, drink, go, come, I, you, he, she, big, small, good, bad, red, blue, one, two, three.'
      : difficulty === 'A2'
      ? '500-1000 most common words. Everyday vocabulary: weather (sunny, rainy), food (breakfast, lunch), hobbies (reading, swimming), time expressions (yesterday, tomorrow), basic adjectives (happy, sad, tired).'
      : difficulty === 'B1'
      ? '2000-3000 words. Abstract concepts (freedom, justice), opinions (believe, think, agree), feelings (anxious, confident), work terms (meeting, deadline, colleague), education terms (assignment, research).'
      : difficulty === 'B2'
      ? '4000-6000 words. Idiomatic expressions (break the ice, hit the nail on the head), phrasal verbs (put off, get along with), academic vocabulary (analyze, evaluate, methodology), nuanced word choices (enormous vs huge vs massive).'
      : difficulty === 'C1'
      ? '7000-10000+ words. Sophisticated academic vocabulary (paradigm, epistemological, methodology), low-frequency words (ubiquitous, meticulous), precise terminology (dichotomy, synthesis), domain-specific language.'
      : '10000+ words. Rare and sophisticated vocabulary (epistemological, paradigmatic), archaic forms (whilst, henceforth), literary language, highly specialized terminology, cultural references, subtle connotations.'
  }

2. Word selection: ${
    difficulty === 'A1'
      ? '5-6 word pairs maximum. Only concrete nouns, basic verbs, simple adjectives. No abstract concepts.'
      : difficulty === 'A2'
      ? '5-7 word pairs. Mix of concrete nouns, common verbs, basic adjectives, simple adverbs, time expressions.'
      : difficulty === 'B1'
      ? '6-8 word pairs. Include abstract nouns, phrasal verbs, descriptive adjectives, adverbs of manner, work/education vocabulary.'
      : difficulty === 'B2'
      ? '7-8 word pairs. Include idiomatic expressions, phrasal verbs, academic terms, nuanced synonyms, collocations.'
      : difficulty === 'C1'
      ? '7-8 word pairs. Include sophisticated academic terms, low-frequency words, precise terminology, domain-specific vocabulary, subtle distinctions.'
      : '8 word pairs. Include rare vocabulary, literary terms, highly specialized terminology, cultural references, archaic forms, subtle semantic nuances.'
  }

3. Each exercise must contain exactly 5-8 word pairs (English word and its ${targetLanguage} translation) as specified above
4. Words must strictly match the vocabulary complexity for ${difficulty} level - DO NOT use words from higher levels
5. Words should be relevant to the topic and learning focus
6. Translations must be accurate and commonly used
7. English words should be shuffled randomly in the output
8. ${targetLanguage} translations should be shuffled separately (different order than English)
9. Avoid ambiguous translations - each word should have one clear primary translation
10. Include a mix of word types: nouns, verbs, adjectives, adverbs based on learning focus and ${difficulty} level
11. For vocabulary focus, include words that are commonly confused or difficult at ${difficulty} level
12. For grammar focus, include key vocabulary related to that grammar topic at ${difficulty} level
13. Words should be practical and useful for language learning at ${difficulty} level
14. Ensure all words are strictly appropriate for ${difficulty} level - verify each word fits the vocabulary range specified

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

STRICT REQUIREMENTS FOR ${difficulty} LEVEL:
1. Vocabulary complexity: ${
    difficulty === 'A1'
      ? 'ONLY the 100-200 most common words. Basic words like: cat, dog, house, water, eat, drink, go, come, I, you, he, she, big, small, good, bad.'
      : difficulty === 'A2'
      ? '500-1000 most common words. Everyday vocabulary: weather, food, hobbies, time expressions, basic adjectives.'
      : difficulty === 'B1'
      ? '2000-3000 words. Abstract concepts, opinions, feelings, work, education, current events vocabulary.'
      : difficulty === 'B2'
      ? '4000-6000 words. Idiomatic expressions, phrasal verbs, academic vocabulary, nuanced word choices, synonyms with subtle differences.'
      : difficulty === 'C1'
      ? '7000-10000+ words. Sophisticated academic vocabulary, low-frequency words, precise terminology, domain-specific language, subtle semantic distinctions.'
      : '10000+ words. Rare and sophisticated vocabulary, archaic forms, literary language, highly specialized terminology, cultural references, subtle connotations.'
  }

2. Sentence length: ${
    difficulty === 'A1'
      ? 'STRICTLY 5-7 words maximum. Simple declarative sentences only. Example: "I eat bread every day."'
      : difficulty === 'A2'
      ? '6-10 words. Simple and compound sentences with basic connectors. Example: "I went to the store yesterday and bought some milk."'
      : difficulty === 'B1'
      ? '8-12 words. Complex sentences with subordinate clauses, relative clauses. Example: "If I had more time, I would learn another language."'
      : difficulty === 'B2'
      ? '8-12 words. Complex sentences with multiple clauses, advanced connectors. Use IELTS-level vocabulary but keep sentences manageable and practical. Example: "Despite the economic challenges, the company managed to thrive through innovative strategies."'
      : difficulty === 'C1'
      ? '8-12 words. Complex sentences with embedded clauses, advanced structures. Use sophisticated IELTS vocabulary but maintain readability. Example: "The paradigm shift in educational approaches has necessitated a comprehensive re-evaluation of traditional assessment methods."'
      : '8-12 words. Complex sentences with advanced structures. Use sophisticated vocabulary but keep sentences practical and readable. Example: "The theoretical framework underlying this research has been subject to considerable scholarly debate."'
  }

3. Grammar complexity: ${
    difficulty === 'A1'
      ? 'Present simple tense ONLY. Basic subject-verb-object structure. No complex grammar, no subordinate clauses, no conditionals.'
      : difficulty === 'A2'
      ? 'Present simple, present continuous, past simple, future with will/going to. Basic question forms. Simple comparatives. Basic connectors: and, but, or.'
      : difficulty === 'B1'
      ? 'All basic tenses, present perfect, past perfect, modals, passive voice, reported speech, first/second conditionals. Subordinate clauses with because, although, when, if.'
      : difficulty === 'B2'
      ? 'All tenses including perfect continuous, third conditionals, mixed conditionals, advanced passives, cleft sentences, inversion, advanced modals. Complex subordinate clauses, relative clauses, advanced connectors.'
      : difficulty === 'C1'
      ? 'Mastery of all structures including rare forms, advanced conditionals, complex passives, stylistic variations, formal register, literary devices. Multiple levels of embedding, sophisticated connectors.'
      : 'Complete mastery including rare constructions, stylistic variations, register shifts, literary devices, advanced punctuation, sophisticated sentence patterns, rhetorical structures.'
  }

4. Each exercise must contain a complete, grammatically correct English sentence
5. Sentences must strictly match the vocabulary, length, and grammar complexity for ${difficulty} level
6. Sentences should demonstrate the learning focus (e.g., if focus is past perfect, include past perfect in sentences) at ${difficulty} level
7. Break sentences into individual words, preserving punctuation with the word it belongs to
8. Shuffle the words completely randomly
9. Each sentence must be meaningful and educational
10. Include proper capitalization in the original sentence (first word capitalized)
11. Preserve punctuation marks (periods, commas, question marks) attached to the words
12. For grammar-focused exercises, ensure sentences clearly demonstrate the target grammar structure at ${difficulty} level
13. For vocabulary-focused exercises, include target vocabulary words in context appropriate for ${difficulty} level
14. Sentences should be natural and authentic English
15. ${
    difficulty === 'A1' || difficulty === 'A2'
      ? 'Keep sentences simple and straightforward. Avoid complex structures.'
      : difficulty === 'B1' || difficulty === 'B2'
      ? 'Include some complex structures but ensure they are appropriate for the level. For B2, use IELTS-level vocabulary but keep sentences practical (10-15 words maximum).'
      : 'Use sophisticated structures and vocabulary appropriate for IELTS, but keep sentences manageable (12-20 words maximum).'
  }
16. Ensure word order exercises help learners understand sentence structure at ${difficulty} level
17. SENTENCE LENGTH LIMIT: Maximum ${
    difficulty === 'A1'
      ? '7'
      : difficulty === 'A2'
      ? '10'
      : difficulty === 'B1'
      ? '12'
      : difficulty === 'B2'
      ? '15'
      : difficulty === 'C1'
      ? '18'
      : '20'
  } words. Do not exceed this limit. Keep sentences practical and readable.
18. CRITICAL WORD SPLITTING AND VALIDATION:
    STEP 1 - Split sentence into words correctly:
    - Split the sentence by spaces to get individual words
    - Keep punctuation attached to the word it belongs to (e.g., "years." not "years" and ".")
    - Each space-separated unit is ONE word (e.g., "don't" is ONE word, "self-improvement" is ONE word)
    - Contractions count as ONE word: "don't", "can't", "I'm", "it's"
    - Hyphenated words count as ONE word: "self-improvement", "well-known", "state-of-the-art"
    - Do NOT split words incorrectly - if you see "thispartake", that's WRONG - it should be "this" and "partake" as TWO separate words
    
    STEP 2 - Create the "words" array:
    - Take the sentence and split it by spaces
    - Each element in the array is one word with its punctuation
    - Example: "I have been studying." → ["I", "have", "been", "studying."]
    - Count the total number of words
    
    STEP 3 - Create the "shuffled" array:
    - Take the EXACT SAME words from the "words" array
    - Shuffle them randomly
    - The shuffled array MUST have EXACTLY the same number of elements as "words"
    - If "the" appears 3 times in "words", it must appear 3 times in "shuffled"
    - Example: If "words" = ["I", "have", "been", "studying."], then "shuffled" = ["studying.", "I", "been", "have"] (same 4 words, different order)
    
    STEP 4 - VALIDATION BEFORE RETURNING:
    - Count elements in "words" array: words.length
    - Count elements in "shuffled" array: shuffled.length
    - They MUST be equal: words.length === shuffled.length
    - Verify every word in "words" appears in "shuffled" (same count for duplicates)
    - If they don't match, FIX IT before returning JSON
    - DO NOT return JSON if word counts don't match
    
    COMMON MISTAKES TO AVOID:
    - DO NOT combine words: "thispartake" is WRONG - should be "this" and "partake"
    - DO NOT split words incorrectly: "idiosyncrasies" is ONE word, not "id" and "iosyncrasies"
    - DO NOT lose words when shuffling - every word must appear in both arrays
    - DO NOT add extra words - only use words from the original sentence

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
