<template>
    <input type="text" placeholder="chercher un emploi" :value="search_txt" @input="$emit('input', $event.target.value)">
</template>

<script>
export default {
  props:["search_txt"]
  
}
</script>
