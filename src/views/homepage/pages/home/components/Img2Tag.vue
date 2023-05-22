
<template>
  <div>
    <img alt="Vue logo" class="element-plus-logo" />
    <!-- <HelloWorld msg="Hello Vue 3.0 + Element Plus + Vite" /> -->
  </div>
  <el-row>
    <el-col :span="15">
      <el-form :model="tabs_data.form" ref="formRef" label-width="150px">
        <el-form-item label="图片上传：" prop="prompt">
          <el-upload class="upload-demo" style="width:900px" drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
              </div>
            </template>
          </el-upload>
        </el-form-item>

      </el-form>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="8">

    </el-col>
  </el-row>
</template>
  
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
const formRef = ref<FormInstance>()
// do not use same name with ref

const tabs_data = reactive({
  form: {}
})

onMounted(async () => {

})

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