export default function PrivacyPage() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: '2rem' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>Last updated: September 2026</p>

        <p>
          This page explains what information Ledger Lane collects, how
          it&apos;s used, and how it&apos;s protected. We&apos;ve tried to
          write it in plain language rather than dense legal text.
        </p>

        <h2 style={{ marginTop: 32 }}>What we collect</h2>
        <p>If you use the tools without an account, we don&apos;t collect or store anything — your data stays in your browser only for that session.</p>
        <p>If you create a free account, we store:</p>
        <ul>
          <li>Your email address and business name (for login and identifying your account)</li>
          <li>Any invoices, quotes, expenses, and income entries you choose to save</li>
        </ul>
        <p>If you use the Contact form, we store your name, email, and message so we can respond.</p>

        <h2 style={{ marginTop: 32 }}>What we don&apos;t do</h2>
        <p>
          We don&apos;t sell your information to anyone. We don&apos;t share
          it with advertisers. We don&apos;t use it to send marketing emails
          you didn&apos;t ask for.
        </p>

        <h2 style={{ marginTop: 32 }}>How your data is protected</h2>
        <p>
          Your account data is stored with Supabase, a third-party database
          provider, and is protected by row-level security — meaning our own
          database rules are set up so your saved data is only ever
          accessible to your own logged-in account, not to other users.
          Connections to the site are encrypted (HTTPS).
        </p>

        <h2 style={{ marginTop: 32 }}>Deleting your data</h2>
        <p>
          You can delete individual invoices, quotes, and expenses yourself
          at any time from your dashboard. If you&apos;d like your entire
          account and all associated data removed, contact us and we&apos;ll
          take care of it.
        </p>

        <h2 style={{ marginTop: 32 }}>Third parties we rely on</h2>
        <p>
          We use Supabase for account login and data storage, and Vercel for
          hosting the site. Both are established providers with their own
          security practices; we don&apos;t control their infrastructure
          directly, but we don&apos;t give them any access to your data
          beyond what&apos;s needed to run the site.
        </p>

        <h2 style={{ marginTop: 32 }}>Changes to this policy</h2>
        <p>
          If this policy changes in a meaningful way, we&apos;ll update the
          date at the top of this page.
        </p>

        <h2 style={{ marginTop: 32 }}>Questions</h2>
        <p>
          If you have any questions about this policy or your data, reach out
          through the <a href="/contact">Contact page</a>.
        </p>
      </div>
    </main>
  );
}