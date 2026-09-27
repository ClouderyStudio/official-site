import { createApp } from 'vue'
import App from './App.vue'
import { initTheme } from '@/composables/useTheme'
import { vRipple } from '@/directives/ripple'
import { vReveal } from '@/directives/reveal'
import { vCountUp } from '@/directives/countUp'
import '@/styles/index.css'

// Apply the stored colour scheme before the first paint.
initTheme()

createApp(App)
  .directive('ripple', vRipple)
  .directive('reveal', vReveal)
  .directive('count-up', vCountUp)
  .mount('#app')
