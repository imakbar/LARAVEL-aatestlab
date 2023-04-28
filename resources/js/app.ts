/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
// window.Vue = require('vue').default;
import { createApp } from 'vue'

import App from './App.vue';

// import VueRouter from 'vue-router';
// import * as VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
// import { routes } from './routes';
import router from "./router";
import store from "./store";

//imports for app initialization
import ApiService from "./services/ApiService";

import VueFeather from 'vue-feather';

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
require('./scss/vue/libs/vue-select.scss')

import LaravelVuePagination from 'laravel-vue-pagination';

// https://github.com/SortableJS/vue.draggable.next
import draggable from 'vuedraggable'

import vfmPlugin from 'vue-final-modal'

import BootstrapVue3 from 'bootstrap-vue-3'
import VueLazyLoad from 'vue3-lazyload'

import timeago from 'vue-timeago3'

import VueChatScroll from 'vue-chat-scroll'

import CopyToClipboard from '@xqsit94/vue3-copy-to-clipboard'

// import 'sweetalert2/src/sweetalert2.scss'

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


  
// const router = VueRouter.createRouter({
//     history: VueRouter.createWebHistory(),
//     routes,
// });

//  Vue.use(VueRouter);
//  Vue.use(VueAxios, axios);

// const app = new Vue({
//     el: '#app',
//     router: router,
//     render: h => h(App),
// });

// Vue.createApp(App).use(router).mount('#app');

const app = createApp(App)

ApiService.init(app);

app.use(VueAxios, axios)
app.use(router)
app.use(store)
app.component(VueFeather.name, VueFeather)
app.component('v-select', vSelect)
app.component('Pagination', LaravelVuePagination)
app.component('draggable', draggable)
app.use(vfmPlugin)
app.use(VueLazyLoad,{loading: ''})
app.use(VueChatScroll)

app.use(BootstrapVue3)
app.use(timeago)

app.use(CopyToClipboard)

app.mount('#app')