import Footer from '@/components/Footer';
import Header from '@/components/Header';

import './globals.css';

export const metadata = {
  title: 'Girnar Shilp - Handcrafted Mandirs & Statues',
  description:
    'Girnar Shilp - Premium marble statues, mandirs, stone writing in Gujarat, India.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className='min-h-screen flex flex-col bg-white text-gray-800'>
        <Header />
        <main className='flex-1'>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
