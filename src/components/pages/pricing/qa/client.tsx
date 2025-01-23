'use client';

import type { Question } from './types';

type Props = {
  questions: Question[];
};

export default function QuestionsAndAnswersClient({ questions }: Props) {
  return (
    <div className="space-y-4 text-16">
      {questions.map((item, index) => (
        <div key={index} className="border-gray-200 overflow-hidden border p-6">
          <h3 className="mb-2 font-medium">{item.question}</h3>
          <p className="text-gray-600">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
