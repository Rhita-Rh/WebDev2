<template>
    <div id="app">

      <section class="filtres">
          <h3>Filtres</h3>
          <input type="text" name="name" id="name" placeholder="Rechercher" v-model="filtreNom" style="margin-bottom: 20px;">
          <br>
          <select name="categorie" id="categorie" v-model="filtrecatego">
            <option value="categories" selected>categories</option>
            <option value="Électricité">Électricité</option>
            <option value="Filtration">Filtration</option>
            <option value="Moteur">Moteur</option>
            <option value="Freinage">Freinage</option>
            <option value="Refroidissement">Refroidissement</option>
            <option value="Suspension">Suspension</option>
            <option value="Sécurité">Sécurité</option>
            <option value="Transmission">Transmission</option>
            <option value="Carburant">Carburant</option>
            <option value="Carrosserie">Carrosserie</option>
            <option value="Échappement">Échappement</option>
            <option value="Direction">Direction</option>
          </select>
          <select name="dispo" id="dispo" v-model="dispo">
            <option value="1">Disponible</option>
            <option value="0">Non disponible</option>
          </select>
          <br>
          <select name="tri_prix" id="tri_prix" v-model="tri_prix">
            <option value="alt">aleatoire</option>
            <option value="croissant">croissant</option>
            <option value="decroissant">decroissant</option>
          </select>
          
            <h4>Panier</h4>
            <p v-if="panier.length == 0">Votre panier est vide</p>
            <ul>
              <li v-for="(item, index) in panier" :key="index">
                {{ item.nom }} :{{ item.prix }}$
              </li>
            </ul>
          
          
      </section>

      <section class="fiches">
        <h1 v-if="parseInt(dispo)">Pièces disponibles</h1>
        <h1 v-else-if="!parseInt(dispo)">Pièces non disponibles</h1>
        <div class="pieces-list">
          <div v-for="piece in filteredPiece" :key="piece.id" class="piece-item">
              <img :src="piece.Image" :alt="piece.nom" class="piece-image" />
              <div class="piece-info">
                <h2>{{ piece.id }}- {{ piece.nom }}</h2>
                <p>{{ piece.prix }}€</p>
                <p>{{ piece.categorie }}</p>
                <button @click="Ajouter(piece)">Ajouter au panier</button>
              </div>
            </div>
        </div>
      </section>

    </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      pieces:[],
      filtreNom:'',
      filtrecatego:"categories",
      dispo:"1",
      tri_prix: "alt",
      panier:[]
    };
  },
  mounted(){
    fetch("http://localhost:3000/pieces-autos")
    .then(response => response.json())
    .then(data => {
      this.pieces = data;
    })
    .catch(err => console.error("Erreur lors du chargement des données :", err));
  },
  computed:{
    filteredPiece(){
                    let result = this.pieces.filter(
                        p =>{
                            const matchName= this.filtreNom === '' || p.nom.toLowerCase().startsWith(this.filtreNom.toLowerCase());
                            const matchCatego= this.filtrecatego === "categories" || p.categorie === this.filtrecatego;
                            let temp=true;
                            if(!parseInt(this.dispo)){
                              temp = false;
                            }
                            const matchDispo = p.Disponible == temp;
                            return matchName && matchCatego && matchDispo;
                        }
                    );
                    if (this.tri_prix === "croissant") {
                      result.sort((a, b) => a.prix - b.prix);
                    } else if (this.tri_prix === "decroissant") {
                      result.sort((a, b) => b.prix - a.prix);
                    }
                    return result;

    }
  },
  methods:{
    Ajouter(piece){
      this.panier.push(piece);
      console.log("Ajouté au panier:", this.panier);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.pieces-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.piece-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  background-color: #f9f9f9;
}

.piece-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.piece-info {
  margin-top: 10px;
}

h2 {
  font-size: 1.2em;
  margin-bottom: 5px;
}
input{
  width: 300px;
  height: 50px;
  border-radius: 4px;
}
select{
  width: 300px;
  height: 50px;
  border-radius: 4px;
}

</style>
