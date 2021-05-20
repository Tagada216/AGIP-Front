<template>
	<div class="home">
		<base-header title="Accueil">
			<el-button
				v-if="connect === 'true'"
				id="coButton"
				class="rounded-lg float-right mr-5 mt-3"
				@click="login_out()"
				>Déconnexion</el-button
			>
			<el-button
				v-else
				id="coButton"
				class="rounded-lg float-right mr-5 mt-3"
				@click="login_out()"
				>Connexion</el-button
			>
		</base-header>
		<img alt="Vue logo" src="../assets/Logo AGIPRO et subtitle_v2.svg" />
		<h1 class="welcomeHeader">Bienvenue dans AGIPROS</h1>
		<p>
			AGIPROS pour ATP, Gestion des Incidents, des PROblèmes et
			Securiprod,
			<br />
			est une plateforme destinée à simplifier et fiabiliser les processus
			<br />
			de gestion d'incidents et de problèmes.
		</p>
		<br />
		<br />
		<br />
		<h1>Notre outil de supervision</h1>
		<a
			href="https://moncockpit.safe.socgen/#/"
			onclick="window.open(this.href); return false;"
			><img alt="Vue logo" src="../assets/cockpit-icon-cropped.png"
		/></a>
		<Login-Component />
		<!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import LoginComponent from '../components/LoginCompenent';
export default {
	props: ['connect'],
	name: 'home',
	components: {
		LoginComponent,
	},
	data() {
		return {
			connect: false
		
		};
	},
	mounted(){
		this.setConnectButtonName()
	},
	methods: {


		showModal() {
			this.$modal.show('loginModal');
		},

		logout() {
			if (sessionStorage.getItem('jwt') !== null) {
				sessionStorage.removeItem('jwt');
				sessionStorage.removeItem('role');
				sessionStorage.removeItem('user');
				window.location.reload();
				this.connect = false;
				localStorage.connect = this.connect
			}
		},

		login_out() {
			const getButton = document.getElementById('coButton');
			if (sessionStorage.getItem('jwt') !== null) {
				getButton.onclick = this.logout();
			} else {
				getButton.onclick = this.showModal();
			}
		},

		setConnectButtonName(){
			this.connect = localStorage.connect
		}
	},
};
</script>

<style lang="scss" scoped>
img {
	margin-top: 30px;
}

div.home {
	p {
		font-size: 1.5em;
	}

	h1.welcomeHeader {
		font-size: 3em;
	}

	.button {
		float: right;
		margin-top: 1em;
		margin-right: 2em;
	}
}
</style>
