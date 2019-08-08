<template>
    <h1>{{title}}</h1>
</template>

<script>
export default {
    name: "BaseHeader",
    props: {
        title: String
    }
}
</script>

<style lang="sass" scoped>
    h1
        height: 71px
        margin: 0
        background-color: #ed1a3a
        padding: 19px
        color: white
        font-size: 2em
        font-weight: 700
</style>
