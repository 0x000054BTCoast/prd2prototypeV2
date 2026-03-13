<template>
  <el-tabs>
    <el-tab-pane label="HTML Preview">
      <iframe class="preview-frame" :srcdoc="html" />
    </el-tab-pane>
    <el-tab-pane label="SVG Preview">
      <div class="svg-wrap" v-html="svg"></div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
defineProps<{ html: string; svg: string }>();
</script>

<style scoped>
.preview-frame {
  width: 100%;
  height: 720px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  background: #fff;
}

.svg-wrap {
  min-height: 720px;
  overflow: auto;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  background: #fff;
  padding: 12px;
}
</style>
