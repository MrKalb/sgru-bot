// polyfill
import 'babel-polyfill';

import Vue from 'vue';
import VueResource from 'vue-resource'
import App from './App';
import store from './store';

Vue.config.devtools = true;

Vue.use(VueResource);

new Vue({
    el: 'body',
    components: { App },
    store: store
});
