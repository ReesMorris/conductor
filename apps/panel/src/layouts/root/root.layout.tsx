import '@/theme/globals.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
};
