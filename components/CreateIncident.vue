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

          <el-form-item label="Faux incident ?">
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

          <el-form-item label="Fin de l'incident">
            <el-date-picker
              v-model="incident.date_fin"
              type="datetime"
              placeholder="Selectionnez l'horodatage"
              format="dd/MM/yyyy HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              :disabled="incident.is_faux_incident"
            />
          </el-form-item>
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

          <el-form-item
            label="Enseigne(s) impactée(s)"
            prop="enseigne_impactee"
          >
            <el-checkbox-group v-model="incident.enseigne_impactee">
              <el-checkbox
                v-for="enseigne in datas.enseignes"
                :label="enseigne.id"
                :key="enseigne.id"
                >{{ enseigne.nom }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="Description" prop="description">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 8 }"
              placeholder="Description"
              v-model="incident.description"
              spellCheck="true"
            ></el-input>
          </el-form-item>

          <el-form-item label="Impact" prop="description_impact">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8 }"
              placeholder="Impact"
              v-model="incident.description_impact"
              spellCheck="true"
            ></el-input>
          </el-form-item>

          <el-form-item label="Un contournement existe ?">
            <el-col :span="3.5">
              <el-switch
                style="display: block"
                v-model="incident.is_contournement"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="Oui"
                inactive-text="Non"
                @change="setContournementRule()"
              ></el-switch>
            </el-col>
          </el-form-item>

          <el-form-item
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

          <el-table :data="incident.application_impactee" border>
            <el-table-column
              label="Application(s) impactée(s)"
              prop="application_impactee"
            >
              <template slot-scope="scope">
                <el-autocomplete
                  placeholder="Application impactée"
                  v-model="
                    incident.application_impactee[scope.$index].display_name
                  "
                  :fetch-suggestions="getMatchingApplications"
                  value-key="display_name"
                  @select="appSelected"
                ></el-autocomplete>
              </template>
            </el-table-column>
            <el-table-column width="60">
              <template slot="header">
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  circle
                  @click="handleCreateApp()"
                />
              </template>

              <template>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDeleteApp(scope.$index)"
                />
              </template>
            </el-table-column>
            <template slot="empty">
              <span class="arrayFormEmpty">Aucune donnée</span>
            </template>
          </el-table>
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

    <!-- Modal de confirmation de suppression d'une application impactée -->
    <el-dialog
      title="Demande de confirmation"
      :visible.sync="delConfirmationModalVisibleApp"
      width="40%"
      center
    >
      <span>
        Etes vous sur de vouloir supprimer l'application :
        {{ refToDeleteApp }}
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delConfirmationModalVisibleApp = false"
          >Annuler</el-button
        >
        <el-button type="danger" @click="confirmDeleteApp()"
          >Confirmer</el-button
        >
      </span>
    </el-dialog>
    <el-form-item style="text-align: center">
      <el-button
        class="px-4 py-2 rounded-md text-sm font-medium border-b-2 focus:outline-none focus:ring transition text-white bg-blue-500 border-blue-800 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300"
        type="submit"
        @click="submit()"
        >Sauvegarder</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import IncidentClass from "../Class/IncidentClass";
import DataClass from "../Class/DataClass";
import GetData from "../models/GetData";
import GeneralMethod from "../models/GeneralMethod";
import Rule from "../models/Rule";

export default {
  created() {
    this.getFieldsOptions();
  },

  data() {
    return {
      incident: new IncidentClass(),
      datas: new DataClass(),

      // Variables à Généraliser
      // Les lignes suivantes sont des variables nécessaires au modal de suppression
      delConfirmationModalVisible: false,
      delConfirmationModalVisibleApp: false,
      messageConfirmation: true,
      indexRefToDelete: 0,
      indexRefToDeleteApp: 0,
      refToDelete: "",
      refToDeleteApp: "",
      ajoutIncidentsAgencesVisible: false,

      // Règles de validation pour le formulaire
      rules: Rule.rules
    };
  },

  methods: {
    async submit() {
      //  Exemple d'implémentation de class
      //  let incident = new IncidentClass("P21IN-123456789","23/04/2021 14:53:30",1,2,["BDDF"],"Desc",["SDF-AN880 : SDF Psystem (Packaging des Beta Test et Mise A jour Psystem)"],"cause","impact");
      // Exemple de récupération de l'objet incident créer et récupérer du formulaire directement via l'objet incident créer dans data
      // console.log(this.incident.references)
      // Exmple  de récupérations des datas avec fonction lambda
      // let refs;
      // let id = 43;
      // refs = await GetData.getDatas(`cosip/${id}`)
      // console.log(refs)
      // this.$loading = true
      // Exemple de récupération des datas avec une fonction par appel
      //   let refs;
      //   let id = 43;
      //   refs = await GetData.getOneIncidentCosip(id);
      //   console.log(refs);
      //   this.$loading = true;
    },

    // Méthode à Généraliser
    async getFieldsOptions() {
      this.datas.priorites = await GetData.getPriorite();
      this.datas.statut = await GetData.getStatut();
      this.datas.enseignes = await GetData.getEnseigne();
      this.datas.application_impactee = await GetData.getAllApp();
    },

    setContournementRule() {
      this.rules.description_contournement[0].required = !this.rules
        .description_contournement[0].required;
      this.incident.description_contournement = !this.rules
        .description_contournement[0].required
        ? "Aucun contournement"
        : "";
    },

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
      this.incident.references.push({ reference: "" });
    },
    // Les handler pour la table et le modal des applis impactees
    confirmDeleteApp() {
      this.incident.application_impactee.splice(this.indexRefToDeleteApp, 1);
      this.delConfirmationModalVisibleApp = false;
    },
    handleDeleteApp(index) {
      this.indexRefToDeleteApp = index;
      this.refToDeleteApp = this.incident.application_impactee[
        index
      ].application_impactee;
      this.delConfirmationModalVisibleApp = true;
    },
    handleCreateApp() {
      this.incident.application_impactee.push({ display_name: "" });
    },

    getMatchingApplications(requete, retour) {
      if (requete.length > 1) {
        var apps = this.datas.applications;
        var results = requete
          ? apps.filter(this.createAppFilter(requete))
          : apps;
        retour(results);
        //console.log(retour);
      } else {
        retour([{ nom: "" }]);
      }
    },

    // Crée le filtre nécessaire à matcher les applis
    createAppFilter(queryString) {
      return apps => {
        return (
          apps.code_irt.toLowerCase().indexOf(queryString.toLowerCase()) !=
            -1 ||
          apps.trigramme.toLowerCase().indexOf(queryString.toLowerCase()) !=
            -1 ||
          apps.nom.toLowerCase().indexOf(queryString.toLowerCase()) != -1 ||
          apps.libelle_court.toLowerCase().indexOf(queryString.toLowerCase()) !=
            -1
        );
      };
    },

    // Cette méthode est lancée quand un champ d'appli impacté s'est vu selectionné une appli parmis les propositions
    // Quand tel est le cas, on insere les données de l'appli (CI et trigramme) pour pouvoir la relier en BDD
    appSelected(appSelection) {
      const appIndex = this.form.application_impactee
        .map(el => el.display_name)
        .indexOf(appSelection.display_name);
      this.incident.application_impactee[appIndex] = appSelection;
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
