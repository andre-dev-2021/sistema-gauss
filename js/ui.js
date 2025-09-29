// DOM Listeners

$("#numForm").on('submit', (e) => {
    let num = $("#numInput").val();
    num = num != "" ? parseInt(num) : 0;

    if(num < 2 || num > 10){
    gerarAlerta("Tamanho inválido: Informe um número entre 2 e 10.", "danger");
    }else{
    criarMatrizAb(num);
    }
    e.preventDefault();
});

// Funcões para manipular DOM.

const limparConteudo = () => {
    $('#content').empty();
}

const formatar = (equacoes) => {
    let rows = equacoes.map(eq => `<mtr><mtd><mn>${eq}</mn></mtd></mtr>`).join('');
    return `<math display="block"><mo>{</mo><mtable>${rows}</mtable></math>`;
}

const gerarAlerta = (msg, tipo) => {
    const div = $("#localAlertas");

    let alerta = [
        `<div>`,
            `<div class="alert alert-${tipo} alert-dismissible" role="alert">`,
            `   <div>${msg}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>',
        `</div>`
    ].join('');

    div.append(alerta);
}

const criarMatrizAb = (num) => {
    // Cria uma matriz Ab para inserir os coeficientes e termos independentes.

    limparConteudo();

    const div = $("#content");
    let html = '<div class="d-flex justify-content-center mt-4" id="content-table">';
    html += '<table class="table table-responsive table-sm table-bordered border-dark rounded w-auto"><tbody>';

    for (let i = 0; i < num; i++) {
    html += '<tr>';
    for (let j = 0; j < num + 1; j++) {
        html += `<td style="padding:2px; width:10vw; height:3.5vh;">
        <input id="${i}_${j}" type="number" 
            class="form-control p-1" 
            style="font-size:0.9rem; background: none; border: none;" 
            inputmode="numeric" pattern="[0-9]*" 
            onwheel="return false;" 
            onkeydown="if(event.key==='e'||event.key==='E'){event.preventDefault();}" />
        </td>`;
    }
    html += '</tr>';
    }

    html += '</tbody></table></div>';
    
    div.append([
        '<div class="row p-2">',
            '<div class="col">',
                `<button class="btn btn-danger btn-sm m-1" onclick="limparConteudo()">
                    <i class="fa-solid fa-eraser"></i> Apagar
                </button>`,
                `<button class="btn btn-success btn-sm m-1" id="btnRes" onclick="resolver(${num})">
                    <i class="fa-solid fa-square-root-variable"></i> Calcular
                </button>`,
            '</div>',
        '</div>',
        '<div class="row">',
            `${html}`,
        '</div>'
    ].join(''));
}

const criarTabelaResultado = (mtx, mtxEscalonada, res) => {
    // Cria uma tabela com os sistemas formatados e a solução (se houver).
    $("#btnRes").attr("disabled", true);

    const div = $("#content-table");
    let original = formatar(equacao(mtx, mtx.length));
    let escalonada = formatar(equacao(mtxEscalonada, mtxEscalonada.length));

    div.empty();
    div.append([
        `<div class="container fluid">`,
            `<div class="row m-2">`,
                `<div class="col text-start fw-semibold">Resultado:</div>`,
                `<div class="col fw-semibold">${res}</div>`,
            `</div>`,
            `<div class="row m-2">`,
                `<div class="col text-start fw-semibold">Sistema Original:</div>`,
            `</div>`,
            `<div class="row m-2">`,
                `<div class="col">${original}</div>`,
            `</div>`,
            `<div class="row m-2">`,
                `<div class="col text-start fw-semibold">Sistema Escalonado:</div>`,
            `</div>`,
            `<div class="row m-2">`,
                `<div class="col">${escalonada}</div>`,
            `</div>`,
        `</div>`
    ].join(''));

    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}