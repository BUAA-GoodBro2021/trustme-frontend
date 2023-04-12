import service from "../http/request";
const url = {
    uncertainty_process: '/uncertain/uncertainty_process',
}
export class Uncertain {
    static async UncertainProcess(data) {
        return await service(url.uncertainty_process, {
            method: "post",
            responseType: "json",
            data,
        });
    }
}