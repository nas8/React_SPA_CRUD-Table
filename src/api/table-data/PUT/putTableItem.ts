import { IResponseItem, IResponseItemWithoutId, tableDataApi } from '../tableDataApi';

export interface IPutResponseResult {
  error_code: number;
  error_message: string;
  data: IResponseItem;
}
interface PutParams {
  token: string | null;
  id: string;
  item: IResponseItemWithoutId;
}

export default tableDataApi.injectEndpoints({
  endpoints: (build) => ({
    putTableData: build.mutation<IPutResponseResult, PutParams>({
      query: ({ token, id, item }) => ({
        url: `/ru/data/v3/testmethods/docs/userdocs/set/${id}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth': `${token}`,
        },
        body: item,
      }),
    }),
  }),
});
