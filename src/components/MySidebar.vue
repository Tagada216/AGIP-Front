<template>
  <sidebar-menu widthCollapsed="70px" :menu="menu"/>
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
                    // item
                    href: '/main-courante',
                    title: 'Main courante',
                    icon: 'fas fa-pen',
                    // disabled: true
                    // class: ''
                    // attributes: {}
                    // alias: '/path'
                },
                {
                    // item
                    href: '/fichier-rouge',
                    title: 'Fichier Rouge',
                    icon: 'fas fa-file',
                    // disabled: true
                    // class: ''
                    // attributes: {}
                    // alias: '/path'
                },
                {
                    // item
                    href: '/post-mortem',
                    title: 'Post-Mortem',
                    icon: 'fas fa-archive',
                    // disabled: true
                    // class: ''
                    // attributes: {}
                    // alias: '/path'
                },
                {
                    header: true,
                    title: 'Problemes',
                    // component: componentName
                    // visibleOnCollapse: true
                    // class:''
                    // attributes: {}
                },
                {
                    href: '/problemes',
                    title: 'Problemes',
                    icon: 'fas fa-hands-helping',
                    // component: componentName
                    // visibleOnCollapse: true
                    // class:''
                    // attributes: {}
                },
                {
                    href: '/statistique',
                    title: 'Statistiques',
                    icon: 'fas fa-chart-bar',
                    // component: componentName
                    // visibleOnCollapse: true
                    // class:''
                    // attributes: {}
                },
            ],
            props: {
                
                widthCollapsed: {
                    type: String,
                    default: '50px'
                }
            }
        };
    },
    components: {
        SidebarMenu,
    },
};
</script>
