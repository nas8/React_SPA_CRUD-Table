import { IResponseItem, IResponseItemWithoutId, tableDataApi } from '../tableDataApi';

export interface IPostResponseResult {
  error_code: number;
  error_message: string;
  data: IResponseItem;
}

interface PostParams {
  token: string | null;
  item: IResponseItemWithoutId;
}

export default tableDataApi.injectEndpoints({
  endpoints: (build) => ({
    postTableData: build.mutation<IPostResponseResult, PostParams>({
      query: ({ token, item }) => ({
        url: '/ru/data/v3/testmethods/docs/userdocs/create',
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
