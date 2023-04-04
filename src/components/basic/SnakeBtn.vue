<template>
   <button class="btn btn-primary btn-snake-border">
        <div class="btn-borders">
            <div class="border-top"></div>
            <div class="border-right"></div>
            <div class="border-bottom"></div>
            <div class="border-left"></div>
        </div>
        <span>
            {{ title }}
            <slot v-if="!title"></slot>
        </span>
    </button>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
    },
    btnColor: {
        type: String,
        default: "#45c3fe",
    },
});
</script>
<style lang="scss" scoped>
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
</style>