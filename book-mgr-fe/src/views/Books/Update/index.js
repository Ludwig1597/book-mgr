import { defineComponent, getCurrentInstance, reactive, watch } from 'vue';
import { book } from '@/service'; //然后就可以调用book下的add方法
import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';
import moment from 'moment';

export default defineComponent({
    props: {
        show: Boolean,
        book: Object,
    },
    setup(props, context) {
        const editForm = reactive({
            name: '',
            price: '',
            author: '',
            publishDate: 0,
            classify: '',
            count: '',
        })

        const close = () => {
            context.emit('update:show', false);
        };

        watch(() => props.book, (current) => {
            Object.assign(editForm, current);
            editForm.publishDate = moment(Number(editForm.publishDate));
        });
        //防止它报错
        const submit = async() => {
            const res = await book.update({
                id: props.book._id,
                //...editForm, //扩展运算符
                name: editForm.name,
                price: editForm.price,
                author: editForm.author,
                publishDate: editForm.publishDate.valueOf(),
                classify: editForm.classify,
                //publishDate: editForm.publishDate.valueOf(), //覆盖上面拓展出来的
            });
            result(res)
                .success(({ data, msg }) => {
                    context.emit('update', data); //第一个是index.vue中@update名字
                    //Object.assign(props.book, data);
                    message.success(msg);
                    close(); //成功后关闭窗口

                });
        };
        return {
            editForm,
            submit,
            props,
            close,
        }
    },
});