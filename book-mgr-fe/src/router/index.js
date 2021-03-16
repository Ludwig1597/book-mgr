import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [{
        path: '/auth',
        name: 'Auth',
        component: () =>
            import ( /* webpackChunkName:"auth" */ '../views/Auth/index.vue'),
    },
    {
        path: '/',
        name: 'BasicLayout',
        component: () =>
            import ( /* webpackChunkName:"BasicLayout" */ '../layout/BasicLayout/index.vue'),
        //子路由，在children里，是数组，格式和上面一样
        children: [{
            path: '/books',
            name: 'Books',
            component: () =>
                import ( /* webpackChunkName:"Books" */ '../views/Books/index.vue')
        }, ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;