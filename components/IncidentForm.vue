<template>
  <el-form
    class="m-8 text-left"
    ref="form"
    :model="incident"
    :rules="rules"
    label-position="top"
  >
    <el-row :gutter="20">
      <el-col :span="6">
        <!-- Références incident -->
        <el-card>
          <div slot="header">
            <h4 class="card-header">Référence(s) de l'incident</h4>
          </div>
          <el-table :data="incident.references" border>
            <el-table-column label="Référence">
              <template slot-scope="scope">
                <el-input
                  v-model.trim="incident.references[scope.$index].reference"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template slot="header">
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  circle
                  @click="handleCreate()"
                />
              </template>
              <template slot-scope="scope">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDelete(scope.$index)"
                />
              </template>
            </el-table-column>
            <template slot="empty">
              <span class="arrayFormEmpty">Aucune donnée</span>
            </template>
          </el-table>
        </el-card>
        <!-- Fin Références incident -->

        <!-- Horodatages -->
        <el-card>
          <div slot="header">
            <h4 class="card-header">Horodatages de l'incident</h4>
          </div>

          <el-form-item label="Début de l'incident" prop="date_debut">
            <el-date-picker
              v-model="incident.date_debut"
              type="datetime"
              placeholder="Selectionnez l'horodatage"
              format="dd/MM/yyyy HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>

          <!-- Utilisation du Composant COSIP_Form et selection de la partie à afficher Horodatage   -->
          <CosipForm v-if="pageName == 'Cosip'" part="horodatage" />
          <!--------------------------------------------------------------------------------------->

          <el-form-item
            v-if="pageName == 'NewIncident'"
            label="Faux incident ?"
          >
            <el-col :span="3.5">
              <el-switch
                style="display: block"
                v-model="incident.is_faux_incident"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="Oui"
                inactive-text="Non"
              ></el-switch>
            </el-col>
          </el-form-item>

          <el-form-item
            v-if="pageName == 'NewIncident'"
            label="Fin de l'incident"
          >
            <el-date-picker
              v-model="incident.date_fin"
              type="datetime"
              placeholder="Selectionnez l'horodatage"
              format="dd/MM/yyyy HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              :disabled="incident.is_faux_incident"
            />
          </el-form-item>
          <UpdateIncidentForm
            v-if="pageName === 'UpdateIncident'"
            part="horodatage"
            :sendUpdateFields = sendUpdateFieldsOnSelect
          ></UpdateIncidentForm>
        </el-card>
        <!-- Fin Horodatage -->
      </el-col>
      <el-col :span="18">
        <!-- Infos générales incident -->
        <el-card>
          <div slot="header">
            <h4 class="card-header">Informations générales de l'incident</h4>
          </div>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="Priorité" prop="priorite_id">
                <el-select v-model="incident.priorite_id">
                  <el-option
                    v-for="item in datas.priorites"
                    :key="item.id"
                    :label="item.priorite"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="Statut" prop="statut_id">
                <el-select v-model="incident.statut_id">
                  <el-option
                    v-for="item in datas.statut"
                    :key="item.id"
                    :label="item.nom"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- La partie COSIP information générale -->
          <CosipForm
            v-if="pageName == 'Cosip'"
            part="info-generale"
            @emitCosip="setCosipForm"
          />
          <!----------------------------------------->

          <el-form-item
            v-if="pageName == 'NewIncident' || pageName == 'UpdateIncident'"
            label="Enseigne(s) impactée(s)"
            prop="enseigne_impactee"
          >
            <el-checkbox-group v-model="incident.enseigne_impactee">
              <el-checkbox
                v-for="enseigne in datas.enseignes"
                :label="enseigne.id"
                :key="enseigne.id"
                v-if="!enseigne.is_deprecated"
                >{{ enseigne.nom }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>

          <el-form-item
            v-if="pageName == 'NewIncident' || pageName == 'UpdateIncident'"
            label="Description"
            prop="description"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 8 }"
              placeholder="Description"
              v-model="incident.description"
              spellCheck="true"
            ></el-input>
          </el-form-item>

          <el-form-item
            v-if="pageName == 'NewIncident' || pageName == 'UpdateIncident'"
            label="Impact"
            prop="description_impact"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="Impact"
              v-model="incident.description_impact"
              spellCheck="true"
            ></el-input>
          </el-form-item>

          <el-form-item
            v-if="pageName == 'NewIncident' || pageName == 'UpdateIncident'"
            label="Un contournement existe ?"
          >
            <el-col :span="3.5">
              <el-switch
                style="display: block"
                v-model="incident.is_contournement"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="Oui"
                inactive-text="Non"
                @change="
                  rules.description_contournement[0].required =
                    !rules.description_contournement[0].required &&
                    (incident.description_contournement = !rules
                      .description_contournement[0].required
                      ? 'Aucun contournement'
                      : '')
                "
              ></el-switch>
            </el-col>
          </el-form-item>

          <el-form-item
            v-if="pageName == 'NewIncident' || pageName == 'UpdateIncident'"
            label="Description du contournement"
            prop="description_contournement"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="Contournement"
              v-model="incident.description_contournement"
              :disabled="!incident.is_contournement"
              spellCheck="true"
            ></el-input>
          </el-form-item>

          <UpdateIncidentForm
            v-if="pageName === 'UpdateIncident'"
            part="info-generale"
            @emit-updateIncident="setUpdateIncident"
            :sendUpdateFields = sendUpdateFieldsOnSelect
          ></UpdateIncidentForm>

          <ApplicationImpactee
            v-if="pageName == 'NewIncident' || pageName == 'UpdateIncident'"
            @emit-appImpactee="setAppImpactee" 
            :sendApp = appIncident
          ></ApplicationImpactee>
          
        </el-card>
        <!-- Fin Infos générales incident -->
      </el-col>
    </el-row>

    <!-- Modal de confirmation de suppression d'une reférence problème -->
    <el-dialog
      title="Demande de confirmation"
      :visible.sync="delConfirmationModalVisible"
      width="40%"
      center
    >
      <span>
        Etes vous sur de vouloir supprimer la référence :
        {{ refToDelete }}
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delConfirmationModalVisible = false"
          >Annuler</el-button
        >
        <el-button type="danger" @click="confirmDelete()">Confirmer</el-button>
      </span>
    </el-dialog>
    <!-- Fin Modal de confirmation de suppression d'une reférence problème -->

    <el-form-item v-if="pageName == 'NewIncident'" style="text-align: center">
      <el-button
        class="px-4 py-2 rounded-md text-sm font-medium border-b-2 focus:outline-none focus:ring transition text-white bg-blue-500 border-blue-800 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300"
        type="submit"
        @click="submit()"
        >Sauvegarder</el-button
      >
    </el-form-item>
     <el-form-item  v-if="pageName === 'UpdateIncident'" style="text-align: center">
      <el-button
        class="px-4 py-2 rounded-md text-sm font-medium border-b-2 focus:outline-none focus:ring transition text-white bg-blue-500 border-blue-800 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300"
        type="submit"
        @click="save()"
        >Sauvegarder</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import IncidentClass from "../Class/IncidentClass";
import DataClass from "../Class/DataClass";
import Cosip from "../Class/CosipClass";
import GeneralMethod from "../models/GeneralMethod";
import { setContournementRule } from "../models/GeneralMethod";
import Rule from "../models/Rule";
import ImpactEnseigneClass from "../Class/ImpactEnseigneClass";
import serviceApi from "../services/serviceApi";

export default {
  props: {
    pageName: String, // PageName Props permetant de moduler le formulaire en fonction de sa page de présence
    incident_id: {
      type: Number
    },
  },
  created() {
    GeneralMethod.getFieldsOptions().then(res => {
      // Class permettant de récupérer les données des menu déroulant + applications
      this.datas = res;
    });
  },

  data() {
    return {
      incident: new IncidentClass(),
      datas: new DataClass(),
      iEnseigne: new ImpactEnseigneClass(),
      cosip: new Cosip(),
      // Variables à Généraliser
      // Les lignes suivantes sont des variables nécessaires au modal de suppression
      delConfirmationModalVisible: false,
      messageConfirmation: true,
      indexRefToDelete: 0,
      indexRefToDeleteApp: 0,
      refToDelete: "",
      refToDeleteApp: "",
      ajoutIncidentsAgencesVisible: false,

      // Règles de validation pour le formulaire
      rules: Rule.rules,
      appIncident : [],
      sendUpdateFieldsOnSelect : {}
    };
  },

  methods: {
    async submit() {
      console.log("Incident: ", this.incident);
      console.log("Impact Enseigne: ", this.iEnseigne);
      console.log("Cosip: ", this.cosip);
    },
    async save(){
      console.log("save main courante")
      console.log("Incident: ", this.incident);
      console.log("id :" , this.incident_id);
    },
    setUpdateIncident(payload) {
      console.log("Payload: ", payload);
      this.incident = payload.inc;
    },
    setCosipForm(payload) {
      console.log("Payload: ", payload);
      this.incident = payload.inc;
      this.iEnseigne = payload.ienseigne;
      this.cosip = payload.cosip;
    },
    setAppImpactee(payload) {
      console.log("App: ", payload);
      this.incident.application_impactee = payload.app;
    },
    // Méthode à Généraliser

    confirmDelete() {
      this.incident.references.splice(this.indexToDelete, 1);
      this.delConfirmationModalVisible = false;
    },
    handleDelete(index) {
      this.indexToDelete = index;
      this.refToDelete = this.incident.references[index].reference;
      this.delConfirmationModalVisible = true;
    },
    handleCreate() {
      this.incident.references.push({ reference: "" });getIncident
    },

    async getIncident(idIncident) {
      const recupData = await serviceApi.getDatas("incident/" + idIncident);

      this.incident = GeneralMethod.transformDatasForm(recupData, this.incident, this.incident_id);
      
      this.appIncident = this.incident.application_impactee
      
      this.sendUpdateFieldsOnSelect = this.incident
    },
  },

  watch: {
    incident_id: function() {
      this.getIncident(this.incident_id);
    }
  }
};
</script>

<style scoped lang="sass">
.el-form
	margin: 20px
	text-align: left
.card-header, .cell .el-input
	margin: 0
.el-card
	margin-bottom: 20px
.el-checkbox-group
	text-align: center
.el-date-editor.el-input, .el-select, .el-autocomplete
	width: 100%
label.el-form-item__label
	line-height: 15px
.arrayFormEmpty
	color: red
th:first-child .cell
	&::before
		content: "* "
		color: red
</style>
