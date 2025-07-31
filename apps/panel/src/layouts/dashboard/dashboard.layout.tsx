import { Header } from '@/components/partials';

interface LayoutProps {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <nav>nav</nav>
      <main>{children}</main>
    </>
  );
};
