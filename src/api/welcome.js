import service from "../http/request";
const url = {
  upload: '/uncertain/uncertainty_process'
}
// 详细参考见：https://www.axios-http.cn/docs/req_config
export class ParamUpload {
  // 本次的body默认使用JSON而不是FormData
  static async UploadData(data) {
    return await service(url.upload, {
      // 方法，默认为 get
      method: "post",
      // 返回值类型，默认为json
      responseType: "json",
      // 这里是 data: data的简写
      data,
    });
  }
}
