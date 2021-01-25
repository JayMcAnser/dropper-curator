<template>
  <div class="ma-4">
    <div class="d-flex flex-row mb-2">
      <div>
        <h2>Virtual phone layouts {{ $config.baseURL }} {{  active }}</h2>
        <ul>
          <li v-for="(phone, index) in phones" :key="phone.type" :class="activeStyleIndex === index ? 'active' :''">
            <a @click="activeStyleIndex=index">{{ phone.type }} ({{ phone.width }} x {{ phone.height}})</a>
          </li>
        </ul>
        <h2>On a phone</h2>
        <ul>
          <li><a href="/phone">Remove border</a></li>
        </ul>
      </div>
      <div class="smartphone">
        <div class="content" :style="canvas">
          <iframe src="/phone" style="width:100%;border:none;height:100%" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "webphone",
  layout: 'blank',
  data: function() {
    return {
      activeStyleIndex: 0,
      processEnv: this.$config.baseURL,
      active: '',
      phones: [
        {type: 'IPhone XS', width: '414px', height: '896px'},
        {type: 'IPhone 8 Plus', width: '414x', height: '736px'},
        {type: 'IPhone 7', width: '375x', height: '667px'},
        {type: 'One Plus', width: '480px', height: '853px'},
        {type: 'Samsung Galaxy s9', width: '412px', height: '869px' },
        {type: 'Samsung Galaxy s7', width: '360px', height: '640px' },
        {type: 'Samsung Note 10', width: '360px', height: '740px' },
        {type: 'Huawei P20', width: '360px', height: '748px' },
        {type: 'Xiaomi Redme 5', width: '393px', height: '786px' },
      ]
    }
  },
  computed:{
    currentStyle() {
      return this.phones[this.activeStyleIndex].css
    },
    canvas() {
      return { width: this.phones[this.activeStyleIndex].width, height: this.phones[this.activeStyleIndex].height};
    }
  },
  methods: {
    async getActive() {
      let res = await this.$store.dispatch('board/getActive');
      console.log('called: ', res);
      this.active = res.message;
    }
  },

  mounted() {
    this.getActive()
  }

}
</script>

<style scoped>
/* The device with borders */
.smartphone {
  position: relative;
  margin: auto;
  border: 16px black solid;
  border-top-width: 60px;
  border-bottom-width: 60px;
  border-radius: 36px;
}
.active {
  font-weight: bold;
}
/* The horizontal line on the top of the device */
.smartphone:before {
  content: '';
  display: block;
  width: 60px;
  height: 5px;
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #333;
  border-radius: 10px;
}

/* The circle on the bottom of the device */
.smartphone:after {
  content: '';
  display: block;
  width: 35px;
  height: 35px;
  position: absolute;
  left: 50%;
  bottom: -65px;
  transform: translate(-50%, -50%);
  background: #333;
  border-radius: 50%;
}


/* The screen (or content) of the device */
.smartphone .content {
  height: 640px;
  background: white;
}
</style>
