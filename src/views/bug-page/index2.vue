<template>
  <div class="bugpage">
    <div class="banner"></div>
    <div class="bugpage-container">
      <div id="app" class="content">
        <h1>缺陷提交表单</h1>
        <el-form :model="bugForm" :rules="rules" ref="bugForm" label-width="100px" @submit.prevent.stop>
          <el-form-item label="缺陷标题" prop="title">
            <el-input v-model="bugForm.title" placeholder="请输入缺陷标题" clearable></el-input>
          </el-form-item>
          <el-form-item label="缺陷类型" prop="bugType">
            <el-select v-model="bugForm.bugType" placeholder="请选择缺陷类型" clearable>
              <el-option label="普通缺陷" value="bugType1"></el-option>
              <el-option label="线上缺陷" value="bugType2"></el-option>
              <el-option label="产品设计缺陷" value="bugType3"></el-option>
              <el-option label="业务反馈" value="bugType3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="严重级别" prop="severity">
            <el-select v-model="bugForm.severity" placeholder="请选择严重级别" clearable>
              <el-option label="P0致命" value="P0"></el-option>
              <el-option label="P1严重" value="P1"></el-option>
              <el-option label="P2一般" value="P2"></el-option>
              <el-option label="P3轻微" value="P3"></el-option>
              <el-option label="P4建议" value="P4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属项目" prop="severity">
            <el-select v-model="bugForm.project" placeholder="请选择所属项目" clearable>
              <el-option label="项目1" value="project1"></el-option>
              <el-option label="项目1" value="project2"></el-option>
              <el-option label="项目1" value="project3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺陷描述" prop="description">
            <el-input type="textarea" v-model="bugForm.description" placeholder="请输入缺陷描述" :rows="8" clearable></el-input>
          </el-form-item>
          <el-form-item label="附件上传" prop="attachment">
            <el-upload class="upload-drag-area" drag multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em> 点击上传</em></div>
              <div class="el-upload__tip">只能上传jpg/png文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="执行人员" prop="assignee">
            <el-select v-model="bugForm.assignee" placeholder="请选择执行人员" clearable>
              <el-option label="Assignee 1" value="assignee1"></el-option>
              <el-option label="Assignee 2" value="assignee2"></el-option>
              <el-option label="Assignee 3" value="assignee3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('bugForm')">提交</el-button>
            <el-button @click="resetForm('bugForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bugForm: {
        title: '',
        bugType: '',
        severity: '',
        description: '',
        attachment: '',
        assignee: '',
        project: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入缺陷标题', trigger: 'blur' }
        ],
        bugType: [
          { required: true, message: '请选择缺陷类型', trigger: 'change' }
        ],
        severity: [
          { required: true, message: '请选择严重级别', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入缺陷描述', trigger: 'blur' }
        ],
        assignee: [
          { required: true, message: '请选择执行人员', trigger: 'change' }
        ],
        project: [
          { required: true, message: '请选择所属项目', trigger: 'change' }
        ]
      },
      fileList: [] // 用于存储上传的文件列表
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}

</script>
<style scoped lang="scss">
.bugpage-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}


.content {
  position: absolute;
  margin: 100 auto;
  top: 70px;
  max-width: 700px;
  width: 100%;
  padding: 50px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.banner {
  background-position: 50%;
  background-color: var(--primary-fill-default);
  height: 300px;
  width: 100%;
  border-radius: 0;
  margin-bottom: 0;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSIyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwKSI+PHBhdGggZD0iTTExNjEgMzNsLTI3IDI3IiBzdHJva2U9InVybCgjcGFpbnQwX2xpbmVhcikiIHN0cm9rZS13aWR0aD0iMjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yODguMjE3IDQ4Ljk2NGMtMi42ODQtMS41MS0yLjcyNi01LjM1OS0uMDc3LTYuOTI4bDEyLjIzNC03LjI0NWMyLjY0OS0xLjU2OSA2LjAwNC4zMTkgNi4wMzggMy4zOThsLjE1NyAxNC4yMTdjLjAzNCAzLjA4LTMuMjc3IDUuMDQtNS45NjEgMy41M2wtMTIuMzkxLTYuOTcyeiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyKSIvPjxwYXRoIGQ9Ik03MzMtMWwtNDkuNSA0OS41IiBzdHJva2U9InVybCgjcGFpbnQyX2xpbmVhcikiIHN0cm9rZS1vcGFjaXR5PSIuOCIgc3Ryb2tlLXdpZHRoPSI0NiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMDM5LjUgODBhMS40OTkgMS40OTkgMCAxMDAtMyAxLjQ5OSAxLjQ5OSAwIDEwMCAzem0xMCAwYTEuNDk5IDEuNDk5IDAgMTAwLTMgMS40OTkgMS40OTkgMCAxMDAgM3ptMTEuNS0xLjVhMS40OTkgMS40OTkgMCAxMS0zIDAgMS40OTkgMS40OTkgMCAxMTMgMHptOC41IDEuNWExLjQ5OSAxLjQ5OSAwIDEwMC0zIDEuNDk5IDEuNDk5IDAgMTAwIDN6bTExLjUtMS41YTEuNDk5IDEuNDk5IDAgMTEtMyAwIDEuNDk5IDEuNDk5IDAgMTEzIDB6bTguNSAxLjVhMS40OTkgMS40OTkgMCAxMDAtMyAxLjQ5OSAxLjQ5OSAwIDEwMCAzem0tNTAgMjBhMS40OTkgMS40OTkgMCAxMDAtMyAxLjQ5OSAxLjQ5OSAwIDEwMCAzem0xMCAwYTEuNDk5IDEuNDk5IDAgMTAwLTMgMS40OTkgMS40OTkgMCAxMDAgM3ptMTEuNS0xLjVhMS40OTkgMS40OTkgMCAxMS0zIDAgMS40OTkgMS40OTkgMCAxMTMgMHptOC41IDEuNWExLjQ5OSAxLjQ5OSAwIDEwMC0zIDEuNDk5IDEuNDk5IDAgMTAwIDN6bTExLjUtMS41YTEuNDk5IDEuNDk5IDAgMTEtMyAwIDEuNDk5IDEuNDk5IDAgMTEzIDB6bTguNSAxLjVhMS40OTkgMS40OTkgMCAxMDAtMyAxLjQ5OSAxLjQ5OSAwIDEwMCAzek0xMDQxIDg4LjVhMS40OTkgMS40OTkgMCAxMS0zIDAgMS40OTkgMS40OTkgMCAxMTMgMHptMTAgMGExLjQ5OSAxLjQ5OSAwIDExLTMgMCAxLjQ5OSAxLjQ5OSAwIDExMyAwem04LjUgMS41YTEuNDk5IDEuNDk5IDAgMTAwLTMgMS40OTkgMS40OTkgMCAxMDAgM3ptMTEuNS0xLjVhMS40OTkgMS40OTkgMCAxMS0zIDAgMS40OTkgMS40OTkgMCAxMTMgMHptOC41IDEuNWExLjQ5OSAxLjQ5OSAwIDEwMC0zIDEuNDk5IDEuNDk5IDAgMTAwIDN6bTExLjUtMS41YTEuNDk5IDEuNDk5IDAgMTEtMyAwIDEuNDk5IDEuNDk5IDAgMTEzIDB6bS01MS41IDIxLjVhMS41IDEuNSAwIDEwLjAwMS0yLjk5OSAxLjUgMS41IDAgMDAtLjAwMSAyLjk5OXptMTAgMGExLjUgMS41IDAgMTAuMDAxLTIuOTk5IDEuNSAxLjUgMCAwMC0uMDAxIDIuOTk5em0xMS41LTEuNWExLjUgMS41IDAgMTEtMi45OTkuMDAxIDEuNSAxLjUgMCAwMTIuOTk5LS4wMDF6bTguNSAxLjVhMS41IDEuNSAwIDEwLjAwMS0yLjk5OSAxLjUgMS41IDAgMDAtLjAwMSAyLjk5OXptMTEuNS0xLjVhMS41IDEuNSAwIDExLTIuOTk5LjAwMSAxLjUgMS41IDAgMDEyLjk5OS0uMDAxem04LjUgMS41YTEuNSAxLjUgMCAxMC4wMDEtMi45OTkgMS41IDEuNSAwIDAwLS4wMDEgMi45OTl6bS00OC41IDguNWExLjUgMS41IDAgMTEtMi45OTkuMDAxIDEuNSAxLjUgMCAwMTIuOTk5LS4wMDF6bTEwIDBhMS41IDEuNSAwIDExLTIuOTk5LjAwMSAxLjUgMS41IDAgMDEyLjk5OS0uMDAxem04LjUgMS41YTEuNSAxLjUgMCAxMC4wMDEtMi45OTkgMS41IDEuNSAwIDAwLS4wMDEgMi45OTl6bTExLjUtMS41YTEuNSAxLjUgMCAxMS0yLjk5OS4wMDEgMS41IDEuNSAwIDAxMi45OTktLjAwMXptOC41IDEuNWExLjUgMS41IDAgMTAuMDAxLTIuOTk5IDEuNSAxLjUgMCAwMC0uMDAxIDIuOTk5em0xMS41LTEuNWExLjUgMS41IDAgMTEtMi45OTkuMDAxIDEuNSAxLjUgMCAwMTIuOTk5LS4wMDF6IiBmaWxsPSIjOTNCM0ZGIi8+PHBhdGggb3BhY2l0eT0iLjgiIGQ9Ik01MzAgNjFjMCAxMy4yNTUtMTAuNzQ1IDI0LTI0IDI0cy0yNC0xMC43NDUtMjQtMjQgMTAuNzQ1LTI0IDI0LTI0IDI0IDEwLjc0NSAyNCAyNHoiIGZpbGw9InVybCgjcGFpbnQzX2xpbmVhcikiLz48Y2lyY2xlIGN4PSIxMjQxIiBjeT0iODAiIHI9IjEwIiBmaWxsPSJ1cmwoI3BhaW50NF9saW5lYXIpIi8+PHBhdGggb3BhY2l0eT0iLjkiIGQ9Ik0zNDYuNSAxNzFMMjU3IDI2MC41IiBzdHJva2U9InVybCgjcGFpbnQ1X2xpbmVhcikiIHN0cm9rZS13aWR0aD0iODQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjEwLjUgMTM4YTEuNSAxLjUgMCAxMC0uMDAxLTMuMDAxQTEuNSAxLjUgMCAwMDIxMC41IDEzOHptMTAgMGExLjUgMS41IDAgMTAtLjAwMS0zLjAwMUExLjUgMS41IDAgMDAyMjAuNSAxMzh6bTExLjUtMS41YTEuNSAxLjUgMCAxMS0zLjAwMS0uMDAxIDEuNSAxLjUgMCAwMTMuMDAxLjAwMXptOC41IDEuNWExLjUgMS41IDAgMTAtLjAwMS0zLjAwMUExLjUgMS41IDAgMDAyNDAuNSAxMzh6bTExLjUtMS41YTEuNSAxLjUgMCAxMS0zLjAwMS0uMDAxIDEuNSAxLjUgMCAwMTMuMDAxLjAwMXptOC41IDEuNWExLjUgMS41IDAgMTAtLjAwMS0zLjAwMUExLjUgMS41IDAgMDAyNjAuNSAxMzh6bS01MCAyMGExLjUgMS41IDAgMTAtLjAwMS0zLjAwMUExLjUgMS41IDAgMDAyMTAuNSAxNTh6bTEwIDBhMS41IDEuNSAwIDEwLS4wMDEtMy4wMDFBMS41IDEuNSAwIDAwMjIwLjUgMTU4em0xMS41LTEuNWExLjUgMS41IDAgMTEtMy4wMDEtLjAwMSAxLjUgMS41IDAgMDEzLjAwMS4wMDF6bTguNSAxLjVhMS41IDEuNSAwIDEwLS4wMDEtMy4wMDFBMS41IDEuNSAwIDAwMjQwLjUgMTU4em0xMS41LTEuNWExLjUgMS41IDAgMTEtMy4wMDEtLjAwMSAxLjUgMS41IDAgMDEzLjAwMS4wMDF6bTguNSAxLjVhMS41IDEuNSAwIDEwLS4wMDEtMy4wMDFBMS41IDEuNSAwIDAwMjYwLjUgMTU4ek0yMTIgMTQ2LjVhMS41IDEuNSAwIDExLTMuMDAxLS4wMDEgMS41IDEuNSAwIDAxMy4wMDEuMDAxem0xMCAwYTEuNSAxLjUgMCAxMS0zLjAwMS0uMDAxIDEuNSAxLjUgMCAwMTMuMDAxLjAwMXptOC41IDEuNWExLjUgMS41IDAgMTAtLjAwMS0zLjAwMUExLjUgMS41IDAgMDAyMzAuNSAxNDh6bTExLjUtMS41YTEuNSAxLjUgMCAxMS0zLjAwMS0uMDAxIDEuNSAxLjUgMCAwMTMuMDAxLjAwMXptOC41IDEuNWExLjUgMS41IDAgMTAtLjAwMS0zLjAwMUExLjUgMS41IDAgMDAyNTAuNSAxNDh6bTExLjUtMS41YTEuNSAxLjUgMCAxMS0zLjAwMS0uMDAxIDEuNSAxLjUgMCAwMTMuMDAxLjAwMXpNMjEwLjUgMTY4YTEuNSAxLjUgMCAxMC0uMDAxLTMuMDAxQTEuNSAxLjUgMCAwMDIxMC41IDE2OHptMTAgMGExLjUgMS41IDAgMTAtLjAwMS0zLjAwMUExLjUgMS41IDAgMDAyMjAuNSAxNjh6bTExLjUtMS41YTEuNSAxLjUgMCAxMS0zLjAwMS0uMDAxIDEuNSAxLjUgMCAwMTMuMDAxLjAwMXptOC41IDEuNWExLjUgMS41IDAgMTAtLjAwMS0zLjAwMUExLjUgMS41IDAgMDAyNDAuNSAxNjh6bTExLjUtMS41YTEuNSAxLjUgMCAxMS0zLjAwMS0uMDAxIDEuNSAxLjUgMCAwMTMuMDAxLjAwMXptOC41IDEuNWExLjUgMS41IDAgMTAtLjAwMS0zLjAwMUExLjUgMS41IDAgMDAyNjAuNSAxNjh6bS00OC41IDguNWExLjUgMS41IDAgMTEtMy4wMDEtLjAwMSAxLjUgMS41IDAgMDEzLjAwMS4wMDF6bTEwIDBhMS41IDEuNSAwIDExLTMuMDAxLS4wMDEgMS41IDEuNSAwIDAxMy4wMDEuMDAxem04LjUgMS41YTEuNSAxLjUgMCAxMC0uMDAxLTMuMDAxQTEuNSAxLjUgMCAwMDIzMC41IDE3OHptMTEuNS0xLjVhMS41IDEuNSAwIDExLTMuMDAxLS4wMDEgMS41IDEuNSAwIDAxMy4wMDEuMDAxem04LjUgMS41YTEuNSAxLjUgMCAxMC0uMDAxLTMuMDAxQTEuNSAxLjUgMCAwMDI1MC41IDE3OHptMTEuNS0xLjVhMS41IDEuNSAwIDExLTMuMDAxLS4wMDEgMS41IDEuNSAwIDAxMy4wMDEuMDAxeiIgZmlsbD0iIzc5QTBGRiIvPjxjaXJjbGUgY3g9IjE0MC4zOTUiIGN5PSIxOTEuMzk1IiByPSIyNC4zOTUiIGZpbGw9InVybCgjcGFpbnQ2X2xpbmVhcikiLz48Y2lyY2xlIGN4PSIxMDI5LjM5IiBjeT0iNjUuMzk1IiByPSIyNC4zOTUiIGZpbGw9InVybCgjcGFpbnQ3X2xpbmVhcikiLz48cGF0aCBkPSJNMzY2IDk1bC01MSA1MSIgc3Ryb2tlPSJ1cmwoI3BhaW50OF9saW5lYXIpIiBzdHJva2Utb3BhY2l0eT0iLjgiIHN0cm9rZS13aWR0aD0iNDYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik04MTEuNSAxMTRMNzIyIDIwMy41IiBzdHJva2U9InVybCgjcGFpbnQ5X2xpbmVhcikiIHN0cm9rZS13aWR0aD0iODQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xMTQ3LjUgMTY2bC04NC41IDg0LjUiIHN0cm9rZT0idXJsKCNwYWludDEwX2xpbmVhcikiIHN0cm9rZS13aWR0aD0iNzQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xMzY1IDEwN2wtNDIuNSA0Mi41IiBzdHJva2U9InVybCgjcGFpbnQxMV9saW5lYXIpIiBzdHJva2Utd2lkdGg9IjM4IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMTYwIDc3bC0xOCAxOCIgc3Ryb2tlPSJ1cmwoI3BhaW50MTJfbGluZWFyKSIgc3Ryb2tlLXdpZHRoPSIxOSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggb3BhY2l0eT0iLjYiIGQ9Ik0xMzMgMTE0YTkgOSAwIDAxLTkgOSA5IDkgMCAwMS05LTkgOSA5IDAgMDE5LTkgOSA5IDAgMDE5IDl6IiBmaWxsPSJ1cmwoI3BhaW50MTNfbGluZWFyKSIvPjxjaXJjbGUgb3BhY2l0eT0iLjgiIGN4PSIxMjc4IiBjeT0iMTk1IiByPSIyMiIgZmlsbD0iIzRBOTZGRiIvPjwvZz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXIiIHgxPSIxMTcxIiB5MT0iMjIuNSIgeDI9IjExMjMiIHkyPSI3MC41IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzY4QzBGRiIgc3RvcC1vcGFjaXR5PSIuODgiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzMzcwRkYiIHN0b3Atb3BhY2l0eT0iLjc2Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXIiIHgxPSIyODQuMjk4IiB5MT0iNTMuOTg2IiB4Mj0iMzEyLjE2NCIgeTI9IjM5LjE1NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiM5REZCRUUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNDNUZCRkYiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQyX2xpbmVhciIgeDE9Ijc0NS40NTEiIHkxPSItMTQiIHgyPSI2NzEuNTEiIHkyPSI1OS45NDEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjNjhDMEZGIiBzdG9wLW9wYWNpdHk9Ii43NCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzY4QzBGRiIgc3RvcC1vcGFjaXR5PSIuMjEiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQzX2xpbmVhciIgeDE9IjQ5My41IiB5MT0iNDAiIHgyPSI1MTUiIHkyPSI4MS41IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzcxRkZFQyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzg4RjhGRiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDRfbGluZWFyIiB4MT0iMTIzNi41MiIgeTE9IjcyLjciIHgyPSIxMjQ2LjgiIHkyPSI4Ni44MTkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjREJBRUZGIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjN0FGN0ZGIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50NV9saW5lYXIiIHgxPSIzNjEuNSIgeTE9IjE1MS41IiB4Mj0iMjUyIiB5Mj0iMjY1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzY4QzBGRiIgc3RvcC1vcGFjaXR5PSIuOCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzY4QzBGRiIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50Nl9saW5lYXIiIHgxPSIxMjkuNDU2IiB5MT0iMTczLjU4NyIgeDI9IjE1NC41NDkiIHkyPSIyMDguMDI4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0RCQUVGRiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzdBRjdGRiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDdfbGluZWFyIiB4MT0iMTAxOC40NiIgeTE9IjQ3LjU4NyIgeDI9IjEwNDMuNTUiIHkyPSI4Mi4wMjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjREJBRUZGIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjN0FGN0ZGIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50OF9saW5lYXIiIHgxPSIzODIiIHkxPSI3OC41IiB4Mj0iMzEwIiB5Mj0iMTUwLjUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjNjhDMEZGIiBzdG9wLW9wYWNpdHk9Ii43Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNjhDMEZGIiBzdG9wLW9wYWNpdHk9Ii4yMSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDlfbGluZWFyIiB4MT0iODE3IiB5MT0iMTA4IiB4Mj0iNzE3IiB5Mj0iMjA4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzY4QzBGRiIgc3RvcC1vcGFjaXR5PSIuOCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzMzNzBGRiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDEwX2xpbmVhciIgeDE9IjExNzgiIHkxPSIxMzUiIHgyPSIxMDkxLjUiIHkyPSIyMjEuNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNCNEZGRkMiIHN0b3Atb3BhY2l0eT0iLjc4Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjQjRGRkZDIiBzdG9wLW9wYWNpdHk9Ii4yNCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDExX2xpbmVhciIgeDE9IjEzNzUuNSIgeTE9Ijk2IiB4Mj0iMTMwOSIgeTI9IjE2Mi41IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzY4QzBGRiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzM0NzlGRiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDEyX2xpbmVhciIgeDE9IjE5OS41IiB5MT0iMzciIHgyPSIxMTMiIHkyPSIxMjMuNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiM2OEMwRkYiIHN0b3Atb3BhY2l0eT0iLjc0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNjhDMEZGIiBzdG9wLW9wYWNpdHk9Ii4yMSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJwYWludDEzX2xpbmVhciIgeDE9IjExNiIgeTE9IjEwOS41IiB4Mj0iMTMzIiB5Mj0iMTE4LjUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjNjhDMEZGIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjQ0ZERUZGIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNjhDMEZGIi8+PC9saW5lYXJHcmFkaWVudD48Y2xpcFBhdGggaWQ9ImNsaXAwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDE0NDB2MjAwSDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+);
  background-size: auto 300px
}

h1 {
  text-align: center;
}
</style>