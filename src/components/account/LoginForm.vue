<template>
	<div>
		<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
			<el-form-item prop="username">
				<el-input v-model="loginForm.username" placeholder="用户名">
					<template #prefix>
						<el-icon class="el-input__icon"><user /></el-icon>
					</template>
				</el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input type="password" v-model="loginForm.password" placeholder="密码" show-password autocomplete="new-password">
					<template #prefix>
						<el-icon class="el-input__icon"><lock /></el-icon>
					</template>
				</el-input>
			</el-form-item>
		</el-form>
		<div class="login-btn">
			<el-button :icon="CirclePlus" round @click="register()" size="large">注册</el-button>
			<el-button :icon="UserFilled" round @click="submit(loginFormRef)" size="large" type="primary" :disabled="disabled">
				登录
			</el-button>
		</div>
	</div>
</template>
<script setup>
import { CirclePlus, UserFilled } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { useStateStore } from "../../stores/state.js";
import { Account } from "../../api/account";
import { getTimeState } from "../../utils";
import { useRoute,useRouter } from "vue-router";
const stateStore = useStateStore();
const router = useRouter();
const loginFormRef = ref();
const route = useRoute();
const validateName = (rule,value,callback)=>{
	if(!value.length){
		callback(new Error("请输入用户名"))
	}else{
		callback();
	}
}
const validatePassword = (rule,value,callback)=>{
	if(!value.length){
		callback(new Error("请输入密码"))
	}else{
		callback();
	}
}
const loginRules = ref({
	username: [{validator:validateName, trigger: "blur" }],
	password: [{validator:validatePassword, trigger: "blur" }]
});
const loginForm = ref({
    username:"",
    password:""
})
// 禁用登录按钮
const disabled = computed(()=>{
	return !(loginForm.value.username.length && loginForm.value.password.length);
})
const login = ()=>{
	Account.login(loginForm.value).then((res)=>{
		if(res.data.result===1){
			stateStore.setToken(res.data.token);
			stateStore.setUserInfo(res.data.user);
			ElNotification({
				title: getTimeState(),
				message: `${res.data.user.username}`,
				type: "success",
				duration: 3000
			});
			if(res.data.user.is_super){
				router.push({path:"/admin"});
			}
			else router.push({name:"主页"})
		}
		else{
			ElNotification({
				title: "很遗憾",
				message: res.data.message,
				type: "error",
				duration: 3000
			})
		}
	}).catch((err)=>{
		ElNotification({
				title: "很遗憾",
				message: err.message,
				type: "error",
				duration: 3000
			})
	})
}
// 提交前进行表单验权
const submit = (formRef)=>{
	console.log("FORMREF",formRef)
	formRef.validate((valid)=>{
		if(valid) login();
	})
}
const register = ()=>{
	router.push({name:"Register"});
}
onMounted(() => {
	// 监听enter事件
	document.onkeydown = (e) => {
		e = window.event || e;
		if (route.name=="Login" && (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter")) {
			submit(loginFormRef.value);
		}
	};
});
</script>