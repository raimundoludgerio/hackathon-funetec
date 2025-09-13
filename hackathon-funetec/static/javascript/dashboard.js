// dashboard renderer (reads window.__INIT_DATA)
(function () {
    const data = window.__INIT_DATA || {
        project: {nome: "—"},
        pipeline: [],
        orders: []
    };

    // util
    function currencyBRL(v) {
        return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(v)
    }

    function maskOnlyNumbers(el) {
        el.value = el.value.replace(/\D/g, '')
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

    // renderer pipeline
    function renderPipeline(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        (data.pipeline || []).forEach(card => {
            const div = document.createElement('div');
            div.className = 'card';
            div.dataset.id = card.id;
            div.dataset.type = card.type;

            const icon = document.createElement('div');
            icon.className = 'icon ' + (card.color === 'green' ? 'bg-green' : card.color === 'yellow' ? 'bg-yellow' : 'bg-gray');
            icon.textContent = card.type === 'projeto' ? '📁' : card.type === 'requisicao' ? '📄' : card.type === 'ordem' ? '🧾' : '📑';
            div.appendChild(icon);

            const h = document.createElement('h3');
            h.textContent = card.title;
            div.appendChild(h);
            const p = document.createElement('p');
            p.textContent = card.subtitle;
            div.appendChild(p);

            const dot = document.createElement('div');
            dot.className = 'dot ' + (card.color === 'green' ? 'green' : card.color === 'yellow' ? 'yellow' : 'muted');
            div.appendChild(dot);

            div.addEventListener('click', () => onCardClick(card));
            container.appendChild(div);
        });
    }

    function renderOrdersTable() {
        const tbody = document.getElementById('ordersTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';
        (data.orders || []).forEach(o => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${o.cod}</td><td>${o.tipo}</td><td>${o.data}</td><td>${currencyBRL(o.valor || 0)}</td><td>${statusLabel(o.situacao)}</td>`;
            tbody.appendChild(tr);
        });
    }

    function renderRecentProjects() {
        const el = document.getElementById('recentProjects');
        if (!el) return;
        el.innerHTML = '';
        const recents = [
            {cod: 123, nome: 'Construção X'},
            {cod: 124, nome: 'Reforma Y'}
        ];
        recents.forEach(p => {
            const d = document.createElement('div');
            d.className = 'chip';
            d.textContent = p.nome;
            d.onclick = () => window.location.href = '/projects/' + p.cod;
            el.appendChild(d);
        });
    }

    function statusLabel(code) {
        const m = {
            '1': 'Aguardando',
            '2': 'Em andamento',
            '3': 'Paralisado',
            '4': 'Suspenso',
            '5': 'Cancelado',
            '6': 'Concluído'
        };
        return m[code] || '—';
    }

    // interactions
    function onCardClick(card) {
        document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
        const clicked = Array.from(document.querySelectorAll('.card')).find(c => c.dataset.id === card.id);
        if (clicked) clicked.classList.add('selected');

        const contractForm = document.getElementById('contractForm');
        if (card.type === 'contrato') {
            // abrir form com dados fictícios
            contractForm.style.display = 'block';
            document.getElementById('numContrato').value = card.subtitle && card.subtitle.split(' ')[0] ? card.subtitle.split(' ')[0] : '0001/2025';
            document.getElementById('contratado').value = card.subtitle && card.subtitle.split('-')[1] ? card.subtitle.split('-')[1].trim() : 'Fulano';
            document.getElementById('cpfcnpj').value = '';
            document.getElementById('dataInicio').value = '';
            document.getElementById('valor').value = '';
            document.getElementById('tipoPessoa').value = '1';
            document.getElementById('formError').style.display = 'none';
        } else {
            contractForm.style.display = 'none';
            const drawer = document.getElementById('drawer');
            if (drawer) {
                drawer.querySelector('h3').textContent = card.title + ' — detalhe';
                drawer.querySelector('.muted-note').textContent = card.subtitle;
            }
        }
    }

    window.maskOnlyNumbers = maskOnlyNumbers;
    window.formatCurrencyInput = formatCurrencyInput;
    window.saveContract = function () {
        const numContrato = document.getElementById('numContrato').value.trim();
        const contratado = document.getElementById('contratado').value.trim();
        const cpfcnpj = document.getElementById('cpfcnpj').value.replace(/\D/g, '');
        const valorStr = document.getElementById('valor').value;
        const tipoPessoa = document.getElementById('tipoPessoa').value;
        const errEl = document.getElementById('formError');

        if (!/^[0-9]{4}\/[0-9]{4}$/.test(numContrato)) {
            errEl.textContent = 'Número do contrato deve ser NNNN/AAAA.';
            errEl.style.display = 'block';
            return;
        }
        if (!contratado) {
            errEl.textContent = 'Nome obrigatório.';
            errEl.style.display = 'block';
            return;
        }
        if (tipoPessoa === '1' && cpfcnpj.length !== 11 && cpfcnpj.length !== 14) {
            errEl.textContent = 'CPF/CNPJ deve ter 11 ou 14 dígitos.';
            errEl.style.display = 'block';
            return;
        }
        const numericValue = parseFloat((valorStr || '').replace(/\./g, '').replace(',', '.')) || 0;
        if (numericValue <= 0) {
            errEl.textContent = 'Valor deve ser maior que zero.';
            errEl.style.display = 'block';
            return;
        }

        errEl.style.display = 'none';
        alert('Simulação: contrato salvo (dados fictícios):\n' + JSON.stringify({
            numContrato,
            contratado,
            cpfcnpj,
            valor: numericValue,
            tipoPessoa
        }, null, 2));
    };
    window.closeContract = function () {
        document.getElementById('contractForm').style.display = 'none';
        document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
    };
    window.filterBy = function (code) {
        alert('Filtro: ' + code);
    };

    // init
    document.addEventListener('DOMContentLoaded', function () {
        renderPipeline('pipeline');
        // also allow page-specific small pipeline
        renderPipeline('pipelineSmall');
        renderOrdersTable();
        renderRecentProjects();
        const titleEl = document.getElementById('projectTitle');
        if (titleEl && data.project && data.project.nome) titleEl.textContent = data.project.nome;
    });
})();
