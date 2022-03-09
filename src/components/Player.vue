<script setup>
import { ref } from 'vue'

defineProps({
  playItem: Object,
})
const emit = defineEmits(['play', 'pause'])
const audioRef = ref(null)
defineExpose({
  audioRef,
})
</script>

<template>
  <div class="canvas">
    <canvas id="canvas" width="500" height="300" />
  </div>
  <div class="controls">
    <audio
      ref="audioRef"
      :src="playItem.url"
      @play="(e) => emit('play', e)"
      @pause="(e) => emit('pause', e)"
      controls
    ></audio>
  </div>
</template>

<style lang="scss" scoped>
.canvas {
  display: flex;
  border-radius: 6px;
  border: 4px solid black;
  margin-bottom: 16px;
  flex: 1;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: space-between;

  audio {
    background: #f2f2f2;
    border-radius: 6px;
    flex: 1;
  }
}
</style>
