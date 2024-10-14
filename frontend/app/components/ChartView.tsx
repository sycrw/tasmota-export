"use client"

import {useSearchParams} from "next/navigation";
import {TimeRangeEnum} from "@/app/types/TimeRangeEnum";
import {useEffect, useState} from "react";
import {TimedData} from "@/app/types/timedData";
import {dataClient} from "@/app/lib/clients/dataClient";
import {Chart} from "@/app/components/Chart";
import {TimeSelectButtons} from "@/app/components/TimeSelectButtons";

export const ChartView = () => {
    const timeRange = (useSearchParams().get("timeRange") || "1d") as TimeRangeEnum;
    const [data, setData] = useState<TimedData>([]);

    useEffect(() => {
        dataClient.getData(timeRange).then((data) => {setData(data)})
    }, [timeRange])


    return (
        <div className="w-full flex justify-center">
            <div className="max-w-[1200px] w-full flex justify-center flex-col items-center">
                <Chart data={data} timeRange={timeRange}/>
                <TimeSelectButtons />
            </div>
        </div>
    );
}