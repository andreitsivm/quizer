'use client';
import * as React from 'react';

import {
  accentOptions,
  SettingsFormFields,
} from '@quizer/config/quiz-settings';
import { Controller, useFormContext } from 'react-hook-form';
import Select from '@quizer/ui/select';

const QuizAccent: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name={SettingsFormFields.accent}
      control={control}
      render={({ field }) => <Select options={accentOptions} {...field} />}
    />
  );
};

export default QuizAccent;
