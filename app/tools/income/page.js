'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

let idCounter = 1;

export default function IncomeTool() {
  const [checking, setChecking] = useState(true);
  const [rows, setRows] = useState([
    { id: idCounter++, date: '', source: '', amount: 0 },
  ]);
  const [saveMessage, setSaveMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push('/login');
        return;
      }
      setChecking(false);
    }
    checkAuth();
  }, [router]);

  function updateRow(id, field, value) {
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  function addRow() {
    setRows([...rows, { id: idCounter++, date: '', source: '', amount: 0 }]);
  }

  function removeRow(id) {
    setRows(rows.filter((r) => r.id !== id));
  }

  const total = rows.reduce((s, r) => s + Number(r.amount || 0), 0);

  async function handleSave() {
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase.from('income_entries').insert(
      rows.map((r) => ({
        user_id: userData.user.id,
        date: r.date || null,
        source: r.source,
        amount: r.amount,
      }))
    );
    if (!error) {
      setRows([{ id: idCounter++, date: '', source: '', amount: 0 }]);
    }
    setSaveMessage(error ? `Couldn't save: ${error.message}` : 'Income saved — your dashboard now reflects it.');
  }

  if (checking) {
    return (
      <main className="section">
        <div className="container">Checking your account…</div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 780 }}>
        <h1 style={{ fontSize: '1.8rem' }}>Log other income</h1>
        <p>
          Use this for money you received that didn&apos;t go through an invoice —
          cash sales, register totals, marketplace payouts, anything else. This
          feeds directly into your dashboard&apos;s Revenue and Cash Flow numbers.
        </p>

        <div className="card" style={{ marginTop: 24 }}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Source</th>
                <th>Amount ($)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td><input type="date" value={r.date} onChange={(e) => updateRow(r.id, 'date', e.target.value)} /></td>
                  <td><input value={r.source} onChange={(e) => updateRow(r.id, 'source', e.target.value)} placeholder="Cash sales, Etsy payout, etc." /></td>
                  <td><input type="number" min="0" value={r.amount} onChange={(e) => updateRow(r.id, 'amount', e.target.value)} /></td>
                  <td><button className="remove-link" onClick={() => removeRow(r.id)} type="button">Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={addRow} type="button">Add row</button>

          <div className="result-box">
            <div className="big">Total: ${total.toFixed(2)}</div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button className="btn btn-primary" onClick={handleSave} type="button">Save to my account</button>
          </div>
          {saveMessage && <p style={{ marginTop: 12 }}>{saveMessage}</p>}
        </div>
      </div>
    </main>
  );
}