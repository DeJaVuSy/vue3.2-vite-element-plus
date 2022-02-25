<template>
    <el-container class="layout">
        <Aside />
        <el-container>
            <Header />
            <div class="app_wrap">
                <!-- <Tabs /> -->
                <el-main>
                    <router-view />
                </el-main>
                <!-- footer -->
                <el-footer>
                    Copyright &copy; 2022
                    制作 ·
                    <el-link href="https://blog.csdn.net/qq_45415736?spm=1001.2101.3001.5343" target="_blank" type="primary" :underline="false"><span>CSDN</span></el-link> ·
                    497401643@qq.com
                </el-footer>
            </div>
            <!-- backtop -->
            <el-backtop target=".app_wrap"></el-backtop>
        </el-container>
    </el-container>
</template>

<script setup>
import Aside from "./Aside.vue";
import Header from "./Header.vue";
import Tabs from "./Tabs.vue";
</script>

<style lang="scss" scoped>
@mixin zdy_scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #e5e5e5 #f7f7f9;
    &::-webkit-scrollbar {
        width: 10px;
        height: 8px;
        background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ddd;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background-color: #409eff;
        border-radius: 10px;
    }
}

.layout {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #fff;
    .el-container {
        height: 100vh;
        overflow: hidden;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;

        .app_wrap {
            flex: 1;
            height: auto;
            background-color: #f3f6f8;
            overflow: hidden;
            overflow-y: auto;
            @include zdy_scrollbar;
            .el-main {
                padding: 16px;
                min-height: calc(100vh - 105px);
                height: auto;
            }

            .el-footer {
                line-height: 48px;
                height: auto;
                font-size: 14px;
                background-color: #bac3c9;
                color: rgba(0, 0, 0, 0.5);
                text-align: center;
                overflow: hidden;
                user-select: none;
            }
        }
    }
}
</style>
