import {TimeRangeEnum} from "@/app/types/TimeRangeEnum";
export const setTimeRangeQueryParam = (timeRange: TimeRangeEnum,searchParams,pathname,router) => {
    const params = new URLSearchParams(searchParams);
    params.set("timeRange",timeRange);
    router.push(pathname + "?" + params.toString());
    router.refresh();
}