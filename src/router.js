import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue'),
        },
        {
            path: '/main-courante',
            component: () => import('./views/MainCourante.vue'),
        },
        {
            path: '/new-incident',
            component: () => import('./views/NewIncident.vue'),
        },
        {
            path: '/fichier-rouge',
            component: () => import('./views/demo.vue'),
        },
        {
            path: '/statistique',
            component: () => import('./views/Stats.vue'),
        },
        {
            path: '/problemes',
            component: () => import('./views/demo.vue'),
        },
    ],
});
