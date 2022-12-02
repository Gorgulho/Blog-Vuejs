<template>
	<div>
	<Menu />
	<!--Begin Carousel-->
	<div class="container">
		<div class="row justify-content-md-center"> 
			<div class="col">
			</div>
			<div class="col-11">
				<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
					<div class="carousel-indicators">
						<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
							class="active" aria-current="true" aria-label="Slide 1"></button>
						<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
							aria-label="Slide 2"></button>
						<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
							aria-label="Slide 3"></button>
						<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3"
							aria-label="Slide 4"></button>
						<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4"
							aria-label="Slide 5"></button>
					</div>
					<div class="carousel-inner">
						<div class="carousel-item active">
							<img src="../assets/images/img1.jpg" class="d-block w-100" alt="...">
						</div>
						<div class="carousel-item">
							<img src="../assets/images/img2.jpg" class="d-block w-100" alt="...">
						</div>
						<div class="carousel-item">
							<img src="../assets/images/img3.jpg" class="d-block w-100" alt="...">
						</div>
						<div class="carousel-item">
							<img src="../assets/images/img4.jpg" class="d-block w-100" alt="...">
						</div>
						<div class="carousel-item">
							<img src="../assets/images/img5.jpg" class="d-block w-100" alt="...">
						</div>
					</div>
					<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
						data-bs-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Previous</span>
					</button>
					<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
						data-bs-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="visually-hidden">Next</span>
					</button>
				</div>
			</div>
			<div class="col">
			</div>
		</div>
	</div>
	<!--End Carousel-->

	<!-- BEGIN MICROPOSTS -->
	<div class="container">
		<div class="row justify-content-md-center">
			<div class="row gy-2">
				<div class="col">
	
				</div>
				<div v-for="micropost in microposts" :key="micropost.id" class="col-12">
					<div class="card text-center m-4 mx-5">
						<div class="card-header">
							Author: {{micropost.name}}
						</div>
						<div class="card-body">
							<p class="card-text" v-html = "micropost.content"></p>
							<div v-if="userLoggedIn && micropost.user_id == user.id">
								<router-link :to="'/updatePost/' + micropost.id"><a style="text-decoration:none" href="" class="btn btn-outline-secondary mx-1 mb-2">Edit Post</a></router-link>
							</div>
							<div v-if="userLoggedIn && micropost.user_id != user.id">
								<router-link :to="'/commentPost/' + micropost.id"><a style="text-decoration:none" href="" class="btn btn-outline-primary mx-1 mb-2">Comment Post</a></router-link>
							</div>

							<div v-if="clickId == micropost.id" >
								<div v-for="comment in show" :key="comment.id" class="card-footer text-muted">
									<p class="card-text">Author: <strong>{{comment.user_name}}</strong> - Created: <strong>{{comment.created_at}}</strong></p>
									<p class="card-text" v-html="comment.content"></p>
								</div>
								<div v-if="alert != ''" class="card-footer text-muted">
									<p class="card-text">{{alert}}</p>
								</div>
								
							</div>

						</div>
						<div class="card-footer text-muted">
							Created: <strong>{{micropost.created_at}}</strong> Updated: <strong>{{micropost.updated_at}}</strong>
							<div v-if="micropost.id != show">
								<div v-if="clickId != micropost.id">
									<a @click="showComments(micropost.id)" class="btn btn-outline-info mx-1">Show Comments</a>
								</div>
							</div>
						</div>
						
					</div>
				</div>
				<div class="col">
	
				</div>
			</div>
	
	
		</div>
	</div>
	<!-- END MICROPOSTS -->
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
			microposts: [],
			comments: [],
			user: {
				id: '',
				name: '',
				email: '',
				session_id: ''
			},
			show: [],
			alert: false,
			clickId: '',

		}
	},
	mounted() {
		this.getPosts()
		this.getComments()
	},
	methods: {
		async getPosts(){
			if (await this.$store.dispatch('microposts/getMicroposts')) {
				this.microposts = this.$store.getters['microposts/getMicroposts']
			}
		},
		getUser(){
			this.user = this.$store.getters['user/getUser']
		},
		async getComments() {
			if (await this.$store.dispatch('comments/getComments')) {
				this.comments = this.$store.getters[('comments/getComments')]
			}
		},
		showComments(id) {
			this.show = this.$store.getters[('comments/getPostComments')](id)
			this.clickId = id
			if (this.show.length == 0)
				this.alert = 'no comments'
			else this.alert = ''
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

</style>