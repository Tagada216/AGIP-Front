<template>
	<div style="100vh">
		<base-header title="Gestion des agences isolées"></base-header>
		<el-form ref="form" :model="form" :rules="rules" label-position="top">
			<el-row :gutter="20">
				<el-col :span="8">
					<!-- Références incident -->
					<el-card>
						<div slot="header">
							<h4 class="card-header">Zone de dépose du fichier des agences</h4>
						</div>

						<dnd-file-input @on-upload="handleFile" style="text-align: center"></dnd-file-input>
					</el-card>
				</el-col>
				<el-col :span="16">
					<el-card>
						<div slot="header">
							<h4 class="card-header">Prévisualisation des données</h4>
						</div>
						<el-table :data="previewTable.data" stripe style="width: 100%">
							<el-table-column
								v-for="(item, index) in previewTable.headers"
								:key="index"
								:label="item.title"
								:prop="item.prop"
							></el-table-column>
						</el-table>
					</el-card>
				</el-col>
			</el-row>
			<el-row>
				<el-tabs type="border-card" v-if="previewTable.data.length != 0">
					<el-tab-pane v-for="(item, index) in previewTable.data" :label="item.ref" :key="index">
						<agence-form :remote-enum="remoteEnum"></agence-form>
					</el-tab-pane>
				</el-tabs>
			</el-row>
		</el-form>
	</div>
</template>
<script>
import DndFileInput from '../components/DragAndDropFileInput';
import readXlsxFile from 'read-excel-file';
import { arraySlugToHeader, arraySlugifier, arrayToJSON } from '../etlUtils';
import AgenceForm from '../components/AgenceForm';

export default {
	name: 'agences',
	components: {
		DndFileInput,
		AgenceForm,
	},

	created() {
		this.getFieldsOptions();
	},

	data() {
		return {
			form: {},
			rules: {},
			previewTable: {
				data: [],
				headers: [
					{ title: 'Référence', prop: 'ref' },
					{ title: 'Début', prop: 'debut' },
					{ title: 'Fin', prop: 'fin_incident' },
					//{ title: 'Statut', prop: 'etat'},
					{ title: 'Utilisateurs', prop: 'nombre_utilisateurs' },
				],
			},
			remoteEnum: {
				priorites: [],
				statut: [],
				enseignes: [],
				application_impactee: [],
			},
		};
	},

	methods: {
		handleFile(file) {
			readXlsxFile(file).then(rows => {
				// On transfore le tableau extrait de l'excel en JSON
				var agencesJSON = arrayToJSON(rows);

				var idEnseigne = file.name.toLowerCase().includes('cdn')
					? 2 // Si c'est 'cdn' on met 2
					: file.name.toLowerCase().includes('bddf')
					? 1 // Sinon si c'est 'bddf' on met 1
					: 3; // Sinon on met 3

				for (const agence of agencesJSON) {
					agence.debut.setHours(agence.debut.getHours() - 14);
					agence.debut = agence.debut.toLocaleString();

					agence.fin_incident === null
						? null
						: agence.fin_incident.setHours(
								agence.fin_incident.getHours() - 14
						  );
					agence.fin_incident === null
						? 'En cours'
						: (agence.fin_incident = agence.fin_incident.toLocaleString());

					agence.idEnseigne = idEnseigne;

					// Statut
					agence.etat.includes('Clos')
						? (agence.id_status = 5)
						: (agence.id_status = 2);

					agence.impact =
						agence.nombre_utilisateurs +
							agence.nombre_utilisateurs ==
						1
							? ' utilisateur'
							: ' utilisateurs';
					// Priorité
					//agence.prio = this.remoteEnum.priorites.find(el => el.priorite == agence.prio).id
					//console.log(agence);
				}
				console.log(agencesJSON);

				this.previewTable.data = agencesJSON;
			});
		},
		getFieldsOptions() {
			// Obtention des prioritées
			this.$http
				.get('http://localhost:5000/api/incidents/priorite')
				.then(response => {
					this.remoteEnum.priorites = response.data;
				});

			// Obtention des statuts
			this.$http
				.get('http://localhost:5000/api/incidents/statut')
				.then(response => {
					this.remoteEnum.statut = response.data;
				});

			// Obtention des enseignes
			this.$http
				.get('http://localhost:5000/api/enseignes')
				.then(response => {
					this.remoteEnum.enseignes = response.data;
				});

			// Obtention des applications
			this.$http
				.get('http://localhost:5000/api/applications')
				.then(response => {
					this.remoteEnum.applications = response.data;
				});
		},
	},
};
</script>

<style lang="sass">
.el-form
	margin: 20px
	text-align: left

.card-header, .cell .el-input
	margin: 0

.el-card
	margin-bottom: 20px
	min-height: 320px

.el-checkbox-group
	text-align: center

.el-date-editor.el-input, .el-select, .el-autocomplete
	width: 100%

label.el-form-item__label
	line-height: 15px

</style>