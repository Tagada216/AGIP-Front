<template>
    <div style="100vh">
        <base-header title="Main Courante">
            <el-tooltip
                class="item"
                effect="light"
                content="Export Excel"
                placement="bottom-end"
            >
                <button class="header-btn">
                    <i class="fas fa-file-excel"></i>
                </button>
            </el-tooltip>
        </base-header>
        <splitpanes watch-slots class="default-theme" horizontal>
            <div splitpanes-size="0" splitpanes-max="0"></div>

            <grid
                splitpanes-size="50"
                splitpanes-min="15"
                splitpanes-max="100"
                style="height: 100%"
                @incidentSelected="updateID"
            />

            <update-incident-form
                :incident_id="curID"
                splitpanes-size="50"
                splitpanes-min="20"
                splitpanes-max="100"
            />
        </splitpanes>
    </div>
</template>



<script>
// @ is an alias to /src
import Grid from '@/components/Grid.vue';
import Splitpanes from 'splitpanes';
import UpdateIncidentForm from '@/components/MyUpdateIncidentForm';
import 'splitpanes/dist/splitpanes.css';

export default {
    data() {
        return { curID: 1 };
    },

    components: {
        Grid,
        Splitpanes,
        UpdateIncidentForm,
    },

    methods: {
        updateID(id) {
            this.curID = id;
        },
    },
};
</script>





<style lang="sass">

div.splitpanes
  height: calc(100vh - 71px)

div.splitpanes__pane
  overflow: auto

#pane_1
  &div
    height: 100%

#pane_2
    background-color: white

div.default-theme.splitpanes--horizontal
    >div.splitpanes__splitter
        background-color: #2a2a2e
        border: none
        height: 12px
        &::before
            background-color: white
        &::after
            background-color: white

.header-btn
    line-height: 70px
    height: 70px
    width: 70px
    padding: 0
    margin: 0
    float: right
    border: none
    color: white
    font-size: 50px
    background-color: #2a2a2e
    &:hover
        background-color: #b7011d
        cursor: pointer
    &:focus
        border: none
</style>