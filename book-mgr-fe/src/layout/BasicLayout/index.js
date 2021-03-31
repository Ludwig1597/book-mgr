import { defineComponent } from 'vue';
import { setToken } from '@/helpers/token';
//这个包是为了编辑的时候有代码提示
import Nav from './Nav/index.vue'; //因为默认引入的使index.js
import store from '@/store';
export default defineComponent({
    components: {
        AppNav: Nav, //然后我们就可以在index.vue中使用<app-nav />
    },
    setup() {
        const logout = () => {
            setToken('');

            window.location.href = '/';
        };

        return {
            logout,
            store: store.state,
        };
    },
});