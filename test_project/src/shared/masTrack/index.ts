
import {TakeTheNecessaryMetrics} from "../takeTheNecessaryMetrics";
import {receivingData} from "../../app/entities/slice";
import {useEffect} from "react";

const MasTrack = (necessaryMetrics) => {
    const {data} = receivingData()
    // const necessaryMetrics = ['Track', 'Album Name', 'Artist']
    const itogMatrix = []

        necessaryMetrics.map((el, index) => {
            let arrayOfValuesByMetrics = []
            data.map((item) => {
                const keys = Object.keys(item)
                const values = Object.values(item)
                let indexValue = keys.indexOf(necessaryMetrics[index])
                arrayOfValuesByMetrics.push(values[indexValue])
            })
            itogMatrix.push(arrayOfValuesByMetrics)
        })


    return {itogMatrix}
}
export {MasTrack}