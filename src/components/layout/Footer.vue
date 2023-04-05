<template>
    <div class="footer">
            <div class="footer-text">
                <p><a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">京ICP备2022007189号-2</a></p>
            </div>
            <div class="footer-text">
                <p><a target="_blank">Copyright © 2021-2022 Super2021.</a></p>
            </div>
            <div class="footer-text">
                <p><a target="_blank">All Rights Reserved. Super2021 版权所有</a></p>
            </div>
    </div>
</template>
<style scoped lang="scss">
$font-type: smileySans;
@font-face {
    font-family: smileySans;
    src: url('../../assets/fonts/SmileySans-Oblique.ttf');
    src: url('../../assets/fonts/SmileySans-Oblique.ttf') format('truetype');
    src: url('../../assets/fonts/SmileySans-Oblique.otf.woff2') format('woff2');
    src: url('../../assets/fonts/SmileySans-Oblique.ttf.woff2') format('woff2');
    src: url('../../assets/fonts/SmileySans-Oblique.otf') format('opentype');
}
.footer{
    height:16px;
    display:flex;
    justify-content: space-around;
    // flex-direction: column;
    text-align: center;
    &-text{
        color:gray;
        font-size: 12px;
        font-family: $font-type;
    }
}
</style>