export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          background: "#0a0a0c",
          color: "#f2f2f4",
          fontFamily: "sans-serif",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/en" style={{ color: "#4d7cfe" }}>
          Back to home
        </a>
      </body>
    </html>
  );
}
