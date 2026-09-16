'use client';

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        body > div > main > div[style*="margin-top"] { margin-top: 0 !important; }
        /* Hide the site's main nav and footer for the inventory panel */
        body > nav, body > footer { display: none !important; }
      `}</style>
      {children}
    </>
  );
}
