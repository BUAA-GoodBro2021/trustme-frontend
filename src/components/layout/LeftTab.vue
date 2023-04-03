<template>
    <img src="/trustMe.png" class="header-png"/>
   <el-menu
   :default-active="activeIndex"
   mode="horizontal"
   @select="handleSelect"
   :ellipsis="false"
   >
   <template v-for="(item,index) in leftList" :key="index">
    <el-menu-item :index="item.name">
        <router-link :to="item.link">
            {{ item.name }}
        </router-link>
    </el-menu-item>
   </template>
   </el-menu>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const activeIndex = ref(route.name);
const leftList = ref([
    {
        name:'首页',
        link:"/",
    },
    {
        name:'电子病历分析',
        link:"/dataAnalysis",
    },
    {
        name:'不公平性分析',
        link:"/unfairnessAnalysis",
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