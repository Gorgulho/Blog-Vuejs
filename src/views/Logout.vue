<template>
	<div class="background-Image">

		<Menu />

		<div v-if="userLoggedIn" class="container">
			<div class="row align-items-center">
				<div class="col">
				</div>
				<div class="col-8">
					<div class="card text-center mt-5 bg-secondary">
						<div class="card-body">
							<div class="btn-group" role="group" aria-label="Third group">
								<button @click="cancel()" type="button" class="btn btn-info">Cancel</button>
								<button @click="logout()" type="button" class="btn btn-danger">Logout</button>
							</div>
						</div>
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
								<h1 class="display-4">Login first</h1>
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
			success: false,
			user: {},
		}
	},


	methods: {
		logout: function () {

			this.success = true

			if (this.userLoggedIn) {
				// destroy session
				this.logoutUser(this.user.session_id)
			} else {
				// No user is signed in.
				this.$router.push('/')
			}

		},

		async logoutUser(session_id) {
			if (await this.$store.dispatch('user/logoutUser', session_id)) {

				this.$router.push('/message/6')
			}
		},

		cancel: function () {
			this.$router.push('/')
		},

		getUser() {
			this.user = this.$store.getters['user/getUser']
		},
	},

	created: function () {
		if (this.userLoggedIn) {
			// User is signed in
			this.success = false
		} else {
			// No user is signed in.
			this.success = true
		}
	},

	computed: {
		userLoggedIn: function () {
			this.getUser()
			for (var i in this.user) return true
			return false
		},
	}

}
</script>

<style scoped>
	
</style>