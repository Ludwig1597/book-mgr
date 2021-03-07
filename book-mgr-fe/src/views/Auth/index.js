import { defineComponent, reactive } from 'vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { auth } from '@/service';



export default defineComponent({
    components: {
        UserOutlined, //注册组件
        LockOutlined,
        MailOutlined,
    },
    setup() {
        const regForm = reactive({
            account: '',
            password: '',
        }); //reactive()相当于一个响应式的数据集合

        const register = () => {
            // console.log(regForm);
            auth.register(regForm.account, regForm.password)
        }

        return {
            regForm,
            register
        }
    }
})