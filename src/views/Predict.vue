<template>
   <!-- <div class="main-left">
      <span class="title">超参设置</span>
      <el-form :inline="true" :model="modelparams" class="demo-form-inline">
         <el-form-item label="使用已经训练好的模型">
            <el-select v-model="modelparams.use_pretrain_model" placeholder="是/否">
               <el-option label="是" value="1" />
               <el-option label="否" value="0" />
            </el-select>
         </el-form-item>
         <el-form-item label="模型名称">
            <el-select v-model="modelparams.model_name" placeholder="名称">
               <el-option label="gru" value="gru" />
               <el-option label="lstm" value="lstm" />
               <el-option label="rnn" value="rnn" />
               <el-option label="mlp" value="mlp" />
               <el-option label="adacare" value="adacare" />
            </el-select>
         </el-form-item>
         <el-form-item label="分界截距">
            <el-input v-model="modelparams.b" placeholder="0.00 ~ 0.99" />
         </el-form-item>
         <el-form-item label="最大时限">
            <el-input v-model="modelparams.time_limit" placeholder="7 ~ 365" />
         </el-form-item>
         <el-form-item label="衰退方式">
            <el-select v-model="modelparams.decay_method" placeholder="衰退方式">
               <el-option label="e_decay" value="e_decay" />
               <el-option label="cosine_decay" value="cosine_decay" />
            </el-select>
         </el-form-item>
         <el-form-item label="批量大小">
            <el-input v-model="modelparams.batch_size" placeholder="16~1024" />
         </el-form-item>
         <el-form-item label="训练轮数">
            <el-input v-model="modelparams.num_epochs" placeholder="50~200" />
         </el-form-item>
         <el-form-item label="隐藏层维度">
            <el-select v-model="modelparams.hidden_dim" placeholder="16/32/64">
               <el-option label="16" value="16" />
               <el-option label="32" value="32" />
               <el-option label="64" value="64" />
            </el-select>
         </el-form-item>
         <el-form-item label="学习率">
            <el-input v-model="modelparams.learning_rate" placeholder="1e-4~1e-1" />
         </el-form-item>
         <el-form-item label="mc-dropout 次数">
            <el-input v-model="modelparams.test_epochs" placeholder="50~100" />
         </el-form-item>
         <el-form-item label="随机种子">
            <el-input v-model="modelparams.random_seed" placeholder="0~1000" />
         </el-form-item>
         <el-form-item label="指定时间步">
            <el-select v-model="modelparams.time_visit_id" placeholder="0/-1">
               <el-option label="0" value="0" />
               <el-option label="-1" value="-1" />
            </el-select>
         </el-form-item>
         <el-form-item label="全局存在性占比">
            <el-input v-model="modelparams.global_rate" placeholder="0~1" />
         </el-form-item>
         <el-form-item label="是否使用全局特征重要性进行加权">
            <el-select v-model="modelparams.global_importance_control" placeholder="0/1">
               <el-option label="0" value="0" />
               <el-option label="1" value="1" />
            </el-select>
         </el-form-item>
         <el-form-item label="数据置信度的划分bin的个数">
            <el-input v-model="modelparams.bin_nums" placeholder="3~30" />
         </el-form-item>
         <el-form-item label="数据置信度基准值左右区间的个数">
            <el-input v-model="modelparams.delta_bin_nums" placeholder="小于 (bin_nums - 1)// 2" />
         </el-form-item>
      </el-form>

   </div>
   <div class="main-right">
      <span class="title">文件上传</span>
      <el-upload ref="uploadRef" class="upload-demo" drag :auto-upload="false" :on-exceed="handleExceed"
         accept=".xls, .xlsx, .csv" v-model:file-list="fileList" :on-change="handleChange">
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
      <div class="chart-1-btn">
         <button class="btn btn-primary btn-snake-border" @click="submitForm()">
            <div class="btn-borders">
               <div class="border-top"></div>
               <div class="border-right"></div>
               <div class="border-bottom"></div>
               <div class="border-left"></div>
            </div>
            <span>
               上传
            </span>
         </button>
      </div>
   </div> -->
   <div class="main-wrap">
      <div class="table">
         <span class="title">超参设置</span>
         <el-form :inline="true" :model="modelparams" class="demo-form-inline">
            <el-form-item label="使用已经训练好的模型">
               <el-select v-model="modelparams.use_pretrain_model" placeholder="是/否">
                  <el-option label="是" value="1" />
                  <el-option label="否" value="0" />
               </el-select>
            </el-form-item>
            <el-form-item label="模型名称">
               <el-select v-model="modelparams.model_name" placeholder="名称">
                  <el-option label="gru" value="gru" />
                  <el-option label="lstm" value="lstm" />
                  <el-option label="rnn" value="rnn" />
                  <el-option label="mlp" value="mlp" />
                  <el-option label="adacare" value="adacare" />
               </el-select>
            </el-form-item>
            <el-form-item label="分界截距">
               <el-input v-model="modelparams.b" placeholder="0.00 ~ 0.99" />
            </el-form-item>
            <el-form-item label="最大时限">
               <el-input v-model="modelparams.time_limit" placeholder="7 ~ 365" />
            </el-form-item>
            <el-form-item label="衰退方式">
               <el-select v-model="modelparams.decay_method" placeholder="衰退方式">
                  <el-option label="e_decay" value="e_decay" />
                  <el-option label="cosine_decay" value="cosine_decay" />
               </el-select>
            </el-form-item>
            <el-form-item label="批量大小">
               <el-input v-model="modelparams.batch_size" placeholder="16~1024" />
            </el-form-item>
            <el-form-item label="训练轮数">
               <el-input v-model="modelparams.num_epochs" placeholder="50~200" />
            </el-form-item>
            <el-form-item label="隐藏层维度">
               <el-select v-model="modelparams.hidden_dim" placeholder="16/32/64">
                  <el-option label="16" value="16" />
                  <el-option label="32" value="32" />
                  <el-option label="64" value="64" />
               </el-select>
            </el-form-item>
            <el-form-item label="学习率">
               <el-input v-model="modelparams.learning_rate" placeholder="1e-4~1e-1" />
            </el-form-item>
            <el-form-item label="mc-dropout 次数">
               <el-input v-model="modelparams.test_epochs" placeholder="50~100" />
            </el-form-item>
            <el-form-item label="随机种子">
               <el-input v-model="modelparams.random_seed" placeholder="0~1000" />
            </el-form-item>
            <el-form-item label="指定时间步">
               <el-select v-model="modelparams.time_visit_id" placeholder="0/-1">
                  <el-option label="0" value="0" />
                  <el-option label="-1" value="-1" />
               </el-select>
            </el-form-item>
            <el-form-item label="全局存在性占比">
               <el-input v-model="modelparams.global_rate" placeholder="0~1" />
            </el-form-item>
            <el-form-item label="是否使用全局特征重要性进行加权">
               <el-select v-model="modelparams.global_importance_control" placeholder="0/1">
                  <el-option label="0" value="0" />
                  <el-option label="1" value="1" />
               </el-select>
            </el-form-item>
            <el-form-item label="数据置信度的划分bin的个数">
               <el-input v-model="modelparams.bin_nums" placeholder="3~30" />
            </el-form-item>
            <el-form-item label="数据置信度基准值左右区间的个数">
               <el-input v-model="modelparams.delta_bin_nums" placeholder="小于 (bin_nums - 1)// 2" />
            </el-form-item>
         </el-form>
      </div>
      <div class="uploader">
         <span class="title">文件上传</span>
         <el-upload ref="uploadRef" class="upload-demo" drag :auto-upload="false" :on-exceed="handleExceed"
            accept=".xls, .xlsx, .csv" v-model:file-list="fileList" :on-change="handleChange">
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
         <div class="chart-1-btn">
            <button class="btn btn-primary btn-snake-border" @click="submitForm()">
               <div class="btn-borders">
                  <div class="border-top"></div>
                  <div class="border-right"></div>
                  <div class="border-bottom"></div>
                  <div class="border-left"></div>
               </div>
               <span>
                  上传
               </span>
            </button>
         </div>
      </div>
   </div>
</template>
<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ParamUpload } from '../api/welcome'

const uploadRef = ref('uploadRef')
const btnColor = ref("#45c3fe")
const fileList = ref()
const modelparams = ref({
   use_pretrain_model: '1',
   model_name: 'gru',
   b: '',
   time_limit: '',
   decay_method: 'e_decay',
   batch_size: '',
   num_epochs: '',
   hidden_dim: 16,
   learning_rate: '',
   test_epochs: '',
   random_seed: '',
   time_visit_id: 0,
   global_rate: '',
   global_importance_control: 0,
   bin_nums: '',
   delta_bin_nums: ''
})

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

const submitForm = () => {
   // console.log(fileList)
   if (!fileList.value || fileList.value.length != 1) {
      console.log('请上传文件！')
      return
   }
   var formdata = paramsToFormData(modelparams.value)
   formdata.append('df_train', fileList.value[0].raw.file)
   // console.log(formdata)

   // ParamUpload.UploadData(formdata).then((res) => {
   //    console.log(res)
   // }).catch((err) => {
   //    console.log(err)
   // })

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

const handleChange = (file, filelist) => {
   fileList.value = [filelist[filelist.length - 1]]
}
</script>
<style lang="scss" scoped>
.main-left {
   width: 50%;
   height: 100%;
   box-shadow: 0 1px 4px #00000014;
   margin: auto;
   padding-left: 30px;

}

.main-right {
   width: 50%;
   height: 100%;
   box-shadow: 0 1px 4px #00000014;
   margin: auto;
   padding: 0 20px 0 20px;
}

.title {
   font-weight: 500;
   font-size: 18px;
   display: block;
   margin-bottom: 10px;
}

.table {
   // height: 50%;
   width: 70%;
   margin: auto;
}

.uploader {
   height: 70%;
   width: 90%;
   margin: auto;
}

.chart-1-btn {
   // margin: auto;
   float: right;
   display: flex;
   justify-content: center;
   position: relative;
   // top: -20px;
   // right: 10px;

   .btn {
      $primary-color: v-bind(btnColor);
      position: relative;
      padding: 0.5rem 1rem;
      font-family: Lato, sans-serif;
      font-size: 1rem;
      line-height: 1.5;
      text-decoration: none;
      background-color: white;
      border: transparent;
      outline: transparent;
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
      overflow: hidden;

      &-primary {
         color: white;
         background-color: $primary-color;
      }

      &-snake-border {
         .btn-borders {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            .border-top {
               position: absolute;
               top: 0;
               width: 100%;
               height: 2px;
               background: linear-gradient(to right, transparent, white);
               animation: moveHorizontally 2s linear infinite;
            }

            .border-right {
               position: absolute;
               right: 0;
               width: 2px;
               height: 100%;
               background: linear-gradient(to bottom, transparent, white);
               animation: moveVertically 2s 1s linear infinite;
            }

            .border-bottom {
               position: absolute;
               bottom: 0;
               width: 100%;
               height: 2px;
               background: linear-gradient(to left, transparent, white);
               animation: moveHorizontally 2s linear reverse infinite;
            }

            .border-left {
               position: absolute;
               left: 0;
               width: 2px;
               height: 100%;
               background: linear-gradient(to top, transparent, white);
               animation: moveVertically 2s 1s linear reverse infinite;
            }
         }
      }
   }

   @keyframes moveHorizontally {
      from {
         transform: translateX(-100%);
      }

      to {
         transform: translateX(100%);
      }
   }

   @keyframes moveVertically {
      from {
         transform: translateY(-100%);
      }

      to {
         transform: translateY(100%);
      }
   }
}

.main-wrap {
   width: 100%;
   height: 100%;
   padding-top: 20px;

   .title {
      font-weight: 500;
      font-size: 18px;
      display: block;
      margin-bottom: 10px;
   }

   .table {
      // height: 50%;
      width: 70%;
      margin: auto;
   }

   .uploader {
      height: 30%;
      width: 70%;
      margin: auto;
   }

   .chart-1-btn {
      // margin: auto;
      float: right;
      display: flex;
      justify-content: center;
      position: relative;
      // top: -20px;
      // right: 10px;

      .btn {
         $primary-color: v-bind(btnColor);
         position: relative;
         padding: 0.5rem 1rem;
         font-family: Lato, sans-serif;
         font-size: 1rem;
         line-height: 1.5;
         text-decoration: none;
         background-color: white;
         border: transparent;
         outline: transparent;
         cursor: pointer;
         user-select: none;
         white-space: nowrap;
         overflow: hidden;

         &-primary {
            color: white;
            background-color: $primary-color;
         }

         &-snake-border {
            .btn-borders {
               position: absolute;
               top: 0;
               left: 0;
               width: 100%;
               height: 100%;

               .border-top {
                  position: absolute;
                  top: 0;
                  width: 100%;
                  height: 2px;
                  background: linear-gradient(to right, transparent, white);
                  animation: moveHorizontally 2s linear infinite;
               }

               .border-right {
                  position: absolute;
                  right: 0;
                  width: 2px;
                  height: 100%;
                  background: linear-gradient(to bottom, transparent, white);
                  animation: moveVertically 2s 1s linear infinite;
               }

               .border-bottom {
                  position: absolute;
                  bottom: 0;
                  width: 100%;
                  height: 2px;
                  background: linear-gradient(to left, transparent, white);
                  animation: moveHorizontally 2s linear reverse infinite;
               }

               .border-left {
                  position: absolute;
                  left: 0;
                  width: 2px;
                  height: 100%;
                  background: linear-gradient(to top, transparent, white);
                  animation: moveVertically 2s 1s linear reverse infinite;
               }
            }
         }
      }

      @keyframes moveHorizontally {
         from {
            transform: translateX(-100%);
         }

         to {
            transform: translateX(100%);
         }
      }

      @keyframes moveVertically {
         from {
            transform: translateY(-100%);
         }

         to {
            transform: translateY(100%);
         }
      }
   }
}
</style>