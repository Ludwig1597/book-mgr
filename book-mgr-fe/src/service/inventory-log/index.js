import {
    get,
} from '@/helpers/request';

export const list = (type = 'IN_COUNT', page = 1, size = 20) => {
    return get('/inventory-log/list', {
        type,
        page,
        size,
    });
};
/* import axios from 'axios';

export const list = (type = 'IN_COUNT', page = 1, size = 20) => {
    return axios.get('http://localhost:3000/inventory-log/list', {
        params: {
            type,
            page,
            size,
        }
    });
}; */