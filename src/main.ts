import { createApp } from 'vue'
import { vReveal, vRipple } from '@clderystd/m3-ui'
import App from './App.vue'
import { initTheme } from '@/composables/useTheme'
import { vCountUp } from '@/directives/countUp'
import '@/styles/index.css'

// Apply the stored colour scheme before the first paint.
initTheme()

/*
 * v-ripple / v-reveal 来自组件库（与本文件原先的本地副本逐字节相同）。
 * 组件库里的组件自己会 import 这两个指令，所以即便不在这里全局注册也不会失效；
 * 全局注册是为了让**站点自己的**元素（页头按钮、卡片）也能用 v-ripple / v-reveal。
 * v-count-up 是官网独有的指令（数字滚动），组件库里没有，仍留在本地。
 */
createApp(App)
  .directive('ripple', vRipple)
  .directive('reveal', vReveal)
  .directive('count-up', vCountUp)
  .mount('#app')
