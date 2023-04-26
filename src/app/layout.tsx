import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';

import '@/styles/main.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex h-full flex-col">
        <Header />
        <main className="relative z-20 shrink-0 grow basis-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
