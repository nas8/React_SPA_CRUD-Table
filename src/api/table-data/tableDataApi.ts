import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { TableDataTagsAll } from './tableDataTags';
import { reducerLabels } from '../reducerLabels';

export interface IResponseItem {
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

export interface IResponseItemWithoutId extends Omit<IResponseItem, 'id'> {}

export const tableDataApi = createApi({
  reducerPath: reducerLabels.DATA_TABLE_API,
  baseQuery: fetchBaseQuery({ baseUrl: 'https://test.v5.pryaniky.com' }),
  tagTypes: TableDataTagsAll,
  endpoints: () => ({}),
});
