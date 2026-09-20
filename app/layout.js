import { Inter, Source_Serif_4 } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Nav from '../components/Nav';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const serif = Source_Serif_4({ subsets: ['latin'], variable: '--font-serif' });

export const metadata = {
  title: 'Ledger Lane — Free finance tools for local businesses',
  description: 'Free bookkeeping, invoicing, and planning tools built for small local businesses.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`}>
      <body suppressHydrationWarning>
        <Nav />
        {children}
            <footer className="footer">
  <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
    <span>Ledger Lane is a free resource for local businesses. Not a substitute for a licensed accountant.</span>
    <span style={{ display: 'flex', gap: 16 }}>
      <a href="/about">About</a>
      <a href="/faq">FAQ</a>
      <a href="/contact">Contact</a>
      <a href="/learn">Learn</a>
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
    </span>
  </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}