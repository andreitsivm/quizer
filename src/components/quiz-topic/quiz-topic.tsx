'use client';
import * as React from 'react';

import { SettingsFormFields } from '@quizer/config/quiz-settings';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@radix-ui/themes';

const QuizTopic: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name={SettingsFormFields.topic}
      control={control}
      render={({ field }) => <TextField.Root {...field}></TextField.Root>}
    />
  );
};

export default QuizTopic;
