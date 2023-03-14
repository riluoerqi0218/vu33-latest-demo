import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import svgIcon from "./components/SvgIcon/index.vue";

import App from './App.vue'
import router from './router'

import "virtual:svg-icons-register";
import "virtual:windi.css";

import './styles/main.scss'

import "./permission";

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
});
app.use(createPinia())
app.use(router)
app.component("svg-icon", svgIcon);


app.mount('#app')
