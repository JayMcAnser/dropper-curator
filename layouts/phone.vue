<template>
  <v-app>
    <SparkLine
        :active-column="activeColIndex"
        :columns="columns"
    >

    </SparkLine>
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
  name: "phone",
  data: function() {
    return {
      activeColIndex: 2
    }
  },
  computed: {
    columns() {
      return [
        {value: 10},
        {value: 30},
        {value: 20},
        {value: 10},
        {value: 30},
        {value: 20},
        {value: 10},
        {value: 30},
        {value: 20},
        {value: 10},
        {value: 30},
        {value: 20},

      ]
    }
  }
}
</script>

<style scoped>

  .no-padding {
    padding: 0;
  }
</style>
