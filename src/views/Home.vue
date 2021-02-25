<template>
	<div class="home">
		<base-header title="Accueil">
			<el-button class="button" @click="showModal()">Connexion</el-button>
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
		<Login-Component/>
		<!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import LoginComponent from '../components/LoginCompenent'
export default {
	name: 'home',
	components: {
		LoginComponent
	},
	date(){
		return{
			// modal : false
		}
	},
	methods:{
		showModal(){
			this.$modal.show('loginModal');
		}
	},
};
</script>

<style lang="scss" scoped>
img{
	margin-top: 30px
}

div.home{
	p{
		font-size: 1.5em
	}
		
	h1.welcomeHeader{
		font-size: 3em
	}

	.button{
		float:right;
		margin-top: 1em;
    	margin-right: 2em
	}
		
}
	
</style>
