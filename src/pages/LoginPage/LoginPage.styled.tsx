import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 40px;
  border-radius: 10px;
  text-align: left;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
`;

export const ErrorWrapper = styled.div`
  color: red;
  font-size: 12px;
  text-align: center;
`;
