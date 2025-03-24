<template>
  <div id="app">
    <nav>
      <input type="text" placeholder="chercher un emploi" v-model="search_txt">
      <br>
      <router-link to="/add"><button class="button" style="margin-top: 20px;margin-bottom: 20px;">Ajouter un nouvel emploi</button></router-link>

      <h2>les emplois disponibles</h2>
      <div class="Jobs-list">
            <div v-for="job in filtered_jobs" :key="job.id" class="job-item">
                <div class="job-info">
                  <h2>{{ job.id }}- {{ job.titre }}</h2>
                  <div class="align">
                    <div v-if="count_detail == 0">
                      <router-link :to="`JobDetail/${ job.id }`"><button class="button" @click="save_id(job.id)" style="margin-bottom: 20px;margin-right: 10px;">Details</button></router-link>
                    </div>
                    <div v-else>
                      <router-link to="/"><button class="button" @click="reset_count" style="margin-bottom: 20px;margin-right: 10px;">Details</button></router-link>
                    </div>
                      <router-link :to="`/Jobs/${ job.id }`"><button class="button" style="margin-bottom: 20px;">Modifier</button></router-link>
                  </div>
                  <button class="button" style="background-color: #cb8888;" @click="alert_supp(job.id)">Supprimer</button>
                  
                  <router-view v-if="job.id === const_id"></router-view> 
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
      Jobs:[],
      const_id:"",
      count_detail:0,
      search_txt:""
    };
  },
  mounted(){
    this.fetchdata();
  },
  computed:{
    filtered_jobs(){
      return this.Jobs.filter(
        job => {
          return this.search_txt ==="" || job.titre.toLowerCase().startsWith(this.search_txt.toLocaleLowerCase())
        }
      )
        
    }
  },
  methods:{
    alert_supp(jobId){
      let response = confirm("Voulez-vous supprimer cet emploi?")
      if(response){
              fetch(`http://localhost:3000/Jobs/${jobId}`, {
            method: "DELETE"
          })
          .then(() => {
            this.fetchdata();
            alert("L'emploi a été supprimé avec succès!");
          })
          .catch(err => console.error("Erreur lors de la suppression :", err));
        }
      },
      fetchdata(){
          fetch(`http://localhost:3000/Jobs`)
          .then(response => response.json())
          .then(data => {
            this.Jobs = data;
          })
          .catch(err => console.error("Erreur lors du chargement des données :", err));
        },
      save_id(myid){
        this.const_id = myid;
        this.count_detail +=1;
        },
      reset_count(){
        this.count_detail =0;
        }
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
  .Jobs-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .job-item {
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

  .job-info {
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

.align{
  display: flex;
  margin: 20px;
}
</style>
