import axios from 'axios'; //ES6有个默认导出所以不需要加大括号来解构
//axios是一个请求库
export const register = (account, password) => {
    axios.post('http://localhost:3000/auth/register', {
        account,
        password,
    });
};

export const login = () => {

}