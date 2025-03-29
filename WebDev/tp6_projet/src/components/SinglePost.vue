<template>
    <div class="single-post">
      <h3>{{ post.title }}</h3>
      <p class="snippet">{{ post.body.substring(0, 50) }}...</p>
      <div class="tags">
        <TagCloud :tags="post.tags" />
      </div>
      <router-link :to="`/posts/${post.id}`" class="read-more">Lire la suite</router-link>
      <br>
      <div style="display: flex; justify-content: space-between; margin-top: 10px;">
            <div>
                <router-link :to="`/Edit_posts/${post.id}`"><button class="button">Modifier ce post</button></router-link>
            </div>
            <div>
                <button class="button" style="background-color: #cb8888;" @click="alert_supp(post.id)">Supprimer</button>
            </div>
        </div>
    </div>
</template>
  


<script>
import TagCloud from '../components/TagCloud.vue';
  export default {
    components: {
      TagCloud
    },
    props: {
      post: Object
    },
    methods: {
        alert_supp(id){
            if (confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
                fetch(`http://localhost:3000/posts/${id}`, {
                    method: "DELETE"
                })
                .then(() => {
                    alert("Le post a été supprimé !");
                    this.$router.push("/");
                })
                .catch(err => console.error("Erreur :", err));
            }
        }
    }
  };
  </script>
  
  <style scoped>
  .single-post {
    border: 1px solid #ddd;
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    background: #f9f9f9;
  }
  
  h3 {
    color: #5f78d9;
  }
  
  .snippet {
    font-size: 14px;
    color: #555;
  }
  
  .tags {
    margin-top: 8px;
  }
  
  .tag {
    display: inline-block;
    background: #5f78d9;
    color: white;
    padding: 3px 8px;
    margin-right: 5px;
    border-radius: 5px;
    font-size: 12px;
  }
  
  .read-more {
    display: block;
    margin-top: 10px;
    text-decoration: none;
    color: #52619c;
    font-weight: bold;
    text-decoration: underline;
  }
  .button{
    background-color: #42b883;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
  
  </style>
  