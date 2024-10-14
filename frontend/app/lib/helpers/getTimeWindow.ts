import {TimeRangeEnum} from "@/app/types/TimeRangeEnum";
import {getValueAndUnitFromInfluxTime} from "@/app/lib/helpers/getTimeFromInfluxTime";

export const getTimeWindow = (timeRange: TimeRangeEnum): string => {
    const match = getValueAndUnitFromInfluxTime(timeRange)
    if (!match) {
        throw new Error("Invalid Time Format") // only allow minutes - weeks
    }
    const value = Number(match[1]);
    const unit = match[2];
    console.log(value + " " + unit);
    switch (unit){
        case "m": return `${value}s`
        case "h": return `${value}m`
        case "d": return `${value*24}m`
        case "w": return `${value*2}h`
        default: return "1h"
    }
}

