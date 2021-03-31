import { defineComponent, reactive, withCtx } from 'vue';
import { book } from '@/service'; //然后就可以调用book下的add方法
import { message } from 'ant-design-vue';
import store from '@/store';
import { result, clone } from '@/helpers/utils';

const defaultFormData = {
    name: '',
    price: '',
    author: '',
    publishDate: 0,
    classify: '',
    count: '',
}
export default defineComponent({
    props: {
        show: Boolean,
        //classifyList: Array, //来自index.vue的addone标签属性
        //在store里写好了
    },
    setup(props, context) {
        //console.log(props);
        const addForm = reactive(clone(defaultFormData));

        if (store.state.bookClassify.length) {
            addForm.classify = store.state.bookClassify[0]._id;
        }

        //这样我们就去调用了一下add接口，同时把我们的数据传递了过去
        const submit = async() => {
            //去把表单复制一份（深拷贝）,将data写成时间戳
            //const form = JSON.parse(JSON.stringify(addForm));
            const form = clone(addForm);
            form.publishDate = addForm.publishDate.valueOf();
            //通过book.add()发请求把数据发过去
            const res = await book.add(form);

            result(res)
                .success((d, { data }) => {
                    Object.assign(addForm, defaultFormData);
                    message.success(data.msg); //这个msg是服务端响应的
                    context.emit('getList');
                }); //这样就达到了一个清空表单的效果

        };

        /* const close = () => {
            context.emit('setShow', false);
        }; */
        const close = () => {
            context.emit('update:show', false);
        };

        return {
            addForm,
            submit,
            props,
            close,
            store: store.state,
        }
    },
});