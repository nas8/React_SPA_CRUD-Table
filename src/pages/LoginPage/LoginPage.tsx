import { useContext, useState } from 'react';
import { StyledForm, ErrorWrapper } from './LoginPage.styled';
import { LOGIN_API } from '../../api/login';
import { Button, Input } from '@mui/joy';
import { AuthContext } from '../../context/AuthContext';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAccessDenied, setIsAccessDenied] = useState(false);
  const { setIsAuth } = useContext(AuthContext);

  const [login, { isError, isLoading }] = LOGIN_API.login.useMutation({});

  const handleSubmit = async () => {
    if (username && password) {
      const response = await login({ username, password });
      const { data }: any = response;

      if (data.error_code === 0) {
        setIsAccessDenied(false);
        localStorage.setItem('token', data.data.token);
        setIsAuth(true);
        return;
      }

      setIsAccessDenied(true);
    }
  };

  return (
    <div>
      <StyledForm>
        <div>
          <div style={{ marginBottom: '10px' }}>Username:</div>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            color="neutral"
            placeholder="username"
            size="md"
            variant="outlined"
            disabled={isLoading}
            required
          />
        </div>
        <div>
          <div style={{ marginBottom: '10px' }}>Password:</div>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            color="neutral"
            placeholder="password"
            size="md"
            variant="outlined"
            disabled={isLoading}
            required
          />
        </div>
        <Button type="submit" loading={isLoading} onClick={handleSubmit}>
          Login
        </Button>
        {isError && <ErrorWrapper>Server error</ErrorWrapper>}
        {isAccessDenied && <ErrorWrapper>Wrong username or password</ErrorWrapper>}
      </StyledForm>
    </div>
  );
};