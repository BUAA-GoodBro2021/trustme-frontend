import service from "../http/request";
const url = {
    uncertainty_process: '/uncertain/uncertainty_process',
    unfairness_process: '/uncertain/unfairness_process',
    mutil_unfairness_process: '/uncertain/mutil_unfairness_process',
    all_unfairness_process: '/uncertain/all_unfairness_process'
}
export class Uncertain {
    static async UncertainProcess(data) {
        return await service(url.uncertainty_process, {
            method: "post",
            responseType: "json",
            data,
        });
    }

    static async UnFairnessProcess(data) {
        return await service(url.unfairness_process, {
            method: "post",
            responseType: "json",
            data,
        });
    }

    static async MultUnFairnessProcess(data) {
        return await service(url.mutil_unfairness_process, {
            method: "post",
            responseType: "json",
            data,
        });
    }

    static async AllUnFairnessProcess(data) {
        return await service(url.all_unfairness_process, {
            method: "post",
            responseType: "json",
            data,
        });
    }
}