'use client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body > div > main > div[style*="margin-top"] { margin-top: 0 !important; }
        /* Only hide the site's main nav and footer, not the admin's internal nav */
        body > nav, body > footer { display: none !important; }
      `}</style>
      {children}
    </>
  );
}
