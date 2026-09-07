'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
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
        .order('created_at', { ascending: false })
        .limit(5);
      setInvoices(inv || []);

      const { data: exp } = await supabase
        .from('expenses')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      setExpenses(exp || []);

      setLoading(false);
    }
    load();
  }, [router]);

  if (loading) {
    return (
      <main className="section">
        <div className="container">Loading your dashboard…</div>
      </main>
    );
  }

  const totalExpenses = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);

  return (
    <main className="section">
      <div className="container">
        <h1 style={{ fontSize: '1.8rem' }}>
          Welcome back{user?.user_metadata?.business_name ? `, ${user.user_metadata.business_name}` : ''}
        </h1>

        <div className="grid-3" style={{ marginTop: 24 }}>
          <Link href="/tools/invoice" className="tool-card"><h3>New invoice</h3><p>Create another one.</p></Link>
          <Link href="/tools/expenses" className="tool-card"><h3>Log an expense</h3><p>Add to your tracker.</p></Link>
          <Link href="/tools/pl" className="tool-card"><h3>Check your margin</h3><p>Run a quick P&L.</p></Link>
        </div>

        <div className="card" style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: '1.2rem' }}>Recent invoices</h2>
          {invoices.length === 0 ? (
            <p>No saved invoices yet.</p>
          ) : (
            <table>
              <thead><tr><th>Client</th><th>Due date</th><th>Total</th></tr></thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td>{inv.client_name}</td>
                    <td>{inv.due_date || '—'}</td>
                    <td>${Number(inv.total).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="card" style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: '1.2rem' }}>Recent expenses</h2>
          {expenses.length === 0 ? (
            <p>No saved expenses yet.</p>
          ) : (
            <>
              <table>
                <thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th></tr></thead>
                <tbody>
                  {expenses.map((e) => (
                    <tr key={e.id}>
                      <td>{e.date || '—'}</td>
                      <td>{e.category}</td>
                      <td>{e.description}</td>
                      <td>${Number(e.amount).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ marginTop: 12 }}><strong>Total shown:</strong> ${totalExpenses.toFixed(2)}</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
