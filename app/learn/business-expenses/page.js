import Link from 'next/link';

export default function BusinessExpensesArticle() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 680 }}>
        <p><Link href="/learn">&larr; Back to Learn</Link></p>
        <h1 style={{ fontSize: '1.8rem' }}>What counts as a business expense?</h1>

        <p>
          Broadly, a business expense is anything you spend money on that&apos;s
          ordinary and necessary for running your business. That covers a lot
          of ground, and it&apos;s worth tracking more than you might think.
        </p>

        <h2 style={{ marginTop: 32 }}>Common categories</h2>
        <p>
          <strong>Cost of goods</strong> — materials, ingredients, or products
          you resell.
        </p>
        <p>
          <strong>Rent and utilities</strong> — your workspace, storefront, or
          storage costs.
        </p>
        <p>
          <strong>Supplies and equipment</strong> — tools, software
          subscriptions, office supplies.
        </p>
        <p>
          <strong>Marketing</strong> — ads, business cards, your website.
        </p>
        <p>
          <strong>Payroll</strong> — wages, contractor payments.
        </p>
        <p>
          <strong>Insurance</strong> — liability, business property, and
          similar coverage.
        </p>
        <p>
          <strong>Professional services</strong> — accounting help, legal
          fees.
        </p>

        <h2 style={{ marginTop: 32 }}>Why tracking every category matters</h2>
        <p>
          Beyond just knowing where your money goes, categorized expenses are
          what make your profit margin and P&amp;L actually meaningful — and
          they&apos;re typically what your accountant needs at tax time to
          claim deductions accurately.
        </p>

        <h2 style={{ marginTop: 32 }}>A note on gray areas</h2>
        <p>
          Some expenses (like a home office, a vehicle used for both personal
          and business purposes, or meals) have specific rules around what
          portion actually counts as a business expense. These tools can help
          you track spending day-to-day, but for anything with tax
          implications, it&apos;s worth double-checking with a licensed
          accountant.
        </p>

        <p style={{ marginTop: 32 }}>
          <Link href="/tools/expenses">Start logging expenses with the expense tracker &rarr;</Link>
        </p>
      </div>
    </main>
  );
}