'use client';
import { ChoiceTestQuestion } from '@quizer/types/quizes';
import { Flex, Radio, Text } from '@radix-ui/themes';
import React, { useState } from 'react';

export const ChoiceQuiz: React.FC<{
  data: ChoiceTestQuestion[];
}> = ({ data }) => {
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(data?.length).fill(null),
  );

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <div className='space-y-6 my-4'>
      {data.map((test, index) => (
        <div key={index}>
          <p className='mb-2 font-medium'>{test.question}</p>
          {Object.keys(test.options).map(value => {
            const isSelected = answers[index] === value;
            const isCorrect = test.correct === value;
            const shouldShow = isSelected;

            return (
              <Flex key={value} align='start' direction='column' gap='1'>
                <Flex asChild gap='2'>
                  <Text as='label' size='2'>
                    <Radio
                      name={`q-${index}`}
                      value={value}
                      checked={isSelected}
                      onChange={() => handleChange(index, value)}
                      className='mr-2'
                    />
                    {value}: {test.options[value]}
                    {shouldShow && (
                      <span
                        className={`ml-2 ${
                          isCorrect ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {isCorrect ? '✅ Correct' : '❌ Incorrect'}
                      </span>
                    )}
                  </Text>
                </Flex>
              </Flex>
            );
          })}
        </div>
      ))}
    </div>
  );
};
