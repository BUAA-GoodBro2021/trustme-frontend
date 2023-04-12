import { defineStore } from 'pinia'

export const useDataStore = defineStore({
  id:"data",
  state:()=>{
    return{
        dimensions:JSON.parse(localStorage.getItem('dimensions'))||[],
        dcDict:JSON.parse(localStorage.getItem('dcDict'))||{},
        dataList:JSON.parse(localStorage.getItem('dataList'))||{},
        performanceList:JSON.parse(localStorage.getItem('performanceList'))||{},
    }
  },
  actions:{
    setData(data){
        localStorage.setItem('dimensions',JSON.stringify(data.dimensions));
        localStorage.setItem('dcDict',JSON.stringify(data.dc_dict));
        localStorage.setItem('dataList',JSON.stringify(data.patient_detail_list));
        localStorage.setItem('performanceList',JSON.stringify(data.performance_dict));
        this.dimensions = data.dimensions;
        this.dcDict = data.dc_dict;
        this.dataList = data.patient_detail_list;
        this.performanceList = data.performance_dict;
    }
  }
})
