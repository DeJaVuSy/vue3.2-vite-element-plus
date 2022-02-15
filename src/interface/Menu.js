import req from './http';

//菜单查询
export const MenuQuery = params => req('post', '/generatemysql/sys-menu/queryMenu', params);