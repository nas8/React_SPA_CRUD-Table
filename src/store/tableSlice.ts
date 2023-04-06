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

export interface Row {
  rowNumber: number;
  id: string;
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
    deleteItem(state, action) {},
  },
  extraReducers: (builder) => {
    //GET DATA
    builder.addMatcher(TABLE_DATA_API.getTableData.matchPending, (state, { payload }) => {
      state.requestStatus = RequestStatus.LOADING;
    });
    builder.addMatcher(TABLE_DATA_API.getTableData.matchFulfilled, (state, { payload }) => {
      const { data }: Data = payload;

      const formattedData = data.map((row: Row, index) => {
        const newRow = { ...row };
        newRow.rowNumber = index + 1;
        newRow.companySigDate = formatISODate(row.companySigDate);
        newRow.employeeSigDate = formatISODate(row.employeeSigDate);

        return newRow;
      });

      state.tableData = [...formattedData];
      state.requestStatus = RequestStatus.SUCCESS;
    });
    builder.addMatcher(TABLE_DATA_API.getTableData.matchRejected, (state, { payload }) => {
      state.requestStatus = RequestStatus.ERROR;
    });
    //POST ITEM
    builder.addMatcher(TABLE_DATA_API.postTableData.matchPending, (state, { payload }) => {});
    builder.addMatcher(TABLE_DATA_API.postTableData.matchFulfilled, (state, { payload }) => {
      const { data }: Data = payload;
      const newRow: any = { ...data };
      newRow.rowNumber = state.tableData.length + 1;
      newRow.companySigDate = formatISODate(newRow.companySigDate);
      newRow.employeeSigDate = formatISODate(newRow.employeeSigDate);

      state.tableData = [newRow, ...state.tableData];
    });
    builder.addMatcher(TABLE_DATA_API.postTableData.matchRejected, (state, { payload }) => {});
    //DELETE ITEM
    builder.addMatcher(TABLE_DATA_API.deleteTableData.matchPending, (state, { payload }) => {});
    builder.addMatcher(TABLE_DATA_API.deleteTableData.matchFulfilled, (state, { meta }) => {
      const { id } = meta.arg.originalArgs;
      const filteredData = state.tableData.filter((item) => item.id !== id);
      // const formattedData = filteredData.map((row: Row, index) => {
      //   const newRow = { ...row };
      //   newRow.rowNumber = index + 1;
      //   return newRow;
      // });

      state.tableData = [...filteredData];
    });
    builder.addMatcher(TABLE_DATA_API.deleteTableData.matchRejected, (state, { payload }) => {});
    //PUT ITEM
    builder.addMatcher(TABLE_DATA_API.putTableData.matchPending, (state, { payload }) => {});
    builder.addMatcher(TABLE_DATA_API.putTableData.matchFulfilled, (state, { meta }) => {
      const { id } = meta.arg.originalArgs;
      const filteredData = state.tableData.filter((item) => item.id !== id);

      state.tableData = [...filteredData];
    });
    builder.addMatcher(TABLE_DATA_API.putTableData.matchRejected, (state, { payload }) => {});
  },
});

export const { setToken } = tableSlice.actions;

export const selectToken = (state: RootState) => state.tableSlice.token;
export const selectTableData = (state: RootState) => state.tableSlice;

export default tableSlice.reducer;
