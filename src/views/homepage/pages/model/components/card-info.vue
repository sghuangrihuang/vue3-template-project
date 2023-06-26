<script setup lang="ts">
import CardItem from './../types/card-item'
import { LazyImg } from 'vue-waterfall-plugin-next'

defineProps<{
  item: CardItem
}>()

</script>

<template>
  <div class="card-info" v-if="item.model_images && item.model_images.length > 0">
    <div class="card-image">
      <LazyImg :url="item.model_images[0].url" />
    </div>
    <div class="card-footer">
      <!-- <div class="card-group">
        <div class="card-avatar">
          <img class="card-avatar-info" src="" />
        </div>
      </div> -->
      <div class="card-footer-b">
        <div class="card-name">
          <div class="card-name-data">{{item.name}}</div>
        </div>
      </div>
    </div>
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
  position: relative;
  overflow: hidden;
  background: linear-gradient(rgb(43, 138, 62) 0%, rgb(37, 38, 43) 100%);
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
}
</style>