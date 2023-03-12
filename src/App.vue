<script setup>
const noSpace = reactive({
   autoInsertSpace: false,
})
</script>

<template>
  <el-config-provider :button="noSpace">
    <RouterView />
  </el-config-provider>
</template>