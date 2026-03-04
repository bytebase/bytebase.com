'use client';

import Route from '@/lib/route';
import { useRouter } from 'next/navigation';

const FloatingContactButton = () => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(Route.CONTACTS)}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-gray-15 px-5 py-3 text-16 font-medium text-white shadow-lg transition-colors hover:bg-black"
    >
      Contact Us
    </button>
  );
};

export default FloatingContactButton;
