

export const TakeTheNecessaryMetrics = (dataArray, ) => {
    const necessaryMetrics = ["Track"]
    let arrayOfValuesByMetrics = []

    if (dataArray)
    {
        for (let i = 0; i < necessaryMetrics.length; i++){
            const keys = Object.keys(dataArray)
            const values = Object.values(dataArray)
            let indexValue = keys.indexOf(necessaryMetrics[i])
            arrayOfValuesByMetrics.push(values[indexValue])
        }
    }

    return arrayOfValuesByMetrics.join('')
};
