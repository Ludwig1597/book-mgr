<template>
    <div>
        <!-- ant-design的一个组件 -->
        <a-card>
            <h2>图书列表</h2>
            <!-- divide line -->
            <a-divider />
            <!-- ant-design的搜索框组件 -->
            <space-between>
                <div class="search">
                    <a-input-search placeholder="根据书名搜索" enter-button />
                </div>

                <a-button>添加一条</a-button>
            </space-between>

            <a-divider />
            <!-- columns是每个表格的配置项 -->
            <a-table :columns="columns" :data-source="dataSource">
                
            </a-table>
        </a-card>
    </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
// 加上scoped属性是为了解决全局相同类命名污染的问题
    @import './index.scss';
</style>