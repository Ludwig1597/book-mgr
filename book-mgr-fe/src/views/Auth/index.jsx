import { defineComponent, reactive } from 'vue';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { auth,resetPassword } from '@/service';
import { result } from '@/helpers/utils';
import { getCharacterInfoById } from '@/helpers/character';
import { message,Modal,Input } from 'ant-design-vue';
import store from '@/store';
import { useRouter } from 'vue-router';
import { setToken } from '@/helpers/token';

export default defineComponent({
    components: {
        UserOutlined, //注册组件
        LockOutlined,
        MailOutlined,
    },
    setup() {
        const router = useRouter();
        //注册用的表单数据
        const regForm = reactive({
            account: '',
            password: '',
            inviteCode: '',
        }); //reactive()相当于一个响应式的数据集合

        const forgetPassword=()=>{
            Modal.confirm({
                //确认弹框
                title: `输入账号发起申请，管理员会审核`,
                content: (
                    <div>
                        <Input class="__forget_password_account"/>
                    </div>
                ),
                onOk:async()=>{
                    const el=document.querySelector('.__forget_password_account');
                    //取到的数据就是el.value
                    let account=el.value;

                    //console.log(account);
                    const res=await resetPassword.add(
                        account
                    );

                    result(res)
                        .success(({msg})=>{
                            message.success(msg);
                        });
                },
            })
        }

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
                .success(async({ msg, data: { user, token } }) => {
                    message.success(msg);
                    
                    setToken(token);

                    await store.dispatch('getCharacterInfo');

                    store.commit('setUserInfo', user);
                    store.commit('setUserCharacter', getCharacterInfoById(user.character));

                    

                    //和router.push()的主要区别是不可以通过回退回到上个页面
                    router.replace('/books')
                        //console.log(store.state);
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

            forgetPassword,
        }
    }
})