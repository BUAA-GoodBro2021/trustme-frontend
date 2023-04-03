<template>
   <div class="clear">
      <Header />
      <div class="main">
         <router-view />
      </div>
   </div>
</template>
<script setup>
import Header from '../components/layout/Header.vue';
</script>
<style lang="scss" scoped>
.clear {
   height: 100%;
}
.main {
   margin-top: 16px;
   display: flex;
   justify-content: space-around;
   overflow: hidden;
   background-color: white;
   height: 100%;
}
</style>