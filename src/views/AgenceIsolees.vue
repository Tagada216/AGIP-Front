<template>
	<div style="100vh">
		<base-header title="Agence Isolées"></base-header>
		

			<!-- <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
				<el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
			</el-table>-->


			<agence-isolees-form></agence-isolees-form>
		
	</div>
</template>

<script>
import AgenceIsoleesForm from '@/components/AgenceIsoleesForm';
import Grid from '@/components/Grid.vue';
import Splitpanes from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import Axios from 'axios';
import JsonExcel from 'vue-json-excel';

export default {
	components: {
		Grid,
		Splitpanes,
		AgenceIsoleesForm,
	},


	data() {
		return {
			// tableData: [],
			// tableHeader: [],
		};
	},

	methods: {
		// handleSuccess({ results, header }) {
		// 	this.tableData = results;
		// 	this.tableHeader = header;
		// },
	},
};
</script>

<style lang="sass">

div.splitpanes
  height: calc(100vh - 71px)



</style>