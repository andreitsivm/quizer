'use client';
import * as React from 'react';

import {
  levelsOptions,
  SettingsFormFields,
} from '@quizer/config/quiz-settings';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Autocomplete } from '@mui/material';

const DifficultyLevel: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name={SettingsFormFields.level}
      control={control}
      rules={{
        required: 'Please, choose difficulty level',
      }}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          <Autocomplete
            options={levelsOptions}
            getOptionLabel={(option) => `${option.value} - ${option.label}`}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            value={levelsOptions.find(opt => opt.value === field.value) || null}
            onChange={(_, newValue) => {
              field.onChange(newValue?.value || '');
            }}
            renderInput={params => (
              <TextField 
                {...params} 
                label='Difficulty Level (CEFR)'
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

export default DifficultyLevel;
