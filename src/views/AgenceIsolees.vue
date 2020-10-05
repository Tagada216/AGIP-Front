<template>
	<div style="100vh">
		<base-header title="Agence Isolées"></base-header>
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
import { constants } from 'crypto';

export default {
	components: {
		AgenceIsoleesForm,
	},

	data() {
		return {
			components: {
				
			},
		};
	},
};
</script>