import { getData } from '../data'
import { RawChartData } from '../types'

const fetchChartData = async (start: number, stop: number, width: number) => {
    for (let retries = 5; retries > 0; retries--) {
        try {
        const data = await getData(start, stop, width) as RawChartData
        console.log(data)
        return data;
        } catch (e) {
        const err = e as { error: string }
        if (err.error === 'Invalid range') {
            console.error(err.error)
            return;
        }
        
        console.warn(err.error, `Retrying ${retries} more time(s)`);
        }
    }

    throw new Error('Timeout')
}

export default fetchChartData;