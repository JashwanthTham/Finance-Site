'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

export const dynamic = 'force-dynamic';

let idCounter = 1;

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function InvoiceTool() {
  const [invoiceNumber, setInvoiceNumber] = useState('1');
  const [business, setBusiness] = useState('');
  const [client, setClient] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(todayStr());
  const [dueDate, setDueDate] = useState('');
  const [taxRate, setTaxRate] = useState(0);
  const [items, setItems] = useState([
    { id: idCounter++, desc: '', qty: 1, rate: 0 },
  ]);
  const [status, setStatus] = useState('sent');
  const [saveMessage, setSaveMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) return;
    async function loadInvoice() {
      const { data, error } = await supabase.from('invoices').select('*').eq('id', id).single();
      if (error || !data) return;
      setEditingId(data.id);
      setBusiness(data.business_name || '');
      setClient(data.client_name || '');
      setDueDate(data.due_date || '');
      setTaxRate(data.tax_rate || 0);
      setStatus(data.status || 'sent');
      if (Array.isArray(data.items) && data.items.length > 0) {
        setItems(data.items.map((it) => ({ ...it, id: idCounter++ })));
      }
    }
    loadInvoice();
  }, [searchParams]);

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
      setSaveMessage('Create a free account to save invoices — this one still works to print or download.');
      return;
    }
    if (editingId) {
      const { error } = await supabase.from('invoices').update({
        business_name: business,
        client_name: client,
        due_date: dueDate || null,
        tax_rate: taxRate,
        items,
        total,
        status,
      }).eq('id', editingId);
      if (!error) { router.push('/dashboard'); return; }
      setSaveMessage(`Couldn't save: ${error.message}`);
      return;
    }
    const { error } = await supabase.from('invoices').insert({
      user_id: userData.user.id,
      business_name: business,
      client_name: client,
      due_date: dueDate || null,
      tax_rate: taxRate,
      items,
      total,
      status,
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
        <h1 style={{ fontSize: '1.8rem' }}>{editingId ? 'Viewing saved invoice' : 'Invoice generator'}</h1>
        <p>{editingId ? 'You can edit and update this, or print/save it as a PDF.' : 'Fill this in, then print or save it as a PDF from the print dialog.'}</p>

        <div className="card" style={{ marginTop: 24 }}>
          <div className="line-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>Invoice number</label>
              <input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} placeholder="1" />
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label>Invoice date</label>
              <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label>Your business name</label>
            <input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder="Riverside Coffee Co." />
          </div>
          <div className="field">
            <label>Bill to</label>
            <input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Client or company name" />
          </div>
          <div className="field">
            <label>Due date</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>

          <h3 style={{ marginTop: 24 }}>Line items</h3>
          {items.map((it) => (
            <div className="line-row" key={it.id}>
              <div className="field" style={{ marginBottom: 0 }}>
                <label>Description</label>
                <input value={it.desc} onChange={(e) => updateItem(it.id, 'desc', e.target.value)} placeholder="Espresso beans, 5lb bag" />
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
            <div className="big">Total: ${total.toFixed(2)}</div>
          </div>

          <div className="field" style={{ marginTop: 24, maxWidth: 200 }}>
            <label>Status (when saved)</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button className="btn btn-primary" onClick={handlePrint} type="button">Print / save as PDF</button>
            <button className="btn btn-secondary" onClick={handleSave} type="button">{editingId ? 'Update invoice' : 'Save to my account'}</button>
          </div>
          {saveMessage && <p style={{ marginTop: 12 }}>{saveMessage}</p>}
        </div>
      </div>

      <div className="invoice-print">
        <div className="invoice-top">
          <div className="invoice-top-left">
            <h1>INVOICE</h1>
            <div className="inv-number">#{invoiceNumber || '1'}</div>
          </div>
          <div className="invoice-top-right">
            <div className="business-name">{business || 'Your Business Name'}</div>
            <div className="balance-due-box">
              <div className="balance-due-label">Balance Due</div>
              <div className="balance-due-amount">${total.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="invoice-details-row">
          <div className="bill-to">
            <div className="label">Bill To</div>
            <div className="name">{client || '—'}</div>
          </div>
          <div className="dates">
            <div><span className="label">Invoice Date&nbsp;</span>{formatDate(invoiceDate)}</div>
            <div><span className="label">Due Date&nbsp;</span>{formatDate(dueDate)}</div>
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
          <div className="totals-row grand"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>

        <div className="invoice-footer-note">
          Thank you for your business. Please remit payment by the due date above.
        </div>
      </div>
    </main>
  );
}