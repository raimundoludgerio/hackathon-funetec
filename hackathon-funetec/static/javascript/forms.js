const formularios = {
    dados_projeto: `
         <h2 class="text-center text-2xl">Dados do Projeto</h2>
            <form action="/projects/new" method="post" class="space-y-4 bg-white rounded-xl" id="dadosProjeto">
                <div>
                    <label class="text-sm block mb-1">Nome do projeto *</label>
                    <input name="nome" id="p_nome" class="w-full border rounded px-3 py-2" required/>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="text-sm block mb-1">Data Início</label>
                        <input id="p_dataInicio" type="date" class="w-full border rounded px-3 py-2"/>
                    </div>

                    <div>
                        <label class="text-sm block mb-1">Data Encerramento</label>
                        <input id="p_dataEnc" type="date" class="w-full border rounded px-3 py-2"/>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="text-sm block mb-1">Valor (R$)</label>
                        <input id="p_valor" class="w-full border rounded px-3 py-2"
                               oninput="formatCurrencyInput(this)"/>
                    </div>

                    <div>
                        <label class="text-sm block mb-1">Situação</label>
                        <select id="p_situacao" class="w-full border rounded px-3 py-2">
                            <option value="1">Aguardando Início</option>
                        </select>
                    </div>
                </div>

                <p id="projError" class="text-sm text-red-600"></p>

                <div class="flex gap-3">
                    <button type="submit" class="px-4 py-2 bg-emerald-500 text-white rounded">Salvar</button>
                    <a href="{{ url_for('main.create') }}" class="px-4 py-2 border rounded">Cancelar</a>
                </div>
            </form>
    `,
    requisition: `
       
            <h2 class="text-center text-2xl">Requisição</h2>
       
    `,
    order: `
          <h2 class="text-center text-2xl">Ordem</h2>
    `,
    contract: `
          <h2 class="text-center text-2xl">Contrato</h2>
    `,
}
let formularioVisivel = null;

function mostrarFormulario(formId) {
    const container = document.getElementById('formContainer');
    const containerForm = document.getElementById('containerForm');
    containerForm.classList.add('shadow-xl', 'bg-white');
    if (formularioVisivel === formId) {
        // Se o formulário clicado já está visível, esconda-o
        container.innerHTML = '';
        containerForm.classList.remove('shadow-xl', 'bg-white');
        formularioVisivel = null;
        return
    }
    // Senão, mostra o formulário correspondente
    container.innerHTML = formularios[formId];
    formularioVisivel = formId;

    if (formId == 'dados_projeto') {
        const form = document.getElementById('dadosProjeto');
        form.addEventListener('submit', async function (e) {
            e.preventDefault(); // Impede o envio tradicional
            const formData = new FormData(form);

            try {
                const response = await fetch('/projects/new', {
                    method: 'POST',
                    body: formData
                });
                console.log("RESPONSE")
                console.log(response.body)
                if (response.ok) {
                    // Sucesso! Agora habilita o Botão 2 e mostra o Formulário B
                    const cardRequisition = document.getElementById('cardRequisition');
                    const linkDesabilidato = document.querySelector('.desabilitado')
                    cardRequisition.classList.remove("bg-gray-300");
                    cardRequisition.classList.remove("text-gray-500");
                    cardRequisition.classList.add("bg-green-600");
                    cardRequisition.classList.add("text-white");
                    linkDesabilidato.classList.remove('desabilitado')

                    document.getElementById("titleCardRequisition").classList.remove("text-gray-700")
                    document.getElementById("tipoRequisition").classList.remove("text-gray-500")
                    mostrarFormulario('requisition');
                } else {
                    alert('Erro ao enviar formulário A.');
                }
            } catch (error) {
                console.error('Erro ao enviar:', error);
                alert('Erro de rede ao enviar formulário A.');
            }
        });
    }
}