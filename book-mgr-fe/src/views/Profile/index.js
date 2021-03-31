import { defineComponent, reactive } from 'vue';
import { profile } from '@/service';
import { message } from 'ant-design-vue';
import { result } from '@/helpers/utils';

export default defineComponent({
    setup() {
        //用reactive去创建表单数据
        const resetPasswordForm = reactive({
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        });

        //resetPassword是给模板页面index.vue使用写的方法
        const resetPassword = async() => {
            const {
                confirmNewPassword,
                newPassword,
                oldPassword,
            } = resetPasswordForm;
            //先去判断一下
            //if (resetPasswordForm.confirmNewPassword !== resetPasswordForm.newPassword) {
            if (confirmNewPassword !== newPassword) {
                message.error('两次输入密码不一致，请重新输入');
                return;
            }
            // profile.resetPassword/service/profile/index.js下写的调用后端接口的方法
            const res = await profile.resetPassword(
                /* resetPasswordForm.newPassword,
                resetPasswordForm.oldPassword, */
                newPassword,
                oldPassword,
            );

            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                    resetPasswordForm.oldPassword = '';
                    resetPasswordForm.newPassword = '';
                    resetPasswordForm.confirmNewPassword = '';
                })
        }

        return {
            resetPasswordForm,
            resetPassword,
        }
    }
})