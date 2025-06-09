'use client';
import React from 'react';
import { Container, Spinner } from '@radix-ui/themes';
import { ChoiceQuiz } from '@quizer/components/choice-test/choice-test';

import { useChoiceQuizStore } from '@quizer/store/useChoiceQuizStore';

const SingleChoiceQuiz = () => {
  const { result, isLoading } = useChoiceQuizStore();

  if (isLoading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }

  if (!result) {
    return (
      <Container className='text-center text-gray-500'>
        No questions available
      </Container>
    );
  }
  return (
    <Container>
      <ChoiceQuiz data={result.quiz} />
    </Container>
  );
};

export default SingleChoiceQuiz;
