<template>
    <div style="100vh">
        <base-header title="Agences isolées"></base-header>
		<partie-agence></partie-agence>
    </div>
</template>
<script>
import PartieAgence from '@/components/PartieAgence';
import Grid from '@/components/Grid.vue';
import Splitpanes from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

export default {
    components: {
    PartieAgence,
    Grid,
    Splitpanes,
    },

    data() {
        return {};
  },
  
   methods:{
      async fetchAgence() {
            const response = await this.$http.get(
                'http://localhost:5000/api/agence-isolees/formated'
            )
            return response.data;
        },
   }
};
</script>

<style lang="sass">

div.splitpanes
  height: calc(100vh - 71px)

div.splitpanes__pane
  overflow: auto

#pane_1
  &div
    height: 100%

#pane_2
    background-color: white

div.default-theme.splitpanes--horizontal
    >div.splitpanes__splitter
        background-color: #2a2a2e
        border: none
        height: 12px
        &::before
            background-color: white
        &::after
            background-color: white

.header-btn
    line-height: 70px
    height: 70px
    width: 70px
    padding: 0
    margin: 0
    float: right
    border: none
    color: white
    font-size: 50px
    background-color: #2a2a2e
    &:hover
        background-color: #b7011d
        cursor: pointer
    &:focus
        border: none
</style>