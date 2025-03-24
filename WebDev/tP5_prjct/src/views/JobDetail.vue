<template>
  <div v-if="job">
    <h2>Details</h2>
    <p>{{ job.description }}</p>
    <p>Salaire (MAD/an): {{ job.salaire }}</p>
    <p>Annee d'experiece: {{ job.annee }}</p>
    <p>{{ job.date_de_création }}</p>
  </div>
  <p v-else>Job not found</p>
</template>

<script>
export default {
  data() {
    return {
      job: null
    };
  },
  mounted() {
    const jobId = this.$route.params.id;
    fetch(`http://localhost:3000/Jobs`)
      .then(response => response.json())
      .then(data => {
        this.job = data.find(job=> job.id === jobId);
      })
      .catch(err => console.error("Erreur de chargement des détails :", err));
  }
};
</script>
