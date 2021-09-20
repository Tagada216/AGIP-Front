import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/fr'
import axios from 'axios';

Vue.prototype.$http = require('axios');

Vue.use(ElementUI,{locale},axios)
