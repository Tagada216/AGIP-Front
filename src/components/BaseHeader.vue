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
        height: 51px
        margin: 0
        background-color: #ed1a3a
        padding: 10px
        color: white
</style>
