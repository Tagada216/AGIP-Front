# demo.vue

<template>
  <div>
    <base-header title="TEST"></base-header>
    <update-incident-form :incident_id="1"></update-incident-form>
  </div>
</template>

<script>
//import formSchema from '@/assets/form-newincident'
import UpdateIncidentForm from '@/components/MyUpdateIncidentForm';

export default {
    data() {
        return {
        };
    },

    components: {
        UpdateIncidentForm,
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


</style>
