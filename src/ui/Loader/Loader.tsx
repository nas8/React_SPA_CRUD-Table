import CircularProgress from '@mui/material/CircularProgress';
import { LoaderWrapper } from './Lodader.styled';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <CircularProgress />
    </LoaderWrapper>
  );
};
