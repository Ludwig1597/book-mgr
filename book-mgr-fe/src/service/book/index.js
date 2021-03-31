// import axios from 'axios'; //ES6有个默认导出所以不需要加大括号来解构
import {
    del,
    post,
    get,
} from '@/helpers/request';
/* import { getToken } from '@/helpers/token';
//axios是一个请求库

axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`; */

export const add = (form) => {
    return post('/book/add', form, );
};

export const list = (data) => {
    return get('/book/list',
        data,
        /* headers: {
            Authorization: `Bearer ${getToken()}`
        } 可以使用axios统一的配置项*/
    );
};
//前端删除接口--->写好后就去前端js写一下删除事件--->fe/src/views/books/index.js
export const remove = (id) => {
    // return axios.delete('http://localhost:3000/book/'+id);
    //用模板字符串去写
    return del(`/book/${id}`);
};
//前端出库入库接口
export const updateCount = (data = {}) => {
    return post(`/book/update/count`, data);
};
export const update = (data = {}) => {
    return post(`/book/update`, data);
};

export const detail = (id) => {
        return get(`/book/detail/${id}`)
    } //去访问后端写的/book/detail接口 

export const addMany = (key) => {
    return post('/book/addMany', {
        key,
    });
};
/* import axios from 'axios'; //ES6有个默认导出所以不需要加大括号来解构
import { getToken } from '@/helpers/token';
//axios是一个请求库

axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`;

export const add = (form) => {
    return axios.post('http://localhost:3000/book/add', form, );
};

export const list = (data) => {
    return axios.get('http://localhost:3000/book/list', {
        params: data,
        /* headers: {
            Authorization: `Bearer ${getToken()}`
        } 可以使用axios统一的配置项*/
//    });
//};
//前端删除接口--->写好后就去前端js写一下删除事件--->fe/src/views/books/index.js
/* export const remove = (id) => {
    // return axios.delete('http://localhost:3000/book/'+id);
    //用模板字符串去写
    return axios.delete(`http://localhost:3000/book/${id}`);
}; */
//前端出库入库接口
// export const updateCount = (data = {}) => {
//     return axios.post(`http://localhost:3000/book/update/count`, data);
// };
// export const update = (data = {}) => {
//     return axios.post(`http://localhost:3000/book/update`, data);
// };

/* export const detail = (id) => {
        return axios.get(`http://localhost:3000/book/detail/${id}`)
    } //去访问后端写的/book/detail接口 

export const addMany = (key) => {
    return axios.post('http://localhost:3000/book/addMany', {
        key,
    });
};  */








// export const login = (account, password) => {
//     return axios.post('http://localhost:3000/auth/login', {
//         account,
//         password,
//     });
// };