import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTable, usePagination, useSortBy, Cell } from 'react-table';
import { Styles } from './Table.styled';
import { NumberedItem } from '../../../../store/tableSlice';
import { TABLE_DATA_API } from '../../../../api/table-data';
import { AddOrEditModal } from '../AddOrEditModal/AddOrEditModal';
import { OptionsBar } from './components/OptionsBar/OptionsBar';
import { initValuesState, ModalMode } from '../AddOrEditModal/AddOrEditModal.utils';
import { deriveColumns } from './Table.utils';
interface TableProps {
  data: NumberedItem[];
}

export const Table: React.FC<TableProps> = ({ data = [] }) => {
  const token = localStorage.getItem('token');
  const [deleteItem] = TABLE_DATA_API.deleteTableData.useMutation();
  const [editableValues, setEditableValues] = useState<NumberedItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentPage = Number(localStorage.getItem('currentPage'));
  const isDescSort = Boolean(Number(localStorage.getItem('isDescSort')));

  const handleAdd = () => {
    setEditableValues(null);
    setIsModalOpen(true);
  };

  const handleEdit = useCallback((row: any) => {
    setEditableValues({ ...row.original });
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (row: any) => {
      const { id } = row.original;

      await deleteItem({ id: id, token: token });
    },
    [deleteItem, token],
  );

  const tableColumns = useMemo(
    () => deriveColumns({ handleAdd, handleEdit, handleDelete }),
    [handleEdit, handleDelete],
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
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns: tableColumns,
      data,
      initialState: { pageIndex: currentPage, sortBy: [{ id: 'rowNumber', desc: isDescSort }] },
    },
    useSortBy,
    usePagination,
  );

  useEffect(() => {
    localStorage.setItem('currentPage', pageIndex.toString());
  }, [pageIndex]);

  useEffect(() => {
    if (sortBy.length > 0) {
      const [sort] = sortBy;

      localStorage.setItem('isDescSort', sort.desc ? '1' : '0');
    }
  }, [sortBy]);

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
      </Styles>

      <OptionsBar
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        setPageSize={setPageSize}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        pageLength={pageOptions.length}
        pageSize={pageSize}
        pageCount={pageCount}
      />

      <AddOrEditModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        mode={editableValues ? ModalMode.edit : ModalMode.add}
        values={editableValues ? editableValues : initValuesState}
      />
    </>
  );
};
