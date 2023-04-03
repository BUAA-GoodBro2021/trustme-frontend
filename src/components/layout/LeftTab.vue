<template>
    <router-link to="/">
        <img src="/trustMe.png" class="header-png"/>
    </router-link>
   <el-menu
   :default-active="activeIndex"
   mode="horizontal"
   @select="handleSelect"
   :ellipsis="false"
   >
   <template v-for="(item,index) in rightList" :key="index">
    <el-menu-item :index="item.name">
        {{ item.name }}
    </el-menu-item>
   </template>
   </el-menu>
</template>
<script setup>
const activeIndex = ref("首页");
const rightList = ref([
    {
        name:'首页',
        link:"/",
    },
    {
        name:'电子病历分析',
        link:"/",
    },
])
const handleSelect = (item)=>{
    console.log(item);
}
</script>
<style scoped>
.el-menu--horizontal{
    border-bottom: none;
}
.header-png{
    margin-top: 10px;
    height: 55px;
    width: 90px;
    margin-left: 10px;
}
</style>