//因为我们的数据都放在store当中，所以我们要将store引进来
import store from '@/store';
import { itemProps } from 'ant-design-vue/lib/vc-menu';

export const isAdmin = () => {
    //当前用户角色的相关信息
    const uc = store.state.userCharacter;
    //console.log(uc);
    //console.log(uc.name);
    return uc.name === 'admin';
    //console.log(uc.name === 'admin');
}

export const getCharacterInfoById = (id) => {
    const { characterInfo } = store.state;

    const one = characterInfo.find((item) => {
        return item._id === id;
    });

    return one || {
        title: '未知角色',
    };

    /* if(one){
        return one;
    }

    return {
        title:'为止角色'
    } */
}