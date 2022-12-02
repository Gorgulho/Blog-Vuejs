<template>
<div class="background-Image">
		
	<Menu />

	<div v-if="error && submitting" class="alert alert-danger text-center" role="alert">
		{{alert}}
	</div>
	
	<!--Register Box-->
	<div class="container mt-5" v-if="!userLoggedIn" id="register-form">
		<div class="row align-items-center">
			<div class="col">
			</div>
			<div class="col-8">
				<div class="shadow-lg p-3 mb-5 bg-body rounded">
					<h5 style="text-align: center; margin-bottom: 3%;">Register</h5>
	
					<form @submit.prevent="handleSubmit">
						<div class="form-floating mb-3">
							<input type="text" v-model="user.name" class="form-control" id="floatingInput"
								placeholder="Name" required>
							<label for="floatingInput">Name</label>
						</div>
						<div class="input-group mb-3">
							<span class="input-group-text">@</span>
							<div class="form-floating">
								<input type="email" class="form-control" id="floatingInputGroup1"
									placeholder="Username" v-model="user.email" required>
								<label for="floatingInputGroup1">Email address</label>
							</div>
						</div>
						<div class="form-floating mb-3">
							<input type="password" v-model="user.password" class="form-control" id="floatingPassword"
								placeholder="Password" required>
							<label for="floatingPassword">Password</label>
						</div>
						<div class="form-floating mb-3">
							<input type="password" v-model="user.passwordRepeat" class="form-control" id="floatingPassword1"
								placeholder="Password" required>
							<label for="floatingPassword1">Repeat password</label>
						</div>
						<div class="text-center">
							<button type="submit" class="btn btn-outline-success mx-1">Regist</button>
							<button @click="cancel()" class="btn btn-outline-warning mx-1">Cancel</button>
						</div>
	
					</form>
				</div>
			</div>
			<div class="col">
			</div>
		</div>
	</div>
	<div v-else>
		<div class="container mt-5">
			<div class="row align-items-center">
				<div class="col">
				</div>
				<div class="col-8">
					<div class="card bg-success text-center">
						<div class="card-body">
							<h1 class="display-4">Logout first</h1>
						</div>
					</div>
				</div>
				<div class="col">
				</div>
			</div>
		</div>
	</div>
	<!--End Register Box-->
	
	<Footer />
</div>
</template>

<script>

import Footer from '@/components/Footer.vue'
import Menu from '@/components/Menu.vue'

export default {
	components: {
		Footer,
        Menu
	},
	data() {
      return {	
        user: {
			name: '',
			email: '',
			password: '',
        },
		passwordConfirmation: '',
		submitting: false,
		error: false,	
      }
    },
	
	methods: {
		handleSubmit: function () {
			this.submitting = true
			this.clearStatus()

			if (this.invalidName) {
				this.error = true
				this.alert = "name"
				return
			}
			else if (this.invalidEmail) {
				this.error = true
				this.alert = "E-mail in invalid format"
				return
			}
			else if (this.invalidPassword) {
				this.error = true
				this.alert = "Password must contain at least 6 characters"
				return
			}
			else if (this.invalidRepeatPassword) {
				this.error = true
				this.alert = "Password does't match Repeat password"
				return
			}

			

			// check if user exists
			this.userExists(this.user)

		},
		async userExists(user) {
			if (await this.$store.dispatch('user/userExists', user)) {
				this.error = true
				this.alert = "Account already exists"
				return
			}
			else {
				// add user
				this.addUser()
			}
		},
		async addUser() {
			if (await this.$store.dispatch('user/addUser')) {
				//success: new user registered
				this.$router.push('/message/4')
			}
			else {
				this.error = true
				this.submitting = true
				return
			}

		},
		clearStatus: function () {
			this.error = false
		},
		cancel() {
			this.$router.push('/')
		},
		

	},
	
	computed: {
		invalidName: function () {
			if (this.user.name === '' || this.user.name.match(/[0-9]/g) != null) return true
			else return false
		},

		invalidPassword: function () {
			if (this.user.password === '' || this.user.password.length < 6) return true
			else return false
		},

		invalidRepeatPassword: function () {
			console.log(this.user.passwordRepeat)
			if (this.submitting && this.user.password !== this.user.passwordRepeat)
				return true
			else
				return false
		},

		invalidEmail: function () {
			const regExpr = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
			if (!this.user.email.match(regExpr))
				return true
			else
				return false
		},

		userLoggedIn: function () {
			let user = this.$store.getters['user/getUser']
			for (var i in user) return true
			return false
		},
	},
	directives: {

	},
	created() {


	}
}
</script>

<style scoped>
	
</style>