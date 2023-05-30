import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 1000;
  background-color: white;
  border-radius: 10px;
  padding: 40px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-direction: column;
  font-size: 14px;
`;
