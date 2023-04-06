import GET_TABLE_DATA from './GET/getTableData';
import POST_TABLE_DATA from './POST/postTableItem';
import DELETE_TABLE_DATA from './DELETE/deleteTableItem';
import PUT_TABLE_DATA from './PUT/putTableItem';

export * from './tableDataApi';
export * from './tableDataTags';

export const TABLE_DATA_API = {
  ...GET_TABLE_DATA,
  ...GET_TABLE_DATA.endpoints,
  ...POST_TABLE_DATA,
  ...POST_TABLE_DATA.endpoints,
  ...DELETE_TABLE_DATA,
  ...DELETE_TABLE_DATA.endpoints,
  ...PUT_TABLE_DATA,
  ...PUT_TABLE_DATA.endpoints,
};
