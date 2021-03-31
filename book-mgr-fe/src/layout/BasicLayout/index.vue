<template>
<!-- 基础模板写好要去router里面配一下路由 -->
    <div class="basic-layout">
        <div class="app-header">
            <div class="left">
               <img src="../../../images/logo.png" alt=""> 
               <div class="title">图书管理系统</div>
            </div>
            <div class="right">
                <div class="hello-msg">你好，{{store.userInfo.account}}</div>
                <div class="logout" @click="logout">退出</div>
            </div>
        </div>
        <!-- 占位用 -->
        <div class="app-header-placeholder"></div>
        <div class="app-content">
            <div class="left">
                <app-nav />
            </div>
            <div class="right">
                <!-- 根据页面这里内容会变，所以应该是一个路由容器 -->
                <!-- 所以用router-view这个标签，根据路由把东西渲染到这里 -->
                <router-view />
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>  

<style lang="scss" scoped>
    @import './index.scss';
</style>