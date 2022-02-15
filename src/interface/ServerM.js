import req from './http';

//服务监控查询
export const ServerMQuery = params => req('post', '/generatemysql/ServerM', params);