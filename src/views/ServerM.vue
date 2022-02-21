<template>
  <div v-loading="state.loading">
    <!--wrap设置是否自动折行 fill子元素是否填充父容器 -->
    <el-space wrap style="width: 50%" fill>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>CPU</span>
          </div>
        </template>
        <div class="text item">
          <el-table :data="state.cpuTable" :row-style="{height: '40px'}" :cell-style="{padding: '0'}">
            <el-table-column prop="attribute" label="属性" width="auto"/>
            <el-table-column prop="value" label="值" width="auto"/>
          </el-table>
        </div>
      </el-card>
    </el-space>
    <!--wrap设置是否自动折行 fill子元素是否填充父容器 -->
    <el-space wrap style="width: 50%" fill>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>内存</span>
          </div>
        </template>
        <div class="text item">
          <el-table :data="state.RAMTable" :row-style="{height: '40px'}" :cell-style="{padding: '0'}">
            <el-table-column prop="attribute" label="属性" width="auto"/>
            <el-table-column prop="RAM" label="内存" width="auto"/>
            <el-table-column prop="JVM" label="JVM" width="auto"/>
          </el-table>
        </div>
      </el-card>
    </el-space>
      <el-space wrap style="width: 100%" fill>
        <el-card>
          <el-descriptions class="margin-top" title="服务器信息" :column="2" :size="size" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle"><user /></el-icon>服务器名称</div>
              </template>
              {{state.sysInformation.computerName}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle"><iphone /></el-icon>操作系统</div>
              </template>
              {{state.sysInformation.osName}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle"><tickets /></el-icon>服务器IP</div>
              </template>
              <!-- <el-tag size="small">{{state.sysInformation.computerIp}}</el-tag> -->
              {{state.sysInformation.computerIp}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle"><office-building /></el-icon>系统架构</div>
              </template>
              {{state.sysInformation.osArch}}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
    </el-space>
    <el-space wrap style="width: 100%" fill>
        <el-card>
          <el-descriptions class="margin-top" title="Java虚拟机信息" :column="2" :size="size" border>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle"><user /></el-icon>Java名称</div>
              </template>
              {{state.jvmInformation.name}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle"><user /></el-icon>Java版本</div>
              </template>
              {{state.jvmInformation.version}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle"><iphone /></el-icon>启动时间</div>
              </template>
              {{state.jvmInformation.startTime}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle"><tickets /></el-icon>运行时长</div>
              </template>
              <!-- <el-tag size="small">School</el-tag> -->
              {{state.jvmInformation.runTime}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle"><office-building /></el-icon>安装路径</div>
              </template>
              {{state.jvmInformation.home}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon :style="iconStyle"><office-building /></el-icon>项目路径</div>
              </template>
              {{state.sysInformation.userDir}}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
    </el-space>
    <!--wrap设置是否自动折行 fill子元素是否填充父容器 -->
    <el-space wrap style="width: 100%" fill>
      <el-card>
        <template #header>
          <div class="card-header">
            <span>磁盘状态</span>
          </div>
        </template>
        <div class="text item">
          <el-table :data="state.sysFiles" :row-style="{height: '40px'}" :cell-style="{padding: '0'}">
            <el-table-column prop="dirName" label="盘符路径" width="auto"/>
            <el-table-column prop="typeName" label="文件系统" width="auto"/>
            <el-table-column prop="sysTypeName" label="盘符类型" width="auto"/>
            <el-table-column prop="total" label="总大小" width="auto"/>
            <el-table-column prop="free" label="可用大小" width="auto"/>
            <el-table-column prop="used" label="已用大小" width="auto"/>
            <el-table-column prop="usage" label="已用百分比" width="auto"/>
          </el-table>
        </div>
      </el-card>
    </el-space>
  </div>

</template>

<script setup>
import { computed, ref, nextTick, reactive} from 'vue'
import {User,Iphone,Location,Tickets,OfficeBuilding,} from '@element-plus/icons-vue'//图标
import {ServerMQuery} from '../interface/ServerM.js'
import { ElMessageBox, ElMessage } from 'element-plus'//弹窗提示

const size = ref('')
const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})

const state = reactive({
  loading:true,//显示加载中
  cpuTable:[{attribute: '核心数',value: '暂无数据',},{attribute: '用户使用率',value: '暂无数据',},{attribute: '系统使用率',value: '暂无数据',},{attribute: '当前空闲率',value: '暂无数据',}],
  RAMTable:[{attribute: '总内存',RAM: '暂无数据',JVM: "暂无数据"},{attribute: '已用内存',RAM: '暂无数据',JVM: "暂无数据"},{attribute: '剩余内存',RAM: '暂无数据',JVM: "暂无数据"},{attribute: '使用率',RAM: '暂无数据',JVM: "暂无数据"}],
  sysInformation:{},//服务器信息
  jvmInformation:{},//jvm，Java虚拟机信息
  sysFiles:[],//磁盘状态
})

//页面加载时执行
nextTick(() => {
  //渲染数据
  ServerMQuery().then((response) => {
    if(response.status === 200){
      const cpu = response.data.cpu;//cpu信息
      const mem = response.data.mem;//分配信息,内存信息
      state.jvmInformation = response.data.jvm//jvm，Java虚拟机信息
      state.sysInformation = response.data.sys;//服务器信息
      state.sysFiles = response.data.sysFiles;//磁盘状态
      state.cpuTable = [{attribute: '核心数',value: cpu.cpuNum,},{attribute: '用户使用率',value: cpu.used+'%',},
                    {attribute: '系统使用率',value: cpu.sys+'%',},{attribute: '当前空闲率',value: cpu.free+'%',}]
      state.RAMTable = [{attribute: '总内存',RAM: mem.total+'G',JVM: state.jvmInformation.total+'M'},{attribute: '已用内存',RAM: mem.used+'G',JVM: state.jvmInformation.used+'M'},
                    {attribute: '剩余内存',RAM: mem.free+'G',JVM: state.jvmInformation.free+'M'},{attribute: '使用率',RAM: mem.usage+'%',JVM: state.jvmInformation.usage+'%'}]
      console.log(response.data);
      state.loading = false;//关闭加载中
    }
  }).catch((error) =>{
    state.loading = false;//关闭加载中
    ElMessage.error("请求超时 "+error)
    console.log(error)       //请求失败返回的数据
  })
})

</script>
<style scoped>
/* .el-descriptions {
  margin-top: 20px;
} */

.cell-item {
  display: flex;
  align-items: center;
}
/* .text item {
  color: rgb(218, 13, 13);
} */
</style>