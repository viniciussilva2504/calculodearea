// Objeto para armazenar todos os ambientes e suas áreas
let ambientesData = {};

// Função para salvar dados no localStorage
function salvarDados() {
    localStorage.setItem('ambientesCalculoArea', JSON.stringify(ambientesData));
}

// Função para carregar dados do localStorage
function carregarDados() {
    const dadosSalvos = localStorage.getItem('ambientesCalculoArea');
    if (dadosSalvos) {
        ambientesData = JSON.parse(dadosSalvos);
        renderizarAmbientes();
    }
}

// Função para renderizar todos os ambientes salvos
function renderizarAmbientes() {
    const container = document.getElementById('ambientesContainer');
    container.innerHTML = ''; // Limpa o container

    for (const ambienteNome in ambientesData) {
        const ambienteDiv = criarAmbienteDiv(ambienteNome);
        container.appendChild(ambienteDiv);

        // Adiciona todas as áreas do ambiente
        ambientesData[ambienteNome].forEach(areaData => {
            const areaDiv = criarAreaDiv(ambienteNome, areaData);
            ambienteDiv.appendChild(areaDiv);
        });
    }
}

// Função para criar div do ambiente
function criarAmbienteDiv(ambienteNome) {
    const ambienteDiv = document.createElement('div');
    ambienteDiv.id = ambienteNome;
    ambienteDiv.className = 'ambiente';
    ambienteDiv.innerHTML = `<h3>Ambiente: ${ambienteNome}</h3>`;
    return ambienteDiv;
}

// Função para criar div da área
function criarAreaDiv(ambienteNome, areaData) {
    const areaDiv = document.createElement('div');
    areaDiv.className = 'area';

    const areaContent = document.createElement('span');
    areaContent.textContent = `${areaData.nome}: ${areaData.areaCalculada} m² (Altura: ${areaData.altura}m, Largura: ${areaData.largura}m) - (área com 15% de adição do material: ${areaData.areaComAdicao} m²)`;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'removeAreaBtn';
    removeBtn.textContent = 'Remover Área';

    // Evento para remover a área
    removeBtn.addEventListener('click', function() {
        removerArea(ambienteNome, areaData);
        areaDiv.remove();
    });

    areaDiv.appendChild(areaContent);
    areaDiv.appendChild(removeBtn);

    return areaDiv;
}

// Função para remover área dos dados
function removerArea(ambienteNome, areaData) {
    ambientesData[ambienteNome] = ambientesData[ambienteNome].filter(area => 
        !(area.nome === areaData.nome && 
          area.altura === areaData.altura && 
          area.largura === areaData.largura)
    );

    // Se o ambiente ficar sem áreas, remove o ambiente
    if (ambientesData[ambienteNome].length === 0) {
        delete ambientesData[ambienteNome];
        document.getElementById(ambienteNome)?.remove();
    }

    salvarDados();
}

document.getElementById('addArea').addEventListener('click', function() {
    // Obtendo valores do formulário
    const ambienteNome = document.getElementById('ambienteNome').value;
    const areaNome = document.getElementById('areaNome').value;
    const altura = document.getElementById('altura').value.replace(',', '.'); // Converte a vírgula em ponto
    const largura = document.getElementById('largura').value.replace(',', '.'); // Converte a vírgula em ponto

    // Validação do nome do ambiente: Apenas letras
    if (!/^[a-zA-Z\s]+$/.test(ambienteNome)) {
        alert('O nome do ambiente deve conter apenas letras.');
        return;
    }

    // Validação da altura e largura: Apenas números com até 3 dígitos e até 2 casas decimais
    if (!/^\d{1,3}(,\d{1,2})?$/.test(document.getElementById('altura').value) || 
        !/^\d{1,3}(,\d{1,2})?$/.test(document.getElementById('largura').value)) {
        alert('Altura e Largura devem ser números de até 3 dígitos e podem incluir até 2 casas decimais com vírgula.');
        return;
    }

    // Calculando a área
    const areaCalculada = (parseFloat(altura) * parseFloat(largura)).toFixed(2).replace('.', ',');
    const areaComAdicao = (parseFloat(altura) * parseFloat(largura) * 1.15).toFixed(2).replace('.', ',');

    // Inicializa o ambiente se não existir
    if (!ambientesData[ambienteNome]) {
        ambientesData[ambienteNome] = [];
    }

    // Verifica se o ambiente já tem 20 áreas
    if (ambientesData[ambienteNome].length >= 20) {
        alert('Um ambiente pode ter no máximo 20 áreas cadastradas.');
        return;
    }

    // Cria objeto com dados da área
    const areaData = {
        nome: areaNome,
        altura: altura.replace('.', ','),
        largura: largura.replace('.', ','),
        areaCalculada: areaCalculada,
        areaComAdicao: areaComAdicao
    };

    // Adiciona aos dados
    ambientesData[ambienteNome].push(areaData);

    // Salva no localStorage
    salvarDados();

    // Atualiza a interface
    let ambienteDiv = document.getElementById(ambienteNome);
    if (!ambienteDiv) {
        ambienteDiv = criarAmbienteDiv(ambienteNome);
        document.getElementById('ambientesContainer').appendChild(ambienteDiv);
    }

    const areaDiv = criarAreaDiv(ambienteNome, areaData);
    ambienteDiv.appendChild(areaDiv);

    // Limpa os campos do formulário
    document.getElementById('areaForm').reset();
});

document.getElementById('removeAmbiente').addEventListener('click', function() {
    const ambienteNome = document.getElementById('ambienteNome').value;
    const ambienteDiv = document.getElementById(ambienteNome);

    if (ambienteDiv) {
        // Remove dos dados
        delete ambientesData[ambienteNome];
        salvarDados();
        
        // Remove da interface
        ambienteDiv.remove();
    } else {
        alert('Ambiente não encontrado.');
    }
});

// Carrega os dados salvos quando a página é carregada
window.addEventListener('DOMContentLoaded', carregarDados);
