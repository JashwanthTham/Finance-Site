const FAQS = [
  {
    q: 'Is this actually free?',
    a: 'Yes. There are no paid plans, hidden fees, or upsells. The tools work fully without an account — creating an account is only for saving your data between visits.',
  },
  {
    q: 'Is my financial data safe?',
    a: 'Your saved data (invoices, expenses) is stored securely and locked to your account only — no one else, including other users, can see it. If you use a tool without logging in, nothing is stored anywhere; it only exists in your browser while you\'re using it.',
  },
  {
    q: 'Do you sell or share my information?',
    a: 'No. Your data is not sold, shared, or used for advertising.',
  },
  {
    q: 'Does this replace my accountant?',
    a: 'No. These tools help with everyday tasks like invoicing and tracking expenses, but they\'re not a substitute for a licensed accountant, especially for tax filings or complex financial decisions.',
  },
  {
    q: 'What if my books are already a mess?',
    a: 'That\'s fine — start wherever you are. The expense tracker and P&L calculator work with whatever numbers you have right now; you don\'t need clean historical records to start using them going forward.',
  },
  {
    q: 'Do I need to switch accounting software?',
    a: 'No. These tools are standalone and don\'t require you to change whatever you\'re already using — think of them as a lightweight option if you don\'t currently use anything, or a quick way to do a specific task without opening a bigger platform.',
  },
  {
    q: 'Can I export my data?',
    a: 'Yes — the expense tracker supports CSV export, and invoices can be downloaded as a PDF via the print option.',
  },
];

export default function FAQPage() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: '2rem' }}>Frequently asked questions</h1>

        <div style={{ marginTop: 24 }}>
          {FAQS.map((item, i) => (
            <details key={i} className="card" style={{ marginBottom: 12 }}>
              <summary style={{ fontWeight: 600, cursor: 'pointer' }}>{item.q}</summary>
              <p style={{ marginTop: 12, marginBottom: 0 }}>{item.a}</p>
            </details>
          ))}
        </div>

        <p style={{ marginTop: 32 }}>
          Don&apos;t see your question here? <a href="/contact">Reach out</a> and we&apos;ll answer it directly.
        </p>
      </div>
    </main>
  );
}