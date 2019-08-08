import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VeeValidate from 'vee-validate';

import vueNcform from '@ncform/ncform';
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/fr';
import 'element-ui/lib/theme-chalk/index.css';
import ncformStdComps from '@ncform/ncform-theme-elementui';

import './faHandler';
import './globalComponents';

import '../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import '../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';

Vue.config.productionTip = false;

Vue.prototype.$http = require('axios');

Vue.use(VeeValidate);
Vue.use(Element, {locale});
Vue.use(vueNcform, { extComponents: ncformStdComps /*, lang: 'zh-cn' */ });

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
