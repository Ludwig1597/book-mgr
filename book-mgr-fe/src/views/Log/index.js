import { defineComponent, onMounted, ref } from 'vue';
import { log } from '@/service';
import { result, formatTimestamp } from '@/helpers/utils';
import { getLogInfoByPath } from '@/helpers/log';
import { message } from 'ant-design-vue';


export default defineComponent({
    props: {
        simple: Boolean
    },
    setup(props) {
        const curPage = ref(1);
        const total = ref(0);
        const list = ref([]);
        const loading = ref(true);

        const columns = [{
            title: '用户名',
            dataIndex: 'user.account',
            //user.account对应的是db/schema/log.js下的user
        }, {
            title: '操作信息',
            dataIndex: 'action',
        }, {
            title: '记录时间',
            slots: {
                customRender: 'createdAt'
            }
        }, ];

        if (!props.simple) {
            columns.push({
                title: '操作',
                slots: {
                    customRender: 'action'
                }
            })
        }

        const getList = async() => {
            //请求发出前
            loading.value = true;
            //调用一下接口
            const res = await log.list(curPage.value, 20);
            //请求发出后
            loading.value = false;
            result(res)
                .success(({ data: { list: l, total: t } }) => {
                    l.forEach((item) => {
                        item.action = getLogInfoByPath(item.request.url);
                    })
                    list.value = l;
                    total.value = t;
                });
        };

        onMounted(() => {
            getList();
        });

        const setPage = (page) => {
            curPage.value = page;
            getList();
        };
        //要写这个函数，服务端要有对应的接口
        const remove = async({ _id }) => {
            //log.remove()这个remove调用的是前端service下的方法
            const res = await log.remove(_id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                    getList();
                });

        };
        return {
            curPage,
            total,
            list,
            columns,
            setPage,
            loading,
            formatTimestamp,
            remove,
            simple: props.simple,
        };

    }
})