import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { router } from "./router";
import { createPinia } from 'pinia'
import * as THREE from 'three'
window.THREE = THREE

createApp(App).use(createPinia()).use(ElementPlus).use(router).mount('#app')
