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

export default {
    created() {},

    components: {},

    props: {},

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
                    axios.post(
                        'http://localhost:5000/api/main-courante',
                        this.$data.formSchema.value
                    );
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
