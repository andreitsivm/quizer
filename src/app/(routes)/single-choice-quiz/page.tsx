'use client';
import React, { useEffect, useRef } from 'react';
import { Container, CircularProgress, Typography, Paper } from '@mui/material';
import { ChoiceQuiz } from '@quizer/components/choice-test/choice-test';
import { WordMatchingQuiz } from '@quizer/components/word-matching/word-matching';
import { SentenceOrderingQuiz } from '@quizer/components/sentence-ordering/sentence-ordering';
import { useChoiceQuizStore } from '@quizer/store/useChoiceQuizStore';
import { QuizTypes } from '@quizer/config/quiz-settings';
import {
  ChoiceTestQuestion,
  WordMatchingQuestion,
  SentenceOrderingQuestion,
} from '@quizer/types/quizes';

const SingleChoiceQuiz = () => {
  const { result, isLoading, quizType } = useChoiceQuizStore();
  const quizRef = useRef<HTMLDivElement>(null);

  // Scroll to quiz when it's ready
  useEffect(() => {
    if (result && quizRef.current && !isLoading) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        quizRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }, [result, isLoading]);

  if (isLoading) {
    return (
      <Container maxWidth='lg' sx={{ py: 8 }}>
        <Paper
          elevation={2}
          sx={{ p: 6, borderRadius: 3, textAlign: 'center' }}
        >
          <CircularProgress size={60} />
          <Typography variant='h6' sx={{ mt: 3 }}>
            Generating your quiz...
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
            This may take a few moments
          </Typography>
        </Paper>
      </Container>
    );
  }

  if (!result) {
    return (
      <Container maxWidth='lg' sx={{ py: 8 }}>
        <Paper
          elevation={2}
          sx={{ p: 6, borderRadius: 3, textAlign: 'center' }}
        >
          <Typography variant='h5' gutterBottom>
            No quiz available
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Please generate a quiz using the form above.
          </Typography>
        </Paper>
      </Container>
    );
  }

  const renderQuiz = () => {
    const type = result.quizType || quizType;

    switch (type) {
      case QuizTypes.wordMatching:
        return (
          <WordMatchingQuiz data={result.quiz as WordMatchingQuestion[]} />
        );
      case QuizTypes.sentenceOrdering:
        return (
          <SentenceOrderingQuiz
            data={result.quiz as SentenceOrderingQuestion[]}
          />
        );
      case QuizTypes.multipleChoice:
      case QuizTypes.singleChoice:
      default:
        return <ChoiceQuiz data={result.quiz as ChoiceTestQuestion[]} />;
    }
  };

  return (
    <Container maxWidth='lg'>
      <div ref={quizRef}>{renderQuiz()}</div>
    </Container>
  );
};

export default SingleChoiceQuiz;
