import {MasTrack} from "../../shared/masTrack";
import {distanceMatrix} from "../../shared/distaanceMatrix";
import {PCA} from "../../shared/PCA";
import {Bubble} from "react-chartjs-2";
import {Chart, registerables} from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import {useEffect} from "react";
import {
    calculateCovariance,
    calculateEigenVectors,
    centerMatrix,
    sortEigenVectors
} from "../../shared/PCA/secondary_functions";
Chart.register(...registerables);
Chart.register(zoomPlugin);
const MainPage = () => {

    const {itogMatrix} = MasTrack(['Track', 'Album Name', 'Artist'])
    const {projectedData} = PCA(distanceMatrix(itogMatrix), 2)

    const Track: string[] = itogMatrix[0]
    const Album_Name: string[] = itogMatrix[1]
    const Artist: string[] = itogMatrix[2]
    //console.log(Track)
    let masLabel: string[] = []
    itogMatrix[0].map((_el, index)=>{
        masLabel.push(`${Track[index]}/${Album_Name[index]}/${Artist[index]}`)
    })





    const bubbleData = {
        labels: masLabel,
        datasets: [{
            label: MasTrack(['Track', 'Album Name', 'Artist']),
            data: projectedData?.map((point, index) => ({
                x: point[0],
                y: point[1],
                r: 10 // Радиус пузырька пропорционален количеству потоков
            })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
        }]
    };

    const bubbleOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Bubble Chart with Zooming'
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy', // Разрешить панорамирование по обеим осям
                },
                zoom: {
                    enabled: true,
                    mode: 'xy', // Разрешить масштабирование по обеим осям
                    speed: 0.1, // Скорость масштабирования
                    sensitivity: 3, // Чувствительность масштабирования
                }
            }
        },
        scales: {
            x: {
                type: 'linear',
                position: 'bottom'
            },
            y: {
                beginAtZero: true
            }
        }
    }

    return (
        <div className="w-[1000px] h-[1000px]">
            <Bubble data={bubbleData} options={bubbleOptions}/>
        </div>

    )
}

export default MainPage