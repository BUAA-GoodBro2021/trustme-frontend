<template>
   <div class="userInfo">
    <el-avatar :size="50" :src="circleUrl" />
    <span>
        欢迎，{{ userName }}
        <el-icon><ArrowDown /></el-icon>
    </span>
   </div>
</template>
<script setup>
const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const userName = ref("LLLeo");
</script>
<style lang="scss" scoped>
.userInfo{
    text-align: center;
    display: flex;
    align-items: center;
}
</style>