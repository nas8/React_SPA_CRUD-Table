import Header from '../Header/Header';

interface LayoutProps {
  children: any;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ marginTop: '40px' }}>{children}</div>
    </div>
  );
};
