import Link from 'next/link';

export default function InvoicesVsQuotesArticle() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 680 }}>
        <p><Link href="/learn">&larr; Back to Learn</Link></p>
        <h1 style={{ fontSize: '1.8rem' }}>Invoices vs. quotes: what&apos;s the difference?</h1>

        <p>
          These two documents look similar, but they serve very different
          purposes and go out at different points in a project.
        </p>

        <h2 style={{ marginTop: 32 }}>A quote comes first</h2>
        <p>
          A quote (sometimes called an estimate) is what you send before any
          work starts. It tells a potential client roughly what a job will
          cost, so they can decide whether to move forward. It&apos;s not a
          bill — no payment is expected yet, and the final price can still
          change if the scope of work changes.
        </p>

        <h2 style={{ marginTop: 32 }}>An invoice comes after</h2>
        <p>
          An invoice is a request for payment — sent once work is done (or
          partway through, for larger projects). Unlike a quote, an invoice
          represents money actually owed, with a due date attached.
        </p>

        <h2 style={{ marginTop: 32 }}>Why the distinction matters</h2>
        <p>
          Sending an invoice when you meant to send a quote can confuse a
          client into thinking they owe money before work has even started.
          Keeping the two separate also makes it easier to track your own
          numbers accurately — a quote shouldn&apos;t count as revenue, but an
          invoice should.
        </p>

        <h2 style={{ marginTop: 32 }}>A common workflow</h2>
        <p>
          Send a quote first. If the client accepts, the work happens. Once
          it&apos;s done, send an invoice for the agreed amount — often based
          directly on the accepted quote.
        </p>

        <p style={{ marginTop: 32 }}>
          <Link href="/tools/quote">Create a quote &rarr;</Link>
          {' · '}
          <Link href="/tools/invoice">Create an invoice &rarr;</Link>
        </p>
      </div>
    </main>
  );
}