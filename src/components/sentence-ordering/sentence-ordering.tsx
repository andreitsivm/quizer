import React, { useState } from 'react';

interface SentenceOrderingQuestion {
  sentence: string;
  shuffled: string[];
}

export const SentenceOrderingQuiz: React.FC<{
  data: SentenceOrderingQuestion[];
}> = ({ data }) => {
  const [answers, setAnswers] = useState<string[][]>([]);

  const handleSelect = (questionIndex: number, word: string) => {
    setAnswers(prev => {
      const newAnswers = [...(prev[questionIndex] || [])];
      if (!newAnswers.includes(word)) {
        newAnswers.push(word);
      }
      const updated = [...prev];
      updated[questionIndex] = newAnswers;
      return updated;
    });
  };

  return (
    <div className='space-y-6'>
      {data.map((q, index) => (
        <div key={index}>
          <p className='mb-2 text-sm font-medium'>
            Arrange the words into a correct sentence:
          </p>
          <div className='flex flex-wrap gap-2 mb-2'>
            {q.shuffled.map((word, i) => (
              <button
                key={i}
                onClick={() => handleSelect(index, word)}
                className='px-2 py-1 border rounded hover:bg-gray-100'
              >
                {word}
              </button>
            ))}
          </div>
          <p className='text-green-600'>
            Your answer: {(answers[index] || []).join(' ')}
          </p>
        </div>
      ))}
    </div>
  );
};
