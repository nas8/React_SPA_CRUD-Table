import { createSlice } from '@reduxjs/toolkit';

interface RootState {
  tableSlice: tableSliceState;
}

interface tableSliceState {
  current_user: string;
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
  current_user: '',
  error_code: 0,
  error_message: 'OK',
  data: [],
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setIsAuthorized: (state, action) => {
      state.current_user = action.payload;
    },
  },
});

export const { setIsAuthorized } = tableSlice.actions;

export const selectIsAuthorized = (state: RootState) => state.tableSlice.current_user;

export default tableSlice.reducer;
