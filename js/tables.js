const limparConteudo = () => {
    document.getElementById('content').innerHTML = "";
}

const lerValoresMatriz = (num) => {
    let mtx = [];

    for(let i = 0; i < num; i++){
        let l = [];
        for(let j = 0; j < num + 1;j++){
        const n = parseInt(document.getElementById(`${i}_${j}`).value);
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

const criarMatriz = (num) => {

    // Cria matriz aumentada A|b (num x num + 1)

    limparConteudo();

    const div = document.getElementById("content");
    const btn = document.getElementById("btn_resultado")

    let html = '<div class="d-flex justify-content-center mt-4">';
    html += '<table class="table table-sm table-bordered table-secondary w-auto" style="font-size:0.9rem;"><tbody>';

    for (let i = 0; i < num; i++) {
    html += '<tr>';
    for (let j = 0; j < num + 1; j++) {
        html += `<td style="padding:2px; width:40px; min-width:40px;">
        <input id="${i}_${j}" type="number" class="form-control p-1" style="width:50px; height:28px; font-size:0.9rem; background: none;" inputmode="numeric" pattern="[0-9]*" onwheel="return false;" onkeydown="if(event.key==='e'||event.key==='E'){event.preventDefault();}" />
        </td>`;
    }
    html += '</tr>';
    }

    html += '</tbody></table></div>';
    div.innerHTML = html;
    btn.innerHTML = "<button type='button' class='btn btn-warning btn-sm' onclick='resolver();'>Mostrar resolução</button>"
}

const formatar = (equacoes) => {
    let rows = equacoes.map(eq => `<mtr><mtd><mn>${eq}</mn></mtd></mtr>`).join('');
    return `<math display="block"><mo>{</mo><mtable>${rows}</mtable></math>`;
}

const criarTabelaResultado = (mtx, mtxEscalonada, res) => {
    limparConteudo();

    const div = document.getElementById("content");
    let original = formatar(equacao(mtx, mtx.length));
    let escalonada = formatar(equacao(mtxEscalonada, mtxEscalonada.length));

    div.innerHTML += [
        `<div class="d-flex justify-content-center mt-4">`,
        `<table class="table w-auto text-center">`,
            `<thead>`,
                `<tr>`,
                    `<th>Sistema original</th>`,
                    `<th>Sistema escalonado</th>`,
                    `<th>Solução</th>`,
                `</tr>`,
            `</thead>`,
            `<tbody>`,
                `<tr class="resultados">`,
                    `<td><i>${original}</i></td>`,
                    `<td><i>${escalonada}</i></td>`,
                    `<td>${res}</td>`,
                `</tr>`,
            `</tbody>`,
        `</table>`,
        `</div>`
    ].join('');
}