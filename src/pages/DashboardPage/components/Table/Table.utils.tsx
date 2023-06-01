import { Column } from 'react-table';
import { ButtonsBlock } from './components/ButtonsBlock/ButtonsBlock';
import AddCircle from '@material-ui/icons/AddBoxOutlined';
import { IconButton } from '@mui/joy';

interface ColumnsProps {
  handleAdd: () => void;
  handleEdit: (row: any) => void;
  handleDelete: (row: any) => void;
}

export const deriveColumns = ({
  handleAdd,
  handleEdit,
  handleDelete,
}: ColumnsProps): Column<any>[] => [
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
    Header: () => {
      return (
        <IconButton onClick={handleAdd}>
          <AddCircle />
        </IconButton>
      );
    },
    accessor: 'add',
    disableSortBy: true,
    Cell: ({ row }: { row: any }) => (
      <ButtonsBlock handleDelete={handleDelete} handleEdit={handleEdit} row={row} />
    ),
  },
];
