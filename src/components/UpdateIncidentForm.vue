<template>
    <div>
        <span>TEST</span>
        <ncform
            :form-schema="formSchema"
            form-name="your-form-name"
            v-model="formSchema.value"
            style="max-width: 100%"
            :msg="msg"
            @submit="submit()"
        ></ncform>

        <el-button @click="submit()">Enregistrer</el-button>
    </div>
</template>

<script>
import formSchema from '@/assets/form-updateincident';
import axios from 'axios';

export default {
    mounted() {
        //this.formSchema.value.impactsEnseignes.bddf.estImpactee = true
        console.log(this.formSchema.value.impactsEnseignes.bddf.estImpactee);
        this.$forceUpdate();
    },

    props: {
        msg: {
            type: String,
        },
    },

    data() {
        return {
            formSchema,
        };
    },
    methods: {
        submit() {
            console.log(this.msg);
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

    watch: {
        msg: function() {
            console.log(this.msg);
            this.$data.formSchema.value;
        },
    },
};
</script>

<!-- 
	Ici on met le CSS du component mais en SASS (pas SCSS)
	Voir : https://en.wikipedia.org/wiki/Sass_(stylesheet_language)
	Ou : https://sass-lang.com/guide
-->
<style lang="sass">
.__object-form-item
	margin-top: 0

div.ncform
	& form
		max-width: 100%
		margin: 1rem
</style>
