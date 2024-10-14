"use client";

import {CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis, LineChart, ResponsiveContainer} from "recharts";
import {TimedData} from "@/app/types/timedData";
import {toVisualDateTime, toVisualeDate, toVisualTime} from "@/app/lib/helpers/toVisualDate";
import {TimeRangeEnum} from "@/app/types/TimeRangeEnum";
import {getUnixTimeFromInfluxTime} from "@/app/lib/helpers/getTimeFromInfluxTime";
import {getToVisualDateFunctionFromInfluxTimeStamp} from "@/app/lib/helpers/getToVisualDateFunctionFromInfluxTimeStamp";

interface ChartProps {
    data: TimedData;
    timeRange: TimeRangeEnum;
}

export const Chart = ({data, timeRange}: ChartProps) => {
    // Convert the data to the format expected by the chart
    const chartData = data.map((e) => {
        return {power: e.power, time: new Date(e.time).getTime()};
    });

    // Get the full range for the X-axis domain based on the timeRange
    const minTime = Date.now() - getUnixTimeFromInfluxTime(timeRange);
    console.log(minTime);
    const maxTime = Date.now();

    return (
        <LineChart width={730} height={250} data={chartData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis
                dataKey="time"
                domain={[minTime, maxTime]} // Set the X-axis domain to the full range
                type="number"
                tickFormatter={(t) => getToVisualDateFunctionFromInfluxTimeStamp(timeRange)(t)}
            />
            <YAxis/>
            <Tooltip labelFormatter={(t) => toVisualDateTime(t)}/>
            <Legend/>
            <Line type="monotone" dataKey="power" stroke="#8884d8"/>
        </LineChart>
    );
};
