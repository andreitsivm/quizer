'use client';
import React from 'react';
import DifficultyLevel from '@quizer/components/difficulty-level/difficulty-level';
import { useFormContext } from 'react-hook-form';
import { Button } from '@radix-ui/themes';
import { QuizSettingsFormState } from '@quizer/config/quiz-settings';
import { useChoiceQuizStore } from '@quizer/store/useChoiceQuizStore';

const QuizSettings: React.FC = () => {
  const { handleSubmit } = useFormContext<QuizSettingsFormState>();

  const { generateQuizRequest, isLoading } = useChoiceQuizStore();

  const onSubmit = (data: QuizSettingsFormState) => {
    generateQuizRequest(data);
  };

  return (
    <form className='flex gap-4 items-center' onSubmit={handleSubmit(onSubmit)}>
      <DifficultyLevel />
      <Button type='submit' className='my-4 mx-auto' disabled={isLoading}>
        Generate
      </Button>
    </form>
  );
};

export default QuizSettings;
