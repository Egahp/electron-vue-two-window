import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from '../../store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale :'zh-cn',
  messages:{
    'zh-cn':require("../../assets/language/zh_cn"),
    'zh-tw':require("../../assets/language/zh_tw"),
    'en-us':require("../../assets/language/en"),
    'de':require("../../assets/language/de"),
    'fr':require("../../assets/language/fr"),
    'ja':require("../../assets/language/ja"),
    'ko':require("../../assets/language/ko"),
    'ru':require("../../assets/language/ru")
  }
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  i18n,
  router,
  store,
  template: '<App/>'
}).$mount('#app')


