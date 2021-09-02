import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';


Vue.use(Router);

let router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/home',
			name: 'home',
			component: Home,
			meta: {
				guest: true,
				requiresAuth: false
			}
		},
		{
			path: '/main-courante',
			name: 'mainCourante',
			component: () => import('./views/MainCourante.vue'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/new-incident',
			name: "incident",
			component: () => import('./views/NewIncident.vue'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/agence-isolees',
			name: "agenceIsolee",
			component: () => import('./views/AgenceIsolees.vue'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/fichier-rouge',
			name: 'fichierRouge',
			component: () => import('./views/FichierRouge.vue'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/statistique',
			name: 'stats',
			component: () => import('./views/Stats.vue'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/problemes',
			name: 'fichierRouge',
			component: () => import('./views/FichierRouge.vue'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/new-incident/id=:id',
			name: "incident_id",
			component: () => import('./views/NewIncident.vue'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/cosip',
			name: 'cosip',
			component: () => import('./views/Cosip.vue'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/cosip/id=:id',
			name: "codipId",
			component: () => import('./views/FicheIncident.vue'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/maj-agence/id=:id',
			name: 'majAgence',
			component: () => import('./views/Agence.vue'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/agences',
			name: 'agences',
			component: () => import('./views/GestionAgence.vue'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/admin',
			name: '/admin',
			beforeEnter: checkAdminRights,
			component: () => import('./views/Admin.vue'),
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '/admin',
			redirect: 'admin',
			meta: {
				requiresAuth: true
			}
		},
		{
			path: '*',
			redirect: 'home',
			meta: {
				guest: true,
				requiresAuth: false
			}
		},

	],
});

router.beforeEach((to, from, next) => {
	if (to.path !== '/home') {
		if (to.matched.some(record => record.meta.requiresAuth)) {
			if (sessionStorage.getItem("jwt") == null) {
				next({
					path: "/home",
					params: {
						nextUrl: to.fullPath
					}
				});
			} else {
				next()
			}
		}
	} else {
		next()
	}

})

function checkAdminRights(to, from, next) {
	// check if the user is admin
	// if (localStorage.getItem('role') == 3) {
	// 	next({
	// 		path: '/admin'
	// 	});
	// } else {
	// 	next({
	// 		path: '/home'
	// 	});
	// }
	if (sessionStorage.getItem('role') == 3) {
		next({
			path: '/admin'
		});
	} else {
		next({
			path: '/home'
		});
	}
}

export default router
// else if(to.matched.some(record => record.meta.guest)){
// 	if(localStorage.getItem("jwt") == null){
// 		next({
// 			path :"/home",
// 			params: { nextUrl: to.fullPath }
// 		})
// 	}else{
// 		next({name:'agences'})
// 	}
// }else{
// 	next()
// }