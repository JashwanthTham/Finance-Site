'use client';

import { useState } from 'react';

export default function PLCalculator() {
  const [revenue, setRevenue] = useState('');
  const [cogs, setCogs] = useState('');
  const [expenses, setExpenses] = useState('');

  const rev = Number(revenue || 0);
  const cost = Number(cogs || 0);
  const exp = Number(expenses || 0);
  const grossProfit = rev - cost;
  const netProfit = grossProfit - exp;
  const margin = rev > 0 ? (netProfit / rev) * 100 : 0;

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 560 }}>
        <h1 style={{ fontSize: '1.8rem' }}>Profit & loss calculator</h1>
        <p>Enter your numbers for a period (a month, a quarter) to see your margin.</p>

        <div className="card" style={{ marginTop: 24 }}>
          <div className="field">
            <label>Revenue ($)</label>
            <input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="12000" />
          </div>
          <div className="field">
            <label>Cost of goods sold ($)</label>
            <input type="number" value={cogs} onChange={(e) => setCogs(e.target.value)} placeholder="4500" />
          </div>
          <div className="field">
            <label>Other expenses ($)</label>
            <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} placeholder="3000" />
          </div>

          <div className="result-box">
            <div>Gross profit: ${grossProfit.toFixed(2)}</div>
            <div>Net profit: ${netProfit.toFixed(2)}</div>
            <div className="big">{margin.toFixed(1)}% margin</div>
          </div>

          <div style={{ marginTop: 20, height: 24, borderRadius: 4, overflow: 'hidden', display: 'flex', border: '1px solid var(--line)' }}>
            <div style={{ width: `${rev ? Math.min((cost / rev) * 100, 100) : 0}%`, background: '#C48A2D' }} title="Cost of goods sold" />
            <div style={{ width: `${rev ? Math.min((exp / rev) * 100, 100) : 0}%`, background: '#B3452D' }} title="Other expenses" />
            <div style={{ flex: 1, background: '#2F5233' }} title="Net profit" />
          </div>
          <p style={{ fontSize: '0.8rem', marginTop: 8 }}>Gold = cost of goods, red = other expenses, green = what's left as profit.</p>
        </div>
      </div>
    </main>
  );
}
