<template>
  <v-list two-line>
    <v-list-item v-for="board in boards" :key="board.id">
      <v-list-item-content 
      @click="openBoard(board.id)"
      >
        <v-list-item-title class="title">{{ board.title}}</v-list-item-title>
        {{ board.description }} ({{publicText(board.isPublic)}})
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
            color="primary"
            fab
            x-small
            dark
            float-right
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-list-item-action>

    </v-list-item>
  </v-list>
</template>

<script>
// import Logging from '../lib/logging';
/**
 * list the board available
 */
export default {
  name: "board-list",
  data: function() {
    return {
       boards: [],
    }
  },
  computed: {

  },
  methods: {
    publicText(isPublic) {
      return isPublic ? 'public' : 'private'
    },
    openBoard(id) {
     // Logging.debug(`open board ${id}`);
      this.$store.dispatch('board/activate', {id}).then( (res) => {
        if (res.id) {
          let url = `board/${res.id}`;
          console.log(`opening ${url}`)
          this.$router.push(url)
        } // do nothing on error
      })
    }
  },
  async fetch() {
    this.boards = await this.$store.dispatch('board/list');
  }
}
</script>

<style scoped>
  .title {
    font-weight: bold;
  }
</style>
