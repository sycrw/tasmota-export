"use client"

import {Suspense} from "react";
import {ChartView} from "@/app/components/ChartView";

export default function Home() {
    return (<Suspense>
        <ChartView/>
    </Suspense>);
}


export const dynamic = 'force-dynamic';