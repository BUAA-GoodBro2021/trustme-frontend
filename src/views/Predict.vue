<template>
   <div class="main-wrap" v-loading="loading">
      <div class="uploader">
         <span class="title">文件上传</span>
         <el-upload ref="uploadRef" drag :auto-upload="false" :on-exceed="handleExceed" accept=".xls, .xlsx, .csv"
            v-model:file-list="fileList" :on-change="handleChange">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
               Drop file here or <em>click to upload</em>
            </div>
            <template #tip>
               <div class="el-upload__tip">
                  csv/xls/xlsx files, limit 1 file, new file will cover the old file
               </div>
            </template>
         </el-upload>
         <div class="upload-btn">
            <snake-btn @click="submitForm()">
               提交
            </snake-btn>
         </div>
         <div class="more-arrow" @click="showTable">
            <el-icon v-if="!isShow">
               <ArrowDownBold />
            </el-icon>
            <el-icon v-else>
               <ArrowUpBold />
            </el-icon>
         </div>
      </div>
      <div class="table" v-if="isShow">
         <span class="title">超参设置</span>
         <el-form :inline="true" :model="modelparams" class="demo-form-inline">
            <el-form-item label="使用已经训练好的模型">
               <el-select v-model="modelparams.use_pretrain_model" placeholder="是/否" class="common-width">
                  <el-option label="是" value="1" />
                  <el-option label="否" value="0" />
               </el-select>
            </el-form-item>
            <el-form-item label="模型名称">
               <el-select v-model="modelparams.model_name" placeholder="名称" class="common-width">
                  <el-option label="gru" value="gru" />
                  <el-option label="lstm" value="lstm" />
                  <el-option label="rnn" value="rnn" />
                  <el-option label="mlp" value="mlp" />
                  <el-option label="adacare" value="adacare" />
               </el-select>
            </el-form-item>
            <el-form-item label="分界截距">
               <el-input v-model="modelparams.b" placeholder="0.00 ~ 0.99" class="common-width" />
            </el-form-item>
            <el-form-item label="最大时限">
               <el-input v-model="modelparams.time_limit" placeholder="7 ~ 365" class="common-width" />
            </el-form-item>
            <el-form-item label="衰退方式">
               <el-select v-model="modelparams.decay_method" placeholder="衰退方式">
                  <el-option label="e_decay" value="e_decay" />
                  <el-option label="cosine_decay" value="cosine_decay" />
               </el-select>
            </el-form-item>
            <el-form-item label="批量大小">
               <el-input v-model="modelparams.batch_size" placeholder="16~1024" class="common-width" />
            </el-form-item>
            <el-form-item label="训练轮数">
               <el-input v-model="modelparams.num_epochs" placeholder="50~200" class="common-width" />
            </el-form-item>
            <el-form-item label="隐藏层维度">
               <el-select v-model="modelparams.hidden_dim" placeholder="16/32/64" class="common-width">
                  <el-option label="16" value="16" />
                  <el-option label="32" value="32" />
                  <el-option label="64" value="64" />
               </el-select>
            </el-form-item>
            <el-form-item label="学习率">
               <el-select v-model="modelparams.learning_rate" placeholder="1e-4~1e-1" class="common-width">
                  <el-option label="1e-1" value="1e-1" />
                  <el-option label="1e-2" value="1e-2" />
                  <el-option label="1e-3" value="1e-3" />
                  <el-option label="1e-4" value="1e-4" />
               </el-select>
            </el-form-item>
            <el-form-item label="mc-dropout 次数">
               <el-input v-model="modelparams.test_epochs" placeholder="50~100" class="common-width" />
            </el-form-item>
            <el-form-item label="随机种子">
               <el-input v-model="modelparams.random_seed" placeholder="0~1000" class="common-width" />
            </el-form-item>
            <el-form-item label="指定时间步">
               <el-select v-model="modelparams.time_visit_id" placeholder="0/-1" class="common-width">
                  <el-option label="0" value="0" />
                  <el-option label="-1" value="-1" />
               </el-select>
            </el-form-item>
            <el-form-item label="全局存在性占比">
               <el-input v-model="modelparams.global_rate" placeholder="0~1" class="common-width" />
            </el-form-item>
            <el-form-item label="是否使用全局特征重要性进行加权">
               <el-select v-model="modelparams.global_importance_control" placeholder="0/1" class="common-width">
                  <el-option label="0" value="0" />
                  <el-option label="1" value="1" />
               </el-select>
            </el-form-item>
            <el-form-item label="数据置信度的划分bin的个数">
               <el-input v-model="modelparams.bin_nums" placeholder="3~30" class="common-width" />
            </el-form-item>
            <el-form-item label="数据置信度基准值左右区间的个数">
               <el-input v-model="modelparams.delta_bin_nums" placeholder="小于 (bin_nums - 1)// 2" class="common-width" />
            </el-form-item>
            <!-- <el-form-item label="数据置信度基准值左右区间的个数">
               <el-input v-model="modelparams.delta_bin_nums" placeholder="小于 (bin_nums - 1)// 2" />
            </el-form-item> -->
            <el-form-item label="不公平性模型">
               <el-select v-model="modelparams.unfairness_model_name" placeholder="16/32/64">
                  <el-option label="RandomForestClassifier" value="RandomForestClassifier" />
                  <el-option label="XGBClassifier" value="XGBClassifier" />
                  <el-option label="LogisticRegression" value="LogisticRegression" />
               </el-select>
            </el-form-item>
         </el-form>
         <div class="features">
            <div class="feature">
               <div class="label">不公平性特征名称</div>
               <el-input v-model="features[0].name" placeholder="请输入特征名称" class="input"></el-input>
               <div class="label right-label">数值</div>
               <el-input v-model="features[0].value" placeholder="请输入正整数" class="input"></el-input>
               <div class="plus-btn">
                  <div class="btn-wrap"><el-icon @click="addFeature">
                        <Plus />
                     </el-icon></div>
               </div>
            </div>
            <div class="feature" v-for="(item, index) in subFeatures">
               <div class="label">不公平性特征名称</div>
               <el-input v-model="subFeatures[index].name" placeholder="请输入特征名称" class="input"></el-input>
               <div class="label right-label">数值</div>
               <el-input v-model="subFeatures[index].value" placeholder="请输入正整数" class="input"></el-input>
               <div class="plus-btn">
                  <div class="btn-wrap"><el-icon @click="minusFeature(index)">
                        <Minus />
                     </el-icon></div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { Uncertain } from "../api/uncertainty.js"
import SnakeBtn from '../components/basic/SnakeBtn.vue';
import { useDataStore } from "../stores/data.js";
const dataStore = useDataStore();
const uploadRef = ref('uploadRef')
const btnColor = ref("#45c3fe")
const loading = ref(false)
const fileList = ref()
const isShow = ref(false)
const features = ref([
   {
      name: 'age',
      value: ''
   },
])

const subFeatures = ref([])
const modelparams = ref({
   use_pretrain_model: '1',
   unfairness_model_name: 'RandomForestClassifier',
   model_name: 'gru',
   b: 0.3,
   time_limit: 30.0,
   decay_method: 'e_decay',
   batch_size: 1024,
   num_epochs: 100,
   hidden_dim: 64,
   learning_rate: '1e-3',
   test_epochs: 100,
   random_seed: 42,
   time_visit_id: 0,
   global_rate: 0.2,
   global_importance_control: 0,
   bin_nums: 21,
   delta_bin_nums: 3
})

const transNumber = {
   '1e-1': 0.1,
   '1e-2': 0.01,
   '1e-3': 0.001,
   '1e-4': 0.0001,
}

const addFeature = () => {
   features.value.push({
      name: '',
      value: ''
   })

   subFeatures.value = features.value.slice(1)
}

const minusFeature = (index) => {
   features.value.splice(index + 1, 1)
   subFeatures.value = features.value.slice(1)
}

/*
# 用户上传csv
df_train: 
# 使用已经训练好的模型
use_pretrain_model = 1
# 模型名称
model_name = 'gru'

# 分界截距 b
b = 0.3
# 最大时限
time_limit = 30.0
# 衰退方式
decay_method = 'e_decay'

# 批量大小
batch_size = 1024
# 训练轮数
num_epochs = 100
# 隐状态
hidden_dim = 64
# 学习率
learning_rate = 1e-3

# mc-dropout 次数
test_epochs = 100
# 随机种子
random_seed = 42
# 指定时间步 0, -1
time_visit_id = 0
# 全局存在性占比
global_rate = 0.2

# 是否使用全局特征重要性进行加权
global_importance_control = 1
# 数据置信度的划分bin的个数
bin_nums = 21
# 数据置信度基准值左右区间的个数
delta_bin_nums = 3
 */

const preData = () => {
   modelparams.value.use_pretrain_model = Number(modelparams.value.use_pretrain_model)
   modelparams.value.b = modelparams.value.b ? Number(modelparams.value.b) : 0.3
   modelparams.value.time_limit = modelparams.value.time_limit ? Number(modelparams.value.time_limit) : 30.0
   modelparams.value.batch_size = modelparams.value.batch_size ? Number(modelparams.value.batch_size) : 1024
   modelparams.value.num_epochs = modelparams.value.num_epochs ? Number(modelparams.value.num_epochs) : 100
   modelparams.value.random_seed = modelparams.value.random_seed ? Number(modelparams.value.random_seed) : 42
   modelparams.value.time_visit_id = modelparams.value.time_visit_id ? Number(modelparams.value.time_visit_id) : 0
   modelparams.value.global_rate = modelparams.value.global_rate ? Number(modelparams.value.global_rate) : 0.2
   modelparams.value.global_importance_control = modelparams.value.global_importance_control ? Number(modelparams.value.global_importance_control) : 0
   modelparams.value.bin_nums = modelparams.value.bin_nums ? Number(modelparams.value.bin_nums) : 21
   modelparams.value.delta_bin_nums = modelparams.value.delta_bin_nums ? Number(modelparams.value.delta_bin_nums) : 3
   modelparams.value.learning_rate = transNumber[modelparams.value.learning_rate] ? transNumber[modelparams.value.learning_rate] : modelparams.value.learning_rate

   // return handleFeatures() //参数有误前端只考虑特征部分是否有误
}

const handleFeatures = async () => {
   let formdata = paramsToFormData(modelparams.value)

   //总接口
   Uncertain.AllUnFairnessProcess(formdata).then((res) => {
      console.log('调用allUnfairness接口的返回结果', res)
   }).catch((err) => {
      ElNotification({
         title: "不确定性分析失败",
         message: err,
         type: "error",
         duration: 3000
      });
      // console.log(err)
   })


   // 只填写一个特征并且没有填写数值
   if (features.value.length == 1 && features.value[0].value == '') {
      formdata.append('feature_name', features.value[0].name)
      Uncertain.UnFairnessProcess(formdata).then((res) => {
         console.log('调用singleUnfairness接口的返回结果', res)
      }).catch((err) => {
         ElNotification({
            title: "不确定性分析失败",
            message: err,
            type: "error",
            duration: 3000
         });
         // console.log(err)
      })

      return true
   }

   //多个特征 或一个特征有数值
   var fs = {}
   features.value.forEach((item, index) => {
      fs[item.name] = item.value
   })
   console.log('处理之后的特征json为', fs)

   Uncertain.MultUnFairnessProcess(fs).then((res) => {
      console.log('调用multUnfairness接口的返回结果', res)
   }).catch((err) => {
      ElNotification({
         title: "不确定性分析失败",
         message: err,
         type: "error",
         duration: 3000
      });
      // console.log(err)
   })

   return true
}

const submitForm = () => {
   if (!fileList.value || fileList.value.length != 1) {
      ElNotification({
         title: "上传失败",
         message: "请上传文件",
         type: "warning",
         duration: 3000
      });
      return
   }
   
    // 名称是否填写 在多个特征时候数值是否填写
   for(var i = 0; i < features.value.length; i++) {
      var item = features.value[i], index = i;
      if (item.name == '' || (features.value.length > 1 && item.value == '')) {
         // console.log('特征有误',item, index)
         ElNotification({
            title: `第${index + 1}个特征填写不完整`,
            message: "请完善特征信息",
            type: "warning",
            duration: 3000
         });
         return
      }
   }

   preData()
   handleFeatures() 


   console.log('formdata中的文件字段为', fileList.value[0].raw)
   let formdata = paramsToFormData(modelparams.value)
   formdata.append('df_train', fileList.value[0].raw)
   // console.log(formdata)

   loading.value = true
   ElNotification({
      title: "正在上传，请耐心等候~",
      message: "正在上传，请耐心等候~",
      type: "warning",
      duration: 3000
   });
   Uncertain.UncertainProcess(formdata).then((res) => {
      loading.value = false
      // console.log(res)
      if (res.data.result == 0) {
         ElNotification({
            title: "上传失败",
            message: res.data.message,
            type: "error",
            duration: 3000
         });
      } else {
         ElNotification({
            title: "上传成功！",
            message: res.data.message,
            type: "success",
            duration: 3000
         });
         dataStore.setData(res.data);
      }
   }).catch((err) => {
      loading.value = false
      ElNotification({
         title: "上传失败",
         message: err,
         type: "error",
         duration: 3000
      });
      // console.log(err)
   })

}

function paramsToFormData(obj) {
   console.log(Object.keys(obj))
   var formData = new FormData();
   Object.keys(obj).forEach((key) => {
      if (obj[key] instanceof Array) {
         obj[key].forEach((item) => {
            formData.append(key, item);
         });
         return;
      }
      formData.append(key, obj[key]);
   });
   return formData;
}


const handleExceed = () => {
}
const showTable = () => {
   isShow.value = !isShow.value;
}

const handleChange = (file, filelist) => {
   fileList.value = [filelist[filelist.length - 1]]
}
</script>
<style lang="scss" scoped>
.common-width {
   max-width: 120px;
}

.title {
   font-weight: 500;
   font-size: 18px;
   display: block;
   margin-bottom: 10px;
}

:deep(.el-upload-dragger) {
   padding: 10px;
}

.el-upload__tip {
   margin-top: 0;
}

.main-wrap {
   width: 100%;
   // margin-top: 64px;
   // height: calc(100vh - 64px);
   display: flex;
   flex-direction: column;
   // justify-content: space-around;
   overflow-y: auto;

   .title {
      font-weight: 500;
      font-size: 18px;
      display: block;
      margin-bottom: 10px;
   }

   .table {
      margin: auto;
      background-color: white;
      padding: 20px;
      border-radius: 25px;
      width: 70%;
      margin-top: 10px;
   }

   .features {
      .feature {
         font-size: 14px;
         display: flex;
         height: 32px;
         margin-bottom: 14px;

         .label {
            height: 32px;
            line-height: 32px;
            padding: 0 12px 0 0;
            color: #606266;
         }

         .right-label {
            margin-left: 12px;
         }

         .input {
            width: 200px;
         }

         .plus-btn {
            height: 32px;
            // line-height: 32px;
            margin-left: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            // border-radius: 50%;

            .btn-wrap {
               margin: auto;
               height: 20px;
               line-height: 20px;
               text-align: center;
               width: 20px;
               cursor: pointer;
               // border: solid 1px black;
               // border-radius: 50%;
            }

            // border: solid 1px black
         }
      }
   }

   .uploader {
      margin: auto;
      // margin-top: 10vh;
      background-color: white;
      padding: 20px;
      border-radius: 25px;
      width: 70%;
      position: relative;

      .more-arrow {
         display: flex;
         justify-content: center;
         animation: deamon 4s infinite;
      }

      @keyframes deamon {
         0% {
            opacity: 1; //透明程度
         }

         20% {
            opacity: 0.8; //透明程度
         }

         40% {
            opacity: 0.6; //透明程度
         }

         60% {
            opacity: 0.4; //透明程度
         }

         80% {
            opacity: 0.2; //透明程度
         }

         100% {
            opacity: 0;
         }
      }

      .upload-btn {
         float: right;
         display: flex;
         justify-content: center;
         position: absolute;
         right: 25px;
         top: 10px;
      }
   }
}
</style>