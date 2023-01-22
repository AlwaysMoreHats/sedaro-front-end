import React, { useEffect, useState } from 'react';
import SimulationDetailsForm, { FormData } from './Components/SimulationDetailsForm';

type ChartData = {
  t: number[];
  x: number[];
  y: number[];
  z: number[];
}

type AppContextType = {
  // isLoading: boolean;
  formData: FormData;
  chartData?: ChartData;
}

const defaultState: AppContextType = {
  // isLoading: false,
  formData: { start: 0, stop: 0, width: 0 },
}

const AppContext = React.createContext<AppContextType>(defaultState)

const App = () => {
  // const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({ start: 0, stop: 0, width: 0 })
  const [chartData, setChartData] = useState<ChartData>()

  useEffect(() => {
    
  }, [formData])

  const appState: AppContextType = {
    // isLoading,
    formData,
  }

  return <div className="App">
    <AppContext.Provider value={appState}>
    
      <SimulationDetailsForm onSubmit={(data) => {setFormData(data); setChartData(undefined)}} />
    </AppContext.Provider>
    </div>;
};

export default App;
