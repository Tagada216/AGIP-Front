<template>
  <div>
    <ncform
      :form-schema="formSchema"
      form-name="your-form-name"
      v-model="formSchema.value"
      style="max-width: 100%"
      @submit="submit()"
    ></ncform>

    <el-button @click="submit()">Enregistrer</el-button>

  </div>
</template>

<script>
import formSchema from '@/assets/form-newincident';
import axios from 'axios';
import NcDemo from "@/components/myCustomComp.vue";



export default {

	created(){
		//this.$ncformAddWidget({name:"nc-demo", widget: NcDemo})
		//console.log(this);
		//this.formSchema.value.applicationImpactee = "lol"


		this.$root.$on('incidentSelected', id => {
            axios.get("http://localhost:5000/api/main-courante/"+id)
				.then(response => {
					var data = response.data[0]
					console.log(this);
					//this.$ncformReset()
					//this.formSchema.value.infosIncident.description = data.description
					
					
				})
        });

		// if (this.idIncident != -1){
		// 	axios.get("http://localhost:5000/api/"+this.idIncident)
		// 		.then(response => console.log(response))
		// }
		
		

	},

    components: {
        //ComPreviewer,
	},
	
	props: {
		idIncident: {
			type: Number,
			default: -1,
		}
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
