<template>
    <div class="main-wrap">
        <div class="up"></div>
        <div class="down"></div>
        <div class="title title1">TRUST ME</div>
        <div class="title title2 gradient-text-two">TRUST ME</div>
        <div class="start gradient-text-one">
            <router-link to="/upload">
                <span style="cursor: pointer" class="start-text">Try Now</span>
            </router-link>
        </div>
    </div>
    <div class="back-image"></div>
    <div class="white-mask"></div>
    <ParticleBackground />
</template>
<script setup>
import { useRoute } from 'vue-router';
import ParticleBackground from './ParticleBackground.vue';
const router = useRouter()
const jumpToUpload = () => {
    router.push({
        name: '超参设置'
    })
}
</script>
<style lang="scss" scoped>
/*图片的url */
$background-image-url: '../assets/image/R.jpg';
/**为了让图片不至于过于突兀 加了个蒙版来实现变相实现图片透明的效果 下面两个数值调一调你就知道他的作用了*/
$mask-color: #ffffff;
$mask-opacity: 0.7;
/**字体也设置一下吧 */
$font-type: smileySans;

/**得意黑字体自定义命名为了 smileySans 但是我感觉还是Georgia或者serif好看一点 */
@font-face {
    font-family: smileySans;
    src: url('../assets/fonts/SmileySans-Oblique.ttf');
    src: url('../assets/fonts/SmileySans-Oblique.ttf') format('truetype');
    src: url('../assets/fonts/SmileySans-Oblique.otf.woff2') format('woff2');
    src: url('../assets/fonts/SmileySans-Oblique.ttf.woff2') format('woff2');
    src: url('../assets/fonts/SmileySans-Oblique.otf') format('opentype');
}

.main-wrap {
    height: calc(100vh - 64px);
    width: 100%;
    z-index: 2;
    $start-height: 5rem;
    $font-size-1: 14rem;
    $font-size-2: 14rem;

    .up {
        width: 90%;
        margin: auto;
        height: 50%;
        background: linear-gradient(to bottom right, rgba(123, 231, 215, 0.778), rgba(130, 191, 222, 0.893));
    }

    .down {
        width: 100%;
        height: 50%;
        background-color: transparent;
    }

    .title {
        position: absolute;
        text-align: center;
        // vertical-align: center;
        // display: flex;
        // justify-content: center;
        // font-size: 14rem;
        // font-style: italic;
    }

    /*下方的文字 */

    .title1 {
        width: 100vw;
        height: $font-size-1;
        line-height: $font-size-1;
        top: calc(50vh - 7rem);
        font: $font-size-1 $font-type, Georgia;
        /** */
    }


    /*上方的文字 */
    .title2 {
        width: 100vw;
        height: $font-size-2;
        line-height: $font-size-2;
        top: calc(23vh - 7rem);
        font: $font-size-2 $font-type, Georgia;
    }

    .start {
        width: 100%;
        position: absolute;
        text-align: center;
        top: calc(85vh - 6rem);
        height: 6rem;
        line-height: 6rem;
        font: $start-height $font-type, Georgia;
        color: linear-gradient(to bottom right, rgba(123, 231, 215, 0.848), rgba(130, 191, 222, 0.859));

        .start-text {
            border-bottom: 2px solid rgba(123, 231, 215, 0.848);
        }

        .start-text:hover {
            margin-top: -20px;
            transition-duration: 300ms;
        }


    }



    .gradient-text-one {
        background-image: -webkit-linear-gradient(bottom, rgb(123, 231, 215), rgb(130, 191, 222), rgb(130, 191, 222));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .gradient-text-two {
        background-image: -webkit-linear-gradient(bottom, rgb(179 230 222 / 50%), rgb(139 183 206), rgb(130, 191, 222));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}

/**背景图片 */
.back-image {
    background-image: url($background-image-url);
    position: absolute;
    height: calc(100vh - 64px);
    top: 64px;
    width: 100%;
    z-index: 0;
}

/*白色蒙版 让图片呈现透明效果 */
.white-mask {
    position: absolute;
    height: calc(100vh - 64px);
    top: 64px;
    width: 100%;
    z-index: 0;
    background-color: $mask-color;
    opacity: $mask-opacity;
}

.chart-1-btn {
    // margin: auto;
    float: right;
    display: flex;
    justify-content: center;
    position: relative;
    // top: -20px;
    // right: 10px;

    .btn {
        $primary-color: v-bind(btnColor);
        position: relative;
        padding: 0.5rem 1rem;
        font-family: Lato, sans-serif;
        font-size: 1rem;
        line-height: 1.5;
        text-decoration: none;
        background-color: white;
        border: transparent;
        outline: transparent;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        overflow: hidden;

        &-primary {
            color: white;
            background-color: $primary-color;
        }

        &-snake-border {
            .btn-borders {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                .border-top {
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(to right, transparent, white);
                    animation: moveHorizontally 2s linear infinite;
                }

                .border-right {
                    position: absolute;
                    right: 0;
                    width: 2px;
                    height: 100%;
                    background: linear-gradient(to bottom, transparent, white);
                    animation: moveVertically 2s 1s linear infinite;
                }

                .border-bottom {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 2px;
                    background: linear-gradient(to left, transparent, white);
                    animation: moveHorizontally 2s linear reverse infinite;
                }

                .border-left {
                    position: absolute;
                    left: 0;
                    width: 2px;
                    height: 100%;
                    background: linear-gradient(to top, transparent, white);
                    animation: moveVertically 2s 1s linear reverse infinite;
                }
            }
        }
    }

    @keyframes moveHorizontally {
        from {
            transform: translateX(-100%);
        }

        to {
            transform: translateX(100%);
        }
    }

    @keyframes moveVertically {
        from {
            transform: translateY(-100%);
        }

        to {
            transform: translateY(100%);
        }
    }
}
</style>