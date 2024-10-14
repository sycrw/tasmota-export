import {TimeRangeEnum} from "@/app/types/TimeRangeEnum";
import {number} from "prop-types";

export const getValueAndUnitFromInfluxTime =(timeRange: TimeRangeEnum):RegExpMatchArray=>{
    const pattern = /(\d+)([mhdw])/;
    const match = timeRange.match(pattern);
    if (!match) {
        throw new Error("Invalid Time Format") // only allow minutes - weeks
    }
    return match;
}

export const getUnixTimeFromInfluxTime = (timeRange: TimeRangeEnum):number =>{
    const match = getValueAndUnitFromInfluxTime(timeRange);
    const time:number = Number(match[1]);
    switch (match[2]){
        case "m": return time*60*1000;
        case "h": return time*60*60*1000;
        case "d": return time*60*60*24*1000;
        case "w": return time*60*60*24*7*1000;
    }
    return 0;
}