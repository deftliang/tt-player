<script setup>
import { ref } from "vue"
import { defaultPlayList } from "./constants"
import SongList from "./components/SongList.vue"
import Player from "./components/Player.vue"

const curSong = ref(defaultPlayList[0])
</script>

<template>
  <div class="player-container">
    <div class="content">
      <header>正在播放：{{}}</header>
      <Player :playItem="curSong" @play="play" @pause="pause" ref />
    </div>
    <div class="playlist">
      <header>播放列表</header>
      <SongList />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.player-container {
  display: flex;
  justify-content: space-between;
  width: 778px;
  height: 415px;
  display: flex;
  padding: 16px;
  background: #404264;
  border-radius: 6px;
  padding: 16px;
  .content {
    width: 508px;
    height: 100%;
    display: block;
    display: flex;
    flex-direction: column;

    header {
      display: flex;
      padding: 6px 12px;
      background: linear-gradient(#404264, #10111a, #404264);
      color: #e6e7ea;
      margin-bottom: 4px;
    }
  }
  .playlist {
    width: 250px;
    height: 100%;
    display: flex;
    flex-direction: column;

    header {
      display: flex;
      padding: 6px 12px;
      background: linear-gradient(#404264, #10111a, #404264);
      color: #e6e7ea;
      margin-bottom: 4px;
    }
  }
}
</style>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
