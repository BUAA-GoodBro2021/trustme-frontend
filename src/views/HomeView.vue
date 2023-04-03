<template>
   <div class="clear">
      <Header />
      <div class="main">
         <div class="main-left">
            <div class="chart-1" style="width: 90%;height:40%;">
            </div>
            <div class="chart-1-btn">
               <el-button type="primary" @click="handleClick">{{ chart1Title }}</el-button>
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
         <div class="main-right">
            <div class="chart-2" style="width: 90%;height:85%;">
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
];
const pureDimensions = dimensions.filter((item) => !testList.includes(item));
let chart1 = null;
let chart2 = null;
let chart3 = ref([]);
let chart4 = null;
let chart1CurrentOption = {};
let scatterOption = {};
let barOption = {};
const chart1Title = ref('数据总览');
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
const handleClick = () => {
   chart1CurrentOption = chart1CurrentOption === scatterOption ? barOption : scatterOption;
   chart1Title.value = chart1Title.value === '数据总览' ? '散点分布' : '数据总览';
   chart1.setOption(chart1CurrentOption, true);
}
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
const changeChart2 = (params) => {
   let category = [];
   let data = [];
   if (params.componentSubType !== 'scatter') {
      for (let i = 0; i < dataList.length; i++) {
         let temp = dataList[i];
         if (temp.classify_result === 1 && checkConfidence(temp.data_confidence, params.name)) {
            Object.entries(temp).forEach(([key, value]) => {
               if (!testList.includes(key)) {
                  category.push(key);
                  data.push(value);
               }
            })
            break;
         }
      }
      chart2.setOption({
         title: {
            text: `${params.name}-预测成功患者综合特征指标`,
            left: 'center',
         },
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
            },
         ],
      })
      return;
   }

   Object.entries(dataList[params.data.testset_pid]).forEach(([key, value]) => {
      if (key === 'classify_result' && value === 1) {

      }
      if (!testList.includes(key)) {
         category.push(key);
         data.push(value);
      }
   })
   chart2.setOption({
      title: {
         text: '患者各个特征指标大小',
         left: 'center',
      },
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
         },
      ],
   })
};
const initChart1 = () => {
   chart1 = echarts.init(document.querySelector(".chart-1"));
   scatterOption = {
      title: {
         text: '散点分布',
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
      legend:{
         data: ['预测正确', '预测错误'],
         left: "10%"
      },
      toolbox: {
         feature: {
            dataZoom: {
               yAxisIndex: 'none'
            },
            dataView:{},
            saveAsImage:{
               type:"png",
               title:"Save as PNG",
            },
         }
      },
      dataset: [
         {
            dimensions,
            source: dataList.filter((item) => item.classify_result === 1)
         },
         {
            dimensions,
            source: dataList.filter((item) => item.classify_result === 0)
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
               lineStyle:{
                  color: 'gray',
               },
               symbol:['none', 0, '', ''],
            },
            itemStyle:{
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
               lineStyle:{
                  color: 'gray',
               },
               symbol:['none', 0, '', ''],
            },
            itemStyle:{
               color: '#fe2679',
            }
         }
      ],
      tooltip: {
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
         type: "category",
         data: ["低数据置信度区间", "中数据置信度区间", "高数据置信度区间"]
      },
      yAxis: {},
      toolbox: {
         feature: {
            magicType: {
               type: ['bar', 'line']
            },
            saveAsImage:{
               type:"png",
               title:"Save as PNG",
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
                     color: "#e73c56"
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
                     color: "#f0f418"
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
                     color: "#87f458"
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
   chart1CurrentOption = scatterOption;
   chart1.setOption(chart1CurrentOption, true);
   /* 根据每次的testset_pid来筛选更新对应dataList */
   chart1.on('mouseover', changeChart2);
}
/* LLLeo's comment: 生成scatter的对应点数据属性 */
const initChart2 = () => {
   chart2 = echarts.init(document.querySelector(".chart-2"));
   let option = {
      title: {
         text: '患者各个特征指标大小',
         left: 'center',
      },
      tooltip: {
         trigger: 'axis',
         axisPointer: {
            type: 'shadow'
         },
         formatter: function (params) {
            return (
               '<li>'+params[0].name + ': ' +
               params[0].data + '</li>' +
               '<li>e_local: ' + dataList[0].e_local[params[0].dataIndex] + '</li>'
            );
         }
      },
      toolbox: {
         feature: {
            magicType: {
               type: ['bar', 'line']
            },
            saveAsImage:{
               type:"png",
               title:"Save as PNG",
            },
         }
      },
      legend: {},
      grid: {
         containLabel: true,
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
      temp[key] = value.replaceAll("@", "±");
   })
   chart3.value.push(temp);
}
const initChart4 = () => {
   chart4 = echarts.init(document.querySelector(".chart-4"));
   let eSource = geteSource(dataList[0].i_global, dataList[0].e_global);
   let barOption = {
      title: {
         text: '全局特征重要性与存在比率',
         left: 'center',
      },
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
         data: ["i_global", "e_global"],
         left: "5%",
      },
      toolbox: {
         feature: {
            dataZoom: {
               yAxisIndex: 'none'
            },
            dataView:{},
            magicType: {
               type: ['bar', 'line', 'stack']
            },
            saveAsImage:{
               type:"png",
               title:"Save as PNG",
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
            name: "i_global",
            encode: {
               x: "name",
               y: "i_global",
            },
         },
         {
            type: "bar",
            name: "e_global",
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

      .chart-1 {
         margin: auto;
      }

      .chart-1-btn {
         margin: auto;
         display: flex;
         justify-content: center;
         position: relative;
         top: -20px;
      }

      .chart-3 {
         margin: auto;
      }

      .comment {
         color: gray;
         font-size: 12px;
         margin-left: 5px;
      }

      .chart-4 {
         margin: auto;
         margin-top: 10px;
      }
   }

   .main-right {
      width: 50%;
      height: 100%;
      box-shadow: 0 1px 4px #00000014;
      display: flex;
      justify-content: center;
      margin: auto;
      .chart-2{
         // margin: auto;
         margin-top: 0;
         margin-left: -10%;
      }
   }

}</style>