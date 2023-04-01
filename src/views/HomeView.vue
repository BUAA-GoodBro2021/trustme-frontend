<template>
   <div class="clear">
      <Header/>
      <div class="main">
         <div class="main-left">
            <div class="chart-1" style="width: 80%;height:60%;">

            </div>
         </div>
         <div class="main-right">
            <div class="chart-2" style="width: 80%;height:60%;">

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
const initChart1 = ()=>{
   const chart1 = echarts.init(document.querySelector(".chart-1"));
   let option = {
      xAxis: {},
      yAxis: {},
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
            color: ['#1475e7', '#121122', '#e73c56'],
         }
      },
      series: [
         {
            type: 'scatter',
            encode: {
            x: ['data_confidence'],
            y: ['preds_all'],
            }
         }
      ]
   };
   chart1.setOption(option);
   chart1.on('mouseover', (params)=>{
      console.log(params.data);
   });
}
const initChart2 = ()=>{
   const chart2 = echarts.init(document.querySelector(".chart-2"));
   let option = {
      title: {
         text: 'World Population'
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
      xAxis: {
         type: 'value',
         boundaryGap: [0, 0.01]
      },
      yAxis: {
         type: 'category',
         data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
      },
      series: [
         {
            name: '2011',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
         },
         {
            name: '2012',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807]
         }
      ]
   };
   chart2.setOption(option);
   chart2.on('mouseover', (params)=>{
      console.log(params.data);
   });
}
onMounted(()=>{
   initChart1();
   initChart2();
   console.log(dataList);
})
</script>
<style lang="scss" scoped>
.clear{
   height: 100vh;
}
.main{
   height: 100%;
   background-color: antiquewhite;
   display: flex;
   justify-content: space-around;
   overflow: hidden;
   &-right{
      width: 50%;
      height: 100%;
      background-color: #fff;
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
      background-color: #fff;
      box-shadow: 0 1px 4px #00000014;
   }
}
</style>