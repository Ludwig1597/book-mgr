//import axios from 'axios'; //ES6有个默认导出所以不需要加大括号来解构
//axios是一个请求库
//不再需要axios请求库了，因为我们写好了，在helpers下
import {
    post,
} from '@/helpers/request';

/* export const register = (account, password, inviteCode) => {
    return axios.post('http://localhost:3000/auth/register', {
        account,
        password,
        inviteCode,
    });
};

export const login = (account, password) => {
    return axios.post('http://localhost:3000/auth/login', {
        account,
        password,
    });
}; */

export const register = (account, password, inviteCode) => {
    return post('/auth/register', {
        account,
        password,
        inviteCode,
    });
};

export const login = (account, password) => {
    return post('/auth/login', {
        account,
        password,
    });
};