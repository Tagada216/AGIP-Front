<template>
    <div>
        <span>{{title}}</span>
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

<style lang="sass" scoped>
    div
        height: 71px
        margin: 0
        background-color: #ed1a3a
        color: white
        font-size: 2em
        font-weight: 700
	
    span
        display: inline-block
        padding-top: 19px
</style>
