<template>
  <div>
    <h2>Columns</h2>
    {{column.title}}
    <ul>
      <li v-for="element in column.elements" :key="element.id">
        {{element.title}}
      </li>
    </ul>

    <p>the active columns is {{columnIndex}}</p>
    <p><a @click="setColumn(0)">Set to 0</a></p>
    <p><a @click="setColumn(1)">Set to 1</a></p>

    <h2>Elements</h2>
    <ul>
      <li v-for="element in elements" :key="element.id">
        {{element.id}} - {{element.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import Column from '@/models/Column';
import Element from '@/models/Element';
import columns from "~/data/columns";

export default {
  name: "orm-test",
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
    elements() {
      return Element.query()
        .get()
    }
  },
  methods: {
    async setColumn(index) {
      await this.$store.dispatch('board/activate', index)
    }
  }
}
</script>

<style scoped>

</style>
