//调用接口的方法我们都会在这里写上
import {
    del,
    post,
    get,
} from '@/helpers/request';

export const add = (title) => {
    return post('/book-classify/add', {
        title,
    });
}

export const list = () => {
    return get('/book-classify/list');
}

export const remove = (id) => {
    return del(`/book-classify/${id}`);
}

export const updateTitle = (id, title) => {
        return post('/book-classify/update/title', {
            id,
            title,
        });
    } //这里曾经写错了参数忘记传了
    /* //调用接口的方法我们都会在这里写上
    import axios from 'axios';

    export const add = (title) => {
        return axios.post('http://localhost:3000/book-classify/add', {
            title,
        });
    }

    export const list = () => {
        return axios.get('http://localhost:3000/book-classify/list');
    }

    export const remove = (id) => {
        return axios.delete(`http://localhost:3000/book-classify/${id}`);
    }

    export const updateTitle = (id, title) => {
            return axios.post('http://localhost:3000/book-classify/update/title', {
                id,
                title,
            });
        } //这里曾经写错了参数忘记传了 */