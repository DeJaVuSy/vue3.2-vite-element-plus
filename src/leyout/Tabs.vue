<template>
  <!-- <div>
    <el-button size="small" @click="addTab(editableTabsValue)">
      add tab
    </el-button>
  </div> -->
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    closable
    @tab-remove="removeTab"
  >
  
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >

      {{ item.content }}
      
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref,watch,nextTick} from 'vue'
import { useRoute, useRouter } from 'vue-router'

let tabIndex = 2
const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
])

// 必须先声明调用
const router = useRouter();
const route = useRoute()

//页面加载时执行
nextTick(() => {
  //getParams();
})

const getParams = () => {
  // 取到路由带过来的参数
  var routerParams = route.params.id
  // 将数据放在当前组件的数据内
  alert(routerParams);
}
  // 监听count
watch(
  () => route.params.tabNmae,
  (newVal, oldVal) => {
    const tabNmae = route.params.tabNmae.toString();
    //alert(tabNmae);
    //console.log(tab)
    addTab(tabNmae);
    console.log(`watch监听变化前的数据：${oldVal}`)
    console.log(`watch监听变化后的数据：${newVal}`)
  },
  {
    //immediate: true, // 立即执行
    //deep: true // 深度监听
  }
)

const addTab = (targetName:string) => {
  const newTabName = `${++tabIndex}`
  editableTabs.value.push({
    title: targetName,
    name: newTabName,
    content: 'New Tab content',
  })
  editableTabsValue.value = newTabName
}
const removeTab = (targetName: string) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
}
</script>