import Link from 'next/link';

import Route from '@/lib/route';

const FloatingContactButton = () => {
  return (
    <Link
      href={Route.CONTACTS}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-gray-15 px-5 py-3 text-16 font-medium text-white shadow-lg transition-colors hover:bg-black"
    >
      Contact Us
    </Link>
  );
};

export default FloatingContactButton;
