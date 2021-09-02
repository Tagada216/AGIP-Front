<template>
	<modal v-model="modal" class="loginModal" name="loginModal">
		<div class="login">
			<el-card>
				<h2>Connexion</h2>
				<el-form
					class="login-form"
					:model="model"
					:rules="rules"
					ref="form"
					@submit.native.prevent="login"
				>
					<el-form-item prop="matricule">
						<el-input
							v-model="model.matricule"
							placeholder="Matricule"
							prefix-icon="fas fa-user"
						></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							v-model="model.password"
							placeholder="Mot de passe"
							type="password"
							prefix-icon="fas fa-lock"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button
							:loading="loading"
							class="login-button"
							type="danger"
							native-type="submit"
							block
							>Connexion</el-button
						>
					</el-form-item>
					<a class="forgot-password" href="">Mot de passe oublié ?</a>
				</el-form>
			</el-card>
		</div>
	</modal>
</template>

<script>
import Vue from 'vue';
import VModal from 'vue-js-modal';

Vue.use(VModal, { componentName: 'modal' });

export default {
	name: 'home',
	data() {
		return {
			modal: false,
			// validCredentials: {
			// 	username: 'lightscope',
			// 	password: 'lightscope',
			// },
			model: {
				matricule: '',
				password: '',
			},
			loading: false,
			rules: {
				username: [
					{
						required: true,
						message: 'Nom utilisateur requis',
						trigger: 'blur',
					},
					{
						min: 5,
						message:
							'Le mot de passe doit avoir au moins 5 caractères',
						trigger: 'blur',
					},
				],
				password: [
					{
						required: true,
						message: 'Mot de passe requis',
						trigger: 'blur',
					},
					{
						min: 5,
						message:
							'Le mot de passe doit avoir au moins 5 caractères',
						trigger: 'blur',
					},
				],
			},
		};
	},
	methods: {
		simulateLogin() {
			return new Promise(resolve => {
				setTimeout(resolve, 800);
			});
		},
		async login(e) {
			e.preventDefault();
			let valid = await this.$refs.form.validate();
			if (!valid) {
				return;
			}
			this.loading = true;
			await this.simulateLogin();
			this.loading = false;
		
			
			this.$http
				.post('http://localhost:5000/api/login', {
					matricule: this.model.matricule,
					password: this.model.password,
				})
				.then(response => {
					console.log(response.data);
					if (response.status === 200) {
						sessionStorage.setItem(
							'user',
							JSON.stringify(response)
						);
						sessionStorage.setItem(
							'role',
							JSON.stringify(response.data.role)
						);
						sessionStorage.setItem('jwt', response.data.token);
						if (sessionStorage.getItem('jwt') != null) {
							this.$emit(response.data.status);
							if (this.$route.params.nextUrl != null) {
								this.$route.push(this.$root.params.nextUrl);
							} else {
								this.$router
									.push('new-incident')
									.catch(() => {});
							}
						}
					}
					this.$message.success('Login successfull');
					this.$modal.hide();
					this.connect = true;
					localStorage.connect = this.connect;
				})
				.catch(function(error) {
					console.log(error.response);
				});

			// } else {
			// 	this.$message.error('Username or password is invalid');
			// }
		},
	},
};
</script>
//A487423 // @GiPro
<style lang="scss">
$redColor: #ed1a3a;
$blackColor: #2c3e50;

.login {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}

.login-button {
	width: 100%;
	margin-top: 40px;
}
.login-form {
	width: 290px;
	.el-form-item {
		margin-bottom: 35px !important;
	}
}

.el-input__icon{
	color: $blackColor !important;
}
.forgot-password {
	margin-top: 10px;
}
$red: #ed1a3a;
.el-button--danger {
	background: $red;
	border-color: $red;

	&:hover,
	&.active,
	&:focus {
		background: lighten($red, 7);
		border-color: lighten($red, 7);
	}
}
.login .el-input__inner:hover {
	border-color: $red;
}
.login .el-input__prefix {
	background: rgb(238, 237, 234);
	left: 0;
	height: calc(100% - 2px);
	left: 1px;
	top: 1px;
	border-radius: 3px;
	.el-input__icon {
		width: 30px;
	}
}
.login .el-input input {
	padding-left: 35px;
}

.vm--modal {
	width: 370px !important;
	height: 350px !important;
	border: 10px solid;
	border-image-slice: 1;
	border-width: 5px;
	left: 750px !important;
	border-image-source: linear-gradient(to left, $blackColor, $redColor);
}

.login .el-card {
	padding-top: 0;
	padding-bottom: 30px;
}
h2 {
	font-family: 'Open Sans';
	letter-spacing: 1px;
	font-family: Roboto, sans-serif;
	padding-bottom: 20px;
}
a {
	color: #d1939c;
	text-decoration: none;
	&:hover,
	&:active,
	&:focus {
		color: lighten($red, 7);
	}
}
.login .el-card {
	width: 370px;
	height: 350px;
	display: flex;
	justify-content: center;
}
</style>
