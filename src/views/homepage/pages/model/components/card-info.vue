<script setup lang="ts">
import CardItem from './../types/card-item'
import { LazyImg } from 'vue-waterfall-plugin-next'
import { View } from "@element-plus/icons-vue";
const defaultUrl = 'https://img0.baidu.com/it/u=252500402,1876180326&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1688144400&t=db877e36bb9f8daa16051bd62468006c'

defineProps<{
  // item选项
  item: CardItem
}>()

const imageVisble = ref(false)

const toggleDark = () => {
  imageVisble.value = true
}

const closeImageVisble = () => {
  imageVisble.value = false
}

</script>

<template>
  <div class="card-info" v-if="item.model_images && item.model_images.length > 0">
    <div class="card-image">
      <LazyImg :url="item.model_images[0].url" />
    </div>
    <div class="card-view" @click="toggleDark()">
      <el-icon ><View /></el-icon>
    </div>
    <div class="card-top">
      <div class="card-top-div">
        <span class="card-top-data">{{item.type}}</span>
      </div>
    </div>
    <div class="card-footer">
      <div class="card-group">
        <div class="card-avatar">
          <LazyImg class="card-avatar-info" :title="item.creator_username" :url="item.creator_image ? item.creator_image : defaultUrl" />
        </div>
      </div>
      <div class="card-footer-b">
        <div class="card-name">
          <div class="card-name-data">{{item.name}}</div>
        </div>
        <div class="mantine-1omorxi">
        </div>
      </div>
    </div>
    <el-image-viewer v-if="imageVisble" :url-list="item.model_images.map(item => item.url)" teleported hideOnClickModal @close="closeImageVisble"></el-image-viewer>
  </div>
</template>

<style scoped lang="scss">
.card-info {
  position: relative;
  display: block;
  text-decoration: none;
  color: rgb(193, 194, 197);
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 3px, rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px;
  border: 1px solid rgb(55, 58, 64);
  overflow: hidden;
  background: linear-gradient(rgb(43, 138, 62) 0%, rgb(37, 38, 43) 100%);
  .card-top {
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
    .card-top-div {
      font-size: 10px;
      height: 18px;
      line-height: 16px;
      text-decoration: none;
      padding: 0px 8px;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: auto;
      text-transform: uppercase;
      border-radius: 4px;
      font-weight: 700;
      letter-spacing: 0.25px;
      cursor: inherit;
      text-overflow: ellipsis;
      overflow: hidden;
      border: 1px solid transparent;
      color: white;
      backdrop-filter: blur(7px);
      box-shadow: rgba(37, 38, 43, 0.2) 1px 2px 3px -1px;
      background: rgba(30, 133, 230, 0.4);
    }
    .card-top-data {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .card-footer {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 8px;
    position: absolute;
    bottom: 0px;
    right: 0px;
    left: 0px;
    z-index: 10;
    .card-footer-b {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: flex-start;
      gap: 6px;
      background: linear-gradient(45deg, rgba(37, 38, 43, 0.8) 0%, rgba(37, 38, 43, 0) 100%);
      backdrop-filter: blur(13px) saturate(160%);
      box-shadow: rgba(0, 0, 0, 0.16) 0px -2px 6px 1px;
      padding: 10px;
    }
    .card-name {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 4px;
      .card-name-data {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
        -webkit-tap-highlight-color: transparent;
        color: white;
        font-size: 14px;
        line-height: 1.55;
        text-decoration: none;
        font-weight: 500;
        flex: 1 1 0%;
        line-height: 1;
      }
    }

  }
  .card-group {
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    z-index: 10;
    margin: 0 10px;
    .card-avatar {
      -webkit-tap-highlight-color: transparent;
      box-sizing: border-box;
      display: block;
      user-select: none;
      overflow: hidden;
      width: 38px;
      min-width: 38px;
      height: 38px;
      border-radius: 32px;
      text-decoration: none;
      border: 0px;
      background-color: transparent;
      padding: 0px;
      opacity: 0.8;
      box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 3px, rgba(0, 0, 0, 0.5) 0px 8px 15px -5px;
      transition: opacity 0.25s ease 0s;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        inset: 0px;
        border-radius: 32px;
        box-shadow: rgba(255, 255, 255, 0.8) 0px 0px 0px 1px inset
      }
    }
    .card-avatar-info {
      object-fit: cover;
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .mantine-1omorxi {
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    gap: 4px;
  }
  .card-view {
    box-sizing: border-box;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    font-size: 16px;
    cursor: pointer;
    color: #fff;
  }
}
</style>