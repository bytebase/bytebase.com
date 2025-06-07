import QuestionsAndAnswersClient from './client';
import type { Question } from './types';

const QUESTIONS: Question[] = [
  {
    question: 'Are self-host and cloud version the same price?',
    answer: 'Yes, the price is the same.',
  },
  {
    question: 'Can self-host version operate in air-gapped environment?',
    answer:
      'Yes, you can deploy it in your own data center or private cloud without any external connectivity.',
  },
  {
    question: 'Which certifications do you have?',
    answer: 'We have SOC 2 Type 2 certification.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, for the Enterprise plan, you can try it for free for 14 days.',
  },
  {
    question: 'Which payment methods do you accept?',
    answer: 'We accept credit card, wire transfers, AWS Marketplace, and GCP Marketplace.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'For the Pro plan, you can cancel your subscription at any time. For the Enterprise plan, it is yearly subscription. You can not cancel in the middle of the year.',
  },
];

export default function QuestionsAndAnswers() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h2 className="mb-12 text-center text-36 font-bold">Questions and Answers</h2>
      <QuestionsAndAnswersClient questions={QUESTIONS} />
    </section>
  );
}
