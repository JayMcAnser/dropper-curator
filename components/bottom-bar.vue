<template>
  <v-bottom-navigation
      color="primary"
      app
  >
    <v-btn>
      <img src="~/assets/temp/exhibition.png" />
    </v-btn>

    <v-btn>
      <img src="~/assets/temp/add-element.png" />
    </v-btn>

    <v-btn>
      <img src="~/assets/temp/backside.png" />
    </v-btn>
    <div id="version" >{{$globals.version}}</div>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "BottomBar"
}
</script>

<style scoped>
  #version {
    float: right;
  }
</style>
