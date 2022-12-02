<template>
<div class="background-Image">

    <Menu />

	<div v-if="!userLoggedIn" class="container mt-5">
		<div class="row align-items-center">
			<div class="col">
			</div>
			<div class="col-8">
				<div class="shadow-lg p-3 mb-5 bg-body rounded">
					<h5 style="text-align: center; margin-bottom: 3%;">Log in</h5>
	
					<form @submit.prevent="handleSubmit">
						<div class="input-group mb-3">
							<span class="input-group-text">@</span>
							<div class="form-floating">
								<input type="email" v-model="user.email" class="form-control"
									id="floatingInputGroup1" placeholder="Username" required>
								<label for="floatingInputGroup1">Email address</label>
							</div>
						</div>
	
						<div class="form-floating mb-3">
							<input type="password" v-model="user.password" class="form-control" id="floatingPassword"
								placeholder="Password" required>
							<label for="floatingPassword">Password</label>
						</div>
						
						<div class="text-center">
							<button type="submit" class="btn btn-outline-success mx-1">Login</button>
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
			email: '',
			password: '',
        },
		submitting: false,
		error: false,
      }
    },
	
	methods: {
		handleSubmit: function () {
			this.submitting = true
			this.clearStatus()

			if (this.invalidEmail || this.invalidPassword) {
				this.error = true
				return
			}

			this.loginUser(this.user)


		},
		clearStatus: function () {
			this.error = false
		},

		async loginUser(user) {
			if (await this.$store.dispatch('user/loginUser', user)) {
				//login valid				
				this.$router.push('/message/5')
			}
			else {
				//login failed				
				this.error = true
				this.submitting = false
			}

		},

		cancel() {
			this.$router.push('/')
		},
	},
	
	computed: {
		invalidPassword: function () {
			if (this.user.password === '') return true
			else return false
		},

		invalidEmail: function () {
			if (this.user.email === '' || this.user.email.search('@') === -1) return true
			else return false
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