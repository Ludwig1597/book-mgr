import { message } from 'ant-design-vue';
export const result = (response, authShowErrorMsg = true) => {
    const { data } = response;

    if ((data.code === 0) && authShowErrorMsg) {
        message.error(data.msg);
    }

    return {
        //cb是callback回调函数
        success(cb) {
            if (data.code !== 0) {
                cb(data, response);
            }
            return this;
        },
        fail(cb) {
            if (data.code === 0) {
                cb(data, response);
            }
            return this;
        },
        finally(cb) {
            cb(data, response);
            return this;
        },
    };
};
//完成一段深拷贝的方法
export const clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

//格式化时间戳
export const formatTimestamp = (ts) => {
    const date = new Date(Number(ts));

    const YYYY = date.getFullYear();
    const MM = date.getMonth() + 1;
    const DD = date.getDate();

    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();

    return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`;
}