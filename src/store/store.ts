import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import tableSlice from './tableSlice';
import { loginApi } from '../api/login';
import { tableDataApi } from '../api/table-data';

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [tableDataApi.reducerPath]: tableDataApi.reducer,
    tableSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware, tableDataApi.middleware, thunkMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
