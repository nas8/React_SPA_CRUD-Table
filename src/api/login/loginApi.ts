import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { reducerLabels } from '../reducerLabels';

import { LoginTagsAll } from './loginTags';

export const loginApi = createApi({
  reducerPath: reducerLabels.LOGIN_API,
  baseQuery: fetchBaseQuery({ baseUrl: 'https://test.v5.pryaniky.com' }),
  tagTypes: LoginTagsAll,
  endpoints: () => ({}),
});
