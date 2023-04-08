import { useCallback, useMemo, useState } from 'react';
import { useTable, Column, usePagination, useSortBy, Cell, Row } from 'react-table';
import { Button, Input, IconButton } from '@mui/joy';
import { GoToPageWrapper, OptionsWrapper, StyledSelect, Styles } from './Table.styled';
import { NumberedItem } from '../../../../store/tableSlice';
import { TABLE_DATA_API } from '../../../../api/table-data';
import { AddOrEditModal, ModalMode } from '../AddOrEditModal/AddOrEditModal';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

interface TableProps {
  data: NumberedItem[];
}

export const Table: React.FC<TableProps> = ({ data = [] }) => {
  const token = localStorage.getItem('token');
  const [deleteItem] = TABLE_DATA_API.deleteTableData.useMutation();
  const [editableValues, setEditableValues] = useState<NumberedItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const handleEditModalClose = () => setIsEditModalOpen(false);
  const handleAddModalClose = () => setIsAddModalOpen(false);

  const handleDelete = useCallback(
    async (row: any) => {
      const { id } = row.original;

      await deleteItem({ id: id, token: token });
    },
    [deleteItem, token],
  );

  const initialSortBy = useMemo(() => [{ id: 'rowNumber', desc: false }], []);

  const handleEdit = useCallback((row: any) => {
    setEditableValues({ ...row.original });
    setIsEditModalOpen(true);
  }, []);

  const renderOptions = useCallback(
    (row: any) => {
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
    },
    [handleEdit, handleDelete],
  );

  const columns = useMemo<Column<any>[]>(
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
        accessor: 'options',
        disableSortBy: true,
        Cell: ({ row }: { row: Row }) => renderOptions(row),
      },
    ],
    [renderOptions],
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
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: Cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
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
            onClick={() => setIsAddModalOpen(true)}
            style={{
              height: '20px',
              maxWidth: '80px',
            }}>
            Add +
          </Button>
        </OptionsWrapper>
      </Styles>
      {editableValues && (
        <AddOrEditModal
          isOpen={isEditModalOpen}
          handleClose={handleEditModalClose}
          mode={ModalMode.edit}
          values={editableValues}
        />
      )}
      <AddOrEditModal
        isOpen={isAddModalOpen}
        handleClose={handleAddModalClose}
        mode={ModalMode.add}
      />
    </>
  );
};
