import React from 'react';
import { GoToPageWrapper, OptionsWrapper, StyledSelect } from './OptionsBar.styled';
import { Button, Input } from '@mui/joy';

interface OptionsBarProps {
  gotoPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  setPageSize: (pageSize: number) => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageIndex: number;
  pageLength: number;
  pageSize: number;
  pageCount: number;
}

const ELEMS_ON_PAGE = [5, 10, 20, 30, 40, 50];

export const OptionsBar: React.FC<OptionsBarProps> = ({
  gotoPage,
  previousPage,
  nextPage,
  setPageSize,
  canNextPage,
  canPreviousPage,
  pageIndex,
  pageLength,
  pageSize,
  pageCount,
}) => {
  return (
    <OptionsWrapper>
      <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {'<<'}
      </Button>{' '}
      <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </Button>{' '}
      <Button onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </Button>{' '}
      <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
      </Button>{' '}
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageLength}
        </strong>{' '}
      </span>
      <GoToPageWrapper>
        | Go to page:{' '}
        <Input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: '70px' }}
        />
      </GoToPageWrapper>{' '}
      <StyledSelect
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}>
        {ELEMS_ON_PAGE.map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </StyledSelect>
    </OptionsWrapper>
  );
};
