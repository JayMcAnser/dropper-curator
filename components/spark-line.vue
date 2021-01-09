<template>
  <v-app-bar
      fixed
      app
  >
    <div id="spark-container"
         ref="spark"
         @click="sparkClick"
    >
        <svg id="spark" ref="spark" width="100%" height="100%">
          <line v-for="spark in sparks" :key="spark.index"
               :x1="spark.x" :y1="sparkTop" :x2="spark.x" :y2="spark.y + sparkTop" style="stroke:rgb(0,0,0);stroke-width:3" />
          <polygon :points="sparkMark" style="fill:rgb(74,118,210);stroke:rgb(74,118,210);stroke-width:1" />
        </svg>
      <!-- <line x1="3" y1="0" x2="3" y2="800" style="stroke:rgb(0,0,0);stroke-width:2" /> -->
      <a @click="generateSparks()">generate</a>

    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "SparkLine",
  props: {
    columns: Array,
    activeColumn: Number
  },
  data: function() {
    return {
      sparkCount: 19,
      sparks: [],
      sparkWidth: 3,
      sparkTop: 0,
      currentWidth: 0,
      currentHeight: 0,
      sparkStep: 0,
      sparkMark: '',
      activeColIndex: 0
    }
  },
  methods: {
    refresh() {
      if (this.$refs.hasOwnProperty('spark')) {
        this.currentWidth = this.$refs.spark.clientWidth;
        this.currentHeight = this.$refs.spark.clientHeight;
        this.sparkStep = (this.currentWidth - this.sparkWidth) / (this.sparkCount -1);
        this.sparkTop = Math.ceil(this.currentHeight / 2);
        this.sparkMark = `${(this.currentWidth / 2)-4}, 8 ${(this.currentWidth / 2) + 9}, ${this.sparkTop / 2 } ${(this.currentWidth / 2)-4}, ${this.sparkTop - 8} `
      }
    },
    // generate an empty spark line positions
    generateSparks() {
      this.refresh();
      this.sparks = [];
      for (let index = 0; index < this.sparkCount; index++) {
        let e = {
          index: index,
          x: (index * this.sparkStep) + (this.sparkWidth / 2),
      //    y: 25
        }
        this.sparks.push(e)
      }
    },

    // maps the columns to the sparks
    mapSparks() {
      this.sparks.forEach( c => c.y = 0);         // clear the sparks
      if (this.columns && this.columns.length) {  // there is data to disply
        if (this.activeColIndex < 0) { this.activeColIndex = 0}
        if (this.activeColIndex >= this.columns.length) { this.activeColIndex = this.columns.length - 1}
        // the max is over ALL not just over the visible
        let maxVal = 0;
        this.columns.forEach(x => {if (x.value > maxVal) {maxVal = x.value}});
        // the this.index should be in the center
        let columnIndex = this.activeColIndex - Math.ceil(this.sparkCount / 2);
        for (let index = 0; index < this.sparks.length; index++) {
          if (columnIndex >= 0 && columnIndex < this.columns.length) { // there is data for this column
            this.sparks[index].y = Math.floor(this.sparkTop * (this.columns[columnIndex].value / maxVal) * .95)
          }
          columnIndex++
        }
      }
      console.log('sparks:', this.sparks)
    },

    // user clicked on the spark line
    sparkClick(event) {
      for (let index = 0; index < this.sparkCount; index++) {
        if (event.clientX < this.sparks[index].x) {
          // found it
          this.activeColIndex = index;
          console.log('FOUND:', this.activeColIndex)
          this.mapSparks()
          break;
        }
      }
      console.log('user clicked on ',event)
    }
  },
  mounted: function() {
    console.log('render');
    this.activeColIndex = this.activeColumn;
    this.generateSparks()
    this.mapSparks()
  }

}
</script>

<style scoped>
  #spark-image {
    display:block;
    margin:auto;
  }
  #spark-container {
    width: 100%;
    height: 100%;
  }
</style>
