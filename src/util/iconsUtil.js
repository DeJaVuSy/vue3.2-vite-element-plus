import { reactive,markRaw } from 'vue'
// 引入全部图标
// import * as Icons from "@element-plus/icons"

// 按需引入图标
import {
  CloseBold,
  Close,
  Plus,
  Star,
  UserFilled,
  Loading,
  Connection,
  Edit,
  FolderOpened,
  VideoCamera,
  Setting,
  Tools,
} from '@element-plus/icons-vue'

//reactive的用法与ref的用法相似，也是将数据变成响应式数据，当数据发生变化时UI也会自动更新。不同的是ref用于基本数据类型，而reactive是用于复杂数据类型，比如对象和数组
//toRaw返回一个reactive转换为响应式对象以前的原始对象
//markRaw标记一个对象，使其永远不会转换为代理。返回对象本身
const dictIcon = markRaw({
  'CloseBold': CloseBold,
  'Close': Close,
  'Plus': Plus,
  'Star': Star,
  'UserFilled': UserFilled,
  'Loading': Loading,
  'Connection': Connection,
  'Edit': Edit,
  'FolderOpened': FolderOpened,
  'VideoCamera': VideoCamera,
  'Setting': Setting,
  'Tools': Tools,
})

const installIcon = (app) => {
  // 便于模板获取
  app.config.globalProperties.$icon = dictIcon
  // 使用全部图标
  // app.config.globalProperties.$icon = Icons
}
export default installIcon