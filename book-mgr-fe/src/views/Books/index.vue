<template>
    <div>
        <!-- ant-design的一个组件 -->
        <a-card
            :title="simple?'最近添加的货物':''"
        >
            <div v-if="!simple">
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

                <div>
                    <a-button 
                        v-only-admin 
                        @click="show=true"
                    >添加一条</a-button>
                    
                    &nbsp;

                    <a-upload
                        @change="onUploadChange"    
                        action="http://localhost:3000/upload/file"
                        :headers="headers"
                    >
                        <a-button type="primary">上传 Excel 添加</a-button>
                    </a-upload>
                </div>

                
                </space-between>

                <a-divider />
            </div>
            
            <!-- columns是每个表格的配置项 -->
            <a-table 
                :columns="columns" 
                :data-source="list"
                :pagination="false"
                bordered
                :scroll="{x:'max-content'}"
            >
                <template #publishDate="data">
                    {{formatTimestamp(data.record.publishDate)}}
                </template>

                <template #classify="{record}">
                    {{getClassifyTitleById(record.classify)}}
                </template>

                <template #count="data">
                    <a href="JavaScript:;" v-if="!simple" @click="updateCount('IN_COUNT',data.record)">入库</a>
                    {{data.record.count}}
                    <a href="JavaScript:;" v-if="!simple" @click="updateCount('OUT_COUNT',data.record)">出库</a>
                </template>

                <template #actions="record" v-if="!simple">
                    <a href="javascript:;" @click="toDetail(record)">详情</a>
                    &nbsp;
                    <a v-only-admin href="javascript:;" @click="update(record)">编辑</a>
                    &nbsp;
                    <a v-only-admin href="javascript:;" @click="remove(record)">删除</a>
                </template>
            </a-table>
            <!-- 在这里放置一个分页组件 -->
            <flex-end v-if="!simple" style="margin-top:24px">
                <a-pagination 
                    v-model:current="curPage" 
                    :total="total"
                    :page-size="10"
                    @change="setPage"
                />
            </flex-end>
            
        </a-card>
        <add-one 
            v-model:show="show"
            :classifyList="bookClassifyList"
            @getList="getList"
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