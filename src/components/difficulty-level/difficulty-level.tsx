'use client';
import * as React from 'react';

import {
  levelsOptions,
  SettingsFormFields,
} from '@quizer/config/quiz-settings';
import { Controller, useFormContext } from 'react-hook-form';
import Select from '@quizer/ui/select';

const DifficultyLevel: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name={SettingsFormFields.level}
      control={control}
      render={({ field }) => <Select options={levelsOptions} {...field} />}
    />
  );
};

export default DifficultyLevel;
