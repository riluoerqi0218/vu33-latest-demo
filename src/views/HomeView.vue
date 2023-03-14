<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue';
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<template>
  <div class="mytest">
    <p class="text-[red]">demo</p>
    <svg-icon :icon-class="'email'"></svg-icon>
    <!-- <Edit /> -->
    <el-button type="primary">hahahha</el-button>
    <el-select placeholder="Select" size="small">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>
<style scoped lang="scss"></style>
