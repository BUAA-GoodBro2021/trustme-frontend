<template>
    <img src="/doctor.png" class="header-png"/>
    <ul class="menu" ref="menu">
        <li class="menu-item">
            TrustMe
        </li>
        <li v-for="(item,index) in leftList" 
            :index="item.name" 
            class="menu-item" 
            @click="handleClick(index)">
            <router-link :to="item.link">
                {{ item.name }}
            </router-link>
        </li>
    </ul>
</template>
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
const menu = ref(null);
const handleClick = (index) => {
    let list = menu.value.children;
    for(let i = 0; i < list.length; i++){
        list[i].classList.remove('active');
    }
    menu.value.children[index+1].classList.add('active');
};
const leftList = ref([
    {
        name:'首页',
        link:"/",
    },
    {
        name:'超参设置',
        link:"/upload",
    },
    {
        name:'电子病历分析',
        link:"/dataAnalysis",
    },
    {
        name:'不公平性分析',
        link:"/unfairnessAnalysis",
    },
]);
onMounted(() => {
    let index = leftList.value.findIndex(item => item.name === route.name);
    handleClick(index);
});
</script>
<style lang="scss" scoped>
.menu{
    height: 100%;
    display: flex;
    &-item{
        display: flex;
        align-items: center;
        margin-left: 20px;
        height: 100%;
        cursor: pointer;
        color: white;
    }
}
.active{
    border-bottom: 2px solid white;
}
.header-png{
    margin-top: 5px;
    height: 55px;
    width: 55px;
    border-radius: 27px;
    margin-left: 10px;
}
</style>