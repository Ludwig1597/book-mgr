import { defineComponent, ref, onMounted } from 'vue';
//把写好的前端接口（调用后端接口的方法）引进来
import { resetPassword } from '@/service';
import { result } from '@/helpers/utils';
import { message } from 'ant-design-vue';

const columns = [{
        title: '账户',
        dataIndex: 'account',
    },
    {
        title: '操作',
        slots: {
            customRender: 'actions',
        }
    },
];

export default defineComponent({
    setup() {
        //list存放整个列表的数据，它是一个数组
        const list = ref([]);
        //分页目前页为1
        const curPage = ref(1);
        //数据总数目前为零
        const total = ref(0);

        //我们要写一个方法去获取数据
        //getList()要做的事情就是调用获取数据的接口
        //这个接口在fe/src/service/==reset-password==/*index.js*
        const getList = async() => {
            const res = await resetPassword.list(curPage.value, 3);

            result(res)
                .success(({ data: { list: l, total: t } }) => {
                    list.value = l;
                    total.value = t;
                });
        };

        onMounted(() => {
            getList();
        });

        const changeStatus = async({ _id }, status) => {
            //调用一下service下写的前端接口
            const res = await resetPassword.updateStatus(_id, status);
            console.log(res);
            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                    getList();
                });
        };

        const setPage = (page) => {
            curPage.value = page;
            getList();
        }
        return {
            total,
            list,
            columns,
            curPage,

            changeStatus,
            setPage,
        }
    },
})