import {
    calculateCovariance,
    calculateEigenVectors,
    centerMatrix,
    projectData,
    sortEigenVectors
} from "./secondary_functions";
import {useEffect, useState} from "react";

const PCA = (data, numComponents) => {

    if (!data || data.length === 0 || numComponents <= 0) {
        // console.warn("No data available for PCA or numComponents is invalid.");
        return []; // Возвращаем пустой массив, если нет данных
    }

    const {centered} = centerMatrix(data);
    const {covariance} = calculateCovariance(centered);
    const { eigenVectors, eigenValues } = calculateEigenVectors(covariance, numComponents);

    // Проверяем, что eigenVectors и eigenValues не пустые
    // if (!eigenVectors || eigenVectors.length === 0 || !eigenValues || eigenValues.length === 0) {
    //     console.warn("Eigenvectors or eigenvalues are empty.");
    //     return []; // Возвращаем пустой массив, если нет собственных векторов или значений
    // }

    const {sort} = sortEigenVectors(eigenVectors, eigenValues);
    const reducedEigenVectors = sort.slice(0, numComponents);

    const {projectedData} = projectData(centered, reducedEigenVectors);
    // console.log(projectedData)
    return {projectedData};
}
export {PCA}

// export const PCA = ( data, numComponents ) => {
//     const [projectedData, setProjectedData] = useState(null);
//
//     useEffect(() => {
//         // const performPCA = () => {
//             // Проверяем, заполнены ли параметры
//                 if (data && data.length > 0 && numComponents > 0) {
//                     const centered = centerMatrix(data);
//                     const covariance = calculateCovariance(centered);
//                     const { eigenVectors, eigenValues } = calculateEigenVectors(covariance, numComponents);
//                     const sortedEigenVectors = sortEigenVectors(eigenVectors, eigenValues);
//                     const reducedEigenVectors = sortedEigenVectors.slice(0, numComponents);
//                     const projectedDataResult = projectData(centered, reducedEigenVectors);
//
//                     setProjectedData(projectedDataResult);
//                 } else {
//                     console.warn("Data is empty or numComponents is not valid");
//                 }
//         // };
//
//         // performPCA(); // Вызываем асинхронную функцию
//     }, [data, numComponents]); // Зависимости
//
//     return projectedData
// }
