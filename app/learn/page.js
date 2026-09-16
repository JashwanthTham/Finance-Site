import Link from 'next/link';

const ARTICLES = [
  { href: '/learn/profit-margin', title: 'What is profit margin, and why does it matter?', desc: 'The difference between revenue and actually keeping money.' },
  { href: '/learn/reading-a-pl', title: 'How to read your own P&L', desc: 'What each line on a profit & loss statement actually tells you.' },
  { href: '/learn/cash-flow-vs-profit', title: 'Cash flow vs. profit — they\'re not the same thing', desc: 'Why a profitable business can still run out of cash.' },
  { href: '/learn/business-expenses', title: 'What counts as a business expense?', desc: 'A plain-language starting point for tracking spending.' },
  { href: '/learn/invoices-vs-quotes', title: 'Invoices vs. quotes: what\'s the difference?', desc: 'When to send which, and why it matters.' },
  { href: '/learn/break-even', title: 'Break-even point, explained simply', desc: 'The number of sales where you stop losing money.' },
];

export default function LearnPage() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 780 }}>
        <h1 style={{ fontSize: '2rem' }}>Learn</h1>
        <p>
          Short, plain-language guides to the financial basics — no accounting
          background required. Each one connects to a tool you can use right away.
        </p>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ARTICLES.map((a) => (
            <Link key={a.href} href={a.href} className="card" style={{ display: 'block' }}>
              <h3 style={{ marginBottom: 4 }}>{a.title}</h3>
              <p style={{ marginBottom: 0 }}>{a.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}