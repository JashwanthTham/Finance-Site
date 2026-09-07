'use client';

import { useState } from 'react';

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState('');
  const [price, setPrice] = useState('');
  const [variableCost, setVariableCost] = useState('');

  const fixed = Number(fixedCosts || 0);
  const p = Number(price || 0);
  const v = Number(variableCost || 0);
  const contribution = p - v;
  const unitsToBreakEven = contribution > 0 ? fixed / contribution : null;
  const revenueToBreakEven = unitsToBreakEven ? unitsToBreakEven * p : null;

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 560 }}>
        <h1 style={{ fontSize: '1.8rem' }}>Break-even calculator</h1>
        <p>
          Break-even is the point where your sales exactly cover your costs — no profit,
          no loss yet. Everything sold after that is what starts to earn you money.
        </p>

        <div className="card" style={{ marginTop: 24 }}>
          <div className="field">
            <label>Fixed costs per month ($)</label>
            <input type="number" value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)} placeholder="Rent, salaries, insurance..." />
          </div>
          <div className="field">
            <label>Price per unit ($)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="What you charge per item or service" />
          </div>
          <div className="field">
            <label>Variable cost per unit ($)</label>
            <input type="number" value={variableCost} onChange={(e) => setVariableCost(e.target.value)} placeholder="What it costs you to make/deliver one" />
          </div>

          {contribution <= 0 && p > 0 ? (
            <div className="result-box" style={{ background: '#FBEAE4', borderColor: '#E7B7A6' }}>
              Your price needs to be higher than your variable cost per unit for break-even to be possible.
            </div>
          ) : (
            <div className="result-box">
              <div className="big">{unitsToBreakEven ? Math.ceil(unitsToBreakEven) : '—'} units</div>
              <div>to break even each month{revenueToBreakEven ? ` (about $${revenueToBreakEven.toFixed(2)} in sales)` : ''}</div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
