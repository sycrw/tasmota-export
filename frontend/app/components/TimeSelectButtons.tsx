"use client"
import {Button} from "@/app/components/Button";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {setTimeRangeQueryParam} from "@/app/lib/helpers/setTimeRangeQueryParam";
import {TimeRangeEnum} from "@/app/types/TimeRangeEnum";

export const TimeSelectButtons = () =>{
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    return(
        <>
            <Button onClick={()=>{
                console.log("click");
                setTimeRangeQueryParam(TimeRangeEnum.SixHours,searchParams,pathname,router)
            }}>6h</Button>
            <Button onClick={()=>{
                setTimeRangeQueryParam(TimeRangeEnum.TwelveHours,searchParams,pathname,router)
            }}>12h</Button>
            <Button onClick={()=>{
                setTimeRangeQueryParam(TimeRangeEnum.OneDay,searchParams,pathname,router)
            }}>1d</Button>
            <Button onClick={()=>{
                setTimeRangeQueryParam(TimeRangeEnum.ThreeDays,searchParams,pathname,router)
            }}>3d</Button>
            <Button onClick={()=>{
                setTimeRangeQueryParam(TimeRangeEnum.OneWeek,searchParams,pathname,router)
            }}>1w</Button>
            <Button onClick={()=>{
                setTimeRangeQueryParam(TimeRangeEnum.FourWeeks,searchParams,pathname,router)
            }}>4w</Button>

        </>

    )
}