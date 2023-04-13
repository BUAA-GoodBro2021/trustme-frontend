<template>
   <div class="main-left">
      <div class="main-left-wrap">
         <div class="chart-1" style="width: 90%;height:40%;">
         </div>
         <div class="chart-1-btn">
            <template v-for="(item, index) in chart1Titles">
               <SnakeBtn @click="handleClick(index)" :btnColor="item.color">
                  {{ item.title }}
               </SnakeBtn>
            </template>
         </div>
         <div class="chart-3" style="width: 90%;">
            <el-table :data="chart3">
               <el-table-column prop="acc" label="ACC" />
               <el-table-column prop="auroc" label="AUROC" />
               <el-table-column prop="auprc" label="AUPRC" />
               <el-table-column prop="ece" label="ECE" />
               <el-table-column prop="aece" label="AECE" />
               <el-table-column prop="nll" label="NLL" />
            </el-table>
            <div class="comment">注：±左右分别是性能均值及标准差，单位为%</div>
         </div>
         <div class="chart-4" style="width: 90%;height:30%;">
         </div>
      </div>
   </div>
   <div class="main-right">
      <div class="main-right-wrap">
         <div class="chart-2" style="width: 90%;height:100%;">
         </div>
      </div>
   </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { useDataStore } from '../stores/data';
import { ECHART_COMMON_COLOR } from "../assets/common.js";
import SnakeBtn from '../components/basic/SnakeBtn.vue';
const dataStore = useDataStore();
const { dataList, dimensions,dcDict,performanceList } = dataStore;
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
];
const barColorList = [
   "#e73c56", "#c1c413", "#91cc75"
];
const pureDimensions = dimensions?.filter((item) => !testList.includes(item));
let chart1 = null;
let chart2 = null;
let chart3 = ref([]);
let chart4 = null;
let chart1CurrentOption = {};
let scatterOption = {};
let barOption = {};
let rectOption = {};
const chart1Titles = ref([
   { title: '散点分布', color: '#45c3fe' },
   { title: '数据总览', color: '#c1c413' },
   { title: '频次分析', color: '#16ba79' },
]);

/* LLLeo's comment: 工具函数 */

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
   let str = '<li>ACC: ' + acc + '</li>'
      + '<li>AUROC: ' + auroc + '</li>'
      + '<li>AUPRC: ' + auprc + '</li>'
      + '<li>ECE: ' + ece + '</li>'
      + '<li>AECE: ' + aece + '</li>'
      + '<li>NLL: ' + nll + '</li>';
   return str.replaceAll("@", "±");
}
/* LLLeo's comment: copilot，我滴超人！ */
const countdataList = () => {
   let temp = [];
   let low = 0;
   let middle = 0;
   let high = 0;
   dataList.forEach((item) => {
      if (item.data_confidence < dcDict.bin_min_value) {
         low++;
      } else if (item.data_confidence > dcDict.bin_max_value) {
         high++;
      } else {
         middle++;
      }
   })
   temp.push(low);
   temp.push(middle);
   temp.push(high);
   return temp;
}
const handleClick = (index) => {
   if (index === 0) chart1CurrentOption = scatterOption;
   if (index === 1) chart1CurrentOption = barOption;
   if (index === 2) chart1CurrentOption = rectOption;
   chart1.setOption(chart1CurrentOption, true);
}
/**
 * LLLeo's comment: 获取chart-4的数据
 */
const geteSource = (arr_i, arr_e) => {
   let temp = [];
   for (let i = 0; i < pureDimensions.length; i++) {
      temp.push([
         pureDimensions[i],
         arr_i[i],
         arr_e[i],
      ])
   }
   return temp;
}
/** 
 * LLLeo's comment: 检查置信度区间
 */
const checkConfidence = (value, name) => {
   if (name === '低数据置信度区间') {
      return value < dcDict.bin_min_value;
   } else if (name === '中数据置信度区间') {
      return value > dcDict.bin_min_value && value < dcDict.bin_max_value;
   } else if (name === '高数据置信度区间') {
      return value > dcDict.bin_max_value;
   }
   return true;
}
/** 
 * LLLeo's comment: 找到置信度最低的dataList对应的index
 */
const getminIndex = (dataList)=>{
   let min = 0;
   for(let i = 0;i<dataList.length;i++){
      if(dataList[i].data_confidence<dataList[min].data_confidence){
         min = i;
      }
   }
   console.log("min",min);
   return min;
}
const changeChart2 = (params) => {
   chart2.showLoading();
   let flag = 0;
   let data = [];
   console.log("params", params);
   if (params.componentSubType == "bar") {
      for (let i = 0; i < dataList.length; i++) {
         let temp = dataList[i];
         if (temp.classify_result === 0 && checkConfidence(temp.data_confidence, params.name)) {
            for(let index = 0;index<pureDimensions.length;index++){
               data.push(temp.i_local[index]);
            }
            flag = 1;
            break;
         }
      }
      chart2.setOption({
         title: {
            text: `${params.name}-预测失败患者综合特征指标`,
            left: 'center',
         },
         color: params.color,
         yAxis: {
            type: 'category',
            data: pureDimensions,
            axisLabel: {
               interval: 1,
               rotate: -5
            }
         },
         series: [
            {
               type: 'bar',
               data
            },
         ],
      })
   } else if (params.componentSubType == "scatter") {
      for(let index = 0;index<pureDimensions.length;index++){
         data.push(params.data.i_local[index]);
      }
      flag = 1;
      chart2.setOption({
         title: {
            text: '患者各个特征指标大小',
            left: 'center',
         },
         color: params.color,
         yAxis: {
            type: 'category',
            data: pureDimensions,
            axisLabel: {
               interval: 1,
               rotate: -5
            }
         },
         series: [
            {
               type: 'bar',
               data
            },
         ],
      })
   } else if (params.componentSubType == "custom") {
      let from = params.data[0];
      let to = params.data[1];
      for (let i = 0; i < dataList.length; i++) {
         let temp = dataList[i];
         console.log(temp, from, to);
         if (temp.classify_result === 0 && temp.data_confidence >= from && temp.data_confidence <= to) {
            console.log(temp, from, to);
            for(let index = 0;index<pureDimensions.length;index++){
               data.push(temp.i_local[index]);
            }
            flag = 1;
            break;
         }
      }
      chart2.setOption({
         title: {
            text: `对应范围内预测失败患者综合特征指标`,
            left: 'center',
         },
         color: params.color,
         yAxis: {
            type: 'category',
            data: pureDimensions,
            axisLabel: {
               interval: 1,
               rotate: -5
            }
         },
         series: [
            {
               type: 'bar',
               data
            },
         ],
      })
   }
   if (flag) chart2.hideLoading();
};

/**
 * LLLeo's comment: 初始化charts
 */
const initChart1 = () => {
   chart1 = echarts.init(document.querySelector(".chart-1"));
   scatterOption = {
      color: ECHART_COMMON_COLOR,
      title: {
         text: '散点分布',
         left: 'center',
         top: 10,
      },
      xAxis: {
         max: 1,
         min: 0,
         name: '数据置信度',
      },
      yAxis: {
         max: 1,
         min: 0,
         name: '死亡风险预测',
      },
      legend: {
         data: ['预测正确', '预测错误'],
         left: "10%"
      },
      toolbox: {
         feature: {
            dataZoom: {
               yAxisIndex: 'none'
            },
            dataView: {},
            saveAsImage: {
               type: "png",
               title: "Save as PNG",
            },
         }
      },
      dataset: [
         {
            dimensions,
            source: dataList?.filter((item) => item.classify_result == 1)
         },
         {
            dimensions,
            source: dataList?.filter((item) => item.classify_result == 0)
         },
      ],
      series: [
         {
            type: 'scatter',
            name: "预测正确",
            encode: {
               x: ['data_confidence'],
               y: ['preds_all'],
            },
            datasetIndex: 0,
            markLine: {
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
               ],
               lineStyle: {
                  color: 'gray',
               },
               symbol: ['none', 0, '', ''],
            },
            itemStyle: {
               color: '#45c3fe',
            }
         },
         {
            type: 'scatter',
            name: "预测错误",
            encode: {
               x: ['data_confidence'],
               y: ['preds_all'],
            },
            datasetIndex: 1,
            markLine: {
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
               ],
               lineStyle: {
                  color: 'gray',
               },
               symbol: ['none', 0, '', ''],
            },
            itemStyle: {
               color: '#fe2679',
            }
         }
      ],
      tooltip: {
         show: true,
         enterable: true, // 鼠标可进入提示框浮层中
         axisPointer: {
            type: "cross",
            crossStyle: {
               color: "#999",
            },
         },
         formatter: function (params) {
            return (
               '<li>性别: ' +
               (params.data["性别"] === 0 ? '女' : '男') + '</li>' +
               '<li>年龄: ' +
               params.data["年龄"] + '</li>' +
               checkRange(params.data["data_confidence"])
            );
         }
      }
   };
   barOption = {
      title: {
         text: '数据总览',
         left: 'center',
         top: 10,
      },
      xAxis: {
         name: '数据置信度',
         type: "category",
         data: ["低数据置信度区间", "中数据置信度区间", "高数据置信度区间"]
      },
      yAxis: {
         name:"人数",
      },
      toolbox: {
         feature: {
            magicType: {
               type: ['bar', 'line']
            },
            saveAsImage: {
               type: "png",
               title: "Save as PNG",
            },
         }
      },
      series: [
         {
            type: "bar",
            id: "total",
            data: [
               {
                  value: countdataList()[0],
                  groupId: "low",
                  label: {
                     show: true,
                     position: "top",
                     formatter: "{c}"
                  },
                  itemStyle: {
                     color: barColorList[0]
                  }
               },
               {
                  value: countdataList()[1],
                  groupId: "middle",
                  label: {
                     show: true,
                     position: "top",
                     formatter: "{c}"
                  },
                  itemStyle: {
                     color: barColorList[1]
                  }
               },
               {
                  value: countdataList()[2],
                  groupId: "high",
                  label: {
                     show: true,
                     position: "top",
                     formatter: "{c}"
                  },
                  itemStyle: {
                     color: barColorList[2]
                  }
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
   };
   rectOption = {
      title: {
         text: '频次分析',
         left: 'center',
      },
      color: ECHART_COMMON_COLOR,
      xAxis: {
         name: '数据置信度',
         scale: true,
      },
      yAxis: {
         name:"频次",
         max: 100,
         min: 0,
      },
      toolbox: {
         feature: {
            dataZoom: {
               yAxisIndex: 'none'
            },
            dataView: {},
            saveAsImage: {
               type: "png",
               title: "Save as PNG",
            },
         }
      },
      series: [
         {
            data: dcDict.dc_range,
            type: 'custom',
            color: ECHART_COMMON_COLOR[1],
            renderItem: (params, api) => {
               let yVlaue = api.value(2);
               let start = api.coord([api.value(0), yVlaue]);
               let size = api.size([api.value(1) - api.value(0), yVlaue]);
               let style = api.style();
               return {
                  type: 'rect',
                  shape: {
                     x: start[0],
                     y: start[1],
                     width: size[0],
                     height: size[1],
                  },
                  style,
               }
            },
            label: {
               show: true,
               position: 'top',
            },
            markLine: {
               data: [
                  [
                     {
                        name: "LOW",
                        xAxis: dcDict.bin_min_value,
                        yAxis: 0
                     },
                     {
                        xAxis: dcDict.bin_min_value,
                        yAxis: 100
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
                        yAxis: 100
                     },
                  ]
               ],
               lineStyle: {
                  color: 'gray',
               },
               symbol: ['none', 0, '', ''],
            },
            dimensions: ['from', 'to', 'data'],
            encode: {
               x: [0, 1],
               y: 2,
               tooltip: [0, 1, 2],
            },
         }
      ],
      tooltip: {
         formatter: function (params) {
            return (
               '<li>from: ' +
               params.data[0].toFixed(4) + '</li>' +
               '<li>to: ' +
               params.data[1].toFixed(4) + '</li>'
            );
         }
      }
   };
   chart1CurrentOption = scatterOption;
   chart1.setOption(chart1CurrentOption, true);
   /* 根据每次的testset_pid来筛选更新对应dataList */
   chart1.on('mouseover', changeChart2);
}
/* LLLeo's comment: 生成scatter和bar的对应点数据属性 */
const initChart2 = () => {
   chart2 = echarts.init(document.querySelector(".chart-2"));
   let data = [];
   let minIndex = getminIndex(dataList);
   for(let index = 0;index<pureDimensions.length;index++){
         data.push(dataList[minIndex].i_local[index]);
   }
   let option = {
      title: {
         text: '患者各个特征指标大小',
         left: 'center',
      },
      color: "#73c0de",
      tooltip: {
         trigger: 'axis',
         axisPointer: {
            type: 'shadow'
         },
         formatter: function (params) {
            return (
               params[0].name + '<br/>' +
               '<li>' +  '特征重要性: ' +
               params[0].data?.toFixed(2) + '</li>' +
               '<li>e_local: ' + dataList[0].e_local[params[0].dataIndex]?.toFixed(2) + '</li>' +
               '<li>特征值大小: ' + dataList[params[0].dataIndex][params[0].name]?.toFixed(2) + '</li>'
            );
         }
      },
      toolbox: {
         feature: {
            dataZoom: {
               xAxisIndex: 'none'
            },
            magicType: {
               type: ['bar', 'line']
            },
            saveAsImage: {
               type: "png",
               title: "Save as PNG",
            },
         }
      },
      legend: {},
      grid: {
         containLabel: true,
      },
      xAxis: {
         type: 'value',
      },
      yAxis: {
         type: 'category',
         data: pureDimensions,
      },
      series: [
         {
            type: 'bar',
            data,
         }
      ]
   };
   chart2.setOption(option);
}
/* LLLeo's comment: 生成中间表格 */
const initChart3 = () => {
   let temp = performanceList.all;
   Object.entries(temp).forEach(([key, value]) => {
      temp[key] = value.replaceAll("@", "±");
   })
   chart3.value.push(temp);
}
/* LLLeo's comment: 生成全局特征重要性与存在比率 */
const initChart4 = () => {
   chart4 = echarts.init(document.querySelector(".chart-4"));
   let eSource = geteSource(dataList[0].i_global, dataList[0].e_global);
   let barOption = {
      title: {
         text: '全局特征重要性与存在比率',
         left: 'center',
      },
      color: ECHART_COMMON_COLOR.slice(5, 7),
      dataset: [
         {
            dimensions: ["name", "i_global", "e_global"],
            source: eSource,
         },
         {
            transform: {
               type: "sort",
               config: {
                  dimension: "e_global",
                  order: "desc",
               }
            }
         }
      ],
      legend: {
         data: ["特征重要性", "存在比率"],
         left: "5%",
         orient: "vertical",
      },
      toolbox: {
         feature: {
            dataZoom: {
               yAxisIndex: 'none'
            },
            dataView: {},
            magicType: {
               type: ['bar', 'line', 'stack']
            },
            saveAsImage: {
               type: "png",
               title: "Save as PNG",
            },
         }
      },
      xAxis: {
         type: 'category',
         axisLabel: { rotate: 30 }
      },
      yAxis: {},
      series: [
         {
            type: "bar",
            name: "特征重要性",
            encode: {
               x: "name",
               y: "i_global",
            },
         },
         {
            type: "bar",
            name: "存在比率",
            encode: {
               x: "name",
               y: "e_global",
            },
         }
      ],
      tooltip: {
         formatter: function (params) {
            return (
               params.data[0] + '</br>' +
               '<li>i_global: ' +
               params.data[1].toFixed(4) + '</li>' +
               '<li>e_global: ' +
               params.data[2] + '</li>'
            );
         }
      }
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
})
</script>
<style lang="scss" scoped>
.main-left {
   width: 50%;
   height: 100%;
   // box-shadow: 0 1px 4px #00000014;
   margin: auto;
   padding-top: 20px;
   &-wrap{
      height: 90%;
      width: 90%;
      margin-left: 5%;
      margin-top: 3%;
      background-color: white;
      border-radius: 25px;
      position: relative;

      .chart-1 {
         position: absolute;
         top: 5%;
         left: 5%;
      }

      .chart-1-btn {
         margin: auto;
         display: flex;
         justify-content: space-around;
         position: absolute;
         top: calc(45% - 2.5rem);
         width: 90%;
      }

      .chart-3 {
         position: absolute;
         top:calc(45% + 1rem);
         left: 5%;
      }

      .comment {
         color: gray;
         font-size: 12px;
         margin-left: 5px;
      }

      .chart-4 {
         position: absolute;
         right:5%;
         bottom: 0;
      }
   }
   
}

.main-right {
   width: 50%;
   height: 100%;
   // box-shadow: 0 1px 4px #00000014;
   display: flex;
   justify-content: center;
   margin: auto;
   padding-top: 20px;
   &-wrap{
      height: 90%;
      width: 90%;
      margin-top: 3%;
      background-color: white;
      border-radius: 25px;
      position: relative;
      .chart-2{
         position: absolute;
         top: 2%;
      }
   }
}
</style>