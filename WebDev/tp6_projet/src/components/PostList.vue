<template>
    <div class="post-list">
      <h2>Liste des articles</h2>
      <div v-if="posts.length">
        <SinglePost v-for="post in posts" :key="post.id" :post="post" />
      </div>
      <p v-else>Chargement des articles...</p>
    </div>
  </template>
  
  <script>
  import SinglePost from './SinglePost.vue';
  
  export default {
    components: {
      SinglePost
    },
    data() {
        return {
            posts: []
        };
    },
    mounted() {
        fetch("http://localhost:3000/posts")
        .then(response => response.json())
        .then(data => {
            this.posts = data;
        })
        .catch(err => console.error("Erreur lors du chargement des articles :", err));
    }
    
  };
  </script>
  
  <style>
  .post-list {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  h2 {
    text-align: center;
    color: #52619c;
  }
  </style>
  