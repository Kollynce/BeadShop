<template>
  <img 
    :src="imgSrc" 
    @error="handleError" 
    v-bind="$attrs"
  />
</template>

<script setup>
import { useImage } from '../utils/imageLoader';

const props = defineProps({
  src: {
    type: String,
    default: ''
  }
});

const { imgSrc, handleError } = useImage(props.src);
</script>
