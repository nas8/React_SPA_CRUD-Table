import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { TableDataTagsAll } from './tableDataTags';
import { reducerLabels } from '../reducerLabels';

export const tableDataApi = createApi({
  reducerPath: reducerLabels.DATA_TABLE_API,
  baseQuery: fetchBaseQuery({ baseUrl: 'https://test.v5.pryaniky.com' }),
  tagTypes: TableDataTagsAll,
  endpoints: () => ({}),
});
