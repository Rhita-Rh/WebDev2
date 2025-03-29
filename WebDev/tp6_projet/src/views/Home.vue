<template>
  <div class="home">
    <PostList :posts="filteredPosts" />
    <TagCloud :tags="tags" />
  </div>
</template>

<script>
import TagCloud from '../components/TagCloud.vue';
import PostList from '../components/PostList.vue';

export default {
  components: {
    TagCloud,
    PostList
  },
  data() {
    return {
      allPosts: [],
      tags: []
    };
  },
  computed: {
    filteredPosts() {
      if (this.$route.params.tag) {
        return this.allPosts.filter(post =>
          post.tags.includes(this.$route.params.tag)
        );
      } else {
        return this.allPosts;
      }
    }
  },
  mounted() {
    fetch("http://localhost:3000/posts")
      .then(response => response.json())
      .then(data => {
        this.allPosts = data;

        const allTags = data.flatMap(post => post.tags.map(tag => tag.toLowerCase()));
        this.tags = [...new Set(allTags)];
      })
      .catch(err => console.error("Erreur lors du chargement des articles :", err));
  }
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.post-list {
  flex: 3;
}

.tag-cloud {
  flex: 1;
  margin-left: 20px;
}
</style>
