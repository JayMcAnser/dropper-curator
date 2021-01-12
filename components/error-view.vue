<template>
  <div>
    <h2>Error</h2>
    <p>type: {{ element.type}}</p>
  </div>
</template>

<script>
export default {
  name: "error-view",
  props: {
    element: Object
  }
}
</script>

<style scoped>

</style>
