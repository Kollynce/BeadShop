<template>
  <img :src="processedSrc" :alt="alt" class="image-with-fallback" v-img-fallback />
</template>

<script>
import { getImageUrl } from '../utils/imageUtils';

export default {
  name: 'ImageWithFallback',
  props: {
    src: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: 'Image'
    }
  },
  computed: {
    processedSrc() {
      return getImageUrl(this.src);
    }
  }
}
</script>
