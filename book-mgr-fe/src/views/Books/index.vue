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
                    <a-input-search 
                        placeholder="根据书名搜索" 
                        enter-button 
                        v-model:value="keyword"
                        @search="onSearch"
                    />
                    <a v-if="isSearch" href="javascript:;" @click="backAll">返回</a>
                </div>

                <a-button @click="show=true">添加一条</a-button>
            </space-between>

            <a-divider />
            <!-- columns是每个表格的配置项 -->
            <a-table 
                :columns="columns" 
                :data-source="list"
                :pagination="false"
            >
                <template #publishDate="data">
                    {{formatTimestamp(data.record.publishDate)}}
                </template>

                <template #count="data">
                    <a href="JavaScript:;" @click="updateCount('IN_COUNT',data.record)">入库</a>
                    {{data.record.count}}
                    <a href="JavaScript:;" @click="updateCount('OUT_COUNT',data.record)">出库</a>
                </template>

                <template #actions="record">
                    <a href="javascript:;" @click="update(record)">编辑</a>
                    &nbsp;
                    <a href="javascript:;" @click="remove(record)">删除</a>
                </template>
            </a-table>
            <!-- 在这里放置一个分页组件 -->
            <space-between style="margin-top:24px">
                <div />
                <a-pagination 
                    v-model:current="curPage" 
                    :total="total"
                    :page-size="10"
                    @change="setPage"
                />
            </space-between>
            
        </a-card>
        <add-one 
            v-model:show="show"
        />
        <update 
            v-model:show="showUpdateModal"
            :book="curEditBook"
            @update="updateCurBook"
        />
    </div>
</template>

<script src="./index.jsx"></script>

<style lang="scss" scoped>
// 加上scoped属性是为了解决全局相同类命名污染的问题
    @import './index.scss';
</style>