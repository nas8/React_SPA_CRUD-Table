import GET_TABLE_DATA from './GET/getTableData';
import POST_TABLE_DATA from './POST/postTableItem';

export * from './tableDataApi';
export * from './tableDataTags';

export const TABLE_DATA_API = {
  ...GET_TABLE_DATA,
  ...GET_TABLE_DATA.endpoints,
  ...POST_TABLE_DATA,
  ...POST_TABLE_DATA.endpoints,
};
