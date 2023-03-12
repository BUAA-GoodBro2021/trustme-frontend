<template>
   <div class="header">
    <ul class="header-left-entry">
        <LeftTab/>
    </ul>
    <ul class="header-right-entry">
        <UserInfo/>
    </ul>
   </div>
</template>
<script setup>
import LeftTab from "./LeftTab.vue";
import UserInfo from "./UserInfo.vue";
</script>
<style lang="scss" scoped>
.header{
    font-size: medium;
    font-weight:500;
    width: 100%;
    background-color: white;
    // border-bottom: #00000014 solid;
    box-shadow: 0 1px 4px #00000014;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    position: fixed;
    z-index: 1145;
    &-left-entry{
        display: flex;
        position: relative;
        height: 100%;
    };
    &-right-entry{
        display: flex;
        position: relative;
        margin-right: 20px;
    }
}
</style>