/* app.js
   Lê dados fictícios e renderiza pipeline, tabelas e formulário de contrato.
   Salve como static/js/app.js e inclua em cada HTML (ou cole direto nos <script> dos HTMLs).
*/

const FAKE = {
    project: {
        codProjeto: 123,
        nome: "Construção X",
        dataInicio: "01/03/2025",
        dataEncerramento: "31/12/2025",
        valor: 150000.00,
        situacao: "2"
    },
    pipeline: [
        {type: 'projeto', title: 'Projeto', subtitle: 'Construção X', color: 'green', id: 'p-123', status: '2'},
        {type: 'requisicao', title: 'Requisição', subtitle: 'Tipo A', color: 'muted', id: 'r-34', status: '1'},
        {type: 'ordem', title: 'Ordem', subtitle: 'Ordem 01', color: 'yellow', id: 'o-987', status: '2'},
        {type: 'contrato', title: 'Contrato', subtitle: '0042/2025 - Fulano', color: 'muted', id: 'c-0042', status: '1'}
    ],
    orders: [
        {cod: 987, tipo: 'Compra', data: '15/04/2025', valor: 12000, situacao: '2'},
        {cod: 988, tipo: 'Serviço', data: '20/05/2025', valor: 8000, situacao: '1'}
    ],
    projects: [
        {cod_projeto: 123, nome: "Construção X", valor: 150000.00, situacao: "2"},
        {cod_projeto: 124, nome: "Reforma Y", valor: 80000.00, situacao: "1"},
        {cod_projeto: 125, nome: "Ampliação Z", valor: 40000.00, situacao: "6"}
    ]
};

/* Utilities */
const fmtBRL = v => new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(v || 0);
const statusLabel = s => ({
    '1': 'Aguardando',
    '2': 'Em andamento',
    '3': 'Paralisado',
    '4': 'Suspenso',
    '5': 'Cancelado',
    '6': 'Concluído'
})[s] || '—';

/* Renderers */
function renderPipeline(containerId, pipelineData) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    pipelineData.forEach(card => {
        const el = document.createElement('div');
        el.className = 'min-w-[220px] p-5 rounded-xl shadow-sm bg-white cursor-pointer transform transition hover:-translate-y-1 relative';
        el.dataset.id = card.id;
        el.dataset.type = card.type;

        // icon
        const icon = document.createElement('div');
        icon.className = 'w-11 h-11 rounded-lg flex items-center justify-center text-white mb-2 ' +
            (card.color === 'green' ? 'bg-emerald-500' : card.color === 'yellow' ? 'bg-amber-400' : 'bg-slate-200 text-slate-800');
        icon.textContent = card.type === 'projeto' ? '📁' : card.type === 'requisicao' ? '📄' : card.type === 'ordem' ? '🧾' : '📑';
        el.appendChild(icon);

        const h = document.createElement('h3');
        h.className = 'text-sm font-semibold';
        h.textContent = card.title;
        el.appendChild(h);

        const p = document.createElement('p');
        p.className = 'text-xs text-slate-500 mt-1';
        p.textContent = card.subtitle;
        el.appendChild(p);

        const dot = document.createElement('div');
        dot.className = 'w-3 h-3 rounded-full absolute bottom-3 left-3 ' +
            (card.color === 'green' ? 'bg-emerald-500' : card.color === 'yellow' ? 'bg-amber-400' : 'bg-slate-200');
        el.appendChild(dot);

        el.addEventListener('click', () => onCardClick(card));
        container.appendChild(el);
    });
}

function renderOrders(containerId, orders) {
    const tbody = document.getElementById(containerId);
    if (!tbody) return;
    tbody.innerHTML = '';
    orders.forEach(o => {
        const tr = document.createElement('tr');
        tr.className = 'border-b';
        tr.innerHTML = `<td class="py-3 px-2">${o.cod}</td>
      <td class="py-3 px-2">${o.tipo}</td>
      <td class="py-3 px-2">${o.data}</td>
      <td class="py-3 px-2">${fmtBRL(o.valor)}</td>
      <td class="py-3 px-2">${statusLabel(o.situacao)}</td>`;
        tbody.appendChild(tr);
    });
}

function renderProjectsTable(containerId, projects) {
    const tbody = document.getElementById(containerId);
    if (!tbody) return;
    tbody.innerHTML = '';
    projects.forEach(p => {
        const tr = document.createElement('tr');
        tr.className = 'border-b';
        tr.innerHTML = `<td class="py-3 px-2">${p.cod_projeto}</td>
      <td class="py-3 px-2">${p.nome}</td>
      <td class="py-3 px-2">${fmtBRL(p.valor)}</td>
      <td class="py-3 px-2">${statusLabel(p.situacao)}</td>
      <td class="py-3 px-2"><a class="text-sky-600 hover:underline" href="project_detail.html?cod=${p.cod_projeto}">Abrir</a></td>`;
        tbody.appendChild(tr);
    });
}

/* Interactions */
function onCardClick(card) {
    // highlight
    document.querySelectorAll('.card-selected')?.forEach(n => n.classList.remove('card-selected'));
    // find clicked element
    const elems = Array.from(document.querySelectorAll('[data-id]')).filter(e => e.dataset.id === card.id);
    if (elems[0]) elems[0].classList.add('card-selected');

    // if contrato -> open form
    if (card.type === 'contrato') {
        openContractForm({
            numContrato: card.subtitle.split(' ')[0] || '0001/2025',
            contratado: (card.subtitle.split('-')[1] || '').trim() || 'Fulano Silva',
            cpfcnpj: '',
            dataInicio: '',
            valor: ''
        });
    } else {
        closeContractForm();
        // show summary in drawer
        const drawerTitle = document.getElementById('drawerTitle');
        const drawerNote = document.getElementById('drawerNote');
        if (drawerTitle) drawerTitle.textContent = `${card.title} — Detalhe`;
        if (drawerNote) drawerNote.textContent = card.subtitle;
    }
}

/* Contract form functions */
function openContractForm(payload = {}) {
    const form = document.getElementById('contractForm');
    if (!form) return;
    form.classList.remove('hidden');
    document.getElementById('numContrato').value = payload.numContrato || '';
    document.getElementById('contratado').value = payload.contratado || '';
    document.getElementById('cpfcnpj').value = payload.cpfcnpj || '';
    document.getElementById('dataInicio').value = payload.dataInicio || '';
    document.getElementById('valor').value = payload.valor || '';
    document.getElementById('tipoPessoa').value = payload.tipoPessoa || '1';
    document.getElementById('formError').textContent = '';
}

function closeContractForm() {
    const form = document.getElementById('contractForm');
    if (form) form.classList.add('hidden');
    document.querySelectorAll('[data-id]').forEach(e => e.classList.remove('card-selected'));
}

function maskNumbers(el) {
    el.value = el.value.replace(/\D/g, '');
}

function formatCurrencyInput(el) {
    let v = el.value.replace(/\D/g, '');
    if (!v) {
        el.value = '';
        return;
    }
    while (v.length < 3) v = '0' + v;
    const cents = v.slice(-2);
    const intPart = v.slice(0, -2);
    el.value = new Intl.NumberFormat('pt-BR').format(parseInt(intPart)) + ',' + cents;
}

function saveContract() {
    const numContrato = document.getElementById('numContrato').value.trim();
    const contratado = document.getElementById('contratado').value.trim();
    const cpfcnpj = document.getElementById('cpfcnpj').value.replace(/\D/g, '');
    const dataInicio = document.getElementById('dataInicio').value;
    const valor = document.getElementById('valor').value;
    const tipoPessoa = document.getElementById('tipoPessoa').value;
    const err = document.getElementById('formError');

    // validations
    if (!/^[0-9]{4}\/[0-9]{4}$/.test(numContrato)) {
        err.textContent = 'Número do contrato deve ser NNNN/AAAA';
        return;
    }
    if (!contratado) {
        err.textContent = 'Nome do contratado é obrigatório';
        return;
    }
    if (tipoPessoa === '1' && cpfcnpj.length !== 11 && cpfcnpj.length !== 14) {
        err.textContent = 'CPF/CNPJ: 11 ou 14 dígitos';
        return;
    }
    const numeric = parseFloat((valor || '').replace(/\./g, '').replace(',', '.')) || 0;
    if (numeric <= 0) {
        err.textContent = 'Valor deve ser maior que zero';
        return;
    }
    err.textContent = '';

    // fake save (simulação)
    alert('Contrato salvo (simulação):\n' + JSON.stringify({
        numContrato,
        contratado,
        cpfcnpj,
        dataInicio,
        valor: numeric,
        tipoPessoa
    }, null, 2));
    closeContractForm();
}

/* Init - used by each page */
function initDashboard() {
    renderPipeline('pipeline', FAKE.pipeline);
    renderOrders('ordersBody', FAKE.orders);
    renderProjectsTable('projectsTableBody', FAKE.projects);
    // set project title in page(s)
    const titleEl = document.getElementById('projectTitle');
    if (titleEl) titleEl.textContent = FAKE.project.nome;
    // wire global actions
    window.maskOnlyNumbers = maskNumbers;
    window.formatCurrencyInput = formatCurrencyInput;
    window.saveContract = saveContract;
    window.closeContract = closeContractForm;
    window.openContractForm = openContractForm;
    window.filterBy = code => alert('Filtro (simulado): ' + code);
}

/* If file loaded, auto init */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initDashboard === 'function') initDashboard();
});
