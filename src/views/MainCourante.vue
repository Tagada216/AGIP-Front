<template>
  <div style="100vh">
    <base-header title="Main Courante"></base-header>
    <splitpanes class="default-theme" horizontal>
      <div splitpanes-size="0" splitpanes-max="0"></div>
      <grid
        splitpanes-size="50"
        splitpanes-min="15"
        splitpanes-max="100"
        style="height: 100%"
        @incidentSelected="updateID"
      ></grid>

      <update-incident-form
        splitpanes-size="50"
        splitpanes-min="20"
        splitpanes-max="100"
        :msg="curID"
      ></update-incident-form>
    </splitpanes>
  </div>
</template>



<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue';
import Splitpanes from 'splitpanes';
import UpdateIncidentForm from '@/components/UpdateIncidentForm.vue';
import 'splitpanes/dist/splitpanes.css';

export default {

    data() {
        return { curID: "-1" };
    },

    components: {
        Grid,
        Splitpanes,
        UpdateIncidentForm,
    },

    methods: {
        updateID(id) {
			console.log('old MC : ' + this.curID);
			this.curID = ""+id;
            console.log('new MC : ' + this.curID);
        },
    },
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

</style>