// 🐾 PataForma Database & App Engine (Local Storage Sim) - B2B Multi-Tenant & Master SaaS

// 1. DATA INITIALIZATION & LOCALSTORAGE MANAGER
const DB = {
    get: (key) => JSON.parse(localStorage.getItem(`pataforma_${key}`)),
    set: (key, data) => localStorage.setItem(`pataforma_${key}`, JSON.stringify(data)),
    
    logAudit: (empresaId, usuario, acao, detalhe) => {
        const logs = DB.get('logs_auditoria') || [];
        logs.push({
            id: logs.length + 1,
            empresa_id: empresaId,
            usuario: usuario || 'Sistema',
            acao: acao,
            detalhe: detalhe,
            timestamp: new Date().toISOString()
        });
        DB.set('logs_auditoria', logs);
    },

    init: () => {
        if (!DB.get('empresas')) {
            DB.set('empresas', [
                {
                    id: 1,
                    nome: "Pet Shop PataForma Matriz",
                    cnpj: "12.345.678/0001-95",
                    responsavel: "Carlos Vitorio",
                    plano: "Enterprise VIP",
                    status: "Ativo",
                    modulos: { kanban: true, taxi_dog: true, caixa: true, estoque: true, assinaturas: true, analytics: true }
                },
                {
                    id: 2,
                    nome: "PetCare & Grooming Moema",
                    cnpj: "98.765.432/0001-10",
                    responsavel: "Fernando Lima",
                    plano: "Pro",
                    status: "Ativo",
                    modulos: { kanban: true, taxi_dog: false, caixa: true, estoque: true, assinaturas: true, analytics: false }
                },
                {
                    id: 3,
                    nome: "Estética Canina & Felina Jardins",
                    cnpj: "55.444.333/0001-88",
                    responsavel: "Beatriz Santos",
                    plano: "Basic",
                    status: "Ativo",
                    modulos: { kanban: true, taxi_dog: true, caixa: false, estoque: false, assinaturas: false, analytics: false }
                }
            ]);
        }

        if (!DB.get('usuarios')) {
            DB.set('usuarios', [
                { id: 1, empresa_id: 1, nome: "Admin Dono", perfil: "Admin", email: "admin@pataforma.com", kanban: true, taxi_dog: true, caixa: true, qc: true, cargo: "Gerente Geral" },
                { id: 2, empresa_id: 1, nome: "Juliana Esteticista", perfil: "Supervisor", email: "juliana@pataforma.com", kanban: true, taxi_dog: false, caixa: true, qc: true, cargo: "Supervisora de Estética" },
                { id: 3, empresa_id: 1, nome: "Marcos Recepção", perfil: "Recepcao", email: "marcos@pataforma.com", kanban: true, taxi_dog: false, caixa: true, qc: false, cargo: "Atendente" },
                { id: 4, empresa_id: 1, nome: "Tiago Banhista", perfil: "Banhista", email: "tiago@pataforma.com", kanban: true, taxi_dog: false, caixa: false, qc: false, cargo: "Banhista Sênior" },
                { id: 5, empresa_id: 1, nome: "Lucas Entregador", perfil: "Entregador", email: "lucas@pataforma.com", kanban: false, taxi_dog: true, caixa: false, qc: false, cargo: "Motorista Táxi Dog" },
                { id: 6, empresa_id: 2, nome: "Fernando Moema", perfil: "Admin", email: "fernando@moema.com", kanban: true, taxi_dog: false, caixa: true, qc: true, cargo: "Proprietário" }
            ]);
        }

        if (!DB.get('clientes')) {
            DB.set('clientes', [
                { id: 1, empresa_id: 1, nome: "Carlos Souza", telefone: "(11) 98888-7777", email: "carlos@gmail.com", endereco: "Av. Paulista, 1000 - Ap 42", lat_lng: "-23.5614,-46.6558", ultima_visita: "2026-07-28" },
                { id: 2, empresa_id: 1, nome: "Mariana Lima", telefone: "(11) 97777-6666", email: "mariana@gmail.com", endereco: "Rua Augusta, 450", lat_lng: "-23.5512,-46.6521", ultima_visita: "2026-08-01" },
                { id: 3, empresa_id: 1, nome: "Roberto Alves", telefone: "(11) 96666-5555", email: "roberto@gmail.com", endereco: "Alameda Lorena, 89", lat_lng: "-23.5678,-46.6610", ultima_visita: "2026-08-03" },
                { id: 4, empresa_id: 2, nome: "Patricia Moema", telefone: "(11) 95555-4444", email: "patricia@gmail.com", endereco: "Alameda dos Maracatins, 300", lat_lng: "-23.6012,-46.6601", ultima_visita: "2026-08-02" }
            ]);
        }

        if (!DB.get('pets')) {
            DB.set('pets', [
                { id: 1, empresa_id: 1, cliente_id: 1, nome: "Thor", especie: "Cachorro", raca: "Golden Retriever", porte: "Grande", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Alergia a shampoo de coco." },
                { id: 2, empresa_id: 1, cliente_id: 2, nome: "Luna", especie: "Cachorro", raca: "Shih Tzu", porte: "Pequeno", temperamento: "Arisco", vacinas_em_dia: true, observacoes: "Muito sensível no ouvido esquerdo." },
                { id: 3, empresa_id: 1, cliente_id: 3, nome: "Max", especie: "Cachorro", raca: "Rottweiler", porte: "Grande", temperamento: "Agressivo", vacinas_em_dia: false, observacoes: "Exige uso de focinheira na banheira." },
                { id: 4, empresa_id: 1, cliente_id: 2, nome: "Mingau", especie: "Gato", raca: "Persa", porte: "Pequeno", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Gato Persa pelagem longa. Secagem em temperatura amena." },
                { id: 5, empresa_id: 2, cliente_id: 4, nome: "Bob", especie: "Cachorro", raca: "Pug", porte: "Pequeno", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Pug com focinho curto. Monitorar secagem." }
            ]);
        }

        if (!DB.get('planos_assinatura')) {
            DB.set('planos_assinatura', [
                { id: 1, empresa_id: 1, nome: "Plano Mensal Gold (4 Banhos + Tosa)", descricao: "4 banhos mensais + 1 tosa completa com banho antipulgas incluso.", preco: 240.00, periodicidade: "Mensal", quantidade_banhos: 4, inclui_tosa: true },
                { id: 2, empresa_id: 1, nome: "Plano VIP Semanal", descricao: "1 banho por semana com secagem rápida e perfume importado.", preco: 65.00, periodicidade: "Semanal", quantidade_banhos: 1, inclui_tosa: false },
                { id: 3, empresa_id: 1, nome: "Assinatura Felina Premium", descricao: "2 banhos mensais higiênicos + escovação de pelagem para gatos.", preco: 150.00, periodicidade: "Mensal", quantidade_banhos: 2, inclui_tosa: false },
                { id: 4, empresa_id: 1, nome: "Plano Anual Pet Care VIP", descricao: "Assinatura anual ilimitada de higiene, hidratação e prioridade no Táxi Dog.", preco: 2150.00, periodicidade: "Anual", quantidade_banhos: 48, inclui_tosa: true }
            ]);
        }

        if (!DB.get('servicos')) {
            DB.set('servicos', [
                { id: 1, empresa_id: 1, nome: "Banho & Secagem", descricao: "Banho completo, secagem, corte de unhas e limpeza de ouvidos.", preco: 70.00, duracao: 45 },
                { id: 2, empresa_id: 1, nome: "Tosa Completa", descricao: "Banho completo + Tosa com máquina e tesoura na pelagem inteira.", preco: 120.00, duracao: 90 },
                { id: 3, empresa_id: 1, nome: "Banho Antipulgas", descricao: "Banho com shampoo ectoparasiticida especial.", preco: 95.00, duracao: 60 },
                { id: 4, empresa_id: 1, nome: "Banho & Escovação Felina", descricao: "Banho especial para gatos com secagem silenciosa sem estresse.", preco: 85.00, duracao: 50 },
                { id: 5, empresa_id: 2, nome: "Banho Moema Premium", descricao: "Banho especial PetCare Moema.", preco: 80.00, duracao: 45 }
            ]);
        }

        if (!DB.get('produtos')) {
            DB.set('produtos', [
                { id: 1, empresa_id: 1, nome: "Ração Premium Cães Adultos 10kg", codigo_barras: "78910001", preco: 189.90, categoria: "Ração", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23818cf8'><rect width='100' height='100' fill='%231e293b'/><circle cx='50' cy='50' r='30'/><text x='50' y='55' font-size='10' fill='white' text-anchor='middle'>RAÇÃO</text></svg>" },
                { id: 2, empresa_id: 1, nome: "Shampoo Hipoalergênico 500ml", codigo_barras: "78910002", preco: 45.00, categoria: "Higiene", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23c084fc'><rect width='100' height='100' fill='%231e293b'/><rect x='35' y='20' width='30' height='60' rx='5'/><text x='50' y='55' font-size='10' fill='white' text-anchor='middle'>SHAMP</text></svg>" },
                { id: 3, empresa_id: 1, nome: "Petisco a Granel (Biscoito Canino 100g)", codigo_barras: null, preco: 12.50, categoria: "Petiscos", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23fbbf24'><rect width='100' height='100' fill='%231e293b'/><path d='M30,50 C30,40 40,30 50,30 C60,30 70,40 70,50 C40,70 30,60 30,50 Z'/><text x='50' y='55' font-size='10' fill='white' text-anchor='middle'>COOKS</text></svg>" },
                { id: 4, empresa_id: 1, nome: "Lacinhos Artesanais (Kit 4 un)", codigo_barras: null, preco: 8.00, categoria: "Acessórios", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%23ec4899'><rect width='100' height='100' fill='%231e293b'/><polygon points='20,30 80,30 50,60'/><polygon points='20,70 80,70 50,40'/><circle cx='50' cy='50' r='10'/></svg>" }
            ]);
        }

        if (!DB.get('lotes_estoque')) {
            const hoje = new Date();
            const vencendo = new Date(hoje); vencendo.setDate(hoje.getDate() + 5);
            const vencido = new Date(hoje); vencido.setDate(hoje.getDate() - 10);
            const emDia = new Date(hoje); emDia.setDate(hoje.getDate() + 120);

            DB.set('lotes_estoque', [
                { id: 1, empresa_id: 1, produto_id: 1, lote: "L-RAC01", quantidade: 3, data_vencimento: vencendo.toISOString().split('T')[0], status: "Disponivel" },
                { id: 2, empresa_id: 1, produto_id: 1, lote: "L-RAC02", quantidade: 10, data_vencimento: emDia.toISOString().split('T')[0], status: "Disponivel" },
                { id: 3, empresa_id: 1, produto_id: 2, lote: "L-SH01", quantidade: 5, data_vencimento: emDia.toISOString().split('T')[0], status: "Disponivel" },
                { id: 4, empresa_id: 1, produto_id: 3, lote: "L-PT01", quantidade: 2, data_vencimento: vencido.toISOString().split('T')[0], status: "Disponivel" },
                { id: 5, empresa_id: 1, produto_id: 3, lote: "L-PT02", quantidade: 15, data_vencimento: emDia.toISOString().split('T')[0], status: "Disponivel" }
            ]);
        }

        if (!DB.get('pacotes_ativos')) {
            DB.set('pacotes_ativos', [
                { id: 1, empresa_id: 1, cliente_id: 1, plano_id: 1, quantidade_banhos: 4, data_aquisicao: "2026-08-01", status: "Ativo" },
                { id: 2, empresa_id: 1, cliente_id: 2, plano_id: 2, quantidade_banhos: 0, data_aquisicao: "2026-07-15", status: "Renovação Pendente" }
            ]);
        }

        if (!DB.get('agendamentos_kanban')) {
            DB.set('agendamentos_kanban', [
                { id: 1, empresa_id: 1, pet_id: 1, servico_id: 1, status: "Agendado", data_agendamento: "2026-08-04T10:00:00", possui_ectoparasitas: false, adicional_desembolo: 0, qc_aprovado: false, latitude_entrega: null, longitude_entrega: null, foto_comprovante_url: null },
                { id: 2, empresa_id: 1, pet_id: 2, servico_id: 2, status: "Aguardando Banho", data_agendamento: "2026-08-04T11:30:00", possui_ectoparasitas: false, adicional_desembolo: 0, qc_aprovado: false, latitude_entrega: null, longitude_entrega: null, foto_comprovante_url: null },
                { id: 3, empresa_id: 1, pet_id: 3, servico_id: 1, status: "Em Rota de Busca", data_agendamento: "2026-08-04T09:00:00", possui_ectoparasitas: false, adicional_desembolo: 0, qc_aprovado: false, latitude_entrega: null, longitude_entrega: null, foto_comprovante_url: null },
                { id: 4, empresa_id: 1, pet_id: 4, servico_id: 4, status: "Agendado", data_agendamento: "2026-08-04T14:00:00", possui_ectoparasitas: false, adicional_desembolo: 0, qc_aprovado: false, latitude_entrega: null, longitude_entrega: null, foto_comprovante_url: null },
                { id: 5, empresa_id: 2, pet_id: 5, servico_id: 5, status: "Agendado", data_agendamento: "2026-08-04T15:00:00", possui_ectoparasitas: false, adicional_desembolo: 0, qc_aprovado: false, latitude_entrega: null, longitude_entrega: null, foto_comprovante_url: null }
            ]);
        }

        if (!DB.get('contas_receber')) DB.set('contas_receber', []);
        if (!DB.get('movimentacoes_caixa')) {
            DB.set('movimentacoes_caixa', [
                { id: 1, empresa_id: 1, tipo: "ENTRADA", categoria: "Venda Balcão", descricao: "Venda Ração Carlos", valor: 189.90, data: "2026-08-04T14:30:00" },
                { id: 2, empresa_id: 1, tipo: "SAIDA", categoria: "Estoque", descricao: "Compra Fornecedor Shampoo", valor: 150.00, data: "2026-08-04T10:00:00" }
            ]);
        }

        if (!DB.get('logs_auditoria')) {
            DB.set('logs_auditoria', [
                { id: 1, empresa_id: 1, usuario: "Sistema Master", acao: "Inicialização SaaS", detalhe: "Plataforma B2B Multi-Tenant inicializada com sucesso", timestamp: new Date().toISOString() }
            ]);
        }
    }
};

// Start DB
DB.init();

// 2. STATE ENGINE
const State = {
    currentEmpresaId: 1,
    isMasterSuperAdmin: false,
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

// 3. MASTER AUTHENTICATION & MULTI-TENANT SWITCHER
function loginMasterSubmit(e) {
    e.preventDefault();
    const user = document.getElementById('input-master-user').value.trim();
    const pass = document.getElementById('input-master-pass').value.trim();

    if (user === 'pataforma' && pass === 'abc@123') {
        State.isMasterSuperAdmin = true;
        document.getElementById('master-top-bar').style.display = 'flex';
        document.getElementById('nav-master-saas').style.display = 'flex';
        closeModal('modal-login-master');
        
        DB.logAudit(State.currentEmpresaId, 'Master Super-Admin', 'Autenticação Master', 'Login Master realizado com sucesso');
        State.showToast("👑 Autenticado como Master Super-Admin PataForma!", "success");
        
        renderEmpresasSelector();
        switchTab('master-saas');
    } else {
        State.showToast("❌ Credenciais Master incorretas!", "error");
    }
}

function logoutMaster() {
    State.isMasterSuperAdmin = false;
    document.getElementById('master-top-bar').style.display = 'none';
    document.getElementById('nav-master-saas').style.display = 'none';
    switchTab('kanban');
    State.showToast("Sessão Master encerrada.", "info");
}

function renderEmpresasSelector() {
    const empresas = DB.get('empresas') || [];
    const selector = document.getElementById('select-empresa-ativa');
    if (!selector) return;

    selector.innerHTML = '';
    empresas.forEach(emp => {
        selector.innerHTML += `<option value="${emp.id}" ${emp.id === State.currentEmpresaId ? 'selected' : ''}>🏢 ${emp.nome} (${emp.plano})</option>`;
    });
}

function trocarEmpresaAtiva(empresaId) {
    State.currentEmpresaId = parseInt(empresaId);
    const emp = DB.get('empresas').find(e => e.id === State.currentEmpresaId);
    
    const companyHeader = document.getElementById('current-company-name');
    if (companyHeader) companyHeader.innerText = emp ? emp.nome : 'PataForma';

    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Troca de Tenant', `Contexto alterado para ${emp.nome}`);
    
    applyRBAC(State.currentProfile);
    State.showToast(`Contexto alterado para a empresa: ${emp.nome}`, 'info');
}


// 4. RBAC & TENANT MODULE VISIBILITY CONTROL
function applyRBAC(profileName) {
    State.currentProfile = profileName;
    const users = DB.get('usuarios').filter(u => u.empresa_id === State.currentEmpresaId);
    const userDef = users.find(u => u.perfil === profileName) || users[0] || { kanban: true, caixa: true, taxi_dog: true, qc: true };
    
    const empresa = DB.get('empresas').find(e => e.id === State.currentEmpresaId) || { modulos: { kanban: true, taxi_dog: true, caixa: true, estoque: true, assinaturas: true, analytics: true } };

    const navKanban = document.getElementById('nav-kanban');
    const navCaixa = document.getElementById('nav-caixa');
    const navEstoque = document.getElementById('nav-estoque');
    const navAnalytics = document.getElementById('nav-analytics');
    const navTaxi = document.getElementById('nav-taxi');
    const navClientes = document.getElementById('nav-clientes-pets');
    const navProdutos = document.getElementById('nav-produtos');
    const navEquipe = document.getElementById('nav-equipe');
    const navAssinaturas = document.getElementById('nav-assinaturas');

    navKanban.style.display = (empresa.modulos.kanban && userDef.kanban) ? 'flex' : 'none';
    navCaixa.style.display = (empresa.modulos.caixa && userDef.caixa) ? 'flex' : 'none';
    navEstoque.style.display = (empresa.modulos.estoque && (profileName === 'Admin' || profileName === 'Supervisor')) ? 'flex' : 'none';
    navAnalytics.style.display = (empresa.modulos.analytics && profileName === 'Admin') ? 'flex' : 'none';
    navTaxi.style.display = (empresa.modulos.taxi_dog && userDef.taxi_dog) ? 'flex' : 'none';
    navClientes.style.display = (profileName === 'Admin' || profileName === 'Recepcao' || profileName === 'Supervisor') ? 'flex' : 'none';
    navProdutos.style.display = (profileName === 'Admin' || profileName === 'Recepcao' || profileName === 'Supervisor') ? 'flex' : 'none';
    navEquipe.style.display = profileName === 'Admin' ? 'flex' : 'none';
    navAssinaturas.style.display = (empresa.modulos.assinaturas && (profileName === 'Admin' || profileName === 'Recepcao')) ? 'flex' : 'none';

    renderEmpresasSelector();
}

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
    if (tabId === 'clientes-pets') { renderClientesTable(); renderPetsTable(); }
    if (tabId === 'produtos') renderProdutosCrudTable();
    if (tabId === 'equipe') renderFuncionariosTable();
    if (tabId === 'assinaturas') renderAssinaturasCards();
    if (tabId === 'master-saas') renderMasterPanel();
}


// 5. KANBAN ENGINE
const STATUS_LIST = ['Agendado', 'Em Rota de Busca', 'Aguardando Banho', 'No Banho', 'Em Tosa', 'Inspecao QC', 'Pronto', 'Entregue'];

function renderKanban() {
    const kanbanData = (DB.get('agendamentos_kanban') || []).filter(k => k.empresa_id === State.currentEmpresaId);
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
                <span class="pet-tag">👤 Tutor: ${DB.get('clientes').find(c => c.id === pet.cliente_id)?.nome || 'Tutor'}</span>
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
    const kanbanData = (DB.get('agendamentos_kanban') || []).filter(k => k.empresa_id === State.currentEmpresaId);
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
        const pacote = DB.get('pacotes_ativos').find(p => p.empresa_id === State.currentEmpresaId && p.cliente_id === cliente.id && p.quantidade_banhos > 0);

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
                empresa_id: State.currentEmpresaId,
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
                empresa_id: State.currentEmpresaId,
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
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Transição Kanban', `Pet ${pet.nome} movido de ${oldStatus} para ${newStatus}`);
    
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
    
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Triagem Exceção', `Relatado Ectoparasita no agendamento #${id}`);
    renderKanban();
    State.showToast(`🚨 Triagem: Ectoparasitas relatados! Orçamento de R$ 25,00 adicionais gerado e enviado ao tutor via WhatsApp.`, 'warning');
}

function inspeccionarQC(id) {
    const kanbanData = DB.get('agendamentos_kanban');
    const item = kanbanData.find(k => k.id === id);
    if (!item) return;

    item.qc_aprovado = true;
    DB.set('agendamentos_kanban', kanbanData);
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Aprovação QC', `Inspeção de Qualidade aprovada para agendamento #${id}`);
    
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
Tutor: ${cliente ? cliente.nome : 'Sem tutor'} (${cliente ? cliente.telefone : ''})
Endereço: ${cliente ? cliente.endereco : ''}

Serviço: ${servico.nome}
Preço Base: R$ ${servico.preco.toFixed(2)}
Adicionais: R$ ${item.adicional_desembolo.toFixed(2)}
QC Aprovado: ${item.qc_aprovado ? 'Sim' : 'Não'}
Status Atual: ${item.status}
GPS de Entrega: ${item.latitude_entrega ? `${item.latitude_entrega}, ${item.longitude_entrega}` : 'Não registrado'}`);
}


// 6. MASTER SAAS PANEL & AUDIT RENDERERS
function renderMasterPanel() {
    renderEmpresasTable();
    renderAuditoriaTable();
}

function renderEmpresasTable() {
    const empresas = DB.get('empresas') || [];
    const tbody = document.getElementById('table-empresas-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    empresas.forEach(emp => {
        const modulosBadge = Object.keys(emp.modulos).filter(m => emp.modulos[m]).join(', ');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${emp.nome}</strong></td>
            <td><code>${emp.cnpj}</code></td>
            <td>${emp.responsavel}</td>
            <td><span class="validade-badge em-dia">${emp.plano}</span></td>
            <td><span class="validade-badge ${emp.status === 'Ativo' ? 'em-dia' : 'vencido'}">${emp.status}</span></td>
            <td style="font-size:0.75rem; color:var(--text-secondary);">${modulosBadge}</td>
            <td>
                <button class="card-btn" onclick="trocarEmpresaAtiva(${emp.id})">🔍 Acessar PetShop</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderAuditoriaTable() {
    const logs = DB.get('logs_auditoria') || [];
    const empresas = DB.get('empresas') || [];
    const tbody = document.getElementById('table-auditoria-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    logs.slice().reverse().forEach(log => {
        const emp = empresas.find(e => e.id === log.empresa_id);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${new Date(log.timestamp).toLocaleString('pt-BR')}</td>
            <td><strong>${emp ? emp.nome : 'Global'}</strong></td>
            <td><span class="validade-badge em-dia">${log.usuario}</span></td>
            <td><strong>${log.acao}</strong></td>
            <td style="font-size:0.8rem; color:var(--text-secondary);">${log.detalhe}</td>
        `;
        tbody.appendChild(tr);
    });
}

function salvarEmpresa(e) {
    e.preventDefault();
    const nome = document.getElementById('input-emp-nome').value;
    const cnpj = document.getElementById('input-emp-cnpj').value;
    const responsavel = document.getElementById('input-emp-responsavel').value;
    const plano = document.getElementById('select-emp-plano').value;
    const status = document.getElementById('select-emp-status').value;

    const modulos = {
        kanban: document.getElementById('check-emp-kanban').checked,
        taxi_dog: document.getElementById('check-emp-taxi').checked,
        caixa: document.getElementById('check-emp-caixa').checked,
        estoque: document.getElementById('check-emp-estoque').checked,
        assinaturas: document.getElementById('check-emp-assinaturas').checked,
        analytics: document.getElementById('check-emp-analytics').checked
    };

    const empresas = DB.get('empresas');
    const newId = empresas.length > 0 ? Math.max(...empresas.map(e => e.id)) + 1 : 1;

    empresas.push({ id: newId, nome, cnpj, responsavel, plano, status, modulos });
    DB.set('empresas', empresas);

    DB.logAudit(newId, 'Master Super-Admin', 'Criação de Tenant', `Nova empresa cadastrada: ${nome} (Plano ${plano})`);

    closeModal('modal-empresa');
    renderMasterPanel();
    renderEmpresasSelector();
    State.showToast(`🏢 Empresa ${nome} cadastrada com sucesso no SaaS Master!`, 'success');
}


// 7. CRUD REGISTRATION MODULES (FILTERED BY TENANT)
function renderClientesTable() {
    const clientes = (DB.get('clientes') || []).filter(c => c.empresa_id === State.currentEmpresaId);
    const pets = DB.get('pets') || [];
    const tbody = document.getElementById('table-clientes-body');
    if (!tbody) return;
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
    const pets = (DB.get('pets') || []).filter(p => p.empresa_id === State.currentEmpresaId);
    const clientes = DB.get('clientes') || [];
    const tbody = document.getElementById('table-pets-body');
    if (!tbody) return;
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
    const usuarios = (DB.get('usuarios') || []).filter(u => u.empresa_id === State.currentEmpresaId);
    const tbody = document.getElementById('table-funcionarios-body');
    if (!tbody) return;
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
    const produtos = (DB.get('produtos') || []).filter(p => p.empresa_id === State.currentEmpresaId);
    const lotes = DB.get('lotes_estoque') || [];
    const tbody = document.getElementById('table-produtos-body');
    if (!tbody) return;
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
            <td><button class="card-btn" onclick="openModal('modal-produto')">+ Lote FEFO</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function renderAssinaturasCards() {
    const planos = (DB.get('planos_assinatura') || []).filter(p => p.empresa_id === State.currentEmpresaId);
    const container = document.getElementById('planos-cards-container');
    if (!container) return;
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

    populateSelectOptions();
}

function populateSelectOptions() {
    const clientes = (DB.get('clientes') || []).filter(c => c.empresa_id === State.currentEmpresaId);
    const pets = (DB.get('pets') || []).filter(p => p.empresa_id === State.currentEmpresaId);
    const servicos = (DB.get('servicos') || []).filter(s => s.empresa_id === State.currentEmpresaId);

    const petSelect = document.getElementById('select-agendar-pet');
    if (petSelect) {
        petSelect.innerHTML = '';
        pets.forEach(p => {
            const cliente = clientes.find(c => c.id === p.cliente_id);
            petSelect.innerHTML += `<option value="${p.id}">${p.especie === 'Gato' ? '🐱' : '🐶'} ${p.nome} (Tutor: ${cliente ? cliente.nome : 'Sem tutor'})</option>`;
        });
    }

    const servicoSelect = document.getElementById('select-agendar-servico');
    if (servicoSelect) {
        servicoSelect.innerHTML = '';
        servicos.forEach(s => {
            servicoSelect.innerHTML += `<option value="${s.id}">${s.nome} - R$ ${s.preco.toFixed(2)}</option>`;
        });
    }

    const clienteSubSelect = document.getElementById('select-assinar-cliente');
    if (clienteSubSelect) {
        clienteSubSelect.innerHTML = '';
        clientes.forEach(c => {
            clienteSubSelect.innerHTML += `<option value="${c.id}">${c.nome} (${c.telefone})</option>`;
        });
    }
}


// Save Handlers
function salvarCliente(e) {
    e.preventDefault();
    const nome = document.getElementById('input-cliente-nome').value;
    const telefone = document.getElementById('input-cliente-tel').value;
    const email = document.getElementById('input-cliente-email').value;
    const endereco = document.getElementById('input-cliente-endereco').value;

    const clientes = DB.get('clientes');
    const newId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;

    clientes.push({ id: newId, empresa_id: State.currentEmpresaId, nome, telefone, email, endereco, lat_lng: "-23.5505,-46.6333", ultima_visita: new Date().toISOString().split('T')[0] });
    DB.set('clientes', clientes);

    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Cadastro Cliente', `Cliente ${nome} cadastrado`);

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

    pets.push({ id: newId, empresa_id: State.currentEmpresaId, cliente_id, nome, especie, raca, porte, temperamento, vacinas_em_dia, observacoes });
    DB.set('pets', pets);

    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Cadastro Pet', `Pet ${nome} (${especie}) cadastrado`);

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

    usuarios.push({ id: newId, empresa_id: State.currentEmpresaId, nome, email, cargo, perfil, kanban, caixa, taxi_dog, qc });
    DB.set('usuarios', usuarios);

    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Cadastro Funcionario', `Funcionário ${nome} (${perfil}) cadastrado`);

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

    produtos.push({ id: newProdId, empresa_id: State.currentEmpresaId, nome, categoria, codigo_barras, preco, foto });
    
    const newLoteId = lotes.length > 0 ? Math.max(...lotes.map(l => l.id)) + 1 : 1;
    lotes.push({
        id: newLoteId,
        empresa_id: State.currentEmpresaId,
        produto_id: newProdId,
        lote: `L-${newProdId}01`,
        quantidade: qtdInicial,
        data_vencimento: vencimento,
        status: "Disponivel"
    });

    DB.set('produtos', produtos);
    DB.set('lotes_estoque', lotes);

    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Cadastro Produto', `Produto ${nome} cadastrado com lote de estoque`);

    closeModal('modal-produto');
    renderProdutosCrudTable();
    State.showToast(`Produto ${nome} cadastrado com lote inicial de estoque!`, 'success');
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

    planos.push({ id: newId, empresa_id: State.currentEmpresaId, nome, preco, periodicidade, quantidade_banhos, inclui_tosa, descricao });
    DB.set('planos_assinatura', planos);

    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Criação Plano Assinatura', `Plano ${nome} (${periodicidade}) criado`);

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
        empresa_id: State.currentEmpresaId,
        cliente_id: clienteId,
        plano_id: planoId,
        quantidade_banhos: plano.quantidade_banhos,
        data_aquisicao: new Date().toISOString().split('T')[0],
        status: "Ativo"
    });

    const movimentacoes = DB.get('movimentacoes_caixa');
    movimentacoes.push({
        id: movimentacoes.length + 1,
        empresa_id: State.currentEmpresaId,
        tipo: 'ENTRADA',
        categoria: 'Assinatura Recorrente',
        descricao: `Venda de Assinatura ${plano.nome} (${plano.periodicidade}) para ${cliente.nome}`,
        valor: plano.preco,
        data: new Date().toISOString()
    });

    DB.set('pacotes_ativos', pacotes);
    DB.set('movimentacoes_caixa', movimentacoes);

    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Ativação Assinatura', `Cliente ${cliente.nome} assinou ${plano.nome}`);

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
        empresa_id: State.currentEmpresaId,
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
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Novo Agendamento', `Agendamento #${newId} criado no Kanban`);

    closeModal('modal-agendamento');
    renderKanban();
    State.showToast(`Agendamento #${newId} criado com sucesso no Kanban!`, 'success');
}

// Modal Helpers
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
    const clientes = (DB.get('clientes') || []).filter(c => c.empresa_id === State.currentEmpresaId);
    const select = document.getElementById('select-pet-tutor');
    if (!select) return;
    select.innerHTML = '';
    clientes.forEach(c => select.innerHTML += `<option value="${c.id}">${c.nome}</option>`);
    openModal('modal-pet');
}


// 8. POS / CAIXA SCREEN
function renderCaixa() {
    const produtos = (DB.get('produtos') || []).filter(p => p.empresa_id === State.currentEmpresaId);
    const catalogContainer = document.getElementById('pos-catalog');
    if (!catalogContainer) return;
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
                <p class="product-stock">Estoque: ${totalEstoque} un</p>
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
        State.showToast(`Estoque total atingido!`, 'error');
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
    if (!cartContainer) return;
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
        empresa_id: State.currentEmpresaId,
        tipo: 'ENTRADA',
        categoria: 'Venda Balcão',
        descricao: `Venda de Produtos (${State.cart.map(c => `${c.qty}x ${c.nome}`).join(', ')})`,
        valor: totalCheckout,
        data: new Date().toISOString()
    });

    contas.push({
        id: contas.length + 1,
        empresa_id: State.currentEmpresaId,
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

    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Venda POS', `Venda de balcão concluída no valor de R$ ${totalCheckout.toFixed(2)}`);

    State.showToast(`💸 Venda concluída! Total R$ ${totalCheckout.toFixed(2)}.`, 'success');
    State.cart = [];
    renderCaixa();
}

// 9. ESTOQUE FEFO VISUALIZATION
function renderEstoque() {
    const lotes = (DB.get('lotes_estoque') || []).filter(l => l.empresa_id === State.currentEmpresaId);
    const produtos = DB.get('produtos') || [];
    const tbody = document.getElementById('table-estoque-body');
    if (!tbody) return;
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

// 10. TAXI DOG DRIVER MOBILE VIEW
function renderTaxiDog() {
    const kanbanData = (DB.get('agendamentos_kanban') || []).filter(k => k.empresa_id === State.currentEmpresaId);
    const pets = DB.get('pets') || [];
    const clientes = DB.get('clientes') || [];
    
    const taxiJobs = kanbanData.filter(k => k.status === 'Em Rota de Busca' || k.status === 'Pronto');
    const container = document.getElementById('taxi-job-list');
    if (!container) return;
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
            <div style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:0.75rem;">Tutor: ${cliente ? cliente.nome : 'Tutor'} | Tel: ${cliente ? cliente.telefone : ''}</div>
            <div style="font-size:0.85rem; color:var(--text-muted); background:rgba(0,0,0,0.2); padding:0.5rem; border-radius:6px; margin-bottom:0.75rem;">
                📍 ${cliente ? cliente.endereco : 'Endereço'}
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
            State.showToast("GPS Permitido como MOCK", "warning");
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
        
        State.showToast("Foto do Pet salva!", "success");
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
        State.showToast("Por favor, capture o GPS antes de confirmar!", "error");
        return;
    }

    if (currentStatus === 'Em Rota de Busca') {
        handleStatusTransition(jobId, 'Aguardando Banho');
    } else {
        handleStatusTransition(jobId, 'Entregue');
    }
    
    renderTaxiDog();
}

// 11. DASHBOARD ANALYTICS
function renderAnalytics() {
    const contas = (DB.get('contas_receber') || []).filter(c => c.empresa_id === State.currentEmpresaId);
    const kanban = (DB.get('agendamentos_kanban') || []).filter(k => k.empresa_id === State.currentEmpresaId);
    const lotes = (DB.get('lotes_estoque') || []).filter(l => l.empresa_id === State.currentEmpresaId);

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

    const elemFaturamento = document.getElementById('stat-faturamento');
    if (elemFaturamento) elemFaturamento.innerText = `R$ ${faturamentoBruto.toFixed(2)}`;

    const elemTicket = document.getElementById('stat-ticket');
    if (elemTicket) elemTicket.innerText = `R$ ${ticketMedio.toFixed(2)}`;

    const elemConcluidos = document.getElementById('stat-concluidos');
    if (elemConcluidos) elemConcluidos.innerText = `${servicosConcluidos} pets`;

    const elemCriticos = document.getElementById('stat-criticos');
    if (elemCriticos) elemCriticos.innerText = `${lotesCriticos} lotes`;

    const tableBody = document.getElementById('table-receitas-body');
    if (!tableBody) return;
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

// 12. EVENT BINDING FOR INITIAL LOAD
window.addEventListener('DOMContentLoaded', () => {
    const profileSelector = document.getElementById('current-profile-select');
    profileSelector.addEventListener('change', (e) => {
        applyRBAC(e.target.value);
    });

    renderEmpresasSelector();
    applyRBAC('Admin');
});
