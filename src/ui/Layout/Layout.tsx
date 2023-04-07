import Header from '../Header/Header';
import { StyledLayout } from './Layout.styled';

interface LayoutProps {
  children: any;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <Header />
      <div style={{ marginTop: '40px' }}>{children}</div>
    </StyledLayout>
  );
};
