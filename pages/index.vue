<template>
  <div>
    <h1>This is the DROPPER - Curator</h1>
    <p>Dropper curator is best viewed on a phone. To show we will open a new window in the size of standard phone. Press the link below</p>
    <a @click="openPhone()">Open in new Phone window</a>
  </div>
</template>

<script>
export default {
  name: "index",
  data: function() {
    return {
      phoneWidth: 600,
      phoneHeight: 960
    }
  },
  methods:{
    openPhone: function () {
      window.open("/phone", "_blank", `toolbar=0,location=0,menubar=0,width=${this.phoneWidth},height=${this.phoneHeight}`);
    }
  }
}
</script>

<style scoped>

</style>
