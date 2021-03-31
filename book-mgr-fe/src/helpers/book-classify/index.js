//我们要从store里面去取对应的数据
import store from '@/store';

export const getClassifyTitleById = (id) => {
    const one = store.state.bookClassify.find((item) => (item._id === id));

    return one && one.title || '未知分类'
        /* if (one) {
            return one.title;
        }

        return '未知分类' */
}