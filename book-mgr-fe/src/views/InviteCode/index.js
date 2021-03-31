import { defineComponent, ref, onMounted } from 'vue';
import { InviteCode } from '@/service';
import { result } from '@/helpers/utils';
import {get } from '../../../../book-mgr-be/src/routers/invite-code';
import { message } from 'ant-design-vue';
const columns = [{
    title: '邀请码',
    dataIndex: 'code', //dataIndex对应的时db/schema/invitecode下的内容
}, {
    title: '使用状态',
    slots: {
        customRender: 'status',
    },
}, {
    title: '操作',
    slots: {
        customRender: 'actions',
    },
}, ];

export default defineComponent({

    setup() {
        const count = ref(1);
        const curPage = ref(1);
        const list = ref([]);
        const total = ref(0);

        const getList = async() => {
            //getList()这个方法就是去调用一下接口（方法）
            const res = await InviteCode.list(curPage.value, 20);

            result(res)
                .success(({ data: { list: l, total: t } }) => {
                    list.value = l;
                    total.value = t;
                }); //去服务端做些调整be/src/routers/invite-code/index.js
        };

        onMounted(() => {
            getList(); //组件被挂载时调用一下，这样数据就能拿到了
        })

        const setPage = (page) => {
            curPage.value = page;
            getList();
        };

        const add = async() => {
            //add方法做的事情就是调用一下add接口，
            //去fe/src/service/invite-code/index.js新加一个add方法
            const res = await InviteCode.add(count.value);

            result(res)
                .success(() => {
                    message.success(`成功添加${count.value}条邀请码`)
                    getList();
                })
        }

        const remove = async({ _id }) => {
            const res = await InviteCode.remove(_id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg);

                    getList();
                })
        };
        return {
            count,

            list,
            total,
            columns,
            curPage,
            setPage,
            add,
            remove,
        };
    }
})