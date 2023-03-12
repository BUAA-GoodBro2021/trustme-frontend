import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStateStore = defineStore({
  id:"state",
  state:()=>{
    return{
      token : ref(localStorage.getItem('token')),
      userInfo : ref(localStorage.getItem('userInfo')),
    }
  },
  getters:{
    isAuth(state){
      return state.token?.length > 0
    }
  },
  actions:{
    setToken(token){
      this.token = token
    },
    setUserInfo(userInfo){
      this.userInfo = userInfo
    }
  }
})

