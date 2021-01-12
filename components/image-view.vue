<template>
  <div class="img-container">
    <img
        class="lock-image"
        :src="element.imageUrl"
    />
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
  .img-container {
    overflow: hidden;
  }
  .lock-image {
    max-width: 100%;
  }
</style>
