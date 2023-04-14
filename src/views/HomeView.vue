<template>
   <div class="clear">
      <Header />
      <div class="main">
         <router-view />
      </div>
      <Footer />
   </div>
</template>
<script setup>
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';
</script>
<style lang="scss" scoped>
$--el-font-size-base:large;
.clear {
   height: 100%;
}
.main {
   // margin-top: 16px;
   display: flex;
   justify-content: space-around;
   overflow: hidden;
   background-color: #eff7f8;
   height: calc(100vh - 64px - 16px);
}
</style>