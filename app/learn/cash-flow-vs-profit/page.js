import Link from 'next/link';

export default function CashFlowVsProfitArticle() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 680 }}>
        <p><Link href="/learn">&larr; Back to Learn</Link></p>
        <h1 style={{ fontSize: '1.8rem' }}>Cash flow vs. profit — they&apos;re not the same thing</h1>

        <p>
          It&apos;s entirely possible to be profitable on paper and still not
          have enough cash to pay your bills. This trips up a lot of business
          owners, because the two numbers measure different things.
        </p>

        <h2 style={{ marginTop: 32 }}>Profit is about what you&apos;ve earned</h2>
        <p>
          Profit counts revenue the moment you&apos;ve invoiced or delivered
          the work — whether or not you&apos;ve actually been paid yet. If you
          send a $5,000 invoice, that counts toward revenue and profit right
          away, even if the client doesn&apos;t pay for another 45 days.
        </p>

        <h2 style={{ marginTop: 32 }}>Cash flow is about what&apos;s actually in the bank</h2>
        <p>
          Cash flow only counts money once it&apos;s actually received. That
          same $5,000 invoice doesn&apos;t help your cash flow at all until the
          client actually pays it. Meanwhile, your rent, payroll, and
          supplier bills are due on their own schedule, regardless of whether
          your invoices have been paid yet.
        </p>

        <h2 style={{ marginTop: 32 }}>Why this gap causes real problems</h2>
        <p>
          A business can look profitable on its P&amp;L while still running
          into trouble paying its bills on time, simply because the timing of
          money coming in doesn&apos;t match the timing of money going out.
          This is one of the most common reasons growing businesses run into
          cash problems, even while doing well on paper.
        </p>

        <h2 style={{ marginTop: 32 }}>What helps</h2>
        <p>
          Keeping an eye on both numbers separately, following up on unpaid
          invoices promptly, and not assuming a profitable month automatically
          means there&apos;s cash available to spend.
        </p>

        <p style={{ marginTop: 32 }}>
          <Link href="/dashboard">Check your Revenue vs. Cash Flow on your dashboard &rarr;</Link>
        </p>
      </div>
    </main>
  );
}