'use client';
import React from 'react';
import DifficultyLevel from '@quizer/components/difficulty-level/difficulty-level';
import { useFormContext } from 'react-hook-form';
import { Button, Container } from '@radix-ui/themes';
import { QuizSettingsFormState } from '@quizer/config/quiz-settings';
import { useChoiceQuizStore } from '@quizer/store/useChoiceQuizStore';
import QuizTopic from '../quiz-topic/quiz-topic';
import QuizLearningFocus from '../quiz-learning-focus/quiz-learning-focus';
import QuestionsQty from '../questions-qty/questions-qty';

const QuizSettings: React.FC = () => {
  const { handleSubmit } = useFormContext<QuizSettingsFormState>();

  const { generateQuizRequest, isLoading } = useChoiceQuizStore();

  const onSubmit = (data: QuizSettingsFormState) => {
    generateQuizRequest(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-2xl mb-2'>Generate your test</h2>
        <p className='mb-2'>
          Use this settings to create most required test according to your
          requirements
        </p>
        <div className='flex gap-4 mb-4 items-center'>
          <DifficultyLevel />
          <QuizLearningFocus />
          <QuizTopic />
          <QuestionsQty />
        </div>
        <Button type='submit' disabled={isLoading}>
          Generate
        </Button>
      </form>
    </Container>
  );
};

export default QuizSettings;
