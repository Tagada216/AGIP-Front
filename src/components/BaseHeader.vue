<template>
    <div>
        <span>{{ title }}</span>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'BaseHeader',
    props: {
        title: String,
    },
};
</script>

<!-- 
	Ici on met le CSS du component mais en SASS (pas SCSS)
	Voir : https://en.wikipedia.org/wiki/Sass_(stylesheet_language)
	Ou : https://sass-lang.com/guide
-->
<style lang="sass" scoped>
div
    height: 70px
    margin: 0
    background-color: #ed1a3a
    color: white
    font-size: 2em
    font-weight: 700

span
    display: inline-block
    padding-top: 19px
</style>
