'use client';
import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Box,
  Paper,
  Typography,
  Stack,
  Chip,
  Button,
  Alert,
} from '@mui/material';
import { SentenceOrderingQuestion } from '@quizer/types/quizes';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

interface SortableWordProps {
  id: string;
  word: string;
  isDragging?: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
}

const SortableWord: React.FC<SortableWordProps> = ({
  id,
  word,
  isDragging,
  isCorrect,
  isIncorrect,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isItemDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isItemDragging ? 0.5 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        p: 2,
        borderRadius: 2,
        border: '2px solid',
        borderColor: isCorrect
          ? 'success.main'
          : isIncorrect
          ? 'error.main'
          : 'grey.300',
        bgcolor: isCorrect
          ? 'success.light'
          : isIncorrect
          ? 'error.light'
          : 'grey.50',
        cursor: 'grab',
        '&:active': {
          cursor: 'grabbing',
        },
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'action.hover',
        },
      }}
    >
      <Typography variant="body1" fontWeight={600}>
        {word}
      </Typography>
    </Box>
  );
};

export const SentenceOrderingQuiz: React.FC<{
  data: SentenceOrderingQuestion[];
}> = ({ data }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [wordOrders, setWordOrders] = useState<Record<number, string[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Initialize word orders with shuffled words
  React.useEffect(() => {
    const initialOrders: Record<number, string[]> = {};
    data.forEach((question, index) => {
      // Validate that shuffled has the same words as the correct order
      // If shuffled is missing words or has wrong count, use shuffled as-is but log warning
      if (question.shuffled.length !== question.words.length) {
        console.warn(
          `Question ${index + 1}: Shuffled array length (${question.shuffled.length}) doesn't match words array length (${question.words.length})`
        );
      }
      initialOrders[index] = [...question.shuffled];
    });
    setWordOrders(initialOrders);
  }, [data]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Parse question index and word index
    const activeMatch = activeId.match(/^q(\d+)-word-(\d+)$/);
    const overMatch = overId.match(/^q(\d+)-word-(\d+)$/);

    if (!activeMatch || !overMatch) return;

    const qIndex = parseInt(activeMatch[1]);
    const oldIndex = parseInt(activeMatch[2]);
    const newIndex = parseInt(overMatch[2]);

    if (qIndex !== parseInt(overMatch[1])) return;

    setWordOrders((prev) => {
      const newOrders = { ...prev };
      const currentOrder = [...(newOrders[qIndex] || [])];
      newOrders[qIndex] = arrayMove(currentOrder, oldIndex, newIndex);
      return newOrders;
    });
  };

  const calculateScore = () => {
    let correct = 0;
    data.forEach((question, qIndex) => {
      const userOrder = wordOrders[qIndex] || [];
      const correctOrder = question.words;

      // Check if arrays have the same length
      if (userOrder.length !== correctOrder.length) {
        return; // Skip this question if lengths don't match
      }

      // Compare arrays element by element (handles duplicates correctly)
      const isCorrect = userOrder.every(
        (word, index) => word === correctOrder[index]
      );
      
      if (isCorrect) correct++;
    });

    return {
      correct,
      total: data.length,
      percentage: Math.round((correct / data.length) * 100),
    };
  };

  const score = submitted ? calculateScore() : null;

  const isWordCorrect = (qIndex: number, wordIndex: number) => {
    if (!submitted) return false;
    const question = data[qIndex];
    const userOrder = wordOrders[qIndex] || [];
    const correctOrder = question.words;

    // Check bounds and compare word at this position
    if (wordIndex >= userOrder.length || wordIndex >= correctOrder.length) {
      return false;
    }

    return userOrder[wordIndex] === correctOrder[wordIndex];
  };

  const isSentenceCorrect = (qIndex: number) => {
    if (!submitted) return false;
    const question = data[qIndex];
    const userOrder = wordOrders[qIndex] || [];
    const correctOrder = question.words;

    if (userOrder.length !== correctOrder.length) return false;
    return userOrder.every((word, index) => word === correctOrder[index]);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
            Sentence Ordering Quiz
          </Typography>
          {score && (
            <Chip
              label={`Score: ${score.correct}/${score.total} (${score.percentage}%)`}
              color={
                score.percentage >= 70
                  ? 'success'
                  : score.percentage >= 50
                  ? 'warning'
                  : 'error'
              }
              sx={{ fontSize: '1rem', fontWeight: 600, py: 2.5 }}
            />
          )}
        </Stack>
        <Typography variant="body1" color="text.secondary">
          {data.length} {data.length === 1 ? 'sentence' : 'sentences'} • Drag
          words to arrange them in the correct order
        </Typography>
      </Paper>

      <Stack spacing={4}>
        {data.map((question, qIndex) => {
          const currentOrder = wordOrders[qIndex] || question.shuffled;
          const wordIds = currentOrder.map((_, i) => `q${qIndex}-word-${i}`);
          const sentenceCorrect = isSentenceCorrect(qIndex);
          
          // Validate data integrity
          const hasDataIssue = question.shuffled.length !== question.words.length;

          return (
            <Paper
              key={qIndex}
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                border: submitted ? '2px solid' : '1px solid',
                borderColor: submitted
                  ? sentenceCorrect
                    ? 'success.main'
                    : 'error.main'
                  : 'grey.300',
              }}
            >
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h6" fontWeight="600" gutterBottom>
                    Sentence {qIndex + 1}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Arrange the words to form a correct sentence:
                  </Typography>
                  {hasDataIssue && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      Warning: The number of words doesn't match. Please ensure all words are included.
                    </Alert>
                  )}
                </Box>

                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={wordIds}
                    strategy={verticalListSortingStrategy}
                  >
                    <Stack spacing={1.5} direction="row" flexWrap="wrap" gap={1}>
                      {currentOrder.map((word, wordIndex) => {
                        const correct = isWordCorrect(qIndex, wordIndex);
                        const incorrect =
                          submitted &&
                          !sentenceCorrect &&
                          !correct &&
                          wordIndex < question.words.length;

                        return (
                          <SortableWord
                            key={`q${qIndex}-word-${wordIndex}`}
                            id={`q${qIndex}-word-${wordIndex}`}
                            word={word}
                            isCorrect={correct}
                            isIncorrect={incorrect}
                          />
                        );
                      })}
                    </Stack>
                  </SortableContext>

                  <DragOverlay>
                    {activeId ? (
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          border: '2px solid',
                          borderColor: 'primary.main',
                          bgcolor: 'primary.light',
                        }}
                      >
                        <Typography variant="body1" fontWeight={600}>
                          {activeId.match(/^q\d+-word-(\d+)$/) &&
                            currentOrder[
                              parseInt(
                                activeId.match(/^q\d+-word-(\d+)$/)![1]
                              )
                            ]}
                        </Typography>
                      </Box>
                    ) : null}
                  </DragOverlay>
                </DndContext>

                {submitted && (
                  <Box>
                    <Typography variant="body2" fontWeight="600" gutterBottom>
                      Your sentence:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: sentenceCorrect
                          ? 'success.light'
                          : 'error.light',
                        border: '1px solid',
                        borderColor: sentenceCorrect
                          ? 'success.main'
                          : 'error.main',
                      }}
                    >
                      {currentOrder.join(' ')}
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="600"
                      gutterBottom
                      sx={{ mt: 2 }}
                    >
                      Correct sentence:
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'success.light',
                        border: '1px solid',
                        borderColor: 'success.main',
                      }}
                    >
                      {question.sentence}
                    </Typography>
                  </Box>
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
              Ready to submit your sentences?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                onClick={() => setSubmitted(true)}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                Submit Quiz
              </Button>
            </Box>
          </Paper>
        ) : (
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              textAlign: 'center',
              bgcolor:
                score && score.percentage >= 70
                  ? 'success.light'
                  : score && score.percentage >= 50
                  ? 'warning.light'
                  : 'error.light',
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
              You correctly ordered {score?.correct} out of {score?.total}{' '}
              sentences.
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};
