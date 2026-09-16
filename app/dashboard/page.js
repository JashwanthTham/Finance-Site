'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(null);
  const [showInvoices, setShowInvoices] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) {
        router.push('/login');
        return;
      }
      setUser(userData.user);

      const { data: inv } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });
      setInvoices(inv || []);

      const { data: exp } = await supabase
        .from('expenses')
        .select('*')
        .order('created_at', { ascending: false });
      setExpenses(exp || []);

      const { data: inc } = await supabase
        .from('income_entries')
        .select('*')
        .order('created_at', { ascending: false });
      setIncome(inc || []);

      const { data: qts } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });
      setQuotes(qts || []);

      setLoading(false);
    }
    load();
  }, [router]);

  async function deleteInvoice(invoiceId) {
    if (!confirm('Delete this invoice? This can\'t be undone.')) return;
    await supabase.from('invoices').delete().eq('id', invoiceId);
    setInvoices(invoices.filter((inv) => inv.id !== invoiceId));
  }

  async function deleteQuote(quoteId) {
    if (!confirm('Delete this quote? This can\'t be undone.')) return;
    await supabase.from('quotes').delete().eq('id', quoteId);
    setQuotes(quotes.filter((q) => q.id !== quoteId));
  }

  async function deleteExpense(expenseId) {
    if (!confirm('Delete this expense? This can\'t be undone.')) return;
    await supabase.from('expenses').delete().eq('id', expenseId);
    setExpenses(expenses.filter((e) => e.id !== expenseId));
  }

  async function markPaid(invoiceId) {
    await supabase.from('invoices').update({ status: 'paid' }).eq('id', invoiceId);
    setInvoices(invoices.map((inv) => (inv.id === invoiceId ? { ...inv, status: 'paid' } : inv)));
  }

  if (loading) {
    return (
      <main className="section">
        <div className="container">Loading your dashboard…</div>
      </main>
    );
  }

  const paidInvoices = invoices.filter((i) => i.status === 'paid');
  const outstandingInvoices = invoices.filter((i) => i.status !== 'paid');

  const invoicedRevenue = invoices.reduce((s, i) => s + Number(i.total || 0), 0);
  const otherIncome = income.reduce((s, i) => s + Number(i.amount || 0), 0);
  const revenue = invoicedRevenue + otherIncome;
  const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
  const profit = revenue - totalExpenses;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const outstandingTotal = outstandingInvoices.reduce((s, i) => s + Number(i.total || 0), 0);
  const cashIn = paidInvoices.reduce((s, i) => s + Number(i.total || 0), 0) + otherIncome;
  const cashFlow = cashIn - totalExpenses;

  const cards = [
    { key: 'revenue', label: 'Revenue', value: `$${revenue.toFixed(2)}`, note: 'Invoiced work plus other logged income' },
    { key: 'expenses', label: 'Expenses', value: `$${totalExpenses.toFixed(2)}`, note: 'All logged expenses' },
    { key: 'profit', label: 'Profit', value: `$${profit.toFixed(2)}`, note: 'Revenue minus expenses' },
    { key: 'margin', label: 'Profit Margin', value: `${margin.toFixed(1)}%`, note: 'Profit as a share of revenue' },
    { key: 'outstanding', label: 'Outstanding Invoices', value: `$${outstandingTotal.toFixed(2)}`, note: 'Not yet marked paid' },
    { key: 'cashflow', label: 'Cash Flow', value: `${cashFlow >= 0 ? '+' : ''}$${cashFlow.toFixed(2)}`, note: 'Cash actually received minus expenses' },
  ];

  return (
    <main className="section">
      <div className="container">
        <h1 style={{ fontSize: '1.8rem' }}>
          Welcome back{user?.user_metadata?.business_name ? `, ${user.user_metadata.business_name}` : ''}
        </h1>
        <p>Click any number below for the details behind it.</p>

        <div className="grid-3" style={{ marginTop: 24, gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {cards.map((c) => (
            <button
              key={c.key}
              onClick={() => setView(view === c.key ? null : c.key)}
              className="card"
              style={{
                textAlign: 'left', cursor: 'pointer',
                border: view === c.key ? '2px solid var(--green)' : '1px solid var(--line)',
              }}
              type="button"
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{c.label}</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, margin: '6px 0' }}>{c.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--ink-soft)' }}>{c.note}</div>
            </button>
          ))}
        </div>

        <div className="grid-3" style={{ marginTop: 16 }}>
          <Link href="/tools/invoice" className="tool-card"><h3>New invoice</h3><p>Create another one.</p></Link>
          <Link href="/tools/expenses" className="tool-card"><h3>Log an expense</h3><p>Add to your tracker.</p></Link>
          <Link href="/tools/income" className="tool-card"><h3>Log other income</h3><p>Cash sales, payouts, etc.</p></Link>
        </div>

        {view === 'revenue' && (
          <div className="card" style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: '1.2rem' }}>Revenue breakdown</h2>
            <p>Invoiced work: <strong>${invoicedRevenue.toFixed(2)}</strong></p>
            <p>Other income: <strong>${otherIncome.toFixed(2)}</strong></p>
            {income.length > 0 && (
              <>
                <h3 style={{ marginTop: 20 }}>Other income entries</h3>
                <table>
                  <thead><tr><th>Date</th><th>Source</th><th>Amount</th></tr></thead>
                  <tbody>
                    {income.map((i) => (
                      <tr key={i.id}>
                        <td>{i.date || '—'}</td>
                        <td>{i.source}</td>
                        <td>${Number(i.amount).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}

        {view === 'outstanding' && (
          <div className="card" style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: '1.2rem' }}>Outstanding invoices</h2>
            <InvoiceTable invoices={outstandingInvoices} onMarkPaid={markPaid} onDelete={deleteInvoice} />
          </div>
        )}

        {view === 'cashflow' && (
          <div className="card" style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: '1.2rem' }}>Cash flow breakdown</h2>
            <p>Money in from paid invoices: <strong>${paidInvoices.reduce((s, i) => s + Number(i.total || 0), 0).toFixed(2)}</strong></p>
            <p>Money in from other income: <strong>${otherIncome.toFixed(2)}</strong></p>
            <p>Money out (expenses): <strong>${totalExpenses.toFixed(2)}</strong></p>
            <p>Net: <strong>{cashFlow >= 0 ? '+' : ''}${cashFlow.toFixed(2)}</strong></p>
          </div>
        )}

        {view === 'expenses' && (
          <div className="card" style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: '1.2rem' }}>All logged expenses</h2>
            {expenses.length === 0 ? <p>No expenses logged yet.</p> : (
              <table>
                <thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th><th></th></tr></thead>
                <tbody>
                  {expenses.map((e) => (
                    <tr key={e.id}>
                      <td>{e.date || '—'}</td>
                      <td>{e.category}</td>
                      <td>{e.description}</td>
                      <td>${Number(e.amount).toFixed(2)}</td>
                      <td>
                        <button className="remove-link" onClick={() => deleteExpense(e.id)} type="button">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {(view === 'profit' || view === 'margin') && (
          <div className="card" style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: '1.2rem' }}>Profit breakdown</h2>
            <p>Revenue: <strong>${revenue.toFixed(2)}</strong></p>
            <p>Expenses: <strong>${totalExpenses.toFixed(2)}</strong></p>
            <p>Profit: <strong>${profit.toFixed(2)}</strong></p>
            <p>Margin: <strong>{margin.toFixed(1)}%</strong></p>
          </div>
        )}

        <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
          <button className="btn btn-secondary" onClick={() => setShowInvoices(!showInvoices)} type="button">
            {showInvoices ? 'Hide' : 'Show'} all invoices
          </button>
          <button className="btn btn-secondary" onClick={() => setShowQuotes(!showQuotes)} type="button">
            {showQuotes ? 'Hide' : 'Show'} all quotes
          </button>
        </div>

        {showInvoices && (
          <div className="card" style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.2rem' }}>All invoices</h2>
              <Link href="/tools/invoice" className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>New invoice</Link>
            </div>
            <div style={{ marginTop: 16 }}>
              <InvoiceTable invoices={invoices} onMarkPaid={markPaid} onDelete={deleteInvoice} />
            </div>
          </div>
        )}

        {showQuotes && (
          <div className="card" style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.2rem' }}>All quotes</h2>
              <Link href="/tools/quote" className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>New quote</Link>
            </div>
            <div style={{ marginTop: 16 }}>
              {quotes.length === 0 ? <p>No saved quotes yet.</p> : (
                <table>
                  <thead><tr><th>Client</th><th>Valid until</th><th>Estimated total</th><th></th></tr></thead>
                  <tbody>
                    {quotes.map((q) => (
                      <tr key={q.id}>
                        <td><Link href={`/tools/quote?id=${q.id}`}>{q.client_name || 'Untitled'}</Link></td>
                        <td>{q.valid_until || '—'}</td>
                        <td>${Number(q.total).toFixed(2)}</td>
                        <td>
                          <button className="remove-link" onClick={() => deleteQuote(q.id)} type="button">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function InvoiceTable({ invoices, onMarkPaid, onDelete }) {
  if (invoices.length === 0) return <p>Nothing here yet.</p>;
  return (
    <table>
      <thead><tr><th>Client</th><th>Due date</th><th>Status</th><th>Total</th><th></th></tr></thead>
      <tbody>
        {invoices.map((inv) => (
          <tr key={inv.id}>
            <td><Link href={`/tools/invoice?id=${inv.id}`}>{inv.client_name || 'Untitled'}</Link></td>
            <td>{inv.due_date || '—'}</td>
            <td style={{ textTransform: 'capitalize' }}>{inv.status || 'sent'}</td>
            <td>${Number(inv.total).toFixed(2)}</td>
            <td style={{ display: 'flex', gap: 8 }}>
              {inv.status !== 'paid' && (
                <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={() => onMarkPaid(inv.id)} type="button">
                  Mark paid
                </button>
              )}
              <button className="remove-link" onClick={() => onDelete(inv.id)} type="button">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}