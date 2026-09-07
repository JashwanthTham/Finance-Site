'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    const { error } = await supabase.from('contact_messages').insert({
      name,
      email,
      message,
    });
    if (error) {
      setStatus('error');
    } else {
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    }
  }

  if (status === 'sent') {
    return (
      <main className="section">
        <div className="container" style={{ maxWidth: 480 }}>
          <h1 style={{ fontSize: '1.8rem' }}>Thanks — message sent.</h1>
          <p>We read every message. We&apos;ll get back to you at the email you provided.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 480 }}>
        <h1 style={{ fontSize: '1.8rem' }}>Contact us</h1>
        <p>Questions, feedback, or something not working right? Send it our way.</p>

        <form onSubmit={handleSubmit} className="card" style={{ marginTop: 24 }}>
          <div className="field">
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              style={{
                width: '100%', padding: '10px 12px', border: '1px solid var(--line)',
                borderRadius: 6, fontFamily: 'inherit', fontSize: '0.95rem',
              }}
            />
          </div>
          {status === 'error' && <p style={{ color: 'var(--error)' }}>Something went wrong — try again in a moment.</p>}
          <button type="submit" className="btn btn-primary" disabled={status === 'sending'} style={{ width: '100%' }}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
    </main>
  );
}