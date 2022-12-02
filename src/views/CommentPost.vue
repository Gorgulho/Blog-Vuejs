<template>
    <div class="background-Image">
        <Menu />

		<div v-if="error && submitting" class="alert alert-danger text-center" role="alert">
			{{alert}}
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
									v-model="comment.content"></textarea>
								<label for="floatingTextarea2">Post Comment</label>
							</div>
				
							<div class="text-center mt-3">
								<button type="submit" class="btn btn-outline-success mx-1">Comment Post</button>
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
        comment: {
            content: '',                             
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
		this.getUser()
	},
	
	methods: {
		handleSubmit() {
			this.submitting = true

			if (this.invalidContent) {
				this.error = true
				return
			}
			this.commentPost(this.comment)
		},
		commentPost(comment) {
			const data = {
				post: comment,
				session_id: this.user.session_id,
                post_id: this.$route.params.id
			}
			this.$store.dispatch('comments/addComment', data)
			this.$router.push('/message/7')
		},
		cancel() {
			this.$router.push('/')
		},
		getUser() {
            this.user = this.$store.getters['user/getUser']
		},   
	},


	
	computed: {
		invalidContent: function () {
			if (this.comment.content === '' || this.comment.content.match(/<svg\/onload|<svg onload|<script>/g)!=null ) return true
			else return false
		},

		userLoggedIn: function () {
			this.getUser()
			for (var i in this.user) return true
			return false
		},
	},
	directives: {
		autofocus: {
			inserted(el) {
				el.focus()
			}
		}
	},
}
</script>

<style scoped>
</style>