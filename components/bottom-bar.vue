<template>
  <v-bottom-navigation
      color="primary"
      app
  >
    <div class="text-caption" >
      {{$globals.version}}
    </div>

    <v-btn>
      <img src="~/assets/temp/exhibition.png" />
    </v-btn>

    <v-btn>
      <img src="~/assets/temp/add-element.png" />
    </v-btn>

    <v-btn>
      <img src="~/assets/temp/backside.png" />
    </v-btn>

  </v-bottom-navigation>
</template>

<script>
export default {
  name: "BottomBar"
}
</script>

<style scoped>

</style>
