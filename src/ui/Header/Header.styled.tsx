import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 55px;
  width: 100%;
  border-bottom: 1px black solid;
  gap: 20px;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  background-color: rgb(13, 13, 13);
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin: 0 auto;
  width: 100%;
  max-width: 1400px;
  padding: 0 10px 0 10px;
`;
