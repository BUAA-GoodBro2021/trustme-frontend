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
$font-type: smileySans;
$--el-font-size-base:large;
/**得意黑字体自定义命名为了 smileySans 但是我感觉还是Georgia或者serif好看一点 */
@font-face {
    font-family: smileySans;
    src: url('../../assets/fonts/SmileySans-Oblique.ttf');
    src: url('../../assets/fonts/SmileySans-Oblique.ttf') format('truetype');
    src: url('../../assets/fonts/SmileySans-Oblique.otf.woff2') format('woff2');
    src: url('../../assets/fonts/SmileySans-Oblique.ttf.woff2') format('woff2');
    src: url('../../assets/fonts/SmileySans-Oblique.otf') format('opentype');
}
.clear {
   height: 100%;
}
.main {
   // margin-top: 16px;
   display: flex;
   justify-content: space-around;
   overflow: hidden;
   background-color: white;
   height: calc(100vh - 64px - 16px);
}
</style>