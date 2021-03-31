import { ref, defineComponent, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import menu from '@/config/menu';

export default defineComponent({
    setup() {
        const router = useRouter();
        const route = useRoute();

        const openKeys = ref([]); //控制是否展开
        //const openKeys = ref(['杂项']);
        const selectedKeys = ref([]);

        onMounted(() => {
            //console.log(route);
            selectedKeys.value = [route.path];

            menu.forEach((item) => {
                (item.children || []).forEach((child) => {
                    if (child.url === route.path) {
                        openKeys.value.push(item.title);
                    }
                })
            })
        })
        const to = (url) => {
            router.push(url);
        };

        return {
            openKeys,
            selectedKeys,
            menu,
            to,
        }
    }
})