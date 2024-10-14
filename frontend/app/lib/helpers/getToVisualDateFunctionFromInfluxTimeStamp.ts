import {TimeRangeEnum} from "@/app/types/TimeRangeEnum";
import {getUnixTimeFromInfluxTime, getValueAndUnitFromInfluxTime} from "@/app/lib/helpers/getTimeFromInfluxTime";
import {toVisualDateTime, toVisualeDate, toVisualTime} from "@/app/lib/helpers/toVisualDate";

export const getToVisualDateFunctionFromInfluxTimeStamp = (timeRange: TimeRangeEnum) => {
    const TIME_DAY = 60 * 60 * 24 * 1000;
    const TIME_WEEK = TIME_DAY * 7;

    const time = getUnixTimeFromInfluxTime(timeRange);

    if(time>= TIME_WEEK){
        return toVisualeDate
    }
    if (time >= TIME_DAY) {
        return toVisualDateTime
    }
    return toVisualTime;

}