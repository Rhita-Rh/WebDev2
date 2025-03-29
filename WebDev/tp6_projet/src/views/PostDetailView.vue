<template>
    <div v-if="post" class="post-detail flex">
        <div style="margin-right: 15px;">
            <h2>{{ post.title }}</h2>
            <p>{{ post.body }}</p>
            <p><strong>Tags:</strong> {{post.tags.join(', ')}}</p>
        </div>
      
      <TagCloud :tags="post.tags" />
    </div>
    <p v-else>post not found</p>

  </template>
  
  <script>
  import TagCloud from '../components/TagCloud.vue';
  export default {
    components: {
        TagCloud
    },
    data() {
      return {
        post: null
      };
    },
    mounted() {
        const postId = this.$route.params.id;
        fetch("http://localhost:3000/posts")
            .then(response => response.json())
            .then(data => {
                this.post = data.find(x=> x.id === postId);
                this.title = this.post.title;
                this.body = this.post.body;
                this.tags = this.post.tags;
            })
            .catch(err => console.error("Erreur de chargement des détails :", err));
        }
  };
  </script>
  
  <style scoped>
  .post-detail {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  h2 {
    color: #42b883;
  }
  
  p {
    font-size: 1.1em;
  }

  .flex{
    display: flex;
    
  }
  </style>
  
  