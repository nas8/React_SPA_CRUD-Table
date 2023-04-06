import { createSlice } from '@reduxjs/toolkit';
import { TABLE_DATA_API } from '../api/table-data';
import type { RootState } from './store';
import { RequestStatus } from '../types/requestStatuses';
import { formatISODate } from '../utils/formatISODate';

interface tableSliceState {
  token: string | null;
  requestStatus: string;
  tableData: Row[] | [];
}

interface Row {
  id: string | number;
  documentStatus: string;
  employeeNumber: string;
  documentType: string;
  documentName: string;
  companySignatureName: string;
  employeeSignatureName: string;
  employeeSigDate: string;
  companySigDate: string;
}

interface Data {
  data: Row[];
}

const initialState: tableSliceState = {
  token: null,
  requestStatus: RequestStatus.IDLE,
  tableData: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(TABLE_DATA_API.tableData.matchPending, (state, { payload }) => {
      state.requestStatus = RequestStatus.LOADING;
    });
    builder.addMatcher(TABLE_DATA_API.tableData.matchFulfilled, (state, { payload }) => {
      const { data }: Data = payload;

      const formattedData = data.map((row: Row, index) => {
        const newRow = { ...row };
        newRow.id = index + 1;
        newRow.companySigDate = formatISODate(row.companySigDate);
        newRow.employeeSigDate = formatISODate(row.employeeSigDate);

        return newRow;
      });

      state.tableData = [...state.tableData, ...formattedData];
      state.requestStatus = RequestStatus.SUCCESS;
    });
    builder.addMatcher(TABLE_DATA_API.tableData.matchRejected, (state, { payload }) => {
      state.requestStatus = RequestStatus.ERROR;
    });
  },
});

export const { setToken } = tableSlice.actions;

export const selectToken = (state: RootState) => state.tableSlice.token;
export const selectTableData = (state: RootState) => state.tableSlice;

export default tableSlice.reducer;
