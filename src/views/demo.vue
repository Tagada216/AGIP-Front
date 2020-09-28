# demo.vue

<template>
    <div style="100vh">
        <base-header title="Liste des problèmes">
            <el-tooltip class="item" effect="light" content="Export Global" placement="bottom-end">
                <button class="header-btn">
                    <download-excel
                        :fetch="fetchProblem"
                        :name="exportFileName"
						:before-generate="setExportTitlePB"
                    >
                        <i class="fas fa-file-excel"></i>
                    </download-excel>
                </button>
            </el-tooltip>

            <el-tooltip class="item" effect="light" content="Export COPER" placement="bottom-end">
                <button class="header-btn" @click="getFichesCoper">CPR</button>
            </el-tooltip>

            <el-tooltip class="item" effect="light" content="Export COSIP" placement="bottom-end">
                <button class="header-btn">
                    <download-excel
                        :fetch="fetchCOSIP"
                        :name="exportFileName"
						:before-generate="setExportTitleCOSIP"
                    >C</download-excel>
                </button>
            </el-tooltip>
        </base-header>
       
        <grid class="grid" data-link="http://localhost:5000/api/probs" />
    </div>
</template>

<script>
import Grid from '@/components/Grid.vue';
import JsonExcel from 'vue-json-excel';


export default {
    data() {
        return {
			exportFileName: '',
        };
    },

    components: {
        Grid,
        'download-excel': JsonExcel,
    },

    methods: {
        async fetchProblem() {
            const response = await this.$http.get(
                'http://localhost:5000/api/probs'
            );
            return response.data;
		},
		
        async fetchCOSIP() {
            const response = await this.$http.get(
                'http://localhost:5000/api/probs/cosip'
            );
            return response.data;
		},
		
		getFichesCoper(){
			window.open('http://localhost:5000/api/probs/coper')
		},

        setExportTitleCOSIP() {
			const now = new Date();
            this.exportFileName = `Problemes COSIP ${now
                .toLocaleDateString()
                .replace(/\//g, '-')} ${now.toLocaleTimeString()}`;
		},
		
		setExportTitlePB() {
			const now = new Date();
            this.exportFileName = `Problemes ${now
                .toLocaleDateString()
                .replace(/\//g, '-')} ${now.toLocaleTimeString()}`;
        },
    },

    // methods: {
    //     submit() {
    //         this.$ncformValidate('your-form-name').then(data => {
    //             if (data.result) {
    //                 console.log(this.$data.formSchema.value);
    //                 // do what you like to do
    //             }
    //         });
    //     },
    // },
};
</script>

<style lang="sass" scoped>

.header-btn
    line-height: 70px
    height: 70px
    width: 70px
    padding: 0
    margin: 0
    float: right
    border: none
    color: white
    font-size: 30px
    div 
        font-size: 50px

    background-color: #2a2a2e
    &:hover
        background-color: #b7011d
        cursor: pointer
    &:focus
        border: none

.grid
    max-height: calc(100vh - 70px)

</style>
