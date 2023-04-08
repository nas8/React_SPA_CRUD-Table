import { IResponseItem, tableDataApi } from '../tableDataApi';

export interface IGetResponseResult {
  error_code: number;
  error_message: string;
  data: IResponseItem[];
}

export default tableDataApi.injectEndpoints({
  endpoints: (build) => ({
    getTableData: build.query<IGetResponseResult, string>({
      query: (token) => {
        return {
          url: `/ru/data/v3/testmethods/docs/userdocs/get`,
          headers: {
            'x-auth': `${token}`,
            Accept: 'application/json',
          },
        };
      },
    }),
  }),
});
