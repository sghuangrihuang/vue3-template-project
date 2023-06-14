
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
              <el-image style="height: 200px;" :src=tabs_data.form.image :zoom-rate="1.2" :initial-index="4"
                fit="cover" />
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="反推模型：" prop="model" v-if="false">
          <el-select v-model="tabs_data.form.model" placeholder="please select your zone">
            <el-option :label="model" :value="model" v-for="model in tabs_data.interrogators" />
          </el-select>
        </el-form-item>
        <el-form-item label="阈值：" prop="threshold">
          <el-slider v-model="tabs_data.form.threshold" :max=1 :step="0.01" show-input size="small" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)" :disabled="tabs_data.submit_disabled">开始反推TAG</el-button>
          <el-button @click="onReset(formRef)">重置</el-button>
        </el-form-item>
        <el-form-item label="反推提示词 Tag：" v-if="tabs_data.caption">
          <el-input :value="tabs_data.caption" :autosize="{ minRows: 10 }" type="textarea" placeholder="反推提示词 TAG" />
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="8">
      <div class="demo-image__preview" style="width: auto;height: auto;">
        <el-image style="max-width: 400px;" :src=tabs_data.form.image fit="cover"
          :preview-src-list=tabs_data.generate_images.images />
      </div>
    </el-col>
  </el-row>
</template>
  
<script lang="ts" setup>
import { ref, reactive, onMounted, Component } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElNotification } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import axios from 'axios'

const formRef = ref<FormInstance>()
const uploadRef = ref<InstanceType<Component & any>>(); // 声明 uploadRef，它是一个 Upload 组件的实例

// do not use same name with ref

interface img2tagFormData {
  threshold: number;
  model: string;
  image: string | undefined; // 将类型声明为 string | null
}

const tabs_data = reactive({
  generate_images: { images: [] as any, info: { all_seeds: [], all_subseeds: [] } },
  submit_disabled: false,
  interrogators: [],
  caption: "",
  form: {
    threshold: 0.35,
    model: 'wd14-vit-v2-git',
    image: undefined, // 初始化为 null
  } as img2tagFormData,
})

onMounted(async () => {
  await axios({
    url: '/getInterrogators',
    method: 'GET',
  }).then(response => {
    tabs_data.interrogators = response.data.interrogators_models.models
  }).catch(error => {
    console.log(error)
    tabs_data.submit_disabled = true
    ElNotification({
      title: '服务器不在线',
      message: '服务器不在线或者故障！请联系管理员或者刷新页面！',
      duration: 0,
      type: 'error'
    })
  })
})



const handleUploadChange = async (file: any) => {
  uploadRef.value?.clearFiles();
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = async () => {
    tabs_data.generate_images.images = []
    const base64 = reader.result as string
    tabs_data.form.image = base64
    tabs_data.generate_images.images.push(base64)
    console.log(base64)
    // 在这里可以将base64提交到服务器或者进行其他操作
  }
}

const handleUploadRemove = async (file: any) => {
  tabs_data.form.image = undefined
  console.log(file)
}


const onSubmit = async (formEl: FormInstance | undefined) => {
  await axios({
    url: '/interrogate',
    method: 'POST',
    data: tabs_data.form,
  }).then(response => {
    let caption_arr = Object.keys(response.data.result.caption)
    tabs_data.caption = caption_arr.join(",")
  })
    .catch(error => {
      console.log(error);
    }).finally(() => {
      // clearInterval(percentageVal)
    });
  console.log(formEl)
}

const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  uploadRef.value?.clearFiles();
  tabs_data.caption = ""
  tabs_data.form.image = undefined
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