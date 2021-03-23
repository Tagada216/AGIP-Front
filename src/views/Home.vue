<template>
    <div >
        <base-header title="Accueil" />
        <div class="flex mt-2 flex-col items-center">
        <img alt="Vue logo" src="../assets/Logo AGIPRO et subtitle_v2.svg" />
        <h1 class="mt-4 font-semibold text-xl">Bienvenue dans AGIPROS</h1>
        <p class="mt-2 text-lg">
            AGIPROS pour ATP, Gestion des Incidents, des PROblèmes et Securiprod,
            <br />
            est une plateforme destinée à simplifier et fiabiliser les
            processus <br />
            de gestion d'incidents et de problèmes.
        </p>
        <br />
        <br />
        <br />
        <h1 class=" font-semibold text-xl">Notre outil de supervision :</h1>
        <a href="https://moncockpit.safe.socgen/#/" onclick="window.open(this.href); return false;"
            ><img alt="Vue logo" src="../assets/cockpit-icon-cropped.png"
        /></a>
        </div>
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
    name: 'home',
    components: {
        //HelloWorld,
    },
};
</script>

<style >

</style>
