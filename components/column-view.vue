<template>
  <div class="view-column">
    <h1>Title: {{column.title}}</h1>
    <component
        v-for="element in column.elements"
        :key='element.id'
        v-bind:is="controlType(element.type)"
        :element="element"
    ></component>
  </div>
</template>

<script>
import Column from "~/models/Column";
import TextView from '@/components/text-view';
import ImageView from '@/components/image-view';

export default {
  name: "column-view",
  props: {
    column: Object
  },
  components: {
    ImageView,
    TextView,
  },
  methods: {
    controlType : function(typeString) {
      switch(typeString) {
        case 'image': return ImageView;
        case 'text': return TextView
        default:
          console.error('unknown type:', typeString)
          return ErrorView

      }
    }
  }
}
</script>

<style scoped>

</style>
