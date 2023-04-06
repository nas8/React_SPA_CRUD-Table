import { useEffect, useState } from 'react';
import { TABLE_DATA_API } from '../../api/table-data';
import { Layout } from '../../ui/Layout/Layout';
import { Table } from './components/Table/Table';
import { useSelector } from 'react-redux';
import { selectTableData } from '../../store/tableSlice';
import { Button } from '@mui/joy';
import { BasicModal } from '../../ui/BasicModal/BasicModal';

const mocks = [
  {
    id: 'as',
    documentStatus: 'as',
    employeeNumber: 'as',
    documentType: 'as',
    documentName: 'as',
    companySignatureName: 'as',
    employeeSignatureName: 'as',
    employeeSigDate: 'as',
    companySigDate: 'as',
  },
  {
    id: 'as',
    documentStatus: 'as',
    employeeNumber: 'as',
    documentType: 'as',
    documentName: 'as',
    companySignatureName: 'as',
    employeeSignatureName: 'as',
    employeeSigDate: 'as',
    companySigDate: 'as',
  },
  {
    id: 'as',
    documentStatus: 'as',
    employeeNumber: 'as',
    documentType: 'as',
    documentName: 'as',
    companySignatureName: 'as',
    employeeSignatureName: 'as',
    employeeSigDate: 'as',
    companySigDate: 'as',
  },
  {
    id: 'as',
    documentStatus: 'as',
    employeeNumber: 'as',
    documentType: 'as',
    documentName: 'as',
    companySignatureName: 'as',
    employeeSignatureName: 'as',
    employeeSigDate: 'as',
    companySigDate: 'as',
  },
];

export const DashboardPage = () => {
  const token = localStorage.getItem('token');
  const [getData] = TABLE_DATA_API.getTableData.useLazyQuery();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const { requestStatus, tableData } = useSelector(selectTableData);

  useEffect(() => {
    if (token) {
      getData(token);
    }
  }, [token, getData]);

  return (
    <>
      <Layout>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Button onClick={handleOpen} style={{ width: '100px', alignSelf: 'flex-end' }}>
            Add+
          </Button>
          <Table data={tableData} />
        </div>
      </Layout>
      <BasicModal isOpen={isOpen} handleClose={handleClose} />
    </>
  );
};
