import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VModal from 'vue-js-modal'

import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/fr';
import 'element-ui/lib/theme-chalk/index.css';

import './faHandler';
import './globalComponents';

import '../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import '../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';

Vue.config.productionTip = false;
Vue.prototype.$http = require('axios');
Vue.use(Element, {
	locale},
	VModal, {componentName: 'modal'}
);

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');