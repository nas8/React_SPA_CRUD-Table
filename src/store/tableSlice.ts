import { createSlice } from '@reduxjs/toolkit';
import { TABLE_DATA_API } from '../api/table-data';

interface RootState {
  tableSlice: tableSliceState;
}

interface tableSliceState {
  token: string | null;
  error_code: number;
  error_message: string;
  data: Data | [];
}

interface Row {
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
  error_code: 0,
  error_message: 'OK',
  data: [],
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
    builder.addMatcher(TABLE_DATA_API.tableData.matchFulfilled, (state, { payload }) => {
      console.log(payload);
    });
  },
});

export const { setToken } = tableSlice.actions;

export const selectToken = (state: RootState) => state.tableSlice.token;

export default tableSlice.reducer;
