<template>

  <div>
    // boardview
    <column-view
        :column="column"
    ></column-view>
  </div>
</template>

<script>
import Column from "~/models/Column";

export default {
  name: "board-view",
  computed: {
    columnIndex() {
      return this.$store.state.board.activeColumnIndex
    },
    column() {
      if (this.columnIndex >= 0 && this.columnIndex < this.columns.length) {
        return this.columns[this.columnIndex]
      }
      return {}
    },
    columns() {
      return Column.query()
          .with('elements')
          .get()
    },
  },
}
</script>

<style scoped>

</style>
