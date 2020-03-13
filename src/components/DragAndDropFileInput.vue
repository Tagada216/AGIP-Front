<template>
	<el-upload
		class="upload-demo"
		drag
		action="https://jsonplaceholder.typicode.com/posts/"
		:before-upload="handleUpload"
	>
		<i class="el-icon-upload"></i>
		<div class="el-upload__text">
			Déposer le fichier ou
			<em>cliquer sur la zone</em>
		</div>
	</el-upload>
</template>

<script>
export default {
	methods: {
		handleUpload(file) {
			this.$emit('on-upload', file);
		},
	},
};
</script>

<style lang="sass">
.el-upload
	width: 90%
	.el-upload-dragger
		width: 100%
</style>