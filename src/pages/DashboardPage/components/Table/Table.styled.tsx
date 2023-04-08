import styled from 'styled-components';

export const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  table {
    box-sizing: border-box;
    border-spacing: 0;
    border-radius: 7px;
    box-shadow: 0px 1px 20px 8px rgba(60, 69, 76, 0.2);
    width: 1000px;
    min-height: 100px;
    margin-bottom: 30px;

    tr {
      td {
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
      }
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th {
      background-color: #3d84d5;
      color: white;
      font-weight: 400;

      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #d8d8df;
      border-right: 1px solid #d8d8df;

      :first-child {
        border-top-left-radius: 5px;
      }

      :last-child {
        border-right: 0;
        border-top-right-radius: 5px;
      }
    }

    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #d8d8df;
      border-right: 1px solid #d8d8df;
      min-width: 50px;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 0.5rem;

    input,
    select {
      border-radius: 3px;
    }
  }
`;

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
  padding: 0 3px;
  outline: none;

  :focus {
    border: 2.5px solid #096bde;
  }
`;
