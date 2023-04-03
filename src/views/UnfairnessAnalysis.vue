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
import resList from "../assets/response.json";
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
const gendataSeries = (metric,isOrig)=>{
   let metricR = isOrig ? metric.orig_val_metrics : metric.transf_val_metrics;
   let temp = Object.entries(metricR).map(([key,value],index)=>{
      if(value&&value.length){
         return{
            type:"line",
            yAxisIndex: index==0?0:1,
            smooth:true,
            name:key,
            data:value,
         }
      }
   })
   console.log(temp);
   return temp;
}
function handlelegendChange(params) {
      let selected = {};
      Object.keys(params.selected).forEach((key)=>{
         if(key!=params.name){
            selected[key] = false;
         }
         else{
            selected[key] = true;
         }
      })
      selected.bal_acc = true;
      let option = {
         legend:{
            selected,
         },
            yAxis: [
            {
               type:"value",
               name:"bal_acc",
               max:1,
            },
            {
               type:"value",
               name:params.name,
               max:1,
            }
         ]
      };
      chart1.setOption(option);
      chart2.setOption(option);
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
      yAxis: [
         {
            type:"value",
            name:"bal_acc",
            max:1,
         },
         {
            type:"value",
            name:"",
            max:1,
         }
      ],
      legend:{
         data: dataLegend,
         bottom: 0,
         selected:{
            bal_acc:true,
            avg_odds_diff:false,
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
      series: gendataSeries(resList,true),
   }
   chart1.setOption(option);
   chart1.on('legendselectchanged', handlelegendChange);
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
      yAxis: [
         {
            type:"value",
            name:"bal_acc",
            max:1,
         },
         {
            type:"value",
            name:"",
            max:1,
         }
      ],
      legend:{
         data: dataLegend,
         bottom: 0,
         selected:{
            bal_acc:true,
            avg_odds_diff:false,
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
      series: gendataSeries(resList,false),
   }
   chart2.setOption(option);
   chart2.on('legendselectchanged', handlelegendChange);
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