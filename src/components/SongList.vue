<script setup>
defineProps({
  playItem: Object,
  playList: Array,
})
const emit = defineEmits(['setPlayItem', 'setPlayItem'])
</script>

<template>
  <div class="list-wrapper">
    <ul class="list">
      <li
        class="item"
        :class="{ active: playItem.url === item.url }"
        v-for="(item, index) in playList"
        :key="index"
        @click="emit('setPlayItem', item)"
      >
        {{ item.name }}
      </li>
    </ul>
    <div class="uploader">
      <label>
        <span>添加</span>
        <input
          type="file"
          @change="(e) => emit('onUpload', e)"
          accept="audio/*"
        />
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 6px;
  padding-top: 2px;
  border: 2px solid #666895;
  background: #2a2a3e;
  .list {
    flex: 1;

    .item {
      width: 250px;
      padding: 4px;
      color: #666895;
      border: 1px solid transparent;
      border-bottom: 1px solid #666895;
      margin-bottom: 1px;
      list-style: none;
      cursor: pointer;
      &:hover {
        border: 1px solid white;
        color: #e6e7ea;
      }

      &.active {
        color: #e6e7ea;
        border: 1px solid white;
      }
    }
  }
  .uploader {
    text-align: right;

    label {
      padding: 8px 0;
      width: 100%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #e6e7ea;
      border-top: 2px solid #666895;
      cursor: pointer;
      background: #2a2a3e;

      input {
        display: none;
      }
    }
  }
}
</style>
