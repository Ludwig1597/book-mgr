import { defineComponent, ref, onMounted, reactive } from 'vue';
import { user } from '@/service';
import { result, formatTimestamp } from '@/helpers/utils';
import { message } from 'ant-design-vue';
import { EditOutlined } from '@ant-design/icons-vue';
import AddOne from './AddOne/index.vue'; //要加index.vue否则会引用index.js
import { getHeaders } from '@/helpers/request';
import { getCharacterInfoById } from '@/helpers/character';
import store from '@/store';

const columns = [{
        title: '账户',
        dataIndex: 'account', //dataIndex表示从哪一行的哪一个属性去取值
    },
    {
        title: '创建日期',
        slots: {
            customRender: 'createdAt',
        },
    },
    {
        title: '角色',
        slots: {
            customRender: 'character',
        },
    },
    {
        title: '操作',
        slots: {
            customRender: 'actions',
        },
    },
]
export default defineComponent({
    components: {
        AddOne,
        EditOutlined,
    },
    setup() {
        const list = ref([]);
        const total = ref(0);
        const curPage = ref(1);
        const showAddModal = ref(false);
        const keyword = ref('');
        const isSearch = ref(false);
        const showEditCharacterModal = ref(false);
        const editForm = reactive({
            character: '',
            current: {},
        })

        const getUser = async() => {
            const res = await user.list(curPage.value, 10, keyword.value);

            result(res)
                .success(({ data: { list: refList, total: resTotal } }) => {
                    list.value = refList;
                    total.value = resTotal;
                });
        };

        onMounted(() => {
            getUser();
        });

        const remove = async({ _id }) => {
            const res = await user.remove(_id);

            result(res)
                .success(({ msg }) => {
                    message.success(msg); //msg是服务端返回的数据
                    getUser();
                })
        }

        const setPage = (page) => {
            curPage.value = page;
            getUser();
        }

        const resetPassword = async({ _id }) => {
            const res = await user.resetPassword(_id);
            //console.log(res);
            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                });
        };

        const onSearch = () => {
            //重新调用一下接口
            getUser();
            isSearch.value = !!keyword.value;
        };

        const backAll = () => {
            isSearch.value = false;
            keyword.value = '';
            getUser();
        };

        const onEdit = (record) => {
            editForm.current = record;
            editForm.character = record.character;
            showEditCharacterModal.value = true;
        };

        const updateCharacter = async() => {
            const res = await user.editCharacter(editForm.character, editForm.current._id);
            result(res)
                .success(({ msg }) => {
                    message.success(msg);
                    //关掉弹框
                    showEditCharacterModal.value = false;
                    editForm.current.character = editForm.character;
                });
        }

        const onUploadChange = ({ file }) => {
            //console.log(e);
            if (file.response) {
                result(file.response)
                    //.success(async({ data: key }) => {
                    .success(async(key) => {
                        //console.log(file.response, key);
                        const res = await user.addMany(key);

                        result(res)
                            .success(({ data: { addCount } }) => {
                                message.success(`成功添加${addCount}位用户`)

                                getUser();
                            })
                    });
            }
        }
        return {
            list,
            total,
            curPage,
            columns,
            formatTimestamp,
            remove,
            showAddModal,
            getUser,
            setPage,
            resetPassword,
            isSearch,
            keyword,
            backAll,
            onSearch,
            onEdit,
            updateCharacter,

            getCharacterInfoById,
            showEditCharacterModal,
            editForm,
            characterInfo: store.state.characterInfo,

            onUploadChange,
            headers: getHeaders(),
        };
    },
})