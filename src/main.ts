import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import router from './router/routes.js'
import store from './store'
import firebase from './firebase.config.js'


createApp(App).use(Antd).use(store).use(router).use(firebase).mount('#app')
