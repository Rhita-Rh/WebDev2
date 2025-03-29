<template>
    <div class="tag-cloud">
      <h3>Tags</h3>
      <div v-if="tags.length">
        <router-link v-for="tag in tags" :key="tag" :to="`/tags/${tag}`" class="tag">
          {{ tag }}
        </router-link>
      </div>
      <p v-else>Aucun tag disponible.</p>
    </div>
</template>
  
<script>
  export default {
    props: {
      tags: Array
    }
  };
</script>
  
<style>
  .tag-cloud {
    padding: 15px;
    background: #f4f4f4;
    border-radius: 8px;
    margin: 20px 0;
  }
  
  h3 {
    color: #42b883;
  }
  
  .tag {
    display: inline-block;
    background: #42b883;
    color: white;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 14px;
  }
  
</style>
  