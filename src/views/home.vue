<template>
  <div class="index-conntainer">
    <div class="head-card">
      <div class="avatar">
        <el-avatar :size="50" :src="avatar"></el-avatar>
      </div>
      <div class="head-card-content">
        <h2 class="title">{{username}} {{ TimeFrame()}} 开始您一天的工作吧！</h2>
        <p class="desc">
          vue3-admin 是基于 vue3.2 + vite2 + Element-Plus + Vue-Router4 +
          Javascript开发的中后台管理平台，开箱即用！赶快试试吧...
        </p>
      </div>
    </div>
    <div class="content">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <el-card class="card" shadow="hover">
            <template #header>
              <h3 class="title">项目相关资源推荐</h3>
            </template>
            <div class="card-body">
              <div class="item" @click="handleToDetail('https://v3.cn.vuejs.org/guide/introduction.html')">
                <div class="lf">
                  <img class="img" src="../assets/logo.png" />
                  <div class="title">Vue3中文文档</div>
                </div>
                <div class="desc">渐进式JavaScript框架vue3中文文档Vue被设计为可以自底向上逐层应用。</div>
              </div>
              <div class="item" @click="handleToDetail('https://juejin.cn/post/7006108454028836895?share_token=35daa6aa-d4c9-436c-b8c9-83b132ca7c4d')">
                <div class="lf">
                  <img class="img" src="../assets/logo.png" />
                  <div class="title">Vue3.2 setup</div>
                </div>
                <div class="desc">只需要在script标签上加上setup属性,无需return,template可直接使用</div>
              </div>
              <div class="item" @click="handleToDetail('https://element-plus.gitee.io/zh-CN/component/button.html')">
                <div class="lf">
                  <img class="img" src="../assets/imgSvg/element-plus-logo.svg" />
                  <div class="title">文档</div>
                </div>
                <div class="desc">基于Vue3面向设计师和开发者的组件库,设计原则:一致、反馈、效率、可控</div>
              </div>
              <div class="item" @click="handleToDetail('https://cn.vitejs.dev/guide/')">
                <div class="lf">
                  <img class="img" src="../assets/imgSvg/ViteLogo.svg" />
                  <div class="title">Vite官方中文文档</div>
                </div>
                <div class="desc">Vite是一种新型前端构建工具能够显著提升前端开发体验,轻量快速的热重载</div>
              </div>
              <div class="item" @click="handleToDetail('https://docs.nestjs.cn/')">
                <div class="lf">
                  <img class="img" src="../assets/imgSvg/nesticon.svg" />
                  <div class="title">中文文档</div>
                </div>
                <div class="desc">用于构建高效且可伸缩的服务端应用程序的渐进式 Node.js 框架。</div>
              </div>
              <div class="item" @click="handleToDetail('https://www.tslang.cn/docs/home.html')">
                <div class="lf">
                  <img class="img" src="../assets/img/typescript-logo.jpg" />
                  <div class="title">官方文档</div>
                </div>
                <div class="desc">TypeScript是JavaScript类型的超集，它可以编译成纯JavaScript。</div>
              </div>
              <div class="item" @click="handleToDetail('https://typeorm.bootcss.com/')">
                <div class="lf">
                  <img class="img" src="../assets/img/logoTypeORM.png" />
                  <div class="title">TypeORM文档</div>
                </div>
                <div class="desc">它是一个ORM框架,供额外的特性以帮助你开发任何使用数据库的应用程序</div>
              </div>
              <div class="item" @click="handleToDetail('https://www.runoob.com/js/js-tutorial.html')">
                <div class="lf">
                  <img class="img" src="../assets/img/js.jpg" />
                  <div class="title">JavaScript</div>
                </div>
                <div class="desc">HTML定义了网页的内容,CSS描述了网页的布局,JavaScript控制网页的行为</div>
              </div>
              <div class="item" @click="handleToDetail('https://spring.io/why-spring')">
                <div class="lf">
                  <img class="img" src="../assets/imgSvg/spring-logo.svg" />
                  <div class="title">官网</div>
                </div>
                <div class="desc">Spring框架附带的许多工具，并获得了许多开箱即用的解决方案的好处。</div>
              </div>
              <div class="item" @click="handleToDetail('http://www.redis.cn/')">
                <div class="lf">
                  <img class="img" src="../assets/img/redis-white.png" />
                  <div class="title">Redis中文文档</div>
                </div>
                <div class="desc">Redis可以用作数据库、缓存和消息中间件,支持多种类型的数据结构</div>
              </div>
            </div>
          </el-card>
          
          <el-card class="card" shadow="hover">
            <template #header>
              <h3 class="title">a3</h3>
            </template>
            <el-descriptions class="margin-top" :column="3"  border>
              <!-- <el-descriptions-item v-for="(value, key) in packpage.dependencies" :key="key">
                <template #label>
                  {{ key }}
                </template>
                {{ value }}
              </el-descriptions-item> -->
            </el-descriptions>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <el-card class="card" shadow="hover">
            <template #header>
              <h3 class="title">a4</h3>
            </template>
            <div class="count-box">
              <div class="item" v-for="(item, index) in state.orderList" :key="index">
                <span class="label">{{ t('indexPage.order.' + item.key) }}</span>
                <!-- <CountTo
                  class="count"
                  :class="item.status"
                  :startVal="0"
                  :endVal="item.value"
                  :duration="3000"
                ></CountTo> -->
              </div>
            </div>
          </el-card>
          <el-card class="card" shadow="hover">
            <template #header>
              <h3 class="title">a5</h3>
            </template>
            <div v-for="(item, index) in state.skillList" :key="index">
              <div class="skill-title">{{ item.title }}</div>
              <el-progress
                :stroke-width="8"
                :percentage="item.percentage"
                :color="item.color"
              ></el-progress>
            </div>
          </el-card>
          <!-- <Echarts
            :title="t('indexPage.chartTitle')"
            :index="1"
            headerIcon="chart-line"
            :style="{
              height: '200px',
            }"
            :options="{
              series: series2,
              xAxis,
              yAxis,
              toolbox,
            }"
          /> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
  };
</script>

<script setup>
import { ref, computed, reactive, onBeforeMount } from 'vue';
import avatar from "../assets/img/avatar(1).jpg";//头像
import {TimeFrame} from "../util/dateFormatUtil.js"//判断时间段
import Cookies from "js-cookie"//用于记住账号
// 所谓的vue-i18n国际化方案，简而言之，就是根据它的规则自己建立一套语言字典，对于每一个字（message）都有一个统一的标识符，
//我们直接在文中使用该标识符代替原来固定的某一语言，该方案在内部会自动转为你需要查看的语言。
//import { useI18n } from 'vue-i18n';

  //import { CountTo } from 'vue3-count-to';
  //import Echarts from '@/components/Echarts/index.vue';

  //import packpage from '../../../package.json';

  //import { useStore } from 'vuex';
  //const store = useStore();

  //import { useI18n } from 'vue-i18n';
  //const { t } = useI18n();

  //从Cookies中获取用户名称
  const username = Cookies.get('username');

  const state = reactive({
    list: [],
    prefix: '',
    orderList: [],
    skillList: [],
  });

  //import { getResouceList } from '@/api/index';

  //判断时间段
  // const hour = new Date().getHours();;
  // const thisTime = hour == 0? '子夜好': hour < 5? '凌晨好': hour < 8? '早上好': hour < 11? '上午好': 
  //                  hour < 13? '中午好' : hour < 17? '下午好': hour < 19? '傍晚好': hour < 23? '晚上好': '子夜好';
  // const sayHi = ref(thisTime);

  const series2 = reactive([
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ]);

  const xAxis = reactive({
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  });

  const yAxis = reactive({
    type: 'value',
  });

  const toolbox = reactive({
    show: true,
  });

  const isMobile = computed(() => {
    //return store.getters['setting/isMobile'];
  });

  const onGetResouceList = () => {
    // getResouceList().then((res) => {
    //   const { list, prefix, orderList, skillList } = res.data;
    //   Object.assign(state, { list, prefix, orderList, skillList });
    // });
  };

  const handleToDetail = (url) => {
    window.open(url);
  };

  onBeforeMount(() => {
    onGetResouceList();
  });
</script>

<style lang="scss" scoped>
  .index-conntainer {
    width: 100%;
    .head-card {
      display: flex;
      align-items: center;
      padding: 20px 30px;;
      background-color: #fff;
      &-content {
        padding-left: 15px;
        .desc {
          color: #606266;
        }
      }
    }
    .content {
      margin: 15px 0;
      .count-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item {
          display: flex;
          flex-direction: column;
          text-align: center;
          .label {
            padding: 10px 0;
            font-size: 16px;
          }
          .count {
            font-size: 22px;
            font-weight: bolder;
            color: rgb(0, 0, 0);
            &.error {
              color: red;
            }
            &.success {
              color: green;
            }
          }
        }
      }
      .title {
        margin: 0;
      }
      .skill-title {
        padding: 10px 0;
        font-weight: 500;
      }
      .card {
        margin-bottom: 15px;
        &-body {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          &.mobile {
            grid-template-columns: repeat(1, 1fr);
          }
          .item {
            box-sizing: border-box;
            padding: 10px 20px;
            margin-top: -1px;
            margin-left: -1px;
            overflow: hidden;
            cursor: pointer;
            border: 1px solid black;
            border: 1px solid #eee;
            transition: box-shadow 0.5;
            .lf {
              display: flex;
              align-items: center;
              max-width: 200px;
              .img {
                width: auto;
                max-width: 155px;
                height: auto;
                max-height: 40px;
              }
            }
            &:hover {
              box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
            }
            .title {
              padding-left: 5px;
              font-size: 18px;
              font-weight: 100%;
            }
            .desc {
              padding: 5px 0;
              font-size: 13px;
              line-height: 1.5;
              color: #606266;
            }
          }
        }
      }
    }
  }
</style>
