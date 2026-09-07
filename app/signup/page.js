'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function SignupPage() {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { business_name: businessName } },
    });
    if (error) {
      setError(error.message);
      return;
    }
    if (data.session) {
      router.push('/dashboard');
    } else {
      setSuccess(true);
    }
  }

  if (success) {
    return (
      <main className="section">
        <div className="container" style={{ maxWidth: 440 }}>
          <h1 style={{ fontSize: '1.8rem' }}>Check your email</h1>
          <p>We sent a confirmation link to {email}. Click it to activate your account.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 440 }}>
        <h1 style={{ fontSize: '1.8rem' }}>Create a free account</h1>
        <p>Save your invoices, expenses, and reports between visits.</p>

        <form onSubmit={handleSubmit} className="card" style={{ marginTop: 24 }}>
          <div className="field">
            <label>Business name</label>
            <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
          </div>
          <div className="field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          {error && <p style={{ color: 'var(--error)' }}>{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create account</button>
        </form>
        <p style={{ marginTop: 16 }}>Already have an account? <a href="/login">Log in</a></p>
      </div>
    </main>
  );
}
