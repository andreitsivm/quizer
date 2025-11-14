'use client';
import React, { useState, useEffect } from 'react';
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
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Box, Paper, Typography, Stack, Chip, Button } from '@mui/material';
import { WordMatchingQuestion } from '@quizer/types/quizes';

interface DraggableDroppableItemProps {
  id: string;
  value: string;
  isMatched?: boolean;
  isCorrect?: boolean;
  isIncorrect?: boolean;
  isDragging?: boolean;
  isOver?: boolean;
}

const DraggableDroppableItem: React.FC<DraggableDroppableItemProps> = ({
  id,
  value,
  isMatched,
  isCorrect,
  isIncorrect,
  isDragging,
  isOver,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef: setDraggableRef,
    transform,
    isDragging: isItemDragging,
  } = useDraggable({ id });

  const { setNodeRef: setDroppableRef, isOver: isDroppableOver } = useDroppable(
    { id },
  );

  // Combine refs
  const setNodeRef = (node: HTMLElement | null) => {
    setDraggableRef(node);
    setDroppableRef(node);
  };

  const isOverState = isOver || isDroppableOver;
  const isDraggingState = isItemDragging || isDragging;

  // Combine drag transform with scale transform
  const scaleTransform = isOverState
    ? 'scale(1.05)'
    : isDraggingState
    ? 'scale(0.95)'
    : 'scale(1)';

  const dragTransform = transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : '';

  const combinedTransform = dragTransform
    ? `${dragTransform} ${scaleTransform}`
    : scaleTransform;

  return (
    <Box
      ref={setNodeRef}
      style={{ transform: combinedTransform }}
      {...listeners}
      {...attributes}
      sx={{
        p: 2,
        borderRadius: 2,
        border: '2px solid',
        borderColor: isOverState
          ? 'primary.main'
          : isCorrect
          ? 'success.main'
          : isIncorrect
          ? 'error.main'
          : isMatched
          ? 'primary.main'
          : 'grey.300',
        bgcolor: isOverState
          ? 'primary.light'
          : isCorrect
          ? 'success.light'
          : isIncorrect
          ? 'error.light'
          : isMatched
          ? 'primary.light'
          : 'grey.50',
        cursor: isMatched ? 'default' : 'grab',
        opacity: isDraggingState ? 0.5 : 1,
        boxShadow: isOverState ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
        '&:active': {
          cursor: 'grabbing',
        },
        transition: transform ? 'none' : 'all 0.2s',
        zIndex: isDraggingState ? 1000 : 1,
      }}
    >
      <Typography variant='body1' fontWeight={isMatched ? 600 : 400}>
        {value}
      </Typography>
    </Box>
  );
};

// Helper function to shuffle array and return shuffled array with original indices
const shuffleWithIndices = <T,>(
  array: T[],
): Array<{ value: T; originalIndex: number }> => {
  const indexed = array.map((value, index) => ({
    value,
    originalIndex: index,
  }));
  // Fisher-Yates shuffle
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  return indexed;
};

export const WordMatchingQuiz: React.FC<{ data: WordMatchingQuestion[] }> = ({
  data,
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [matches, setMatches] = useState<
    Record<number, Record<string, string | null>>
  >({});
  const [submitted, setSubmitted] = useState(false);

  // Shuffle words and translations for display, maintaining original indices
  type ShuffledItem = { value: string; originalIndex: number };
  type ShuffledData = Record<
    number,
    {
      english: ShuffledItem[];
      translations: ShuffledItem[];
    }
  >;
  const [shuffledData, setShuffledData] = useState<ShuffledData>({});

  // Initialize shuffled data on mount
  useEffect(() => {
    const shuffled: typeof shuffledData = {};
    data.forEach((question, index) => {
      shuffled[index] = {
        english: shuffleWithIndices(question.words),
        translations: shuffleWithIndices(question.translations),
      };
    });
    setShuffledData(shuffled);
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Parse the IDs to get question index and type
    const activeMatch = activeId.match(/^q(\d+)-(english|translation)-(\d+)$/);
    const overMatch = overId.match(/^q(\d+)-(english|translation)-(\d+)$/);

    if (!activeMatch || !overMatch) return;

    const activeQIndex = parseInt(activeMatch[1]);
    const activeType = activeMatch[2];
    const activeDisplayIndex = parseInt(activeMatch[3]);

    const overQIndex = parseInt(overMatch[1]);
    const overType = overMatch[2];
    const overDisplayIndex = parseInt(overMatch[3]);

    // Only allow matching between different types (English <-> Translation) in the same question
    if (activeQIndex !== overQIndex || activeType === overType) return;

    // Get original indices from shuffled data
    const shuffled = shuffledData[activeQIndex];
    if (!shuffled) return;

    const activeOriginalIndex =
      activeType === 'english'
        ? shuffled.english[activeDisplayIndex].originalIndex
        : shuffled.translations[activeDisplayIndex].originalIndex;

    const overOriginalIndex =
      overType === 'english'
        ? shuffled.english[overDisplayIndex].originalIndex
        : shuffled.translations[overDisplayIndex].originalIndex;

    setMatches(prev => {
      const newMatches = { ...prev };
      if (!newMatches[activeQIndex]) {
        newMatches[activeQIndex] = {};
      }

      // Clear any existing matches for these words
      Object.keys(newMatches[activeQIndex]).forEach(key => {
        if (
          key === `english-${activeOriginalIndex}` ||
          key === `translation-${activeOriginalIndex}` ||
          key === `english-${overOriginalIndex}` ||
          key === `translation-${overOriginalIndex}` ||
          newMatches[activeQIndex][key] === `english-${activeOriginalIndex}` ||
          newMatches[activeQIndex][key] ===
            `translation-${activeOriginalIndex}` ||
          newMatches[activeQIndex][key] === `english-${overOriginalIndex}` ||
          newMatches[activeQIndex][key] === `translation-${overOriginalIndex}`
        ) {
          delete newMatches[activeQIndex][key];
        }
      });

      // Create new match using original indices
      if (activeType === 'english') {
        newMatches[activeQIndex][
          `english-${activeOriginalIndex}`
        ] = `translation-${overOriginalIndex}`;
        newMatches[activeQIndex][
          `translation-${overOriginalIndex}`
        ] = `english-${activeOriginalIndex}`;
      } else {
        newMatches[activeQIndex][
          `translation-${activeOriginalIndex}`
        ] = `english-${overOriginalIndex}`;
        newMatches[activeQIndex][
          `english-${overOriginalIndex}`
        ] = `translation-${activeOriginalIndex}`;
      }

      return newMatches;
    });
  };

  const calculateScore = () => {
    let correct = 0;
    let total = 0;

    data.forEach((question, qIndex) => {
      question.pairs.forEach(pair => {
        total++;
        const englishIndex = question.words.indexOf(pair.english);
        const translationIndex = question.translations.indexOf(
          pair.translation,
        );

        const match =
          matches[qIndex]?.[`english-${englishIndex}`] ===
          `translation-${translationIndex}`;

        if (match) correct++;
      });
    });

    return { correct, total, percentage: Math.round((correct / total) * 100) };
  };

  const score = submitted ? calculateScore() : null;

  const isMatched = (qIndex: number, type: string, index: number) => {
    return !!matches[qIndex]?.[`${type}-${index}`];
  };

  const isCorrectMatch = (
    qIndex: number,
    type: string,
    index: number,
    question: WordMatchingQuestion,
  ) => {
    if (!submitted) return false;
    const match = matches[qIndex]?.[`${type}-${index}`];
    if (!match) return false;

    const word =
      type === 'english' ? question.words[index] : question.translations[index];
    const matchedType = match.split('-')[0];
    const matchedIndex = parseInt(match.split('-')[1]);
    const matchedWord =
      matchedType === 'english'
        ? question.words[matchedIndex]
        : question.translations[matchedIndex];

    const correctPair = question.pairs.find(
      p =>
        (p.english === word && p.translation === matchedWord) ||
        (p.english === matchedWord && p.translation === word),
    );

    return !!correctPair;
  };

  return (
    <Box sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography
            variant='h4'
            component='h1'
            fontWeight='bold'
            color='primary'
          >
            Word Matching Quiz
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
        <Typography variant='body1' color='text.secondary'>
          {data.length} {data.length === 1 ? 'exercise' : 'exercises'} • Drag
          English words to match with their translations
        </Typography>
      </Paper>

      <Stack spacing={4}>
        {data.map((question, qIndex) => {
          const shuffled = shuffledData[qIndex];
          if (!shuffled) return null;

          return (
            <Paper key={qIndex} elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant='h6' fontWeight='600' gutterBottom>
                Exercise {qIndex + 1}
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
                Match the English words with their translations
              </Typography>

              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant='subtitle1' fontWeight='600' mb={2}>
                      English
                    </Typography>
                    <Stack spacing={1.5}>
                      {shuffled.english.map((item, displayIndex) => {
                        const originalIndex = item.originalIndex;
                        const matched = isMatched(
                          qIndex,
                          'english',
                          originalIndex,
                        );
                        const correct = isCorrectMatch(
                          qIndex,
                          'english',
                          originalIndex,
                          question,
                        );
                        const incorrect = submitted && matched && !correct;
                        const itemId = `q${qIndex}-english-${displayIndex}`;
                        const isOver = !!(
                          activeId &&
                          activeId.startsWith(`q${qIndex}-translation-`) &&
                          activeId !== itemId
                        );

                        return (
                          <DraggableDroppableItem
                            key={itemId}
                            id={itemId}
                            value={item.value}
                            isMatched={matched}
                            isCorrect={correct}
                            isIncorrect={incorrect}
                            isDragging={activeId === itemId}
                            isOver={isOver}
                          />
                        );
                      })}
                    </Stack>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant='subtitle1' fontWeight='600' mb={2}>
                      Translation
                    </Typography>
                    <Stack spacing={1.5}>
                      {shuffled.translations.map((item, displayIndex) => {
                        const originalIndex = item.originalIndex;
                        const matched = isMatched(
                          qIndex,
                          'translation',
                          originalIndex,
                        );
                        const correct = isCorrectMatch(
                          qIndex,
                          'translation',
                          originalIndex,
                          question,
                        );
                        const incorrect = submitted && matched && !correct;
                        const itemId = `q${qIndex}-translation-${displayIndex}`;
                        const isOver = !!(
                          activeId &&
                          activeId.startsWith(`q${qIndex}-english-`) &&
                          activeId !== itemId
                        );

                        return (
                          <DraggableDroppableItem
                            key={itemId}
                            id={itemId}
                            value={item.value}
                            isMatched={matched}
                            isCorrect={correct}
                            isIncorrect={incorrect}
                            isDragging={activeId === itemId}
                            isOver={isOver}
                          />
                        );
                      })}
                    </Stack>
                  </Box>
                </Stack>

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
                      <Typography variant='body1'>
                        {(() => {
                          const match = activeId.match(
                            /^q(\d+)-(english|translation)-(\d+)$/,
                          );
                          if (!match) return '';
                          const qIdx = parseInt(match[1]);
                          const type = match[2];
                          const displayIdx = parseInt(match[3]);
                          const shuffled = shuffledData[qIdx];
                          if (!shuffled) return '';
                          return type === 'english'
                            ? shuffled.english[displayIdx].value
                            : shuffled.translations[displayIdx].value;
                        })()}
                      </Typography>
                    </Box>
                  ) : null}
                </DragOverlay>
              </DndContext>
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
            <Typography variant='h6' color='white' textAlign='center' mb={2}>
              Ready to submit your matches?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant='contained'
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
            <Typography variant='h5' fontWeight='bold' gutterBottom>
              {score && score.percentage >= 70
                ? '🎉 Excellent Work!'
                : score && score.percentage >= 50
                ? '👍 Good Job!'
                : '📚 Keep Practicing!'}
            </Typography>
            <Typography variant='body1' sx={{ mt: 1 }}>
              You matched {score?.correct} out of {score?.total} word pairs
              correctly.
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};
