const verificarTipo = (mtx) => {
    let n = mtx.length;
    let m = mtx[0].length - 1;
    let rankCoef = 0, rankAug = 0;

    for (let i = 0; i < n; i++) {
        let allZeroCoef = true;
        for (let j = 0; j < m; j++) {
            if (Math.abs(mtx[i][j]) > 1e-10) {
                allZeroCoef = false;
                break;
            }
        }
        if (!allZeroCoef) rankCoef++;
        let allZeroAug = allZeroCoef && Math.abs(mtx[i][m]) < 1e-10;
        if (!allZeroAug) rankAug++;
    }

    if (rankCoef < rankAug) return 'SI'; // Sem solução
    if (rankCoef < m) return 'SPI';      // Infinitas soluções
    return 'SPD'; // S = {x , y, ...} 
}

const substituir = (M) => {
    const n = M.length;

    let x = new Array(n).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let soma = M[i][n];
        for (let j = i + 1; j < n; j++) {
        soma -= M[i][j] * x[j];
        }

        if(isNaN(soma)){
        return null;
        }

        x[i] = soma / M[i][i];
    }

    return x;
    }


const equacao = (mtx, num) => {
    const varNames = 'xyzwtjklmn'.split('');
    let systemStr = [];
    for(let i = 0; i < num; i++) {
        let eq = '';
        for(let j = 0; j < num; j++) {
            const coef = mtx[i][j];
            if (coef === 0) continue;
            if (eq.length > 0) eq += coef > 0 ? ' + ' : ' - ';
            else if (coef < 0) eq += '-';
            eq += (Math.abs(coef) !== 1 ? Math.abs(coef) : '') + varNames[j];
        }
        eq += ' = ' + mtx[i][num];
        systemStr.push(eq);
    }
    return systemStr;
    }

const escalonar = (mtx) => {
    const n = mtx.length;

    let M = mtx.map(row => row.slice());

    for (let k = 0; k < n; k++) {
        // Pivotamento parcial
        let pivo = k;
        for (let i = k + 1; i < n; i++) {
            if (Math.abs(M[i][k]) > Math.abs(M[pivo][k])) {
                pivo = i;
            }
        }
        if (pivo !== k) {
            [M[k], M[pivo]] = [M[pivo], M[k]];
        }

        // Eliminação abaixo do pivô
        for (let i = k + 1; i < n; i++) {
            let fator = M[i][k] / M[k][k];
            for (let j = k; j < n + 1; j++) {
                M[i][j] -= fator * M[k][j];
            }
        }
    }

    return M;
}