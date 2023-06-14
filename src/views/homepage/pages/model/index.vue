<script setup lang="ts">
import Layout from "./../../components/layout.vue";
import { reactive, onMounted } from 'vue'
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

interface ItemData {
  src: string;
  title: string;
}

interface Data {
  items: ItemData[];
}
const imgdata = reactive<Data>({
  items: []
})

onMounted(async () => {
  var mockData: { data: { src: string, title: string }[] } = { data: [] };
  for (var i = 0; i < 10; i++) {
      mockData.data[i] = {
          src: 'img/' + Math.ceil(Math.random() * 18) + '.jpeg',
          title: '图片' + Math.ceil(Math.random() * 18)
      }
  }
  imgdata.items.push(...mockData.data);
})
// 生成模拟数据
// var mockData: { data: { src: string, title: string }[] } = { data: [] };
//         for (var i = 0; i < 10; i++) {
//             mockData.data[i] = {
//                 src: 'img/' + Math.ceil(Math.random() * 18) + '.jpeg',
//                 title: '图片' + Math.ceil(Math.random() * 18)
//             }
//         }

//         var arr = [];
//         for (var i = 0, len = mockData.data.length; i < len; i++) {
//             var data = mockData.data[i];
//             arr.push('<div class="pin"><img src="https://mqyqingfeng.github.io/waterfall/' + data.src + '" class="img" alt="'+ data.title +'"> <p class="description">'+ data.title +'</p></div>')
//         }

//         // 调用 append 方法 检验是否所有的图片都具有高度后才会 append 进文档树中
//         waterfall.append(arr.join(''), '.img')
</script>

<template>
  <Layout>
    <component :is="Waterfall" :line-gap="200" :watch="imgdata.items">
      <component :is="WaterfallSlot">
        <div class="pin" v-for="item in imgdata.items">
          <img :src="'https://mqyqingfeng.github.io/waterfall'+item.src" class="img" :alt="item.title">
          <p class="description">{{ item.title }}</p>
        </div>
      </component>
    </component>
  </Layout>
</template>

<style scoped lang="scss">

</style>