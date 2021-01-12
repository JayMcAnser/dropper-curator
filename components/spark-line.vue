<template>
  <v-app-bar
      fixed
      app
  >
    <div id="spark-container"
         ref="spark"
         @click="sparkClick"
         v-on:mousemove="trackMouse"
         v-touch="{
           move: (e) => trackTouch(e),
           start: (e) => mouseStartPos = e.touchstartX,
           end: (e) => mouseStartPos = -1
          }"
    >
        <svg id="spark" ref="spark" width="100%" height="100%">
          <line v-for="spark in sparks" :key="spark.index"
               :x1="spark.x" :y1="sparkTop" :x2="spark.x" :y2="spark.y + sparkTop" style="stroke:rgb(0,0,0);stroke-width:3" />
          <polygon :points="sparkMark" style="fill:rgb(74,118,210);stroke:rgb(74,118,210);stroke-width:1" />
        </svg>
      <!-- <line x1="3" y1="0" x2="3" y2="800" style="stroke:rgb(0,0,0);stroke-width:2" /> -->
      <!-- <a @click="generateSparks()">generate {{ buttonState }}</a> -->

    </div>
  </v-app-bar>
</template>

<script>
/*

interface TouchEvent {
  touchstartX: number
  touchmoveX: number
  stopPropagation: Function
}

 */
import Column from "~/models/Column";

export default {
  name: "SparkLine",
  props: {
    columns1: Array,
    activeColumn1: Number
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
     // activeColIndex: 0,
      mouseStartPos: false, // position where the mouse move did start or false if no drag is active
      buttonState: '',
    }
  },
  computed: {
    columns() {
      //console.log('get columns')
      return Column.query()
          .with('elements')
          .get();
    },
    activeColIndex: {
      get: function() {
        return this.$store.state.board.activeColumnIndex
      },
      set: function(index) {
        //console.log('set active', index)
        this.$store.commit('board/activeIndex', index)
      }
    },
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
          y: 0
        }
        this.sparks.push(e)
      }
    },

    elementCount(column) {
      if (column.elements) {
        return column.elements.length
      }
      return 0;
    },
    // maps the columns to the sparks
    mapSparks() {
      this.sparks.forEach( c => c.y = 0);         // clear the sparks
      if (this.columns && this.columns.length) {  // there is data to disply
        if (this.activeColIndex < 0) { this.activeColIndex = 0}
        if (this.activeColIndex >= this.columns.length) { this.activeColIndex = this.columns.length - 1}
        // the max is over ALL not just over the visible
        let maxVal = 0;
        this.columns.forEach(x => {if (this.elementCount(x) > maxVal) {maxVal = this.elementCount(x)}});
        // the this.index should be in the center
        let columnIndex = this.activeColIndex - Math.floor(this.sparkCount / 2);
        for (let index = 0; index < this.sparks.length; index++) {
          if (columnIndex >= 0 && columnIndex < this.columns.length) { // there is data for this column
            this.sparks[index].y = Math.floor(this.sparkTop * (this.elementCount(this.columns[columnIndex]) / maxVal) * .95)
          }
          columnIndex++
        }
      }
//      console.log('column count:', this.columns.length)
    },

    // user clicked on the spark line
    sparkClick(event) {
      if (!this.mouseStartPos) {
        let margin = this.sparkStep / 2;
        for (let index = 0; index < this.sparkCount; index++) {
          if (event.clientX > this.sparks[index].x - margin && event.clientX < this.sparks[index].x + margin) {
            // found it
            this.activeColIndex = this.activeColIndex - (Math.ceil(this.sparkCount / 2) - index); // - Math.floor(this.sparkCount / 2) ;
            // console.log('FOUND:', this.activeColIndex, 'index:', index, 'mouse x pos', event.clientX, 'spark', this.sparks[index].x, 'margin', margin)
            this.mapSparks()
            break;
          }
        }
        // console.log('user clicked on ', event)
      }
    },


    // track the touchScreen
    // could read the swipe out of it
    trackTouch(event) {
      // event should be
      // interface TouchEvent {
      //   touchstartX: number
      //   touchmoveX: number
      //   stopPropagation: Function
      // }
      this.buttonState = `touch.x: ${event.touchstartX}, m:${event.touchmoveX}`
      let dif = event.touchmoveX - this.mouseStartPos
      let margin = this.sparkStep / 2;
      if (Math.abs(dif) > margin) { // we have to move
        let change = Math.ceil(dif / margin);
        this.activeColIndex -= change;
        this.mapSparks()
        this.mouseStartPos =  event.touchmoveX
      }
    },

    // track mouse movement if pressed
    trackMouse(event) {
//      console.log('mouse')
      if (event.buttons === 1) {
        if (this.mouseStartPos === false) {
          this.mouseStartPos = event.clientX;
        } else {
          let dif = this.mouseStartPos - event.clientX;
          let margin = this.sparkStep / 2;
          if (Math.abs(dif) > margin) { // we have to move
            let change = Math.ceil(dif / margin);
            this.activeColIndex += change;
            this.mapSparks()
            this.mouseStartPos = event.clientX;
          }
        }
      } else if (this.mouseStartPos) {
        this.mouseStartPos = false
      }
    }
  },
  mounted: async function() {
    // without this the store is not loaded
    await this.$nextTick()
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
