import React, { useEffect, useReducer, useState } from 'react';
import SimulationDetailsForm, { FormData } from './Components/SimulationDetailsForm';
import fetchChartData from './scripts/fetchChartData';
import { RawChartData } from './types'


type ChartData = { t: number, x: number, y: number, z: number }[]

type AppContextType = {
  isLoading: boolean;
  formData?: FormData;
  chartData?: RawChartData;
}

const defaultState: AppContextType = {
  isLoading: false,
  formData: { start: 0, stop: 0, width: 0 },
}


function chartDataReducer(curState: ChartData = [], action: { type: 'ADD' | 'RESET', data?: RawChartData}) {
  switch(action.type){
    case 'RESET': {
      return undefined;
    }
    case 'ADD': {
      const newData: ChartData = [];
      const rawData = action.data;
      if (!rawData) {
        return curState
      }
      rawData.t.forEach((t, ind) => newData.push({ t, x: rawData.x[ind], y: rawData.y[ind], z: rawData.z[ind]}))
      const ret = [...curState, ...newData]
      ret.sort((a, b) => a.t - b.t)
      return ret
    }
  }
}

const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>()
  const [chartData, dispatch] = useReducer(chartDataReducer, [])

  useEffect(() => {
    if (!formData) {
      return
    }

    setIsLoading(true);

    const maxSteps = 20;
    const fetchCalls: Promise<RawChartData | undefined>[] = []
    for (let start = formData.start; start < formData.stop; start += formData.width*maxSteps) {
      const stop = Math.min(start + formData.width*(maxSteps-1), formData.stop)
      const fetchCall = fetchChartData(start, stop, formData.width)
      fetchCalls.push(fetchCall)

      fetchCall
      .then((data) => {
        dispatch({ type: 'ADD', data })
      })
      .catch(() => console.error(`Time Range ${start}-${stop} timed out`))
    }
    Promise.allSettled(fetchCalls).then(() => setIsLoading(false))
  }, [formData?.start, formData?.stop, formData?.width])


  const appState: AppContextType = {
    isLoading,
    formData,
  }

  return <div className="App">
      <SimulationDetailsForm isLoading={isLoading} onSubmit={(data) => {setFormData(data); dispatch({ type: 'RESET'})}} />
    </div>;
};

export default App;
