<template>
  <div>
    <div v-if="part === 'horodatage'">
      <el-form-item label="Fin de l'incident">
        <el-date-picker
          v-model="incident.date_fin"
          @change="emitToParent"
          type="datetime"
          placeholder="Selectionnez l'horodatage"
          format="dd/MM/yyyy HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          :disabled="incident.is_faux_incident"
        />
      </el-form-item>

      <el-form-item label="Détection">
        <el-date-picker
          v-model="incident.date_detection"
          @change="emitToParent"
          type="datetime"
          placeholder="Sélectionnez l'horodatage"
          format="dd/MM/yyyy HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>

      <el-form-item label="Communication à la Tour De Contrôle">
        <el-date-picker
          v-model="incident.date_communication_tdc"
          @change="emitToParent"
          type="datetime"
          placeholder="Sélectionnez l'horodatage"
          format="dd/MM/yyyy HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>

      <el-form-item label="Qualification P0 P1">
        <el-date-picker
          v-model="incident.date_qualif_p01"
          @change="emitToParent"
          type="datetime"
          placeholder="Sélectionnez l'horodatage"
          format="dd/MM/yyyy HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>

      <el-form-item label="Première communication à l'enseigne">
        <el-date-picker
          v-model="incident.date_premiere_com"
          @change="emitToParent"
          type="datetime"
          placeholder="Sélectionnez l'horodatage"
          format="dd/MM/yyyy HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>
    </div>
    <div v-if="part == 'info-generale'">
      <el-form-item label="Cause">
        <el-input
          id="cause"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="Cause"
          v-model="incident.cause"
          @change="emitToParent"
        ></el-input>
      </el-form-item>

      <el-form-item label="Origine">
        <el-input
          id="origine"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="Origine"
          v-model="incident.origine"
          @change="emitToParent"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="Action de rétablissement"
        prop="action_retablissement"
      >
        <el-input
          id="action_retablissement"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="Action de rétablissement"
          v-model="incident.action_retablissement"
          @change="emitToParent"
        ></el-input>
      </el-form-item>

      <el-form-item label="Plan d'action" prop="plan_action">
        <el-input
          id="plan_action"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="Plan d'action"
          v-model="incident.plan_action"
          @change="emitToParent"
        ></el-input>
      </el-form-item>
    </div>
  </div>
</template>

<script>
import IncidentClass from "../Class/IncidentClass";

export default {
  props: {
    part: String,
    incident_id: {
      type: Number
    }
  },
  data() {
    return {
      incident: new IncidentClass()
    };
  },
  methods: {
    emitToParent() {
      this.$emit("emit-updateIncident", { inc: this.incident });
    }
  }
};
</script>

<style></style>
