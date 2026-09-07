export default function AboutPage() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: '2rem' }}>About Ledger Lane</h1>

        <p>
          Ledger Lane started from a simple observation: most local businesses
          can&apos;t justify hiring a full-time bookkeeper, but they still need
          to send invoices, track spending, and understand whether they&apos;re
          actually making money.
        </p>
        <p>
          The tools on this site are built to be usable by anyone — no
          accounting background needed. Everything is free to use, and nothing
          requires an account unless you want to save your work between visits.
        </p>

        <h2 style={{ marginTop: 40 }}>Why it&apos;s free</h2>
        <p>
          Ledger Lane is run as a community resource, not a business trying to
          upsell you later. There&apos;s no hidden plan to charge for these
          tools down the line — the goal is simply to remove one small barrier
          for business owners who are already stretched thin.
        </p>

        <h2 style={{ marginTop: 40 }}>What this isn&apos;t</h2>
        <p>
          These tools are meant to make everyday tasks easier — invoicing,
          tracking expenses, understanding your margins. They are not a
          replacement for a licensed accountant or tax professional,
          especially for anything involving official tax filings or complex
          financial decisions. When in doubt, a quick conversation with a
          local accountant is always worth it.
        </p>

        <h2 style={{ marginTop: 40 }}>Questions or feedback?</h2>
        <p>
          Reach out any time through the <a href="/contact">Contact page</a> —
          feedback from actual business owners is what shapes what gets built
          here next.
        </p>
      </div>
    </main>
  );
}