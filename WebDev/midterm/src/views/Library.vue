<template>
  <div id="app">
    <nav>
      <input type="text" placeholder="chercher un titre ou un auteur d'un livre" v-model="search_txt">
      <br>
      <select name="disponibilite" v-model="disponible">
        <option value="all" selected>Tous les Livres</option>
        <option value="1">Livres Disponibles</option>
        <option value="0">Livres Empruntés</option>
      </select> 
      <h2 v-if="disponible ==='all'">Tout les livres</h2>
      <h2 v-if="disponible ==='1'">les livres disponibles</h2>
      <h2 v-if="disponible ==='0'">les livres Empruntés</h2>
      <div class="livres-list">
            <div v-for="livre in filtered_livres" :key="livre.id" class="livre-item">
                <div class="livre-info">
                  <h2>{{ livre.id }}- {{ livre.titre }}</h2>
                  <img :src=  livre.image  :alt="livre.titre">
                  <p>Auteur: {{ livre.auteur }}</p>
                    <div>
                      <router-link :to="`/Detail/${ livre.id }`"><button class="button"  style="margin-bottom: 20px;margin-right: 10px;">Details</button></router-link>
                    </div>
                </div>
              </div>
      </div>
    </nav>

  </div>
</template>


<script>

export default {
  name: 'Home',
  data(){
    return {
      livres:[],
      search_txt:"",
      disponible:"all"
    };
  },
  mounted(){
          fetch(`http://localhost:3000/livres`)
          .then(response => response.json())
          .then(data => {
            this.livres = data;
          })
          .catch(err => console.error("Erreur lors du chargement des données :", err));
  },
  computed:{
    filtered_livres(){
      return this.livres.filter(
        livre => {
          let condt1= this.search_txt ==="" || livre.titre.toLowerCase().startsWith(this.search_txt.toLocaleLowerCase()) || livre.auteur.toLowerCase().startsWith(this.search_txt.toLocaleLowerCase());
          let temp = true;
          if(this.disponible === "0"){
            temp = false;
          }
          let condt2=this.disponible ==="all" || (livre.disponible == temp);

          return condt1 && condt2;
        }
      )
        
    }
  },
  methods:{
  }
}
</script>

<style>
  h2 {
    font-size: 1.2em;
    margin-bottom: 45px;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .livres-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  img{
    width: 200px;
    height: 200px;
    border-radius: 8px;
  }
  .livre-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    background-color: #f9f9f9;
  }

  .livre-info {
    margin-top: 10px;
  }

  .button {
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
  input{
    width: 300px;
    height: 50px;
    border-radius: 4px;
    padding: 5px;
  }
  select{
    margin-top: 20px;
    width: 200px;
    height: 50px;
    border-radius: 4px;
    padding: 5px;
  }

  .align{
  display: flex;
  margin: 20px;
  }
</style>
