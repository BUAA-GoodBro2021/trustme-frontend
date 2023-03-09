import axios from "axios";
const service = axios.create({
    baseURL:"",
    timeout:0,
})
service.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token");
        if(token && token.length>0){
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    }
)
export default service;