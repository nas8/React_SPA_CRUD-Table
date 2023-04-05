import GET_TABLE_DATA from './GET/getTableData';

export * from './tableDataApi';
export * from './tableDataTags';

export const TABLE_DATA_API = {
  ...GET_TABLE_DATA,
  ...GET_TABLE_DATA.endpoints,
};
