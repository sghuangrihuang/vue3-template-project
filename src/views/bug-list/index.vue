<template>
  <div class="bug-list">
    <h2 class>{{userStore.getName}} 提交记录</h2>
    <el-table :data="form.addBugList" border>
      <el-table-column prop="work_item_id" label="id" />
      <el-table-column prop="create_time" label="时间">
        <template #default="{ row }">
          {{ row.create_time }}
        </template>
      </el-table-column>
      <el-table-column prop="status" width="100" label="状态" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { getAddBugList } from '~/api'
import useUserStore from '~/store/modules/user';
// import addBugJson from '~/mock/add_bug.json'
const userStore = useUserStore()

const form = reactive<{
  addBugList: any[]
}>({
  addBugList: []
})

const fetchAddBugList = async () => {
  try {
    const res: any = await getAddBugList({
      name: userStore.getName,
    })
    form.addBugList = res
  } catch (_) {
    console.log('fetchAddBugList', _)
    // form.addBugList = addBugJson
  }
}

onMounted(() => {
  fetchAddBugList()
})

</script>
<style scoped lang="scss">
</style>