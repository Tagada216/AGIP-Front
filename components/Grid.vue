<template>
  <div style="height: 100%;">
    <ag-grid-vue
      style="width: 100%; height: 100%; min-height: 85%"
      class="ag-theme-material agGridMaterialFont"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :rowSelection="rowSelection"
      @row-selected="onRowSelected"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import IncidentClass from "../Class/IncidentClass";
import Headers from "../models/Headers";
import GeneralMethod from "../models/GeneralMethod";

function dateComparator(date1, date2) {
  var date1Number = monthToComparableNumber(date1);
  var date2Number = monthToComparableNumber(date2);
  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }
  return date1Number - date2Number;
}

function monthToComparableNumber(date) {
  if (date === undefined || date === null || date.length !== 19) {
    return null;
  }
  var yearNumber = date.substring(6, 10);
  var monthNumber = date.substring(3, 5);
  var dayNumber = date.substring(0, 2);
  var hoursNumber = date.substring(11, 13);
  var minNumber = date.substring(14, 16);
  var secNumber = date.substring(17, 19);
  var result =
    yearNumber * 100000000 +
    monthNumber * 10000 +
    dayNumber * 100 +
    hoursNumber;
  return result;
}

export default {
  name: "LargeDataSetExample",
  data() {
    return {
      rowData: this.rowData,
      columnDefs: this.columnDefs,
      rowSelection: "single",
      date_cosip_selec: "",
      url: "",
      setHeader: ""
    };
  },
  components: {
    "ag-grid-vue": AgGridVue
  },

  props: {
    dataLink: String,
    usedIn: String
  },

  mounted() {
    this.$http
      .get(this.dataLink)
      .then(response => this.setGridData(response.data));
  },

  
  methods: {
    setGridData(data) {
      let getFormatedDatas;

      if (this.usedIn == "mainCourante") {
        this.setHeader = Headers.HeaderMainCourante.head;
      }

      getFormatedDatas = GeneralMethod.transformDatasForGrid(data, this.setHeader);
      this.setColDef(Object.keys(getFormatedDatas[0]));
      this.rowData = getFormatedDatas;
    },

    setColDef(colNames) {
      this.columnDefs = [];

      var i = 0;
      var keysHeader = Object.values(this.setHeader);
      var hidden = [];

      for (const colName of colNames) {
        if (colName == keysHeader[i]) {
          this.columnDefs.push({
            field: "" + colName,
            // hide: colName == "id",
            width: (1 / (colNames.length / 2)) * 3000,
            sortable: true,
            filter: true,
            comparator: colName.includes("Date") ? dateComparator : false,
            sort: colName.includes("Date de début") ? "desc" : false
          });
        }

        i++;
      }
    },
    //Trigger qui permet de récupérer L'id ou la référence depuis le tableau main courante ou Cosip
    onRowSelected(event) {
      if (event.node.selected) {
        this.$emit("incidentSelected", event.data.id);
        this.$emit("CosipSelected", event.data.id);
      }
    }
  },
  watch: {
    cosip_url: function cosipUrlUpdate() {
      this.$forceUpdate();
    }
  }
};
</script>

<!-- 
	Ici on met le CSS du component mais en SASS (pas SCSS)
	Voir : https://en.wikipedia.org/wiki/Sass_(stylesheet_language)
	Ou : https://sass-lang.com/guide
-->
<style lang="sass" scoped>
.grid-search
	height: 15%
	font-size : 1.8em

	& svg
		font-size : 2em
		color: #5f5f5f

input
	height: 100%
	width: 95%
	border: none
	font-size : 2em
	background-color: transparent
</style>
