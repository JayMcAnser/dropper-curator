<template>
  <div>
    <board-view></board-view>
  </div>
</template>

<script>

import data from '@/data';
import Element from '@/models/Element';
import Column  from "~/models/Column";

export default {
  name: "phone",
  layout: 'phone',
  async fetch() {
    console.log('data:', data)
    const initialData = await data();
    Column.create({data: initialData});

    // Element.create({data: initialData})
    // Column.create({data: await data.columns()})
  },
}
</script>

<style scoped>

</style>
