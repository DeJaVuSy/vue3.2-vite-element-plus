<template>
    <el-aside :width="isCollapse ? `64px` : `200px`">
        <div class="logo">
            <img src="../assets/img/avatar.png" alt="logo" draggable="false" />
            <!-- <p>Vite2 Admin</p> -->
        </div>
        <!-- 在el-menu添加 unique-opened， 效果：打开其他子菜单时收起当前父菜单 -->
        <el-menu
            background-color="#001529"
            text-color="#eee"
            active-text-color="#fff"
            router
            unique-opened
            :collapse="isCollapse"
            :default-openeds="[state.defaultOpeneds]"
            :default-active="state.defaultActive"
            @select="handleSelect"
        >
            <el-sub-menu index="1">
              <template #title>
                <el-icon><HomeFilled /></el-icon>
                <span>主页</span>
              </template>
              <el-menu-item index="/notFound">了解项目</el-menu-item>
            </el-sub-menu>
            <!-- <el-sub-menu index="2">
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
              <el-menu-item index="3-1">在线用户</el-menu-item>
              <el-menu-item index="3-2">定时任务</el-menu-item>
              <el-menu-item index="3-3">数据监控</el-menu-item>
              <el-menu-item index="3-4">服务器监控</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><Tools /></el-icon>
                <span>系统工具</span>
              </template>
              <el-menu-item index="4-1">代码生成</el-menu-item>
              <el-menu-item index="4-2">系统接口</el-menu-item>
            </el-sub-menu> -->
            <template  v-for="MenuParent in state.listMenuParent" :key="MenuParent.menuName">
                <el-sub-menu :index="MenuParent.menuName">
                  <template #title>
                    <!-- <component :is="$icon[MenuParent.icon]"/> 动态图标 -->
                    <el-icon><component :is="$icon[MenuParent.icon]"/></el-icon>
                    <span>{{MenuParent.menuName}}</span>
                  </template>
                  <template v-for="Menuchildren in state.listMenuchildren">
                    <el-menu-item  v-if="MenuParent.menuId == Menuchildren.parentId" :index="Menuchildren.url">{{Menuchildren.menuName}}</el-menu-item>
                  </template>
                </el-sub-menu>
            </template>
        </el-menu>
        <div class="fold" @click="changeCollapse">
            <i v-show="!isCollapse" class="el-icon-d-arrow-left">收起菜单</i>
            <i v-show="isCollapse" class="el-icon-d-arrow-right">展开</i>
        </div>
          <!-- <el-radio-group v-model="isCollapse">
            <el-radio-button :label="false">expand</el-radio-button>
            <el-radio-button :label="true">collapse</el-radio-button>
          </el-radio-group> -->
    </el-aside>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'//路由
import { defineComponent, ref, reactive, nextTick } from 'vue'
import {VideoCamera,HomeFilled,Location,Document,Menu as IconMenu,Setting,Tools} from '@element-plus/icons-vue'//图标
import {MenuQuery} from '../interface/Menu';//接口

  // 必须先声明调用
  const router = useRouter();
  const route = useRoute();



  //页面加载时执行
  nextTick(() => {
    
    //菜单查询
    menuQuery();
    //获取当前路由url
    //console.log('打印路由',router.currentRoute._value.fullPath);
    // if(router.currentRoute._value.fullPath == '/index'){
    //   router.push('/notFound');
    // }

    // let menuSelect = sessionStorage.getItem('menuSelect');
    // //console.log(menuSelect);
    // if(menuSelect != null){
    //   let menuSelectArray = menuSelect.split(',');
    //   state.defaultOpeneds = menuSelectArray[0];
    //   state.defaultActive = menuSelectArray[1];
    //   // console.log(state.defaultOpeneds);
    //   // console.log(state.defaultActive);
    // }else{
    //   router.push('/notFound');
    // }
    
  })

  // ref声明响应式数据，用于声明基本数据类型
  const name = ref()
  // 修改
  name.value = 'Tom'

  // reactive声明响应式数据，用于声明引用数据类型
  const state = reactive({ 
    //isCollapse: false
    listMenuParent:[],//一级菜单
    listMenuchildren:[],//二级菜单
    defaultOpeneds:sessionStorage.getItem('menuSelect')==null?'1':sessionStorage.getItem('menuSelect').split(',')[0],//默认打开一级菜单
    defaultActive:sessionStorage.getItem('menuSelect')==null?'/notFound':sessionStorage.getItem('menuSelect').split(',')[1],//默认选中二级菜单
  });

  //菜单查询
  const menuQuery = () => {
    MenuQuery().then((response) =>{
      //state.listMenu = response.data;
      
      response.data.forEach(Menu => {
        //console.log(Menu.menuId);
        if(Menu.parentId == 0){
          state.listMenuParent.push(Menu);
        }else{
          state.listMenuchildren.push(Menu)
        }
      });
    })
  }

  //菜单栏展开或收起
  const changeCollapse = () => {
    //state.isCollapse = !state.isCollapse;
    isCollapse.value = !isCollapse.value;
  };

  //默认菜单栏展开
  const isCollapse = ref(false)

  const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
  }
  const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
  }
  const handleSelect = (key, keyPath) => {
    
    //会话存储选中的菜单，页面刷新后默认打开一级菜单和选中二级菜单
    sessionStorage.setItem('menuSelect',keyPath);
    // switch (key) {
    //   case '1-1':
    //     router.push('/notFound');
    //     // router.push({
    //     //   path:'/tabs',
    //     //   name:'Tabs',
    //     //   params:{
    //     //     tabNmae : '了解项目'
    //     //   }
    //     // });
    //     break;
    //   case '2-1':
    //     router.push('/notFound');
    //     // router.push({
    //     //   path:'/tabs',
    //     //   name:'Tabs',
    //     //   params:{
    //     //     tabNmae : '选项1'
    //     //   }
    //     // });
    //     break;
    //   case '2-2':
    //     router.push('/notFound');
    //     // router.push({
    //     //   path:'/tabs',
    //     //   name:'Tabs',
    //     //   params:{
    //     //     tabNmae : '选项2'
    //     //   }
    //     // });
    //     break;
    //   case '3-3':
    //     router.push('/druid')
    //     break;
    //   case '3-4':
    //     router.push('/serverM')
    //     break;
    //   case '4-1':
    //     // 路由跳转
    //     router.push('/genTableHomeVue3')
    //     break;
    //   case '4-2':
    //     // 路由跳转
    //     router.push('/swagger')
    //     break;
    //   default:
    //     break;
    // }
    // console.log(key, keyPath)
  }
</script>

<style lang="scss" scoped>
@mixin noScrollBar {
    overflow: hidden;
    overflow-y: scroll;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        width: 0 !important;
    }
}

@mixin noSelect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    user-select: none;
}

@mixin line($n) {
    height: $n + px;
    line-height: $n + px;
}

.el-aside {
    box-sizing: border-box;
    height: 100vh;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    background-color: #001529;
    overflow: hidden;
    transition: width 0.3s ease-in-out;
    -moz-transition: width 0.3s ease-in-out;
    -webkit-transition: width 0.3s ease-in-out;
    @include noSelect;
    .logo {
        @include line(56);
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        background-color: #002140;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #fff;
        }
        p {
            flex: 1;
            padding-left: 10px;
            height: 56px;
            font-size: 20px;
            color: #fff;
            overflow: hidden;
        }
    }

    .el-menu {
        flex: 1;
        border-right: none;
        @include noScrollBar;
        &:not(.el-menu--collapse) {
            width: 200px;
        }
    }

    .fold {
        @include line(48);
        color: #fff;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
        background-color: #002140;
        &:hover {
            cursor: pointer;
        }
    }
}
/* 激活选中菜单 */
.el-menu-item.is-active,
.el-menu--popup .el-menu-item.is-active {
    background-color: #1890ff !important;
}
</style>
