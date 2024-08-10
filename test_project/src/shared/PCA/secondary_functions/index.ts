import {eigs, re} from 'mathjs';

const centerMatrix = (matrix) => {
    const meanVector = calculateMean(matrix);
    const centered = matrix.map(row => row.map((val, idx) => val - meanVector.meanVector[idx]));
    return {centered}
}

const calculateMean = (matrix) => {
    let n
    let m
    let meanVector
    if (matrix || matrix.length !== 0 || matrix[0] || matrix[0].length !== 0) {
        n = matrix.length;
        m = matrix[0].length;
        meanVector = Array(m).fill(0);

        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                meanVector[i] += matrix[j][i];
            }
            meanVector[i] /= n;
        }
    }
    return {meanVector}
}

const calculateCovariance = (matrix) => {
    const n = matrix.length;
    const m = matrix[0].length;
    const covariance = Array.from({length: m}, () => Array(m).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < m; j++) {
            let cov = 0;
            for (let k = 0; k < n; k++) {
                cov += matrix[k][i] * matrix[k][j];
            }
            covariance[i][j] = cov / (n - 1);
        }
    }
    return {covariance}
}

const sortEigenVectors = (eigenVectors, eigenValues) => {
    const sorted = eigenValues.map((value, index) => ({value: value, vector: eigenVectors[index]}))
        .sort((a, b) => b.value - a.value);
    const sort = sorted.map(item => item.vector);
   return {sort}
}

const projectData = (matrix: number[][], eigenVectors: { vector: number[] }[]) => {
    const projectedData: number[][] = [];

    matrix.forEach((row) => {
        const projectedDataStr: number[] = eigenVectors.map(({ vector }) => {
            // Вычисляем проекцию для текущей строки row на текущий вектор
            return row.reduce((sum, val, i) => sum + val * vector[i], 0);
        });
        // Добавляем массив проекций в projectedData
        projectedData.push(projectedDataStr);
    });


    return { projectedData };
};
const calculateEigenVectors = (matrix, numComponents) => {
    const {values: eigenValues, eigenvectors} = eigs(matrix, numComponents);
    return {eigenVectors: eigenvectors, eigenValues};
}

export {
    centerMatrix,
    calculateMean,
    calculateCovariance,
    calculateEigenVectors,
    sortEigenVectors,
    projectData
}