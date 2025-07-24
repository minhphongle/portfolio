import type { Metadata } from 'next';
import { Montserrat, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/layout/Navigation';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat'
});
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'Minh Phong - Product Manager',
  description: 'Product Manager based in Singapore with experience in tech and user-centered design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${playfairDisplay.variable}`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
