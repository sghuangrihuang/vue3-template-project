
<template>
  <el-row>
    <el-col :span="15">
      <el-form :model="tabs_data.form" ref="formRef" label-width="150px">
        <el-form-item prop="prompt">
          <template #label>
            <div style="display: flex; flex-direction: column; align-items: center;">
              <span>正向提示词 Prompt：</span>
              <span>翻译Prompt：<el-switch v-model="tabs_data.translate" @change="onTranslate" /></span>
            </div>
          </template>
          <template #default>
            <el-input v-model="tabs_data.form.prompt" @blur="onTranslate" :autosize="{ minRows: 5 }" type="textarea"
              placeholder="提示词 Prompt（图片描述词）" />
          </template>
        </el-form-item>

        <el-form-item label="反向提示词 Negative Prompt：" prop="negative_prompt">
          <el-input v-model="tabs_data.form.negative_prompt" :autosize="{ minRows: 5 }" type="textarea"
            placeholder="反向提示词 Negative Prompt（排除标签词）" />
        </el-form-item>

        <el-form-item label="高度：" prop="height">
          <el-slider v-model="tabs_data.form.height" :max="tabs_data.init.isvip ? 768 : 512" show-input size="small" />
        </el-form-item>

        <el-form-item label="宽度：" prop="width">
          <el-slider v-model="tabs_data.form.width" :max="tabs_data.init.isvip ? 768 : 512" show-input size="small" />
        </el-form-item>

        <el-form-item label="模板风格：" prop="styles">
          <el-select v-model="tabs_data.form.styles" style="width: 900px;" multiple filterable fit-input-width
            allow-create default-first-option :reserve-keyword="false" placeholder="Choose tags for your article">
            <el-option v-for="item in tabs_data.init.prompt_styles" :key="item.name" :label="item.name"
              :value="item.name" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit(formRef)" :disabled="tabs_data.submit_disabled">生成</el-button>
          <el-button @click="onReset(formRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="9">
      <div class="demo-image__preview" style="margin-left: 15px;height: 768px;">
        <el-image style="width: auto;" :src=tabs_data.base64url :zoom-rate="1.2"
          :preview-src-list=tabs_data.generate_images.images :initial-index="4" fit="cover" />
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
import { ref, reactive, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElNotification } from 'element-plus'
import axios from 'axios'

const formRef = ref<FormInstance>()
// do not use same name with ref
const percentageFormat = (percentage: number) => (percentage === 100 ? 'Full' : `${percentage.toFixed(2)}% ETA: ${tabs_data.progress.eta_relative.toFixed(2)}/s`)

const tabs_data = reactive({
  init: {
    isvip: false,
    options: { sd_model_checkpoint: '' },
    sd_models: [{ title: '', model_name: '', }],
    samplers: [{ name: '' }],
    prompt_styles: [{ name: '' }],
  },
  translate: false,
  old_prompt: '',
  queueResult: { sd_models: '', currentPosition: 0, waitingCount: 0, status: '' },
  progress: { progress: 0, eta_relative: 0 },
  submit_disabled: false,
  percentageFlag: false,
  generate_images: { images: [], info: { all_seeds: [], all_subseeds: [] } },
  base64url: 'data:image/png;base64,null',
  form: {
    type: 'text2img',
    prompt: 'masterpiece,best quality,official art,extremely detailed CG unity 8k wallpaper',
    negative_prompt: "lowres,nude, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, owres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",//反向提示词
    height: 512,
    width: 512,
    steps: 20,//步数 迭代次数
    cfg_scale: 7,//提示词相关性
    CLIP_stop_at_last_layers: 2,
    sd_model_checkpoint: "",//模型
    n_iter: 1,
    batch_size: 1,
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
  await axios({
    url: '/getInit',
    method: 'GET',
  }).then(response => {
    tabs_data.init = response.data
    tabs_data.form.sd_model_checkpoint = response.data.options.sd_model_checkpoint
    tabs_data.form.sampler_name = response.data.samplers[0].name
    tabs_data.init.isvip = true
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

const onSubmit = async (formEl: FormInstance | undefined) => {
  tabs_data.submit_disabled = true,
    tabs_data.percentageFlag = true
  // let percentageVal = setInterval(() =>{
  //     axios({url: '/getProgress',method: 'GET',}).then(response => {
  //         tabs_data.progress = response.data
  //         tabs_data.base64url = "data:image/png;base64," + response.data.current_image
  //     })
  // },1000)

  await axios({
    url: '/generateQueue',
    method: 'POST',
    data: tabs_data.form,
  }).then(response => {
    // response.data.images.forEach((v : string, i : number, arr : Array<String>) => arr[i] = "data:image/png;base64," + v);
    // response.data.info = JSON.parse(response.data.info)
    // tabs_data.generate_images = response.data
    // tabs_data.base64url = response.data.images[0]
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
    }).finally(() => {
      // clearInterval(percentageVal)
    });
  console.log(formEl)
}
const onReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  tabs_data.form.sd_model_checkpoint = tabs_data.init.options.sd_model_checkpoint
  tabs_data.form.sampler_name = tabs_data.init.samplers[0].name
}

const onTranslate = async () => {
  if (tabs_data.translate) {
    tabs_data.old_prompt = tabs_data.form.prompt
    const saltLength = 10; //定义salt的长度为10位
    let salt = '';
    for (let i = 0; i < saltLength; i++) {
      const randomNum = Math.floor(Math.random() * 10); // 生成0-9之间的整数
      salt += randomNum.toString(); // 将整数转换成字符串并拼接到salt中
    }

    let data = {
      q: tabs_data.form.prompt,
      from: 'zh',
      to: 'en',
      appid: '20230427001658548',
      salt: salt,
      sign: ''
    }

    await axios({
      url: '/translate',
      method: 'GET',
      params: data,
    }).then(response => {
      tabs_data.old_prompt = response.data.trans_result[0].src
      tabs_data.form.prompt = response.data.trans_result[0].dst
    })
      .catch(error => {
        console.log(error);
      }).finally(() => {
        // clearInterval(percentageVal)
      });
  } else {
  }

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

:deep(.el-autocomplete-suggestion) {
  width: auto !important;
}
</style>