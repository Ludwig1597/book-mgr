import { defineComponent, ref, onMounted, } from 'vue'; //ref响应式变量标记显示隐藏
import { book } from '@/service';
import { message, Modal,Input } from 'ant-design-vue';
import { result, formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';
import { list } from '../../service/book';
import { itemProps } from 'ant-design-vue/lib/vc-menu';

export default defineComponent({
    //通过components这个配置项去注册
    components: {
        AddOne,
        Update,
    },
    setup() {
        // columns是一个数组，它每一项就代表每一列的配置项
        const columns = [{
                title: '书名',
                dataIndex: 'name',
            }, {
                title: '作者',
                dataIndex: 'author',
            },
            {
                title: '价格',
                dataIndex: 'price',
            },
            {
                title: '库存',
                slots: {
                    customRender: 'count',
                }
            },
            {
                title: '出版日期',
                dataIndex: 'publishDate',
                slots: {
                    customRender: 'publishDate',
                }
            },
            {
                title: '分类',
                dataIndex: 'classify',
            },
            {
                title: '操作',
                slots: {
                    customRender: 'actions',
                }
            },

        ];


        const show = ref(false);
        const showUpdateModal=ref(false);
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1); //默认当前在第一页
        const keyword = ref(''); //ref是一个响应式的数据
        const isSearch = ref(false);
        const curEditBook=ref({});
        //获取书籍列表
        const getList = async() => {
                //调用接口
                const res = await book.list({
                    page: curPage.value,
                    size: 10,
                    keyword: keyword.value,
                });

                result(res)
                    .success(({ data }) => {
                        const { list: l, total: t } = data;
                        list.value = l;
                        total.value = t;
                        //这样表格的数据就被赋值好了
                    });
            }
            //当组件被挂载完会做什么事情
        onMounted(async() => {
            getList();
        });
        //设置页码
        //切页
        const setPage = (page) => {
                curPage.value = page;

                getList();
            }
            //触发搜索
        const onSearch = () => {
            getList();
            //isSearch.value = true;
            // 字符串非空的时候 --> true
            // 字符串为空的时候 --> false
            //这里是一个隐式转换
            isSearch.value = keyword.value;
        };
        //回到全部列表
        const backAll = () => {
            keyword.value = '';
            isSearch.value = false;

            getList();
        };
        //删除一本书籍
        const remove = async({ text: record }) => {
                //console.log(record);
                const { _id } = record;

                const res = await book.remove(_id); //在service下写好的前端接口调用一下

                result(res) //通过我们写的result函数处理一下res
                    .success(({ msg }) => {
                        message.success(msg); //删除成功弹窗
                        //这个message是ant-design的message要import进来
                        /* const idx = list.value.findIndex((item) => {
                            //去本地的书籍的列表里找，找刚刚删除的id的那本书，找到它的位置，把对应位置的删除掉就好了
                            return item._id === _id;
                            /* if (item._id === _id) {
                                return true;
                            }
                            return false; 
                        });//但这种方法不会做页面刷新*/
                        //list.value.splice(idx, 1);  //从idx项开始删，删除1个
                        getList(); //删除成功后拿一下新的列表
                    })

            } //js里的事件写好了，就要去前端页面绑定事件，

        const updateCount = (type,record) => {
            let word="增加";
            if(type==='OUT_COUNT'){
                word="减少";
            }
            Modal.confirm({
                //确认弹框
                title: `要${word}多少库存`,
                content: (
                    <div>
                        <Input class="__book_input_count"/>
                    </div>
                ),
                onOk:async()=>{
                    const el=document.querySelector('.__book_input_count');
                    //取到的数据就是el.value
                    let num=el.value;
                    const res=await book.updateCount({
                        id:record._id,
                        //num:el.value,
                        num,
                        type,
                    });
                    //console.log(el.value);
                    result(res)
                        .success((data)=>{
                            let num=el.value;
                            if (type === 'IN_COUNT') {
                                //入库操作
                                num = Math.abs(num);
                            } else {
                                //出库操作
                                num = -Math.abs(num);
                            }
                            const one = list.value.find((item)=>{
                                return item._id===record._id;
                            });
                            if(one){
                                one.count=one.count+num;
                                message.success(`成功${word}${Math.abs(num)}本书`)
                            }
                        })
                    //getList();
                },
                /* createVNode('div', {
                    id: 'abcd',
                    innerHTML: '<a>abcd</a>',
                }), */ //virtual Node 虚拟dom节点
            })
        }
        const update=({record})=>{
            showUpdateModal.value=true;
            curEditBook.value=record;
        }
        const updateCurBook=(newData)=>{
            Object.assign(curEditBook.value,newData);
        }
        return {
            columns,
            show,
            list,
            formatTimestamp,
            curPage,
            total,
            setPage,
            keyword,
            onSearch,
            backAll,
            isSearch,
            remove,
            updateCount,
            showUpdateModal,
            update,
            curEditBook,
            updateCurBook,
        };
    },
});