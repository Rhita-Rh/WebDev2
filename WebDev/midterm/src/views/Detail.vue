<template>
    <div v-if="livre">
      <h1>Details:</h1>
      <h2>{{ livre.titre }}</h2>
      <p>Auteur: {{ livre.auteur }}</p>
      <img :src=  livre.image  :alt="livre.titre">
      <p>Année: {{ livre.annee }}</p>
      <p>Résumé: {{ livre.resume }}</p>
      <p v-if="disponible">statut: <span style="color: rgb(149, 205, 149);">Disponible</span></p>
      <p v-else-if="!disponible">statut: <span style="color: rgb(214, 156, 137);">Empruntés</span></p>
      <br>
      <br>
      <p>if you want to go back to the home page click 'home' at the top of the page :)</p>
    </div>
    <p v-else>Livre not found</p>
  </template>
  
  <script>
  export default {
    data() {
      return {
        livre: null
      };
    },
    mounted() {
      const livreId = parseInt(this.$route.params.id);
      fetch("http://localhost:3000/livres")
      .then(response=>response.json())
      .then(data=>{
          this.livre= data.find(x=> x.id === livreId);
          this.titre = this.livre.titre;
          this.auteur = this.livre.auteur;
          this.categorie = this.livre.categorie;
          this.annee = this.livre.annee;
          this.image = this.livre.image;
          this.resume = this.livre.resume;
          this.disponible = this.livre.disponible;
      })
        .catch(err => console.error("Erreur de chargement des détails :", err));
    }
  };
  </script>
  