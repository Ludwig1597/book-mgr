//在这里写调用接口的相关方法
import {
    get,
    post,
} from '@/helpers/request';

export const list = (page, size) => {
    return get('/forget-password/list', {
        //对应的去后端看一下是不是这个接口前缀
        //be/src/routers/forget-password/index.js

        //接着去模板index.js把接口引入

        page,
        size,

    });
};

//对应的调用后端接口的方法
export const add = (account) => {
    return post('/forget-password/add', {
        //对应的去后端看一下是不是这个接口前缀
        //be/src/routers/forget-password/index.js
        account,
    });
};

export const updateStatus = (id, status) => {
    return post('/forget-password/update/status', {
        id,
        status,
    });
};
/* //在这里写调用接口的相关方法
import axios from 'axios';

export const list = (page, size) => {
    return axios.get('http://localhost:3000/forget-password/list', {
        //对应的去后端看一下是不是这个接口前缀
        //be/src/routers/forget-password/index.js

        //接着去模板index.js把接口引入
        params: {
            page,
            size,
        }
    });
};

//对应的调用后端接口的方法
export const add = (account) => {
    return axios.post('http://localhost:3000/forget-password/add', {
        //对应的去后端看一下是不是这个接口前缀
        //be/src/routers/forget-password/index.js
        account,
    });
};

export const updateStatus = (id, status) => {
    return axios.post('http://localhost:3000/forget-password/update/status', {
        id,
        status,
    });
}; */