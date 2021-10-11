<template>
    <div>
        <Header title="COSIP" />
        <div>
        <splitpanes watch-slots class="default-theme" horizontal>
			<div splitpanes-size="0" splitpanes-max="0"></div>

			<grid
				style="height: 100%"
				splitpanes-size="50"
				splitpanes-min="15"
				splitpanes-max="100"
				dataLink="http://localhost:5000/api/cosip"
			/>
				
			<!-- @incidentSelected="updateID" -->

			<!-- <update-incident-form
				:incident_id="curID"
				splitpanes-size="50"
				splitpanes-min="20"
				splitpanes-max="100"
			/> -->
		</splitpanes>
        </div>
        <IncidentForm pageName='Cosip' />

    </div>
    
</template>

<script>
import Splitpanes from "splitpanes";
export default {
	components: {
		Splitpanes,
		// UpdateIncidentForm,
		// 'download-excel': JsonExcel,
	},
}
</script>

<style scoped lang="sass">
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