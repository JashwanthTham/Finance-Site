'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

let idCounter = 1;

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function QuoteTool() {
  const router = useRouter();
  const [quoteNumber, setQuoteNumber] = useState('1');
  const [business, setBusiness] = useState('');
  const [client, setClient] = useState('');
  const [quoteDate, setQuoteDate] = useState(todayStr());
  const [validUntil, setValidUntil] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [items, setItems] = useState([
    { id: idCounter++, desc: '', qty: 1, rate: 0 },
  ]);
  const [saveMessage, setSaveMessage] = useState('');

  function updateItem(id, field, value) {
    const cleaned = (field === 'qty' || field === 'rate') && Number(value) < 0 ? 0 : value;
    setItems(items.map((it) => (it.id === id ? { ...it, [field]: cleaned } : it)));
  }

  function addItem() {
    setItems([...items, { id: idCounter++, desc: '', qty: 1, rate: 0 }]);
  }

  function removeItem(id) {
    setItems(items.filter((it) => it.id !== id));
  }

  const subtotal = items.reduce((sum, it) => sum + Number(it.qty || 0) * Number(it.rate || 0), 0);
  const tax = subtotal * (Number(taxRate || 0) / 100);
  const total = subtotal + tax;

  function handlePrint() {
    window.print();
  }

  async function handleSave() {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      setSaveMessage('Create a free account to save quotes — this one still works to print or download.');
      return;
    }
    const { error } = await supabase.from('quotes').insert({
      user_id: userData.user.id,
      business_name: business,
      client_name: client,
      valid_until: validUntil || null,
      tax_rate: taxRate,
      items,
      total,
    });
    if (!error) { router.push('/dashboard'); return; }
    setSaveMessage(`Couldn't save: ${error.message}`);
  }

  function formatDate(d) {
    if (!d) return '—';
    const date = new Date(d + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  return (
    <main className="section">
      <div className="container no-print" style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: '1.8rem' }}>Quote generator</h1>
        <p>
          Create an estimate to send a potential client before any work is agreed
          on. If they accept, you can create a matching invoice separately.
        </p>

        <div className="card" style={{ marginTop: 24 }}>
          <div className="line-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>Quote number</label>
              <input value={quoteNumber} onChange={(e) => setQuoteNumber(e.target.value)} placeholder="1" />
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>Quote date</label>
              <input type="date" value={quoteDate} onChange={(e) => setQuoteDate(e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label>Your business name</label>
            <input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Riverside Coffee Co." />
          </div>
          <div className="field">
            <label>Prepared for</label>
            <input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Client or company name" />
          </div>
          <div className="field">
            <label>Valid until</label>
            <input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} />
          </div>

          <h3 style={{ marginTop: 24 }}>Line items</h3>
          {items.map((it) => (
            <div className="line-row" key={it.id}>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Description</label>
                <input value={it.desc} onChange={(e) => updateItem(it.id, 'desc', e.target.value)} placeholder="Kitchen remodel, phase 1" />
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Qty</label>
                <input type="number" min="0" value={it.qty} onChange={(e) => updateItem(it.id, 'qty', e.target.value)} />
              </div>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Rate ($)</label>
                <input type="number" min="0" value={it.rate} onChange={(e) => updateItem(it.id, 'rate', e.target.value)} />
              </div>
              <button className="remove-link" onClick={() => removeItem(it.id)} type="button">Remove</button>
            </div>
          ))}
          <button className="btn btn-secondary" onClick={addItem} type="button">Add line item</button>

          <div className="field" style={{ marginTop: 24, maxWidth: 200 }}>
            <label>Tax rate (%)</label>
            <input type="number" min="0" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
          </div>

          <div className="result-box">
            <div>Subtotal: ${subtotal.toFixed(2)}</div>
            <div>Tax: ${tax.toFixed(2)}</div>
            <div className="big">Estimated total: ${total.toFixed(2)}</div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button className="btn btn-primary" onClick={handlePrint} type="button">Print / save as PDF</button>
            <button className="btn btn-secondary" onClick={handleSave} type="button">Save to my account</button>
          </div>
          {saveMessage && <p style={{ marginTop: 12 }}>{saveMessage}</p>}
        </div>
      </div>

      <div className="invoice-print">
        <div className="invoice-top">
          <div className="invoice-top-left">
            <h1>QUOTE</h1>
            <div className="inv-number">#{quoteNumber || '1'}</div>
          </div>
          <div className="invoice-top-right">
            <div className="business-name">{business || 'Your Business Name'}</div>
            <div className="balance-due-box">
              <div className="balance-due-label">Estimated Total</div>
              <div className="balance-due-amount">${total.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="invoice-details-row">
          <div className="bill-to">
            <div className="label">Prepared For</div>
            <div className="name">{client || '—'}</div>
          </div>
          <div className="dates">
            <div><span className="label">Quote Date&nbsp;</span>{formatDate(quoteDate)}</div>
            <div><span className="label">Valid Until&nbsp;</span>{formatDate(validUntil)}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td>{it.desc || '—'}</td>
                <td>{it.qty}</td>
                <td>${Number(it.rate).toFixed(2)}</td>
                <td>${(Number(it.qty) * Number(it.rate)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="totals">
          <div className="totals-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="totals-row"><span>Tax ({Number(taxRate || 0)}%)</span><span>${tax.toFixed(2)}</span></div>
          <div className="totals-row grand"><span>Estimated Total</span><span>${total.toFixed(2)}</span></div>
        </div>

        <div className="invoice-footer-note">
          This is an estimate, not a bill. Prices are subject to change if project scope changes.
        </div>
      </div>
    </main>
  );
}