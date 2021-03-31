import { createStore, Store } from 'vuex';
import { character, user, bookClassify } from '@/service';
import { getCharacterInfoById } from '@/helpers/character';
import { result } from '@/helpers/utils';

export default createStore({
    state: {
        characterInfo: {},
        bookClassify: [],
        userInfo: {},
        userCharacter: {},
    }, //state是放数据的地方
    mutations: {
        setCharacterInfo(state, characterInfo) {
            state.characterInfo = characterInfo;
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        setUserCharacter(state, userCharacter) {
            state.userCharacter = userCharacter;
        },
        setBookClassify(state, bookClassify) {
            state.bookClassify = bookClassify;
        }
    }, //是设置调用数据的方法
    actions: {
        //store小写==错误
        async getBookClassify(store) {
            const res = await bookClassify.list();
            result(res)
                .success(({ data }) => {
                    store.commit('setBookClassify', data);
                })
        },
        async getCharacterInfo(store) {
            const res = await character.list();

            result(res)
                .success(({ data }) => {
                    store.commit('setCharacterInfo', data);
                });
        },
        async getUserInfo(store) {
            const res = await user.info();

            result(res)
                .success(({ data }) => {
                    store.commit('setUserInfo', data);

                    store.commit('setUserCharacter', getCharacterInfoById(data.character));

                    console.log(store.state);
                })
        }
    },
});