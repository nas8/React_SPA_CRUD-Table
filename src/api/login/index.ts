import POST_LOGIN from './POST/postLogin';

export * from './loginApi';
export * from './loginTags';

export const LOGIN_API = {
  ...POST_LOGIN,
  ...POST_LOGIN.endpoints,
};
