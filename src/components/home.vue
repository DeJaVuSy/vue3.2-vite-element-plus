<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px"><Aside /></el-aside>
        <el-container>
          <el-main style="height: 800px;">
            <!-- <ul id="main">
              <li><router-link  to="/genTableHomeVue3" >代码生成</router-link></li>
              <li><router-link  to="/home">主页</router-link></li>
              <li><router-link  to="/login">登录</router-link></li>
            </ul> -->
            <!-- 路由对应的页面内容会显示到这里 -->
            <router-view></router-view>
          </el-main>
          <el-footer>
            <el-footer height="48px">
              Copyright &copy; 2022
              制作 ·
              <el-link href="https://blog.csdn.net/qq_45415736?spm=1001.2101.3001.5343" target="_blank" type="primary" :underline="false"><span>CSDN</span></el-link> ·
              497401643@qq.com
            </el-footer>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Aside from '../leyout/Aside.vue'
import { reactive, ref, toRefs ,defineComponent,nextTick} from 'vue'

  //页面加载时执行
  nextTick(() => {
  })


</script>
<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>