'use client';
import * as React from 'react';

import {
  quizTypesOptions,
  SettingsFormFields,
} from '@quizer/config/quiz-settings';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Autocomplete } from '@mui/material';

const QuizTypeSelector: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name={SettingsFormFields.quizType}
      control={control}
      rules={{
        required: 'Please, choose quiz type',
      }}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          <Autocomplete
            options={quizTypesOptions}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value[0] === value.value[0]}
            value={quizTypesOptions.find(opt => opt.value[0] === field.value) || quizTypesOptions[0]}
            onChange={(_, newValue) => {
              field.onChange(newValue?.value[0] || '');
            }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label='Quiz Type'
                error={!!fieldState.error}
              />
            )}
          />

          {fieldState.error && (
            <FormHelperText error>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

export default QuizTypeSelector;

