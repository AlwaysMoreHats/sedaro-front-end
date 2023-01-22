import React, { useMemo } from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import { ChartData } from '../../types'

// import "./SimulationPanel.css" // My environment would not recognize a file here, so it's in index.css

type Props = {
    stepSize?: number;
    chartData?: ChartData;
}

// const chartMin = -1
// const chartMax = 1
// const chartLimit = undefined

function lerp(start: number, end: number, difference: number) {
    return start + difference * (end-start)
}

export default function SimmulationPanel({ chartData = [], stepSize = 0 }: Props) {

    const { x, y, z } = useMemo(() => {
        if (chartData.length === 0) {
            return { x: [], y: [], z: [] }
        }
        const xData: number[] = []
        const yData: number[] = []
        const zData: number[] = []
        let lastStep = 0
        const start = chartData[0].t
        chartData.forEach(({t, x, y, z}) => {
            const index = Math.round((t-start) / stepSize)

            if (index !== lastStep + 1) {
                const gap = index - lastStep

                for (let i=1; i<gap; i++) {
                    xData.push(lerp(xData[lastStep], x, i/gap))
                    yData.push(lerp(yData[lastStep], y, i/gap))
                    zData.push(lerp(zData[lastStep], z, i/gap))
                }
            }

            xData.push(x)
            yData.push(y)
            zData.push(z)

            lastStep = index

            if (xData.length !== index+1) {
                console.error('math bad')
            }
        })

        return { x: xData, y: yData, z: zData }
    }, [stepSize, chartData])

    return <div className='simulationPanel panel'>
        <div className="simulationLine"><span>X</span> <Sparklines preserveAspectRatio='none' svgHeight={65} data={x} ><SparklinesLine color="red" /></Sparklines></div>
        <div className="simulationLine"><span>Y</span> <Sparklines svgHeight={65} data={y} ><SparklinesLine color="green" /></Sparklines></div>
        <div className="simulationLine"><span>Z</span> <Sparklines svgHeight={65} data={z} ><SparklinesLine color="blue" /></Sparklines></div>
    </div>
}