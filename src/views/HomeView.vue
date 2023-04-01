<template>
   <div class="clear">
      <Header />
      <div class="main">
         <div class="main-left">
            <div class="chart-1" style="width: 90%;height:40%;">
            </div>
            <div class="chart-3" style="width: 90%;">
               <el-table :data="chart3" >
                  <el-table-column prop="acc" label="ACC" />
                  <el-table-column prop="auroc" label="AUROC" />
                  <el-table-column prop="auprc" label="AUPRC" />
                  <el-table-column prop="ece" label="ECE" />
                  <el-table-column prop="aece" label="AECE" />
                  <el-table-column prop="nll" label="NLL"/>
               </el-table>
            </div>
            <div class="chart-4" style="width: 90%;height:30%;">
            </div>
         </div>
         <div class="main-right">
            <div class="chart-2" style="width: 100%;height:85%;">
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
];
const pureDimensions = [];
let chart1 = null;
let chart2 = null;
let chart3 = ref([]);
let chart4 = null;
dimensions.forEach((item) => {
   if (!testList.includes(item)) {
      pureDimensions.push(item);
   }
})
const checkRange = (value) => {
   let temp;
   if (value < dcDict.bin_min_value) {
      temp = performanceList.low;
   } else if (value > dcDict.bin_max_value) {
      temp = performanceList.high;
   } else {
      temp = performanceList.middle;
   }
   let { acc, auroc, auprc, ece, aece, nll } = temp;
   let str = 'ACC:' + acc + '<br/>'
      + 'AUROC:' + auroc + '<br/>'
      + 'AUPRC:' + auprc + '<br/>'
      + 'ECE:' + ece + '<br/>'
      + 'AECE:' + aece + '<br/>'
      + 'NLL:' + nll + '<br/>';
   return str.replaceAll("@","±");
}
/* LLLeo's comment: copilot，我滴超人！ */
const countdataList = ()=>{
   let temp = [];
   let low = 0;
   let middle = 0;
   let high = 0;
   dataList.forEach((item)=>{
      if(item.data_confidence < dcDict.bin_min_value){
         low++;
      }else if(item.data_confidence > dcDict.bin_max_value){
         high++;
      }else{
         middle++;
      }
   })
   temp.push(low);
   temp.push(middle);
   temp.push(high);
   return temp;
}
const initChart1 = () => {
   chart1 = echarts.init(document.querySelector(".chart-1"));
   let scatterOption = {
      title: {
         text: '数据分布',
         left: 'center',
         top: 10,
      },
      xAxis: {
         max: 1,
         min: 0,
      },
      yAxis: {
         max: 1,
         min: 0,
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
            color: ['#e73c56', '#121122', '#1475e7'],
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
                        name: "LOW",
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
      tooltip: {
         formatter: function (params) {
            return (
               '性别: ' +
               (params.data["性别"] === 0 ? '女' : '男') + '<br/>' +
               '年龄: ' +
               params.data["年龄"] + '<br/>' +
               checkRange(params.data["data_confidence"])
            );
         }
      }
   };
   chart1.setOption(scatterOption);
   /* 根据每次的testset_pid来筛选更新对应dataList */
   chart1.on('mouseover', (params) => {
      if(params.componentSubType!=='scatter') return;
      let category = [];
      let data = [];
      Object.entries(dataList[params.data.testset_pid]).forEach(([key, value]) => {
         if (!testList.includes(key)) {
            category.push(key);
            data.push(value);
         }
      })
      chart2.setOption({
         yAxis: {
            type: 'category',
            data: category,
            axisLabel: {
               interval: 1,
               rotate: -5
            }
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
/* LLLeo's comment: 生成scatter的对应点数据属性 */
const initChart2 = () => {
   chart2 = echarts.init(document.querySelector(".chart-2"));
   let option = {
      title: {
         text: '对应数据属性',
         left: 'center',
      },
      tooltip: {
         trigger: 'axis',
         axisPointer: {
            type: 'shadow'
         }
      },
      legend: {},
      grid: {
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
/* LLLeo's comment: 生成中间表格 */
const initChart3 = () => {
   let temp = performanceList.all;
   Object.entries(temp).forEach(([key, value]) => {
      temp[key] = value.replaceAll("@","±");
   })
   chart3.value.push(temp);
}
const initChart4 = () => {
   chart4 = echarts.init(document.querySelector(".chart-4"));
   let barDataList = countdataList();
   let barOption = {
      title: {
         text: '置信度分布',
         left: 'center',
         top: 10,
      },
      xAxis:{
         type:"category",
         data:["低置信度","中置信度","高置信度"]
      },
      yAxis:{},
      toolbox: {
         feature: {
            myTool:{
               show:true,
               title:"切换为散点图",
            }
         }
      },
      series:[
         {
            type:"bar",
            id:"total",
            data:[
               {
                  value:barDataList[0],
                  groupId:"low"
               },
               {
                  value:barDataList[1],
                  groupId:"middle"
               },
               {
                  value:barDataList[2],
                  groupId:"high"
               }
            ],
            universalTransition: {
               enabled: true,
               seriesKey: ['low', 'middle', 'high'],
               delay: function (idx, count) {
                  return Math.random() * 400;
               }
            }
         }
      ]
   }
   chart4.setOption(barOption);
}
onMounted(() => {
   initChart1();
   initChart2();
   initChart3();
   initChart4();
   window.addEventListener('resize', () => {
      chart1.resize();
      chart2.resize();
      chart4.resize();
   })
   console.log("onMounted",dataList);
})
</script>
<style lang="scss" scoped>
.clear {
   height: 100vh;
}

.main {
   margin-top: 64px;
   display: flex;
   justify-content: space-around;
   overflow: hidden;
   background-color: white;
   height: 100%;
   .main-left {
      width: 50%;
      height: 100%;
      box-shadow: 0 1px 4px #00000014;
      margin: auto;
      .chart-1{
         margin: auto;
      }
      .chart-3{
         margin: auto;
      }
      .chart-4{
         margin: auto;
         margin-top: 20px;
      }
   }
   .main-right {
      width: 50%;
      height: 100%;
      box-shadow: 0 1px 4px #00000014;
      display: flex;
      justify-content: center;
      margin: auto;
      .chart-1 {
         margin: auto;
         margin-top: 20px;
      }
   }
   
}
</style>