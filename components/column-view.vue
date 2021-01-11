<template>
  <div class="view-column">
    <h1>Title: {{column.title}}</h1>
    <ul>
      <li v-for="element in column.elements">
        {{ element.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import Column from "~/models/Column";
export default {
  name: "column-view",
  props: {
    column: Object
  },

}
</script>

<style scoped>

</style>
