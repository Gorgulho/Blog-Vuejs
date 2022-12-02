<template>
    <div>
		<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #095256;">
			<div class="container-fluid">
				<router-link to="/"><a class="navbar-brand navbar-brand-correct" href="{$link1}">Things Blog</a></router-link>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
					<ul class="navbar-nav">
						<li class="nav-item">
							<router-link to="/"><a class="nav-link active rounded-3" aria-current="page" href="">Home</a></router-link>
						</li>
						<li class="nav-item">
							<div v-if="!userLoggedIn">
								<router-link to="/login"><a class="nav-link active rounded-3" aria-current="page" href="">Login</a></router-link>
							</div>
							<div v-else>
								<router-link to="/logout"><a class="nav-link active rounded-3" aria-current="page" href="">Logout</a></router-link>
							</div>
						</li>
						<li class="nav-item">
							<div v-if="!userLoggedIn">
								<router-link to="/register"><a  class="nav-link active rounded-3 backgroundA" aria-current="page" href="">Register</a></router-link>
							</div>
							<div v-else>
								<router-link to="/post"><a  class="nav-link active rounded-3" aria-current="page" href="">Create Post</a></router-link>
							</div>
						</li>
						<li class="nav-item">
							<div v-if="userLoggedIn">
								<a class="nav-link active rounded-3 text-white disabled" aria-current="page" href="">Welcome {{user.name}}</a>
							</div>
							
						</li>
					</ul>
				</div>
			</div>
		</nav>
    </div>
</template>

<script>
export default {
	data() {
		return {
			user: {
				id: '', 
				name: '', 
				email: '', 
				session_id: ''
			},
		}
	},
	mounted() {

	},
    methods: {
		getUser() {
			this.user = this.$store.getters['user/getUser']
		},
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
	a{
		text-decoration: none;
	}
</style>