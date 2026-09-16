import Link from 'next/link';

export default function BreakEvenArticle() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 680 }}>
        <p><Link href="/learn">&larr; Back to Learn</Link></p>
        <h1 style={{ fontSize: '1.8rem' }}>Break-even point, explained simply</h1>

        <p>
          Your break-even point is the number of sales where your revenue
          exactly covers your costs — no profit yet, but no loss either.
          Every sale beyond that point is what actually starts earning you
          money.
        </p>

        <h2 style={{ marginTop: 32 }}>The two types of costs involved</h2>
        <p>
          <strong>Fixed costs</strong> — expenses that stay the same no matter
          how much you sell, like rent or a monthly software subscription.
        </p>
        <p>
          <strong>Variable costs</strong> — expenses that scale with each sale,
          like materials or packaging for a physical product.
        </p>

        <h2 style={{ marginTop: 32 }}>The basic idea</h2>
        <p>
          Each sale contributes a little toward covering your fixed costs —
          that contribution is the price minus the variable cost per unit.
          Once enough sales have added up to cover your fixed costs entirely,
          you&apos;ve broken even. Everything after that is profit.
        </p>

        <h2 style={{ marginTop: 32 }}>Why it&apos;s useful to know</h2>
        <p>
          Break-even gives you a concrete, practical target — instead of a
          vague goal like &quot;sell more,&quot; you know exactly how many
          units or how much revenue gets you to the point where you stop
          losing money each month. It&apos;s also useful when deciding whether
          a price change, a new expense, or a new product actually makes
          sense.
        </p>

        <p style={{ marginTop: 32 }}>
          <Link href="/tools/breakeven">Calculate your own break-even point &rarr;</Link>
        </p>
      </div>
    </main>
  );
}