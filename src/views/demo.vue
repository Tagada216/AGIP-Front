# demo.vue

<template>
  <div>
    
  </div>
</template>
<script>

import formSchema from '@/assets/form-newincident'

export default {
    data() {
        return {
            formSchema
        };
    },
    methods: {
        submit() {
            this.$ncformValidate('your-form-name').then(data => {
                if (data.result) {
                    console.log(this.$data.formSchema.value);
                    // do what you like to do
                }
            });
        },
    },
};
</script>


<style lang="sass" scoped>
	div.ncform
		& form
			max-width: 100%
	div form
		max-width: 100%
	ncform
		max-width: 100%

</style>
