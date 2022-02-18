<template>
  <el-radio-group v-model="isCollapse">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>
  </el-radio-group>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    :default-openeds="['1', '2']"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @select="handleSelect"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><HomeFilled /></el-icon>
        <span>主页</span>
      </template>
      <el-menu-item index="1-1">了解项目</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><Setting /></el-icon>
        <span>系统管理</span>
      </template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><VideoCamera /></el-icon>
        <span>系统监控</span>
      </template>
      <el-menu-item index="3-1">选项1</el-menu-item>
      <el-menu-item index="3-2">选项2</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><Tools /></el-icon>
        <span>系统工具</span>
      </template>
      <el-menu-item index="4-1">代码生成</el-menu-item>
      <el-menu-item index="4-2">系统接口</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { defineComponent, ref } from 'vue'
import {VideoCamera,HomeFilled,Location,Document,Menu as IconMenu,Setting,Tools,} from '@element-plus/icons-vue'

  // 必须先声明调用
  const router = useRouter();
  const route = useRoute()

  const isCollapse = ref(false)
  const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
  }
  const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
  }
  const handleSelect = (key, keyPath) => {
    switch (key) {
      case '1-1':
        router.push('/login')
        break;
      case '4-1':
        // 路由跳转
        router.push('/genTableHomeVue3')
        break;
      case '4-2':
        // 路由跳转
        router.push('/swagger')
        break;
      default:
        break;
    }
    console.log(key, keyPath)
  }
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>