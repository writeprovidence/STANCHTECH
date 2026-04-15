export default function LoginLayout({ children }) {
  return (
    <div style={{ position: "relative" }}>
      {/* Override: hide the global footer on the login page */}
      <style>{`
        footer, nav { display: none !important; }
      `}</style>
      {children}
    </div>
  );
}
