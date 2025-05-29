import React from 'react';

interface MatchingSet {
  words: string[];
  translations: string[];
}

export const WordMatchingQuiz: React.FC<{ data: MatchingSet[] }> = ({
  data,
}) => {
  return (
    <div className='space-y-6'>
      {data.map((set, index) => (
        <div key={index}>
          <p className='text-sm font-medium'>
            Match the English words to their Ukrainian translations:
          </p>
          <div className='flex gap-12'>
            <ul>
              {set.words.map((word, i) => (
                <li key={i} className='py-1'>
                  {word}
                </li>
              ))}
            </ul>
            <ul>
              {set.translations.map((t, i) => (
                <li key={i} className='py-1'>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
