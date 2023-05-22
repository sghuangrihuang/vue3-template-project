
<template>
  <el-row>
    <el-col :span="15">
      <el-form ref="formRef" label-width="150px" style="height:1080px;">
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
            <div class="demo-image__preview" style="margin-left: 15px;height: 200px;" v-if="tabs_data.image">
              <el-image style="height: 200px;" :src=tabs_data.image :zoom-rate="1.2" :initial-index="4" fit="cover" />
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
        <el-form-item label="解析提示词 Tag：" v-if="tabs_data.png_metadata?.parameters">
          <el-input :value="tabs_data.png_metadata?.parameters" :autosize="{ minRows: 10 }" type="textarea"
            placeholder="解析提示词 TAG" />
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="8">
      <div class="demo-image__preview" style="width: auto;height: auto;">
        <el-image style="max-width: 400px;" :src=tabs_data.image fit="cover"
          :preview-src-list=tabs_data.generate_images.images />
      </div>
    </el-col>
  </el-row>
</template>
  
<script lang="ts" setup>
import { ref, reactive, onMounted, Component } from 'vue'
import type { FormInstance } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import exifr from 'exifr';

const formRef = ref<FormInstance>()
const uploadRef = ref<InstanceType<Component & any>>(); // 声明 uploadRef，它是一个 Upload 组件的实例

// do not use same name with ref

const tabs_data = reactive({
  generate_images: { images: [] as any, info: { all_seeds: [], all_subseeds: [] } },
  png_metadata: { parameters: "" },
  submit_disabled: false,
  interrogators: [],
  image: ""
})

onMounted(async () => {
})



const handleUploadChange = async (file: any) => {
  uploadRef.value?.clearFiles();
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = async () => {
    tabs_data.generate_images.images = []
    const base64 = reader.result as string
    tabs_data.image = base64
    // 在这里可以将base64提交到服务器或者进行其他操作
    tabs_data.png_metadata = await exifr.parse(file.raw);
    tabs_data.generate_images.images.push(base64)
    // console.log(base64)
    // console.log(metadata);
  }

}

const handleUploadRemove = async (file: any) => {
  tabs_data.image = ""
  console.log(file)
}


const onReset = () => {
  uploadRef.value?.clearFiles();
  tabs_data.png_metadata = { parameters: "" },
    tabs_data.image = ""
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