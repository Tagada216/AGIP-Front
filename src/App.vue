<template>
  <div id="app" style="height: 100vh">
    <MySidebar/>
    <router-view style="height: 100vh"/>
  </div>
</template>

<style lang="scss">
#app {
    font-family: 'Montserrat', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-left: 70px;
}

body {
    margin: 0;
    padding: 0;
}
</style>

<script>
import MySidebar from '@/components/MySidebar.vue';
export default {
    components: {
        MySidebar,
    },
};
</script>
