<template>
    <v-carousel class="video-carousel" :cycle="false" hide-delimiters v-on:input="onPan" ref="video-carousel">
      <v-carousel-item v-for="(item,i) in items" :key="i">
        <iframe width="100%" height="400px" frameborder="0" seamless="seamless" :src="item.src" ref="video-carousel-items"></iframe>
      </v-carousel-item>
      <div class="index-indicator" ref="index-indicator"></div>
    </v-carousel>
</template>
<script>
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify, {
  theme: {
    primary: '#E53935',
    secondary: '#FFCDD2',
    accent: '#3F51B5',
  }
})
export default {
  data: function() {
    return {
      items: [
        { src: 'https://www.youtube.com/embed/QoBTgeMV_gM' },
        { src: 'https://player.vimeo.com/video/82191963' },
        { src: 'https://www.youtube.com/embed/wx4DfHW0WtM' },
        { src: 'https://www.youtube.com/embed/pNg0rXLw_E4' },
      ]
    };
  },
  methods: {
    onPan: function(itemIndex) {
      this.refreshIframe(itemIndex);
      this.updateIndexIndicator(itemIndex);
    },
    refreshIframe: function(itemIndex) {
      const previousItemIndex = this.previousItemIndex || 0;
      const previousIframe = this.$refs['video-carousel-items'][previousItemIndex];
      const src = previousIframe.src;

      // Refresh iframe to stop video/audio from playing
      previousIframe.src = '';
      previousIframe.src = src;
      this.previousItemIndex = itemIndex;
      this.currentIndex = itemIndex;
    },
    updateIndexIndicator: function(itemIndex) {
      const indexIndicatorEl = this.$refs['index-indicator'];
      indexIndicatorEl.innerText = `${itemIndex + 1}/${this.videos.length}`;
    }
  }
}

</script>
