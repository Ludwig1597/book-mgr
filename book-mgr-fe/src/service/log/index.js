import {
    post,
    get,
} from '@/helpers/request';

export const list = (page, size) => {
    return get('/log/list', {

        page,
        size,

    });
};

export const remove = (id) => {
    return post('/log/delete', {
        id,
    });
};
/* //通过axios去发送get请求
import axios from 'axios';

export const list = (page, size) => {
    return axios.get('http://localhost:3000/log/list', {
        params: {
            page,
            size,
        }
    });
};

export const remove = (id) => {
    return axios.post('http://localhost:3000/log/delete', {
        id,
    });
}; */