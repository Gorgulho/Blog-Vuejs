<template>
	<div class="background-Image">

			<div class="container">
				<div class="row align-items-center">
					<div class="col">
					</div>
					<div class="col-8">
						<div class="card text-center mt-5 bg-success">
							<div class="card-body">
								<h1 class="display-4 ">{{message}}</h1>
							</div>
						</div>
					</div>
					<div class="col">
					</div>
				</div>
			</div>
	
	</div>
</template>

<script>





export default {
    data() {
        return {
            message: '',
        }
	},
	mounted() {
		this.setMessage()
	},


	methods: {
        setMessage() {
				if (this.$route.params.id == 1) {
                this.message = "Success: Post updated"
                } 
				if (this.$route.params.id == 2) {
                this.message = "Success: User deleted"
                }
				if (this.$route.params.id == 3) {
                this.message = "Success: Post added to database"
                }
				if (this.$route.params.id == 4) {
                this.message = "Welcome! You can now login"
                }
				if (this.$route.params.id == 5) {
                this.message = "Welcome back " + this.$store.getters['user/getUser'].name + "!"
                }
				if (this.$route.params.id == 6) {
                this.message = "Bye, come back soon!"
                }	
				if (this.$route.params.id == 7) {
                this.message = "Success: Comment added to database"
                }																
				
				var timeleft = 2;
				var downloadTimer = setInterval(() => {
					if(timeleft <= 0){
						clearInterval(downloadTimer)
						this.$router.push('/')
					}
				timeleft -= 1
				}, 1000)
		},


	},
   

}
</script>

<style scoped>
	
</style>