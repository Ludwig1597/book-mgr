import { defineComponent, ref, onMounted } from 'vue';
import { bookClassify } from '@/service';
//请求得到的信息用result去处理
import { result } from '@/helpers/utils'
import { message,Modal,Input} from 'ant-design-vue'
import { Item } from 'ant-design-vue/lib/vc-menu';

const columns = [{
    title: '分类',
    dataIndex: 'title',
}, {
    title: '操作',
    slots: {
        customRender: 'actions',
    },
}]
export default defineComponent({
    setup() {
        const title = ref('');
        const list = ref([]);

        const getList = async() => {
            const res = await bookClassify.list();

            result(res)
                .success(({ data }) => {
                    //.success((data) => {是错误的，要用解构的方式把data拿到
                    list.value = data;
                })
        };

        const add = async() => {
            const res = await bookClassify.add(title.value);

            result(res)
                .success(() => {
                    getList();
                    title.value = '';
                })
        }

        onMounted(() => {
            getList();
        })

        const remove = async({ _id }) => {
            const res = await bookClassify.remove(_id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                    getList();
                })

        }

        const updateTitle = async({ _id }) => {
            Modal.confirm({
                //弹框
                title: '请输入新的分类名称',
                content: (
                    <div>
                        <Input class="__book_classify_new_title"/>
                    </div>
                ),
                onOk:async()=>{
                    const title=document.querySelector('.__book_classify_new_title').value;
                    const res=await bookClassify.updateTitle(_id,title);
                    // console.log(_id);
                    // console.log(title);
                    //console.log(value);

                    result(res)
                        .success(({msg})=>{
                            message.success(msg);
                            getList();//下面的代码可以少发一次请求
                            /* list.value.forEach((item)=>{
                                if(item._id===_id){
                                    item.title===title;
                                }
                            }) */
                        });
                },
            });
        }
        return {
            add,
            list,
            title,
            columns,
            remove,
            updateTitle
        }
    }
})