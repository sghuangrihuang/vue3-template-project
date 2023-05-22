
<template>
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

        <el-form-item label="图片类型：" prop="sampler_name">
          <el-radio-group v-model="tabs_data.form.sampler_name" v-for="item in ['卡通/动漫/二次元', '相片/照片']">
            <el-radio :label="item" border>{{ item }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="放大倍数：" prop="sampler_name">
          <el-radio-group v-model="tabs_data.form.sampler_name" v-for="item in [2, 4, 8]">
            <el-radio :label="item" border>{{ item }}X</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="降噪程度：" prop="sampler_name">
          <el-radio-group v-model="tabs_data.form.sampler_name" v-for="item in ['无', '低', '中', '高', '最高']">
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

    </el-col>
  </el-row>
</template>
  
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElNotification } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import axios from 'axios'
const formRef = ref<FormInstance>()
const options_data = {
  hr_upscalers: [
    {
      label: "潜变量 ",
      value: "Latent"
    },
    {
      label: "潜变量 (抗锯齿) ",
      value: "Latent (antialiased)"
    },
    {
      label: "潜变量 (bicubic) ",
      value: "Latent (bicubic)"
    },
    {
      label: "潜变量 (bicubic 抗锯齿) ",
      value: "Latent (bicubic antialiased)"
    },
    {
      label: "潜变量 (最近邻) ",
      value: "Latent (nearest)"
    },
    {
      label: "潜变量 (最近邻-整数) ",
      value: "Latent (nearest-exact)"
    },
    {
      label: "无 ",
      value: "None"
    },
    {
      label: "Lanczos ",
      value: "Lanczos"
    },
    {
      label: "最邻近(整数缩放) ",
      value: "Nearest"
    },
    {
      label: "BSRGAN ",
      value: "BSRGAN"
    },
    {
      label: "ESRGAN_4x ",
      value: "ESRGAN_4x"
    },
    {
      label: "LDSR ",
      value: "LDSR"
    },
    {
      label: "R-ESRGAN 4x+ ",
      value: "R-ESRGAN 4x+"
    },
    {
      label: "R-ESRGAN 4x+ Anime6B ",
      value: "R-ESRGAN 4x+ Anime6B"
    },
    {
      label: "ScuNET ",
      value: "ScuNET"
    },
    {
      label: "ScuNET PSNR ",
      value: "ScuNET PSNR"
    },
    {
      label: "SwinIR 4x ",
      value: "SwinIR_4x"
    }
  ]
}
// do not use same name with ref

const tabs_data = reactive({
  submit_disabled: false,
  percentage: 0,
  percentageFlag: false,
  base64url: '',
  sd_models: [{ title: '', model_name: '', }],
  samplers: [{ name: '' }],
  upscalers: [],
  prompt_styles: [{ name: '' }],
  form: {
    prompt: 'masterpiece,best quality,official art,extremely detailed CG unity 8k wallpaper',
    negative_prompt: "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, bad feet, monochrome, zombie",//反向提示词
    height: 512,
    width: 512,
    steps: 20,//步数 迭代次数
    cfg_scale: 7,//提示词相关性
    CLIP_stop_at_last_layers: 2,
    sd_model_checkpoint: "animefull-latest.ckpt [a7529df023]",//模型
    seed: -1,//种子
    styles: [],//模板风格
    sampler_name: "DPM++ 2M Karras",//采样方法
    hr_upscaler: 'Latent',//放大算法
    hr_scale: 2,//放大倍率
    denoising_strength: 0,//重绘幅度
    restore_faces: false,//面部修复
    tiling: false,//平铺/分块
    enable_hr: false,//高清修复
    save_images: false,//是否保存图片 -->

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
    url: '/generateText2Img',
    method: 'POST',
    data: tabs_data.form,
  }).then(response => {
    tabs_data.percentage = 100
    tabs_data.base64url = response.data
    console.log(response);
  })
    .catch(error => {
      console.log(error);
    });
  tabs_data.percentageFlag = false
  tabs_data.submit_disabled = false,
    console.log('submit!')
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