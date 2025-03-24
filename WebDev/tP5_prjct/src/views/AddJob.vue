<template>

  <form @submit.prevent="ajouter">
      <div>
      <label for="titre">Titre</label>
      <input type="text" name="titre" placeholder="Entrez le titre de votre emploi" v-model="titre">
    </div>
    <div>
      <label for="description">Description</label>
      <input type="text" name="description" placeholder="Entrez la description de votre emploi" v-model="description">
    </div>
      <label for="salaire">Salaire (MAD/an)</label>
      <input type="text" name="salaire" placeholder="Entrez le salaire de votre emploi" v-model="salaire">
  <div>
      <label for="date_de_creation">Date de Creation</label>
      <input type="text" name="date_de_creation" placeholder="Entrez la Date de Creation de votre emploi" v-model="date_de_creation">
    </div>
    <div>
      <label for="annee">Années d'expérience</label>
      <input type="text" name="annee" placeholder="Entrez les Années d'expérience de votre emploi" v-model="annee">
    </div>
    <button type="submit">Ajouter</button>
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
        date_de_creation:""
      };
    },

    methods:{
      ajouter(){
        if(!(this.titre && this.description && this.salaire && this.annee && this.date_de_creation)){
          alert("tout les champs sont obligatoires");
          return false;
        }
        else if(isNaN(this.annee)){
          alert("Salaire et annee doivent etre des nombres");
          return false;
        }
        else{
          fetch("http://localhost:3000/Jobs")
          .then(response => response.json())
          .then(jobs => {
            const maxId = Math.max(...jobs.map(job => parseInt(job.id)));
            const newId = (maxId + 1).toString();

            const job = {
              id: newId,
              titre: this.titre,
              description: this.description,
              salaire: this.salaire,
              annee: this.annee,
              date_de_creation: this.date_de_creation
            };

            return fetch("http://localhost:3000/Jobs", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(job)
            });
          })
          .then(response => response.json())
          .then(() => {
            alert("L'emploi a été ajouté !");
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