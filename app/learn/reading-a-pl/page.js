import Link from 'next/link';

export default function ReadingPLArticle() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 680 }}>
        <p><Link href="/learn">&larr; Back to Learn</Link></p>
        <h1 style={{ fontSize: '1.8rem' }}>How to read your own P&amp;L</h1>

        <p>
          A profit &amp; loss statement (P&amp;L), sometimes called an income
          statement, is just a summary of what came in and what went out over
          a period of time — usually a month, quarter, or year. It sounds more
          intimidating than it is once you know what each line means.
        </p>

        <h2 style={{ marginTop: 32 }}>The basic structure</h2>
        <p>
          <strong>Revenue</strong> — everything you brought in from sales or
          services, before subtracting anything.
        </p>
        <p>
          <strong>Cost of goods sold (COGS)</strong> — what it directly cost
          you to produce or deliver what you sold. For a bakery, that&apos;s
          flour, sugar, packaging. For a service business, this line is often
          small or zero.
        </p>
        <p>
          <strong>Gross profit</strong> — revenue minus COGS. This tells you
          how much you made before accounting for overhead like rent or
          marketing.
        </p>
        <p>
          <strong>Operating expenses</strong> — everything else it costs to
          run the business: rent, software, marketing, insurance, and so on.
        </p>
        <p>
          <strong>Net profit</strong> — what&apos;s actually left after
          subtracting operating expenses from gross profit. This is the real
          bottom line.
        </p>

        <h2 style={{ marginTop: 32 }}>What to actually look for</h2>
        <p>
          Don&apos;t just check whether net profit is positive — look at how
          it&apos;s changing over time. A shrinking gross profit usually means
          your costs are creeping up relative to what you charge. A shrinking
          net profit with stable gross profit usually points to overhead
          growing faster than the business.
        </p>

        <p style={{ marginTop: 32 }}>
          <Link href="/tools/pl">Run your own numbers with the P&amp;L calculator &rarr;</Link>
        </p>
      </div>
    </main>
  );
}