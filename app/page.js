'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setLoggedIn(!!data?.user));
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Bookkeeping tools for the business next door.</h1>
          <p className="lede">
            Free invoicing, expense tracking, and financial planning tools built for
            local shops, contractors, and independent businesses — no accounting degree required.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <Link href="/tools" className="btn btn-primary">Use the tools</Link>
            {loggedIn ? (
              <Link href="/dashboard" className="btn btn-secondary">Go to dashboard</Link>
            ) : (
              <Link href="/signup" className="btn btn-secondary">Create a free account</Link>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
            <div>
              <h2>Our mission</h2>
              <p style={{ maxWidth: '48ch' }}>
                Most local businesses can&apos;t justify hiring a full-time bookkeeper,
                but still need to invoice clients, track spending, and understand
                their numbers. We build free, straightforward tools so that a
                mechanic, a bakery, or a freelance electrician can handle their
                own finances without wading through jargon or spreadsheets built
                for accountants, not owners.
              </p>
            </div>
            <img
              src="https://picsum.photos/seed/ledgerlane-mission/600/420"
              alt="Local business owner working"
              style={{ width: '100%', borderRadius: 8, border: '1px solid var(--line)' }}
            />
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <h2>Everything here is free.</h2>
          <p style={{ maxWidth: '60ch' }}>
            Ledger Lane is built and maintained as a community resource for small business
            owners who don&apos;t have an in-house accountant. Every tool works without an
            account — sign up only if you want to save your numbers between visits.
          </p>
          <div className="grid-3" style={{ marginTop: 32 }}>
            <div className="card">
              <img
                src="https://picsum.photos/seed/ledgerlane-invoice/400/240"
                alt="Invoicing"
                style={{ width: '100%', borderRadius: 6, marginBottom: 16 }}
              />
              <h3>Invoicing</h3>
              <p>Build and download a professional invoice in under two minutes.</p>
            </div>
            <div className="card">
              <img
                src="https://picsum.photos/seed/ledgerlane-expenses/400/240"
                alt="Expense tracking"
                style={{ width: '100%', borderRadius: 6, marginBottom: 16 }}
              />
              <h3>Expense tracking</h3>
              <p>Log expenses by category and export a clean sheet for tax season.</p>
            </div>
            <div className="card">
              <img
                src="https://picsum.photos/seed/ledgerlane-planning/400/240"
                alt="Planning"
                style={{ width: '100%', borderRadius: 6, marginBottom: 16 }}
              />
              <h3>Planning</h3>
              <p>See your profit margin and break-even point without the spreadsheet math.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}