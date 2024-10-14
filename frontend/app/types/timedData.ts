import {number} from "prop-types";

export interface DataPoint {
    time:string,
    power:number,
}

export type TimedData = DataPoint[];