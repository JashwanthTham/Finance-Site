'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

export default function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand">Ledger Lane</Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/tools">Tools</Link>
          <Link href="/learn">Learn</Link>
          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <button onClick={handleSignOut} className="btn btn-secondary">Sign out</button>
            </>
          ) : (
            <>
              <Link href="/login">Log in</Link>
              <Link href="/signup" className="btn btn-primary">Create free account</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
