'use client';
import { ChoiceTestQuestion, isMultipleChoice } from '@quizer/types/quizes';
import { 
  Stack, 
  Radio, 
  Checkbox,
  Typography, 
  Paper, 
  Box, 
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import React, { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export const ChoiceQuiz: React.FC<{
  data: ChoiceTestQuestion[];
}> = ({ data }) => {
  const [answers, setAnswers] = useState<(string | string[] | null)[]>(
    Array(data?.length).fill(null),
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSingleChange = (index: number, value: string) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleMultipleChange = (index: number, value: string) => {
    if (submitted) return;
    const newAnswers = [...answers];
    const current = (newAnswers[index] as string[]) || [];
    const newValue = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    newAnswers[index] = newValue.length > 0 ? newValue : null;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correct = 0;
    data.forEach((question, index) => {
      const userAnswer = answers[index];
      if (!userAnswer) return;
      
      if (isMultipleChoice(question)) {
        const correctAnswers = question.correct.sort().join(',');
        const userAnswers = Array.isArray(userAnswer) 
          ? userAnswer.sort().join(',')
          : '';
        if (correctAnswers === userAnswers) correct++;
      } else {
        if (userAnswer === question.correct) correct++;
      }
    });
    return { correct, total: data.length, percentage: Math.round((correct / data.length) * 100) };
  };

  const score = submitted ? calculateScore() : null;

  const isOptionSelected = (index: number, value: string) => {
    const answer = answers[index];
    if (isMultipleChoice(data[index])) {
      return Array.isArray(answer) && answer.includes(value);
    }
    return answer === value;
  };

  const isOptionCorrect = (question: ChoiceTestQuestion, value: string) => {
    if (isMultipleChoice(question)) {
      return question.correct.includes(value);
    }
    return question.correct === value;
  };

  const getOptionStatus = (question: ChoiceTestQuestion, index: number, value: string) => {
    if (!submitted) return null;
    const selected = isOptionSelected(index, value);
    const correct = isOptionCorrect(question, value);
    
    if (isMultipleChoice(question)) {
      if (selected && correct) return 'correct';
      if (selected && !correct) return 'incorrect';
      if (!selected && correct) return 'missed';
      return null;
    } else {
      if (selected && correct) return 'correct';
      if (selected && !correct) return 'incorrect';
      if (!selected && correct) return 'missed';
      return null;
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
            English Quiz
          </Typography>
          {score && (
            <Chip 
              label={`Score: ${score.correct}/${score.total} (${score.percentage}%)`}
              color={score.percentage >= 70 ? 'success' : score.percentage >= 50 ? 'warning' : 'error'}
              sx={{ fontSize: '1rem', fontWeight: 600, py: 2.5 }}
            />
          )}
        </Stack>
        <Typography variant="body1" color="text.secondary">
          {data.length} {data.length === 1 ? 'question' : 'questions'} • 
          {data.some(q => isMultipleChoice(q)) ? ' Multiple Choice' : ' Single Choice'}
        </Typography>
      </Paper>

      <Stack spacing={3}>
        {data.map((question, index) => {
          const isMultiple = isMultipleChoice(question);
          
          return (
            <Paper 
              key={index} 
              elevation={2} 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                border: submitted ? '2px solid' : '1px solid',
                borderColor: submitted 
                  ? (() => {
                      const userAnswer = answers[index];
                      if (!userAnswer) return 'grey.300';
                      if (isMultiple) {
                        const correctAnswers = question.correct.sort().join(',');
                        const userAnswers = Array.isArray(userAnswer) 
                          ? userAnswer.sort().join(',')
                          : '';
                        return correctAnswers === userAnswers ? 'success.main' : 'error.main';
                      } else {
                        return userAnswer === question.correct ? 'success.main' : 'error.main';
                      }
                    })()
                  : 'grey.300',
              }}
            >
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h6" component="h3" fontWeight="600" gutterBottom>
                    Question {index + 1}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                    {question.question}
                  </Typography>
                  {isMultiple && (
                    <Chip 
                      label="Select all that apply" 
                      size="small" 
                      color="info" 
                      sx={{ mt: 1 }}
                    />
                  )}
                </Box>

                <Divider />

                <Stack spacing={1.5}>
                  {Object.keys(question.options).map(value => {
                    const status = getOptionStatus(question, index, value);
                    const selected = isOptionSelected(index, value);
                    
                    return (
                      <Box
                        key={value}
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: '2px solid',
                          borderColor: status === 'correct' 
                            ? 'success.main' 
                            : status === 'incorrect' 
                            ? 'error.main' 
                            : status === 'missed'
                            ? 'warning.main'
                            : selected 
                            ? 'primary.main' 
                            : 'grey.300',
                          bgcolor: status === 'correct' 
                            ? 'success.light' 
                            : status === 'incorrect' 
                            ? 'error.light' 
                            : status === 'missed'
                            ? 'warning.light'
                            : selected 
                            ? 'primary.light' 
                            : 'transparent',
                          transition: 'all 0.2s',
                          '&:hover': !submitted ? {
                            borderColor: 'primary.main',
                            bgcolor: 'action.hover',
                          } : {},
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={2}>
                          {isMultiple ? (
                            <Checkbox
                              checked={selected}
                              onChange={() => handleMultipleChange(index, value)}
                              disabled={submitted}
                              color={status === 'correct' ? 'success' : status === 'incorrect' ? 'error' : 'primary'}
                            />
                          ) : (
                            <Radio
                              name={`q-${index}`}
                              checked={selected}
                              onChange={() => handleSingleChange(index, value)}
                              disabled={submitted}
                              color={status === 'correct' ? 'success' : status === 'incorrect' ? 'error' : 'primary'}
                            />
                          )}
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              flex: 1,
                              fontWeight: selected ? 600 : 400,
                            }}
                          >
                            <strong>{value}:</strong> {question.options[value]}
                          </Typography>
                          {submitted && status && (
                            <Box>
                              {status === 'correct' && (
                                <CheckCircleIcon color="success" />
                              )}
                              {status === 'incorrect' && (
                                <CancelIcon color="error" />
                              )}
                              {status === 'missed' && (
                                <Chip label="Correct" size="small" color="warning" />
                              )}
                            </Box>
                          )}
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>

                {submitted && question.explanation && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Explanation:</strong> {question.explanation}
                    </Typography>
                  </Alert>
                )}
              </Stack>
            </Paper>
          );
        })}
      </Stack>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        {!submitted ? (
          <Paper 
            elevation={3}
            sx={{ 
              p: 3, 
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <Typography variant="h6" color="white" textAlign="center" mb={2}>
              Ready to submit your answers?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Chip
                label="Submit Quiz"
                onClick={() => setSubmitted(true)}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontSize: '1rem',
                  fontWeight: 600,
                  py: 2.5,
                  px: 3,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              />
            </Box>
          </Paper>
        ) : (
          <Paper 
            elevation={3}
            sx={{ 
              p: 4, 
              borderRadius: 3,
              textAlign: 'center',
              bgcolor: score && score.percentage >= 70 ? 'success.light' : score && score.percentage >= 50 ? 'warning.light' : 'error.light',
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {score && score.percentage >= 70 
                ? '🎉 Excellent Work!' 
                : score && score.percentage >= 50 
                ? '👍 Good Job!' 
                : '📚 Keep Practicing!'}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              You got {score?.correct} out of {score?.total} questions correct.
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};
