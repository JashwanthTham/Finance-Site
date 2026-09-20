export default function TermsPage() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: '2rem' }}>Terms of Service</h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>Last updated: September 2026</p>

        <p>
          By using Ledger Lane, you agree to the terms below. We&apos;ve kept
          this as short and plain as we reasonably can.
        </p>

        <h2 style={{ marginTop: 32 }}>What this site is</h2>
        <p>
          Ledger Lane provides free tools — invoicing, expense tracking, and
          financial calculators — intended to help small and local businesses
          with everyday financial tasks.
        </p>

        <h2 style={{ marginTop: 32 }}>What this site isn&apos;t</h2>
        <p>
          Ledger Lane is not a licensed accounting, tax, legal, or financial
          advisory service. Nothing generated here — including calculations,
          reports, or the invoices and quotes you create — should be treated
          as professional advice. For tax filings, audits, or complex
          financial decisions, consult a licensed accountant or professional.
        </p>

        <h2 style={{ marginTop: 32 }}>Your responsibility for your data</h2>
        <p>
          You&apos;re responsible for the accuracy of the information you
          enter — invoice amounts, expense records, and so on. We don&apos;t
          verify or audit anything you save.
        </p>

        <h2 style={{ marginTop: 32 }}>Accounts</h2>
        <p>
          You&apos;re responsible for keeping your login credentials secure.
          If you believe your account has been compromised, contact us.
        </p>

        <h2 style={{ marginTop: 32 }}>Availability</h2>
        <p>
          This site is provided as a free resource, without guarantees of
          uptime, and may change, be updated, or occasionally be unavailable.
          We&apos;ll do our best to keep it reliable, but we can&apos;t
          promise it will always be available or error-free.
        </p>

        <h2 style={{ marginTop: 32 }}>Limitation of liability</h2>
        <p>
          Ledger Lane is provided &quot;as is,&quot; without warranties of any
          kind. We are not liable for any financial losses, business
          decisions, or damages resulting from your use of this site or its
          tools.
        </p>

        <h2 style={{ marginTop: 32 }}>Changes to these terms</h2>
        <p>
          If these terms change in a meaningful way, we&apos;ll update the
          date at the top of this page.
        </p>

        <h2 style={{ marginTop: 32 }}>Questions</h2>
        <p>
          Reach out through the <a href="/contact">Contact page</a> with any
          questions about these terms.
        </p>
      </div>
    </main>
  );
}