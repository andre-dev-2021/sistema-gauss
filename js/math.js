const resolver = (num) => {
    let mtx = lerValoresMatriz(num);
    let mtxEscalonada = escalonar(mtx);
    let tipo = verificarTipo(mtxEscalonada);

    if(tipo == "SI"){
        criarTabelaResultado(mtx, mtxEscalonada, '<p class="text-danger">Sistema sem solução!</p>');
    }else if(tipo == "SPI"){
        criarTabelaResultado(mtx, mtxEscalonada, '<p class="text-danger">Sistema com infinitas soluções!');
    }else{
        let res = `<math><mrow><mi>S</mi><mo>=</mo><mn>{${substituir(mtxEscalonada)}}</mn></mrow></math>`;   
        criarTabelaResultado(mtx, mtxEscalonada, res);
    }
}

const lerValoresMatriz = (num) => {
    let mtx = [];

    for(let i = 0; i < num; i++){
        let l = [];
        for(let j = 0; j < num + 1;j++){
            const n = parseInt($(`#${i}_${j}`).val());
            if(isNaN(n)){
                l.push(0);
            }else{
                l.push(n);
            }
        }
        mtx.push(l);
    }

    return mtx;
}

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

    if (rankCoef < rankAug) return 'SI'; // (Sistema Impossível)
    if (rankCoef < m) return 'SPI';      // (Sistema Possível Indeterminado)
    return 'SPD'; // (Sistema Possível Determinado)
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
    // Transforma linhas da matriz em equação.
    // Ex: [1, -2, 3, -4] para 'x - 2y + 3z = -4'
    // Ordem de nomeação: x, y, z, w, t, j, k, l, m, n.

    const varNames = 'xyzwtjklmn'.split('');
    let systemStr = [];
    for(let i = 0; i < num; i++) {
        let eq = '';
        for(let j = 0; j < num; j++) {
            const coef = mtx[i][j].toFixed(2);
            if (j > 0) eq += coef >= 0 ? ' + ' : ' - ';
            else if (coef < 0) eq += '-';
            eq += (Math.abs(coef) !== 1 || coef === 0 ? Math.abs(coef) : '') + varNames[j];
        }
        eq += ' = ' + mtx[i][num].toFixed(2);
        systemStr.push(eq);
    }
    return systemStr; 
}

const escalonar = (mtx) => {
    // Realiza a eliminação de Gauss por pivotamento parcial.

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