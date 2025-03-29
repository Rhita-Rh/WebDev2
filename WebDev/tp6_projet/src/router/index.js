import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CreatePostView from '../views/CreatePostView.vue';
import PostDetailView from '../views/PostDetailView.vue';
import TagPostsView from '../views/TagPostsView.vue';
import EditPost from '../views/EditPost.vue';

const routes = [
  { 
    path: '/',
     component: Home 
  },

  { 
    path: '/addPost', 
    component: CreatePostView 
  },

  { 
    path: '/posts/:id', 
    component: PostDetailView, 
    props: true 
  },
  { 
    path: '/tags/:tag', 
    component: TagPostsView
  },
  {
    path: '/Edit_posts/:id', 
    component: EditPost
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
