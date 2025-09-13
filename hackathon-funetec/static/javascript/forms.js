const formularios = {
    dados_projeto: `
         <h2 class="text-center text-2xl">Dados do Projeto</h2>
            <form action="#" method="post" class="space-y-4 bg-white rounded-xl" id="dadosProjeto">
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
            <form action="#" method="post" class="space-y-4 bg-white rounded-xl" id="dadosSolicitacao">
            <div>
                <label class="text-sm block mb-1">Descrição *</label>
                <input name="descricao" id="descricao" class="w-full border rounded px-3 py-2" required/>
            </div>
        
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="text-sm block mb-1">Data da Solicitação</label>
                    <input id="dataSolicitacao" type="date" class="w-full border rounded px-3 py-2"/>
                </div>
        
                <div>
                    <label class="text-sm block mb-1">Data Limite</label>
                    <input id="dataLimite" type="date" class="w-full border rounded px-3 py-2"/>
                </div>
            </div>
        
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="text-sm block mb-1">Valor (R$)</label>
                    <input id="valor" class="w-full border rounded px-3 py-2"
                           oninput="formatCurrencyInput(this)"/>
                </div>
        
                <div>
                    <label class="text-sm block mb-1">Situação</label>
                    <select id="situacao" class="w-full border rounded px-3 py-2">
                        <option value="1">Aguardando Início</option>
                        <option value="2">Em andamento</option>
                        <option value="6">Concluído</option>
                    </select>
                </div>
            </div>
        
            <p id="solicError" class="text-sm text-red-600"></p>
        
            <div class="flex gap-3">
                <button type="submit" class="px-4 py-2 bg-emerald-500 text-white rounded">Salvar</button>
                <a href="{{ url_for('main.create') }}" class="px-4 py-2 border rounded">Cancelar</a>
            </div>
            </form>

       
    `,
    order: `
          <h2 class="text-center text-2xl">Ordem</h2>
          <form action="#" method="post" class="space-y-4 bg-white rounded-xl" id="dadosProjeto">
              <div>
                <label class="text-sm block mb-1">Descrição *</label>
                <input name="descricao" id="p_descricao" class="w-full border rounded px-3 py-2" required/>
              </div>
            
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-sm block mb-1">Data Solicitação</label>
                  <input id="p_dataSolicitacao" type="date" class="w-full border rounded px-3 py-2"/>
                </div>
                <div>
                  <label class="text-sm block mb-1">Data Limite</label>
                  <input id="p_dataLimite" type="date" class="w-full border rounded px-3 py-2"/>
                </div>
              </div>
            
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="text-sm block mb-1">Valor (R$)</label>
                  <input id="p_valor" class="w-full border rounded px-3 py-2" oninput="formatCurrencyInput(this)"/>
                </div>
                <div>
                  <label class="text-sm block mb-1">Data Recebido</label>
                  <input id="p_dataRecebido" type="date" class="w-full border rounded px-3 py-2"/>
                </div>
              </div>
            
              <div>
                <label class="text-sm block mb-1">Situação</label>
                <select id="p_situacao" class="w-full border rounded px-3 py-2">
                  <option value="1">Aguardando</option>
                </select>
              </div>
            
              <p id="projError" class="text-sm text-red-600"></p>
            
              <div class="flex gap-3">
                <button type="submit" class="px-4 py-2 bg-emerald-500 text-white rounded">Salvar</button>
                <a href="{{ url_for('main.create') }}" class="px-4 py-2 border rounded">Cancelar</a>
              </div>
        </form>
    `,
    contract: `
    <form action="#" method="post" class="space-y-4 bg-white rounded-xl" id="dadosProjeto">
          <div>
            <label class="text-sm block mb-1">Descrição *</label>
            <input name="descricao" id="p_descricao" class="w-full border rounded px-3 py-2" required/>
          </div>
        
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-sm block mb-1">CPF/CNPJ</label>
              <input id="p_cpfcnpj" class="w-full border rounded px-3 py-2"/>
            </div>
            <div>
              <label class="text-sm block mb-1">Contratado</label>
              <input id="p_contratado" class="w-full border rounded px-3 py-2"/>
            </div>
          </div>
        
          <div>
            <label class="text-sm block mb-1">Tipo Pessoa</label>
            <select id="p_tipoPessoa" class="w-full border rounded px-3 py-2">
              <option value="F">Física</option>
              <option value="J">Jurídica</option>
            </select>
          </div>
        
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-sm block mb-1">Data Início</label>
              <input id="p_dataInicio" type="date" class="w-full border rounded px-3 py-2"/>
            </div>
            <div>
              <label class="text-sm block mb-1">Data Fim</label>
              <input id="p_dataFim" type="date" class="w-full border rounded px-3 py-2"/>
            </div>
          </div>
        
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-sm block mb-1">Valor (R$)</label>
              <input id="p_valor" class="w-full border rounded px-3 py-2" oninput="formatCurrencyInput(this)"/>
            </div>
            <div>
              <label class="text-sm block mb-1">Parcelas</label>
              <input id="p_parcelas" type="number" class="w-full border rounded px-3 py-2" min="1"/>
            </div>
          </div>
        
          <div>
            <label class="text-sm block mb-1">Data Parcela Inicial</label>
            <input id="p_dataParcelaInicial" type="date" class="w-full border rounded px-3 py-2"/>
          </div>
        
          <div>
            <label class="text-sm block mb-1">Situação</label>
            <select id="p_situacao" class="w-full border rounded px-3 py-2">
              <option value="1">Aguardando Início</option>
              <option value="2">Em Andamento</option>
              <option value="3">Finalizado</option>
            </select>
          </div>
        
          <p id="projError" class="text-sm text-red-600"></p>
        
          <div class="flex gap-3">
            <button type="submit" class="px-4 py-2 bg-emerald-500 text-white rounded">Salvar</button>
            <a href="{{ url_for('main.create') }}" class="px-4 py-2 border rounded">Cancelar</a>
          </div>
        </form>
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
        return;
    }

    // Mostra o formulário correspondente
    container.innerHTML = formularios[formId];
    formularioVisivel = formId;

    if (formId === 'dados_projeto') {
        const form = document.getElementById('dadosProjeto');
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validação simples
            const nome = document.getElementById('p_nome').value.trim();
            const valor = parseFloat((document.getElementById('p_valor').value || "0").replace(/\D/g, "")) / 100;
            const dataInicio = document.getElementById('p_dataInicio').value;
            const dataEnc = document.getElementById('p_dataEnc').value;

            if (!nome) {
                alert("⚠️ Nome do projeto é obrigatório.");
                return;
            }
            if (valor <= 0) {
                alert("⚠️ Valor deve ser maior que zero.");
                return;
            }
            if (dataInicio && dataEnc && new Date(dataEnc) < new Date(dataInicio)) {
                alert("⚠️ Data de encerramento não pode ser antes da data de início.");
                return;
            }

            alert("✅ Projeto salvo (simulação).");

            // Habilita card da Requisição
            const cardRequisition = document.getElementById('cardRequisition');
            const linkDesabilidato = document.querySelector('.desabilitado');
            cardRequisition.classList.remove("bg-gray-300", "text-gray-500");
            cardRequisition.classList.add("bg-green-600", "text-white");
            if (linkDesabilidato) linkDesabilidato.classList.remove('desabilitado');

            document.getElementById("titleCardRequisition").classList.remove("text-gray-700");
            document.getElementById("tipoRequisition").classList.remove("text-gray-500");

            // Abre o próximo formulário automaticamente
            mostrarFormulario('requisition');
        });
    } else if (formId === 'requisition') {
        const form = document.getElementById('dadosRequisition');
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validação simples
            const descricao = document.getElementById('descricao').value.trim();
            const valor = parseFloat((document.getElementById('valor').value || "0").replace(/\D/g, "")) / 100;
            const dataSolicitacao = document.getElementById('dataSolicitacao').value;
            const dataLimite = document.getElementById('dataLimite').value;

            if (!descricao) {
                alert("⚠️ Descrição é obrigatória.");
                return;
            }
            if (valor <= 0) {
                alert("⚠️ Valor deve ser maior que zero.");
                return;
            }
            if (dataSolicitacao && dataLimite && new Date(dataLimite) < new Date(dataSolicitacao)) {
                alert("⚠️ Data limite não pode ser antes da solicitação.");
                return;
            }

            alert("✅ Requisição salva (simulação).");

            // Habilita card do Contrato (exemplo)
            const cardContract = document.getElementById('cardContract');
            cardContract.classList.remove("bg-gray-300", "text-gray-500");
            cardContract.classList.add("bg-green-600", "text-white");

            document.getElementById("titleCardContract").classList.remove("text-gray-700");
        });
    }
}
