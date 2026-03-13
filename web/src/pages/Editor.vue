<template>
  <el-card>
    <template #header>
      <div class="header">
        <span>Page Spec (Markdown)</span>
        <el-button type="primary" :loading="loading" @click="$emit('generate')">Generate Prototype</el-button>
      </div>
    </template>
    <el-input v-model="localSpec" type="textarea" :rows="30" @input="$emit('update:spec', localSpec)" />
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ spec: string; loading: boolean }>();
const localSpec = ref(props.spec);

watch(
  () => props.spec,
  (value) => {
    localSpec.value = value;
  }
);

defineEmits<{
  (e: 'update:spec', value: string): void;
  (e: 'generate'): void;
}>();
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
