const gerarAlerta = (texto, tipo) => {
    const localAlertas = document.getElementById("localAlertas");
    const divAlertas = document.createElement("div");

    divAlertas.innerHTML = [
        `<div class="alert alert-${tipo} alert-dismissible" role="alert">`,
        `   <div>${texto}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    localAlertas.append(divAlertas);

    // Apaga o alerta depois de dois segundos e meio.
    setTimeout(() => {
        divAlertas.innerHTML = "";
    }, 2500);
}