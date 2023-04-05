import { HeaderInner, StyledHeader } from './Header.styled';
import { Button } from '@mui/joy';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      setIsAuth(false);
      navigate('/');
    }
  }, [isAuth, navigate, setIsAuth]);

  const handleSubmit = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  return (
    <StyledHeader>
      <HeaderInner>
        <p style={{ color: 'white', fontWeight: '700' }}>Pryaniky.com</p>
        <Button onClick={handleSubmit}>Log Out</Button>
      </HeaderInner>
    </StyledHeader>
  );
};

export default Header;
