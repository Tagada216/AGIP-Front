<template>
	<div style="100vh">
		<base-header title="Agence Isolées"></base-header>
		<splitpanes watch-slots class="default-theme" horizontal>
			<div splitpanes-size="0" splitpanes-max="0"></div>

			<grid
				splitpanes-size="50"
				splitpanes-min="15"
				splitpanes-max="100"
				style="height: 100%"
				data-link="http://localhost:5000/api/main-courante/formated"
			/>

			<agence-isolees-form></agence-isolees-form>
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
			components: {},
		};
	},
};
</script>