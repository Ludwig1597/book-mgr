import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { result, formatTimestamp } from '@/helpers/utils';
import { book, inventoryLog } from '@/service';
import { SHOW_CHILD } from 'ant-design-vue/lib/vc-tree-select';
import { CheckOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import Update from '@/views/Books/Update/index.vue';
import { RowSelectionType } from 'ant-design-vue/lib/table/interface';

const columns = [{
        title: '数量',
        dataIndex: 'num'
    },
    {
        title: '操作时间',
        slots: {
            customRender: 'createdAt'
        }
    }
];
export default defineComponent({
    components: {
        Update,
        CheckOutlined
    }, //注册完之后我们就可以去index.vue中使用了
    setup() {
        const route = useRoute();
        const router = useRouter();
        //const id = route.params.id;
        //用解构的方式把它取到
        const { id } = route.params;
        const detailInfo = ref({});
        const log = ref([]);
        const showUpdateModal = ref(false);
        const logTotal = ref(0);
        const logCurPage = ref(1);
        const curLogType = ref('IN_COUNT');
        //获取书籍详细信息
        const getDetail = async() => {
            const res = await book.detail(id);
            //import进来result方法就可以去处理响应的数据了
            result(res)
                .success(({ data }) => {
                    detailInfo.value = data;

                })
        }

        //获取出入库日志
        const getInventoryLog = async() => {
            const res = await inventoryLog.list(
                curLogType.value,
                logCurPage.value,
                10
            );

            result(res)
                .success(({ data: { list, total } }) => {
                    log.value = list;
                    logTotal.value = total;
                })
        };

        //当组件被挂载时就会执行这里的回调函数
        onMounted(() => {
            getDetail();
            getInventoryLog();
        });
        //删除操作
        const remove = async() => {
                const res = await book.remove(id); //id是之前从route.params中解构得到的

                result(res)
                    .success(({ msg }) => {
                        message.success(msg);
                        router.replace('/books');
                    })
            }
            //修改书籍的一个方法
        const update = (book) => {
                Object.assign(detailInfo.value, book)
            }
            // 日志分页切换的时候
        const setLogPage = (page) => {
                logCurPage.value = page;

                getInventoryLog();
            }
            //筛选日志
        const logFilter = (type) => {
            curLogType.value = type;

            getInventoryLog();
        }
        return {
            d: detailInfo,
            formatTimestamp,
            remove,
            showUpdateModal,
            update,
            log,
            logTotal,
            setLogPage,
            columns,
            logFilter,
            curLogType,
            logCurPage,
        }; //formatTimestamp先import到js中，然后返回给模板，模板即index.vue,模板就可以使用这个方法
    }
});