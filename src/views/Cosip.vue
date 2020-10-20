<template>
    <div style="100vh">
        <base-header title="COSIP"></base-header>
        
        <splitpanes watch-slots class="default-theme" horizontal>
            <div splitpanes-size="0" splitpanes-max="2"></div>

            <grid
                splitpanes-size="50"
                splitpanes-min="15"
                splitpanes-max="100"
                style="height: 100%"
                @probsSelected="updateRef"
				dataLink="http://localhost:5000/api/probs/cosip/"
            />

            <CosipForm
                :references="curRef"
                splitpanes-size="50"
                splitpanes-min="20"
                splitpanes-max="100"
            />
        </splitpanes>

    </div>
</template>
<script>

import Grid from '@/components/Grid.vue';
import Splitpanes from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';
import CosipForm from '@/components/CosipForm.vue';
import methods from '@/components/CosipForm';
import Axios from 'axios';
import { constants } from 'crypto';

export default {



    components: {
        Grid,
        Splitpanes,
        CosipForm
    },
    
    methods:{
        updateRef(ref) {
            this.curRef = ref;
            console.log("Référence actuelle : " + this.curRef)
        },



    }
};
</script>

<style lang="sass">

div.splitpanes
  height: calc(100vh - 71px)

div.splitpanes__pane
  overflow: auto
</style>