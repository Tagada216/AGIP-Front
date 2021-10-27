<template>
  <sidebar-menu widthCollapsed="7em" collapsed :menu="menu" />
</template>

<style lang="sass">
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss"

.v-sidebar-menu > .vsm-list 
    display: flex
    flex-direction: column
    flex-wrap: wrap
    margin-top: 1em
    


.v-sidebar-menu .vsm-title 
   padding-left: 4em


.v-sidebar-menu
    background-color: #DC4941
    & .vsm-link
        color:  #FFF

    & .vsm-item.mobile-item
        & > .vsm-link
            color: #FFF

        & > .vsm-icon
            color: $mobileIconColor
            background-color: #DC4941



    & .vsm-item.first-item
        margin-bottom: 2em
        & > .vsm-link
            & > .vsm-icon
                color:  #FFF
                background-color: #DC4941
                text-align: center
                padding-left: 1em


        &.active-item > .vsm-link, &.parent-active-item > .vsm-link
            box-shadow: 3px 0px 0px 0px #231F20 inset
            & > .vsm-icon
                color: #FFF
                background-color: #DC4941



    &.rtl .vsm-item.first-item
        &.active-item > .vsm-link, &.parent-active-item > .vsm-link
            box-shadow: -3px 0px 0px 0px #DC4941 inset


    &.vsm-default
        & .vsm-item.first-item
            &.open-item > .vsm-link
                color: #FFF
                background-color: #DC4941
                & > .vsm-icon
                    color: #FFF
                    background-color: #DC4941

        & .vsm-link:hover
            color: #231F20
            background-color: #DC4941

    & .vsm-dropdown
        & > .vsm-list
            background-color: $dropDownBg
            & .vsm-link
                color: $dropDownColor

            & .vsm-link:hover
                color: $itemHoverColor
                background-color: $itemHoverBg

    & .vsm-mobile-bg
        background-color: #231F20


    & .vsm-header
        color: #231F20

    & .vsm-badge.default-badge
        color: #FFF
        background-color: #DC4941

    & .collapse-btn
        color: #FFF
        background-color: #231F20
</style>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
import "@fortawesome/fontawesome-free/css/all.css";
export default {
  name: "Sidebar",
  data() {
    return {
      menu: [
        {
          href: "/",
          title: "Accueil",
          icon: "fa fa-home fa-lg"
        },
        {
          header: true,
          title: "Incidents"
        },
        {
          href: "/NewIncident",
          title: "Nouvel incident",
          icon: "fas fa-pen fa-lg"
        },
        {
          href: "/agence-isolees",
          title: "Agence Isolées",
          icon: "fas fa-folder-plus fa-lg"
        },
        {
          href: "/MainCourante",
          title: "Main courante",
          icon: "fas fa-book-open fa-lg"
        },
        {
          href: "/cosip",
          title: "COSIP",
          icon: "fas fa-tasks fa-lg"
        },
        {
          header: true,
          title: "Reportings"
        },

        {
          href: "/statistique",
          title: "Statistiques",
          icon: "fas fa-chart-bar fa-lg"
        },
        {
          href: "/buttonExemple",
          title: "Buttons",
          icon: "fas fa-button fa-lg"
        }
      ]
    };
  },
  components: {
    SidebarMenu
  }
};
</script>
