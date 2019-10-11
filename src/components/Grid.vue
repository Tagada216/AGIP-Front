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
		dataLink: String
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
                    width: (1 / (colNames.length/2)) * 3000,
                    sortable: true,
                    filter: true,
                });
            }
        },
        onRowSelected(event) {
            if (event.node.selected) {
                this.$emit('incidentSelected', event.data.id);
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
