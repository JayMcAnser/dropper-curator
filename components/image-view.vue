<template>
  <div>
    <img :src="element.imageUrl" />
  </div>
</template>

<script>
export default {
  name: "image-view",
  props: {
    element: Object
  }
}
</script>

<style scoped>

</style>
