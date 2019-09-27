<template>
    <div>
        <h2>PI</h2>
        <span class="p-header">Description</span>
        <p>
            {{ description }}
        </p>
        <br />
        <span class="p-header">Enseigne impacté</span>
        <p>
            Test
        </p>
        <br />
        <span class="p-header">Impacts</span>
        <p>
            Test
        </p>
        <br />
        <span class="p-header">Causes</span>
        <p>
            Test
        </p>
        <br />
        <span class="p-header">Actions de résolution menées</span>
        <p>
            Test
        </p>
        <br />
        <span class="p-header">Plan d’actions</span>
        <p>
            Test
        </p>
    </div>
</template>

<script>
export default {
    name: 'ComPreviewer',
};
</script>

<!-- 
	Ici on met le CSS du component mais en SASS (pas SCSS)
	Voir : https://en.wikipedia.org/wiki/Sass_(stylesheet_language)
	Ou : https://sass-lang.com/guide
-->
<style lang="sass" scoped>
div
	text-align: left
	margin: 50px
	float: left

	& h2
		font-size : 1.5em
		font-weight: bold

	& span.p-header
		color: #00a7ff
		font-weight: bold
</style>
