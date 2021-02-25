import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
	mode : 'history',
	base : process.env.BASE_URL,
	routes: [
		{
			path: '/home',
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
			path: '/agence-isolees',
			component: () => import('./views/AgenceIsolees.vue'),
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
		{
			path: '/new-incident/id=:id',
			component: () => import('./views/NewIncident.vue'),
		},
		{
			path: '/cosip',
			name:'cosip',
			component: () => import('./views/Cosip.vue'),
		},
		{
			path: '/cosip/id=:id',
			component: () => import('./views/FicheIncident.vue'),
		},
		{
			path: '/maj-agence/id=:id',
			component: () => import('./views/Agence.vue'),
		},
		{
			path: '/agences',
			component: () => import('./views/GestionAgence.vue')
		},
		{
			path:'*',
			redirect:'home'
		}
	
	],
});

// router.beforeEach((to, from, next) => {
// 	store.dispatch('fetchAccessToken');
// 	if (to.fullPath === '/users') {
// 	  if (!store.state.accessToken) {
// 		next('/login');
// 	  }
// 	}
// 	if (to.fullPath === '/home') {
// 	  if (store.state.accessToken) {
// 		next('/users');
// 	  }
// 	}
// 	next();
//   });
