<template>
  <div class="h-20 m-0 bg-primaryRed  text-center">
    <span class="inline-block  pt-5 text-white text-3xl font-bold">{{
      title
    }}</span>
    <span v-if="headerName == 'mainCourante'">
      <el-button
        type="primary"
        class="absolute right-60 mt-4 px-8 bg-black"
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
        <button class="header-btn" @click="duplicate()" :idToDuplicate="rowId">
          <i class="fas fa-file  fa-lg"></i>
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
    </span>
  </div>
</template>

<script>
import JsonExcel from 'vue-json-excel';
import serviceApi from "../services/serviceApi";

export default {
  name: "Header",
  props: {
    title: String,
    headerName: String,
    rowId: Number
  },
  data() {
    return {
      exportFileName: "Main Courante"
    };
  },
  components: {
		'download-excel': JsonExcel,
	},
  methods: {
    duplicate() {
      console.log(this.rowId);
      window.location.href = "/#/NewIncident/id=" + this.curID;
      if (this.curID != undefined) {
        // console.log("ID non existant");
      }
    },
    cosip() {
      window.location.href = "/#/Cosip/id=" + this.curID;
      if (this.incident_id == undefined) {
        // console.log("ID non existant");
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
        .replace(/\//g, "-")} ${now.toLocaleTimeString()}`;
    },
    async fetchMainCourrante() {
      const response = await serviceApi.getDatas("incident");
      console.log(response.data)
      return response.data;
    },
    send() {
      var title = {
        testTitle: "testMail"
      };
      this.$http.post("http://localhost:5000/api/email", title);

      console.log("message send");
    }
  }
};
</script>
