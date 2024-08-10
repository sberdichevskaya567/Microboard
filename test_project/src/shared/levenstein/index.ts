export const Levenstein = (dataset1, dataset2) => {
        const matrix = new Array(dataset1.length + 1);
        matrix[0] = new Array(dataset2.length + 1);

        for (let i = 0; i <= dataset2.length; i += 1) {
            matrix[0][i] = i;
        }

        for (let i = 1; i <= dataset1.length; i += 1) {
            matrix[i] = new Array(dataset2.length + 1);
            matrix[i][0] = i;
        }

        for (let i = 1; i <= dataset1.length; i += 1) {
            for (let j = 1; j <= dataset2.length; j += 1) {
                const ins = 1 + matrix[i][j - 1];
                const del = 1 + matrix[i - 1][j];
                let sub = matrix[i - 1][j - 1];

                if (dataset1.charAt(i - 1) !== dataset2.charAt(j - 1)) {
                    sub += 1;
                }

                matrix[i][j] = Math.min(ins, del, sub);
            }
        }
    return matrix[dataset1.length][dataset2.length];
}