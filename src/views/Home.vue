<template>
  <div class="home">
    <base-header title="Accueil"/>
    <img alt="Vue logo" src="../assets/Logo AGIPRO et subtitle.png">
	<h1 class="welcomeHeader">Bienvenu dans AGIPRO</h1>
	<p>
		AGIPRO pour Applicatif de Gestion des Incidents et PROblèmes, <br>
		est une plateforme destinée à simplifier et fiabiliser les proccessus <br>
		de gestion d'incidents et de problèmes
	</p>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
    name: 'home',
    components: {
        HelloWorld,
    },
};
</script>

<style lang="sass" scoped>
img
	margin-top: 30px
div.home
	p
		font-size: 1.5em
	h1.welcomeHeader
		font-size: 3em
</style>
