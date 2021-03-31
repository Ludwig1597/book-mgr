import { defineComponent, reactive } from 'vue';
import { user } from '@/service'; //然后就可以调用book下的add方法
import { message } from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';
import store from '@/store';

const defaultFormData = {
    account: '',
    password: '',
    character: '',
}
export default defineComponent({
    props: {
        show: Boolean,
    },
    setup(props, context) {
        //console.log(props);
        const { characterInfo } = store.state;
        const addForm = reactive(clone(defaultFormData));

        addForm.character = characterInfo[1]._id;
        const close = () => {
            context.emit('update:show', false);
        };

        const submit = async() => {

            const form = clone(addForm);

            const res = await user.add(form.account, form.password, form.character);

            result(res)
                .success((d, { data }) => {
                    Object.assign(addForm, defaultFormData);
                    message.success(data.msg); //这个msg是服务端响应的
                    close();

                    context.emit('getList');
                }); //这样就达到了一个清空表单的效果

        };

        /* const close = () => {
            context.emit('setShow', false);
        }; */


        return {
            addForm,
            submit,
            props,
            close,
            characterInfo,
        }
    },
});