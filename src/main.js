import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VModal from 'vue-js-modal'


import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/fr';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/css/tailwind.css'

import './faHandler';
import './globalComponents';

import '../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import '../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';

import Donut from 'vue-css-donut-chart';
import 'vue-css-donut-chart/dist/vcdonut.css';


Vue.config.productionTip = false;
Vue.prototype.$http = require('axios');
Vue.use(
	Element, {locale},
	VModal, {componentName: 'modal'},
);
Vue.use(Donut);

new Vue({
	router,
	render: h => h(App),
}).$mount('#app'); 