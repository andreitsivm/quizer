'use client';
import React from 'react';
import QuizSettingsProvider from '@quizer/providers/quiz-settings-provider';

const RootProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <QuizSettingsProvider>{children}</QuizSettingsProvider>;
};

export default RootProvider;
