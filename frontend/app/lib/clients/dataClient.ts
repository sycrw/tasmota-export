import {TimedData} from "@/app/types/timedData";

class DataClient{
    async getData(timeRange:string){
        const res = await fetch(`/api/data?time=${timeRange}`);
        return (await res.json()) as TimedData;
    }
}


export const dataClient = new DataClient();