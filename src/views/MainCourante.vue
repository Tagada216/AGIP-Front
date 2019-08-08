<template>
  <div style="100vh">
    <base-header title="Main Courante"></base-header>
    <splitpanes class="default-theme" horizontal>
      <div splitpanes-size="0" splitpanes-max="0"></div>
      <grid splitpanes-size="50" splitpanes-min="15" splitpanes-max="100" style="height: 100%"></grid>

      <incident-form splitpanes-size="50" splitpanes-min="20" splitpanes-max="100" v-bind:id-incident="curID"></incident-form>
    </splitpanes>

    <!-- <div class="file-drop-area">
            <span class="fake-btn">Choose files</span>
            <span class="file-msg js-set-number">or drag and drop files here</span>
            <input class="file-input" type="file" multiple>
    </div>-->
  </div>
</template>

<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue';
import Splitpanes from 'splitpanes';
//import formSchema from '@/assets/form-newincident'
import IncidentForm from '@/components/IncidentForm.vue';
import 'splitpanes/dist/splitpanes.css';

export default {
    created() {
        this.$root.$on('incidentSelected', id => {
			this.curID = id
            //console.log(this);
        });
	},
	data() {
		return {curID: -1}
	},
    components: {
        Grid,
        Splitpanes,
        IncidentForm,
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

</style>


<style>
/* .file-drop-area {
  border: 1px dashed #7c7db3;
  border-radius: 3px;
  position: relative;
  width: 450px;
  max-width: 100%;
  margin: 0 auto;
  padding: 26px 20px 30px;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  background-color: #ffd4d4;
}

.fake-btn {
  background-color: #daa6a6;
  border: 1px solid #9E9EC4;
  border-radius: 3px;
  padding: 8px 15px;
  margin-right: 8px;
  font-size: 12px;
  text-transform: uppercase;
}

.file-msg {
  font-size: small;
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: calc(100% - 130px);
  vertical-align: middle;
}

.file-input {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0;
}
.file-input:focus {
  outline: none;
} */
</style>
