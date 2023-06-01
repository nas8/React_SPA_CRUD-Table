import styled from 'styled-components';

export const OptionsWrapper = styled.div`
  position: fixed;
  height: 55px;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
`;

export const GoToPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const StyledSelect = styled.select`
  margin-right: 10px;
  min-height: 2.5rem;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
  border-color: #d8d8df;
  background-color: #fff;
  outline: none;

  :focus {
    border: 2.5px solid #096bde;
  }
`;
