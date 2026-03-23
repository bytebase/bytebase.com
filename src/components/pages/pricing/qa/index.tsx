import QuestionsAndAnswersClient from './client';
import type { Question } from './types';

const QUESTIONS: Question[] = [
  {
    question: 'What deployment options are available for each plan?',
    answer:
      'The Free plan supports both self-host and cloud. The Pro plan is available on Bytebase Cloud only. The Enterprise plan supports both self-host and cloud deployments.',
  },
  {
    question: 'Can self-host version operate in air-gapped environment?',
    answer:
      'Yes, with an Enterprise license, you can deploy it in your own data center or private cloud without any external connectivity.',
  },
  {
    question: 'Which certifications do you have?',
    answer: 'We have SOC 2 Type 2 certification.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes, for self-hosted instances, you can start a 14-day Enterprise trial to access the full feature set. For the Enterprise plan, you can also contact us to request a trial.',
  },
  {
    question: 'Which payment methods do you accept?',
    answer:
      'For the Pro plan, we accept credit card. For the Enterprise plan, we accept credit card, wire transfers, AWS Marketplace, and GCP Marketplace.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'For the Pro plan, you can cancel your subscription at any time. For the Enterprise plan, it is yearly subscription. You can not cancel in the middle of the year.',
  },
  {
    question: 'What about existing Pro self-host licenses?',
    answer:
      'Existing Pro self-host licenses are grandfathered and will continue to work as-is. No changes will be made to currently active licenses.',
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
