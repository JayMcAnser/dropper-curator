<template>
  <v-app>
    <SparkLine></SparkLine>
    <v-main>
      <v-container class="no-padding">
        <nuxt />
      </v-container>
    </v-main>
    <BottomBar></BottomBar>
  </v-app>
</template>

<script>
export default {
name: "phone"
}
</script>

<style scoped>
  .no-padding {
    padding: 0;
  }
</style>
