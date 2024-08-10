import {Levenstein} from "../levenstein";

export const distanceMatrix = (masTrack) => {

    const weight = [0.5, 0.1, 0.4]
    const itogDistanceMatrix = [];

    // Проходим по каждому массиву метрик
    masTrack.map((masMetrics) => {
        const distanceRow = []; // Массив для хранения расстояний для текущей метрики

        // Сравниваем каждую песню с каждой другой
        masMetrics.forEach(song1 => {
            const distances = masMetrics.map(song2 => {
                return Levenstein(song1, song2);
            });
            distanceRow.push(distances); // Добавляем расстояния в строку
        });
        itogDistanceMatrix.push(distanceRow);
    })

    const multiplyMatrixByWeight = []
    itogDistanceMatrix.map((matrix, index)=> {
        const a = matrix.map(row => row.map(value => value * weight[index]))
        multiplyMatrixByWeight.push(a)
    })

    const addMatrices = (matrixA, matrixB) => {
        return matrixA.map((row, i) => row.map((value, j) => value + matrixB[i][j]));
    };

    const addThreeMatrices = (matrixA, matrixB, matrixC) => {
        const tempSum = addMatrices(matrixA, matrixB);
        return addMatrices(tempSum, matrixC);
    };

    return addThreeMatrices(multiplyMatrixByWeight[0], multiplyMatrixByWeight[1], multiplyMatrixByWeight[2])

}


// export const distanceMatrix = (masTrack) => {
//     masTrack.map(song1 => {
//         return masTrack.map(song2 => {
//             return Levenstein(song1, song2);
//         });
//     })
//     return masTrack
// }