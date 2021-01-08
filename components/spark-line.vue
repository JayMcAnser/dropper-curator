<template>
  <v-app-bar
      fixed
      app
  >
    <img id="spark-image" src="~/assets/temp/sparkline.png" />
  </v-app-bar>
</template>

<script>
export default {
  name: "SparkLine"
}
</script>

<style scoped>
  #spark-image {
    display:block;
    margin:auto;
  }
</style>
