window.onload = function() {
    document.getElementById('buscarTickerBolsa').addEventListener('click', BuscaBolsa);
    document.getElementById('buscarSIM').addEventListener('click', BuscaAcoesAnalisadasSIM);
    document.getElementById('buscarNAO').addEventListener('click', BuscaAcoesAnalisadasNAO);
    document.getElementById('buscarTickerBanco').addEventListener('click', BuscaBanco);
    document.getElementById('deletarTickerBanco').addEventListener('click', DeletaBanco);
    document.getElementById("editarSIM").addEventListener("click", function() {EditaBanco("SIM");});
    document.getElementById("editarNAO").addEventListener("click", function() {EditaBanco("NAO");});
};

/* <-------------------------------------------------------------------------------------------------> */
/* <------------------------------------    Left Up Card    -----------------------------------------> */
/* <-------------------------------------------------------------------------------------------------> */
function BuscaBolsa() {
    var botao = document.getElementById('buscarTickerBolsa');
    var ticker = document.getElementById("tickerAnalisar").value.toUpperCase();

    botao.disabled = true;
    if (ticker.trim().length != 5) {
        alert("Digite um ticker válido");
        botao.disabled = false;
        return;
    } else {
        const url = `http://127.0.0.1:5000/analisar/${ticker}`;
        fetch(url, {method: 'POST'})
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Erro no servidor");
                }
                return response.json();
            })
            .then(function(output) {
                let placeholder = document.querySelector("#data-output");
                let out = `
                        <tr>
                            <td>${output.acao}</td>
                            <td>${output.analise}</td>
                            <td>${output.data_analise}</td>
                        </tr>
                    `;

                placeholder.innerHTML = out;
                const rows = document.querySelectorAll('td');
                rows.forEach((row) => {
                if (row.innerHTML === 'NAO') {
                    const parent = row.parentNode;
                    parent.style.backgroundColor = 'LightCoral';
                }
                });
            })
            .catch(function(err) {
                console.error(err.message);
                alert("Não consegui achar a Ação. O Código está Correto? O Flask está rodando?");
            });
        botao.disabled = false;
    }
    
};
/* <-------------------------------------------------------------------------------------------------> */
/* <-------------------------------------------------------------------------------------------------> */
/* <-------------------------------------------------------------------------------------------------> */


/* <-------------------------------------------------------------------------------------------------> */
/* <-----------------------------------    Right Up Card    -----------------------------------------> */
/* <-------------------------------------------------------------------------------------------------> */
async function BuscaAcoesAnalisadasSIM() {
    var botaoSIM = document.getElementById('buscarSIM');
    botaoSIM.disabled = true;

    try {
        await BuscaBancoAcoes("SIM");
        } finally {
        botaoSIM.disabled = false;

    }
};

async function BuscaAcoesAnalisadasNAO() {
    var botaoNAO = document.getElementById('buscarNAO');
    botaoNAO.disabled = true;

    try {
        await BuscaBancoAcoes("NAO");
        } finally {
        botaoNAO.disabled = false;

    }
};


function BuscaBancoAcoes(str) {
    const url = `http://127.0.0.1:5000/acoes_viaveis/${str}`;

    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Erro no servidor");
            }
            return response.json();
        })
        .then(function(outputs) {
            let placeholder = document.querySelector("#data-output");
            let out = "";

            for (let output of outputs) {
                out += `
                    <tr>
                        <td>${output.acao}</td>
                        <td>${output.analise}</td>
                        <td>${output.data_analise}</td>
                    </tr>
                `;
            }

            placeholder.innerHTML = out;
            const rows = document.querySelectorAll('td');
            rows.forEach((row) => {
            if (row.innerHTML === 'NAO') {
                const parent = row.parentNode;
                parent.style.backgroundColor = 'LightCoral';
            }
            });

        })
        .catch(function(err) {
            console.error(err.message);
            alert("Não consegui conectar na API. O Flask está rodando?");
        });
}
/* <-------------------------------------------------------------------------------------------------> */
/* <-------------------------------------------------------------------------------------------------> */
/* <-------------------------------------------------------------------------------------------------> */


/* <-------------------------------------------------------------------------------------------------> */
/* <----------------------------------    Left Down Card    -----------------------------------------> */
/* <-------------------------------------------------------------------------------------------------> */
function BuscaBanco() {
    var botao = document.getElementById('buscarTickerBanco');
    var ticker = document.getElementById("tickerAnalisada").value.toUpperCase();

    botao.disabled = true;
    if (ticker.trim().length != 5) {
        alert("Digite um ticker válido");
        botao.disabled = false;
        return;
    } else {
        const url = `http://127.0.0.1:5000/acoes_especifica/${ticker}`;
        console.log(url)
        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Erro no servidor");
                }
                return response.json();
            })
            .then(function(outputs) {
                let placeholder = document.querySelector("#data-output");
                let out = "";
                if (outputs.length < 1) {
                    alert("Essa Ação ainda não foi Analisada ou ela não Existe!")
                } else {
                    for (let output of outputs) {
                        out += `
                            <tr>
                                <td>${output.acao}</td>
                                <td>${output.analise}</td>
                                <td>${output.data_analise}</td>
                            </tr>
                        `;
                    }

                    placeholder.innerHTML = out;
                    const rows = document.querySelectorAll('td');
                    rows.forEach((row) => {
                    if (row.innerHTML === 'NAO') {
                        const parent = row.parentNode;
                        parent.style.backgroundColor = 'LightCoral';
                    }
                    });
                }
            })
            .catch(function(err) {
                console.error(err.message);
                alert("Não consegui achar a Ação. O Código está Correto? O Flask está rodando?");
            });
        botao.disabled = false;
    }
    
}
/* <-------------------------------------------------------------------------------------------------> */
/* <-------------------------------------------------------------------------------------------------> */
/* <-------------------------------------------------------------------------------------------------> */


/* <-------------------------------------------------------------------------------------------------> */
/* <----------------------------------    Right Down Card    ----------------------------------------> */
/* <-------------------------------------------------------------------------------------------------> */
function DeletaBanco() {
    var botao = document.getElementById('deletarTickerBanco');
    var ticker = document.getElementById("tickerDeletar").value.toUpperCase();

    botao.disabled = true;
    if (ticker.trim().length != 5) {
        alert("Digite um ticker válido");
        botao.disabled = false;
        return;
    } else {
        const url = `http://127.0.0.1:5000/delete/${ticker}`;
        fetch(url, {method: 'DELETE'})
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Erro no servidor");
                }
                return response.json();
            })
            .then(function(outputs) {
                if (outputs.length < 1) {
                    alert("Essa Ação ainda não foi Analisada ou ela não Existe!")
                } else {
                    alert("Ação Deletada!")                  
                }
            })
            .catch(function(err) {
                console.error(err.message);
                alert("Não consegui achar a Ação. O Código está Correto? O Flask está rodando?");
            });
        botao.disabled = false;
    }
    
};
/* <-------------------------------------------------------------------------------------------------> */
/* <-------------------------------------------------------------------------------------------------> */
/* <-------------------------------------------------------------------------------------------------> */


/* <-------------------------------------------------------------------------------------------------> */
/* <---------------------------------------     Down Card    ----------------------------------------> */
/* <-------------------------------------------------------------------------------------------------> */
function EditaBanco(novaAnalise) {
    var ticker = document
        .getElementById("tickerEditar")
        .value
        .trim()
        .toUpperCase();

    var botao;

    if (novaAnalise === "SIM") {
        botao = document.getElementById("editarSIM");
    } else {
        botao = document.getElementById("editarNAO");
    }

    if (ticker.length != 5) {
        alert("Digite um ticker válido");
        return;
    }

    botao.disabled = true;

    const url =
        `http://127.0.0.1:5000/editar_acoes_especifica/${ticker}`;

    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            analise: novaAnalise
        })
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Erro ao editar a ação");
            }

            return response.json();
        })
        .then(function(output) {
            let placeholder =
                document.querySelector("#data-output");

            let out = `
                <tr>
                    <td>${output.acao}</td>
                    <td>${output.analise}</td>
                    <td>${output.data_analise}</td>
                </tr>
            `;

            placeholder.innerHTML = out;

            if (output.analise === "NAO") {
                placeholder
                    .querySelector("tr")
                    .style.backgroundColor = "LightCoral";
            }

            alert("Análise alterada com sucesso!");
        })
        .catch(function(error) {
            console.error(error.message);

            alert(
                "Não consegui editar a Ação. O ticker está correto? O Flask está rodando?"
            );
        })
        .finally(function() {
            botao.disabled = false;
        });
}
