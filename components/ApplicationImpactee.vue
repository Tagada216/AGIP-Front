<template>
  <div>
    <el-table :data="incident.incident_application_impactees" border>
      <el-table-column
        label="Application(s) impactée(s)"
        prop="application_impacteeincident_application_impactees"
        :getApps="getApplicationMainCourante(sendApp)"
      >
        <template slot-scope="scope">
          <el-autocomplete
            class="w-2/3"
            placeholder="Application Impactée"
            v-model="
              incident.incident_application_impactees[scope.$index].display_name
            "
            :fetch-suggestions="getMatchingApplications"
            value-key="nom"
            @select="appSelected"
            @change="emitToForm"
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

        <template slot-scope="scope">
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
  </div>
</template>

<script>
import IncidentClass from "../Class/IncidentClass";
import DataClass from "../Class/DataClass";
import GeneralMethod from "../models/GeneralMethod";
import IncidentForm from "@/components/IncidentForm.vue";
export default {
  props: {
    sendApp: []
  },
  created() {
    GeneralMethod.getFieldsOptions().then(res => {
      // Class permettant de récupérer les données des menu déroulant + applications
      this.datas = res;
      this.apps = this.datas.application_impactee;
    });
  },
  data() {
    return {
      delConfirmationModalVisibleApp: false,
      datas: new DataClass(),
      incident: new IncidentClass(),
      indexRefToDelete: 0,
      indexRefToDeleteApp: 0,
      refToDelete: "",
      refToDeleteApp: "",
      apps: []
    };
  },
  methods: {
    // Les handler pour la table et le modal des applis impactees
    confirmDeleteApp() {
      this.incident.incident_application_impactees.splice(
        this.indexRefToDeleteApp,
        1
      );
      this.delConfirmationModalVisibleApp = false;
    },
    handleDeleteApp(index) {
      this.indexRefToDeleteApp = index;
      this.refToDeleteApp = this.incident.incident_application_impactees[
        index
      ].application_impactee;
      this.delConfirmationModalVisibleApp = true;
    },
    handleCreateApp() {
      this.incident.incident_application_impactees.push({ display_name: "" });
    },

    getMatchingApplications(requete, retour) {
      if (requete.length > 1) {
        let results = requete
          ? this.apps.filter(this.createAppFilter(requete))
          : this.apps;

        retour(results);
      } else {
        return [{ nom: "" }];
      }
    },

    // Crée le filtre nécessaire à matcher les applis
    createAppFilter(queryString) {
      return apps => {
        if (apps.libelle_court !== null) {
          return (
            apps.code_irt.toLowerCase().indexOf(queryString.toLowerCase()) !=
              -1 ||
            apps.trigramme.toLowerCase().indexOf(queryString.toLowerCase()) !=
              -1 ||
            apps.nom.toLowerCase().indexOf(queryString.toLowerCase()) != -1 ||
            apps.libelle_court
              .toLowerCase()
              .indexOf(queryString.toLowerCase()) != -1
          );
        } else {
          return (
            apps.code_irt.toLowerCase().indexOf(queryString.toLowerCase()) !=
              -1 ||
            apps.trigramme.toLowerCase().indexOf(queryString.toLowerCase()) !=
              -1 ||
            apps.nom.toLowerCase().indexOf(queryString.toLowerCase()) != -1
          );
        }
      };
    },

    // Cette méthode est lancée quand un champ d'appli impacté s'est vu selectionné une appli parmis les propositions
    // Quand tel est le cas, on insere les données de l'appli (CI et trigramme) pour pouvoir la relier en BDD
    appSelected(appSelection) {
      const appIndex = this.incident.incident_application_impactees
        .map(el => el.nom)
        .indexOf(appSelection.nom);
      this.incident.incident_application_impactees[appIndex] = appSelection;
    },

    emitToForm() {
      this.$emit("emit-appImpactee", {
        app: this.incident.incident_application_impactees
      });
    },

    getApplicationMainCourante(param) {
      this.incident.incident_application_impactees = param;
    }
  }
};
</script>

<style></style>
