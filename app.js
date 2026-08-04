// 🐾 PataForma Database & App Engine (Local Storage Sim) - Full Management Suite

// 1. DATA INITIALIZATION & LOCALSTORAGE MANAGER
const DB = {
    get: (key) => JSON.parse(localStorage.getItem(`pataforma_${key}`)),
    set: (key, data) => localStorage.setItem(`pataforma_${key}`, JSON.stringify(data)),
    init: () => {
        // Init Users (Staff & RBAC)
        if (!DB.get('usuarios')) {
            DB.set('usuarios', [
                { id: 1, nome: "Admin Dono", perfil: "Admin", email: "admin@pataforma.com", kanban: true, taxi_dog: true, caixa: true, qc: true, cargo: "Gerente Geral" },
                { id: 2, nome: "Juliana Esteticista", perfil: "Supervisor", email: "juliana@pataforma.com", kanban: true, taxi_dog: false, caixa: true, qc: true, cargo: "Supervisora de Estética" },
                { id: 3, nome: "Marcos Recepção", perfil: "Recepcao", email: "marcos@pataforma.com", kanban: true, taxi_dog: false, caixa: true, qc: false, cargo: "Atendente" },
                { id: 4, nome: "Tiago Banhista", perfil: "Banhista", email: "tiago@pataforma.com", kanban: true, taxi_dog: false, caixa: false, qc: false, cargo: "Banhista Sênior" },
                { id: 5, nome: "Lucas Entregador", perfil: "Entregador", email: "lucas@pataforma.com", kanban: false, taxi_dog: true, caixa: false, qc: false, cargo: "Motorista Táxi Dog" }
            ]);
        }

        // Init Clientes (Tutores)
        if (!DB.get('clientes')) {
            DB.set('clientes', [
                { id: 1, nome: "Carlos Souza", telefone: "(11) 98888-7777", email: "carlos@gmail.com", endereco: "Av. Paulista, 1000 - Ap 42", lat_lng: "-23.5614,-46.6558", ultima_visita: "2026-07-28" },
                { id: 2, nome: "Mariana Lima", telefone: "(11) 97777-6666", email: "mariana@gmail.com", endereco: "Rua Augusta, 450", lat_lng: "-23.5512,-46.6521", ultima_visita: "2026-08-01" },
                { id: 3, nome: "Roberto Alves", telefone: "(11) 96666-5555", email: "roberto@gmail.com", endereco: "Alameda Lorena, 89", lat_lng: "-23.5678,-46.6610", ultima_visita: "2026-08-03" }
            ]);
        }

        // Init Pets (Cães e Gatos)
        if (!DB.get('pets')) {
            DB.set('pets', [
                { id: 1, cliente_id: 1, nome: "Thor", especie: "Cachorro", raca: "Golden Retriever", porte: "Grande", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Alergia a shampoo de coco." },
                { id: 2, cliente_id: 2, nome: "Luna", especie: "Cachorro", raca: "Shih Tzu", porte: "Pequeno", temperamento: "Arisco", vacinas_em_dia: true, observacoes: "Muito sensível no ouvido esquerdo." },
                { id: 3, cliente_id: 3, nome: "Max", especie: "Cachorro", raca: "Rottweiler", porte: "Grande", temperamento: "Agressivo", vacinas_em_dia: false, observacoes: "Exige uso de focinheira na banheira." },
                { id: 4, cliente_id: 2, nome: "Mingau", especie: "Gato", raca: "Persa", porte: "Pequeno", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Gato Persa pelagem longa. Secagem em temperatura amena." }
            ]);
        }

        // Init Planos de Assinatura Recorrentes
        if (!DB.get('planos_assinatura')) {
            DB.set('planos_assinatura', [
                { id: 1, nome: "Plano Mensal Gold (4 Banhos + Tosa)", descricao: "4 banhos mensais + 1 tosa completa com banho antipulgas incluso.", preco: 240.00, periodicidade: "Mensal", quantidade_banhos: 4, inclui_tosa: true },
                { id: 2, nome: "Plano VIP Semanal", descricao: "1 banho por semana com secagem rápida e perfume importado.", preco: 65.00, periodicidade: "Semanal", quantidade_banhos: 1, inclui_tosa: false },
                { id: 3, nome: "Assinatura Felina Premium", descricao: "2 banhos mensais higiênicos + escovação de pelagem para gatos.", preco: 150.00, periodicidade: "Mensal", quantidade_banhos: 2, inclui_tosa: false },
                { id: 4, nome: "Plano Anual Pet Care VIP", descricao: "Assinatura anual ilimitada de higiene, hidratação e prioridade no Táxi Dog.", preco: 2150.00, periodicidade: "Anual", quantidade_banhos: 48, inclui_tosa: true }
            ]);
        }

        // Init Serviços
        if (!DB.get('servicos')) {
            DB.set('servicos', [
                { id: 1, nome: "Banho & Secagem", descricao: "Banho completo, secagem, corte de unhas e limpeza de ouvidos.", preco: 70.00, duracao: 45 },
                { id: 2, nome: "Tosa Completa", descricao: "Banho completo + Tosa com máquina e tesoura na pelagem inteira.", preco: 120.00, duracao: 90 },
                { id: 3, nome: "Banho Antipulgas", descricao: "Banho com shampoo ectoparasiticida especial.", preco: 95.00, duracao: 60 },
                { id: 4, nome: "Banho & Escovação Felina", descricao: "Banho especial para gatos com secagem silenciosa sem estresse.", preco: 85.00, duracao: 50 }
            ]);
        }

        // Init Produtos
        if (!DB.get('produtos')) {
            DB.set('produtos', [
                { id: 1, nome: "Ração Premium Cães Adultos 10kg", codigo_barras: "78910001", preco: 189.90, categoria: "Ração", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23818cf8'><rect width='100' height='100' fill='%231e293b'/><circle cx='50' cy='50' r='30'/><text x='50' y='55' font-size='10' fill='white' text-anchor='middle'>RAÇÃO</text></svg>" },
                { id: 2, nome: "Shampoo Hipoalergênico 500ml", codigo_barras: "78910002", preco: 45.00, categoria: "Higiene", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23c084fc'><rect width='100' height='100' fill='%231e293b'/><rect x='35' y='20' width='30' height='60' rx='5'/><text x='50' y='55' font-size='10' fill='white' text-anchor='middle'>SHAMP</text></svg>" },
                { id: 3, nome: "Petisco a Granel (Biscoito Canino 100g)", codigo_barras: null, preco: 12.50, categoria: "Petiscos", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23fbbf24'><rect width='100' height='100' fill='%231e293b'/><path d='M30,50 C30,40 40,30 50,30 C60,30 70,40 70,50 C40,70 30,60 30,50 Z'/><text x='50' y='55' font-size='10' fill='white' text-anchor='middle'>COOKS</text></svg>" },
                { id: 4, nome: "Lacinhos Artesanais (Kit 4 un)", codigo_barras: null, preco: 8.00, categoria: "Acessórios", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23ec4899'><rect width='100' height='100' fill='%231e293b'/><polygon points='20,30 80,30 50,60'/><polygon points='20,70 80,70 50,40'/><circle cx='50' cy='50' r='10'/></svg>" }
            ]);
        }

        // Init Lotes Estoque (FEFO)
        if (!DB.get('lotes_estoque')) {
            const hoje = new Date();
            const vencendo = new Date(hoje); vencendo.setDate(hoje.getDate() + 5);
            const vencido = new Date(hoje); vencido.setDate(hoje.getDate() - 10);
            const emDia = new Date(hoje); emDia.setDate(hoje.getDate() + 120);

            DB.set('lotes_estoque', [
                { id: 1, produto_id: 1, lote: "L-RAC01", quantidade: 3, data_vencimento: vencendo.toISOString().split('T')[0], status: "Disponivel" },
                { id: 2, produto_id: 1, lote: "L-RAC02", quantidade: 10, data_vencimento: emDia.toISOString().split('T')[0], status: "Disponivel" },
                { id: 3, produto_id: 2, lote: "L-SH01", quantidade: 5, data_vencimento: emDia.toISOString().split('T')[0], status: "Disponivel" },
                { id: 4, produto_id: 3, lote: "L-PT01", quantidade: 2, data_vencimento: vencido.toISOString().split('T')[0], status: "Disponivel" },
                { id: 5, produto_id: 3, lote: "L-PT02", quantidade: 15, data_vencimento: emDia.toISOString().split('T')[0], status: "Disponivel" }
            ]);
        }

        // Init Pacotes Ativos
        if (!DB.get('pacotes_ativos')) {
            DB.set('pacotes_ativos', [
                { id: 1, cliente_id: 1, plano_id: 1, quantidade_banhos: 4, data_aquisicao: "2026-08-01", status: "Ativo" },
                { id: 2, cliente_id: 2, plano_id: 2, quantidade_banhos: 0, data_aquisicao: "2026-07-15", status: "Renovação Pendente" }
            ]);
        }

        // Init Kanban
        if (!DB.get('agendamentos_kanban')) {
            DB.set('agendamentos_kanban', [
                { id: 1, pet_id: 1, servico_id: 1, status: "Agendado", data_agendamento: "2026-08-04T10:00:00", possui_ectoparasitas: false, adicional_desembolo: 0, qc_aprovado: false, latitude_entrega: null, longitude_entrega: null, foto_comprovante_url: null },
                { id: 2, pet_id: 2, servico_id: 2, status: "Aguardando Banho", data_agendamento: "2026-08-04T11:30:00", possui_ectoparasitas: false, adicional_desembolo: 0, qc_aprovado: false, latitude_entrega: null, longitude_entrega: null, foto_comprovante_url: null },
                { id: 3, pet_id: 3, servico_id: 1, status: "Em Rota de Busca", data_agendamento: "2026-08-04T09:00:00", possui_ectoparasitas: false, adicional_desembolo: 0, qc_aprovado: false, latitude_entrega: null, longitude_entrega: null, foto_comprovante_url: null },
                { id: 4, pet_id: 4, servico_id: 4, status: "Agendado", data_agendamento: "2026-08-04T14:00:00", possui_ectoparasitas: false, adicional_desembolo: 0, qc_aprovado: false, latitude_entrega: null, longitude_entrega: null, foto_comprovante_url: null }
            ]);
        }

        if (!DB.get('contas_receber')) DB.set('contas_receber', []);
        if (!DB.get('movimentacoes_caixa')) {
            DB.set('movimentacoes_caixa', [
                { id: 1, tipo: "ENTRADA", categoria: "Venda Balcão", descricao: "Venda Ração Carlos", valor: 189.90, data: "2026-08-04T14:30:00" },
                { id: 2, tipo: "SAIDA", categoria: "Estoque", descricao: "Compra Fornecedor Shampoo", valor: 150.00, data: "2026-08-04T10:00:00" }
            ]);
        }
    }
};

// Start DB
DB.init();

// 2. STATE ENGINE
const State = {
    currentProfile: 'Admin',
    cart: [],
    gpsWatcher: null,
    cameraStream: null,
    
    showToast: (message, type = 'info') => {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span>🔔</span> <div>${message}</div>`;
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }
};

// 3. RBAC & PROFILE VISIBILITY CONTROL
function applyRBAC(profileName) {
    State.currentProfile = profileName;
    const users = DB.get('usuarios');
    const userDef = users.find(u => u.perfil === profileName) || users[0];
    
    const navKanban = document.getElementById('nav-kanban');
    const navCaixa = document.getElementById('nav-caixa');
    const navEstoque = document.getElementById('nav-estoque');
    const navAnalytics = document.getElementById('nav-analytics');
    const navTaxi = document.getElementById('nav-taxi');
    const navCadastros = document.getElementById('nav-cadastros');

    navKanban.style.display = userDef.kanban ? 'flex' : 'none';
    navCaixa.style.display = userDef.caixa ? 'flex' : 'none';
    navEstoque.style.display = (profileName === 'Admin' || profileName === 'Supervisor') ? 'flex' : 'none';
    navAnalytics.style.display = profileName === 'Admin' ? 'flex' : 'none';
    navTaxi.style.display = userDef.taxi_dog ? 'flex' : 'none';
    navCadastros.style.display = (profileName === 'Admin' || profileName === 'Recepcao' || profileName === 'Supervisor') ? 'flex' : 'none';

    if (userDef.kanban) switchTab('kanban');
    else if (userDef.taxi_dog) switchTab('taxi');
    else if (userDef.caixa) switchTab('caixa');

    State.showToast(`Perfil alterado para: ${userDef.nome} (${profileName})`, 'info');
}

// Tab switcher
function switchTab(tabId) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    const activeSection = document.getElementById(`section-${tabId}`);
    const activeBtn = document.getElementById(`nav-${tabId}`);
    
    if (activeSection) activeSection.classList.add('active');
    if (activeBtn) activeBtn.classList.add('active');

    if (tabId === 'kanban') renderKanban();
    if (tabId === 'caixa') renderCaixa();
    if (tabId === 'estoque') renderEstoque();
    if (tabId === 'analytics') renderAnalytics();
    if (tabId === 'taxi') renderTaxiDog();
    if (tabId === 'cadastros') switchSubTab('clientes');
}

// SubTab switcher (inside Cadastros)
function switchSubTab(subTabId) {
    document.querySelectorAll('.sub-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.sub-nav-btn').forEach(btn => btn.classList.remove('active'));

    const activeSubView = document.getElementById(`subview-${subTabId}`);
    const activeSubBtn = document.getElementById(`subnav-${subTabId}`);

    if (activeSubView) activeSubView.classList.add('active');
    if (activeSubBtn) activeSubBtn.classList.add('active');

    if (subTabId === 'clientes') renderClientesTable();
    if (subTabId === 'pets') renderPetsTable();
    if (subTabId === 'funcionarios') renderFuncionariosTable();
    if (subTabId === 'produtos-crud') renderProdutosCrudTable();
    if (subTabId === 'assinaturas') renderAssinaturasCards();
}

// 4. KANBAN ENGINE
const STATUS_LIST = ['Agendado', 'Em Rota de Busca', 'Aguardando Banho', 'No Banho', 'Em Tosa', 'Inspecao QC', 'Pronto', 'Entregue'];

function renderKanban() {
    const kanbanData = DB.get('agendamentos_kanban') || [];
    const pets = DB.get('pets') || [];
    const servicos = DB.get('servicos') || [];
    
    document.querySelectorAll('.kanban-column-cards').forEach(col => col.innerHTML = '');
    
    kanbanData.forEach(item => {
        const pet = pets.find(p => p.id === item.pet_id);
        const servico = servicos.find(s => s.id === item.servico_id);
        if (!pet || !servico) return;

        const card = document.createElement('div');
        card.className = 'kanban-card';
        card.draggable = true;
        card.dataset.id = item.id;
        
        let alertHTML = '';
        if (pet.temperamento === 'Agressivo') {
            alertHTML += `<span class="alert-badge danger">⚠️ Agressivo</span>`;
        } else if (pet.temperamento === 'Arisco') {
            alertHTML += `<span class="alert-badge warning">⚡ Arisco</span>`;
        }
        if (!pet.vacinas_em_dia) {
            alertHTML += `<span class="alert-badge danger">💉 Vacinas Atrasadas</span>`;
        }
        if (item.possui_ectoparasitas) {
            alertHTML += `<span class="alert-badge danger">🪰 Pulga/Carrapato</span>`;
        }

        const especieIcon = pet.especie === 'Gato' ? '🐱' : '🐶';

        card.innerHTML = `
            <div class="card-alerts">${alertHTML}</div>
            <div class="card-title">
                <span>${especieIcon} ${pet.nome}</span>
                <span style="font-size:0.75rem; color:#818cf8;">#${item.id}</span>
            </div>
            <div class="card-subtitle">${pet.raca} | ${servico.nome}</div>
            
            <div class="card-meta">
                <span class="pet-tag">👤 Tutor: ${DB.get('clientes').find(c => c.id === pet.cliente_id).nome}</span>
            </div>
            
            <div class="card-actions">
                ${item.status === 'Inspecao QC' ? `<button class="card-btn" onclick="inspeccionarQC(${item.id})">🔍 Aprovar QC</button>` : ''}
                ${item.status === 'Aguardando Banho' && !item.possui_ectoparasitas ? `<button class="card-btn" onclick="relatarPulga(${item.id})">🪰 Relatar Pulga</button>` : ''}
                <button class="card-btn" onclick="verDetalhesKanban(${item.id})">ℹ️ Info</button>
            </div>
        `;

        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.id);
            card.style.opacity = '0.5';
        });
        
        card.addEventListener('dragend', () => {
            card.style.opacity = '1';
        });

        const columnId = getColumnIdByStatus(item.status);
        const colContainer = document.querySelector(`#col-${columnId} .kanban-column-cards`);
        if (colContainer) colContainer.appendChild(card);
    });

    updateColumnCounts();
}

function getColumnIdByStatus(status) {
    const map = {
        'Agendado': 'agendado',
        'Em Rota de Busca': 'rota',
        'Aguardando Banho': 'aguardando',
        'No Banho': 'banho',
        'Em Tosa': 'tosa',
        'Inspecao QC': 'qc',
        'Pronto': 'pronto',
        'Entregue': 'entregue'
    };
    return map[status] || 'agendado';
}

function updateColumnCounts() {
    const kanbanData = DB.get('agendamentos_kanban') || [];
    const counts = {};
    
    STATUS_LIST.forEach(status => counts[getColumnIdByStatus(status)] = 0);
    
    kanbanData.forEach(item => {
        const id = getColumnIdByStatus(item.status);
        if (counts[id] !== undefined) counts[id]++;
    });

    Object.keys(counts).forEach(colId => {
        const badge = document.querySelector(`#col-${colId} .column-badge`);
        if (badge) badge.innerText = counts[colId];
    });
}

document.querySelectorAll('.kanban-column').forEach(column => {
    column.addEventListener('dragover', (e) => {
        e.preventDefault();
        column.classList.add('drag-over');
    });

    column.addEventListener('dragleave', () => {
        column.classList.remove('drag-over');
    });

    column.addEventListener('drop', (e) => {
        column.classList.remove('drag-over');
        const cardId = parseInt(e.dataTransfer.getData('text/plain'));
        const targetStatus = getStatusByColumnId(column.id.replace('col-', ''));
        
        if (cardId && targetStatus) {
            handleStatusTransition(cardId, targetStatus);
        }
    });
});

function getStatusByColumnId(colId) {
    const map = {
        'agendado': 'Agendado',
        'rota': 'Em Rota de Busca',
        'aguardando': 'Aguardando Banho',
        'banho': 'No Banho',
        'tosa': 'Em Tosa',
        'qc': 'Inspecao QC',
        'pronto': 'Pronto',
        'entregue': 'Entregue'
    };
    return map[colId];
}

function handleStatusTransition(cardId, newStatus) {
    const kanbanData = DB.get('agendamentos_kanban');
    const item = kanbanData.find(k => k.id === cardId);
    if (!item) return;

    const pet = DB.get('pets').find(p => p.id === item.pet_id);

    if (newStatus === 'No Banho' && pet.temperamento === 'Agressivo') {
        State.showToast(`🚨 ATENÇÃO: O pet ${pet.nome} é Agressivo. Exige focinheira antes de colocá-lo na banheira!`, 'error');
    }
    
    if (newStatus === 'No Banho' && item.possui_ectoparasitas) {
        State.showToast(`⛔ BLOQUEIO: Este pet foi triado com Pulga/Carrapato. Ele DEVE passar pelo "Banho Antipulgas" e o orçamento extra deve ser aprovado.`, 'error');
        return;
    }

    if (newStatus === 'Pronto' && !item.qc_aprovado && State.currentProfile !== 'Admin' && State.currentProfile !== 'Supervisor') {
        State.showToast(`🛡️ APROVAÇÃO QC EXIGIDA: O supervisor precisa aprovar a inspeção de qualidade antes de liberar o pet como Pronto.`, 'error');
        return;
    }

    const oldStatus = item.status;
    item.status = newStatus;
    
    let financeLog = '';
    
    if ((newStatus === 'Pronto' || newStatus === 'Entregue') && !(oldStatus === 'Pronto' || oldStatus === 'Entregue')) {
        const servico = DB.get('servicos').find(s => s.id === item.servico_id);
        const cliente = DB.get('clientes').find(c => c.id === pet.cliente_id);
        const pacote = DB.get('pacotes_ativos').find(p => p.cliente_id === cliente.id && p.quantidade_banhos > 0);

        if (pacote) {
            pacote.quantidade_banhos--;
            DB.set('pacotes_ativos', DB.get('pacotes_ativos'));
            financeLog = `🎯 Baixado 1 banho do Pacote Ativo do cliente ${cliente.nome}. Restam: ${pacote.quantidade_banhos}.`;
            State.showToast(financeLog, 'success');
        } else {
            const valorTotal = servico.preco + item.adicional_desembolo;
            
            const contas = DB.get('contas_receber') || [];
            contas.push({
                id: contas.length + 1,
                cliente_id: cliente.id,
                descricao: `${servico.nome} - Pet: ${pet.nome}`,
                valor: valorTotal,
                status: 'Pago',
                origem: 'SERVICO_KANBAN',
                data: new Date().toISOString()
            });
            DB.set('contas_receber', contas);

            const caixa = DB.get('movimentacoes_caixa') || [];
            caixa.push({
                id: caixa.length + 1,
                tipo: 'ENTRADA',
                categoria: 'Serviço',
                descricao: `Serviço PataForma: ${pet.nome} (${servico.nome})`,
                valor: valorTotal,
                data: new Date().toISOString()
            });
            DB.set('movimentacoes_caixa', caixa);
            
            financeLog = `💸 Receita de R$ ${valorTotal.toFixed(2)} gravada no caixa nativo. Webhook enviado para LOVI 10 (STATUS: SUCESSO).`;
            State.showToast(financeLog, 'success');
        }
    }

    DB.set('agendamentos_kanban', kanbanData);
    renderKanban();
    State.showToast(`Pet ${pet.nome} movido para ${newStatus}.`, 'info');
}

function relatarPulga(id) {
    const kanbanData = DB.get('agendamentos_kanban');
    const item = kanbanData.find(k => k.id === id);
    if (!item) return;

    item.possui_ectoparasitas = true;
    item.adicional_desembolo += 25.00;
    item.servico_id = 3;
    DB.set('agendamentos_kanban', kanbanData);
    
    renderKanban();
    State.showToast(`🚨 Triagem: Ectoparasitas relatados! Orçamento de R$ 25,00 adicionais gerado e enviado ao tutor via WhatsApp.`, 'warning');
}

function inspeccionarQC(id) {
    const kanbanData = DB.get('agendamentos_kanban');
    const item = kanbanData.find(k => k.id === id);
    if (!item) return;

    item.qc_aprovado = true;
    DB.set('agendamentos_kanban', kanbanData);
    State.showToast(`✅ QC Aprovado pelo Supervisor! O pet já pode ser marcado como Pronto.`, 'success');
    
    handleStatusTransition(id, 'Pronto');
}

function verDetalhesKanban(id) {
    const item = DB.get('agendamentos_kanban').find(k => k.id === id);
    const pet = DB.get('pets').find(p => p.id === item.pet_id);
    const cliente = DB.get('clientes').find(c => c.id === pet.cliente_id);
    const servico = DB.get('servicos').find(s => s.id === item.servico_id);

    alert(`📋 Ficha Operacional PataForma #${id}
-----------------------------------------
Pet: ${pet.nome} (${pet.especie} - ${pet.raca})
Temperamento: ${pet.temperamento}
Tutor: ${cliente.nome} (${cliente.telefone})
Endereço: ${cliente.endereco}

Serviço: ${servico.nome}
Preço Base: R$ ${servico.preco.toFixed(2)}
Adicionais: R$ ${item.adicional_desembolo.toFixed(2)}
QC Aprovado: ${item.qc_aprovado ? 'Sim' : 'Não'}
Status Atual: ${item.status}
GPS de Entrega: ${item.latitude_entrega ? `${item.latitude_entrega}, ${item.longitude_entrega}` : 'Não registrado'}`);
}


// 5. CRUD REGISTRATION MODULES (CLIENTES, PETS, FUNCIONÁRIOS, PRODUTOS, ASSINATURAS)

// Render Tables & Lists
function renderClientesTable() {
    const clientes = DB.get('clientes') || [];
    const pets = DB.get('pets') || [];
    const tbody = document.getElementById('table-clientes-body');
    tbody.innerHTML = '';

    clientes.forEach(c => {
        const clientePets = pets.filter(p => p.cliente_id === c.id).map(p => `${p.especie === 'Gato' ? '🐱' : '🐶'} ${p.nome}`).join(', ') || 'Nenhum';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${c.nome}</strong></td>
            <td>${c.telefone}</td>
            <td>${c.email || '-'}</td>
            <td>${c.endereco}</td>
            <td>${clientePets}</td>
            <td><button class="card-btn" onclick="abrirModalPetParaCliente(${c.id})">+ Add Pet</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function renderPetsTable() {
    const pets = DB.get('pets') || [];
    const clientes = DB.get('clientes') || [];
    const tbody = document.getElementById('table-pets-body');
    tbody.innerHTML = '';

    pets.forEach(p => {
        const cliente = clientes.find(c => c.id === p.cliente_id);
        const icon = p.especie === 'Gato' ? '🐱' : '🐶';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${icon} ${p.nome}</strong></td>
            <td><span class="validade-badge em-dia">${p.especie}</span></td>
            <td>${p.raca} (${p.porte || 'Médio'})</td>
            <td>${p.temperamento}</td>
            <td>${cliente ? cliente.nome : 'Sem tutor'}</td>
            <td>${p.vacinas_em_dia ? '✅ Em dia' : '❌ Pendente'}</td>
            <td>${p.observacoes || '-'}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderFuncionariosTable() {
    const usuarios = DB.get('usuarios') || [];
    const tbody = document.getElementById('table-funcionarios-body');
    tbody.innerHTML = '';

    usuarios.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${u.nome}</strong></td>
            <td><span class="validade-badge em-dia">${u.perfil}</span></td>
            <td>${u.cargo || u.perfil}</td>
            <td>${u.email}</td>
            <td>${u.kanban ? '📋 Kanban ' : ''}${u.caixa ? '🛒 Caixa ' : ''}${u.taxi_dog ? '🚕 Táxi ' : ''}${u.qc ? '🔍 QC' : ''}</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderProdutosCrudTable() {
    const produtos = DB.get('produtos') || [];
    const lotes = DB.get('lotes_estoque') || [];
    const tbody = document.getElementById('table-produtos-body');
    tbody.innerHTML = '';

    produtos.forEach(p => {
        const totalEstoque = lotes.filter(l => l.produto_id === p.id && l.status === 'Disponivel').reduce((acc, curr) => acc + curr.quantidade, 0);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <img src="${p.foto}" style="width:36px; height:36px; border-radius:6px; object-fit:cover;" />
                    <strong>${p.nome}</strong>
                </div>
            </td>
            <td><span class="product-category">${p.categoria}</span></td>
            <td><code>${p.codigo_barras || 'Sem código'}</code></td>
            <td style="color:#10b981; font-weight:700;">R$ ${p.preco.toFixed(2)}</td>
            <td>${totalEstoque} un</td>
            <td><button class="card-btn" onclick="adicionarLoteModal(${p.id})">+ Lote FEFO</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function renderAssinaturasCards() {
    const planos = DB.get('planos_assinatura') || [];
    const container = document.getElementById('planos-cards-container');
    container.innerHTML = '';

    planos.forEach(p => {
        const card = document.createElement('div');
        card.className = 'plan-card';
        card.innerHTML = `
            <span class="plan-frequency-badge">${p.periodicidade}</span>
            <div class="plan-title">${p.nome}</div>
            <div class="plan-price">R$ ${p.preco.toFixed(2)} <span>/ ${p.periodicidade.toLowerCase()}</span></div>
            <ul class="plan-features">
                <li>${p.quantidade_banhos} Banhos completos</li>
                <li>${p.inclui_tosa ? 'Tosa higiênica / estético incluso' : 'Tosa avulsa com desconto'}</li>
                <li>Renovação automática (${p.periodicidade})</li>
                <li>Prioridade na agenda do Táxi Dog</li>
            </ul>
            <button class="btn-primary" onclick="abrirModalAssinarPlano(${p.id})">✍️ Assinar para Cliente</button>
        `;
        container.appendChild(card);
    });

    // Also populate select options in booking modals
    populateSelectOptions();
}

function populateSelectOptions() {
    const clientes = DB.get('clientes') || [];
    const pets = DB.get('pets') || [];
    const servicos = DB.get('servicos') || [];

    // Populate pet select in appointment modal
    const petSelect = document.getElementById('select-agendar-pet');
    if (petSelect) {
        petSelect.innerHTML = '';
        pets.forEach(p => {
            const cliente = clientes.find(c => c.id === p.cliente_id);
            petSelect.innerHTML += `<option value="${p.id}">${p.especie === 'Gato' ? '🐱' : '🐶'} ${p.nome} (Tutor: ${cliente ? cliente.nome : 'Sem tutor'})</option>`;
        });
    }

    // Populate service select
    const servicoSelect = document.getElementById('select-agendar-servico');
    if (servicoSelect) {
        servicoSelect.innerHTML = '';
        servicos.forEach(s => {
            servicoSelect.innerHTML += `<option value="${s.id}">${s.nome} - R$ ${s.preco.toFixed(2)}</option>`;
        });
    }

    // Populate cliente select for Subscription modal
    const clienteSubSelect = document.getElementById('select-assinar-cliente');
    if (clienteSubSelect) {
        clienteSubSelect.innerHTML = '';
        clientes.forEach(c => {
            clienteSubSelect.innerHTML += `<option value="${c.id}">${c.nome} (${c.telefone})</option>`;
        });
    }
}


// Save Handlers (Forms Submission)
function salvarCliente(e) {
    e.preventDefault();
    const nome = document.getElementById('input-cliente-nome').value;
    const telefone = document.getElementById('input-cliente-tel').value;
    const email = document.getElementById('input-cliente-email').value;
    const endereco = document.getElementById('input-cliente-endereco').value;

    const clientes = DB.get('clientes');
    const newId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;

    clientes.push({ id: newId, nome, telefone, email, endereco, lat_lng: "-23.5505,-46.6333", ultima_visita: new Date().toISOString().split('T')[0] });
    DB.set('clientes', clientes);

    closeModal('modal-cliente');
    renderClientesTable();
    State.showToast(`Cliente ${nome} cadastrado com sucesso!`, 'success');
}

function salvarPet(e) {
    e.preventDefault();
    const cliente_id = parseInt(document.getElementById('select-pet-tutor').value);
    const nome = document.getElementById('input-pet-nome').value;
    const especie = document.getElementById('select-pet-especie').value;
    const raca = document.getElementById('input-pet-raca').value;
    const porte = document.getElementById('select-pet-porte').value;
    const temperamento = document.getElementById('select-pet-temperamento').value;
    const vacinas_em_dia = document.getElementById('check-pet-vacinas').checked;
    const observacoes = document.getElementById('input-pet-obs').value;

    const pets = DB.get('pets');
    const newId = pets.length > 0 ? Math.max(...pets.map(p => p.id)) + 1 : 1;

    pets.push({ id: newId, cliente_id, nome, especie, raca, porte, temperamento, vacinas_em_dia, observacoes });
    DB.set('pets', pets);

    closeModal('modal-pet');
    renderPetsTable();
    State.showToast(`Pet ${nome} (${especie}) cadastrado com sucesso!`, 'success');
}

function salvarFuncionario(e) {
    e.preventDefault();
    const nome = document.getElementById('input-func-nome').value;
    const email = document.getElementById('input-func-email').value;
    const cargo = document.getElementById('input-func-cargo').value;
    const perfil = document.getElementById('select-func-perfil').value;
    
    const kanban = document.getElementById('check-func-kanban').checked;
    const caixa = document.getElementById('check-func-caixa').checked;
    const taxi_dog = document.getElementById('check-func-taxi').checked;
    const qc = document.getElementById('check-func-qc').checked;

    const usuarios = DB.get('usuarios');
    const newId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;

    usuarios.push({ id: newId, nome, email, cargo, perfil, kanban, caixa, taxi_dog, qc });
    DB.set('usuarios', usuarios);

    closeModal('modal-funcionario');
    renderFuncionariosTable();
    State.showToast(`Funcionário ${nome} (${perfil}) cadastrado com sucesso!`, 'success');
}

function salvarProduto(e) {
    e.preventDefault();
    const nome = document.getElementById('input-prod-nome').value;
    const categoria = document.getElementById('input-prod-categoria').value;
    const codigo_barras = document.getElementById('input-prod-codigo').value || null;
    const preco = parseFloat(document.getElementById('input-prod-preco').value);
    const fotoUrl = document.getElementById('input-prod-foto').value;
    const qtdInicial = parseInt(document.getElementById('input-prod-qtd').value) || 10;
    const vencimento = document.getElementById('input-prod-vencimento').value;

    const produtos = DB.get('produtos');
    const lotes = DB.get('lotes_estoque');
    
    const newProdId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
    const foto = fotoUrl || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23818cf8'><rect width='100' height='100' fill='%231e293b'/><text x='50' y='55' font-size='10' fill='white' text-anchor='middle'>PROD</text></svg>";

    produtos.push({ id: newProdId, nome, categoria, codigo_barras, preco, foto });
    
    // Create initial FEFO batch
    const newLoteId = lotes.length > 0 ? Math.max(...lotes.map(l => l.id)) + 1 : 1;
    lotes.push({
        id: newLoteId,
        produto_id: newProdId,
        lote: `L-${newProdId}01`,
        quantidade: qtdInicial,
        data_vencimento: vencimento,
        status: "Disponivel"
    });

    DB.set('produtos', produtos);
    DB.set('lotes_estoque', lotes);

    closeModal('modal-produto');
    renderProdutosCrudTable();
    State.showToast(`Produto ${nome} cadastrado com lote FEFO inicial!`, 'success');
}

function salvarPlanoAssinatura(e) {
    e.preventDefault();
    const nome = document.getElementById('input-plano-nome').value;
    const preco = parseFloat(document.getElementById('input-plano-preco').value);
    const periodicidade = document.getElementById('select-plano-periodicidade').value;
    const quantidade_banhos = parseInt(document.getElementById('input-plano-banhos').value);
    const inclui_tosa = document.getElementById('check-plano-tosa').checked;
    const descricao = document.getElementById('input-plano-desc').value;

    const planos = DB.get('planos_assinatura');
    const newId = planos.length > 0 ? Math.max(...planos.map(p => p.id)) + 1 : 1;

    planos.push({ id: newId, nome, preco, periodicidade, quantidade_banhos, inclui_tosa, descricao });
    DB.set('planos_assinatura', planos);

    closeModal('modal-plano');
    renderAssinaturasCards();
    State.showToast(`Plano de Assinatura ${nome} (${periodicidade}) criado!`, 'success');
}

function assinarPlanoConfirmar(e) {
    e.preventDefault();
    const clienteId = parseInt(document.getElementById('select-assinar-cliente').value);
    const planoId = parseInt(document.getElementById('input-assinar-planoid').value);
    
    const planos = DB.get('planos_assinatura');
    const plano = planos.find(p => p.id === planoId);
    const cliente = DB.get('clientes').find(c => c.id === clienteId);
    
    const pacotes = DB.get('pacotes_ativos');
    const newId = pacotes.length > 0 ? Math.max(...pacotes.map(p => p.id)) + 1 : 1;

    pacotes.push({
        id: newId,
        cliente_id: clienteId,
        plano_id: planoId,
        quantidade_banhos: plano.quantidade_banhos,
        data_aquisicao: new Date().toISOString().split('T')[0],
        status: "Ativo"
    });

    // Record revenue
    const movimentacoes = DB.get('movimentacoes_caixa');
    movimentacoes.push({
        id: movimentacoes.length + 1,
        tipo: 'ENTRADA',
        categoria: 'Assinatura Recorrente',
        descricao: `Venda de Assinatura ${plano.nome} (${plano.periodicidade}) para ${cliente.nome}`,
        valor: plano.preco,
        data: new Date().toISOString()
    });

    DB.set('pacotes_ativos', pacotes);
    DB.set('movimentacoes_caixa', movimentacoes);

    closeModal('modal-assinar');
    State.showToast(`🎉 Assinatura ${plano.nome} ativada para o cliente ${cliente.nome}! Saldo: ${plano.quantidade_banhos} banhos.`, 'success');
}

function criarAgendamento(e) {
    e.preventDefault();
    const petId = parseInt(document.getElementById('select-agendar-pet').value);
    const servicoId = parseInt(document.getElementById('select-agendar-servico').value);
    const taxiDog = document.getElementById('check-agendar-taxi').checked;

    const kanbanData = DB.get('agendamentos_kanban');
    const newId = kanbanData.length > 0 ? Math.max(...kanbanData.map(k => k.id)) + 1 : 1;

    kanbanData.push({
        id: newId,
        pet_id: petId,
        servico_id: servicoId,
        status: taxiDog ? "Em Rota de Busca" : "Agendado",
        data_agendamento: new Date().toISOString(),
        possui_ectoparasitas: false,
        adicional_desembolo: 0,
        qc_aprovado: false,
        latitude_entrega: null,
        longitude_entrega: null,
        foto_comprovante_url: null
    });

    DB.set('agendamentos_kanban', kanbanData);
    closeModal('modal-agendamento');
    renderKanban();
    State.showToast(`Agendamento #${newId} criado com sucesso no Kanban!`, 'success');
}

// Modal Trigger Helpers
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}

function abrirModalPetParaCliente(clienteId) {
    openModal('modal-pet');
    const tutorSelect = document.getElementById('select-pet-tutor');
    if (tutorSelect) tutorSelect.value = clienteId;
}

function abrirModalAssinarPlano(planoId) {
    openModal('modal-assinar');
    const inputPlanoId = document.getElementById('input-assinar-planoid');
    if (inputPlanoId) inputPlanoId.value = planoId;
}

function abrirModalNovoPet() {
    const clientes = DB.get('clientes') || [];
    const select = document.getElementById('select-pet-tutor');
    select.innerHTML = '';
    clientes.forEach(c => select.innerHTML += `<option value="${c.id}">${c.nome}</option>`);
    openModal('modal-pet');
}


// 6. POS / CAIXA SCREEN
function renderCaixa() {
    const produtos = DB.get('produtos') || [];
    const catalogContainer = document.getElementById('pos-catalog');
    catalogContainer.innerHTML = '';

    produtos.forEach(p => {
        const lotes = DB.get('lotes_estoque').filter(l => l.produto_id === p.id && l.status === 'Disponivel');
        const totalEstoque = lotes.reduce((acc, curr) => acc + curr.quantidade, 0);

        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image" style="background-image: url('${p.foto || ''}')">
                <span class="product-category">${p.categoria}</span>
            </div>
            <div class="product-info">
                <h4 class="product-name">${p.nome}</h4>
                <p class="product-stock">Estoque: ${totalEstoque} un (FEFO ativo)</p>
                <div class="product-price-row">
                    <span class="product-price">R$ ${p.preco.toFixed(2)}</span>
                    <button class="add-cart-btn" onclick="addToCart(${p.id})">+</button>
                </div>
            </div>
        `;
        catalogContainer.appendChild(card);
    });

    renderCart();
}

function addToCart(productId) {
    const produtos = DB.get('produtos');
    const p = produtos.find(item => item.id === productId);
    if (!p) return;

    const lotes = DB.get('lotes_estoque').filter(l => l.produto_id === productId && l.status === 'Disponivel');
    const totalEstoque = lotes.reduce((acc, curr) => acc + curr.quantidade, 0);

    const cartItem = State.cart.find(c => c.id === productId);
    const cartQty = cartItem ? cartItem.qty : 0;

    if (cartQty >= totalEstoque) {
        State.showToast(`Estoque insuficiente do produto ${p.nome}!`, 'error');
        return;
    }

    if (cartItem) {
        cartItem.qty++;
    } else {
        State.cart.push({ ...p, qty: 1 });
    }

    renderCart();
}

function updateCartQty(productId, delta) {
    const cartItem = State.cart.find(c => c.id === productId);
    if (!cartItem) return;

    const lotes = DB.get('lotes_estoque').filter(l => l.produto_id === productId && l.status === 'Disponivel');
    const totalEstoque = lotes.reduce((acc, curr) => acc + curr.quantidade, 0);

    if (delta > 0 && cartItem.qty >= totalEstoque) {
        State.showToast(`Estoque total do lote atingido!`, 'error');
        return;
    }

    cartItem.qty += delta;
    if (cartItem.qty <= 0) {
        State.cart = State.cart.filter(c => c.id !== productId);
    }
    renderCart();
}

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    let subtotal = 0;
    State.cart.forEach(c => {
        const itemTotal = c.preco * c.qty;
        subtotal += itemTotal;

        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
            <div class="cart-item-info">
                <h4>${c.nome}</h4>
                <p>R$ ${c.preco.toFixed(2)} x ${c.qty}</p>
            </div>
            <div class="cart-item-actions">
                <button class="cart-qty-btn" onclick="updateCartQty(${c.id}, -1)">-</button>
                <span>${c.qty}</span>
                <button class="cart-qty-btn" onclick="updateCartQty(${c.id}, 1)">+</button>
            </div>
        `;
        cartContainer.appendChild(row);
    });

    document.getElementById('cart-subtotal').innerText = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('cart-grandtotal').innerText = `R$ ${subtotal.toFixed(2)}`;
}

function checkoutPOS() {
    if (State.cart.length === 0) {
        State.showToast("Seu carrinho de compras está vazio!", "error");
        return;
    }

    const lotes = DB.get('lotes_estoque');
    const movimentacoes = DB.get('movimentacoes_caixa');
    const contas = DB.get('contas_receber');
    
    State.cart.forEach(item => {
        let qtyToDeduct = item.qty;
        
        const productLots = lotes
            .filter(l => l.produto_id === item.id && l.status === 'Disponivel')
            .sort((a, b) => new Date(a.data_vencimento) - new Date(b.data_vencimento));

        for (let lot of productLots) {
            if (qtyToDeduct <= 0) break;

            if (lot.quantidade >= qtyToDeduct) {
                lot.quantidade -= qtyToDeduct;
                qtyToDeduct = 0;
            } else {
                qtyToDeduct -= lot.quantidade;
                lot.quantidade = 0;
            }

            if (lot.quantidade === 0) {
                lot.status = 'Esgotado';
            }
        }
    });

    const totalCheckout = State.cart.reduce((acc, c) => acc + (c.preco * c.qty), 0);
    
    movimentacoes.push({
        id: movimentacoes.length + 1,
        tipo: 'ENTRADA',
        categoria: 'Venda Balcão',
        descricao: `Venda de Produtos (${State.cart.map(c => `${c.qty}x ${c.nome}`).join(', ')})`,
        valor: totalCheckout,
        data: new Date().toISOString()
    });

    contas.push({
        id: contas.length + 1,
        cliente_id: 1,
        descricao: `Venda de Balcão: Itens diversos`,
        valor: totalCheckout,
        status: 'Pago',
        origem: 'VENDA_BALCAO',
        data: new Date().toISOString()
    });

    DB.set('lotes_estoque', lotes);
    DB.set('movimentacoes_caixa', movimentacoes);
    DB.set('contas_receber', contas);

    State.showToast(`💸 Venda concluída! Total R$ ${totalCheckout.toFixed(2)}. Estoque deduzido via regra FEFO.`, 'success');
    State.cart = [];
    renderCaixa();
}

// 7. ESTOQUE FEFO VISUALIZATION
function renderEstoque() {
    const lotes = DB.get('lotes_estoque') || [];
    const produtos = DB.get('produtos') || [];
    const tbody = document.getElementById('table-estoque-body');
    tbody.innerHTML = '';

    lotes.forEach(l => {
        const p = produtos.find(item => item.id === l.produto_id);
        if (!p) return;

        const expDate = new Date(l.data_vencimento);
        const hoje = new Date();
        const diffDays = Math.ceil((expDate - hoje) / (1000 * 60 * 60 * 24));

        let badgeHTML = '';
        if (l.status === 'Esgotado') {
            badgeHTML = `<span class="validade-badge" style="background:rgba(255,255,255,0.05); color:var(--text-muted);">Esgotado</span>`;
        } else if (diffDays < 0) {
            badgeHTML = `<span class="validade-badge vencido">Vencido (${Math.abs(diffDays)} dias atrás)</span>`;
        } else if (diffDays <= 15) {
            badgeHTML = `<span class="validade-badge vencendo">Crítico (Vence em ${diffDays} dias)</span>`;
        } else {
            badgeHTML = `<span class="validade-badge em-dia">Em dia (${diffDays} dias)</span>`;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${p.nome}</strong></td>
            <td><code>${l.lote}</code></td>
            <td>${l.quantidade} un</td>
            <td>${l.data_vencimento.split('-').reverse().join('/')}</td>
            <td>${badgeHTML}</td>
        `;
        tbody.appendChild(tr);
    });
}

// 8. TAXI DOG DRIVER MOBILE VIEW
function renderTaxiDog() {
    const kanbanData = DB.get('agendamentos_kanban') || [];
    const pets = DB.get('pets') || [];
    const clientes = DB.get('clientes') || [];
    
    const taxiJobs = kanbanData.filter(k => k.status === 'Em Rota de Busca' || k.status === 'Pronto');
    const container = document.getElementById('taxi-job-list');
    container.innerHTML = '';

    if (taxiJobs.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-muted);">Nenhum serviço de entrega/coleta pendente.</div>`;
        return;
    }

    taxiJobs.forEach(job => {
        const pet = pets.find(p => p.id === job.pet_id);
        const cliente = clientes.find(c => c.id === pet.cliente_id);
        const especieIcon = pet.especie === 'Gato' ? '🐱' : '🐶';

        const card = document.createElement('div');
        card.className = 'driver-card';
        
        let headerLabel = job.status === 'Em Rota de Busca' ? '📌 Coleta no Tutor' : '🚚 Devolução ao Tutor';
        let actionLabel = job.status === 'Em Rota de Busca' ? 'Confirmar Chegada na Loja' : 'Confirmar Entrega GPS';

        card.innerHTML = `
            <div style="font-weight:700; color:#818cf8; margin-bottom:0.5rem;">${headerLabel}</div>
            <div style="font-size:1.1rem; font-weight:600; margin-bottom:0.25rem;">Pet: ${especieIcon} ${pet.nome} (${pet.raca})</div>
            <div style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:0.75rem;">Tutor: ${cliente.nome} | Tel: ${cliente.telefone}</div>
            <div style="font-size:0.85rem; color:var(--text-muted); background:rgba(0,0,0,0.2); padding:0.5rem; border-radius:6px; margin-bottom:0.75rem;">
                📍 ${cliente.endereco}
            </div>

            <div class="driver-gps-display" id="gps-display-${job.id}">
                <span>GPS: Aguardando captura...</span>
            </div>

            <div class="camera-preview-container" id="camera-container-${job.id}">
                <div class="camera-placeholder" id="placeholder-${job.id}">
                    <span>📸</span> Sem foto anexada
                </div>
                <video id="video-${job.id}" style="display:none;" autoplay playsinline></video>
                <img id="img-preview-${job.id}" style="display:none;" />
            </div>

            <div class="driver-btn-group">
                <button class="btn-mobile-secondary" onclick="capturarLocalizacao(${job.id})">📍 Capturar GPS</button>
                <button class="btn-mobile-secondary" onclick="capturarFoto(${job.id})">📷 Abrir Câmera</button>
            </div>
            
            <button class="btn-mobile-primary" style="width:100%; margin-top:0.75rem;" onclick="finalizarEntregaTaxi(${job.id}, '${job.status}')">
                ✅ ${actionLabel}
            </button>
        `;
        container.appendChild(card);
    });
}

function capturarLocalizacao(jobId) {
    const display = document.getElementById(`gps-display-${jobId}`);
    if (!navigator.geolocation) {
        display.innerHTML = `<span>❌ GPS não suportado</span>`;
        return;
    }

    display.innerHTML = `<span>⏳ Obtendo coordenadas...</span>`;

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude.toFixed(6);
            const lng = position.coords.longitude.toFixed(6);
            display.innerHTML = `<span>✅ Capturado: Lat ${lat}, Lng ${lng}</span>`;
            
            const kanbanData = DB.get('agendamentos_kanban');
            const item = kanbanData.find(k => k.id === jobId);
            if (item) {
                item.latitude_entrega = lat;
                item.longitude_entrega = lng;
                DB.set('agendamentos_kanban', kanbanData);
            }
            State.showToast("Coordenadas GPS registradas com sucesso!", "success");
        },
        (error) => {
            console.error(error);
            const mockLat = "-23.56" + Math.floor(Math.random() * 900 + 100);
            const mockLng = "-46.65" + Math.floor(Math.random() * 900 + 100);
            display.innerHTML = `<span>⚠️ Mock GPS: Lat ${mockLat}, Lng ${mockLng}</span>`;
            
            const kanbanData = DB.get('agendamentos_kanban');
            const item = kanbanData.find(k => k.id === jobId);
            if (item) {
                item.latitude_entrega = mockLat;
                item.longitude_entrega = mockLng;
                DB.set('agendamentos_kanban', kanbanData);
            }
            State.showToast("GPS Permitido como MOCK (Permissão negada no navegador)", "warning");
        }
    );
}

function capturarFoto(jobId) {
    const video = document.getElementById(`video-${jobId}`);
    const placeholder = document.getElementById(`placeholder-${jobId}`);
    const imgPreview = document.getElementById(`img-preview-${jobId}`);

    if (State.cameraStream) {
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const photoData = canvas.toDataURL('image/jpeg');
        imgPreview.src = photoData;
        imgPreview.style.display = 'block';
        video.style.display = 'none';
        
        State.cameraStream.getTracks().forEach(track => track.stop());
        State.cameraStream = null;
        
        const kanbanData = DB.get('agendamentos_kanban');
        const item = kanbanData.find(k => k.id === jobId);
        if (item) {
            item.foto_comprovante_url = photoData;
            DB.set('agendamentos_kanban', kanbanData);
        }
        
        State.showToast("Foto do Pet na caixa de transporte salva!", "success");
    } else {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then(stream => {
                State.cameraStream = stream;
                video.srcObject = stream;
                video.style.display = 'block';
                placeholder.style.display = 'none';
                imgPreview.style.display = 'none';
            })
            .catch(err => {
                console.error(err);
                const fallbackImg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231e293b'/><circle cx='50' cy='50' r='20' fill='%2310b981'/><text x='50' y='55' font-size='8' fill='white' text-anchor='middle'>PET_OK</text></svg>";
                imgPreview.src = fallbackImg;
                imgPreview.style.display = 'block';
                placeholder.style.display = 'none';
                
                const kanbanData = DB.get('agendamentos_kanban');
                const item = kanbanData.find(k => k.id === jobId);
                if (item) {
                    item.foto_comprovante_url = fallbackImg;
                    DB.set('agendamentos_kanban', kanbanData);
                }
                State.showToast("Câmera emulada (Sem permissão de hardware)", "warning");
            });
    }
}

function finalizarEntregaTaxi(jobId, currentStatus) {
    const kanbanData = DB.get('agendamentos_kanban');
    const item = kanbanData.find(k => k.id === jobId);
    if (!item) return;

    if (!item.latitude_entrega) {
        State.showToast("Por favor, capture o GPS antes de confirmar a entrega/coleta!", "error");
        return;
    }

    if (currentStatus === 'Em Rota de Busca') {
        handleStatusTransition(jobId, 'Aguardando Banho');
    } else {
        handleStatusTransition(jobId, 'Entregue');
    }
    
    renderTaxiDog();
}

// 9. DASHBOARD ANALYTICS (PANDAS-LIKE)
function renderAnalytics() {
    const contas = DB.get('contas_receber') || [];
    const kanban = DB.get('agendamentos_kanban') || [];
    const lotes = DB.get('lotes_estoque') || [];

    const faturamentoBruto = contas
        .filter(c => c.status === 'Pago')
        .reduce((acc, curr) => acc + curr.valor, 0);

    const ticketMedio = contas.length > 0 ? (faturamentoBruto / contas.length) : 0;

    const hoje = new Date();
    const lotesCriticos = lotes.filter(l => {
        if (l.status === 'Esgotado') return false;
        const diffDays = Math.ceil((new Date(l.data_vencimento) - hoje) / (1000 * 60 * 60 * 24));
        return diffDays <= 15;
    }).length;

    const servicosConcluidos = kanban.filter(k => k.status === 'Pronto' || k.status === 'Entregue').length;

    document.getElementById('stat-faturamento').innerText = `R$ ${faturamentoBruto.toFixed(2)}`;
    document.getElementById('stat-ticket').innerText = `R$ ${ticketMedio.toFixed(2)}`;
    document.getElementById('stat-concluidos').innerText = `${servicosConcluidos} pets`;
    document.getElementById('stat-criticos').innerText = `${lotesCriticos} lotes`;

    const tableBody = document.getElementById('table-receitas-body');
    tableBody.innerHTML = '';
    
    contas.slice().reverse().forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${new Date(c.data).toLocaleDateString('pt-BR')}</td>
            <td>${c.descricao}</td>
            <td><span class="validade-badge em-dia">${c.origem}</span></td>
            <td style="color:#10b981; font-weight:700;">+ R$ ${c.valor.toFixed(2)}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// 10. EVENT BINDING FOR INITIAL LOAD
window.addEventListener('DOMContentLoaded', () => {
    const profileSelector = document.getElementById('current-profile-select');
    profileSelector.addEventListener('change', (e) => {
        applyRBAC(e.target.value);
    });

    applyRBAC('Admin');
});
