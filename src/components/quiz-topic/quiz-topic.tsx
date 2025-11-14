'use client';
import React from 'react';

import { SettingsFormFields } from '@quizer/config/quiz-settings';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField, FormControl } from '@mui/material';

const QuizTopic: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      name={SettingsFormFields.topic}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth>
          <TextField 
            label="Topic (Optional)" 
            placeholder="e.g., Business English, Travel, Technology"
            helperText="Leave empty for general topics"
            {...field}
          />
        </FormControl>
      )}
    />
  );
};

export default QuizTopic;
