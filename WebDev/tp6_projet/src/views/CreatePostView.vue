<template>
    <div class="create-post">
      <h2>Ajouter un nouveau post</h2>
  
      <form @submit.prevent="submitPost">

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
  
        <button type="submit">Ajouter le post</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: '',
        body: '',
        tags: '' 
        
      };
    },
    methods: {
      submitPost() {
            const tagsArray = this.tags
            .split(',')
            .map(tag => tag.toLocaleLowerCase())
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0);
    
            fetch("http://localhost:3000/posts")
            .then(response => response.json())
            .then(posts => {
                const maxId = Math.max(...posts.map(post => parseInt(post.id)));
                const newId = (maxId + 1).toString();

                const post = {
                id: newId,
                body: this.body,
                title: this.title,
                tags: tagsArray   
                };

                return fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(post)
                });
            })
            .then(response => response.json())
            .then(() => {
                alert("Le post a été ajouté !");
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
  