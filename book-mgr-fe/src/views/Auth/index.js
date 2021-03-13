import { defineComponent, reactive } from 'vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { auth } from '@/service';
import { result } from '@/helpers/utils';
import { message } from 'ant-design-vue';


export default defineComponent({
    components: {
        UserOutlined, //注册组件
        LockOutlined,
        MailOutlined,
    },
    setup() {
        //注册用的表单数据
        const regForm = reactive({
            account: '',
            password: '',
            inviteCode: '',
        }); //reactive()相当于一个响应式的数据集合

        //注册逻辑
        const register = async() => {
            // console.log(regForm);
            if (regForm.account === '') {
                message.info('请输入账户');
                return;
            }
            if (regForm.password === '') {
                message.info('请输入密码');
                return;
            }
            if (regForm.inviteCode === '') {
                message.info('请输入邀请码');
                return;
            }
            //res是响应的缩写，response
            const res = await auth.register(
                regForm.account,
                regForm.password,
                regForm.inviteCode
            )
            result(res).success((data) => {
                message.success(data.msg);
            });
            /* if (data.code) {
                message.success(data.msg);
                return;
            }
            message.error(data.msg); */
        }

        //登入用的表单数据
        const loginForm = reactive({
            account: '',
            password: '',
        });

        //登入逻辑
        const login = async() => {
            // if (loginForm.account === '') {
            //     message.info('请输入账户');
            //     return;
            // }
            // if (loginForm.password === '') {
            //     message.info('请输入密码');
            //     return;
            // }
            const res = await auth.login(loginForm.account, loginForm.password)
            result(res)
                .success((data) => {
                    message.success(data.msg)
                })
                /* if (data.code) {
                    message.success(data.msg);
                    return;
                }
                message.error(data.msg); */
        }

        return {
            //注册相关的数据
            regForm,
            register,

            //登入相关的数据
            login,
            loginForm,
        }
    }
})