import { useEffect, useState } from 'react';
import { TABLE_DATA_API } from '../../api/table-data';
import { Layout } from '../../ui/Layout/Layout';
import { Table } from './components/Table/Table';
import { useSelector } from 'react-redux';
import { selectTableData } from '../../store/tableSlice';

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
  const [getData] = TABLE_DATA_API.tableData.useLazyQuery();

  const { requestStatus, tableData } = useSelector(selectTableData);

  useEffect(() => {
    if (token) {
      getData(token);
    }
  }, [token, getData]);

  return (
    <Layout>
      <Table data={tableData} />
    </Layout>
  );
};
