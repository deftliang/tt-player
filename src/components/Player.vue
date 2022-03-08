<script setup>
defineProps({
  playItem: Object,
})

// const play = emit('play')
</script>

<template>
  <div class="canvas"></div>
  <div class="controls">
    <audio
      ref="audioRef"
      :src="playItem.url"
      @play="play"
      @pause="pause"
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
