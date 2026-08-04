// 🐾 PataForma Database & App Engine (Local Storage Sim) - Professional ERP & Staff Authentication

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
                }
            ]);
        }

        if (!DB.get('usuarios')) {
            DB.set('usuarios', [
                { id: 1, empresa_id: 1, nome: "Admin Dono", perfil: "Admin", email: "admin@pataforma.com", kanban: true, taxi_dog: true, caixa: true, qc: true, cargo: "Gerente Geral", comissao_banho: 10, comissao_tosa: 25, comissao_acumulada: 120.00 },
                { id: 2, empresa_id: 1, nome: "Juliana Esteticista", perfil: "Supervisor", email: "juliana@pataforma.com", kanban: true, taxi_dog: false, caixa: true, qc: true, cargo: "Supervisora de Estética", comissao_banho: 15, comissao_tosa: 30, comissao_acumulada: 340.50 },
                { id: 3, empresa_id: 1, nome: "Marcos Recepção", perfil: "Recepcao", email: "marcos@pataforma.com", kanban: true, taxi_dog: false, caixa: true, qc: false, cargo: "Atendente do Caixa", comissao_banho: 5, comissao_tosa: 5, comissao_acumulada: 45.00 },
                { id: 4, empresa_id: 1, nome: "Tiago Banhista", perfil: "Banhista", email: "tiago@pataforma.com", kanban: true, taxi_dog: false, caixa: false, qc: false, cargo: "Banhista Sênior", comissao_banho: 20, comissao_tosa: 20, comissao_acumulada: 280.00 },
                { id: 5, empresa_id: 1, nome: "Lucas Entregador", perfil: "Entregador", email: "lucas@pataforma.com", kanban: false, taxi_dog: true, caixa: false, qc: false, cargo: "Motorista Táxi Dog", comissao_banho: 0, comissao_tosa: 0, comissao_acumulada: 150.00 }
            ]);
        }

        if (!DB.get('clientes')) {
            DB.set('clientes', [
                { id: 1, empresa_id: 1, nome: "Carlos Souza", telefone: "(11) 98888-7777", email: "carlos@gmail.com", endereco: "Av. Paulista, 1000 - Ap 42", lat_lng: "-23.5614,-46.6558", pontos_fidelidade: 189, ultima_visita: "2026-07-28" },
                { id: 2, empresa_id: 1, nome: "Mariana Lima", telefone: "(11) 97777-6666", email: "mariana@gmail.com", endereco: "Rua Augusta, 450", lat_lng: "-23.5512,-46.6521", pontos_fidelidade: 320, ultima_visita: "2026-08-01" },
                { id: 3, empresa_id: 1, nome: "Roberto Alves", telefone: "(11) 96666-5555", email: "roberto@gmail.com", endereco: "Alameda Lorena, 89", lat_lng: "-23.5678,-46.6610", pontos_fidelidade: 45, ultima_visita: "2026-08-03" }
            ]);
        }

        if (!DB.get('pets')) {
            DB.set('pets', [
                { id: 1, empresa_id: 1, cliente_id: 1, nome: "Thor", especie: "Cachorro", raca: "Golden Retriever", porte: "Grande", pelagem: "Longa", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Alergia a shampoo de coco." },
                { id: 2, empresa_id: 1, cliente_id: 2, nome: "Luna", especie: "Cachorro", raca: "Shih Tzu", porte: "Pequeno", pelagem: "Longa", temperamento: "Arisco", vacinas_em_dia: true, observacoes: "Muito sensível no ouvido esquerdo." },
                { id: 3, empresa_id: 1, cliente_id: 3, nome: "Max", especie: "Cachorro", raca: "Rottweiler", porte: "Grande", pelagem: "Curta", temperamento: "Agressivo", vacinas_em_dia: false, observacoes: "Exige uso de focinheira na banheira." },
                { id: 4, empresa_id: 1, cliente_id: 2, nome: "Mingau", especie: "Gato", raca: "Persa", porte: "Pequeno", pelagem: "Longa", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Gato Persa pelagem longa." }
            ]);
        }

        if (!DB.get('baias')) {
            const baias = [];
            for (let i = 1; i <= 12; i++) {
                baias.push({
                    id: i,
                    empresa_id: 1,
                    numero: `Baia ${i < 10 ? '0' + i : i}`,
                    status: i === 1 ? 'Ocupada' : (i === 3 ? 'Ocupada' : 'Livre'),
                    pet_id: i === 1 ? 1 : (i === 3 ? 2 : null)
                });
            }
            DB.set('baias', baias);
        }

        if (!DB.get('planos_assinatura')) {
            DB.set('planos_assinatura', [
                { id: 1, empresa_id: 1, nome: "Plano Mensal Gold (4 Banhos + Tosa)", descricao: "4 banhos mensais + 1 tosa completa.", preco: 240.00, periodicidade: "Mensal", quantidade_banhos: 4, inclui_tosa: true },
                { id: 2, empresa_id: 1, nome: "Plano VIP Semanal", descricao: "1 banho por semana com secagem rápida.", preco: 65.00, periodicidade: "Semanal", quantidade_banhos: 1, inclui_tosa: false }
            ]);
        }

        if (!DB.get('servicos')) {
            DB.set('servicos', [
                { id: 1, empresa_id: 1, nome: "Banho & Secagem", descricao: "Banho completo, secagem, corte de unhas.", preco: 70.00, duracao: 45 },
                { id: 2, empresa_id: 1, nome: "Tosa Completa", descricao: "Banho completo + Tosa com máquina e tesoura.", preco: 120.00, duracao: 90 },
                { id: 3, empresa_id: 1, nome: "Banho Antipulgas", descricao: "Banho com shampoo ectoparasiticida.", preco: 95.00, duracao: 60 }
            ]);
        }

        if (!DB.get('produtos')) {
            DB.set('produtos', [
                { id: 1, empresa_id: 1, nome: "Ração Premier Cães Adultos 15kg", marca: "Premier Pet", codigo_barras: "78910001", preco_custo: 120.00, margem_lucro: 58.25, preco: 189.90, estoque_minimo: 5, categoria: "Ração", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231e293b'/><circle cx='50' cy='50' r='30' fill='%23818cf8'/><text x='50' y='55' font-size='10' fill='white' text-anchor='middle'>RAÇÃO</text></svg>" },
                { id: 2, empresa_id: 1, nome: "Shampoo Hipoalergênico 500ml", marca: "Pet Clean", codigo_barras: "78910002", preco_custo: 22.50, margem_lucro: 100.0, preco: 45.00, estoque_minimo: 8, categoria: "Higiene", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231e293b'/><rect x='35' y='20' width='30' height='60' rx='5' fill='%23c084fc'/><text x='50' y='55' font-size='10' fill='white' text-anchor='middle'>SHAMP</text></svg>" },
                { id: 3, empresa_id: 1, nome: "Petisco Biscoito Canino 100g", marca: "DogPet", codigo_barras: null, preco_custo: 5.00, margem_lucro: 150.0, preco: 12.50, estoque_minimo: 10, categoria: "Petiscos", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231e293b'/><path d='M30,50 C30,40 40,30 50,30 C60,30 70,40 70,50 C40,70 30,60 30,50 Z' fill='%23fbbf24'/><text x='50' y='55' font-size='10' fill='white' text-anchor='middle'>COOKS</text></svg>" },
                { id: 4, empresa_id: 1, nome: "Lacinhos Artesanais (Kit 4 un)", marca: "Pet Style", codigo_barras: null, preco_custo: 2.50, margem_lucro: 220.0, preco: 8.00, estoque_minimo: 15, categoria: "Acessórios", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231e293b'/><circle cx='50' cy='50' r='25' fill='%23ec4899'/><text x='50' y='55' font-size='10' fill='white' text-anchor='middle'>LACE</text></svg>" }
            ]);
        }

        if (!DB.get('lotes_estoque')) {
            const hoje = new Date();
            const vencendo = new Date(hoje); vencendo.setDate(hoje.getDate() + 5);
            const emDia = new Date(hoje); emDia.setDate(hoje.getDate() + 120);

            DB.set('lotes_estoque', [
                { id: 1, empresa_id: 1, produto_id: 1, lote: "L-RAC01", quantidade: 3, data_vencimento: vencendo.toISOString().split('T')[0], status: "Disponivel" },
                { id: 2, empresa_id: 1, produto_id: 1, lote: "L-RAC02", quantidade: 10, data_vencimento: emDia.toISOString().split('T')[0], status: "Disponivel" },
                { id: 3, empresa_id: 1, produto_id: 2, lote: "L-SH01", quantidade: 6, data_vencimento: emDia.toISOString().split('T')[0], status: "Disponivel" },
                { id: 4, empresa_id: 1, produto_id: 3, lote: "L-PT01", quantidade: 20, data_vencimento: emDia.toISOString().split('T')[0], status: "Disponivel" },
                { id: 5, empresa_id: 1, produto_id: 4, lote: "L-AC01", quantidade: 50, data_vencimento: emDia.toISOString().split('T')[0], status: "Disponivel" }
            ]);
        }

        if (!DB.get('pacotes_ativos')) {
            DB.set('pacotes_ativos', [
                { id: 1, empresa_id: 1, cliente_id: 1, plano_id: 1, quantidade_banhos: 4, data_aquisicao: "2026-08-01", status: "Ativo" }
            ]);
        }

        if (!DB.get('agendamentos_kanban')) {
            DB.set('agendamentos_kanban', [
                {
                    id: 1, empresa_id: 1, pet_id: 1, servico_id: 1, baia_id: 1, status: "Agendado", data_agendamento: "2026-08-04T10:00:00",
                    possui_ectoparasitas: false, adicional_desembolo: 0, qc_aprovado: false, latitude_entrega: null, longitude_entrega: null, foto_comprovante_url: null,
                    checklist: { rasqueamento: false, ouvidos: true, unhas: false, adereco: false, perfume: false },
                    boletim_zootie: null
                },
                {
                    id: 2, empresa_id: 1, pet_id: 2, servico_id: 2, baia_id: 3, status: "Aguardando Banho", data_agendamento: "2026-08-04T11:30:00",
                    possui_ectoparasitas: false, adicional_desembolo: 0, qc_aprovado: false, latitude_entrega: null, longitude_entrega: null, foto_comprovante_url: null,
                    checklist: { rasqueamento: true, ouvidos: true, unhas: true, adereco: false, perfume: false },
                    boletim_zootie: null
                }
            ]);
        }

        if (!DB.get('contas_receber')) DB.set('contas_receber', []);
        if (!DB.get('movimentacoes_caixa')) {
            DB.set('movimentacoes_caixa', [
                { id: 1, empresa_id: 1, tipo: "ENTRADA", categoria: "Venda Balcão", descricao: "Venda Ração Carlos", valor: 189.90, data: "2026-08-04T14:30:00" }
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

// 2. STATE ENGINE & STAFF SESSION MANAGER
const State = {
    currentEmpresaId: 1,
    isMasterSuperAdmin: false,
    currentProfile: 'Admin',
    currentUser: null,
    cart: [],
    gpsWatcher: null,
    cameraStream: null,
    posFilterQuery: '',
    
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

// Populate Staff User Login Modal
function populateStaffUserLoginSelect() {
    const usuarios = DB.get('usuarios') || [];
    const select = document.getElementById('select-staff-user-login');
    if (!select) return;
    select.innerHTML = '';
    
    usuarios.forEach(u => {
        select.innerHTML += `<option value="${u.id}">${u.nome} (${u.cargo || u.perfil}) - ${u.email}</option>`;
    });
}

function loginFuncionarioSubmit(e) {
    e.preventDefault();
    const userId = parseInt(document.getElementById('select-staff-user-login').value);
    const usuarios = DB.get('usuarios');
    const user = usuarios.find(u => u.id === userId);

    if (user) {
        State.currentUser = user;
        State.currentProfile = user.perfil;
        State.currentEmpresaId = user.empresa_id;

        const sessionContainer = document.getElementById('user-session-container');
        if (sessionContainer) {
            sessionContainer.innerHTML = `
                <div class="user-session-widget">
                    <span>👤 <strong>${user.nome}</strong> (${user.cargo || user.perfil})</span>
                    <button onclick="logoutFuncionario()" style="background:rgba(239,68,68,0.2); border:1px solid rgba(239,68,68,0.4); color:#f87171; padding:0.15rem 0.4rem; border-radius:4px; cursor:pointer; font-size:0.7rem;">Sair</button>
                </div>
            `;
        }

        closeModal('modal-login-usuario');
        applyRBAC(user.perfil);

        DB.logAudit(State.currentEmpresaId, user.nome, 'Login da Equipe', `Usuário ${user.nome} logou como ${user.perfil}`);
        State.showToast(`👋 Bem-vindo(a), ${user.nome}! Acessos carregados para ${user.cargo || user.perfil}.`, 'success');

        // Auto-switch to authorized primary view
        if (user.perfil === 'Entregador') switchTab('taxi');
        else if (user.perfil === 'Banhista') switchTab('kanban');
        else if (user.perfil === 'Recepcao') switchTab('caixa');
        else switchTab('kanban');
    }
}

function logoutFuncionario() {
    State.currentUser = null;
    State.currentProfile = 'Admin';
    const sessionContainer = document.getElementById('user-session-container');
    if (sessionContainer) {
        sessionContainer.innerHTML = `<button class="btn-staff-login" onclick="openModal('modal-login-usuario')">🔐 Entrar na Equipe</button>`;
    }
    applyRBAC('Admin');
    switchTab('kanban');
    State.showToast("Sessão da equipe encerrada.", "info");
}

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
    if (companyHeader) companyHeader.innerHTML = emp ? `🏢 ${emp.nome}` : '🏢 PataForma Matriz';

    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Troca de Tenant', `Contexto alterado para ${emp ? emp.nome : 'Empresa'}`);
    
    applyRBAC(State.currentProfile);
    State.showToast(`Contexto alterado para: ${emp ? emp.nome : 'Empresa'}`, 'info');
}


// 4. RBAC & TENANT MODULE VISIBILITY CONTROL
function applyRBAC(profileName) {
    State.currentProfile = profileName;
    const users = DB.get('usuarios').filter(u => u.empresa_id === State.currentEmpresaId);
    const userDef = users.find(u => u.perfil === profileName) || users[0] || { kanban: true, caixa: true, taxi_dog: true, qc: true };
    
    const empresa = DB.get('empresas').find(e => e.id === State.currentEmpresaId) || { modulos: { kanban: true, taxi_dog: true, caixa: true, estoque: true, assinaturas: true, analytics: true } };

    const companyHeader = document.getElementById('current-company-name');
    if (companyHeader) companyHeader.innerHTML = `🏢 ${empresa.nome}`;

    const navKanban = document.getElementById('nav-kanban');
    const navBaias = document.getElementById('nav-baias');
    const navCaixa = document.getElementById('nav-caixa');
    const navEstoque = document.getElementById('nav-estoque');
    const navAnalytics = document.getElementById('nav-analytics');
    const navTaxi = document.getElementById('nav-taxi');
    const navClientes = document.getElementById('nav-clientes-pets');
    const navProdutos = document.getElementById('nav-produtos');
    const navEquipe = document.getElementById('nav-equipe');
    const navAssinaturas = document.getElementById('nav-assinaturas');

    // Strict role locking
    if (profileName === 'Entregador') {
        if (navKanban) navKanban.style.display = 'none';
        if (navBaias) navBaias.style.display = 'none';
        if (navCaixa) navCaixa.style.display = 'none';
        if (navEstoque) navEstoque.style.display = 'none';
        if (navAnalytics) navAnalytics.style.display = 'none';
        if (navTaxi) navTaxi.style.display = 'flex';
        if (navClientes) navClientes.style.display = 'none';
        if (navProdutos) navProdutos.style.display = 'none';
        if (navEquipe) navEquipe.style.display = 'none';
        if (navAssinaturas) navAssinaturas.style.display = 'none';
    } else if (profileName === 'Banhista') {
        if (navKanban) navKanban.style.display = 'flex';
        if (navBaias) navBaias.style.display = 'flex';
        if (navCaixa) navCaixa.style.display = 'none';
        if (navEstoque) navEstoque.style.display = 'none';
        if (navAnalytics) navAnalytics.style.display = 'none';
        if (navTaxi) navTaxi.style.display = 'none';
        if (navClientes) navClientes.style.display = 'none';
        if (navProdutos) navProdutos.style.display = 'none';
        if (navEquipe) navEquipe.style.display = 'none';
        if (navAssinaturas) navAssinaturas.style.display = 'none';
    } else if (profileName === 'Recepcao') {
        if (navKanban) navKanban.style.display = 'flex';
        if (navBaias) navBaias.style.display = 'flex';
        if (navCaixa) navCaixa.style.display = 'flex';
        if (navEstoque) navEstoque.style.display = 'none';
        if (navAnalytics) navAnalytics.style.display = 'none';
        if (navTaxi) navTaxi.style.display = 'none';
        if (navClientes) navClientes.style.display = 'flex';
        if (navProdutos) navProdutos.style.display = 'flex';
        if (navEquipe) navEquipe.style.display = 'none';
        if (navAssinaturas) navAssinaturas.style.display = 'flex';
    } else {
        // Admin / Supervisor -> Full Access
        if (navKanban) navKanban.style.display = (empresa.modulos.kanban && userDef.kanban) ? 'flex' : 'none';
        if (navBaias) navBaias.style.display = (empresa.modulos.kanban) ? 'flex' : 'none';
        if (navCaixa) navCaixa.style.display = (empresa.modulos.caixa && userDef.caixa) ? 'flex' : 'none';
        if (navEstoque) navEstoque.style.display = (empresa.modulos.estoque) ? 'flex' : 'none';
        if (navAnalytics) navAnalytics.style.display = (empresa.modulos.analytics) ? 'flex' : 'none';
        if (navTaxi) navTaxi.style.display = (empresa.modulos.taxi_dog && userDef.taxi_dog) ? 'flex' : 'none';
        if (navClientes) navClientes.style.display = 'flex';
        if (navProdutos) navProdutos.style.display = 'flex';
        if (navEquipe) navEquipe.style.display = 'flex';
        if (navAssinaturas) navAssinaturas.style.display = (empresa.modulos.assinaturas) ? 'flex' : 'none';
    }

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
    if (tabId === 'baias') renderBaiasGrid();
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


// 5. KANBAN ENGINE & TASK CHECKLISTS
const STATUS_LIST = ['Agendado', 'Em Rota de Busca', 'Aguardando Banho', 'No Banho', 'Em Tosa', 'Inspecao QC', 'Pronto', 'Entregue'];

function renderKanban() {
    const kanbanData = (DB.get('agendamentos_kanban') || []).filter(k => k.empresa_id === State.currentEmpresaId);
    const pets = DB.get('pets') || [];
    const servicos = DB.get('servicos') || [];
    const baias = DB.get('baias') || [];
    
    document.querySelectorAll('.kanban-column-cards').forEach(col => col.innerHTML = '');
    
    kanbanData.forEach(item => {
        const pet = pets.find(p => p.id === item.pet_id);
        const servico = servicos.find(s => s.id === item.servico_id);
        const baia = baias.find(b => b.id === item.baia_id);
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

        const especieIcon = pet.especie === 'Gato' ? '🐱' : '🐶';
        const chk = item.checklist || { rasqueamento: false, ouvidos: false, unhas: false, adereco: false, perfume: false };

        card.innerHTML = `
            <div class="card-alerts">${alertHTML}</div>
            <div class="card-title">
                <span>${especieIcon} ${pet.nome}</span>
                <span style="font-size:0.75rem; color:#818cf8;">#${item.id}</span>
            </div>
            <div class="card-subtitle">${pet.raca} | ${servico.nome} ${baia ? `| 🏠 ${baia.numero}` : ''}</div>
            
            <div class="kanban-checklist">
                <label class="checklist-item ${chk.rasqueamento ? 'done' : ''}">
                    <input type="checkbox" ${chk.rasqueamento ? 'checked' : ''} onchange="toggleChecklistKanban(${item.id}, 'rasqueamento', this.checked)">
                    <span>Rasqueamento de Nós</span>
                </label>
                <label class="checklist-item ${chk.ouvidos ? 'done' : ''}">
                    <input type="checkbox" ${chk.ouvidos ? 'checked' : ''} onchange="toggleChecklistKanban(${item.id}, 'ouvidos', this.checked)">
                    <span>Limpeza de Ouvidos</span>
                </label>
                <label class="checklist-item ${chk.unhas ? 'done' : ''}">
                    <input type="checkbox" ${chk.unhas ? 'checked' : ''} onchange="toggleChecklistKanban(${item.id}, 'unhas', this.checked)">
                    <span>Corte de Unhas</span>
                </label>
                <label class="checklist-item ${chk.adereco ? 'done' : ''}">
                    <input type="checkbox" ${chk.adereco ? 'checked' : ''} onchange="toggleChecklistKanban(${item.id}, 'adereco', this.checked)">
                    <span>Lacinho / Gravata</span>
                </label>
            </div>

            <div class="card-actions">
                ${item.status === 'Inspecao QC' ? `<button class="card-btn" onclick="inspeccionarQC(${item.id})">🔍 Aprovar QC</button>` : ''}
                ${item.status === 'Pronto' || item.status === 'Entregue' ? `<button class="card-btn" style="color:#818cf8;" onclick="abrirZootieModal(${item.id})">🐶 Boletim do Pet</button>` : ''}
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

function toggleChecklistKanban(jobId, key, checked) {
    const kanbanData = DB.get('agendamentos_kanban');
    const item = kanbanData.find(k => k.id === jobId);
    if (!item) return;

    if (!item.checklist) item.checklist = {};
    item.checklist[key] = checked;
    DB.set('agendamentos_kanban', kanbanData);
    renderKanban();
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

function handleStatusTransition(cardId, newStatus) {
    const kanbanData = DB.get('agendamentos_kanban');
    const item = kanbanData.find(k => k.id === cardId);
    if (!item) return;

    const pet = DB.get('pets').find(p => p.id === item.pet_id);

    if (newStatus === 'No Banho' && pet.temperamento === 'Agressivo') {
        State.showToast(`🚨 ATENÇÃO: O pet ${pet.nome} é Agressivo. Exige focinheira antes de colocá-lo na banheira!`, 'error');
    }

    const oldStatus = item.status;
    item.status = newStatus;
    
    if ((newStatus === 'Pronto' || newStatus === 'Entregue') && !(oldStatus === 'Pronto' || oldStatus === 'Entregue')) {
        const usuarios = DB.get('usuarios').filter(u => u.empresa_id === State.currentEmpresaId);
        const tosador = usuarios.find(u => u.perfil === 'Banhista' || u.perfil === 'Supervisor') || usuarios[0];
        const servico = DB.get('servicos').find(s => s.id === item.servico_id);

        if (tosador && servico) {
            const percComissao = servico.nome.toLowerCase().includes('tosa') ? (tosador.comissao_tosa || 25) : (tosador.comissao_banho || 10);
            const comissaoGerada = (servico.preco * percComissao) / 100;
            tosador.comissao_acumulada = (tosador.comissao_acumulada || 0) + comissaoGerada;
            DB.set('usuarios', DB.get('usuarios'));
            State.showToast(`✂️ Comissão de R$ ${comissaoGerada.toFixed(2)} (${percComissao}%) creditada para ${tosador.nome}!`, 'success');
        }

        const cliente = DB.get('clientes').find(c => c.id === pet.cliente_id);
        const pacote = DB.get('pacotes_ativos').find(p => p.empresa_id === State.currentEmpresaId && p.cliente_id === cliente.id && p.quantidade_banhos > 0);

        if (pacote) {
            pacote.quantidade_banhos--;
            DB.set('pacotes_ativos', DB.get('pacotes_ativos'));
            State.showToast(`🎯 Baixado 1 banho do Pacote Ativo do cliente ${cliente.nome}. Restam: ${pacote.quantidade_banhos}.`, 'success');
        } else {
            const valorTotal = servico.preco + item.adicional_desembolo;
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
        }
    }

    DB.set('agendamentos_kanban', kanbanData);
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Transição Kanban', `Pet ${pet.nome} movido de ${oldStatus} para ${newStatus}`);
    
    renderKanban();
    State.showToast(`Pet ${pet.nome} movido para ${newStatus}.`, 'info');
}


// 6. VISUAL CAGE / BAIA GRID MODULE
function renderBaiasGrid() {
    const baias = (DB.get('baias') || []).filter(b => b.empresa_id === State.currentEmpresaId);
    const pets = DB.get('pets') || [];
    const container = document.getElementById('baia-grid-container');
    if (!container) return;
    container.innerHTML = '';

    baias.forEach(b => {
        const pet = pets.find(p => p.id === b.pet_id);
        const card = document.createElement('div');
        card.className = `baia-card ${b.status === 'Livre' ? 'livre' : 'ocupada'}`;
        
        card.innerHTML = `
            <div class="baia-number">🏠 ${b.numero}</div>
            <div class="baia-status">${b.status === 'Livre' ? '🟢 Livre' : '🔴 Ocupada'}</div>
            <div class="baia-pet">${pet ? `${pet.especie === 'Gato' ? '🐱' : '🐶'} ${pet.nome}` : '-'}</div>
        `;
        container.appendChild(card);
    });
}


// 7. ZOOTIE BEHAVIOR RATING MODAL & WHATSAPP GENERATOR
function abrirZootieModal(jobId) {
    document.getElementById('input-zootie-jobid').value = jobId;
    openModal('modal-zootie');
}

function salvarZootieBoletim(e) {
    e.preventDefault();
    const jobId = parseInt(document.getElementById('input-zootie-jobid').value);
    const estrelas = document.getElementById('select-zootie-estrelas').value;
    const secador = document.getElementById('select-zootie-secador').value;
    const unhas = document.getElementById('select-zootie-unhas').value;
    const obs = document.getElementById('input-zootie-obs').value;

    const kanbanData = DB.get('agendamentos_kanban');
    const item = kanbanData.find(k => k.id === jobId);
    if (!item) return;

    item.boletim_zootie = { estrelas, secador, unhas, obs };
    DB.set('agendamentos_kanban', kanbanData);

    const pet = DB.get('pets').find(p => p.id === item.pet_id);
    const cliente = DB.get('clientes').find(c => c.id === pet.cliente_id);

    closeModal('modal-zootie');
    
    const msg = `🐾 *BOLETIM DO PET - PATAFORMA* 🐾%0A%0AHolá ${cliente.nome}! Segue o boletim do *${pet.nome}* no banho hoje:%0A%0A⭐ Avaliação: ${'⭐'.repeat(parseInt(estrelas))}%0A💨 Secador: ${secador}%0A✂️ Unhas/Ouvidos: ${unhas}%0A💬 Recadinho: ${obs || 'Ficou super cheiroso e lindo!'}`;
    
    State.showToast(`🐶 Boletim do Pet ${pet.nome} gerado! Enviar no WhatsApp do Tutor.`, 'success');
    window.open(`https://api.whatsapp.com/send?phone=55${cliente.telefone.replace(/\D/g, '')}&text=${msg}`, '_blank');
}


// 8. ERP PRODUCT MARGIN CALCULATOR & CRUD
function calcularMargemProduto() {
    const custo = parseFloat(document.getElementById('input-prod-custo').value) || 0;
    const margem = parseFloat(document.getElementById('input-prod-margem').value) || 0;
    
    const precoVenda = custo * (1 + (margem / 100));
    document.getElementById('input-prod-preco').value = precoVenda.toFixed(2);
    
    const lucro = precoVenda - custo;
    document.getElementById('text-lucro-bruto').innerText = `R$ ${lucro.toFixed(2)}`;
}

function calcularPrecoPorVenda() {
    const custo = parseFloat(document.getElementById('input-prod-custo').value) || 0;
    const precoVenda = parseFloat(document.getElementById('input-prod-preco').value) || 0;
    
    if (custo > 0) {
        const margem = ((precoVenda - custo) / custo) * 100;
        document.getElementById('input-prod-margem').value = margem.toFixed(1);
    }
    const lucro = precoVenda - custo;
    document.getElementById('text-lucro-bruto').innerText = `R$ ${lucro.toFixed(2)}`;
}

function renderProdutosCrudTable() {
    let produtos = DB.get('produtos') || [];
    if (produtos.length === 0) {
        DB.init();
        produtos = DB.get('produtos') || [];
    }
    const lotes = DB.get('lotes_estoque') || [];
    const tbody = document.getElementById('table-produtos-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const companyProds = produtos.filter(p => p.empresa_id === State.currentEmpresaId || p.empresa_id === 1);

    companyProds.forEach(p => {
        const totalEstoque = lotes.filter(l => l.produto_id === p.id && l.status === 'Disponivel').reduce((acc, curr) => acc + curr.quantidade, 0);
        const custo = p.preco_custo || (p.preco * 0.6);
        const margem = p.margem_lucro || 66.6;
        const lucro = p.preco - custo;

        const alertaMinimo = totalEstoque <= (p.estoque_minimo || 5) ? `<span class="alert-badge danger">⚠️ Baixo Estoque</span>` : '';

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <img src="${p.foto}" style="width:36px; height:36px; border-radius:6px; object-fit:cover;" />
                    <div>
                        <strong>${p.nome}</strong>
                        <div style="font-size:0.7rem; color:var(--text-secondary);">${p.marca || 'PataForma'}</div>
                    </div>
                </div>
            </td>
            <td><span class="product-category">${p.categoria}</span></td>
            <td>R$ ${custo.toFixed(2)}</td>
            <td><span class="validade-badge em-dia">${margem.toFixed(1)}%</span></td>
            <td style="color:#10b981; font-weight:700;">R$ ${p.preco.toFixed(2)}</td>
            <td style="color:#38bdf8; font-weight:700;">R$ ${lucro.toFixed(2)}</td>
            <td>${totalEstoque} un ${alertaMinimo}</td>
            <td><button class="card-btn" onclick="openModal('modal-produto')">+ Lote FEFO</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function salvarProduto(e) {
    e.preventDefault();
    const nome = document.getElementById('input-prod-nome').value;
    const marca = document.getElementById('input-prod-marca').value;
    const categoria = document.getElementById('input-prod-categoria').value;
    const codigo_barras = document.getElementById('input-prod-codigo').value || null;
    const estoque_minimo = parseInt(document.getElementById('input-prod-minimo').value) || 5;
    const preco_custo = parseFloat(document.getElementById('input-prod-custo').value);
    const margem_lucro = parseFloat(document.getElementById('input-prod-margem').value);
    const preco = parseFloat(document.getElementById('input-prod-preco').value);
    const fotoUrl = document.getElementById('input-prod-foto').value;
    const qtdInicial = parseInt(document.getElementById('input-prod-qtd').value) || 10;
    const vencimento = document.getElementById('input-prod-vencimento').value;

    const produtos = DB.get('produtos') || [];
    const lotes = DB.get('lotes_estoque') || [];
    
    const newProdId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
    const foto = fotoUrl || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231e293b'/><circle cx='50' cy='50' r='30' fill='%23818cf8'/><text x='50' y='55' font-size='10' fill='white' text-anchor='middle'>PROD</text></svg>";

    produtos.push({ id: newProdId, empresa_id: State.currentEmpresaId, nome, marca, categoria, codigo_barras, estoque_minimo, preco_custo, margem_lucro, preco, foto });
    
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

    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Cadastro Produto ERP', `Produto ${nome} cadastrado com margem de ${margem_lucro}%`);

    closeModal('modal-produto');
    renderProdutosCrudTable();
    renderCaixa();
    State.showToast(`Produto ERP ${nome} cadastrado com sucesso!`, 'success');
}


// 9. DYNAMIC APPOINTMENT DURATION & PRICING CALCULATOR
function atualizarOrcamentoDinâmicoAgendamento() {
    const petSelect = document.getElementById('select-agendar-pet');
    const servicoSelect = document.getElementById('select-agendar-servico');
    const pelagemSelect = document.getElementById('select-agendar-pelagem');
    const checkTaxi = document.getElementById('check-agendar-taxi');

    if (!petSelect || !servicoSelect) return;

    const petId = parseInt(petSelect.value);
    const servicoId = parseInt(servicoSelect.value);
    
    const pet = DB.get('pets').find(p => p.id === petId);
    const servico = DB.get('servicos').find(s => s.id === servicoId);

    if (!pet || !servico) return;

    let precoFinal = servico.preco;
    let tempoEstimado = servico.duracao;

    if (pet.porte === 'Médio') { precoFinal += 10.00; tempoEstimado += 15; }
    if (pet.porte === 'Grande') { precoFinal += 25.00; tempoEstimado += 30; }
    if (pet.porte === 'Gigante') { precoFinal += 45.00; tempoEstimado += 45; }

    const pelagem = pelagemSelect ? pelagemSelect.value : 'Curta';
    if (pelagem === 'Longa') { precoFinal += 15.00; tempoEstimado += 15; }
    if (pelagem === 'Com Nós') { precoFinal += 35.00; tempoEstimado += 30; }

    const precisaTaxi = checkTaxi && checkTaxi.checked;
    if (precisaTaxi) precoFinal += 20.00;

    document.getElementById('calc-agendar-preco').innerText = `R$ ${precoFinal.toFixed(2)}`;
    document.getElementById('calc-agendar-tempo').innerText = `${tempoEstimado} min`;
    document.getElementById('calc-agendar-taxi').innerText = precisaTaxi ? 'Sim (+R$20)' : 'Não';
}


// 10. CLIENTS, PETS, STAFF & COMMISSIONS TABLES
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
            <td><span class="validade-badge em-dia">🎁 ${c.pontos_fidelidade || 0} pts</span></td>
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
            <td>${p.raca} (${p.porte || 'Médio'} / ${p.pelagem || 'Curta'})</td>
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
            <td>${u.comissao_banho || 10}%</td>
            <td>${u.comissao_tosa || 25}%</td>
            <td style="color:#10b981; font-weight:700;">R$ ${(u.comissao_acumulada || 0).toFixed(2)}</td>
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
    const baias = (DB.get('baias') || []).filter(b => b.empresa_id === State.currentEmpresaId && b.status === 'Livre');

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

    const baiaSelect = document.getElementById('select-agendar-baia');
    if (baiaSelect) {
        baiaSelect.innerHTML = '<option value="">Sem Baia Inicial</option>';
        baias.forEach(b => {
            baiaSelect.innerHTML += `<option value="${b.id}">🏠 ${b.numero} (Livre)</option>`;
        });
    }

    const clienteSubSelect = document.getElementById('select-assinar-cliente');
    if (clienteSubSelect) {
        clienteSubSelect.innerHTML = '';
        clientes.forEach(c => {
            clienteSubSelect.innerHTML += `<option value="${c.id}">${c.nome} (${c.telefone})</option>`;
        });
    }

    populateStaffUserLoginSelect();
    atualizarOrcamentoDinâmicoAgendamento();
}

function salvarCliente(e) {
    e.preventDefault();
    const nome = document.getElementById('input-cliente-nome').value;
    const telefone = document.getElementById('input-cliente-tel').value;
    const email = document.getElementById('input-cliente-email').value;
    const endereco = document.getElementById('input-cliente-endereco').value;

    const clientes = DB.get('clientes');
    const newId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;

    clientes.push({ id: newId, empresa_id: State.currentEmpresaId, nome, telefone, email, endereco, lat_lng: "-23.5505,-46.6333", pontos_fidelidade: 0, ultima_visita: new Date().toISOString().split('T')[0] });
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

    pets.push({ id: newId, empresa_id: State.currentEmpresaId, cliente_id, nome, especie, raca, porte, pelagem: 'Curta', temperamento, vacinas_em_dia, observacoes });
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
    const comissao_banho = parseFloat(document.getElementById('input-func-comissao-banho').value) || 10;
    const comissao_tosa = parseFloat(document.getElementById('input-func-comissao-tosa').value) || 25;

    const usuarios = DB.get('usuarios');
    const newId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;

    usuarios.push({ id: newId, empresa_id: State.currentEmpresaId, nome, email, cargo, perfil, comissao_banho, comissao_tosa, comissao_acumulada: 0, kanban: true, caixa: true, taxi_dog: true, qc: true });
    DB.set('usuarios', usuarios);

    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Cadastro Funcionario', `Funcionário ${nome} (${perfil}) cadastrado`);

    closeModal('modal-funcionario');
    renderFuncionariosTable();
    populateStaffUserLoginSelect();
    State.showToast(`Funcionário ${nome} cadastrado com sucesso!`, 'success');
}

function criarAgendamento(e) {
    e.preventDefault();
    const petId = parseInt(document.getElementById('select-agendar-pet').value);
    const servicoId = parseInt(document.getElementById('select-agendar-servico').value);
    const baiaId = document.getElementById('select-agendar-baia').value ? parseInt(document.getElementById('select-agendar-baia').value) : null;
    const taxiDog = document.getElementById('check-agendar-taxi').checked;

    const kanbanData = DB.get('agendamentos_kanban');
    const newId = kanbanData.length > 0 ? Math.max(...kanbanData.map(k => k.id)) + 1 : 1;

    if (baiaId) {
        const baias = DB.get('baias');
        const baia = baias.find(b => b.id === baiaId);
        if (baia) {
            baia.status = 'Ocupada';
            baia.pet_id = petId;
            DB.set('baias', baias);
        }
    }

    kanbanData.push({
        id: newId,
        empresa_id: State.currentEmpresaId,
        pet_id: petId,
        servico_id: servicoId,
        baia_id: baiaId,
        status: taxiDog ? "Em Rota de Busca" : "Agendado",
        data_agendamento: new Date().toISOString(),
        possui_ectoparasitas: false,
        adicional_desembolo: 0,
        qc_aprovado: false,
        latitude_entrega: null,
        longitude_entrega: null,
        foto_comprovante_url: null,
        checklist: { rasqueamento: false, ouvidos: false, unhas: false, adereco: false, perfume: false },
        boletim_zootie: null
    });

    DB.set('agendamentos_kanban', kanbanData);
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Novo Agendamento', `Agendamento #${newId} criado no Kanban`);

    closeModal('modal-agendamento');
    renderKanban();
    State.showToast(`Agendamento #${newId} criado com sucesso no Kanban!`, 'success');
}


// 11. POS CAIXA & ITEM AVULSO
function renderCaixa() {
    let produtos = DB.get('produtos') || [];
    if (produtos.length === 0) {
        DB.init();
        produtos = DB.get('produtos') || [];
    }

    const catalogContainer = document.getElementById('pos-catalog');
    if (!catalogContainer) return;
    catalogContainer.innerHTML = '';

    const companyProds = produtos.filter(p => p.empresa_id === State.currentEmpresaId || p.empresa_id === 1);
    
    let filteredProds = companyProds;
    if (State.posFilterQuery) {
        const q = State.posFilterQuery.toLowerCase();
        filteredProds = companyProds.filter(p => p.nome.toLowerCase().includes(q) || p.categoria.toLowerCase().includes(q) || (p.codigo_barras && p.codigo_barras.includes(q)));
    }

    filteredProds.forEach(p => {
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

function filtrarProdutosPOS(query) {
    State.posFilterQuery = query;
    renderCaixa();
}

function adicionarItemAvulsoPOS(e) {
    e.preventDefault();
    const nome = document.getElementById('input-avulso-nome').value;
    const preco = parseFloat(document.getElementById('input-avulso-preco').value);

    const tempId = Date.now();
    State.cart.push({
        id: tempId,
        nome: `[Avulso] ${nome}`,
        preco: preco,
        qty: 1
    });

    closeModal('modal-item-avulso');
    renderCart();
    State.showToast(`Item avulso "${nome}" adicionado ao carrinho!`, 'success');
}

function addToCart(productId) {
    const produtos = DB.get('produtos') || [];
    const p = produtos.find(item => item.id === productId);
    if (!p) return;

    const lotes = DB.get('lotes_estoque').filter(l => l.produto_id === productId && l.status === 'Disponivel');
    const totalEstoque = lotes.reduce((acc, curr) => acc + curr.quantidade, 0);

    const cartItem = State.cart.find(c => c.id === productId);
    const cartQty = cartItem ? cartItem.qty : 0;

    if (cartQty >= totalEstoque && totalEstoque > 0) {
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
    const clientes = DB.get('clientes');
    
    State.cart.forEach(item => {
        if (typeof item.id === 'number' && item.id < 1000000) {
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
                if (lot.quantidade === 0) lot.status = 'Esgotado';
            }
        }
    });

    const totalCheckout = State.cart.reduce((acc, c) => acc + (c.preco * c.qty), 0);
    const pontosGanhos = Math.floor(totalCheckout);

    if (clientes && clientes.length > 0) {
        clientes[0].pontos_fidelidade = (clientes[0].pontos_fidelidade || 0) + pontosGanhos;
        DB.set('clientes', clientes);
    }
    
    movimentacoes.push({
        id: movimentacoes.length + 1,
        empresa_id: State.currentEmpresaId,
        tipo: 'ENTRADA',
        categoria: 'Venda Balcão',
        descricao: `Venda POS (${State.cart.map(c => `${c.qty}x ${c.nome}`).join(', ')})`,
        valor: totalCheckout,
        data: new Date().toISOString()
    });

    DB.set('lotes_estoque', lotes);
    DB.set('movimentacoes_caixa', movimentacoes);

    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Venda POS', `Venda de balcão concluída no valor de R$ ${totalCheckout.toFixed(2)} (+${pontosGanhos} pts fidelidade)`);

    State.showToast(`💸 Venda concluída! Total R$ ${totalCheckout.toFixed(2)}. (+${pontosGanhos} Pontos de Fidelidade gerados!)`, 'success');
    State.cart = [];
    renderCaixa();
}


// 12. ESTOQUE FEFO & ANALYTICS
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

        let badgeHTML = l.status === 'Esgotado' ? `<span class="validade-badge">Esgotado</span>` : (diffDays <= 15 ? `<span class="validade-badge vencendo">Crítico (${diffDays}d)</span>` : `<span class="validade-badge em-dia">Em dia</span>`);

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

function renderAnalytics() {
    const movimentacoes = (DB.get('movimentacoes_caixa') || []).filter(m => m.empresa_id === State.currentEmpresaId);
    const usuarios = (DB.get('usuarios') || []).filter(u => u.empresa_id === State.currentEmpresaId);

    const faturamentoBruto = movimentacoes.filter(m => m.tipo === 'ENTRADA').reduce((acc, curr) => acc + curr.valor, 0);
    const totalComissoes = usuarios.reduce((acc, curr) => acc + (curr.comissao_acumulada || 0), 0);
    const ticketMedio = movimentacoes.length > 0 ? (faturamentoBruto / movimentacoes.length) : 0;

    if (document.getElementById('stat-faturamento')) document.getElementById('stat-faturamento').innerText = `R$ ${faturamentoBruto.toFixed(2)}`;
    if (document.getElementById('stat-ticket')) document.getElementById('stat-ticket').innerText = `R$ ${ticketMedio.toFixed(2)}`;
    if (document.getElementById('stat-comissoes')) document.getElementById('stat-comissoes').innerText = `R$ ${totalComissoes.toFixed(2)}`;

    const tableBody = document.getElementById('table-receitas-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    
    movimentacoes.slice().reverse().forEach(m => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${new Date(m.data).toLocaleDateString('pt-BR')}</td>
            <td>${m.descricao}</td>
            <td><span class="validade-badge em-dia">${m.categoria}</span></td>
            <td style="color:#10b981; font-weight:700;">+ R$ ${m.valor.toFixed(2)}</td>
        `;
        tableBody.appendChild(tr);
    });
}


// 13. TAXI DOG DRIVER MOBILE VIEW
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
                ✅ Confirmar Operação
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
            State.showToast("GPS gravado no servidor!", "success");
        },
        (error) => {
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
            State.showToast("GPS MOCK Registrado", "warning");
        }
    );
}

function capturarFoto(jobId) {
    const video = document.getElementById(`video-${jobId}`);
    const placeholder = document.getElementById(`placeholder-${jobId}`);
    const imgPreview = document.getElementById(`img-preview-${jobId}`);

    if (State.cameraStream) {
        const canvas = document.createElement('canvas');
        canvas.width = 640; canvas.height = 480;
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
        State.showToast("Foto salva com sucesso!", "success");
    } else {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then(stream => {
                State.cameraStream = stream;
                video.srcObject = stream;
                video.style.display = 'block';
                placeholder.style.display = 'none';
            })
            .catch(err => {
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
                State.showToast("Foto emulada com sucesso", "warning");
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

// 14. EVENT BINDING FOR INITIAL LOAD & DEEP LINKS
window.addEventListener('DOMContentLoaded', () => {
    const profileSelector = document.getElementById('current-profile-select');
    if (profileSelector) {
        profileSelector.addEventListener('change', (e) => {
            applyRBAC(e.target.value);
        });
    }

    renderEmpresasSelector();
    populateStaffUserLoginSelect();
    applyRBAC('Admin');

    // Auto-render initial tab
    switchTab('kanban');
});
