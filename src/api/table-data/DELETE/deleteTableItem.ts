import { tableDataApi } from '../tableDataApi';

interface IDeleteResponseResult {
  error_code: number;
  error_message: string;
}

interface DeleteParams {
  token: string | null;
  id: string;
}

export default tableDataApi.injectEndpoints({
  endpoints: (build) => ({
    deleteTableData: build.mutation<IDeleteResponseResult, DeleteParams>({
      query: ({ id, token }) => ({
        url: `/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': `${token}`,
        },
      }),
    }),
  }),
});
