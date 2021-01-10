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
        {value: 10}, // 0
        {value: 30},// 1
        {value: 20},// 2
        {value: 10},// 3
        {value: 30},// 4
        {value: 20},// 5
        {value: 10},// 6
        {value: 30},// 7
        {value: 20},// 8
        {value: 10},// 9
        {value: 30},// 10
        {value: 10}, // 0
        {value: 30},// 1
        {value: 20},// 2
        {value: 10},// 3
        {value: 30},// 4
        {value: 20},// 5
        {value: 10},// 6
        {value: 30},// 7
        {value: 20},// 8
        {value: 10},// 9
        {value: 30},// 10
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
