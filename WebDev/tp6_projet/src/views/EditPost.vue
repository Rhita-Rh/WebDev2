<template>
    <div class="create-post">
      <h2>Ajouter un nouveau post</h2>
  
      <form @submit.prevent="editPost">

        <div class="form-group">
          <label for="title">Titre</label>
          <input type="text" id="title" v-model="this.title" required />
        </div>
 
        <div class="form-group">
          <label for="body">Contenu</label>
          <textarea id="body" v-model="this.body" required></textarea>
        </div>
  
        <div class="form-group">
          <label for="tags">Tags</label>
          <input type="text" id="tags" v-model="this.tags" placeholder="Séparez les tags par des virgules" />
        </div>
  
        <button type="submit">modifier ce post</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: '',
        body: '',
        tags: '',
        post:null
      };
    },
    mounted(){
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
    },
    methods: {
      editPost() {
            const tagsArray = this.tags
            .split(',')
            .map(tag => tag.toLocaleLowerCase())
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);
    
            const edit_post = {
                id: this.post.id,
                body: this.body,
                title: this.title,   
                tags: tagsArray   
            };

            fetch(`http://localhost:3000/posts/${edit_post.id}`,{
            method:"PUT",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(edit_post)
            })
            .then(response => response.json())
            .then(() => {
                alert("Le post a été modifié !");
                this.$router.push("/");
            })
            .catch(err => console.error("Erreur :", err));
            
      }
    }
  };
  </script>
  
  <style scoped>
  .create-post {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  h2 {
    color: #42b883;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-size: 1.1em;
    margin-bottom: 5px;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1em;
  }
  
  button {
    background-color: #42b883;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1.1em;
  }
  
  button:hover {
    background-color: #2c7a66;
  }
  
  </style>
  