<template>
  <div>
    <spark-line
      :columns="board.columns"
    ></spark-line>
    <h2>{{board.title}}</h2>
    <p>{{board.description}}</p>
    <column-view
        :column="column"
    ></column-view>
  </div>
</template>

<script>
import Column from "~/models/Column";
import sparkLine from './spark-line.vue';

export default {
  components: { sparkLine },
  name: "board-view",
  params: {
    id: String
  },
  data: function() {
    return {
      board: {}
    }
  },
  async fetch() {    
    this.board = await this.$store.dispatch('board/activate', {id: this.$route.params.id})
   // console.log('board-view', this.board)
  },
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
      return this.board.columns ? this.board.columns : []      
    },
  }
}
</script>

<style scoped>

</style>
