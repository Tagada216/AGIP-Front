<template>
	<div style="100vh">
		<base-header title="Agence Isolées"></base-header>
		<splitpanes watch-slots class="default-theme" horizontal>
			<div splitpanes-size="0" splitpanes-max="0"></div>

			<el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
				<el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
			</el-table>

			<agence-isolees-form :on-success="handleSuccess" :before-upload="beforeUpload"></agence-isolees-form>
		</splitpanes>
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
			tableData: [],
			tableHeader: [],
		};
	},

	methods: {
		beforeUpload(file) {
			const isLt1M = file.size / 1024 / 1024 < 1;
			if (isLt1M) {
				return true;
			}
			this.$message({
				message: 'Please do not upload files larger than 1m in size.',
				type: 'warning',
			});
			return false;
		},

		handleSuccess({ results, header }) {
			this.tableData = results;
			this.tableHeader = header;
		},
	},
};
</script>

<style lang="sass">

div.splitpanes
  height: calc(100vh - 71px)



</style>