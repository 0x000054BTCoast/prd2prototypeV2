<template>
  <el-card>
    <template #header>Prototype Preview</template>
    <PrototypeView :html="html" :svg="svg" />
  </el-card>
</template>

<script setup lang="ts">
import PrototypeView from '../components/PrototypeView.vue';

defineProps<{ html: string; svg: string }>();
</script>
