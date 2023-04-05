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
$font-type: smileySans;
@font-face {
    font-family: smileySans;
    src: url('../../assets/fonts/SmileySans-Oblique.ttf');
    src: url('../../assets/fonts/SmileySans-Oblique.ttf') format('truetype');
    src: url('../../assets/fonts/SmileySans-Oblique.otf.woff2') format('woff2');
    src: url('../../assets/fonts/SmileySans-Oblique.ttf.woff2') format('woff2');
    src: url('../../assets/fonts/SmileySans-Oblique.otf') format('opentype');
}
.header{
    font-size: large;
    font-weight:500;
    font-family: $font-type;
    width: 100%;
    z-index: 10;
    background-color: white;
    box-shadow: 0 1px 4px #00000014;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    position: sticky;
    &-left-entry{
        display: flex;
        position: relative;
        height: 100%;
    };
    &-right-entry{
        display: flex;
        position: relative;
        margin-right: 30px;
    }
}
</style>