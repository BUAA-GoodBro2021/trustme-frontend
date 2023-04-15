export const getFilerData = (pureDimensions,dataList)=>{
  let feature_detail = {
     cn_name:[],
     feature_importance:[],
  }
  Object.keys(dataList[0]).forEach((key)=>{
     if(pureDimensions.includes(key)){
        feature_detail.cn_name.push(key)
     }
  })
  feature_detail.feature_importance = dataList[0].i_global;
  let {cn_name,feature_importance} = feature_detail;
  let filterList = [];
  for(let i = 0;i<cn_name.length;i++){
     filterList.push({
        cn_name:cn_name[i],
        feature_importance:feature_importance[i],
        index:i,
     })
  }
  filterList.sort((a,b)=>{
     return b.feature_importance - a.feature_importance
  });
  filterList = filterList.slice(0,30).reverse();
  let filterDimensions = [];
  for(let i = 0;i<30;i++){
     filterDimensions.push(filterList[i].cn_name);
  }
  return {
     filterList,
     filterDimensions,
  }
}