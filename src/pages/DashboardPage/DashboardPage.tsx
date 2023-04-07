import { useEffect } from 'react';
import { TABLE_DATA_API } from '../../api/table-data';
import { Layout } from '../../ui/Layout/Layout';
import { Table } from './components/Table/Table';
import { useSelector } from 'react-redux';
import { selectTableData } from '../../store/tableSlice';
import { Loader } from '../../ui/Loader/Loader';
import { RequestStatus } from '../../types/requestStatuses';

export const DashboardPage = () => {
  const token = localStorage.getItem('token');
  const [getData] = TABLE_DATA_API.getTableData.useLazyQuery();

  const { getDataStatus, tableData } = useSelector(selectTableData);

  useEffect(() => {
    if (token) {
      getData(token);
    }
  }, [token, getData]);

  return (
    <Layout>
      {getDataStatus === RequestStatus.LOADING && <Loader />}
      {getDataStatus === RequestStatus.SUCCESS && (
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
          <Table data={tableData} />
        </div>
      )}
      {getDataStatus === RequestStatus.ERROR && <h3>Data loading error</h3>}
    </Layout>
  );
};
