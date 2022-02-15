import req from './http';

//登录
export const Login = params => req('post', '/generatemysql/sys-user/login', params);