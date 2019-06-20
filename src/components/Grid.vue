<template>
    <div>
        <ag-grid-vue
        style="width: 100%; height: 75vh; min-height: 100%"
        class="ag-theme-balham"
        :rowData="rowData"
        :columnDefs="columnDefs"
        :rowSelection="rowSelection"
        @row-selected="onRowSelected"
        @selection-changed="onSelectionChanged"
        ></ag-grid-vue>
    </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue';
import axios from 'axios';

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
    // created() {
    //     // data created here so outside of vue (ie no reactive, not observed)
    //     // also frozen (prob unnecessarily)
    //     this.rowData = [];
    //     for (let i = 0; i < 20; i++) {
    //         this.rowData.push(
    //             Object.freeze({
    //                 ref: 'P9IN-'+ Math.floor(Math.random() * 1000000),
    //                 pfft: 'Aujourd\'hui petit incident sur le CDN qui fait pas du bien au chieng',
    //             })
    //         );
    //     }
    //     this.rowData = Object.freeze(this.rowData);

    //     this.columnDefs = Object.freeze([
    //         { headerName: 'Reference incident', field: 'ref' },
    //         { headerName: 'Value 1', field: 'pfft' },
    //     ]);
    // },
    mounted () {
        axios
            .get('http://localhost:5000/api/incident')
            .then(response => this.setGridData(response.data))
    },
    methods: {
        setGridData(data){
            this.setColDef(Object.keys(data[0]))
            this.rowData = data
        },
        setColDef(colNames){
            this.columnDefs = []
            for (const colName of colNames) {
                this.columnDefs.push({field:""+colName, width:(1/colNames.length)*1000})
            }
        },
        onRowSelected(event) {
            if (event.node.selected){
                window.alert(event.data.id)
                console.log(event);
            }
            
        },
        onSelectionChanged(event) {
            //console.log(event);
        },
    },
};
</script>

<style>
</style>