<template>
  <div style="100vh">
    <base-header title="Saisie d'un nouvel incident"></base-header>
	<incident-form></incident-form>
  </div>
</template>

<script>

import IncidentForm from '@/components/IncidentForm'

import formSchema from '@/assets/form-newincident';
import axios from 'axios';
//import NcDemo from "@/components/myCustomComp.vue";



export default {
	created(){
		//this.$ncformAddWidget({name:"nc-demo", widget: NcDemo})
	},

    components: {
		//ComPreviewer,
		IncidentForm
    },
    data() {
        return {
			formSchema,
        };
    },
    methods: {
        submit() {
            this.$ncformValidate('your-form-name').then(data => {
                if (data.result) {
					console.log(this.$data.formSchema);
					axios.post("http://localhost:5000/api/main-courante", this.$data.formSchema.value)
                    // do what you like to do
                }
            });
        },
    },
};
</script>

<style lang="sass">
	.__object-form-item
		margin-top: 0
	
	div.ncform
		& form
			max-width: 100%
			margin: 1rem
</style>
