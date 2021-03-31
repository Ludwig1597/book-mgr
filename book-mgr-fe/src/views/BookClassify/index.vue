<template>
    <div >
        <a-card title="书籍分类管理">
            <div>
                <a-input 
                    placeholder="输入书籍分类" 
                    style="width:200px"
                    v-model:value="title"
                    :pagination="false"
                ></a-input>
                &nbsp;
                <a-button @click="add" type="primary">添加</a-button>
            </div>
            <a-divider />

            <div>
                <a-table
                    bordered
                    :data-source="list"
                    :columns="columns"
                >
                    <template #actions="{record}">
                        <a-button 
                            size="small" 
                            @click="updateTitle(record)"
                            type="primary"
                        >修改</a-button>
                        &nbsp;
                        <a-button 
                            size="small" 
                            @click="remove(record)"
                            type="danger"
                        >删除</a-button>
                    </template>
                </a-table>
            </div>
        </a-card>
    </div>
</template>

<script src="./index.jsx"></script>