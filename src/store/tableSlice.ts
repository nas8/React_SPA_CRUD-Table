import { createSlice, current } from '@reduxjs/toolkit';
import { IResponseItem, TABLE_DATA_API } from '../api/table-data';
import type { RootState } from './store';
import { RequestStatus } from '../types/requestStatuses';
import { formatISODate } from '../utils/formatISODate';
import { IGetResponseResult } from '../api/table-data/GET/getTableData';
import { IPostResponseResult } from '../api/table-data/POST/postTableItem';
import { IPutResponseResult } from '../api/table-data/PUT/putTableItem';

interface tableSliceState {
  getDataStatus: string;
  postDataStatus: string;
  putDataStatus: string;
  deleteDataStatus: string;
  tableData: NumberedItem[];
}

export interface NumberedItem extends IResponseItem {
  rowNumber: number;
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
  reducers: {},
  extraReducers: (builder) => {
    //GET DATA
    builder.addMatcher(TABLE_DATA_API.getTableData.matchPending, (state, { payload }) => {
      state.getDataStatus = RequestStatus.LOADING;
    });
    builder.addMatcher(
      TABLE_DATA_API.getTableData.matchFulfilled,
      (state, { payload }: { payload: IGetResponseResult }) => {
        const { data } = payload;

        const formattedData = data.map((row, index) => {
          const newRow: NumberedItem = { ...row, rowNumber: index + 1 };

          newRow.companySigDate = formatISODate(row.companySigDate);
          newRow.employeeSigDate = formatISODate(row.employeeSigDate);

          return newRow;
        });

        state.tableData = [...formattedData];
        state.getDataStatus = RequestStatus.SUCCESS;
      },
    );
    builder.addMatcher(TABLE_DATA_API.getTableData.matchRejected, (state, { payload }) => {
      state.getDataStatus = RequestStatus.ERROR;
    });
    //POST ITEM
    builder.addMatcher(TABLE_DATA_API.postTableData.matchPending, (state, { payload }) => {
      state.postDataStatus = RequestStatus.LOADING;
    });
    builder.addMatcher(
      TABLE_DATA_API.postTableData.matchFulfilled,
      (state, { payload }: { payload: IPostResponseResult }) => {
        let maxRowNumber = 0;

        current(state).tableData.forEach((el) => {
          if (el.rowNumber > maxRowNumber) {
            maxRowNumber = el.rowNumber;
          }
        });

        const { data } = payload;
        const newRow: NumberedItem = { ...data, rowNumber: maxRowNumber + 1 };

        newRow.companySigDate = formatISODate(newRow.companySigDate);
        newRow.employeeSigDate = formatISODate(newRow.employeeSigDate);

        state.tableData = [newRow, ...state.tableData];
        state.postDataStatus = RequestStatus.SUCCESS;
      },
    );
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
    builder.addMatcher(
      TABLE_DATA_API.putTableData.matchFulfilled,
      (state, { payload }: { payload: IPutResponseResult }) => {
        const { data } = payload;

        const updatedData = state.tableData.map((item) => {
          if (item.id === data.id) {
            const updatedItem: NumberedItem = { ...data, rowNumber: item.rowNumber };
            updatedItem.companySigDate = formatISODate(data.companySigDate);
            updatedItem.employeeSigDate = formatISODate(data.employeeSigDate);

            return updatedItem;
          }
          return item;
        });

        state.tableData = [...updatedData];
        state.putDataStatus = RequestStatus.SUCCESS;
      },
    );
    builder.addMatcher(TABLE_DATA_API.putTableData.matchRejected, (state, { payload }) => {
      state.putDataStatus = RequestStatus.ERROR;
    });
  },
});

export const selectTableData = (state: RootState) => state.tableSlice;

export default tableSlice.reducer;
