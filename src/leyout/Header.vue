<template>
    <el-header height="56px">
        <div class="header_left">header</div>
        <div class="header_right">
            <el-tooltip :content="state.isFullScreen ? '退出全屏' : '全屏'">
                <el-icon @click="handleFullScreen"><FullScreen /></el-icon>
            </el-tooltip>
            <el-dropdown size="medium" @command="handleCommand">
                <div class="user_info">
                    <el-avatar :size="36" :src="avatar" />
                    <span class="username">Tom</span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item icon="i-user" command="user">个人中心</el-dropdown-item>
                        <el-dropdown-item icon="i-caret-left" command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script setup>
import { computed, getCurrentInstance, reactive, toRefs } from "vue";
import {FullScreen} from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
//import { useStore } from "vuex";
import screenfull from "screenfull";//导入全屏依赖
import avatar from "../assets/img/admin.jpg";//头像


  const { proxy } = getCurrentInstance();
  const router = useRouter();
  //const store = useStore();

  const state = reactive({
    isFullScreen: false,
    avatar,
    screenfull
  });
  //const userName = computed(() => store.getters.getUserName);

  const handleCommand = command => {
    if (command === "user") {
      router.push("/user");
    } else {
      proxy.$message.success("退出成功");
      //store.dispatch("clearUser");
      router.replace("/");
      sessionStorage.clear();//清除
      localStorage.clear();
    }
  };

  const handleFullScreen = () => {
    if (screenfull.isEnabled) {
        state.isFullScreen = !state.isFullScreen;
        screenfull.toggle();
    }
  };

// export default {
//     setup() {
//         return {
//             //userName,
//             handleCommand,
//             handleFullScreen,
//             ...toRefs(state)
//         };
//     }
// };
</script>

<style lang="scss" scoped>
.el-header {
    padding: 0 16px;
    border-bottom: 1px solid rgb(42, 139, 168);
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    background-color: #aaaaaa;
    .header_left {
        flex: 1;
        font-size: 24px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .header_right {
        display: flex;
        align-items: center;
        padding-left: 8px;
        width: auto;
        & > i {
            padding: 8px 6px;
            font-size: 20px;
            cursor: pointer;
        }

        .user_info {
            margin: 0 8px;
            width: auto;
            text-align: right;
            cursor: pointer;
        }
        .el-avatar {
            vertical-align: middle;
        }
        span.username {
            margin-left: 8px;
            vertical-align: middle;
            &:hover {
                color: #409eff;
            }
        }
    }
}
</style>
