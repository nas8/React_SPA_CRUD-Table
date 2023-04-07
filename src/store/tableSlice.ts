import { createSlice } from '@reduxjs/toolkit';
import { TABLE_DATA_API } from '../api/table-data';
import type { RootState } from './store';
import { RequestStatus } from '../types/requestStatuses';
import { formatISODate } from '../utils/formatISODate';

interface tableSliceState {
  getDataStatus: string;
  postDataStatus: string;
  putDataStatus: string;
  deleteDataStatus: string;
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
  getDataStatus: RequestStatus.IDLE,
  postDataStatus: RequestStatus.IDLE,
  putDataStatus: RequestStatus.IDLE,
  deleteDataStatus: RequestStatus.IDLE,
  tableData: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    clearStatuses: (state, action) => {
      state.postDataStatus = RequestStatus.IDLE;
      state.putDataStatus = RequestStatus.IDLE;
    },
  },
  extraReducers: (builder) => {
    //GET DATA
    builder.addMatcher(TABLE_DATA_API.getTableData.matchPending, (state, { payload }) => {
      state.getDataStatus = RequestStatus.LOADING;
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
      state.getDataStatus = RequestStatus.SUCCESS;
    });
    builder.addMatcher(TABLE_DATA_API.getTableData.matchRejected, (state, { payload }) => {
      state.getDataStatus = RequestStatus.ERROR;
    });
    //POST ITEM
    builder.addMatcher(TABLE_DATA_API.postTableData.matchPending, (state, { payload }) => {
      state.postDataStatus = RequestStatus.LOADING;
    });
    builder.addMatcher(TABLE_DATA_API.postTableData.matchFulfilled, (state, { payload }) => {
      const { data }: Data = payload;
      const newRow: any = { ...data };

      newRow.rowNumber = state.tableData.length + 1;
      newRow.companySigDate = formatISODate(newRow.companySigDate);
      newRow.employeeSigDate = formatISODate(newRow.employeeSigDate);

      state.tableData = [newRow, ...state.tableData];
      state.postDataStatus = RequestStatus.SUCCESS;
    });
    builder.addMatcher(TABLE_DATA_API.postTableData.matchRejected, (state, { payload }) => {
      state.postDataStatus = RequestStatus.ERROR;
    });
    //DELETE ITEM
    builder.addMatcher(TABLE_DATA_API.deleteTableData.matchPending, (state, { payload }) => {
      state.deleteDataStatus = RequestStatus.LOADING;
    });
    builder.addMatcher(TABLE_DATA_API.deleteTableData.matchFulfilled, (state, { meta }) => {
      const { id } = meta.arg.originalArgs;
      const filteredData = state.tableData.filter((item) => item.id !== id);
      state.tableData = [...filteredData];
      state.deleteDataStatus = RequestStatus.SUCCESS;
    });
    builder.addMatcher(TABLE_DATA_API.deleteTableData.matchRejected, (state, { payload }) => {
      state.deleteDataStatus = RequestStatus.ERROR;
    });
    //PUT ITEM
    builder.addMatcher(TABLE_DATA_API.putTableData.matchPending, (state, { payload }) => {
      state.putDataStatus = RequestStatus.LOADING;
    });
    builder.addMatcher(TABLE_DATA_API.putTableData.matchFulfilled, (state, { payload }) => {
      const { data }: any = payload;
      const updatedData = state.tableData.map((item) => {
        if (item.id === data.id) {
          const updatedItem = { ...data };
          updatedItem.companySigDate = formatISODate(data.companySigDate);
          updatedItem.employeeSigDate = formatISODate(data.employeeSigDate);
          updatedItem.rowNumber = item.rowNumber;

          return updatedItem;
        }
        return item;
      });

      state.tableData = [...updatedData];
      state.putDataStatus = RequestStatus.SUCCESS;
    });
    builder.addMatcher(TABLE_DATA_API.putTableData.matchRejected, (state, { payload }) => {
      state.putDataStatus = RequestStatus.ERROR;
    });
  },
});

export const { clearStatuses } = tableSlice.actions;

export const selectTableData = (state: RootState) => state.tableSlice;

export default tableSlice.reducer;
