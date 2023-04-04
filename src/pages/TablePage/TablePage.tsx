import { useContext, useEffect } from 'react';
import EnhancedTable from './components/Table/Table';
import { Button } from '@mui/joy';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const TablePage = () => {
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
    <>
      <EnhancedTable />
      <Button type="submit" onClick={handleSubmit}>
        Log Out
      </Button>
    </>
  );
};
