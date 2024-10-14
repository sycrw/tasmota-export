import {InfluxDB, FluxTableMetaData} from '@influxdata/influxdb-client'
import {NextRequest, NextResponse} from "next/server";
import {DataPoint, TimedData} from "../../types/timedData"
import {TimeRangeEnum} from "@/app/types/TimeRangeEnum";
import {getTimeWindow} from "@/app/lib/helpers/getTimeWindow";


const queryApi = new InfluxDB({
    url: process.env.INFLUX_DB_URL as string,
    token: process.env.INFLUX_DB_TOKEN as string
}).getQueryApi(process.env.INFLUX_DB_ORG as string)


export const GET = async (request: NextRequest) => {
    console.log(process.env.INFLUX_DB_URL + ";"+process.env.INFLUX_DB_ORG)
    const time:TimeRangeEnum = (request.nextUrl.searchParams.get("time") || "1d") as TimeRangeEnum;

    const fluxQuery = `
        from(bucket: "tasmota")
          |> range(start: -${time})
          |> filter(fn: (r) => r["_measurement"] == "tasmota")
          |> filter(fn: (r) => r["_field"] == "power")
          |> aggregateWindow(every: ${getTimeWindow(time)}, fn: mean, createEmpty: false)
          |> yield(name: "mean")
        `;

    const data: TimedData = [];
    for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
        // the following line creates an object for each row
        const o = tableMeta.toObject(values)
        // console.log(JSON.stringify(o, null, 2))
        data.push({time: o._time, power: o._value})
    }
    return NextResponse.json(data);
}