import Link from 'next/link';

const tools = [
  { href: '/tools/invoice', name: 'Invoice generator', desc: 'Create and download a client-ready invoice.' },
  { href: '/tools/expenses', name: 'Expense tracker', desc: 'Log and total your expenses by category.' },
  { href: '/tools/pl', name: 'Profit & loss calculator', desc: 'See your margin from revenue and costs.' },
  { href: '/tools/breakeven', name: 'Break-even calculator', desc: 'Find out how many sales you need to cover costs.' },
];

export default function ToolsPage() {
  return (
    <main className="section">
      <div className="container">
        <h1 style={{ fontSize: '2rem' }}>Tools</h1>
        <p>Pick a tool below. Nothing here requires an account to try.</p>
        <div className="grid-3" style={{ marginTop: 24 }}>
          {tools.map((t) => (
            <Link key={t.href} href={t.href} className="tool-card">
              <h3>{t.name}</h3>
              <p>{t.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
