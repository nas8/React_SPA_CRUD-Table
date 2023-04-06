import { tableDataApi } from '../tableDataApi';

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
