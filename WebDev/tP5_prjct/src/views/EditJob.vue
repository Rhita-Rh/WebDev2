<template>

  <form @submit.prevent="modifier">
      <div>
      <label for="titre">Titre</label>
      <input type="text" name="titre" v-model="titre">
    </div>
    <div>
      <label for="description">Description</label>
      <input type="text" name="description" v-model="description">
    </div>
      <label for="salaire">Salaire (MAD/an)</label>
      <input type="text" name="salaire" v-model="salaire">
  <div>
      <label for="date_de_creation">Date de Creation</label>
      <input type="text" name="date_de_creation" v-model="date_de_creation">
    </div>
    <div>
      <label for="annee">Années d'expérience</label>
      <input type="text" name="annee" v-model="annee">
    </div>
    <button type="submit">Modifier</button>
  </form>
    
  </template>

  <script>
  export default {
    data() {
      return {
        titre:"",
        description:"",
        salaire:"",
        annee:"",
        date_de_creation:"",
        job:null
      };
    },

    mounted(){
      const jobID = this.$route.params.id;
      if (!jobID) {
        console.error("No job ID found in the URL.");
        return;
      }
      fetch("http://localhost:3000/Jobs")
      .then(response=>response.json())
      .then(data=>{
          this.job= data.find(x=> x.id === jobID);
          this.titre = this.job.titre;
          this.description = this.job.description;
          this.salaire = this.job.salaire;
          this.annee = this.job.annee;
          this.date_de_creation = this.job.date_de_creation;
      })
      .catch(err => console.error("Error fetching job:", err));
    },

    methods:{
      modifier(){
        if(!(this.titre && this.description && this.salaire && this.annee && this.date_de_creation)){
          alert("tout les champs sont obligatoires");
          return false;
        }
        else if(isNaN(this.annee)){
          alert("Salaire et annee doivent etre des nombres");
          return false;
        }
        
        else{
          const edit_job = {
              id: this.job.id,
              titre: this.titre,
              description: this.description,
              salaire: this.salaire,
              date_de_creation: this.date_de_creation,
              annee: this.annee
            };

          fetch(`http://localhost:3000/Jobs/${edit_job.id}`,{
            method:"PUT",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(edit_job)
            })

          .then(response => response.json())
          .then(() => {
            alert("L'emploi a été modifié !");
            this.$router.push("/");
          })
          .catch(err => console.error("Erreur :", err));
        }
        
      }
    }
  };
  </script>

  <style>
  input{
  font-size: 13px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  background-color: rgb(231, 231, 231);
  height: 40px;
  width: 300px;
  margin-bottom: 20px;
  margin-left: 10px;
  padding: 10px;
  }
  button {
  display: inline-block;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: rgb(69, 57, 57);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: rgb(149, 205, 149);
  }
  </style>
