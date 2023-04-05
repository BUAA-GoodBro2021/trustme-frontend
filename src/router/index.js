import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useStateStore} from "../stores/state"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/welcome',
      component: HomeView,
      children:[
        {
          path: '/welcome',
          name: '首页',
          component: ()=>import('../views/HomePage.vue')
        },
        {
          path: '/upload',
          name: '超参设置',
          component: ()=>import('../views/UploadParam.vue')
        },
        {
          path: '/dataAnalysis',
          name: '电子病历分析',
          component: ()=>import('../views/DataAnalysis.vue')
        },
        {
          path: '/unfairnessAnalysis',
          name: '不公平性分析',
          component: ()=>import('../views/UnfairnessAnalysis.vue')
        }
      ]
    },
    {
      path:'/account',
      name:'Account',
      component: ()=>import('../views/account/Login.vue'),
      children:[
        // 登录
        {
          path:'/login',
          name: 'Login',
          meta:{
            transition: "animate__fadeInDown"
          },
          component: ()=>import('../components/account/LoginForm.vue')
        },
        // 注册
        {
          path: '/register',
          name: 'Register',
          meta:{
            transition: "animate__fadeInDown"
          },
          component: ()=>import('../components/account/RegisterForm.vue'),
        },
      ]
    }
  ]
})
router.beforeEach((to,from)=>{
  const state = useStateStore();
  if(!state.isAuth&&to.name!="Login"&&to.name!="Register"){
    ElNotification({
      title: "很遗憾",
      message: "请先登录",
      type: "error",
      duration: 3000
    })
    return{name:"Login"};
  }
})
export default router
