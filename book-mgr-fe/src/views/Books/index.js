import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        // columns是一个数组，它每一项就代表每一列的配置项
        const columns = [{
            title: '名字',
            dataIndex: 'name',
        }, {
            title: '年龄',
            dataIndex: 'age',
        }, ];
        // dataSourse是我们的原始数据，就表格每一行的数据，它每一项就代表表格的一行
        const dataSource = [{
            name: '小红',
            age: 2,
        }];
        return {
            columns,
            dataSource,
        }
    }
});