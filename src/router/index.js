import Vue from 'vue'
import VueRouter from 'vue-router'
import Microposts from '../views/Microposts.vue'
import Register from '../views/Register.vue'
import Message from '../views/Message.vue'
import Login from '../views/Login.vue'
import Post from '../views/Post.vue'
import UpdatePost from '../views/UpdatePost.vue'
import Logout from '../views/Logout.vue'
import CommentPost from '../views/CommentPost.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Microposts
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/message/:id?',
    component: Message
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/post',
    component: Post
  },
  {
    path: '/updatePost/:id',
    component: UpdatePost
  },
  {
    path: '/logout',
    component: Logout
  },
  {
    path: '/commentPost/:id',
    component: CommentPost
  }
 
]

const router = new VueRouter({
  routes
})

export default router