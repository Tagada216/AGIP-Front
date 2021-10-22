import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/fr'
import axios from 'axios';
import AgGridVue from 'ag-grid-vue';
import Splitpanes from 'splitpanes';

Vue.prototype.$http = require('axios');

Vue.use(ElementUI,{locale},axios,AgGridVue,Splitpanes)
