<template>
    <div class="background-Image">
        <Menu />

		<div v-if="error && submitting" class="alert alert-danger text-center" role="alert">
			Failed submitting post
		</div>
		
		<div v-if="userLoggedIn" class="container mt-5">
			<div class="row align-items-center">
				<div class="col">
				</div>
				<div class="col-8">
					<div class="shadow-lg p-3 mb-5 bg-body rounded">
		
						<form @submit.prevent="handleSubmit">
							<div class="form-floating">
								<textarea class="form-control" placeholder="" id="floatingTextarea2" style="height: 180px"
									v-model="post.content"></textarea>
								<label for="floatingTextarea2">Post Content</label>
							</div>
		
							<div class="text-center mt-3">
								<button type="submit" class="btn btn-outline-success mx-1">Update Post</button>
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
		submitting: false,
		error: false,
        post: {
            id:"",
            content:"",
            user_id:"",        
            author:"", 
            created_at:"",   
            updated_at:"", 
            likes:"",                             
        },
		user: {
			id: '', 
			name: '', 
			email: '', 
			session_id: ''
		},
      }
    },

	created: function () {
		
	},
	mounted() {
		this.getPost()
	},
	
	methods: {
        async getPost(){
			this.post = await this.$store.getters['microposts/getMicropost'](this.$route.params.id)
		}, 
		handleSubmit: function () {

			if (this.isBlanck) {
				this.error = true
				this.submitting = true
				this.alert = "Post can't be blank"
				return
			}

			// check if user exists
			this.updatePost(this.post)

		},
		async updatePost(data) {
			if (await this.$store.dispatch('microposts/updateMicropost', data)) {
				//success: new post added
				this.$router.push('/message/1')
			}
			else {
				this.error = true
				this.submitting = true
				this.alert = "Post can't be blank"
				return
			}

		},
		getUser() {
			this.user = this.$store.getters['user/getUser']
		},
		cancel() {
			this.$router.push('/')
		},
	},
	
	computed: {
		isBlanck: function () {
			if (this.post.content === '') return true
			else return false
		},
		userLoggedIn: function () {
			this.getUser()
			for (var i in this.user) return true
			return false
		},
	},
	directives: {

	},
}
</script>

<style scoped>
	
</style>