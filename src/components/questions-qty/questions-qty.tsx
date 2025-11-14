'use client';
import * as React from 'react';

import { SettingsFormFields } from '@quizer/config/quiz-settings';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, FormControl, FormHelperText } from '@mui/material';

const QuestionsQty: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name={SettingsFormFields.questionsQty}
      control={control}
      rules={{
        required: 'Please enter number of questions',
        min: { value: 1, message: 'Minimum 1 question required' },
        max: { value: 50, message: 'Maximum 50 questions allowed' },
      }}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          <TextField 
            type='number' 
            label="Number of Questions"
            inputProps={{ min: 1, max: 50 }}
            {...field}
            error={!!fieldState.error}
          />
          {fieldState.error && (
            <FormHelperText error>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default QuestionsQty;
