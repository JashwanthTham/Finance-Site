'use client';

import { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

let idCounter = 1;
const CATEGORIES = ['Rent', 'Supplies', 'Utilities', 'Marketing', 'Payroll', 'Other'];

export default function ExpenseTracker() {
  const [rows, setRows] = useState([
    { id: idCounter++, date: '', category: 'Supplies', desc: '', amount: 0 },
  ]);
  const [saveMessage, setSaveMessage] = useState('');

  function updateRow(id, field, value) {
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  function addRow() {
    setRows([...rows, { id: idCounter++, date: '', category: 'Supplies', desc: '', amount: 0 }]);
  }

  function removeRow(id) {
    setRows(rows.filter((r) => r.id !== id));
  }

  const totalsByCategory = CATEGORIES.map((cat) => ({
    cat,
    total: rows.filter((r) => r.category === cat).reduce((s, r) => s + Number(r.amount || 0), 0),
  })).filter((c) => c.total > 0);

  const grandTotal = rows.reduce((s, r) => s + Number(r.amount || 0), 0);

  function downloadCsv() {
    const header = 'Date,Category,Description,Amount\n';
    const body = rows.map((r) => `${r.date},${r.category},"${r.desc}",${r.amount}`).join('\n');
    const blob = new Blob([header + body], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleSave() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      setSaveMessage('Create a free account to save this list — you can still export it as a CSV.');
      return;
    }
    const { error } = await supabase.from('expenses').insert(
      rows.map((r) => ({
        user_id: userData.user.id,
        date: r.date || null,
        category: r.category,
        description: r.desc,
        amount: r.amount,
      }))
    );
    setSaveMessage(error ? `Couldn't save: ${error.message}` : 'Expenses saved to your account.');
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 780 }}>
        <h1 style={{ fontSize: '1.8rem' }}>Expense tracker</h1>
        <p>Log your expenses below. Totals update automatically by category.</p>

        <div className="card" style={{ marginTop: 24 }}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount ($)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td><input type="date" value={r.date} onChange={(e) => updateRow(r.id, 'date', e.target.value)} /></td>
                  <td>
                    <select value={r.category} onChange={(e) => updateRow(r.id, 'category', e.target.value)}>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </td>
                  <td><input value={r.desc} onChange={(e) => updateRow(r.id, 'desc', e.target.value)} placeholder="What was it for?" /></td>
                  <td><input type="number" value={r.amount} onChange={(e) => updateRow(r.id, 'amount', e.target.value)} /></td>
                  <td><button className="remove-link" onClick={() => removeRow(r.id)} type="button">Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-secondary" style={{ marginTop: 16 }} onClick={addRow} type="button">Add row</button>

          <div className="result-box">
            {totalsByCategory.map((c) => (
              <div key={c.cat}>{c.cat}: ${c.total.toFixed(2)}</div>
            ))}
            <div className="big">Total: ${grandTotal.toFixed(2)}</div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button className="btn btn-primary" onClick={downloadCsv} type="button">Export CSV</button>
            <button className="btn btn-secondary" onClick={handleSave} type="button">Save to my account</button>
          </div>
          {saveMessage && <p style={{ marginTop: 12 }}>{saveMessage}</p>}
        </div>
      </div>
    </main>
  );
}
