import { useMemo, useState } from 'react';
import { useTable, Column, usePagination, useSortBy } from 'react-table';
import { Button, Input, IconButton } from '@mui/joy';
import { GoToPageWrapper, Pagination, StyledSelect, Styles } from './Table.styled';
import { Row } from '../../../../store/tableSlice';
import { TABLE_DATA_API } from '../../../../api/table-data';
import { AddOrEditModal, ModalMode } from '../AddOrEditModal/AddOrEditModal';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

interface TableProps {
  data: Row[];
}

export const Table: React.FC<TableProps> = ({ data = [] }) => {
  const [deleteItem] = TABLE_DATA_API.deleteTableData.useMutation();
  const token = localStorage.getItem('token');
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editableValues, setEditableValues] = useState<Row | null>(null);
  const handleClose = () => setIsOpen(false);
  const handleAddClose = () => setIsAddOpen(false);

  const handleDelete = async (row: any) => {
    const { id } = row.original;

    const deleteData = {
      id: id,
      token: token,
    };

    await deleteItem(deleteData);
  };

  const initialSortBy = useMemo(() => [{ id: 'rowNumber', desc: false }], []);

  const handleEdit = (row: any) => {
    setEditableValues({ ...row.original });
    setIsOpen(true);
  };

  const renderOptions = (row: any) => {
    return (
      <div style={{ display: 'flex', gap: '5px' }}>
        <IconButton variant="plain" onClick={() => handleEdit(row)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(row)} color="danger" variant="plain">
          <DeleteIcon />
        </IconButton>
      </div>
    );
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
        Header: 'Options',
        accessor: 'edit',
        disableSortBy: true,
        Cell: ({ row }: { row: any }) => renderOptions(row),
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
      initialState: { pageIndex: 0, sortBy: initialSortBy },
    },
    useSortBy,
    usePagination,
  );

  return (
    <>
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
        <Pagination>
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
              {pageIndex + 1} of {pageOptions.length}
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
            onChange={(e: any) => {
              console.log(e.target.value);
              setPageSize(Number(e.target.value));
            }}>
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </StyledSelect>
          <Button
            onClick={() => setIsAddOpen(true)}
            style={{
              height: '20px',
              maxWidth: '80px',
            }}>
            Add +
          </Button>
        </Pagination>
      </Styles>
      {editableValues && (
        <AddOrEditModal
          isOpen={isOpen}
          handleClose={handleClose}
          mode={ModalMode.edit}
          values={editableValues}
          id={editableValues.id}
          rowNumber={editableValues.rowNumber}
        />
      )}
      <AddOrEditModal isOpen={isAddOpen} handleClose={handleAddClose} mode={ModalMode.add} />
    </>
  );
};
