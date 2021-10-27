<template>
    <div class="h-20 m-0 bg-primaryRed  text-center">
        <span class="inline-block  pt-5 text-white text-3xl font-bold">{{ title }}</span>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: String,
    },
};
</script>