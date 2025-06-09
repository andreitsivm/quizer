'use client';
import * as React from 'react';

import { SettingsFormFields } from '@quizer/config/quiz-settings';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@radix-ui/themes';

const QuestionsQty: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name={SettingsFormFields.questionsQty}
      control={control}
      render={({ field }) => (
        <TextField.Root type='number' {...field}></TextField.Root>
      )}
    />
  );
};

export default QuestionsQty;
