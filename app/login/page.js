'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/dashboard');
  }

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 440 }}>
        <h1 style={{ fontSize: '1.8rem' }}>Log in</h1>

        <form onSubmit={handleSubmit} className="card" style={{ marginTop: 24 }}>
          <div className="field">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p style={{ color: 'var(--error)' }}>{error}</p>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Log in</button>
        </form>
        <p style={{ marginTop: 16 }}>No account yet? <a href="/signup">Create one for free</a></p>
      </div>
    </main>
  );
}
