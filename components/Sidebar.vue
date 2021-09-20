<template>
  <sidebar-menu widthCollapsed="115px" collapsed :menu="menu" />
</template>

<style  lang="sass" >
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss"

.v-sidebar-menu .vsm-item.first-item.active-item > .vsm-link > .vsm-icon
    background-color:  #303333 !important


.active-item
    background-color:  #303333 !important

.vsm-title
    font-size: 1.2em

.v-sidebar-menu .vsm--link_level-1.vsm--link_exact-active, .v-sidebar-menu .vsm--link_level-1.vsm--link_active
        box-shadow: 3px 0px 0px 0px #303333 inset

.v-sidebar-menu
    background-color: #DC4941 !important
    
    .vsm--item
        margin-top: 1em
        margin-bottom: 1em

    .vsm--link_level-1
        .vsm--icon
            height: 30px
            line-height: 30px
            width: 70px 
            flex-shrink: 0
            text-align: center
            border-radius: 3px
            background-color: transparent !important
        

    .vsm-header
        font-size: 1.4em
    .vsm-link
        font-size: 1.3em

    .collapse-btn
        height: 80px !important
        &:after
            content: ">"
            font-size: 5em
            height: 70px
   

    .vsm-arrow
        &:after
            content: ">"
            font-size: 5em
            

    .vsm-item.first-item.open-item > .vsm-link
        background-color:  #303333
        
    .vsm-item.first-item.open-item > .vsm-link
        background-color: #303333

    .vsm--mobile-item
      background-color:  #DC4941 !important

    .vsm--mobile-bg
      background-color: #303333 !important
</style>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import '@fortawesome/fontawesome-free/css/all.css'
export default {
  name: "Sidebar",
  data() {
    return {
      menu: [
        {
          href: "/",
          title: "Accueil",
          icon: "fa fa-home fa-lg",
        },
        {
          header: true,
          title: "Incidents",
        },
        {
          href: "/NewIncident",
          title: "Nouvel incident",
          icon: "fas fa-pen fa-lg",
        },
        {
          href: "/agence-isolees",
          title: "Agence Isolées",
          icon: "fas fa-folder-plus fa-lg",
        },
        {
          href: "/main-courante",
          title: "Main courante",
          icon: "fas fa-book-open fa-lg",
        },
        {
          href: "/cosip",
          title: "COSIP",
          icon: "fas fa-tasks fa-lg",
        },
        {
          header: true,
          title: "Reportings",
        },

        {
          href: "/statistique",
          title: "Statistiques",
          icon: "fas fa-chart-bar fa-lg",
        },
        {
          href: "/buttonExemple",
          title: "Buttons",
          icon: "fas fa-button fa-lg"
        }
      ],
    };
  },
  components: {
    SidebarMenu,
  },
};
</script>
