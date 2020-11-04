<template>
    <div style="height: 100%;">
        <ag-grid-vue
            style="width: 100%; height: 100%; min-height: 85%"
            class="ag-theme-balham"
            :rowData="rowData"
            :columnDefs="columnDefs"
            :rowSelection="rowSelection"
            @row-selected="onRowSelected"
        ></ag-grid-vue>
    </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue';

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
    var yearNumber = date.substring(6, 10)
    var monthNumber = date.substring(3, 5)
	var dayNumber = date.substring(0, 2)
	var hoursNumber = date.substring(11,13)
	var minNumber = date.substring(14,16)
	var secNumber = date.substring(17,19)
    var result = yearNumber * 100000000 + monthNumber * 10000 + dayNumber * 100 + hoursNumber;
    return result;
}

export default {
    name: 'LargeDataSetExample',
    data() {
        return {
            rowData: this.rowData,
            columnDefs: this.columnDefs,
            rowSelection: 'single',
        };
    },

    components: {
        'ag-grid-vue': AgGridVue,
    },

    props: {
        dataLink: String,
    },

    mounted() {
        this.$http
            .get(this.dataLink)
            .then(response => this.setGridData(response.data));
    },
    methods: {
        setGridData(data) {
            this.setColDef(Object.keys(data[0]));
            this.rowData = data;
        },
        setColDef(colNames) {
            this.columnDefs = [];
            // console.log(colNames);

            for (const colName of colNames) {
                this.columnDefs.push({
                    field: '' + colName,
                    hide: colName == 'id',
                    width: (1 / (colNames.length / 2)) * 3000,
                    sortable: true,
                    filter: true,
					comparator: colName.includes("Date") ? dateComparator : false,
					sort: colName.includes("Date de début") ? "desc" : false
                });
            }
        },
        //Trigger qui permet de récupérer L'id ou la référence depuis le tableau main courante ou Cosip 
        onRowSelected(event) {
            if (event.node.selected) {
                this.$emit('incidentSelected', event.data.id);
                this.$emit('CosipSelected', event.data.id);
            }
        },
    },
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
