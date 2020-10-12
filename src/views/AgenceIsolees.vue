<template>
	<div style="100vh">
		<base-header title="Agence Isolées"></base-header>
		<splitpanes watch-slots class="default-theme" horizontal>
			<div splitpanes-size="0" splitpanes-max="0"></div>

			<!-- <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
				<el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
			</el-table>-->

			<div class="container-responsive">
				<div class="row">
					<div class="col-md-12">
						<table class="table table-striped table-hover table-condensed table-responsive">
							<thead>
								<tr>
									<th v-for="item in state.headers"
									:key="item.headers">
										{{item}}
									</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="item in state.tickets"
								:key="item.tickets">
									<!-- <td v-for="key in item"
									:key="key.item"
									:label="key.item">
									</td> -->
								</tr>
								<!-- <p>{{item.key}}</p> -->
							</tbody>
							<tfoot></tfoot>
						</table>
					</div>
				</div>
			</div>

			<agence-isolees-form :on-success="handleSuccess"></agence-isolees-form>
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
			state: {
				tickets: [{ name: 'test' }],
				headers: ['Test header'],
			},
			// tableData: [],
			// tableHeader: [],
		};
	},

	// methods: {
	// 	handleSuccess({ results, header }) {
	// 		this.tableData = results;
	// 		this.tableHeader = header;
	// 	},
	// },
};
</script>

<style lang="sass">

div.splitpanes
  height: calc(100vh - 71px)



</style>