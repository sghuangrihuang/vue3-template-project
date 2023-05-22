
<template>
  <el-row>
    <el-col :span="15">
      <el-form :model="tabs_data.form" ref="formRef" label-width="150px" style="height:1080px;">
        <el-form-item label="图片上传：" prop="prompt">
          <el-upload ref="uploadRef" class="upload-demo" style="width:900px" drag :on-change="handleUploadChange"
            :on-remove="handleUploadRemove" accept="image/*" :limit="1" :auto-upload="false" action="#">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
              </div>
            </template>
            <div class="demo-image__preview" style="margin-left: 15px;height: 200px;" v-if="tabs_data.form.image">
              <el-image style="height: 200px;" :src=tabs_data.form.image :zoom-rate="1.2"
                :preview-src-list=tabs_data.generate_images.images :initial-index="4" fit="cover" />
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item label="图片类型：" prop="upscaler_1">
          <el-radio-group v-model="tabs_data.form.upscaler_1">
            <el-radio :label="item.value" :value="item.value" border
              v-for="item in tabs_data.upScalers">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="放大倍数：" prop="upscaling_resize">
          <el-radio-group v-model="tabs_data.form.upscaling_resize">
            <el-radio :label="item" :value="item" border v-for="item in [2, 4, 8]">{{ item }}X</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="降噪程度：" prop="sampler_name" v-if="false">
          <el-radio-group value="无" v-for="item in ['无', '低', '中', '高', '最高']">
            <el-radio :label="item" border>{{ item }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)" :disabled="tabs_data.submit_disabled">生成</el-button>
          <el-button @click="onReset(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="8">
      <el-progress :text-inside="true" :stroke-width="20" :percentage="tabs_data.percentage"
        v-if="tabs_data.percentageFlag" />
      <div class="demo-image__preview">
        <el-image style="width: 512px;" :src="tabs_data.base64url" :zoom-rate="1.2"
          :preview-src-list=[tabs_data.base64url] :initial-index="1" fit="cover" />
      </div>
      <el-divider />
      <!-- <el-progress :text-inside="true" :show-text="false" striped striped-flow :stroke-width="20" :format="percentageFormat" :percentage="tabs_data.progress.progress *100" v-if="tabs_data.percentageFlag" /> -->
      <el-progress :text-inside="true" :show-text="false" striped striped-flow :stroke-width="20"
        :format="percentageFormat" :percentage="100" v-if="tabs_data.percentageFlag" />
      <el-descriptions v-if="false && tabs_data.base64url != 'data:image/png;base64,null'">
        <el-descriptions-item label="subseed(批次种子)" v-if="false"> <span
            v-for="seed in tabs_data.generate_images.info.all_subseeds">{{ seed }}</span></el-descriptions-item>
        <el-descriptions-item label="seed(种子) "><span v-for="seed in tabs_data.generate_images.info.all_seeds">{{ seed }},
          </span></el-descriptions-item>
      </el-descriptions>
      <div v-if="tabs_data.queueResult.status == 'waiting'"><strong>当前排队人数 {{ tabs_data.queueResult.waitingCount
      }}人,您前方排队人数{{ tabs_data.queueResult.currentPosition }}人 </strong> <br /> <strong>正在处理中，排队过程遇到相同模型会插队处理
        </strong><br /><strong>购买点数可以试用更高分辨率和插队生成</strong><br /> 当前模型：{{ tabs_data.queueResult.sd_models.split('.')[0] }}
      </div>
    </el-col>
  </el-row>
</template>
  
<script lang="ts" setup>
import { ref, reactive, onMounted, Component } from 'vue'
import type { FormInstance } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

import axios from 'axios'
const formRef = ref<FormInstance>()
const uploadRef = ref<InstanceType<Component & any>>(); // 声明 uploadRef，它是一个 Upload 组件的实例

const percentageFormat = (percentage: number) => (percentage === 100 ? 'Full' : `${percentage.toFixed(2)}% ETA: ${tabs_data.progress.eta_relative.toFixed(2)}/s`)

const tabs_data = reactive({
  upScalers: [{ name: "卡通/动漫/二次元", value: "R-ESRGAN 4x+ Anime6B" }, { name: "相片/照片", value: "R-ESRGAN 4x+" }],
  queueResult: { sd_models: '', currentPosition: 0, waitingCount: 0, status: '' },
  progress: { progress: 0, eta_relative: 0 },
  submit_disabled: false,
  percentageFlag: false,
  percentage: 0,
  generate_images: { images: [], info: { all_seeds: [], all_subseeds: [] } },
  base64url: 'data:image/png;base64,null',
  form: {
    type: "extraSingleImage",
    resize_mode: 0,
    show_extras_results: true,
    gfpgan_visibility: 0,
    codeformer_visibility: 0,
    codeformer_weight: 0,
    upscaling_resize: 2,
    upscaling_resize_w: 512,
    upscaling_resize_h: 512,
    upscaling_crop: true,
    upscaler_1: "R-ESRGAN 4x+ Anime6B",
    upscaler_2: "None",
    extras_upscaler_2_visibility: 0,
    upscale_first: false,
    image: ""
  }
})

onMounted(async () => {
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  tabs_data.submit_disabled = true,
    tabs_data.percentage = 0
  tabs_data.percentageFlag = true
  setTimeout(() => {
    tabs_data.percentage = 30
  }, 1000)
  await axios({
    url: '/generateQueue',
    method: 'POST',
    data: tabs_data.form,
  }).then(response => {
    let queueVal = setInterval(() => {
      axios({ url: '/getQueue', method: 'GET', params: { id_task: response.data.id_task } }).then(res => {
        tabs_data.queueResult = res.data
        if (res.data.status == 'completed') {
          setTimeout(() => {
            // response.data.images.forEach((v : string, i : number, arr : Array<String>) => arr[i] = "http://127.0.0.1:8081/" + v);//开发测试用
            tabs_data.base64url = response.data.images[0]
            tabs_data.generate_images.images = response.data.images
          }, 1000)
          clearInterval(queueVal)
          tabs_data.submit_disabled = false
          tabs_data.percentageFlag = false
        }
        // tabs_data.progress = response.data
        // tabs_data.base64url = "data:image/png;base64," + response.data.current_image
      })
    }, 1000)
  })
    .catch(error => {
      console.log(error);
    });
  tabs_data.percentageFlag = false
  tabs_data.submit_disabled = false,
    console.log('submit!')
  console.log(formEl)
}

const handleUploadChange = async (file: any) => {
  uploadRef.value?.clearFiles();
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = async () => {
    const base64 = reader.result as string
    tabs_data.form.image = base64
  }

}

const handleUploadRemove = async (file: any) => {
  tabs_data.form.image = ""
  console.log(file)
}
const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style scoped>
.ep-radio {
  margin-right: 6px;
  margin-bottom: 6px;
}

.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>