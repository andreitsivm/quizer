import OpenAI from 'openai';

export const parseCompletion = <T>(
  completion: OpenAI.Chat.Completions.ChatCompletion & {
    _request_id?: string | null;
  },
): T[] => {
  const content = completion.choices[0].message.content || '';
  const jsonStart = content.indexOf('[');
  const jsonString = content.slice(jsonStart).trim();
  const parsed = JSON.parse(jsonString);

  return parsed as T[];
};
