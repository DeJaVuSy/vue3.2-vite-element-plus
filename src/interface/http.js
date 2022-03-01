import axios from 'axios'
import store from '../store/states'
import router from '../router/index'
import { ElMessageBox, ElMessage } from 'element-plus'
//创建axios的一个实例
var instance = axios.create({
    baseURL: store.Base_URL,
    timeout: 10000 //请求时间
});

//------------------- 一、请求拦截器 忽略
instance.interceptors.request.use(function(config) {
    if (localStorage.getItem('token')) {
        //在请求头Request Headers中加入token
        config.headers.token = `${localStorage.getItem('token')}`;
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    //console.log(response);
　　// 对响应数据做点什么
　　return response
}, function (error) {
　　// 对响应错误做点什么
    if (error.response) {
        switch (error.response.status) {
            case 401:
                localStorage.clear();     //删除用户信息
                sessionStorage.clear();
                //如果超时就处理 ，指定要跳转的页面(比如登陆页)
                ElMessage.warning("token失效,请重新登录!");
                router.replace({
                    path: '/'
                })
        }
    }
　　return Promise.reject(error)
});

// instance.interceptors.response.use(response => {
//     console.log(response.data.message);
//     if (response) {
//         switch (response.data.code) {
//         case 403: //与后台约定登录失效的返回码,根据实际情况处理
//             localStorage.clear();     //删除用户信息
//             //如果超时就处理 ，指定要跳转的页面(比如登陆页)
//             Message({
//             message: 'token失效,请重新登录!',
//             type: 'warning',
//             center: true,
//             onClose:function () {
//                 console.log('关闭了看下')
//                 router.replace({
//                 path: '/user/login',
//                 })
//             }
//             });
//         }
//     }
//     return response;
// }, error => {
//     return Promise.reject(error.response.data) //返回接口返回的错误信息
// })

export default function(method, url, data = null) {
    method = method.toLowerCase();
    if (method === 'post') {
        return instance.post(url, data)
    } else if (method === 'get') {
        return instance.get(url, { params: data })
    } else if (method === 'delete') {
        return instance.delete(url, { params: data })
    } else if (method === 'put') {
        return instance.put(url, data)
    } else {
        console.error('未知的method' + method);
        return false
    }
}