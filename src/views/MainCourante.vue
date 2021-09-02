<template>
	<div style="100vh">
		<base-header title="Main Courante">
			<el-button
				type="primary"
				class="absolute right-60 mt-4 px-8"
				@click="send()"
				>Mail</el-button
			>
			<el-tooltip
				class="item"
				effect="light"
				content="Export Excel"
				placement="bottom-end"
			>
				<button class="header-btn">
					<download-excel
						:fetch="fetchMainCourrante"
						:before-generate="startDownload"
						:name="exportFileName"
					>
						<i class="fas fa-file-excel"></i>
					</download-excel>
				</button>
			</el-tooltip>
			<el-tooltip
				class="item"
				effect="light"
				content="Dupliquer"
				placement="bottom-end"
			>
				<button class="header-btn" @click="duplicate()">
					<i class="fas fa-file"></i>
				</button>
			</el-tooltip>
			<el-tooltip
				class="item"
				effect="light"
				content="COSIP"
				placement="bottom-end"
			>
				<button class="header-btn" @click="cosip()">
					C
				</button>
			</el-tooltip>
		</base-header>
		<splitpanes watch-slots class="default-theme" horizontal>
			<div splitpanes-size="0" splitpanes-max="0"></div>

			<grid
				splitpanes-size="50"
				splitpanes-min="15"
				splitpanes-max="100"
				style="height: 100%"
				@incidentSelected="updateID"
				dataLink="http://localhost:5000/api/main-courante/formated"
			/>

			<update-incident-form
				:incident_id="curID"
				splitpanes-size="50"
				splitpanes-min="20"
				splitpanes-max="100"
			/>
		</splitpanes>
	</div>
</template>

<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue';
import { AgGridVue } from 'ag-grid-vue';
import Splitpanes from 'splitpanes';
import UpdateIncidentForm from '@/components/MyUpdateIncidentForm';
import 'splitpanes/dist/splitpanes.css';
import Axios from 'axios';
import JsonExcel from 'vue-json-excel';
import { constants } from 'crypto';
import methods from '@/components/MyUpdateIncidentForm';

export default {
	name: 'mainCourante',
	data() {
		return {
			curID: 1,
			exportFileName: 'Main Courante',
		};
	},
	components: {
		Grid,
		Splitpanes,
		UpdateIncidentForm,
		'download-excel': JsonExcel,
	},
	methods: {
		updateID(id) {
			this.curID = id;
			console.log("L'id est " + this.curID);
		},
		async fetchMainCourrante() {
			const response = await this.$http.get(
				'http://localhost:5000/api/main-courante/formated'
			);
			return response.data;
		},
		duplicate() {
			console.log(this.curID);
			window.location.href = '/#/new-incident/id=' + this.curID;
			if (this.curID != undefined) {
				console.log('ID non existant');
			}
		},
		cosip() {
			window.location.href = '/#/cosip/id=' + this.curID;
			if (this.incident_id == undefined) {
				console.log('ID non existant');
			} else {
				console.log(this.incident_id);
			}
		},

		startDownload() {
			this.exportFileName = this.getExportTitle();
		},
		getExportTitle() {
			const now = new Date();
			return `Main Courante ${now
				.toLocaleDateString()
				.replace(/\//g, '-')} ${now.toLocaleTimeString()}`;
		},
		send() {
			// let p0_p1_BDDF = [];
			// let p0_p1_BPF = [];
			// let p0_p1_CDN = [];
			// let p2_p3_BDDF = [];
			// let p2_p3_BPF = [];
			// let p2_p3_CDN = [];
			// Axios.get('http://localhost:5000/api/main-courante').then(
			// 	response => {
			// 		let getResponse = response.data;

			// 		getResponse.forEach(item => {
			// 			// console.log(item)
			// 			let enseigne0 = item.enseigne_nom.split('/')[0];
			// 			let enseigne1 = item.enseigne_nom.split('/')[1];
			// 			let enseigne2 = item.enseigne_nom.split('/')[2];

			// 			if (item.priorite === 1 || item.priorite === 2) {
			// 				if (
			// 					enseigne0 === 'BDDF' ||
			// 					enseigne1 === 'BDDF' ||
			// 					enseigne2 === 'BDDF'
			// 				) {
			// 					if (item.statut === 2) {
			// 						p0_p1_BDDF.push(item.priorite);
			// 					}
			// 				}
			// 				if (
			// 					enseigne0 === 'BPF' ||
			// 					enseigne1 === 'BPF' ||
			// 					enseigne2 === 'BPF'
			// 				) {
			// 					if (item.statut === 2) {
			// 						p0_p1_BPF.push(item.priorite);
			// 					}
			// 				}
			// 				if (
			// 					enseigne0 === 'CDN' ||
			// 					enseigne1 === 'CDN' ||
			// 					enseigne2 === 'CDN'
			// 				) {
			// 					if (item.statut === 2) {
			// 						p0_p1_CDN.push(item.priorite);
			// 					}
			// 				}
			// 			} else if (item.priorite === 3 || item.priorite === 4) {
			// 				if (
			// 					enseigne0 === 'BDDF' ||
			// 					enseigne1 === 'BDDF' ||
			// 					enseigne2 === 'BDDF'
			// 				) {
			// 					if (item.statut === 2) {
			// 						p2_p3_BDDF.push(item.priorite);
			// 					}
			// 				}
			// 				if (
			// 					enseigne0 === 'BPF' ||
			// 					enseigne1 === 'BPF' ||
			// 					enseigne2 === 'BPF'
			// 				) {
			// 					if (item.statut === 2) {
			// 						p2_p3_BPF.push(item.priorite);
			// 					}
			// 				}
			// 				if (
			// 					enseigne0 === 'CDN' ||
			// 					enseigne1 === 'CDN' ||
			// 					enseigne2 === 'CDN'
			// 				) {
			// 					if (item.statut === 2) {
			// 						p2_p3_CDN.push(item.priorite);
			// 					}
			// 				}
			// 			}

            //         });
                    
            //         let getIncidents = {
			// 				p0_p1_BDDF: p0_p1_BDDF.length,
			// 				p0_p1_BPF: p0_p1_BPF.length,
			// 				p0_p1_CDN: p0_p1_CDN.length,
			// 				p2_p3_BDDF: p2_p3_BDDF.length,
			// 				p2_p3_BPF: p2_p3_BPF.length,
			// 				p2_p3_CDN: p2_p3_CDN.length,
			// 			};

				
                    
			// 		this.$http.post('http://localhost:5000/api/email', getIncidents);
			// 	}
			// );
			var title = {
				testTitle: 'testMail'
			}
			this.$http.post('http://localhost:5000/api/email', title);

			console.log('message send');
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
