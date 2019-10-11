<template>
    <sidebar-menu widthCollapsed="70px" :menu="menu" />
</template>

<style lang="sass">
$primaryColor: #ed1a3a
$itemPadding: 10px
$itemlineHeight: 50px
$iconHeight: 50px
$iconWidth: 50px

.active-item
    background-color: $primaryColor
    & > a:hover
        background-color: $primaryColor

@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss"
.vsm-title
    font-size: 1.2em

.v-sidebar-menu
    .vsm-header
        font-size: 1.4em
    .vsm-link
        font-size: 1.3em

    .collapse-btn

        &:after
            content: ">"
            font-size: 5em
        height: 70px

    .vsm-arrow
        &:after
            content: ">"
            font-size: 2em

    .vsm-item.first-item.open-item > .vsm-link
        background-color: #888888
</style>

<script>
import { SidebarMenu } from 'vue-sidebar-menu';
export default {
    name: 'MySidebar',
    data() {
        return {
            menu: [
                {
                    // item
                    href: '/',
                    title: 'Accueil',
                    icon: 'fas fa-home',
                    // disabled: true
                    // class: ''
                    // attributes: {}
                    // alias: '/path'
                },
                {
                    header: true,
                    title: 'Incidents',
                    // component: componentName
                    // visibleOnCollapse: true
                    // class:''
                    // attributes: {}
                },
                {
                    href: '/new-incident',
                    title: 'Nouvel incident',
                    icon: 'fas fa-pen',
                },
                {
                    href: '/main-courante',
                    title: 'Main courante',
                    icon: 'fas fa-book-open',
                },
                // {
                //     href: '/fichier-rouge',
                //     title: 'Fichier Rouge',
                //     icon: 'fas fa-file',
                // },
                // {
                //     href: '/post-mortem',
                //     title: 'Post-Mortem',
                //     icon: 'fas fa-archive',
                // },
                {
                    header: true,
                    title: 'Problemes',
                },
                {
                    href: '/problemes',
                    title: 'Liste des problèmes',
                    icon: 'fas fa-hands-helping',
                },
                {
                    header: true,
                    title: 'Reportings',
                },
                {
                    href: '/statistique',
                    title: 'Statistiques',
                    icon: 'fas fa-chart-bar',
                },
            ],
            props: {
                widthCollapsed: {
                    type: String,
                    default: '50px',
                },
                collapsed: {
                    type: Boolean,
                    default: true,
                },
            },
        };
    },
    components: {
        SidebarMenu,
    },
};
</script>
