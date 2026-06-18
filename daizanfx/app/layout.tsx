import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DaizanFX | XAUUSD Signals & Education',
  description:
    'Professional XAUUSD (Gold) forex signals, risk management tools, and education for serious traders. Join 500+ active members trading smarter.',
  keywords: 'XAUUSD signals, gold forex signals, forex education, risk calculator, gold trading',
  openGraph: {
    title: 'DaizanFX | XAUUSD Signals & Education',
    description: 'Professional XAUUSD forex signals and education platform.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter antialiased" style={{ backgroundColor: '#050a14', color: 'white' }}>
        {children}
      </body>
    </html>
  );
}
