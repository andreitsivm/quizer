import {
  initialSettingsValues,
  QuizSettingsFormState,
} from '@quizer/config/quiz-settings';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const QuizSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const methods = useForm<QuizSettingsFormState>({
    defaultValues: {
      ...initialSettingsValues,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default QuizSettingsProvider;
