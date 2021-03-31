import {
    get,
} from '@/helpers/request';

export const list = () => {
    return get('/character/list');
};

/* import axios from 'axios';

export const list = () => {
    return axios.get('http://localhost:3000/character/list');
}; */