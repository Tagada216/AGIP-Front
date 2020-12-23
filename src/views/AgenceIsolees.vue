<template>
	<div style="100vh">
		<base-header title="Agences Isolées"></base-header>

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

<style lang="scss">
.card-header,
.cell .el-input {
	margin: 5em;
}
</style>