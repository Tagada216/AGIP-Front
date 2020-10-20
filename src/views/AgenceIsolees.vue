<template>
	<div style="100vh">
		<base-header title="Agence Isolées"></base-header>

		<agence-isolees-form></agence-isolees-form>
	</div>
</template>

<script>
import AgenceIsoleesForm from '@/components/AgenceIsoleesForm';

export default {
	components: {
		AgenceIsoleesForm,
	},
};
</script>

