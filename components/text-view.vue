<template>
  <div >
    <p v-if="element.title"
       class="block title">{{ element.title }}</p>
    <p class="block">{{element.text}}</p>
  </div>
</template>

<script>
export default {
  name: "text-view",
  props: {
    element: Object
  }
}
</script>

<style scoped>
  .block {
    margin: 5px;
    padding: 5px;
  }
  .title {
    font-weight: bold;
  }
</style>
