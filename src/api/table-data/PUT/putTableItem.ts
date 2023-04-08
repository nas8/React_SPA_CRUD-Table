import { IResponseItem, tableDataApi } from '../tableDataApi';

export interface IPutResponseResult {
  error_code: number;
  error_message: string;
  data: IResponseItem;
}

export default tableDataApi.injectEndpoints({
  endpoints: (build) => ({
    putTableData: build.mutation({
      query: (data) => ({
        url: `/ru/data/v3/testmethods/docs/userdocs/set/${data.id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': `${data.token}`,
        },
        body: data.item,
      }),
    }),
  }),
});
