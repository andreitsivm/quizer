'use client';
import React from 'react';
import DifficultyLevel from '@quizer/components/difficulty-level/difficulty-level';
import { useFormContext } from 'react-hook-form';
import { 
  Button, 
  Container, 
  Box, 
  Typography, 
  Paper, 
  Stack,
  CircularProgress,
} from '@mui/material';
import { QuizSettingsFormState } from '@quizer/config/quiz-settings';
import { useChoiceQuizStore } from '@quizer/store/useChoiceQuizStore';
import QuizTopic from '../quiz-topic/quiz-topic';
import QuizLearningFocus from '../quiz-learning-focus/quiz-learning-focus';
import QuestionsQty from '../questions-qty/questions-qty';
import QuizTypeSelector from '../quiz-type-selector/quiz-type-selector';

const QuizSettings: React.FC = () => {
  const { handleSubmit } = useFormContext<QuizSettingsFormState>();

  const { generateQuizRequest, isLoading } = useChoiceQuizStore();

  const onSubmit = (data: QuizSettingsFormState) => {
    generateQuizRequest(data);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          mb: 4
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Create Your English Quiz
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
          Generate personalized English tests tailored to your learning needs. 
          Choose your difficulty level, focus area, and quiz type to get started.
        </Typography>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h5" gutterBottom fontWeight="600" color="primary">
                Quiz Configuration
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Customize your quiz settings below
              </Typography>
            </Box>

            <QuizTypeSelector />
            <DifficultyLevel />
            <QuizLearningFocus />
            <QuizTopic />
            <QuestionsQty />

            <Box sx={{ pt: 2 }}>
              <Button 
                type='submit' 
                disabled={isLoading}
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  },
                }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 2, color: 'white' }} />
                    Generating Quiz...
                  </>
                ) : (
                  'Generate Quiz'
                )}
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default QuizSettings;
