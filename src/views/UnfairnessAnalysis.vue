<template>
   <div class="main-left">
      <div class="chart-1" style="width: 90%;height:40%;">
      </div>
      <div class="chart-2" style="width: 90%;height:40%;">
      </div>
   </div>
   <div class="main-right">
   </div>
</template>
<script setup>
import * as echarts from 'echarts';
import resList from "../assets/response2.json";
let chart1 = null;
let chart2 = null;
const dataLegend = ["bal_acc","avg_odds_diff","spd","stat_par_diff","eq_opp_diff","theil_ind",];
const genarrList = (from,to,step)=>{
   let arr = [];
   for(let i=from;i<=to;i+=step){
      arr.push(i.toFixed(2));
   }
   arr.push(to.toFixed(2));
   return arr;
}
function countTitleData(str) {
   const regex = /\d{4}: \d*/g;
   let strs = str.match(regex);
   let ans = [];
   let temp = strs.map((item)=>{
      return Number(item.split(" ")[1]);
   })
   temp.forEach((item,index)=>{
      if(index%2==0){
         ans.push(item);
      }
   })
   return ans;
}
const gendataSeries = (metric,isOrig)=>{
   let metricR = isOrig ? metric.orig_val_metrics : metric.val_metrics;
   console.log(metricR);
   let ans = Object.entries(metricR).map(([key,value])=>{
      if(value&&value.length){
         return{
            type:"line",
            smooth:true,
            name:key,
            data:value,
         }
      }
   })
   return ans;
}
const initChart1 = ()=>{
   chart1 = echarts.init(document.querySelector('.chart-1'));
   let option = {
      title:{
         text:"Orig Unfairness Metric",
         left:"center",
         subtext:"Age"
      },
      xAxis: {
         type:"category",
         data:genarrList(0.01,1,0.01),
         boundaryGap: false,
      },
      yAxis: {
         max:1,
      },
      legend:{
         data: dataLegend,
         bottom: 0,
         selected:{
            bal_acc:false,
            avg_odds_diff:true,
            spd:false,
            stat_par_diff:false,
            eq_opp_diff:false,
            theil_ind:false,
         }
      },
      tooltip:{
         formatter: function (params) {
            return(
               '<li>X : '+params.name+'</li>'+
               '<li>Y : '+params.value.toFixed(2)+'</li>'
            )
         }
      },
      series: gendataSeries(resList.orig_unfairness_metric[0],true),
   }
   chart1.setOption(option);
   chart1.on('legendselectchanged', function (params) {
      console.log("chart1",params); // 打印出参数信息
      chart2.setOption({
         legend:{
            selected:params.selected,
         }
      })
      // TODO: 处理图例选中状态变化的逻辑
   });
}
const initChart2 = ()=>{
   chart2= echarts.init(document.querySelector('.chart-2'));
   let option = {
      title:{
         text:"Transform Unfairness Metric",
         left:"center",
         subtext:"Age"
      },
      xAxis: {
         type:"category",
         data:genarrList(0.01,1,0.01),
         boundaryGap: false,
      },
      yAxis: {
         max:1,
      },
      legend:{
         data: dataLegend,
         bottom: 0,
         selected:{
            bal_acc:false,
            avg_odds_diff:true,
            spd:false,
            stat_par_diff:false,
            eq_opp_diff:false,
            theil_ind:false,
         }
      },
      tooltip:{
         formatter: function (params) {
            return(
               '<li>X : '+params.name+'</li>'+
               '<li>Y : '+params.value.toFixed(2)+'</li>'
            )
         }
      },
      series: gendataSeries(resList.transf_unfairness_metric[0],false),
   }
   chart2.setOption(option);
   chart2.on('legendselectchanged', function (params) {
      console.log("chart2",params); // 打印出参数信息
      // TODO: 处理图例选中状态变化的逻辑
      chart1.setOption({
         legend:{
            selected:params.selected,
         }
      })
   });
}
onMounted(() => {
   initChart1();
   initChart2();
})
</script>
<style lang="scss" scoped>
.main-left {
   width: 50%;
   height: 100%;
   box-shadow: 0 1px 4px #00000014;
   margin: auto;

   .chart-1 {
      margin: auto;
   }
   .chart-2 {
      margin: auto;
   }
}

.main-right {
   width: 50%;
   height: 100%;
   box-shadow: 0 1px 4px #00000014;
   display: flex;
   justify-content: center;
   margin: auto;
   
}
</style>