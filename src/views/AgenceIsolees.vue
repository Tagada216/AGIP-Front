<template>
	<div style="100vh">
		<base-header title="Agences Isolées"></base-header>
		 <splitpanes watch-slots class="default-theme" horizontal>
            <div splitpanes-size="0" splitpanes-max="2"></div>

            <grid
                splitpanes-size="50"
                splitpanes-min="15"
                splitpanes-max="100"
                style="height: 100%"
				dataLink="http://localhost:5000/api/agence-isolees/formated"
            />

         <agence-isolees-form
                splitpanes-size="50"
                splitpanes-min="20"
                splitpanes-max="100"
         
         />
        </splitpanes>
		
	</div>
</template>

<script>
import AgenceIsoleesForm from '@/components/AgenceIsoleesForm';
import Grid from '@/components/Grid.vue';
import Splitpanes from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

export default {
	components: {
		AgenceIsoleesForm,
		Grid,
    	Splitpanes
	},

	data() {
        return {};
  	},

	 methods:{
      async fetchAgence() {
            const response = await this.$http.get(
                'http://localhost:5000/api/agence-isolees/formated'
            )
            return response.data;
        },
   }
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
  
 
</style>