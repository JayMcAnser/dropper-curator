<template>
  <div>
    <board-view
      :id="boardId"
    ></board-view>o

  </div>
</template>

<script>


export default {
  name: "board",
  layout: 'phone',
  // data: function() {
  //   return {
  //     id: false,
  //   }
  // },
  computed: {
    boardId : function () {
      return this.$route.params.id  
    }
  }

}
</script>

<style scoped>

</style>