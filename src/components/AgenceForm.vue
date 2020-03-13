<template>
	<el-form>
		<el-form-item label="Enseigne(s) impactée(s)" prop="enseigne_impactee">
			<el-checkbox-group v-model="form.enseigne_impactee">
				<el-checkbox
					v-for="enseigne in remoteEnum.enseignes"
					:label="enseigne.id"
					:key="enseigne.id"
					v-if="!enseigne.is_deprecated"
				>{{ enseigne.nom }}</el-checkbox>
			</el-checkbox-group>
		</el-form-item>

		<el-form-item label="Description" prop="description">
			<el-input
				type="textarea"
				:autosize="{ minRows: 2, maxRows: 8 }"
				placeholder="Description"
				v-model="form.description"
			></el-input>
		</el-form-item>

		<el-form-item label="Impact" prop="description_impact">
			<el-input
				type="textarea"
				:autosize="{ minRows: 4, maxRows: 8 }"
				placeholder="Impact"
				v-model="form.description_impact"
			></el-input>
		</el-form-item>
	</el-form>
</template>

<script>
export default {

	props: {
		remoteEnum,
	},

	data() {
		return {
			// Données énumérées venant de l'API
			remoteEnum: {
				priorites: [],
				statut: [],
				enseignes: [],
				application_impactee: [],
			},

			// Données du formulaire
			form: {
				references: [], //
				is_faux_incident: false, //
				date_debut: '', //
				date_fin: null, //
				description: '', //
				description_impact: '', //
				description_contournement: 'Aucun contournement', //
				is_contournement: false, //
				priorite_id: '', //
				statut_id: '', //
				enseigne_impactee: [],
				application_impactee: [],
			},
		};
	},
};
</script>

<style>
</style>