import { loginApi } from '../loginApi';

export interface IGetLoginData {
  data: {
    data: Data;
    error_code: number;
    error_message: string;
  };
}

interface Data {
  token: string;
}

interface IPostLoginData {
  username: string;
  password: string;
}

export default loginApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<IGetLoginData, IPostLoginData>({
      query: (data) => ({
        url: '/ru/data/v3/testmethods/docs/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      }),
    }),
  }),
});
