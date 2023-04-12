import service from "../http/request";
const url = {
    unfairness_process: '/uncertain/unfairness_process',
    mutil_unfairness_process: '/uncertain/mutil_unfairness_process',
    all_unfairness_process: '/uncertain/all_unfairness_process',
}
export class Unfairness {
    static async UnfairnessProcess(data) {
        return await service(url.unfairness_process, {
            method: "post",
            responseType: "json",
            data,
        });
    }
    static async MutilUnfairnessProcess(data) {
        return await service(url.mutil_unfairness_process, {
            method: "post",
            responseType: "json",
            data,
        });
    }
    static async AllUnfairnessProcess(data) {
        return await service(url.all_unfairness_process, {
            method: "post",
            responseType: "json",
            data,
        });
    }
}