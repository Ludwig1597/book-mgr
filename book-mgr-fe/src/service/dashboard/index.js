import {
    get,
} from '@/helpers/request';

export const baseInfo = () => {
    return get('/dashboard/base-info');
}

/* import axios from 'axios';

export const baseInfo = () => {
    //对应的接口，即是be/router
    return axios.get('http://localhost:3000/dashboard/base-info');
} */