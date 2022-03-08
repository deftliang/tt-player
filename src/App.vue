<script setup>
import { onMounted, ref, watch } from 'vue'
import { defaultPlayList } from './constants'
import SongList from './components/SongList.vue'
import Player from './components/Player.vue'
import { padLeft } from './utils/index'

const playerRef = ref(null)
const curTime = ref('00:00')
const curSong = ref(defaultPlayList[0])
const songList = ref(defaultPlayList)

const setPlayItem = (item) => {
  curSong.value = item
}
const onUpload = (e) => {
  if (e.target.files) {
    const [file] = e.target.files
    const blobUrl = URL.createObjectURL(file)
    const [filename] = file.name.split('.')
    curSong.value = { name: filename, url: blobUrl }
    console.log(blobUrl)
    songList.value = [...songList.value, { name: filename, url: blobUrl }]
  }
}
onMounted(() => {})

watch(playerRef, (_v, _ov, onInvalidate) => {
  if (playerRef.value.audioRef) {
    const id = setInterval(() => {
      if (playerRef.value?.audioRef) {
        const currentTime = playerRef.value.audioRef.currentTime
        const minute = Math.floor(currentTime / 60)
        const seconds = Math.ceil(currentTime % 60)
        curTime.value = `${padLeft(minute)}:${padLeft(seconds)}`
      }
    }, 500)
    onInvalidate(() => {
      window.clearInterval(id)
    })
  }
})

const play = () => {}
const pause = () => {}
</script>

<template>
  <div class="player-container">
    <div class="content">
      <header>
        正在播放：{{ curSong.name }} <span>{{ curTime }}</span>
      </header>
      <Player :playItem="curSong" @play="play" @pause="pause" ref="playerRef" />
    </div>
    <div class="playlist">
      <header>播放列表</header>
      <SongList
        :playList="songList"
        :playItem="curSong"
        @setPlayItem="setPlayItem"
        @onUpload="onUpload"
      />
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
      justify-content: space-between;
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
