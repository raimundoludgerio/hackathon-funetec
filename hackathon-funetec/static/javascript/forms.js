const formularios = {
    dados_projeto: `
         <h2 class="text-center text-2xl">Dados do Projeto</h2>
            <form action="" class="space-y-4 bg-white rounded-xl" onsubmit="return submitProject(event)">
                <div>
                    <label class="text-sm block mb-1">Nome do projeto *</label>
                    <input id="p_nome" class="w-full border rounded px-3 py-2" required/>
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
        <form class="space-y-4 bg-white rounded-xl" onsubmit="return submitProject(event)">
           
        </form>
    `
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
    } else {
        // Senão, mostra o formulário correspondente
        container.innerHTML = formularios[formId];
        formularioVisivel = formId;
    }

}