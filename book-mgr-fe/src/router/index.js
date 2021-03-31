import { createRouter, createWebHashHistory } from 'vue-router';
import { user } from '@/service';
import store from '@/store';
import { message } from 'ant-design-vue';

//import { character } from '@/service';


const routes = [{
        path: '/auth',
        name: 'Auth',
        component: () =>
            import ( /* webpackChunkName:"auth" */ '../views/Auth/index.vue'),
    },
    {
        path: '/',
        name: 'BasicLayout',
        redirect: '/auth',
        component: () =>
            import ( /* webpackChunkName:"BasicLayout" */ '../layout/BasicLayout/index.vue'),
        //子路由，在children里，是数组，格式和上面一样
        children: [{
                path: 'books',
                name: 'Books',
                component: () =>
                    import ( /* webpackChunkName:"Books" */ '../views/Books/index.vue')
            },
            {
                path: 'books/:id',
                name: 'BookDetail',
                component: () =>
                    import ( /* webpackChunkName:"BookDetail" */ '../views/BookDetail/index.vue')
            },
            {
                path: 'user',
                name: 'User',
                component: () =>
                    import ( /* webpackChunkName:"User" */ '../views/Users/index.vue')
            },
            {
                path: 'log',
                name: 'Log',
                component: () =>
                    import ( /* webpackChunkName:"Log" */ '../views/Log/index.vue')
            },
            {
                path: 'reset/password',
                name: 'ResetPassword',
                component: () =>
                    import ( /* webpackChunkName:"ResetPassword" */ '../views/ResetPassword/index.vue')
            },
            {
                path: 'invite-code',
                name: 'InviteCode',
                component: () =>
                    import ( /* webpackChunkName:"InviteCode" */ '../views/InviteCode/index.vue')
            },
            {
                path: 'book-classify',
                name: 'BookClassify',
                component: () =>
                    import ( /* webpackChunkName:"BookClassify" */ '../views/BookClassify/index.vue')
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () =>
                    import ( /* webpackChunkName:"Profile" */ '../views/Profile/index.vue')
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () =>
                    import ( /* webpackChunkName:"Dashboard" */ '../views/Dashboard/index.vue')
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(async(to, from, next) => {
    /* 
    to 表示我要去哪个页面，信息就放在里面
    from 表示我从哪个页面来的，信息就放在里面
    next() 表示我可以进入下一页了，就调用一下这个方法
    */
    //const reqArr = [];
    let res = {};

    try {
        res = await user.info();
    } catch (e) {
        if (e.message.includes('code 401')) {
            res.code = 401;
        }
        //console.log(e.message);
    }

    const { code } = res;

    if (code === 401) {
        if (to.path === '/auth') {
            next();
            return;
        }

        message.error('认证失败，请重新登入');
        next('/auth');

        return;
    }


    if (!store.state.characterInfo.length) {
        //调用dispatch触发actions
        await store.dispatch('getCharacterInfo');
        /* const res = await character.list();
        window.characterInfo = res.data; */
    }

    const reqArr = [];

    if (!store.state.userInfo.account) {
        reqArr.push(store.dispatch('getUserInfo'));
    }

    if (!store.state.bookClassify.length) {
        reqArr.push(store.dispatch('getBookClassify'));
    }
    /* if (!store.state.userInfo.account) {
        await store.dispatch('getUserInfo');
    }

    if (!store.state.userInfo.account.length) {
        await store.dispatch('getBookClassify');
    } */


    await Promise.all(reqArr); //这两个请求就会同时被发出

    if (to.path === '/auth') {
        next('/books');
        return;
    }

    next();

    //console.log(res);
    //console.log(to, from);

});
export default router;