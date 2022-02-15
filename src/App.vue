<script setup>

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg=" vue3 + Vite" /> -->
  <!-- 注意 id="app" 与 main.js 里的一致
  另外必须有 <router-view /> 才能渲染不同 Path 展示 -->
  <div id="app">
    <router-view />
  </div>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

/* 去除页面布局白边 */
*{
  margin:0;
  padding:0;
  border:0;
}
</style>
