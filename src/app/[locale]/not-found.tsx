import Button from '@/components/shared/button';

export default function NotFound() {
  return (
    <>
      {/*
        No support for metadata in not-found.tsx yet
        https://github.com/vercel/next.js/pull/47328#issuecomment-1488891093
      */}
      <title>Page Not Found</title>
      <div className="container my-32">
        <h1 className="text-40 font-semibold sm:text-28">Not Found!</h1>
        <p className="mt-6 sm:mt-4">Could not find requested resource</p>

        <Button className="mt-10 sm:mt-8" size="md" theme="primary-filled" href="/">
          Go to Home page
        </Button>
      </div>
    </>
  );
}
