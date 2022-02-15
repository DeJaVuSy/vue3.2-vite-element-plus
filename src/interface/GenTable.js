import req from './http';
//查询可生成代码的表
export const AbleGenTable = params => req('post', '/generatemysql/gen-table/ableGenTable', params);
//生成代码
export const GenTable = params => req('post', '/generatemysql/gen-table/genTable', params);
//删除生成代码及相关配置信息
export const DeleteClass = params => req('post', '/generatemysql/gen-table/deleteClass', params);
//查询已生成表
export const QueryGenTable = params => req('post', '/generatemysql/gen-table/queryGenTable', params);