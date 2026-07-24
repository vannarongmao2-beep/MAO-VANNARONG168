import React from 'react';

export const metadata = {
  title: 'Business Family — Dashboard',
  description: 'Multi-Generational Wealth & Heritage Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
