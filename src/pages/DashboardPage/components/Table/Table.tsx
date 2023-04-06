import { useMemo } from 'react';
import { useTable, Column, usePagination, useSortBy } from 'react-table';
import { Styles } from './Table.styled';
import { Row } from '../../../../store/tableSlice';
import { TABLE_DATA_API } from '../../../../api/table-data';

interface TableProps {
  data: Row[];
}

export const Table: React.FC<TableProps> = ({ data = [] }) => {
  const [deleteItem] = TABLE_DATA_API.deleteTableData.useMutation();
  const token = localStorage.getItem('token');

  const handleDelete = (row: any) => {
    const { id } = row.original;

    const deleteData = {
      id: id,
      token: token,
    };

    deleteItem(deleteData);
  };

  const columns = useMemo<any>(
    () => [
      {
        Header: '№',
        accessor: 'rowNumber',
      },
      {
        Header: 'Document status',
        accessor: 'documentStatus',
      },
      {
        Header: 'Employee number',
        accessor: 'employeeNumber',
      },
      {
        Header: 'Document type',
        accessor: 'documentType',
      },
      {
        Header: 'Document name',
        accessor: 'documentName',
      },
      {
        Header: 'Company name',
        accessor: 'companySignatureName',
      },
      {
        Header: 'Employee name',
        accessor: 'employeeSignatureName',
      },
      {
        Header: 'Employee date',
        accessor: 'employeeSigDate',
      },
      {
        Header: 'Company date',
        accessor: 'companySigDate',
      },
      {
        Header: 'Edit Row',
        accessor: 'edit',
        Cell: ({ row }: { row: any }) => <button onClick={() => handleDelete(row)}>Delete</button>,
      },
    ],
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination,
  );

  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' ⬇' : ' ⬆') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any, i: number) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </Styles>
  );
};
