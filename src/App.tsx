import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { LoginPage } from './pages/LoginPage/LoginPage';

import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { AuthContext } from './context/AuthContext';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuth(true);
      navigate('dashboard');
      return;
    }

    navigate('/');
  }, [isAuth, navigate]);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <div className="App">
        <Routes>
          <Route index path="/" element={<LoginPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
