function submitProject(e) {
    e.preventDefault();
    const nome = document.getElementById('p_nome').value.trim();
    const dataInicio = document.getElementById('p_dataInicio').value;
    const dataEnc = document.getElementById('p_dataEnc').value;
    const valorStr = document.getElementById('p_valor').value;
    const situacao = document.getElementById('p_situacao').value;
    const err = document.getElementById('projError');

    if (!nome) {
        err.textContent = 'Nome é obrigatório.';
        return false;
    }
    if (dataInicio && dataEnc && new Date(dataEnc) < new Date(dataInicio)) {
        err.textContent = 'Data de encerramento não pode ser antes da data de início.';
        return false;
    }

    // parse value
    const valor = parseFloat((valorStr || '').replace(/\./g, '').replace(',', '.')) || 0;
    if (valor <= 0) {
        err.textContent = 'Valor deve ser maior que zero.';
        return false;
    }

    err.textContent = '';

    // Simulação: você poderia enviar para o backend aqui via fetch.
    alert('Projeto criado (simulação):\n' + JSON.stringify({nome, dataInicio, dataEnc, valor, situacao}, null, 2));

    // redireciona para lista de projetos (simples)
    window.location.href = '/projects/';
    return false;
}