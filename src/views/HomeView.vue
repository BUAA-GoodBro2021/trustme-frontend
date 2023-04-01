<template>
   <div class="clear">
      <Header/>
      <div class="main">
         <div class="main-left">
            <div class="chart-1" style="width: 80%;height:60%;">
            </div>
            <div class="chart-3" style="width: 80%;height:60%;">
            </div>
         </div>
         <div class="main-right">
            <div class="chart-2" style="width: 80%;height:80%;">

            </div>
         </div>
      </div>
   </div>
</template>
<script setup>
import Header from '../components/layout/Header.vue';
import * as echarts from 'echarts';
import dataList from "../assets/patient_detail_list.json";
import dimensions from "../assets/dimensions.json";
import dcDict from "../assets/dc_dict.json";
import performanceList from "../assets/performance_dict.json";
const testList = [
   "testset_pid",
   "data_confidence",
   "preds_all",
   "labels",
   "classify_result",
   "e_global",
   "e_local",
   "i_global",
   "i_local",
   "年龄",
   "性别"
]
const pureDimensions = [];
let chart1 = null;
let chart2 = null;
let chart3 = null;
dimensions.forEach((item)=>{
   if(!testList.includes(item)){
      pureDimensions.push(item);
   }
})
const initChart1 = ()=>{
   chart1 = echarts.init(document.querySelector(".chart-1"));
   let option = {
      xAxis: {
         max:1,
         min:0,
      },
      yAxis: {
         max:1,
         min:0,
      },
      toolbox: {
         feature: {
            dataZoom: {},
            brush: {
            type: ['rect', 'polygon', 'clear']
            }
         }
      },
      tooltip: {
         show: true
      },
      dataset: {
         dimensions,
         source: dataList,
      },
      visualMap: {
         show: false,
         dimension: "classify_result", 
         min: 0, // 需要给出数值范围，最小数值。
         max: 1, // 需要给出数值范围，最大数值。
         inRange: {
            color: ['#e73c56', '#121122','#1475e7' ],
         }
      },
      series: [
         {
            type: 'scatter',
            encode: {
               x: ['data_confidence'],
               y: ['preds_all'],
            },
            toolbar: ['dataZoom', 'brush'],
            markLine: {
               silent: true,
               data: [
                  [
                     {
                        name:"LOW",
                        xAxis: dcDict.bin_min_value,
                        yAxis: 0
                     },
                     {
                        xAxis: dcDict.bin_min_value,
                        yAxis: 1
                     },
                  ],
                  [
                     {
                        name: 'HIGH',
                        xAxis: dcDict.bin_max_value,
                        yAxis: 0
                     },
                     {
                        xAxis: dcDict.bin_max_value,
                        yAxis: 1
                     },
                  ]
               ]
               },
         }
      ],
      tooltip:{
         formatter: function(params) {
            return (
            '性别: ' +
            (params.data["性别"]===0?'女':'男') +'<br/>'+
            '年龄: ' +
            params.data["年龄"]
            );
         }
      }
   };
   chart1.setOption(option);
   chart1.on('mouseover', (params)=>{
      let category = [];
      let data = [];
      Object.entries(dataList[params.data.testset_pid]).forEach(([key, value])=>{
         if(!testList.includes(key)){
            category.push(key);
            data.push(value);
         }
      })
      chart2.setOption({
         yAxis: {
            type: 'category',
            data: category
         },
         series: [
            {
               type: 'bar',
               data
            }
         ],
      })
   });
}
const initChart2 = ()=>{
   chart2 = echarts.init(document.querySelector(".chart-2"));
   let option = {
      title: {
         text: '对应数据属性'
      },
      tooltip: {
         trigger: 'axis',
         axisPointer: {
            type: 'shadow'
         }
      },
      legend: {},
      grid: {
         left: '3%',
         right: '4%',
         bottom: '3%',
         containLabel: true
      },
      dataset: {
         source: [],
      },
      xAxis: {
         type: 'value',
      },
      yAxis: {
         type: 'category',
         data: []
      },
      series: [
         {
            type: 'bar',
            data: [],
         }
      ]
   };
   chart2.setOption(option);
}
const initChart3 = ()=>{
   chart3 = echarts.init(document.querySelector(".chart-3"));
   
}
onMounted(()=>{
   initChart1();
   initChart2();
   initChart3();
   console.log(dataList);
})
</script>
<style lang="scss" scoped>
.clear{
   height: 100vh;
}
.main{
   margin-top: 64px;
   display: flex;
   justify-content: space-around;
   overflow: hidden;
   background-color: white;
   height: 100%;
   &-right{
      width: 50%;
      height: 100%;
      box-shadow: 0 1px 4px #00000014;
      display: flex;
      justify-content: center;
      .chart-1{
         margin: auto;
         margin-top: 20px;
      }
   }
   &-left{
      width: 50%;
      height: 100%;
      box-shadow: 0 1px 4px #00000014;
   }
}
</style>