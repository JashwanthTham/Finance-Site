import Link from 'next/link';

export default function ProfitMarginArticle() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 680 }}>
        <p><Link href="/learn">&larr; Back to Learn</Link></p>
        <h1 style={{ fontSize: '1.8rem' }}>What is profit margin, and why does it matter?</h1>

        <p>
          Revenue is how much money came in. Profit is what&apos;s left after
          you pay for everything it cost to earn that revenue. Profit margin
          is profit expressed as a percentage of revenue — it tells you how
          much of every dollar you actually keep.
        </p>

        <p>
          For example: if you bring in $10,000 in a month and your costs and
          expenses total $7,500, your profit is $2,500. Divide that by
          revenue ($2,500 / $10,000) and your profit margin is 25%. That means
          you keep 25 cents of every dollar that comes in.
        </p>

        <h2 style={{ marginTop: 32 }}>Why it matters more than revenue alone</h2>
        <p>
          A business bringing in $50,000 a month with a 5% margin keeps
          $2,500. A business bringing in $15,000 a month with a 25% margin
          keeps $3,750 — more actual money, despite far less revenue. Revenue
          tells you how big the business looks. Margin tells you how healthy
          it actually is.
        </p>

        <h2 style={{ marginTop: 32 }}>What a &quot;good&quot; margin looks like</h2>
        <p>
          It varies a lot by industry — a restaurant, a consulting business,
          and a retail shop all have very different normal margins, mostly
          because of how much it costs them to deliver what they sell. There&apos;s
          no single right number; what matters more is whether your margin is
          improving, staying flat, or shrinking over time.
        </p>

        <p style={{ marginTop: 32 }}>
          <Link href="/tools/pl">Check your own margin with the P&amp;L calculator &rarr;</Link>
        </p>
      </div>
    </main>
  );
}