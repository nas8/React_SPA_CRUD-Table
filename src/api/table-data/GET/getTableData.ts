import { tableDataApi } from '../tableDataApi';

export default tableDataApi.injectEndpoints({
  endpoints: (build) => ({
    tableData: build.query({
      query: (token: string | null) => {
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
