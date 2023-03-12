import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useStateStore} from "../stores/state"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
