document.getElementById('addArea').addEventListener('click', function() {
    // Obtendo valores do formulário
    const ambienteNome = document.getElementById('ambienteNome').value;
    const areaNome = document.getElementById('areaNome').value;
    const altura = document.getElementById('altura').value;
    const largura = document.getElementById('largura').value;

    // Validação do nome do ambiente: Apenas letras
    if (!/^[a-zA-Z\s]+$/.test(ambienteNome)) {
        alert('O nome do ambiente deve conter apenas letras.');
        return;
    }

    // Validação da altura e largura: Apenas números com até 3 dígitos
    if (!/^\d{1,3}(?:\.\d{1,2})?$/.test(altura) || !/^\d{1,3}(?:\.\d{1,2})?$/.test(largura)) {
        alert('Altura e Largura devem ser números de até 3 dígitos e podem incluir até 2 casas decimais.');
        return;
    }

    // Calculando a área
    const areaCalculada = (parseFloat(altura) * parseFloat(largura)).toFixed(2);

    // Adicionando o ambiente e a área calculada
    let ambienteDiv = document.getElementById(ambienteNome);

    if (!ambienteDiv) {
        // Criando um novo ambiente
        ambienteDiv = document.createElement('div');
        ambienteDiv.id = ambienteNome;
        ambienteDiv.className = 'ambiente';
        ambienteDiv.innerHTML = `<h3>Ambiente: ${ambienteNome}</h3>`;
        document.getElementById('ambientesContainer').appendChild(ambienteDiv);
    }

    // Verifica se o ambiente já tem 20 áreas
    const areas = ambienteDiv.getElementsByClassName('area');
    if (areas.length >= 20) {
        alert('Um ambiente pode ter no máximo 20 áreas cadastradas.');
        return;
    }

    // Criando a nova área calculada com botão de remoção
    const areaDiv = document.createElement('div');
    areaDiv.className = 'area';

    const areaContent = document.createElement('span');
    areaContent.textContent = `${areaNome}: ${areaCalculada} m² (Altura: ${altura}m, Largura: ${largura}m)`;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'removeAreaBtn';
    removeBtn.textContent = 'Remover Área';

    // Evento para remover a área quando o botão for clicado
    removeBtn.addEventListener('click', function() {
        areaDiv.remove(); // Remove a área específica
    });

    // Adiciona o conteúdo da área e o botão de remoção ao div da área
    areaDiv.appendChild(areaContent);
    areaDiv.appendChild(removeBtn);

    // Adiciona a nova área ao ambiente
    ambienteDiv.appendChild(areaDiv);

    // Limpa os campos do formulário
    document.getElementById('areaForm').reset();
});

document.getElementById('removeAmbiente').addEventListener('click', function() {
    const ambienteNome = document.getElementById('ambienteNome').value;
    const ambienteDiv = document.getElementById(ambienteNome);

    if (ambienteDiv) {
        ambienteDiv.remove(); // Remove o ambiente
    } else {
        alert('Ambiente não encontrado.');
    }
});
