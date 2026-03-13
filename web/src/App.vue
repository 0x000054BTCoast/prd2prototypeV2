<template>
  <div style="padding: 24px; background: #f5f7fa; min-height: 100vh;">
    <el-row :gutter="16">
      <el-col :span="12">
        <Editor :spec="spec" :loading="loading" @update:spec="spec = $event" @generate="run" />
      </el-col>
      <el-col :span="12">
        <Preview :html="html" :svg="svg" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Editor from './pages/Editor.vue';
import Preview from './pages/Preview.vue';
import { generatePrototype } from './api/prototypeApi';

const spec = ref(`# 页面\n页面名称：用户管理\n页面类型：列表页\n页面布局：侧边栏 + 内容\n---\n## 模块：搜索区\nInput: 用户名\nSelect: 状态\nButton: 搜索\nButton: 新建用户\n---\n## 模块：用户表格\nTable: 用户列表\n字段：\n用户名 | 文本\n状态 | 标签\n创建时间 | 时间\n---\n## 模块：分页\nPagination`);
const html = ref('');
const svg = ref('');
const loading = ref(false);

const run = async () => {
  loading.value = true;
  try {
    const response = await generatePrototype(spec.value);
    html.value = response.html;
    svg.value = response.svg;
  } finally {
    loading.value = false;
  }
};

run();
</script>
