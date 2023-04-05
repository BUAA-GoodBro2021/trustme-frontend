<template>
   <div class="main-left">
      <div class="main-left-wrap">
         <div class="chart-1" style="width: 100%;height:100%;">
         </div>
      </div>
      <div class="main-left-wrap">
         <div class="chart-2" style="width: 100%;height:100%;">
         </div>
      </div>
   </div>
   <div class="main-right">
      <div class="main-right-wrap">
         <div class="chart-3" style="width: 90%;height:100%;">
         </div>
      </div>
   </div>
</template>
<script setup>
import * as echarts from 'echarts';
import resList from "../assets/response.json";
import { ECHART_COMMON_COLOR } from "../assets/common.js";
import dimensions from "../assets/dimensions.json";
import barDataList from "../assets/barResponse.json";
let chart1 = null;
let chart2 = null;
let chart3 = null;
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
const dataLegend = ["bal_acc", "avg_odds_diff", "stat_par_diff", "eq_opp_diff", "theil_ind",];
const genarrList = (from, to, step) => {
   let arr = [];
   for (let i = from; i <= to; i += step) {
      arr.push(i.toFixed(2));
   }
   arr.push(to.toFixed(2));
   return arr;
}
const gendataSeries = (metric, isOrig) => {
   let metricR = isOrig ? metric.orig_val_metrics : metric.transf_val_metrics;
   console.log("ind", isOrig ? resList.orig_lr_orig_best_ind : resList.transf_best_ind)
   let temp = Object.entries(metricR).map(([key, value], index) => {
      if (value && value.length) {
         return {
            type: "line",
            yAxisIndex: index == 0 ? 0 : 1,
            smooth: true,
            name: key,
            data: value,
            markLine: index == 0 ? {
               data: [
                  {
                     name: "bal_acc",
                     xAxis: isOrig ? resList.orig_lr_orig_best_ind : resList.transf_best_ind,
                     lineStyle: {
                        color: "gray",
                        type: "dashed",
                     },
                     label: {
                        formatter: "best bal_acc: 0.{c}",
                        color: "gray",
                        position: "middle",
                     }
                  }
               ],
               symbol: ['none', 0, '', ''],
            } : {}
         }
      }
   })
   console.log(temp);
   return temp;
}
function handlelegendChange(params, chartIndex) {
   console.log("legend", params);
   let selected = {};
   Object.keys(params.selected).forEach((key) => {
      if (key != params.name) {
         selected[key] = false;
      }
      else {
         selected[key] = true;
      }
   })
   selected.bal_acc = true;
   let option = {
      legend: {
         selected,
      },
      yAxis: [
         {
            type: "value",
            name: "bal_acc",
         },
         {
            type: "value",
            name: params.name,
         }
      ],
   };
   chart1.setOption(option);
   chart2.setOption(option);
   let legendIndex = dataLegend.indexOf(params.name) - 1;
   let color = ECHART_COMMON_COLOR[legendIndex + 1];
   let data = barDataList.unfairness_metric_every_feature[legendIndex];
   data = data.map((item) => {
      return Object.values(item);
   });
   chart3.setOption({
      title: {
         text: `模型精度最高时阈值下各特征不公平性指标`,
         left: "center",
         subtext: `${params.name}指标`,
         subtextStyle: {
            color,
         }
      },
      color,
      series: [
         {
            type: "bar",
            data: data[resList.orig_lr_orig_best_ind],
         }
      ]
   });
}
function handleMouseOver(params, chartIndex) {
   console.log("mouseover", params, chartIndex);
   if (!params.seriesIndex) return;
   let data = barDataList.unfairness_metric_every_feature[params.seriesIndex - 1];
   data = data.map((item) => {
      console.log("item", item);
      return Object.values(item);
   });
   chart3.setOption({
      title: {
         text: `不同阈值下各特征不公平性指标`,
         left: "center",
         subtext: `${params.name}阈值下，${params.seriesName}指标`,
         subtextStyle: {
            color: params.color,
         }
      },
      color: params.color,
      yAxis: {
         type: "category",
         data: pureDimensions,
         axisLabel: {
            rotate: -5
         }
      },
      series: [
         {
            type: "bar",
            data: data[params.dataIndex],
         }
      ]
   });
}
const initChart1 = () => {
   chart1 = echarts.init(document.querySelector('.chart-1'));
   let option = {
      title: {
         text: "原始数据不公平性指标",
         left: "center",
         subtext: "Age"
      },
      color: ECHART_COMMON_COLOR,
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
      xAxis: {
         name: "      阈值",
         type: "category",
         data: genarrList(0.01, 1, 0.01),
         boundaryGap: false,
      },
      yAxis: [
         {
            type: "value",
            name: "bal_acc",
            max: 1,
         },
         {
            type: "value",
            name: "avg_odds_diff",
            max: 1,
         }
      ],
      legend: {
         data: dataLegend,
         bottom: 0,
         selected: {
            bal_acc: true,
            avg_odds_diff: true,
            stat_par_diff: false,
            eq_opp_diff: false,
            theil_ind: false,
         }
      },
      tooltip: {
         formatter: function (params) {
            console.log("tooltip", params);
            return (
               '<li>threshold : ' + params.name + '</li>' +
               '<li>' + params.seriesName + ' : ' + params.value.toFixed(2) + '</li>'
            )
         }
      },
      series: gendataSeries(resList, true),
   }
   chart1.setOption(option);
   chart1.on('legendselectchanged', (params) => handlelegendChange(params, 0));
   chart1.on('mouseover', (params) => handleMouseOver(params, 0));
}
const initChart2 = () => {
   chart2 = echarts.init(document.querySelector('.chart-2'));
   let option = {
      title: {
         text: "重定义权重后数据不公平指标",
         left: "center",
         subtext: "Age"
      },
      color: ECHART_COMMON_COLOR,
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
      xAxis: {
         name: "      阈值",
         type: "category",
         data: genarrList(0.01, 1, 0.01),
         boundaryGap: false,
      },
      yAxis: [
         {
            type: "value",
            name: "bal_acc",
            max: 1,
         },
         {
            type: "value",
            name: "avg_odds_diff",
            max: 1,
         }
      ],
      legend: {
         data: dataLegend,
         bottom: 0,
         selected: {
            bal_acc: true,
            avg_odds_diff: true,
            stat_par_diff: false,
            eq_opp_diff: false,
            theil_ind: false,
         }
      },
      tooltip: {
         formatter: function (params) {
            return (
               '<li>threshold : ' + params.name + '</li>' +
               '<li>' + params.seriesName + ' : ' + params.value.toFixed(2) + '</li>'
            )
         }
      },
      series: gendataSeries(resList, false),
   }
   chart2.setOption(option);
   chart2.on('legendselectchanged', (params) => handlelegendChange(params, 1));
   chart2.on('mouseover', (params) => handleMouseOver(params, 1));
}
const initChart3 = () => {
   chart3 = echarts.init(document.querySelector('.chart-3'));
   let data = barDataList.unfairness_metric_every_feature[1];
   data = data.map((item) => {
      return Object.values(item);
   });
   let color = ECHART_COMMON_COLOR[1]
   let option = {
      title: {
         text: "模型精度最高时各特征不公平性指标",
         left: "center",
         subtext: `arg_odds_diff指标`,
         subtextStyle: {
            color,
         }
      },
      color,
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
         type: "category",
         data: pureDimensions,
         axisLabel: {
            rotate: -5
         }
      },
      series: [
         {
            type: "bar",
            data: data[resList.orig_lr_orig_best_ind],
         }
      ],
      tooltip: {
         formatter: function (params) {
            console.log("tooltip", params);
            return (
               params.name + '<br/>' +
               '<li>unfairness value : ' + params.value.toFixed(2) + '</li>'
            )
         }
      }
   };
   chart3.setOption(option, true);
}
onMounted(() => {
   initChart1();
   initChart2();
   initChart3();
})
</script>
<style lang="scss" scoped>
.main-left {
   width: 50%;
   height: 100%;
   padding-top: 20px;
   &-wrap {
      height: 43.5%;
      width: 90%;
      margin-left: 5%;
      margin-top: 3%;
      box-shadow: 0 5px 4px #ffffff14;
      background-color: white;
      border-radius: 25px;
      .chart-1 {
         margin: auto;
      }
      .chart-2 {
         margin: auto;
      }
   }
}

.main-right {
   width: 50%;
   height: 100%;
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
   }
}
</style>