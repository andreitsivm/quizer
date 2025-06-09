'use client';
import * as React from 'react';

import {
  learningFocusOptions,
  SettingsFormFields,
} from '@quizer/config/quiz-settings';
import { Controller, useFormContext } from 'react-hook-form';
import Select from '@quizer/ui/select';

const QuizLearningFocus: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name={SettingsFormFields.learningFocus}
      control={control}
      rules={{
        required: 'Please choose learning focus',
      }}
      render={({ field, fieldState }) => (
        <div>
          <Select
            selectTriggerProps={{
              placeholder: 'Learning focus',
            }}
            options={learningFocusOptions}
            {...field}
          />
          <p>{fieldState.error?.message}</p>
        </div>
      )}
    />
  );
};

export default QuizLearningFocus;
