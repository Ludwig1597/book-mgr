import {
    del,
    post,
    get,
} from '@/helpers/request';

export const list = (page, size) => {
    //去调用对应的接口
    //去be/src/routers/invite-code/index.js去看一下接口
    return get('/invite/list', {
        page,
        size,
    });

};

export const add = (count) => {
    //去调用对应的接口
    //去be/src/routers/invite-code/index.js去看一下接口
    return post('/invite/add', {
        count,
    });

};

export const remove = (id) => {
    return del(`/invite/${id}`);
};
/* import axios from "axios";

export const list = (page, size) => {
    //去调用对应的接口
    //去be/src/routers/invite-code/index.js去看一下接口
    return axios.get('http://localhost:3000/invite/list', {
        params: {
            page,
            size,
        },
    });

};

export const add = (count) => {
    //去调用对应的接口
    //去be/src/routers/invite-code/index.js去看一下接口
    return axios.post('http://localhost:3000/invite/add', {
        count,
    });

};

export const remove = (id) => {
    return axios.delete(`http://localhost:3000/invite/${id}`);
}; */