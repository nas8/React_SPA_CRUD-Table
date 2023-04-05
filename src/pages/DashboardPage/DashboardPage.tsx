import { useEffect, useState } from 'react';
import { TABLE_DATA_API } from '../../api/table-data';
import { Layout } from '../../ui/Layout/Layout';
import { Table } from './components/Table/Table';

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
  const [getData, { isLoading, isError }] = TABLE_DATA_API.tableData.useLazyQuery();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const response = await getData(token);
        const { data } = response.data;
        setData(data);
      };

      fetchData();
    }
  }, [token, getData]);

  return (
    <Layout>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {!isLoading && !isError && <Table data={data} />}
    </Layout>
  );
};
