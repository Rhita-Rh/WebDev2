<template>
    <div class="tag-posts">
      <h2>Articles avec le tag: "{{ myTag }}"</h2>
      <SinglePost v-for="post in filteredPosts" :key="post.id" :post="post" />
        <div v-if="filteredPosts.length === 0">
            <p>Aucun article trouvé avec ce tag.</p>
            <p>{{this.myTag}}</p>
        </div>
    </div>
  </template>
  
  <script>
  import SinglePost from '../components/SinglePost.vue';

  
  export default {
    components: {
      SinglePost
    },
    data() {
      return {
        allPosts: [],
        myTag: this.$route.params.tag
      };
    },
    computed: {
      filteredPosts() {
        return this.allPosts.filter(post => post.tags.includes(this.myTag));
      }
    },
    methods:{
        fetchPosts(){
            fetch("http://localhost:3000/posts")
            .then(response => response.json())
            .then(data => {
            this.allPosts = data; 
            })
            .catch(err => console.error("Erreur lors du chargement des articles :", err));
        }
    },
    mounted() {
        this.fetchPosts();
    },
    watch: {
        '$route.params.tag': function(newTag) {
            this.myTag = newTag;
            this.fetchPosts();
        }
    }
  };
  </script>
  
  <style scoped>
  .tag-posts {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  h2 {
    text-align: center;
    color: #42b883;
  }
  </style>
  