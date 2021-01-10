<template>
  <div>
    <ExhibitionView> </ExhibitionView>
  </div>
</template>

<script>

import data from '@/data';
import Element from '@/models/Element';

export default {
  name: "phone",
  layout: 'phone',
  async fetch() {
    const initialData = await data();
    Element.create({data: initialData})
  }
}
</script>

<style scoped>

</style>
