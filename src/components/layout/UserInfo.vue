<template>
    <div class="userInfo">
        <!-- <el-avatar :size="50" :src="circleUrl" /> -->
        <el-dropdown trigger="click" @visibleChange="onChange" placement="bottom-end">
            <span>
                欢迎，{{ userName }}
                <el-icon>
                    <template v-if="isDown">
                        <ArrowDown/>
                    </template>
                    <template v-else>
                        <ArrowUp/>
                    </template>
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { useStateStore } from '../../stores/state';
// const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png');
const stateStore = useStateStore();
const router = useRouter();
const userName = ref("LLLeo");
const isDown = ref(true);
const onChange = ()=>{
    isDown.value = !isDown.value;
}
const logout = ()=>{
    stateStore.logout();
    router.push({name:"Login"});
}
</script>
<style lang="scss" scoped>
.userInfo {
    text-align: center;
    display: flex;
    align-items: center;
}
.el-dropdown{
    font-size:large;
    color: white;
}
</style>