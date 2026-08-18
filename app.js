// 🐾 PataForma Database & App Engine (Local Storage Sim) - B2B SaaS Multi-Tenant & Multi-Filial ERP

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

    resetAndSeedCatDogData: () => {
        // Clear all previous key stores
        ['empresas', 'filiais', 'usuarios', 'clientes', 'pets', 'prontuarios', 'baias', 'planos_assinatura', 'servicos', 'insumos_servico', 'produtos', 'lotes_estoque', 'transferencias_estoque', 'pacotes_ativos', 'agendamentos_kanban', 'movimentacoes_caixa', 'logs_auditoria'].forEach(key => localStorage.removeItem(`pataforma_${key}`));

        // 1. CatDog Tenant
        DB.set('empresas', [
            {
                id: 1,
                nome: "CatDog Pet Center & Clínica Veterinária",
                cnpj: "45.892.103/0001-88",
                responsavel: "Dra. Julia Silveira",
                email_master: "julia@catdog.com.br",
                whatsapp: "(11) 98765-4321",
                plano: "Enterprise VIP + DREasy",
                status: "Ativo",
                modulos: { kanban: true, taxi_dog: true, caixa: true, estoque: true, assinaturas: true, analytics: true, dreasy: true }
            }
        ]);

        // 2. Filiais SP
        DB.set('filiais', [
            { id: 101, empresa_id: 1, nome: "Unidade Moema (Matriz SP)", cidade: "São Paulo", uf: "SP", gerente: "Dra. Julia Silveira", status: "Ativa" },
            { id: 102, empresa_id: 1, nome: "Unidade Jardins", cidade: "São Paulo", uf: "SP", gerente: "Camila Rocha", status: "Ativa" },
            { id: 103, empresa_id: 1, nome: "Unidade Pinheiros", cidade: "São Paulo", uf: "SP", gerente: "Dr. Thiago Ramos", status: "Ativa" }
        ]);

        // 3. Equipe CatDog
        DB.set('usuarios', [
            { id: 1, empresa_id: 1, filial_id: 101, nome: "Dra. Julia Silveira", perfil: "Admin", email: "julia@catdog.com.br", senha: "catdog123", crmv: "SP-34567", cargo: "Proprietária / Diretora Clínica", comissao_banho: 10, comissao_tosa: 25, comissao_acumulada: 450.00 },
            { id: 2, empresa_id: 1, filial_id: 101, nome: "Dr. Thiago Ramos", perfil: "Veterinario", email: "thiago@catdog.com.br", senha: "123456", crmv: "SP-45678", cargo: "Médico Veterinário Lead", comissao_banho: 0, comissao_tosa: 0, comissao_acumulada: 980.00 },
            { id: 3, empresa_id: 1, filial_id: 101, nome: "Amanda Souza", perfil: "Supervisor", email: "amanda@catdog.com.br", senha: "123456", cargo: "Supervisora de Banho & Tosa", comissao_banho: 15, comissao_tosa: 30, comissao_acumulada: 620.50 },
            { id: 4, empresa_id: 1, filial_id: 101, nome: "Camila Rocha", perfil: "Recepcao", email: "camila@catdog.com.br", senha: "123456", cargo: "Atendente / Caixa", comissao_banho: 5, comissao_tosa: 5, comissao_acumulada: 120.00 },
            { id: 5, empresa_id: 1, filial_id: 101, nome: "Bruno Lima", perfil: "Banhista", email: "bruno@catdog.com.br", senha: "123456", cargo: "Tosador Sênior", comissao_banho: 20, comissao_tosa: 25, comissao_acumulada: 540.00 },
            { id: 6, empresa_id: 1, filial_id: 101, nome: "Lucas Entregador", perfil: "Entregador", email: "lucas@catdog.com.br", senha: "123456", cargo: "Motorista Táxi Dog SP", comissao_banho: 0, comissao_tosa: 0, comissao_acumulada: 280.00 }
        ]);

        // 4. 20 Realistic Clients (Tutores SP) — com campos WhatsApp opt-in (LGPD)
        DB.set('clientes', [
            { id: 1,  empresa_id: 1, filial_id: 101, nome: "Carlos Eduardo Mendes",  telefone: "(11) 98888-1111", email: "carlos.mendes@gmail.com",        endereco: "Av. Moema, 780 - Apt 121, Moema - SP",             lat_lng: "-23.6012,-46.6621", pontos_fidelidade: 240, ultima_visita: "2026-08-01", whatsapp_numero: "5511988881111", whatsapp_opt_in: true,  whatsapp_marketing: true,  whatsapp_vendas: true,  whatsapp_lembretes: true,  whatsapp_status_pet: true,  whatsapp_opt_in_data: "2026-07-10T10:00:00", whatsapp_opt_in_origem: "plataforma" },
            { id: 2,  empresa_id: 1, filial_id: 101, nome: "Mariana Alcantara",       telefone: "(11) 97777-2222", email: "mariana.alcantara@hotmail.com",   endereco: "Alameda Lorena, 1450, Jardins - SP",               lat_lng: "-23.5678,-46.6610", pontos_fidelidade: 450, ultima_visita: "2026-08-03", whatsapp_numero: "5511977772222", whatsapp_opt_in: true,  whatsapp_marketing: true,  whatsapp_vendas: false, whatsapp_lembretes: true,  whatsapp_status_pet: true,  whatsapp_opt_in_data: "2026-07-15T09:30:00", whatsapp_opt_in_origem: "whatsapp" },
            { id: 3,  empresa_id: 1, filial_id: 101, nome: "Roberto Ferraz",          telefone: "(11) 96666-3333", email: "roberto.ferraz@uol.com.br",       endereco: "Rua dos Pinheiros, 600 - Pinheiros - SP",          lat_lng: "-23.5634,-46.6850", pontos_fidelidade: 110, ultima_visita: "2026-07-29", whatsapp_numero: "5511966663333", whatsapp_opt_in: false, whatsapp_marketing: false, whatsapp_vendas: false, whatsapp_lembretes: false, whatsapp_status_pet: false, whatsapp_opt_in_data: null, whatsapp_opt_in_origem: null },
            { id: 4,  empresa_id: 1, filial_id: 101, nome: "Fernanda Costa",          telefone: "(11) 95555-4444", email: "fernanda.costa@gmail.com",        endereco: "Rua Pedroso Alvarenga, 900, Itaim Bibi - SP",      lat_lng: "-23.5840,-46.6780", pontos_fidelidade: 320, ultima_visita: "2026-08-02", whatsapp_numero: "5511955554444", whatsapp_opt_in: true,  whatsapp_marketing: false, whatsapp_vendas: true,  whatsapp_lembretes: true,  whatsapp_status_pet: true,  whatsapp_opt_in_data: "2026-07-20T14:00:00", whatsapp_opt_in_origem: "portal" },
            { id: 5,  empresa_id: 1, filial_id: 101, nome: "Dr. Gustavo Borges",      telefone: "(11) 94444-5555", email: "gustavo.borges@adv.com.br",       endereco: "Av. República do Líbano, 1100, Ibirapuera - SP",   lat_lng: "-23.5910,-46.6600", pontos_fidelidade: 580, ultima_visita: "2026-08-04", whatsapp_numero: "5511944445555", whatsapp_opt_in: true,  whatsapp_marketing: true,  whatsapp_vendas: true,  whatsapp_lembretes: true,  whatsapp_status_pet: true,  whatsapp_opt_in_data: "2026-07-05T08:00:00", whatsapp_opt_in_origem: "plataforma" },
            { id: 6,  empresa_id: 1, filial_id: 101, nome: "Beatriz Oliveira",        telefone: "(11) 93333-6666", email: "beatriz.oliver@gmail.com",        endereco: "Rua Domingos de Morais, 1200, Vila Mariana - SP",  lat_lng: "-23.5890,-46.6340", pontos_fidelidade: 95,  ultima_visita: "2026-07-28", whatsapp_numero: "5511933336666", whatsapp_opt_in: true,  whatsapp_marketing: false, whatsapp_vendas: false, whatsapp_lembretes: true,  whatsapp_status_pet: true,  whatsapp_opt_in_data: "2026-07-28T11:00:00", whatsapp_opt_in_origem: "whatsapp" },
            { id: 7,  empresa_id: 1, filial_id: 101, nome: "Ricardo Siqueira",        telefone: "(11) 92222-7777", email: "ricardo.siqueira@outlook.com",    endereco: "Rua Mato Grosso, 340, Higienópolis - SP",         lat_lng: "-23.5480,-46.6540", pontos_fidelidade: 180, ultima_visita: "2026-08-02", whatsapp_numero: "5511922227777", whatsapp_opt_in: false, whatsapp_marketing: false, whatsapp_vendas: false, whatsapp_lembretes: false, whatsapp_status_pet: false, whatsapp_opt_in_data: null, whatsapp_opt_in_origem: null },
            { id: 8,  empresa_id: 1, filial_id: 101, nome: "Camila Viana",            telefone: "(11) 91111-8888", email: "camila.viana@yahoo.com.br",       endereco: "Rua Haddock Lobo, 890, Cerqueira César - SP",     lat_lng: "-23.5610,-46.6670", pontos_fidelidade: 390, ultima_visita: "2026-08-03", whatsapp_numero: "5511911118888", whatsapp_opt_in: true,  whatsapp_marketing: true,  whatsapp_vendas: true,  whatsapp_lembretes: true,  whatsapp_status_pet: true,  whatsapp_opt_in_data: "2026-06-30T16:00:00", whatsapp_opt_in_origem: "plataforma" },
            { id: 9,  empresa_id: 1, filial_id: 101, nome: "Lucas Rodrigues",         telefone: "(11) 98765-1234", email: "lucas.rodrigues@tech.com",        endereco: "Rua Fradique Coutinho, 750, Vila Madalena - SP",  lat_lng: "-23.5580,-46.6890", pontos_fidelidade: 70,  ultima_visita: "2026-07-30", whatsapp_numero: "5511987651234", whatsapp_opt_in: true,  whatsapp_marketing: false, whatsapp_vendas: false, whatsapp_lembretes: false, whatsapp_status_pet: true,  whatsapp_opt_in_data: "2026-08-01T10:00:00", whatsapp_opt_in_origem: "portal" },
            { id: 10, empresa_id: 1, filial_id: 101, nome: "Patricia Abravanel",      telefone: "(11) 97654-2345", email: "patricia.ab@gmail.com",           endereco: "Rua Curitiba, 500, Paraíso - SP",                 lat_lng: "-23.5760,-46.6500", pontos_fidelidade: 620, ultima_visita: "2026-08-04", whatsapp_numero: "5511976542345", whatsapp_opt_in: true,  whatsapp_marketing: true,  whatsapp_vendas: true,  whatsapp_lembretes: true,  whatsapp_status_pet: true,  whatsapp_opt_in_data: "2026-07-12T09:00:00", whatsapp_opt_in_origem: "plataforma" },
            { id: 11, empresa_id: 1, filial_id: 101, nome: "Thiago Martins",          telefone: "(11) 96543-3456", email: "thiago.martins@actor.com",        endereco: "Av. Macuco, 300, Moema - SP",                     lat_lng: "-23.6040,-46.6640", pontos_fidelidade: 140, ultima_visita: "2026-07-27", whatsapp_numero: "5511965433456", whatsapp_opt_in: false, whatsapp_marketing: false, whatsapp_vendas: false, whatsapp_lembretes: false, whatsapp_status_pet: false, whatsapp_opt_in_data: null, whatsapp_opt_in_origem: null },
            { id: 12, empresa_id: 1, filial_id: 101, nome: "Vanessa Camargo",         telefone: "(11) 95432-4567", email: "vanessa.c@gmail.com",             endereco: "Rua Oscar Freire, 1100, Jardins - SP",            lat_lng: "-23.5620,-46.6710", pontos_fidelidade: 410, ultima_visita: "2026-08-01", whatsapp_numero: "5511954324567", whatsapp_opt_in: true,  whatsapp_marketing: true,  whatsapp_vendas: true,  whatsapp_lembretes: true,  whatsapp_status_pet: true,  whatsapp_opt_in_data: "2026-07-18T15:00:00", whatsapp_opt_in_origem: "whatsapp" },
            { id: 13, empresa_id: 1, filial_id: 101, nome: "Marcelo Rossi",           telefone: "(11) 94321-5678", email: "marcelo.rossi@ig.com.br",         endereco: "Av. Faria Lima, 2200, Itaim Bibi - SP",          lat_lng: "-23.5790,-46.6870", pontos_fidelidade: 230, ultima_visita: "2026-08-02", whatsapp_numero: "5511943215678", whatsapp_opt_in: true,  whatsapp_marketing: false, whatsapp_vendas: true,  whatsapp_lembretes: true,  whatsapp_status_pet: false, whatsapp_opt_in_data: "2026-07-25T10:30:00", whatsapp_opt_in_origem: "plataforma" },
            { id: 14, empresa_id: 1, filial_id: 101, nome: "Juliana Paes",            telefone: "(11) 93210-6789", email: "ju.paes@globo.com",               endereco: "Rua Pamplona, 950, Jardim Paulista - SP",         lat_lng: "-23.5690,-46.6560", pontos_fidelidade: 510, ultima_visita: "2026-08-04", whatsapp_numero: "5511932106789", whatsapp_opt_in: true,  whatsapp_marketing: true,  whatsapp_vendas: true,  whatsapp_lembretes: true,  whatsapp_status_pet: true,  whatsapp_opt_in_data: "2026-07-08T08:30:00", whatsapp_opt_in_origem: "portal" },
            { id: 15, empresa_id: 1, filial_id: 101, nome: "Eduardo Kobra",           telefone: "(11) 92109-7890", email: "kobra.art@studio.com",            endereco: "Rua Harmonia, 400, Vila Madalena - SP",           lat_lng: "-23.5540,-46.6910", pontos_fidelidade: 190, ultima_visita: "2026-07-31", whatsapp_numero: "5511921097890", whatsapp_opt_in: false, whatsapp_marketing: false, whatsapp_vendas: false, whatsapp_lembretes: false, whatsapp_status_pet: false, whatsapp_opt_in_data: null, whatsapp_opt_in_origem: null },
            { id: 16, empresa_id: 1, filial_id: 101, nome: "Sabrina Sato",            telefone: "(11) 91098-8901", email: "sabrina.sato@japa.com",           endereco: "Rua Bela Cintra, 1800, Consolação - SP",          lat_lng: "-23.5590,-46.6620", pontos_fidelidade: 840, ultima_visita: "2026-08-04", whatsapp_numero: "5511910988901", whatsapp_opt_in: true,  whatsapp_marketing: true,  whatsapp_vendas: true,  whatsapp_lembretes: true,  whatsapp_status_pet: true,  whatsapp_opt_in_data: "2026-06-25T12:00:00", whatsapp_opt_in_origem: "plataforma" },
            { id: 17, empresa_id: 1, filial_id: 101, nome: "Otavio Mesquita",         telefone: "(11) 90987-9012", email: "otavio@mesquita.com.br",          endereco: "Av. Brigadeiro Luis Antonio, 3000 - SP",          lat_lng: "-23.5710,-46.6490", pontos_fidelidade: 300, ultima_visita: "2026-08-03", whatsapp_numero: "5511909879012", whatsapp_opt_in: true,  whatsapp_marketing: false, whatsapp_vendas: false, whatsapp_lembretes: true,  whatsapp_status_pet: true,  whatsapp_opt_in_data: "2026-07-30T09:00:00", whatsapp_opt_in_origem: "whatsapp" },
            { id: 18, empresa_id: 1, filial_id: 101, nome: "Larissa Manoela",         telefone: "(11) 99876-0123", email: "lari.manoela@disney.com",         endereco: "Rua Cluch, 120, Perdizes - SP",                   lat_lng: "-23.5350,-46.6730", pontos_fidelidade: 470, ultima_visita: "2026-08-02", whatsapp_numero: "5511998760123", whatsapp_opt_in: true,  whatsapp_marketing: true,  whatsapp_vendas: false, whatsapp_lembretes: true,  whatsapp_status_pet: true,  whatsapp_opt_in_data: "2026-07-22T11:00:00", whatsapp_opt_in_origem: "portal" },
            { id: 19, empresa_id: 1, filial_id: 101, nome: "Caio Castro",             telefone: "(11) 98765-4321", email: "caio.castro@drift.com",           endereco: "Av. Europa, 650, Jardim Europa - SP",             lat_lng: "-23.5750,-46.6740", pontos_fidelidade: 360, ultima_visita: "2026-08-01", whatsapp_numero: "5511987654321", whatsapp_opt_in: true,  whatsapp_marketing: false, whatsapp_vendas: true,  whatsapp_lembretes: true,  whatsapp_status_pet: false, whatsapp_opt_in_data: "2026-08-01T08:00:00", whatsapp_opt_in_origem: "plataforma" },
            { id: 20, empresa_id: 1, filial_id: 101, nome: "Giovanna Ewbank",         telefone: "(11) 97654-5432", email: "gio.ewbank@gioh.com",             endereco: "Rua Artur de Azevedo, 500, Pinheiros - SP",       lat_lng: "-23.5640,-46.6810", pontos_fidelidade: 920, ultima_visita: "2026-08-04", whatsapp_numero: "5511976545432", whatsapp_opt_in: true,  whatsapp_marketing: true,  whatsapp_vendas: true,  whatsapp_lembretes: true,  whatsapp_status_pet: true,  whatsapp_opt_in_data: "2026-06-20T10:00:00", whatsapp_opt_in_origem: "plataforma" }
        ]);

        // 5. 20+ Real Pets Linked to Tutores
        DB.set('pets', [
            { id: 1, empresa_id: 1, filial_id: 101, cliente_id: 1, nome: "Thor", especie: "Cachorro", raca: "Golden Retriever", porte: "Grande", pelagem: "Longa", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Alergia a shampoo de coco. Pele sensível." },
            { id: 2, empresa_id: 1, filial_id: 101, cliente_id: 2, nome: "Luna", especie: "Cachorro", raca: "Shih Tzu", porte: "Pequeno", pelagem: "Longa", temperamento: "Arisco", vacinas_em_dia: true, observacoes: "Sensível no ouvido esquerdo. Usar algodão protetor." },
            { id: 3, empresa_id: 1, filial_id: 101, cliente_id: 3, nome: "Max", especie: "Cachorro", raca: "Rottweiler", porte: "Grande", pelagem: "Curta", temperamento: "Agressivo", vacinas_em_dia: false, observacoes: "Exige uso de focinheira na banheira e secador fraco." },
            { id: 4, empresa_id: 1, filial_id: 101, cliente_id: 4, nome: "Mingau", especie: "Gato", raca: "Persa", porte: "Pequeno", pelagem: "Longa", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Gato Persa com nós no dorso. Banho especial seco." },
            { id: 5, empresa_id: 1, filial_id: 101, cliente_id: 5, nome: "Zeus", especie: "Cachorro", raca: "Spitz Alemão (Lulu)", porte: "Pequeno", pelagem: "Longa", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Tosa bebê tesoura. Escovação de dentes diária." },
            { id: 6, empresa_id: 1, filial_id: 101, cliente_id: 6, nome: "Belinha", especie: "Cachorro", raca: "Poodle Toy", porte: "Pequeno", pelagem: "Longa", temperamento: "Arisco", vacinas_em_dia: true, observacoes: "Medo de barulho alto. Usar protetor auricular." },
            { id: 7, empresa_id: 1, filial_id: 101, cliente_id: 7, nome: "Simba", especie: "Gato", raca: "Maine Coon", porte: "Grande", pelagem: "Longa", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Gato de 9kg. Exige banheira adaptada para felinos." },
            { id: 8, empresa_id: 1, filial_id: 101, cliente_id: 8, nome: "Pandora", especie: "Cachorro", raca: "Bulldog Francês", porte: "Pequeno", pelagem: "Curta", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Assaduras nas dobras faciais. Limpar com lenço umedecido." },
            { id: 9, empresa_id: 1, filial_id: 101, cliente_id: 9, nome: "Bob", especie: "Cachorro", raca: "Border Collie", porte: "Médio", pelagem: "Longa", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Muito ativo! Adora brincar com água." },
            { id: 10, empresa_id: 1, filial_id: 101, cliente_id: 10, nome: "Mel", especie: "Cachorro", raca: "Yorkshire Terrier", porte: "Pequeno", pelagem: "Longa", temperamento: "Arisco", vacinas_em_dia: true, observacoes: "Usar lacinho rosa artesanal pós-banho." },
            { id: 11, empresa_id: 1, filial_id: 101, cliente_id: 11, nome: "Apollo", especie: "Cachorro", raca: "Pastor Alemão", porte: "Grande", pelagem: "Longa", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Displasia coxofemoral leve. Cuidado ao subir na mesa." },
            { id: 12, empresa_id: 1, filial_id: 101, cliente_id: 12, nome: "Chico", especie: "Cachorro", raca: "SRD (Vira-lata)", porte: "Médio", pelagem: "Curta", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Resgatado! Adora carinho no pescoço." },
            { id: 13, empresa_id: 1, filial_id: 101, cliente_id: 13, nome: "Snow", especie: "Gato", raca: "Siamês", porte: "Pequeno", pelagem: "Curta", temperamento: "Arisco", vacinas_em_dia: true, observacoes: "Unhas bem afiadas. Corte obrigatório." },
            { id: 14, empresa_id: 1, filial_id: 101, cliente_id: 14, nome: "Nina", especie: "Cachorro", raca: "Maltês", porte: "Pequeno", pelagem: "Longa", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Mancha lacrimal ao redor dos olhos." },
            { id: 15, empresa_id: 1, filial_id: 101, cliente_id: 15, nome: "Toby", especie: "Cachorro", raca: "Beagle", porte: "Médio", pelagem: "Curta", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Otite fúngica crônica. Ouvidos sob tratamento." },
            { id: 16, empresa_id: 1, filial_id: 101, cliente_id: 16, nome: "Zoe", especie: "Cachorro", raca: "Pug", porte: "Pequeno", pelagem: "Curta", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Olhos proeminentes. Cuidado com shampoo nos olhos." },
            { id: 17, empresa_id: 1, filial_id: 101, cliente_id: 17, nome: "Fred", especie: "Cachorro", raca: "Dachshund (Salsicha)", porte: "Pequeno", pelagem: "Curta", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Problema na coluna. Não dobrar as costas." },
            { id: 18, empresa_id: 1, filial_id: 101, cliente_id: 18, nome: "Mia", especie: "Gato", raca: "Ragdoll", porte: "Médio", pelagem: "Longa", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Super dócil. Fica imóvel na escovação." },
            { id: 19, empresa_id: 1, filial_id: 101, cliente_id: 19, nome: "Rock", especie: "Cachorro", raca: "Boxer", porte: "Grande", pelagem: "Curta", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Força física alta. Usar guia reforçada." },
            { id: 20, empresa_id: 1, filial_id: 101, cliente_id: 20, nome: "Maya", especie: "Cachorro", raca: "Samoieda", porte: "Grande", pelagem: "Longa", temperamento: "Calmo", vacinas_em_dia: true, observacoes: "Pelagem dupla branca super densa. 2h de secador!" }
        ]);

        // 6. Clinical Vet Records
        DB.set('prontuarios', [
            {
                id: 1, empresa_id: 1, filial_id: 101, pet_id: 1, veterinario_id: 2, veterinario_nome: "Dr. Thiago Ramos",
                crmv: "SP-45678", data: "2026-08-04T10:30:00", peso: 31.2, temperatura: 38.4, fc: 105, mucosas: "Normocoradas / Normohidratado",
                anamnese: "Paciente Thor trouxe histórico de dermatite atópica sazonal e prurido em patas traseiras.",
                diagnostico: "Dermatite atópica canina eritematosa",
                prescricao: "1. Apoquel 16mg: Tomar 1 comprimido via oral a cada 12h por 7 dias.\n2. Banho semanal com Shampoo Hipoalergênico Ozonizado."
            },
            {
                id: 2, empresa_id: 1, filial_id: 101, pet_id: 15, veterinario_id: 2, veterinario_nome: "Dr. Thiago Ramos",
                crmv: "SP-45678", data: "2026-08-03T15:00:00", peso: 14.5, temperatura: 38.8, fc: 120, mucosas: "Normocoradas / Normohidratado",
                anamnese: "Paciente Toby com secreção ceruminosa escura e odor fétido no conduto auditivo direito.",
                diagnostico: "Otite externa por Malassezia pachydermatis",
                prescricao: "1. Auritop Gotas: Aplicar 5 gotas no ouvido direito a cada 12h por 10 dias após higienização prévia."
            }
        ]);

        // 7. Baias CatDog
        const baias = [];
        for (let i = 1; i <= 12; i++) {
            baias.push({
                id: i, empresa_id: 1, filial_id: 101,
                numero: `Baia ${i < 10 ? '0' + i : i}`,
                status: i === 1 ? 'Ocupada' : (i === 3 ? 'Ocupada' : (i === 5 ? 'Ocupada' : 'Livre')),
                pet_id: i === 1 ? 1 : (i === 3 ? 2 : (i === 5 ? 5 : null))
            });
        }
        DB.set('baias', baias);

        // 8. Planos de Assinatura
        DB.set('planos_assinatura', [
            { id: 1, empresa_id: 1, nome: "Plano Mensal VIP (4 Banhos + Tosa)", descricao: "4 banhos completos mensais + 1 tosa higiênica e hidratação ozonizada.", preco: 279.00, periodicidade: "Mensal", quantidade_banhos: 4, inclui_tosa: true },
            { id: 2, empresa_id: 1, nome: "Plano Felino Persa (2 Banhos Secos)", descricao: "2 banhos a seco com escovação de nós para gatos de pelagem longa.", preco: 180.00, periodicidade: "Mensal", quantidade_banhos: 2, inclui_tosa: false },
            { id: 3, empresa_id: 1, nome: "Plano Semanal Banho & Secagem", descricao: "1 banho por semana para cães de médio e grande porte.", preco: 220.00, periodicidade: "Mensal", quantidade_banhos: 4, inclui_tosa: false }
        ]);

        // 9. Serviços CatDog
        DB.set('servicos', [
            { id: 1, empresa_id: 1, nome: "Banho & Secagem Completa", descricao: "Banho com shampoo neutro, secagem, corte de unhas e ouvido.", preco: 85.00, duracao: 45 },
            { id: 2, empresa_id: 1, nome: "Tosa Tesoura / Bebê", descricao: "Banho completo + Tosa artesanal na tesoura.", preco: 140.00, duracao: 90 },
            { id: 3, empresa_id: 1, nome: "Banho Hipoalergênico Ozonizado", descricao: "Tratamento dermatológico com ozônio e água morna.", preco: 110.00, duracao: 60 }
        ]);

        // 10. Insumos por Serviço (Ficha Técnica em ml / g / un)
        DB.set('insumos_servico', [
            { id: 1, servico_id: 1, produto_id: 2, nome_insumo: "Shampoo Hipoalergênico 5L", quantidade_dose: 1, unidade: "UN" },
            { id: 2, servico_id: 1, produto_id: 4, nome_insumo: "Lacinhos Artesanais Kit", quantidade_dose: 2, unidade: "UN" }
        ]);

        // 11. Produtos & Insumos ERP
        DB.set('produtos', [
            { id: 1, empresa_id: 1, filial_id: 101, nome: "Ração Premier Cães Adultos Golden 15kg", marca: "Premier Pet", codigo_barras: "78910001", preco_custo: 135.00, margem_lucro: 55.5, preco: 209.90, estoque_minimo: 5, finalidade: "Comercial", categoria: "Ração", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231e293b'/><circle cx='50' cy='50' r='30' fill='%23818cf8'/><text x='50' y='55' font-size='10' fill='white' text-anchor='middle'>RAÇÃO</text></svg>" },
            { id: 2, empresa_id: 1, filial_id: 101, nome: "Shampoo Hipoalergênico Galão 5 Litros", marca: "Pet Clean", codigo_barras: "78910002", preco_custo: 65.00, margem_lucro: 100.0, preco: 130.00, estoque_minimo: 4, finalidade: "Insumo", categoria: "Higiene", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231e293b'/><rect x='35' y='20' width='30' height='60' rx='5' fill='%23c084fc'/><text x='50' y='55' font-size='10' fill='white' text-anchor='middle'>SHAMP</text></svg>" },
            { id: 3, empresa_id: 1, filial_id: 101, nome: "Antipulgas Bravecto Cães 10 a 20kg", marca: "MSD Saude", codigo_barras: "78910003", preco_custo: 180.00, margem_lucro: 38.8, preco: 249.90, estoque_minimo: 3, finalidade: "Comercial", categoria: "Medicamentos", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231e293b'/><polygon points='50,15 90,85 10,85' fill='%2314b8a6'/><text x='50' y='65' font-size='8' fill='white' text-anchor='middle'>BRAVECTO</text></svg>" },
            { id: 4, empresa_id: 1, filial_id: 101, nome: "Lacinhos Artesanais (Kit 100 un)", marca: "Pet Style SP", codigo_barras: null, preco_custo: 15.00, margem_lucro: 166.6, preco: 40.00, estoque_minimo: 10, finalidade: "Insumo", categoria: "Acessórios", foto: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231e293b'/><circle cx='50' cy='50' r='25' fill='%23ec4899'/><text x='50' y='55' font-size='10' fill='white' text-anchor='middle'>LACE</text></svg>" }
        ]);

        // 12. Lotes FEFO com Validade
        const hoje = new Date();
        const vencendo = new Date(hoje); vencendo.setDate(hoje.getDate() + 8);
        const emDia = new Date(hoje); emDia.setDate(hoje.getDate() + 180);

        DB.set('lotes_estoque', [
            { id: 1, empresa_id: 1, filial_id: 101, produto_id: 1, lote: "L-RAC-SP01", quantidade: 4, data_vencimento: vencendo.toISOString().split('T')[0], status: "Disponivel" },
            { id: 2, empresa_id: 1, filial_id: 101, produto_id: 1, lote: "L-RAC-SP02", quantidade: 15, data_vencimento: emDia.toISOString().split('T')[0], status: "Disponivel" },
            { id: 3, empresa_id: 1, filial_id: 101, produto_id: 2, lote: "L-SH5L-01", quantidade: 8, data_vencimento: emDia.toISOString().split('T')[0], status: "Disponivel" },
            { id: 4, empresa_id: 1, filial_id: 101, produto_id: 3, lote: "L-BRAV-01", quantidade: 6, data_vencimento: emDia.toISOString().split('T')[0], status: "Disponivel" }
        ]);

        // 13. Transferências
        DB.set('transferencias_estoque', [
            { id: 1, empresa_id: 1, origem_filial_id: 101, destino_filial_id: 102, produto_id: 2, quantidade: 2, data: "2026-08-03", status: "Concluída" }
        ]);

        // 14. Pacotes Recorrentes Ativos
        DB.set('pacotes_ativos', [
            { id: 1, empresa_id: 1, cliente_id: 1, plano_id: 1, quantidade_banhos: 4, data_aquisicao: "2026-08-01", status: "Ativo" },
            { id: 2, empresa_id: 1, cliente_id: 5, plano_id: 1, quantidade_banhos: 4, data_aquisicao: "2026-08-02", status: "Ativo" },
            { id: 3, empresa_id: 1, cliente_id: 16, plano_id: 3, quantidade_banhos: 4, data_aquisicao: "2026-08-03", status: "Ativo" }
        ]);

        // 15. Agendamentos Kanban Ativos no CatDog SP
        DB.set('agendamentos_kanban', [
            {
                id: 1, empresa_id: 1, filial_id: 101, pet_id: 1, servico_id: 1, baia_id: 1, status: "Agendado", data_agendamento: "2026-08-04T10:00:00",
                possui_ectoparasitas: false, adicional_desembolo: 0, qc_aprovado: false, latitude_entrega: null, longitude_entrega: null, foto_comprovante_url: null,
                checklist: { rasqueamento: false, ouvidos: true, unhas: false, adereco: false, perfume: false }, boletim_zootie: null
            },
            {
                id: 2, empresa_id: 1, filial_id: 101, pet_id: 2, servico_id: 2, baia_id: 3, status: "Em Rota de Busca", data_agendamento: "2026-08-04T11:00:00",
                possui_ectoparasitas: false, adicional_desembolo: 0, qc_aprovado: false, latitude_entrega: null, longitude_entrega: null, foto_comprovante_url: null,
                checklist: { rasqueamento: true, ouvidos: true, unhas: true, adereco: false, perfume: false }, boletim_zootie: null
            },
            {
                id: 3, empresa_id: 1, filial_id: 101, pet_id: 3, servico_id: 1, baia_id: 5, status: "No Banho", data_agendamento: "2026-08-04T11:30:00",
                possui_ectoparasitas: false, adicional_desembolo: 0, qc_aprovado: false, latitude_entrega: null, longitude_entrega: null, foto_comprovante_url: null,
                checklist: { rasqueamento: true, ouvidos: false, unhas: false, adereco: false, perfume: false }, boletim_zootie: null
            },
            {
                id: 4, empresa_id: 1, filial_id: 101, pet_id: 5, servico_id: 2, baia_id: 2, status: "Pronto", data_agendamento: "2026-08-04T09:00:00",
                possui_ectoparasitas: false, adicional_desembolo: 0, qc_aprovado: true, latitude_entrega: "-23.6012", longitude_entrega: "-46.6621", foto_comprovante_url: null,
                checklist: { rasqueamento: true, ouvidos: true, unhas: true, adereco: true, perfume: true },
                boletim_zootie: { estrelas: "5", secador: "Sim, super tranquilo", unhas: "Concluído sem problemas", obs: "O Zeus ficou uma fofura! Tosa tesoura perfeita." }
            }
        ]);

        // 16. Caixas & Movimentações Financeiras CatDog SP
        DB.set('movimentacoes_caixa', [
            { id: 1, empresa_id: 1, filial_id: 101, tipo: "ENTRADA", categoria: "Assinaturas Recorrentes", descricao: "Mensalidade Plano VIP — Carlos Mendes", valor: 279.00, data: "2026-08-01T09:00:00" },
            { id: 2, empresa_id: 1, filial_id: 101, tipo: "ENTRADA", categoria: "Assinaturas Recorrentes", descricao: "Mensalidade Plano Premium — Dr. Gustavo Borges", valor: 399.00, data: "2026-08-01T10:00:00" },
            { id: 3, empresa_id: 1, filial_id: 101, tipo: "ENTRADA", categoria: "Venda Balcão POS", descricao: "Ração Premier 15kg — Mariana Alcantara", valor: 209.90, data: "2026-08-02T14:30:00" },
            { id: 4, empresa_id: 1, filial_id: 101, tipo: "ENTRADA", categoria: "Estética / Banho & Tosa", descricao: "Banho + Tosa Tesoura — Thor (Camila Viana)", valor: 180.00, data: "2026-08-02T11:00:00" },
            { id: 5, empresa_id: 1, filial_id: 101, tipo: "ENTRADA", categoria: "Consulta Veterinária", descricao: "Consulta Clínica Dr. Thiago — Luna", valor: 220.00, data: "2026-08-03T10:30:00" },
            { id: 6, empresa_id: 1, filial_id: 101, tipo: "ENTRADA", categoria: "Venda Balcão POS", descricao: "Antipulgas Bravecto — Sabrina Sato", valor: 249.90, data: "2026-08-03T16:15:00" },
            { id: 7, empresa_id: 1, filial_id: 101, tipo: "ENTRADA", categoria: "Táxi Dog", descricao: "Coleta + Devolução — Zeus (Ricardo Siqueira)", valor: 65.00, data: "2026-08-04T09:00:00" },
            { id: 8, empresa_id: 1, filial_id: 101, tipo: "ENTRADA", categoria: "Estética / Banho & Tosa", descricao: "Banho Simples + Perfume — Mel (Beatriz Oliveira)", valor: 95.00, data: "2026-08-04T14:00:00" },
            { id: 9, empresa_id: 1, filial_id: 101, tipo: "ENTRADA", categoria: "Consulta Veterinária", descricao: "Vacinação V10 + Raiva — Apolo (Larissa Manoela)", valor: 180.00, data: "2026-08-04T15:30:00" },
            { id: 10, empresa_id: 1, filial_id: 101, tipo: "ENTRADA", categoria: "Assinaturas Recorrentes", descricao: "Mensalidade Plano VIP — Giovanna Ewbank", valor: 279.00, data: "2026-08-04T17:00:00" }
        ]);

        // 17. Contas a Pagar / Despesas CatDog SP
        const hoje2 = new Date();
        const d = (offset) => { const dt = new Date(hoje2); dt.setDate(dt.getDate() + offset); return dt.toISOString().split('T')[0]; };
        DB.set('contas_pagar', [
            { id: 1, empresa_id: 1, filial_id: 101, categoria: "Aluguel", descricao: "Aluguel — Unidade Moema (Matriz SP)", valor: 8500.00, data_vencimento: d(5), data_pagamento: null, status: "Pendente", responsavel: "Dra. Julia Silveira" },
            { id: 2, empresa_id: 1, filial_id: 101, categoria: "Folha de Pagamento", descricao: "Salários Agosto — Equipe CatDog (6 colaboradores)", valor: 14800.00, data_vencimento: d(10), data_pagamento: null, status: "Pendente", responsavel: "Dra. Julia Silveira" },
            { id: 3, empresa_id: 1, filial_id: 101, categoria: "Fornecedores / Insumos", descricao: "NF Premier Pet — Ração 20 sacas 15kg", valor: 2700.00, data_vencimento: d(3), data_pagamento: null, status: "Pendente", responsavel: "Amanda Souza" },
            { id: 4, empresa_id: 1, filial_id: 101, categoria: "Água / Energia / Internet", descricao: "Conta de Água + Luz — Moema Agosto", valor: 1340.00, data_vencimento: d(-2), data_pagamento: null, status: "Vencida", responsavel: "Camila Rocha" },
            { id: 5, empresa_id: 1, filial_id: 101, categoria: "Impostos (Simples Nacional)", descricao: "DAS Simples Nacional — Agosto 2026", valor: 3120.00, data_vencimento: d(8), data_pagamento: null, status: "Pendente", responsavel: "Dra. Julia Silveira" },
            { id: 6, empresa_id: 1, filial_id: 101, categoria: "Marketing / Publicidade", descricao: "Meta Ads + Google Ads — Campanha Agosto", valor: 900.00, data_vencimento: d(15), data_pagamento: "2026-08-02", status: "Pago", responsavel: "Camila Rocha" },
            { id: 7, empresa_id: 1, filial_id: 101, categoria: "Manutenção / Limpeza", descricao: "Desjejum + Produtos de Limpeza — Moema", valor: 420.00, data_vencimento: d(-5), data_pagamento: "2026-07-30", status: "Pago", responsavel: "Amanda Souza" },
            { id: 8, empresa_id: 1, filial_id: 101, categoria: "Comissões", descricao: "Comissões Agosto — Bruno Lima + Amanda Souza", valor: 1160.50, data_vencimento: d(12), data_pagamento: null, status: "Pendente", responsavel: "Dra. Julia Silveira" },
            { id: 9, empresa_id: 1, filial_id: 101, categoria: "Fornecedores / Insumos", descricao: "NF Pet Clean — Shampoo Galão 5L (10 un)", valor: 650.00, data_vencimento: d(7), data_pagamento: null, status: "Pendente", responsavel: "Amanda Souza" },
            { id: 10, empresa_id: 1, filial_id: 101, categoria: "Outros", descricao: "Seguro Empresarial — CatDog SP Agosto", valor: 580.00, data_vencimento: d(20), data_pagamento: null, status: "Pendente", responsavel: "Dra. Julia Silveira" }
        ]);

        // 18. Audit Logs
        DB.set('logs_auditoria', [
            { id: 1, empresa_id: 1, usuario: "Dra. Julia Silveira", acao: "Inicialização CatDog SP", detalhe: "Base CatDog Pet Center & Clínica Veterinária inicializada com 20 clientes", timestamp: new Date().toISOString() }
        ]);

        // 19. Configuração WhatsApp (Evolution API) — Produção Railway Online 24/7
        DB.set('whatsapp_config', {
            apiUrl: 'https://evolution-api-production-ebf6.up.railway.app',
            apiKey: '508082bd88fe3bccb52afee3220d41ff30bee226c62f3cde22caf5b7ede22f26',
            instanceName: 'catdog-sp',
            connected: false,
            empresa_id: 1
        });

        // 20. Log de mensagens WhatsApp enviadas
        DB.set('whatsapp_mensagens_log', [
            { id: 1, empresa_id: 1, cliente_id: 1,  numero: "5511988881111", tipo: "status_pet",  mensagem: "🐾 Thor está PRONTO! Pode vir buscar na CatDog Moema. 😊", status: "enviada", timestamp: "2026-08-04T14:35:00" },
            { id: 2, empresa_id: 1, cliente_id: 5,  numero: "5511944445555", tipo: "status_pet",  mensagem: "🐾 Zeus está PRONTO! Pode vir buscar na CatDog Moema. 😊", status: "enviada", timestamp: "2026-08-04T11:20:00" },
            { id: 3, empresa_id: 1, cliente_id: 2,  numero: "5511977772222", tipo: "lembrete",    mensagem: "📅 Lembrete: Luna tem banho amanhã às 10h na CatDog Jardins! Confirme presença.", status: "enviada", timestamp: "2026-08-03T18:00:00" },
            { id: 4, empresa_id: 1, cliente_id: 16, numero: "5511910988901", tipo: "marketing",   mensagem: "🎉 Sabrina! Temos um combo especial de Banho + Tosa para Pugs este mês. Interesse?", status: "enviada", timestamp: "2026-08-02T10:00:00" },
            { id: 5, empresa_id: 1, cliente_id: 10, numero: "5511976542345", tipo: "opt_in",      mensagem: "Olá Patricia! Posso te enviar updates sobre a Mel via WhatsApp?", status: "enviada", timestamp: "2026-07-12T09:00:00" }
        ]);
    },

    init: () => {
        if (!DB.get('empresas') || (DB.get('empresas') && DB.get('empresas')[0] && DB.get('empresas')[0].nome !== "CatDog Pet Center & Clínica Veterinária")) {
            DB.resetAndSeedCatDogData();
        }
        // ✅ Auto-sync CatDog SP to DREasy on startup
        setTimeout(() => {
            if (typeof sincronizarDREasyFluxoCaixa === 'function') {
                sincronizarDREasyFluxoCaixa().catch(e => console.log('Auto-sync boot:', e));
            }
        }, 1000);
    }
};

// Start DB
DB.init();

// 2. STATE ENGINE & SESSION MANAGER
const State = {
    currentEmpresaId: 1,
    currentFilialId: 101,
    isMasterSuperAdmin: false,
    currentProfile: 'Admin',
    currentUser: null,
    cart: [],
    gpsWatcher: null,
    cameraStream: null,
    posFilterQuery: '',
    lastCreatedMasterUser: null,
    
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

// DREASY FLUXO DE CAIXA SYNCHRONIZATION ENGINE
async function sincronizarDREasyFluxoCaixa() {
    const movimentacoes = DB.get('movimentacoes_caixa') || [];
    const empresas = DB.get('empresas') || [];
    const empresa = empresas.find(e => e.id === State.currentEmpresaId) || empresas[0] || {};

    const faturamentoPos = movimentacoes.filter(m => m.categoria && m.categoria.includes('Balcão')).reduce((acc, curr) => acc + (curr.valor || 0), 0);
    const faturamentoServicos = movimentacoes.filter(m => m.categoria && (m.categoria.includes('Assinaturas') || m.categoria.includes('Banho'))).reduce((acc, curr) => acc + (curr.valor || 0), 0);
    const faturamentoVet = movimentacoes.filter(m => m.categoria && m.categoria.includes('Consulta')).reduce((acc, curr) => acc + (curr.valor || 0), 0);
    const totalConsolidado = faturamentoPos + faturamentoServicos + faturamentoVet || 42850.00;

    const dreasyCardFat = document.getElementById('dreasy-card-faturamento');
    if (dreasyCardFat) dreasyCardFat.innerText = `R$ ${totalConsolidado.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

    const dreasyCardTime = document.getElementById('dreasy-card-timestamp');
    if (dreasyCardTime) dreasyCardTime.innerText = `Hoje às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} (Conectado)`;

    const btnSync = document.querySelector('.btn-sync-dreasy');
    if (btnSync) { btnSync.disabled = true; btnSync.innerText = '⏳ Sincronizando com DREasy...'; }

    const startTime = Date.now();

    try {
        // Step 1: Master Auth to DREasy
        let token = null;
        try {
            const authRes = await fetch('https://fluxocaixa.comercial-profitdata.workers.dev/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'master', login: 'profitdata', senha: 'dados' })
            });
            if (authRes.ok) {
                const authData = await authRes.json();
                token = authData.token;
            }
        } catch (e) {
            console.warn('Master auth note:', e);
        }

        // Step 2: Register/Ensure Company in DREasy Companies Table
        if (token) {
            const cleanCnpj = (empresa.cnpj || '38.490.128/0001-99').replace(/\D/g, '');
            try {
                const compPayload = {
                    cnpj: cleanCnpj,
                    name: `${empresa.nome || 'CatDog Pet Center & Clínica Veterinária'} (PataForma ERP)`,
                    responsavel: empresa.responsavel || 'Dra. Julia Silveira',
                    email: empresa.email_master || 'julia@catdogpet.com.br',
                    telefone: empresa.whatsapp || '(11) 99999-8888',
                    password: cleanCnpj.slice(0, 4) || '3849',
                    modules: ['fluxo', 'agenda', 'prec', 'balanco', 'simulador', 'graficos']
                };

                // Check if company already exists to avoid HTTP 409 red log entries in console
                let exists = false;
                try {
                    const listRes = await fetch('https://fluxocaixa.comercial-profitdata.workers.dev/api/companies', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (listRes.ok) {
                        const listData = await listRes.json();
                        const existingList = listData.companies || [];
                        exists = existingList.some(c => (c.cnpj || '').replace(/\D/g, '') === cleanCnpj);
                    }
                } catch (e) {
                    console.warn('Company lookup note:', e);
                }

                if (exists) {
                    // Update existing company via PUT
                    await fetch('https://fluxocaixa.comercial-profitdata.workers.dev/api/companies', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                        body: JSON.stringify(compPayload)
                    });
                } else {
                    // Create new company via POST
                    await fetch('https://fluxocaixa.comercial-profitdata.workers.dev/api/companies', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                        body: JSON.stringify(compPayload)
                    });
                }
            } catch (e) {
                console.warn('Company sync note:', e);
            }
        }

        // Step 3: POST Financial Lead Payload
        const dreasyPayload = {
            nome: `[PETSHOP CONECTADO] ${empresa.nome || 'CatDog Pet Center & Clínica Veterinária'}`,
            whatsapp: empresa.whatsapp || '(11) 99999-8888',
            email: empresa.email_master || 'julia@catdogpet.com.br',
            origem: `ERP PataForma ➔ DREasy | Receita Bruta: R$ ${totalConsolidado.toFixed(2)} | POS: R$ ${faturamentoPos.toFixed(2)} | Serviços: R$ ${faturamentoServicos.toFixed(2)} | Vet: R$ ${faturamentoVet.toFixed(2)} | Transmitido em: ${new Date().toLocaleString('pt-BR')}`
        };

        const res = await fetch('https://fluxocaixa.comercial-profitdata.workers.dev/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dreasyPayload)
        });

        const latency = Date.now() - startTime;

        if (res.ok) {
            DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Sincronização DREasy ✅', `Receita R$ ${totalConsolidado.toFixed(2)} e Empresa cadastradas com sucesso no DREasy!`);
            State.showToast(`⚡ Conectado! Empresa e DRE de R$ ${totalConsolidado.toFixed(2)} registradas no DREasy!`, 'success');

            // Append live log row to table
            const logsTable = document.getElementById('table-dreasy-logs-body');
            if (logsTable) {
                const tr = document.createElement('tr');
                const hash = 'hash_' + Math.random().toString(36).substring(2, 10);
                tr.innerHTML = `
                    <td>${new Date().toLocaleTimeString('pt-BR')}</td>
                    <td>Sincronização Empresa + DRE Consolidada</td>
                    <td><span style="color:#10b981; font-weight:700;">200 OK</span></td>
                    <td>${latency}ms</td>
                    <td style="font-family:monospace; font-size:0.75rem; color:var(--text-muted);">${hash}</td>
                `;
                logsTable.insertBefore(tr, logsTable.firstChild);
            }
        } else {
            throw new Error(`HTTP ${res.status}`);
        }
    } catch (err) {
        console.warn('DREasy sync error:', err);
        DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Sincronização DREasy ⚠️', `Erro ao enviar para DREasy: ${err.message}. Dados salvos localmente.`);
        State.showToast(`⚠️ DREasy temporariamente indisponível. Dados registrados localmente. Tente novamente.`, 'warning');
    } finally {
        if (btnSync) { btnSync.disabled = false; btnSync.innerText = '⚡ Testar Handshake & Enviar DRE'; }
    }
}

// LANDING PAGE & CLIENT AREA NAVIGATION GATEWAY
// =====================================================================
// FICHA DE ANAMNESE — Checklist de Entrada + Assinatura Digital
// =====================================================================

let anamneseJobId = null;
let anamneseCanvas = null;
let anamneseCtx = null;
let anamneseDrawing = false;
let anamneseLastX = 0;
let anamneseLastY = 0;

function abrirFichaAnamnese(jobId) {
    anamneseJobId = jobId;

    const kanban   = DB.get('agendamentos_kanban') || [];
    const job      = kanban.find(k => k.id === jobId);
    if (!job) return;

    const pets     = DB.get('pets') || [];
    const clientes = DB.get('clientes') || [];
    const servicos = DB.get('servicos') || [];
    const pet      = pets.find(p => p.id === job.pet_id);
    const cliente  = clientes.find(c => c.id === job.cliente_id);
    const servico  = servicos.find(s => s.id === job.servico_id);

    // Título do modal
    const tituloEl = document.getElementById('anamnese-titulo');
    if (tituloEl) tituloEl.textContent = `${pet?.especie === 'Gato' ? '🐱' : '🐶'} ${pet?.nome || 'Pet'} — Ficha de Entrada #${jobId}`;

    const subEl = document.getElementById('anamnese-subtitulo');
    if (subEl) subEl.textContent = `Tutor: ${cliente?.nome || '—'} · Serviço: ${servico?.nome || '—'} · ${new Date().toLocaleDateString('pt-BR')}`;

    // Se já tem anamnese salva, preenche o formulário
    if (job.anamnese) {
        const a = job.anamnese;
        const setRadio = (name, val) => {
            const el = document.querySelector(`input[name="${name}"][value="${val}"]`);
            if (el) el.checked = true;
        };
        const setCheck = (id, val) => { const el = document.getElementById(id); if (el) el.checked = val; };

        setRadio('comportamento', a.comportamento);
        setRadio('pelo_condicao', a.pelo_condicao);
        setRadio('pele', a.pele);
        setRadio('condicao_fisica', a.condicao_fisica);
        setRadio('unhas', a.unhas);
        setRadio('ouvidos', a.ouvidos);
        setCheck('check-pulgas', a.parasitas?.pulgas);
        setCheck('check-carrapatos', a.parasitas?.carrapatos);
        setCheck('check-objetos-pelo', a.objetos_pelo);

        // Lesões por região
        (a.lesoes || []).forEach(r => {
            const el = document.getElementById(`lesao-${r}`);
            if (el) el.checked = true;
        });

        const obsEl = document.getElementById('anamnese-obs');
        if (obsEl) obsEl.value = a.observacoes || '';

        // Restaurar assinatura
        setTimeout(() => {
            if (a.assinatura && anamneseCtx) {
                const img = new Image();
                img.onload = () => anamneseCtx.drawImage(img, 0, 0);
                img.src = a.assinatura;
            }
        }, 100);
    } else {
        // Reset form
        document.querySelectorAll('#modal-ficha-anamnese input[type="radio"]').forEach(r => r.checked = false);
        document.querySelectorAll('#modal-ficha-anamnese input[type="checkbox"]').forEach(c => c.checked = false);
        const obsEl = document.getElementById('anamnese-obs');
        if (obsEl) obsEl.value = '';
    }

    openModal('modal-ficha-anamnese');

    // Inicializar canvas de assinatura
    setTimeout(() => {
        anamneseCanvas = document.getElementById('canvas-assinatura');
        if (!anamneseCanvas) return;
        anamneseCtx = anamneseCanvas.getContext('2d');
        anamneseCanvas.width  = anamneseCanvas.offsetWidth || 340;
        anamneseCanvas.height = 140;
        anamneseCtx.strokeStyle = '#e2e8f0';
        anamneseCtx.lineWidth   = 2.5;
        anamneseCtx.lineCap     = 'round';
        anamneseCtx.lineJoin    = 'round';

        if (!job.anamnese) {
            anamneseCtx.clearRect(0, 0, anamneseCanvas.width, anamneseCanvas.height);
        }

        // PointerEvents (funciona em touch/mouse/stylus)
        anamneseCanvas.onpointerdown = (e) => {
            anamneseDrawing = true;
            const r = anamneseCanvas.getBoundingClientRect();
            const scaleX = anamneseCanvas.width / r.width;
            const scaleY = anamneseCanvas.height / r.height;
            anamneseLastX = (e.clientX - r.left) * scaleX;
            anamneseLastY = (e.clientY - r.top)  * scaleY;
            anamneseCanvas.setPointerCapture(e.pointerId);
        };
        anamneseCanvas.onpointermove = (e) => {
            if (!anamneseDrawing) return;
            const r = anamneseCanvas.getBoundingClientRect();
            const scaleX = anamneseCanvas.width / r.width;
            const scaleY = anamneseCanvas.height / r.height;
            const x = (e.clientX - r.left) * scaleX;
            const y = (e.clientY - r.top)  * scaleY;
            anamneseCtx.beginPath();
            anamneseCtx.moveTo(anamneseLastX, anamneseLastY);
            anamneseCtx.lineTo(x, y);
            anamneseCtx.stroke();
            anamneseLastX = x;
            anamneseLastY = y;
        };
        anamneseCanvas.onpointerup   = () => { anamneseDrawing = false; };
        anamneseCanvas.onpointerout  = () => { anamneseDrawing = false; };
    }, 80);
}

function limparAssinaturaAnamnese() {
    if (!anamneseCtx || !anamneseCanvas) return;
    anamneseCtx.clearRect(0, 0, anamneseCanvas.width, anamneseCanvas.height);
}

function salvarFichaAnamnese() {
    if (!anamneseJobId) return;

    const getRadio = (name) => {
        const el = document.querySelector(`input[name="${name}"]:checked`);
        return el ? el.value : null;
    };
    const getCheck = (id) => {
        const el = document.getElementById(id);
        return el ? el.checked : false;
    };

    const comportamento = getRadio('comportamento');
    if (!comportamento) {
        State.showToast('⚠️ Informe o comportamento do pet antes de salvar.', 'warning');
        return;
    }

    // Regiões com lesão marcadas
    const lesoesRegioes = ['cabeca', 'pescoco', 'costas', 'barriga', 'patas-dianteiras', 'patas-traseiras', 'cauda'];
    const lesoes = lesoesRegioes.filter(r => getCheck(`lesao-${r}`));

    // Assinatura (base64)
    let assinaturaBase64 = null;
    if (anamneseCanvas) {
        // Verifica se o canvas tem conteúdo (não é completamente transparente)
        const imageData = anamneseCtx.getImageData(0, 0, anamneseCanvas.width, anamneseCanvas.height).data;
        const hasSignature = imageData.some(v => v !== 0);
        assinaturaBase64 = hasSignature ? anamneseCanvas.toDataURL('image/png') : null;
    }

    const anamnese = {
        data: new Date().toISOString(),
        responsavel: State.currentUserName || 'Equipe',
        comportamento: comportamento,
        pelo_condicao: getRadio('pelo_condicao'),
        pele: getRadio('pele'),
        condicao_fisica: getRadio('condicao_fisica'),
        unhas: getRadio('unhas'),
        ouvidos: getRadio('ouvidos'),
        parasitas: {
            pulgas: getCheck('check-pulgas'),
            carrapatos: getCheck('check-carrapatos'),
        },
        objetos_pelo: getCheck('check-objetos-pelo'),
        lesoes: lesoes,
        observacoes: (document.getElementById('anamnese-obs')?.value || '').trim(),
        assinatura: assinaturaBase64,
    };

    // Salva no job do Kanban
    const kanban = DB.get('agendamentos_kanban') || [];
    const idx = kanban.findIndex(k => k.id === anamneseJobId);
    if (idx !== -1) {
        kanban[idx].anamnese = anamnese;
        // Avança para Aguardando Banho se ainda estava em Agendado
        if (kanban[idx].status === 'Agendado') {
            kanban[idx].status = 'Aguardando Banho';
        }
        DB.set('agendamentos_kanban', kanban);
        DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Anamnese Preenchida', `Ficha de entrada do job #${anamneseJobId} registrada.`);
    }

    closeModal('modal-ficha-anamnese');
    renderKanban();
    State.showToast('✅ Ficha de Anamnese salva com sucesso!', 'success');
}

// =====================================================================
// PORTAL DO TUTOR — Acompanhamento em Tempo Real
// =====================================================================

const PORTAL_ETAPAS = [
    { id: 'Agendado',          label: 'Agendado',       emoji: '📅', desc: 'Serviço confirmado' },
    { id: 'Em Rota de Busca',  label: 'Em Busca',       emoji: '🚕', desc: 'A caminho da sua casa' },
    { id: 'Aguardando Banho',  label: 'Na Triagem',     emoji: '🛁', desc: 'Aguardando atendimento' },
    { id: 'No Banho',          label: 'No Banho',       emoji: '🧼', desc: 'Tomando banho agora!' },
    { id: 'Em Tosa',           label: 'Na Tosa',        emoji: '✂️', desc: 'Sendo tosa/escovado' },
    { id: 'Inspecao QC',       label: 'Revisão Final',  emoji: '🔍', desc: 'Inspeção de qualidade' },
    { id: 'Pronto',            label: 'Pronto! ✨',     emoji: '✨', desc: 'Seu pet está pronto!' },
    { id: 'Entregue',          label: 'Entregue',       emoji: '🏡', desc: 'De volta ao lar' },
];

const PORTAL_ETA = {
    'Agendado':         { texto: 'Serviço ainda não iniciado', cor: '#94a3b8' },
    'Em Rota de Busca': { texto: 'Coleta em andamento — ~15–30 min', cor: '#f97316' },
    'Aguardando Banho': { texto: 'Na fila de atendimento — ~30–60 min', cor: '#f59e0b' },
    'No Banho':         { texto: 'Lavando agora — ~30–40 min para ficar pronto', cor: '#38bdf8' },
    'Em Tosa':          { texto: 'Na tosa — ~20–30 min para ficar pronto', cor: '#c084fc' },
    'Inspecao QC':      { texto: 'Quase pronto! Revisão final — ~10 min', cor: '#818cf8' },
    'Pronto':           { texto: '🎉 Seu pet está pronto para retirada!', cor: '#10b981' },
    'Entregue':         { texto: '✅ Serviço concluído. Até a próxima!', cor: '#34d399' },
};

let portalTutorRefreshTimer = null;
let portalTutorJobAtivo = null;

function abrirPortalTutor() {
    // Mostra nome da empresa atual
    const empresas = DB.get('empresas') || [];
    const empresa = empresas.find(e => e.id === State.currentEmpresaId) || empresas[0];
    const nomeEl = document.getElementById('portal-tutor-empresa-nome');
    if (nomeEl && empresa) nomeEl.textContent = empresa.nome;

    // Reset para step de busca
    voltarBuscaPortalTutor();
    document.getElementById('portal-busca-pet').value = '';
    document.getElementById('portal-busca-resultados').innerHTML = '';

    openModal('modal-portal-tutor');
}

function buscarPetPortalTutor(query) {
    const q = (query || '').trim().toLowerCase();
    const resultadosEl = document.getElementById('portal-busca-resultados');
    if (!resultadosEl) return;

    if (q.length < 2) {
        resultadosEl.innerHTML = '';
        return;
    }

    const kanban  = (DB.get('agendamentos_kanban') || []).filter(k => k.empresa_id === State.currentEmpresaId);
    const pets    = DB.get('pets') || [];
    const clientes = DB.get('clientes') || [];
    const servicos = DB.get('servicos') || [];

    // Busca por nome do pet ou telefone/nome do tutor
    const matches = kanban.filter(job => {
        const pet     = pets.find(p => p.id === job.pet_id);
        const cliente = clientes.find(c => c.id === job.cliente_id);
        if (!pet) return false;
        const nomePet = (pet.nome || '').toLowerCase();
        const nomeTutor = (cliente?.nome || '').toLowerCase();
        const telTutor  = (cliente?.telefone || '').replace(/\D/g, '');
        return nomePet.includes(q) || nomeTutor.includes(q) || telTutor.includes(q.replace(/\D/g, ''));
    }).slice(0, 6);

    if (matches.length === 0) {
        resultadosEl.innerHTML = `<div class="portal-no-result">😔 Nenhum pet encontrado. Verifique o nome ou fale com o pet shop.</div>`;
        return;
    }

    resultadosEl.innerHTML = matches.map(job => {
        const pet     = pets.find(p => p.id === job.pet_id);
        const cliente = clientes.find(c => c.id === job.cliente_id);
        const etapa   = PORTAL_ETAPAS.find(e => e.id === job.status) || PORTAL_ETAPAS[0];
        const especieIcon = pet?.especie === 'Gato' ? '🐱' : '🐶';
        return `
            <div class="portal-result-card" onclick="selecionarPetPortalTutor(${job.id})">
                <div class="portal-result-icon">${especieIcon}</div>
                <div class="portal-result-info">
                    <div class="portal-result-name">${pet?.nome || '—'}</div>
                    <div class="portal-result-tutor">Tutor: ${cliente?.nome || 'Não identificado'}</div>
                </div>
                <div class="portal-result-status" style="color:${PORTAL_ETA[job.status]?.cor || '#94a3b8'};">
                    ${etapa.emoji} ${etapa.label}
                </div>
            </div>`;
    }).join('');
}

function selecionarPetPortalTutor(jobId) {
    const kanban  = DB.get('agendamentos_kanban') || [];
    const job = kanban.find(k => k.id === jobId);
    if (!job) return;

    portalTutorJobAtivo = jobId;

    const pets     = DB.get('pets') || [];
    const clientes = DB.get('clientes') || [];
    const servicos = DB.get('servicos') || [];
    const empresas = DB.get('empresas') || [];
    const pet      = pets.find(p => p.id === job.pet_id);
    const cliente  = clientes.find(c => c.id === job.cliente_id);
    const servico  = servicos.find(s => s.id === job.servico_id);
    const empresa  = empresas.find(e => e.id === job.empresa_id);

    // ── Card do Pet ──────────────────────────────────────────
    const especieIcon = pet?.especie === 'Gato' ? '🐱' : '🐶';
    const alergias = pet?.observacoes ? `<div class="portal-pet-obs">⚠️ ${pet.observacoes}</div>` : '';
    document.getElementById('portal-pet-card').innerHTML = `
        <div class="portal-pet-avatar">${especieIcon}</div>
        <div class="portal-pet-info">
            <div class="portal-pet-name">${pet?.nome || 'Pet'}</div>
            <div class="portal-pet-meta">${pet?.raca || ''} · ${pet?.porte || ''} · ${pet?.especie || ''}</div>
            <div class="portal-pet-servico">✂️ ${servico?.nome || 'Serviço'}</div>
            ${alergias}
        </div>
        <div class="portal-pet-id">#${job.id}</div>
    `;

    // ── Timeline ─────────────────────────────────────────────
    const statusIdx = PORTAL_ETAPAS.findIndex(e => e.id === job.status);
    const timelineEl = document.getElementById('portal-timeline');
    timelineEl.innerHTML = PORTAL_ETAPAS.map((etapa, i) => {
        let cls = 'portal-step-pending';
        if (i < statusIdx)  cls = 'portal-step-done';
        if (i === statusIdx) cls = 'portal-step-active';
        return `
            <div class="portal-step ${cls}">
                <div class="portal-step-dot">
                    ${i < statusIdx ? '✓' : etapa.emoji}
                </div>
                <div class="portal-step-line ${i === PORTAL_ETAPAS.length - 1 ? 'last' : ''}"></div>
                <div class="portal-step-label">
                    <span class="portal-step-name">${etapa.label}</span>
                    ${i === statusIdx ? `<span class="portal-step-desc">${etapa.desc}</span>` : ''}
                </div>
            </div>`;
    }).join('');

    // ── ETA Card ──────────────────────────────────────────────
    const eta = PORTAL_ETA[job.status] || { texto: '—', cor: '#94a3b8' };
    document.getElementById('portal-eta-card').innerHTML = `
        <div class="portal-eta-icon">⏱️</div>
        <div class="portal-eta-text" style="color:${eta.cor};">${eta.texto}</div>
    `;

    // ── Histórico ─────────────────────────────────────────────
    const historicoJobs = kanban
        .filter(k => k.cliente_id === job.cliente_id && k.id !== job.id && k.status === 'Entregue')
        .slice(-3)
        .reverse();

    const historicoEl = document.getElementById('portal-historico-lista');
    if (historicoJobs.length === 0) {
        historicoEl.innerHTML = `<p class="portal-no-result">Primeira visita 🎉</p>`;
    } else {
        historicoEl.innerHTML = historicoJobs.map(h => {
            const svc = servicos.find(s => s.id === h.servico_id);
            const petH = pets.find(p => p.id === h.pet_id);
            return `
                <div class="portal-historico-item">
                    <div class="portal-historico-icon">✅</div>
                    <div>
                        <div style="font-size:0.82rem;font-weight:600;">${petH?.nome || '—'} — ${svc?.nome || 'Serviço'}</div>
                        <div style="font-size:0.72rem;color:var(--text-muted);">Concluído · Job #${h.id}</div>
                    </div>
                </div>`;
        }).join('');
    }

    // ── WhatsApp ──────────────────────────────────────────────
    const whatsBtn = document.getElementById('portal-btn-whats');
    const tel = empresa?.telefone ? empresa.telefone.replace(/\D/g, '') : '5566996513050';
    const msg = encodeURIComponent(`Olá! Sou tutor do ${pet?.nome || 'meu pet'} e gostaria de saber sobre o serviço #${job.id}.`);
    if (whatsBtn) whatsBtn.onclick = () => window.open(`https://wa.me/${tel}?text=${msg}`, '_blank');

    // Transição para step de status
    document.getElementById('portal-tutor-step-busca').style.display = 'none';
    document.getElementById('portal-tutor-step-status').style.display = '';

    // Auto-refresh a cada 30s (simula tempo real)
    clearInterval(portalTutorRefreshTimer);
    portalTutorRefreshTimer = setInterval(() => {
        if (portalTutorJobAtivo) selecionarPetPortalTutor(portalTutorJobAtivo);
    }, 30000);
}

function voltarBuscaPortalTutor() {
    portalTutorJobAtivo = null;
    clearInterval(portalTutorRefreshTimer);
    document.getElementById('portal-tutor-step-status').style.display = 'none';
    document.getElementById('portal-tutor-step-busca').style.display = '';
}

function contatoWhatsPortal() {
    const empresas = DB.get('empresas') || [];
    const empresa = empresas.find(e => e.id === State.currentEmpresaId) || empresas[0];
    const tel = empresa?.telefone ? empresa.telefone.replace(/\D/g, '') : '5566996513050';
    window.open(`https://wa.me/${tel}?text=${encodeURIComponent('Olá! Gostaria de saber sobre o meu pet.')}`, '_blank');
}

function abrirAreaClientePortal(modo = 'cliente') {
    openModal('modal-login-portal');
    alternarModoPortal(modo);
}


function alternarModoPortal(modo) {
    const tabCliente = document.getElementById('tab-portal-cliente');
    const tabGestor = document.getElementById('tab-portal-gestor');
    const formCliente = document.getElementById('form-portal-cliente');
    const formGestor = document.getElementById('form-portal-gestor');
    const modalTitle = document.getElementById('portal-modal-title');

    if (modo === 'gestor') {
        if (tabCliente) tabCliente.classList.remove('active');
        if (tabGestor) tabGestor.classList.add('active');
        if (formCliente) formCliente.style.display = 'none';
        if (formGestor) formGestor.style.display = 'block';
        if (modalTitle) {
            modalTitle.innerText = "🏢 Portal de Gestão PataForma";
            modalTitle.style.color = "#38bdf8";
        }
    } else {
        if (tabGestor) tabGestor.classList.remove('active');
        if (tabCliente) tabCliente.classList.add('active');
        if (formGestor) formGestor.style.display = 'none';
        if (formCliente) formCliente.style.display = 'block';
        if (modalTitle) {
            modalTitle.innerText = "🔐 Portal de Entrada — PataForma";
            modalTitle.style.color = "#3b82f6";
        }
    }
}

function abrirModalTrial14Dias(planoNome) {
    if (planoNome) {
        const select = document.getElementById('trial-plano-select');
        if (select) {
            for (let opt of select.options) {
                if (opt.value.toLowerCase().includes(planoNome.toLowerCase())) {
                    opt.selected = true;
                    break;
                }
            }
        }
    }
    openModal('modal-trial-14dias');
}

function solicitarTrial14DiasSubmit(e) {
    e.preventDefault();
    const petshop = document.getElementById('trial-petshop-nome').value.trim();
    const responsavel = document.getElementById('trial-responsavel-nome').value.trim();
    const whatsapp = document.getElementById('trial-whatsapp').value.trim();
    const cidade = document.getElementById('trial-cidade').value.trim() || 'São Paulo - SP';
    const plano = document.getElementById('trial-plano-select').value;
    const btn = document.getElementById('btn-trial-submit');

    if (!petshop || !responsavel || !whatsapp) {
        State.showToast('Por favor, preencha todos os campos obrigatórios!', 'error');
        return;
    }

    if (btn) btn.disabled = true;

    // Send lead to DREasy API
    notificarDREasyNovoLead(petshop, responsavel, whatsapp, `Trial 14 Dias Ativado | ${cidade} | ${plano}`);

    // Register new demo company in LocalStorage so user can immediately test
    const empresas = DB.get('empresas') || [];
    const newEmpId = empresas.length > 0 ? Math.max(...empresas.map(emp => emp.id)) + 1 : 1;
    const cleanCnpj = `38.490.${Math.floor(100 + Math.random() * 900)}/0001-${Math.floor(10 + Math.random() * 90)}`;
    
    const newEmpresa = {
        id: newEmpId,
        nome: `${petshop} (14 Dias Trial)`,
        cnpj: cleanCnpj,
        responsavel: responsavel,
        email_master: `${responsavel.toLowerCase().replace(/\s+/g, '')}@${petshop.toLowerCase().replace(/\s+/g, '')}.com.br`,
        whatsapp: whatsapp,
        plano: plano,
        status: "Trial (14 Dias)",
        data_criacao: new Date().toISOString().split('T')[0]
    };
    
    empresas.push(newEmpresa);
    DB.set('empresas', empresas);
    State.currentEmpresaId = newEmpId;

    closeModal('modal-trial-14dias');
    exibirAppERP();
    switchTab('kanban');

    // LEAD SCORING: Register lead with score in CRM
    const deals = DB.get('crm_deals') || [];
    deals.push({
        id: Date.now(),
        empresa_id: State.currentEmpresaId,
        title: `Trial 14 Dias — ${petshop}`,
        client_name: responsavel,
        client_phone: whatsapp,
        client_city: cidade,
        deal_value: plano.includes('Ouro') ? 499 : plano.includes('Prata') ? 279 : 149,
        stage: 'lead',
        lead_score: 10,
        probability: 30,
        status: 'IN_PROGRESS',
        interactions: [
            { type: 'TRIAL_ACTIVATED', notes: `Trial 14 dias ativado — ${plano}`, date: new Date().toISOString(), author: 'Sistema' }
        ],
        tasks: [
            { title: `Ligar para ${responsavel} em 3 dias para acompanhamento`, due_date: new Date(Date.now() + 3*86400000).toISOString(), completed: false }
        ],
        created_at: new Date().toISOString()
    });
    DB.set('crm_deals', deals);

    State.showToast(`🎉 Parabéns ${responsavel}! Seu teste de 14 dias para ${petshop} foi ativado!`, 'success');

    setTimeout(() => {
        const msg = `Olá *${responsavel}*! Seu teste de 14 dias do *PataForma ERP* para o *${petshop}* (${plano}) foi ativado com sucesso!`;
        window.open(`https://api.whatsapp.com/send?phone=5566996513050&text=${encodeURIComponent(msg)}`, '_blank');
        if (btn) btn.disabled = false;
    }, 1200);
}

// =====================================================================
// LOGIN OPERACIONAL — 2 PASSOS: Avatar Grid + Teclado PIN (ATM Style)
// =====================================================================

const PINLoginState = {
    usuarioSelecionado: null,
    pinDigitado: '',
    maxDigitos: 4
};

const PERFIL_META = {
    Admin:       { label: 'Administrador', emoji: '👑', colorClass: 'avatar-color-admin',       badgeClass: 'badge-color-admin' },
    Supervisor:  { label: 'Supervisor',    emoji: '🔍', colorClass: 'avatar-color-supervisor',  badgeClass: 'badge-color-supervisor' },
    Veterinario: { label: 'Veterinário',   emoji: '🩺', colorClass: 'avatar-color-veterinario', badgeClass: 'badge-color-veterinario' },
    Recepcao:    { label: 'Recepção/Caixa',emoji: '🛒', colorClass: 'avatar-color-recepcao',    badgeClass: 'badge-color-recepcao' },
    Banhista:    { label: 'Banho & Tosa',  emoji: '🧼', colorClass: 'avatar-color-banhista',    badgeClass: 'badge-color-banhista' },
    Tosador:     { label: 'Tosador',       emoji: '✂️', colorClass: 'avatar-color-banhista',    badgeClass: 'badge-color-banhista' },
    Entregador:  { label: 'Táxi Dog',      emoji: '🚕', colorClass: 'avatar-color-entregador',  badgeClass: 'badge-color-entregador' },
};

function getInitiais(nome) {
    const partes = nome.trim().split(' ');
    if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase();
    return (partes[0][0] + partes[1][0]).toUpperCase();
}

function abrirLoginOperacionalPIN() {
    // Reset estado
    PINLoginState.usuarioSelecionado = null;
    PINLoginState.pinDigitado = '';

    // Mostra step 1, esconde step 2
    document.getElementById('pin-step-1').style.display = '';
    document.getElementById('pin-step-2').style.display = 'none';

    // Preenche nome da empresa
    const empresas = DB.get('empresas') || [];
    const empresa = empresas.find(e => e.id === State.currentEmpresaId) || empresas[0];
    if (empresa) {
        document.getElementById('pin-empresa-nome').textContent = empresa.nome;
    }

    // Monta grid de avatares
    const usuarios = (DB.get('usuarios') || [])
        .filter(u => u.empresa_id === (empresa ? empresa.id : 1));

    const grid = document.getElementById('avatar-grid-funcionarios');
    grid.innerHTML = '';

    usuarios.forEach(u => {
        const meta = PERFIL_META[u.perfil] || { label: u.perfil, emoji: '👤', colorClass: 'avatar-color-recepcao', badgeClass: 'badge-color-recepcao' };
        const iniciais = getInitiais(u.nome);
        const card = document.createElement('div');
        card.className = 'avatar-card';
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Login como ${u.nome}`);
        card.innerHTML = `
            <div class="avatar-initials ${meta.colorClass}">${iniciais}</div>
            <span class="avatar-name">${u.nome.split(' ')[0]}</span>
            <span class="avatar-role-badge ${meta.badgeClass}">${meta.emoji} ${meta.label}</span>
        `;
        card.addEventListener('click', () => selecionarFuncionarioLogin(u));
        grid.appendChild(card);
    });

    openModal('modal-login-operacional');
}

function selecionarFuncionarioLogin(usuario) {
    PINLoginState.usuarioSelecionado = usuario;
    PINLoginState.pinDigitado = '';

    const meta = PERFIL_META[usuario.perfil] || { label: usuario.perfil, emoji: '👤', colorClass: 'avatar-color-recepcao', badgeClass: 'badge-color-recepcao' };
    const iniciais = getInitiais(usuario.nome);

    // Monta preview do usuário selecionado
    document.getElementById('pin-user-preview').innerHTML = `
        <div class="avatar-initials ${meta.colorClass}" style="width:68px;height:68px;font-size:1.5rem;">${iniciais}</div>
        <span class="preview-name">${usuario.nome}</span>
        <span class="preview-role">${meta.emoji} ${meta.label}</span>
    `;

    // Reset dots
    atualizarDotsPIN();
    document.getElementById('pin-hint-msg').textContent = 'Digite seu PIN de 4 dígitos';
    document.getElementById('pin-hint-msg').style.color = '';

    // Transição entre steps
    document.getElementById('pin-step-1').style.display = 'none';
    document.getElementById('pin-step-2').style.display = '';
}

function voltarParaAvatarGrid() {
    PINLoginState.usuarioSelecionado = null;
    PINLoginState.pinDigitado = '';
    document.getElementById('pin-step-2').style.display = 'none';
    document.getElementById('pin-step-1').style.display = '';
}

function digitarPINLogin(digito) {
    if (PINLoginState.pinDigitado.length >= PINLoginState.maxDigitos) return;
    PINLoginState.pinDigitado += String(digito);
    atualizarDotsPIN();
    // Auto-confirmar ao atingir 4 dígitos
    if (PINLoginState.pinDigitado.length === PINLoginState.maxDigitos) {
        setTimeout(() => confirmarPINLogin(), 180);
    }
}

function apagarPINLogin() {
    PINLoginState.pinDigitado = PINLoginState.pinDigitado.slice(0, -1);
    atualizarDotsPIN();
}

function atualizarDotsPIN() {
    const len = PINLoginState.pinDigitado.length;
    for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`pd-${i}`);
        dot.classList.toggle('filled', i < len);
        dot.classList.remove('error');
    }
}

function confirmarPINLogin() {
    const usuario = PINLoginState.usuarioSelecionado;
    if (!usuario) return;

    // Validação de PIN (demo: todos usam "1234")
    const pinEsperado = usuario.pin || '1234';
    const pinDigitado = PINLoginState.pinDigitado;

    if (pinDigitado.length < 4) {
        document.getElementById('pin-hint-msg').textContent = 'Digite os 4 dígitos completos';
        return;
    }

    if (pinDigitado !== pinEsperado) {
        // Erro: shake nos dots
        for (let i = 0; i < 4; i++) {
            const dot = document.getElementById(`pd-${i}`);
            dot.classList.remove('filled');
            dot.classList.add('error');
        }
        document.getElementById('pin-hint-msg').textContent = '❌ PIN incorreto. Tente novamente.';
        document.getElementById('pin-hint-msg').style.color = 'var(--danger)';
        PINLoginState.pinDigitado = '';
        setTimeout(() => {
            atualizarDotsPIN();
            document.getElementById('pin-hint-msg').textContent = 'Digite seu PIN de 4 dígitos';
            document.getElementById('pin-hint-msg').style.color = '';
        }, 900);
        return;
    }

    // ✅ PIN correto — efetuar login
    State.currentEmpresaId = usuario.empresa_id;
    State.currentFilialId  = usuario.filial_id;
    State.currentProfile   = usuario.perfil;
    State.currentUser      = usuario;

    const profileSelector = document.getElementById('current-profile-select');
    if (profileSelector) profileSelector.value = usuario.perfil;

    closeModal('modal-login-operacional');
    exibirAppERP();
    applyRBAC(usuario.perfil);

    DB.logAudit(usuario.empresa_id, usuario.perfil, 'Login PIN Avatar', `${usuario.nome} (${usuario.perfil}) autenticado via PIN.`);
    State.showToast(`🚀 Bem-vindo(a), ${usuario.nome.split(' ')[0]}!`, 'success');

    // Redirecionar para o módulo principal do perfil
    if (usuario.perfil === 'Entregador')  switchTab('taxi');
    else if (usuario.perfil === 'Banhista' || usuario.perfil === 'Tosador') switchTab('kanban');
    else if (usuario.perfil === 'Recepcao')    switchTab('caixa');
    else if (usuario.perfil === 'Veterinario') switchTab('prontuario');
    else switchTab('kanban');
}

// Mantida para compatibilidade com eventuais chamadas externas
function loginRapidoPerfil(perfil) {
    const usuarios = DB.get('usuarios') || [];
    const u = usuarios.find(usr => usr.perfil === perfil && usr.empresa_id === State.currentEmpresaId);
    if (u) selecionarFuncionarioLogin(u);
}


function loginGestorDirectSubmit(e) {
    e.preventDefault();
    const user = document.getElementById('input-portal-gestor-user').value.trim();
    const pass = document.getElementById('input-portal-gestor-pass').value.trim();

    if (user === 'pataforma' && pass === 'abc@123') {
        State.isMasterSuperAdmin = true;
        document.getElementById('master-top-bar').style.display = 'flex';
        document.getElementById('nav-master-saas').style.display = 'flex';
        closeModal('modal-login-portal');
        
        exibirAppERP();
        DB.logAudit(State.currentEmpresaId, 'Gestão PataForma', 'Autenticação Gestão', 'Acesso à gestão realizado via Portal');
        State.showToast("🏢 Autenticado com sucesso na Gestão PataForma!", "success");
        
        renderEmpresasSelector();
        switchTab('master-saas');
    } else {
        State.showToast("❌ Credenciais de Gestão incorretas!", "error");
    }
}

function abrirCadastroPetShopGestor() {
    closeModal('modal-login-portal');
    openModal('modal-empresa');
}

function exibirAppERP() {
    document.getElementById('public-landing-page').style.display = 'none';
    document.getElementById('app-erp-container').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function voltarParaLandingPage() {
    document.getElementById('app-erp-container').style.display = 'none';
    document.getElementById('public-landing-page').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function calcularROISimulacao() {
    const banhosEl = document.getElementById('roi-input-banhos');
    const ticketEl = document.getElementById('roi-input-ticket');
    const pacotesEl = document.getElementById('roi-input-pacotes');

    const banhos = parseInt(banhosEl ? banhosEl.value : 350) || 350;
    const ticket = parseFloat(ticketEl ? ticketEl.value : 85) || 85;
    const pacotesPct = parseInt(pacotesEl ? pacotesEl.value : 40) || 40;

    // 1. Ganho com Pacotes Recorrentes (Fidelização + Aumento LTV em 35%)
    const ganhoRecorrencia = (banhos * (pacotesPct / 100)) * (ticket * 0.35) * 12;

    // 2. Recuperação de Faltas & No-Shows (Lembretes Automáticos WhatsApp)
    const ganhoNoShows = (banhos * 0.15) * ticket * 12;

    // 3. Retorno Automático Vacinal & Veterinário
    const ganhoVet = Math.round(banhos * 0.20) * 180 * 12;

    // 4. Economia Ficha Técnica (Dosagem Insumos + Validade FEFO)
    const economiaInsumos = banhos * 12 * 4.80;

    const impactoTotalAnual = ganhoRecorrencia + ganhoNoShows + ganhoVet + economiaInsumos;

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };

    set('roi-result-text', `R$ ${impactoTotalAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
    set('roi-val-recorrencia', `+ R$ ${ganhoRecorrencia.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/ano`);
    set('roi-val-noshows', `+ R$ ${ganhoNoShows.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/ano`);
    set('roi-val-vet', `+ R$ ${ganhoVet.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/ano`);
    set('roi-val-insumos', `+ R$ ${economiaInsumos.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/ano`);
}

function simularFichaTecnica() {
    const porte = document.getElementById('demo-ft-porte') ? document.getElementById('demo-ft-porte').value : 'Medio';
    const servico = document.getElementById('demo-ft-servico') ? document.getElementById('demo-ft-servico').value : 'BanhoTosa';

    let shDose = 40, condDose = 25, acc = '1 Lacinho';
    let custo = 2.40, preco = 80.00;

    if (porte === 'Pequeno') { shDose = 25; condDose = 15; custo = 1.60; preco = 65.00; }
    else if (porte === 'Grande') { shDose = 70; condDose = 45; acc = '1 Bandana G'; custo = 4.80; preco = 120.00; }

    if (servico === 'BanhoTosa') { preco += 30.00; }
    else if (servico === 'Tratamento') { shDose += 20; custo += 3.50; preco += 50.00; }

    const margemVal = preco - custo;
    const margemPct = ((margemVal / preco) * 100).toFixed(1);

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    set('demo-ft-res-shampoo', `${shDose} ml`);
    set('demo-ft-res-condicionador', `${condDose} ml`);
    set('demo-ft-res-acessorios', acc);
    set('demo-ft-res-custo', `R$ ${custo.toFixed(2)}`);
    set('demo-ft-res-preco', `R$ ${preco.toFixed(2)}`);
    set('demo-ft-res-margem', `${margemPct}% (Lucro: R$ ${margemVal.toFixed(2)})`);
}

function demoEmissaoReceita() {
    gerarReceitaImpressao(1);
    State.showToast('📄 Modelo de Receita Médica com CRMV gerado para impressão/PDF!', 'success');
}

// CNPJ API LOOKUP FREE RECEITA FEDERAL (BrasilAPI)
async function buscarCNPJReceitaAPI() {
    const rawCnpj = document.getElementById('input-emp-cnpj').value;
    const cleanCnpj = rawCnpj.replace(/\D/g, '');
    const statusSpan = document.getElementById('cnpj-api-status');

    if (cleanCnpj.length !== 14) {
        statusSpan.style.color = '#ef4444';
        statusSpan.innerText = '❌ O CNPJ deve conter exatamente 14 dígitos numéricos.';
        return;
    }

    statusSpan.style.color = '#38bdf8';
    statusSpan.innerText = '⏳ Consultando Receita Federal via BrasilAPI...';

    try {
        const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`);
        if (!response.ok) throw new Error('CNPJ não encontrado na Receita Federal.');

        const data = await response.json();
        
        const razao = data.razao_social || data.nome_fantasia || 'Pet Shop Cadastrado';
        const cidadeUf = `${data.municipio || 'São Paulo'} / ${data.uf || 'SP'}`;
        const endereco = `${data.logradouro || 'Rua Principal'}, ${data.numero || '100'} - ${data.bairro || 'Centro'} (CEP: ${data.cep || '00000-000'})`;
        const tel = data.ddd_telefone_1 ? `(${data.ddd_telefone_1.substring(0,2)}) ${data.ddd_telefone_1.substring(2)}` : '';

        document.getElementById('input-emp-nome').value = razao;
        document.getElementById('input-emp-cidade').value = cidadeUf;
        document.getElementById('input-emp-endereco').value = endereco;
        if (tel && !document.getElementById('input-emp-whatsapp').value) {
            document.getElementById('input-emp-whatsapp').value = tel;
        }

        statusSpan.style.color = '#10b981';
        statusSpan.innerText = `✅ Dados de "${razao}" auto-preenchidos com sucesso via Receita Federal!`;
        State.showToast(`CNPJ de ${razao} encontrado!`, 'success');
    } catch (err) {
        statusSpan.style.color = '#f59e0b';
        statusSpan.innerText = '⚠️ CNPJ não localizado via API. Por favor, preencha os dados manualmente.';
        State.showToast("Preencha a Razão Social manualmente.", "warning");
    }
}

// SAVE NEW PET SHOP TENANT & GENERATE OWNER USER
function salvarEmpresa(e) {
    e.preventDefault();
    const cnpj = document.getElementById('input-emp-cnpj').value;
    const nome = document.getElementById('input-emp-nome').value;
    const cidade = document.getElementById('input-emp-cidade').value;
    const endereco = document.getElementById('input-emp-endereco').value;
    const responsavel = document.getElementById('input-emp-responsavel').value;
    const whatsapp = document.getElementById('input-emp-whatsapp').value;
    const email_master = document.getElementById('input-emp-email-master').value;
    const plano = document.getElementById('select-emp-plano').value;
    const status = document.getElementById('select-emp-status').value;

    // ✅ SECURITY FIX: Generate a unique random password instead of fixed 'catdog123'
    const gerarSenha = () => {
        const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789!@#';
        let s = '';
        for (let i = 0; i < 10; i++) s += chars[Math.floor(Math.random() * chars.length)];
        return s;
    };
    const senhaGerada = gerarSenha();

    const empresas = DB.get('empresas') || [];
    const filiais = DB.get('filiais') || [];
    const usuarios = DB.get('usuarios') || [];

    const newEmpresaId = empresas.length > 0 ? Math.max(...empresas.map(e => e.id)) + 1 : 1;
    const newFilialId = filiais.length > 0 ? Math.max(...filiais.map(f => f.id)) + 1 : 101;
    const newUsuarioId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;

    // 1. Save Empresa
    empresas.push({
        id: newEmpresaId,
        nome: nome,
        cnpj: cnpj,
        responsavel: responsavel,
        email_master: email_master,
        whatsapp: whatsapp,
        plano: plano,
        status: status,
        modulos: { kanban: true, taxi_dog: true, caixa: true, estoque: true, assinaturas: true, analytics: true }
    });

    // 2. Save Matriz Branch
    filiais.push({
        id: newFilialId,
        empresa_id: newEmpresaId,
        nome: `${nome} (Matriz)`,
        cidade: cidade,
        uf: "SP",
        gerente: responsavel,
        status: "Ativa"
    });

    // 3. Save Owner User
    const masterUser = {
        id: newUsuarioId,
        empresa_id: newEmpresaId,
        filial_id: newFilialId,
        nome: responsavel,
        perfil: "Admin",
        email: email_master,
        senha: senhaGerada,
        cargo: "Proprietário Administrador",
        kanban: true, taxi_dog: true, caixa: true, qc: true,
        comissao_banho: 10, comissao_tosa: 25, comissao_acumulada: 0
    };
    usuarios.push(masterUser);

    DB.set('empresas', empresas);
    DB.set('filiais', filiais);
    DB.set('usuarios', usuarios);

    DB.logAudit(newEmpresaId, 'Gestão PataForma', 'Onboarding Pet Shop', `Empresa ${nome} cadastrada com Administrador ${email_master}`);

    State.lastCreatedMasterUser = {
        petshop: nome,
        dono: responsavel,
        email: email_master,
        senha: senhaGerada,
        whatsapp: whatsapp
    };

    closeModal('modal-empresa');
    populatePortalLoginOptions();
    renderEmpresasSelector();

    // Populate Created Credentials Modal
    document.getElementById('created-petshop-nome').innerText = nome;
    document.getElementById('created-owner-nome').innerText = responsavel;
    document.getElementById('created-owner-email').innerText = email_master;
    document.getElementById('created-owner-pass').innerText = senhaGerada;

    openModal('modal-credenciais-criadas');
    State.showToast(`🎉 Pet Shop ${nome} cadastrado! Acesso do Administrador gerado.`, 'success');

    // ✅ REAL POST to DREasy — register new client as a captured lead
    const leadPayload = {
        nome: `[PataForma NOVO CLIENTE] ${responsavel} — ${nome}`,
        whatsapp: whatsapp,
        email: email_master,
        origem: `Onboarding PataForma ERP | Plano: ${plano} | CNPJ: ${cnpj} | Cidade: ${cidade} | Pet Shop: ${nome} | Criado em: ${new Date().toLocaleDateString('pt-BR')}`
    };
    fetch('https://fluxocaixa.comercial-profitdata.workers.dev/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
    }).then(r => {
        if (r.ok) console.log(`✅ DREasy: Lead de ${nome} registrado com sucesso!`);
        else console.warn(`⚠️ DREasy lead error: HTTP ${r.status}`);
    }).catch(e => console.warn('DREasy lead sync:', e));
}

function enviarAcessoMasterWhatsApp() {
    const cred = State.lastCreatedMasterUser;
    if (!cred) return;

    const cleanTel = cred.whatsapp.replace(/\D/g, '');
    const msg = `🐾 *PATAFORMA B2B SAAS - BEM-VINDO!* 🐾%0A%0AHolá *${cred.dono}*! O seu Pet Shop *${cred.petshop}* foi cadastrado no PataForma com sucesso!%0A%0A🔑 *SEUS DADOS DE ACESSO:*%0A🌐 Link de Acesso: https://pataforma-bkj.pages.dev/%0A📧 E-mail: *${cred.email}*%0A🔑 Senha Inicial: *${cred.senha}*%0A%0A Ao entrar, acesse o menu *Equipe & Comissões* para criar os acessos dos seus tosadores, banhistas e atendentes!`;

    window.open(`https://api.whatsapp.com/send?phone=55${cleanTel}&text=${msg}`, '_blank');
}

// Filial Switcher
function renderFiliaisHeaderSelector() {
    const filiais = (DB.get('filiais') || []).filter(f => f.empresa_id === State.currentEmpresaId);
    const selector = document.getElementById('select-filial-header');
    if (!selector) return;
    selector.innerHTML = '';

    filiais.forEach(f => {
        selector.innerHTML += `<option value="${f.id}" ${f.id === State.currentFilialId ? 'selected' : ''}>📍 ${f.nome}</option>`;
    });
}

function trocarFilialAtiva(filialId) {
    State.currentFilialId = parseInt(filialId);
    const filias = DB.get('filiais') || [];
    const filial = filias.find(f => f.id === State.currentFilialId);

    const subtitle = document.getElementById('current-filial-subtitle');
    if (subtitle && filial) subtitle.innerText = `${filial.nome} — Área do Cliente ERP`;

    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Troca de Filial', `Unidade alterada para ${filial ? filial.nome : 'Filial'}`);
    
    applyRBAC(State.currentProfile);
    State.showToast(`📍 Unidade alterada para: ${filial ? filial.nome : 'Filial'}`, 'info');
}

// 3. STAFF LOGIN PORTAL & RBAC
function populatePortalLoginOptions() {
    const empresas = DB.get('empresas') || [];
    const empresaSelect = document.getElementById('select-portal-empresa');
    if (empresaSelect) {
        empresaSelect.innerHTML = '';
        empresas.forEach(e => empresaSelect.innerHTML += `<option value="${e.id}">${e.nome}</option>`);
    }
    atualizarFiliaisPortalLogin();
}

function atualizarFiliaisPortalLogin() {
    const empresaId = parseInt(document.getElementById('select-portal-empresa').value || State.currentEmpresaId);
    const filiais = (DB.get('filiais') || []).filter(f => f.empresa_id === empresaId);
    const filialSelect = document.getElementById('select-portal-filial');
    if (filialSelect) {
        filialSelect.innerHTML = '';
        filiais.forEach(f => filialSelect.innerHTML += `<option value="${f.id}">${f.nome}</option>`);
    }
    
    const usuarios = (DB.get('usuarios') || []).filter(u => u.empresa_id === empresaId);
    const usuarioSelect = document.getElementById('select-portal-usuario');
    if (usuarioSelect) {
        usuarioSelect.innerHTML = '';
        usuarios.forEach(u => usuarioSelect.innerHTML += `<option value="${u.id}">${u.nome} (${u.cargo || u.perfil})</option>`);
    }
}

function loginPortalSubmit(e) {
    e.preventDefault();
    const userId = parseInt(document.getElementById('select-portal-usuario').value);
    const filialId = parseInt(document.getElementById('select-portal-filial').value);
    const usuarios = DB.get('usuarios');
    const user = usuarios.find(u => u.id === userId);

    if (user) {
        State.currentUser = user;
        State.currentProfile = user.perfil;
        State.currentEmpresaId = user.empresa_id;
        State.currentFilialId = filialId;

        const sessionContainer = document.getElementById('user-session-container');
        if (sessionContainer) {
            sessionContainer.innerHTML = `
                <div class="user-session-widget">
                    <span>👤 <strong>${user.nome}</strong> (${user.cargo || user.perfil})</span>
                    <button onclick="logoutFuncionario()" style="background:rgba(239,68,68,0.2); border:1px solid rgba(239,68,68,0.4); color:#f87171; padding:0.15rem 0.4rem; border-radius:4px; cursor:pointer; font-size:0.7rem;">Sair</button>
                </div>
            `;
        }

        closeModal('modal-login-portal');
        exibirAppERP();
        renderFiliaisHeaderSelector();
        applyRBAC(user.perfil);

        DB.logAudit(State.currentEmpresaId, user.nome, 'Login Portal', `Usuário ${user.nome} logou na filial #${filialId}`);
        State.showToast(`👋 Bem-vindo(a), ${user.nome}! Área do cliente carregada.`, 'success');

        if (user.perfil === 'Entregador') switchTab('taxi');
        else if (user.perfil === 'Banhista') switchTab('kanban');
        else if (user.perfil === 'Recepcao') switchTab('caixa');
        else if (user.perfil === 'Veterinario') switchTab('prontuario');
        else switchTab('kanban');
    }
}

function logoutFuncionario() {
    State.currentUser = null;
    State.currentProfile = 'Admin';
    const sessionContainer = document.getElementById('user-session-container');
    if (sessionContainer) {
        sessionContainer.innerHTML = `<button class="btn-staff-login" onclick="abrirAreaClientePortal('cliente')">🔐 Entrar no Portal</button>`;
    }
    applyRBAC('Admin');
    voltarParaLandingPage();
    State.showToast("Sessão da equipe encerrada.", "info");
}

function logoutMaster() {
    State.isMasterSuperAdmin = false;
    document.getElementById('master-top-bar').style.display = 'none';
    document.getElementById('nav-master-saas').style.display = 'none';
    voltarParaLandingPage();
    State.showToast("Sessão de gestão encerrada.", "info");
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
    if (companyHeader) companyHeader.innerHTML = emp ? `🏢 ${emp.nome}` : '🏢 CatDog Pet Center SP';

    renderFiliaisHeaderSelector();
    applyRBAC(State.currentProfile);
    State.showToast(`Contexto alterado para: ${emp ? emp.nome : 'Empresa'}`, 'info');
}

// 4. RBAC VISIBILITY & ROUTER
function applyRBAC(profileName) {
    State.currentProfile = profileName;

    const navKanban = document.getElementById('nav-kanban');
    const navProntuario = document.getElementById('nav-prontuario');
    const navBaias = document.getElementById('nav-baias');
    const navCaixa = document.getElementById('nav-caixa');
    const navEstoque = document.getElementById('nav-estoque');
    const navFiliais = document.getElementById('nav-filiais');
    const navAnalytics = document.getElementById('nav-analytics');
    const navTaxi = document.getElementById('nav-taxi');
    const navClientes = document.getElementById('nav-clientes-pets');
    const navProdutos = document.getElementById('nav-produtos');
    const navEquipe = document.getElementById('nav-equipe');
    const navAssinaturas = document.getElementById('nav-assinaturas');
    const navDreasy = document.getElementById('nav-dreasy');
    const navCrm = document.getElementById('nav-crm');
    const navWhatsApp = document.getElementById('nav-whatsapp');

    if (profileName === 'Veterinario') {
        if (navKanban) navKanban.style.display = 'flex';
        if (navProntuario) navProntuario.style.display = 'flex';
        if (navBaias) navBaias.style.display = 'flex';
        if (navCaixa) navCaixa.style.display = 'none';
        if (navEstoque) navEstoque.style.display = 'none';
        if (navFiliais) navFiliais.style.display = 'none';
        if (navAnalytics) navAnalytics.style.display = 'none';
        if (navTaxi) navTaxi.style.display = 'none';
        if (navClientes) navClientes.style.display = 'flex';
        if (navProdutos) navProdutos.style.display = 'none';
        if (navEquipe) navEquipe.style.display = 'none';
        if (navAssinaturas) navAssinaturas.style.display = 'none';
        if (navDreasy) navDreasy.style.display = 'none';
        if (navCrm) navCrm.style.display = 'none';
    } else if (profileName === 'Entregador') {
        if (navKanban) navKanban.style.display = 'none';
        if (navProntuario) navProntuario.style.display = 'none';
        if (navBaias) navBaias.style.display = 'none';
        if (navCaixa) navCaixa.style.display = 'none';
        if (navEstoque) navEstoque.style.display = 'none';
        if (navFiliais) navFiliais.style.display = 'none';
        if (navAnalytics) navAnalytics.style.display = 'none';
        if (navTaxi) navTaxi.style.display = 'flex';
        if (navClientes) navClientes.style.display = 'none';
        if (navProdutos) navProdutos.style.display = 'none';
        if (navEquipe) navEquipe.style.display = 'none';
        if (navAssinaturas) navAssinaturas.style.display = 'none';
        if (navDreasy) navDreasy.style.display = 'none';
        if (navCrm) navCrm.style.display = 'none';
    } else if (profileName === 'Banhista') {
        if (navKanban) navKanban.style.display = 'flex';
        if (navProntuario) navProntuario.style.display = 'none';
        if (navBaias) navBaias.style.display = 'flex';
        if (navCaixa) navCaixa.style.display = 'none';
        if (navEstoque) navEstoque.style.display = 'none';
        if (navFiliais) navFiliais.style.display = 'none';
        if (navAnalytics) navAnalytics.style.display = 'none';
        if (navTaxi) navTaxi.style.display = 'none';
        if (navClientes) navClientes.style.display = 'none';
        if (navProdutos) navProdutos.style.display = 'none';
        if (navEquipe) navEquipe.style.display = 'none';
        if (navAssinaturas) navAssinaturas.style.display = 'none';
        if (navDreasy) navDreasy.style.display = 'none';
        if (navCrm) navCrm.style.display = 'none';
    } else {
        if (navKanban) navKanban.style.display = 'flex';
        if (navProntuario) navProntuario.style.display = 'flex';
        if (navBaias) navBaias.style.display = 'flex';
        if (navCaixa) navCaixa.style.display = 'flex';
        if (navEstoque) navEstoque.style.display = 'flex';
        if (navFiliais) navFiliais.style.display = 'flex';
        if (navAnalytics) navAnalytics.style.display = 'flex';
        if (navTaxi) navTaxi.style.display = 'flex';
        if (navClientes) navClientes.style.display = 'flex';
        if (navProdutos) navProdutos.style.display = 'flex';
        if (navEquipe) navEquipe.style.display = 'flex';
        if (navAssinaturas) navAssinaturas.style.display = 'flex';
        if (navDreasy) navDreasy.style.display = 'flex';
        if (navCrm) navCrm.style.display = 'flex';
        if (navWhatsApp) navWhatsApp.style.display = 'flex';
    }
}

function switchTab(tabId) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    const activeSection = document.getElementById(`section-${tabId}`);
    const activeBtn = document.getElementById(`nav-${tabId}`);
    
    if (activeSection) activeSection.classList.add('active');
    if (activeBtn) activeBtn.classList.add('active');

    if (tabId === 'kanban') renderKanban();
    if (tabId === 'prontuario') renderProntuariosTable();
    if (tabId === 'baias') renderBaiasGrid();
    if (tabId === 'caixa') renderCaixa();
    if (tabId === 'estoque') renderEstoque();
    if (tabId === 'filiais') { renderFiliaisTable(); renderTransferenciasTable(); }
    if (tabId === 'analytics') renderAnalytics();
    if (tabId === 'taxi') renderTaxiDog();
    if (tabId === 'clientes-pets') { renderClientesTable(); renderPetsTable(); }
    if (tabId === 'produtos') renderProdutosCrudTable();
    if (tabId === 'equipe') renderFuncionariosTable();
    if (tabId === 'assinaturas') renderAssinaturasCards();
    if (tabId === 'dreasy') sincronizarDREasyFluxoCaixa();
    if (tabId === 'financeiro') renderFinanceiro();
    if (tabId === 'crm') renderCRM();
    if (tabId === 'master-saas') renderMasterPanel();
    if (tabId === 'whatsapp') renderWhatsApp();
}

// 5. CLIENTES (20 TUTORES SP) & PETS TABLES
function renderClientesTable() {
    const clientes = (DB.get('clientes') || []).filter(c => c.empresa_id === State.currentEmpresaId);
    const pets = DB.get('pets') || [];
    const tbody = document.getElementById('table-clientes-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    clientes.forEach(c => {
        const clientPets = pets.filter(p => p.cliente_id === c.id);
        const petsNames = clientPets.map(p => `${p.especie === 'Gato' ? '🐱' : '🐶'} ${p.nome}`).join(', ');
        const isAnon = c.status === 'ANONYMIZED' || c.nome.startsWith('TITULAR_ANONIMIZADO');

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>👤 ${c.nome}</strong> ${isAnon ? '<span class="validade-badge vencido" style="font-size:0.65rem;">🔒 LGPD Anonimizado</span>' : ''}</td>
            <td>${c.telefone || '—'}</td>
            <td>${c.email || '—'}</td>
            <td><small>${c.endereco || '—'}</small></td>
            <td><span class="validade-badge em-dia">⭐ ${c.pontos_fidelidade || 0} pts</span></td>
            <td>
                <div style="display:flex; gap:0.4rem;">
                    <button class="card-btn" onclick="abrirModalPetParaCliente(${c.id})">➕ Pet</button>
                    ${!isAnon ? `<button class="card-btn" style="background:rgba(239,68,68,0.15); color:#f87171; border-color:rgba(239,68,68,0.3);" onclick="anonimizarClienteLGPD(${c.id})">🔒 LGPD</button>` : ''}
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function anonimizarClienteLGPD(clienteId) {
    if (!confirm('🔒 LGPD (Art. 18, VI) — Direito ao Esquecimento:\n\nTem certeza que deseja anonimizar este cliente?\nOs dados pessoais (Nome, Telefone, E-mail, Endereço) serão substituídos por uma máscara anônima irreversível. Os históricos de vendas e lançamentos de caixa serão preservados para auditoria fiscal.')) return;

    const clientes = DB.get('clientes') || [];
    const idx = clientes.findIndex(c => c.id === clienteId);
    if (idx === -1) return;

    const oldName = clientes[idx].nome;
    const anonHash = 'TITULAR_ANONIMIZADO_' + clienteId;
    clientes[idx].nome = anonHash;
    clientes[idx].telefone = '00000000000';
    clientes[idx].email = `anon_${clienteId}@lgpd.lgpd`;
    clientes[idx].endereco = 'Endereço Anonimizado conforme Art. 18, VI LGPD';
    clientes[idx].status = 'ANONYMIZED';
    clientes[idx].custom_attributes = {};

    DB.set('clientes', clientes);
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Anonimização LGPD 🛡️', `Cliente "${oldName}" (ID ${clienteId}) foi anonimizado conforme Art. 18, VI da LGPD.`);
    State.showToast(`🛡️ Cliente anonimizado com sucesso conforme a LGPD! Histórico financeiro preservado.`, 'success');
    renderClientesTable();
}

function renderPetsTable() {
    const pets = (DB.get('pets') || []).filter(p => p.empresa_id === State.currentEmpresaId);
    const clientes = DB.get('clientes') || [];
    const tbody = document.getElementById('table-pets-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    pets.forEach(p => {
        const tutor = clientes.find(c => c.id === p.cliente_id);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${p.especie === 'Gato' ? '🐱' : '🐶'} ${p.nome}</strong></td>
            <td>${p.especie}</td>
            <td>${p.raca} | ${p.porte} | ${p.pelagem}</td>
            <td><span class="validade-badge ${p.temperamento === 'Agressivo' ? 'vencido' : (p.temperamento === 'Arisco' ? 'vencendo' : 'em-dia')}">${p.temperamento}</span></td>
            <td>${tutor ? tutor.nome : 'Sem tutor'}</td>
            <td><span class="validade-badge ${p.vacinas_em_dia ? 'em-dia' : 'vencido'}">${p.vacinas_em_dia ? 'Em dia' : 'Atrasadas'}</span></td>
            <td><small>${p.observacoes}</small></td>
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
            <td>${u.comissao_banho}%</td>
            <td>${u.comissao_tosa}%</td>
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
        card.className = 'glass-panel kpi-card';
        card.style.flexDirection = 'column';
        card.style.alignItems = 'flex-start';
        card.innerHTML = `
            <h3 style="color:var(--primary); font-size:1.1rem; margin-bottom:0.5rem;">💳 ${p.nome}</h3>
            <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.75rem;">${p.descricao}</p>
            <div style="font-size:1.5rem; font-weight:800; color:var(--text-main); margin-bottom:0.75rem;">
                R$ ${p.preco.toFixed(2)} <span style="font-size:0.8rem; color:var(--text-muted);">/ ${p.periodicidade}</span>
            </div>
            <button class="btn-primary" style="width:100%; justify-content:center;" onclick="abrirModalAssinarPlano(${p.id})">✍️ Vincular a Cliente Tutor</button>
        `;
        container.appendChild(card);
    });
}

// 6. FICHA TÉCNICA SUPPLY DEDUCTION & KANBAN ENGINE
function deduzirInsumosFichaTecnica(servicoId) {
    const insumos = DB.get('insumos_servico') || [];
    const servicoInsumos = insumos.filter(i => i.servico_id === servicoId);
    if (servicoInsumos.length === 0) return;

    const lotes = DB.get('lotes_estoque') || [];
    
    servicoInsumos.forEach(insumo => {
        let doseNecessaria = insumo.quantidade_dose;
        const lotesProduto = lotes.filter(l => l.produto_id === insumo.produto_id && l.status === 'Disponivel');

        for (let lote of lotesProduto) {
            if (doseNecessaria <= 0) break;

            if (lote.quantidade >= doseNecessaria) {
                lote.quantidade -= doseNecessaria;
                doseNecessaria = 0;
            } else {
                doseNecessaria -= lote.quantidade;
                lote.quantidade = 0;
            }
            if (lote.quantidade === 0) lote.status = 'Esgotado';
        }
    });

    DB.set('lotes_estoque', lotes);
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Baixa Insumos Operacionais', `Insumos baixados automaticamente do estoque para serviço #${servicoId}`);
    State.showToast(`🧼 Ficha Técnica: Insumos operacionais baixados automaticamente do estoque!`, 'info');
}

const STATUS_LIST = ['Agendado', 'Em Rota de Busca', 'Aguardando Banho', 'No Banho', 'Em Tosa', 'Inspecao QC', 'Pronto', 'Entregue'];

function renderKanbanSkeletons() {
    const skeletonHTML = `
        <div class="kanban-card-skeleton">
            <div class="skeleton-line w-70"></div>
            <div class="skeleton-line w-50 h-8"></div>
            <div class="skeleton-line w-90 h-8"></div>
        </div>
        <div class="kanban-card-skeleton">
            <div class="skeleton-line w-50"></div>
            <div class="skeleton-line w-70 h-8"></div>
            <div class="skeleton-line w-90 h-8"></div>
        </div>`;
    document.querySelectorAll('.kanban-column-cards').forEach(col => {
        col.innerHTML = skeletonHTML;
    });
}

function renderKanban(skipSkeleton = false) {
    if (!skipSkeleton) {
        renderKanbanSkeletons();
        setTimeout(() => renderKanban(true), 320);
        return;
    }

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
        card.className = 'kanban-card card-enter';
        card.draggable = true;
        card.dataset.id = item.id;

        let alertHTML = '';
        if (pet.temperamento === 'Agressivo') alertHTML += `<span class="alert-badge danger">⚠️ Agressivo</span>`;
        if (!pet.vacinas_em_dia) alertHTML += `<span class="alert-badge danger">💉 Vacinas Atrasadas</span>`;

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
            </div>

            <div class="card-actions">
                ${(item.status === 'Agendado' || item.status === 'Aguardando Banho') ? `
                    <button class="card-btn card-btn-anamnese ${item.anamnese ? 'done' : 'pending'}"
                            onclick="abrirFichaAnamnese(${item.id})">
                        ${item.anamnese ? '✅ Anamnese' : '📋 Anamnese'}
                    </button>` : ''}
                ${item.status === 'Inspecao QC' ? `<button class="card-btn" onclick="inspeccionarQC(${item.id})">🔍 QC</button>` : ''}
                ${item.status === 'Pronto' || item.status === 'Entregue' ? `<button class="card-btn" style="color:#818cf8;" onclick="abrirZootieModal(${item.id})">🐶 Boletim</button>` : ''}
                <button class="card-btn" onclick="verDetalhesKanban(${item.id})">ℹ️ Info</button>
            </div>
        `;

        // Drag Events — melhorados com classe visual
        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.id);
            requestAnimationFrame(() => card.classList.add('dragging'));
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
        });

        const columnId = getColumnIdByStatus(item.status);
        const colContainer = document.querySelector(`#col-${columnId} .kanban-column-cards`);
        if (colContainer) colContainer.appendChild(card);
    });

    // Drag-over highlight nas colunas
    document.querySelectorAll('.kanban-column-cards').forEach(col => {
        col.addEventListener('dragover', (e) => {
            e.preventDefault();
            col.classList.add('drag-over');
        });
        col.addEventListener('dragleave', () => {
            col.classList.remove('drag-over');
        });
        col.addEventListener('drop', () => {
            col.classList.remove('drag-over');
        });
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

function inspeccionarQC(jobId) {
    const kanbanData = DB.get('agendamentos_kanban');
    const item = kanbanData.find(k => k.id === jobId);
    if (!item) return;

    item.status = 'Pronto';
    DB.set('agendamentos_kanban', kanbanData);
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Inspeção QC ✅', `Pet ID ${item.pet_id} aprovado na inspeção de qualidade de Banho & Tosa.`);
    State.showToast(`🔍 Inspeção de Qualidade aprovada! Status alterado para "Pronto".`, 'success');
    renderKanban();
}

function verDetalhesKanban(jobId) {
    const kanbanData = DB.get('agendamentos_kanban') || [];
    const item = kanbanData.find(k => k.id === jobId);
    if (!item) return;

    const pets = DB.get('pets') || [];
    const clientes = DB.get('clientes') || [];
    const pet = pets.find(p => p.id === item.pet_id);
    const cliente = pet ? clientes.find(c => c.id === pet.cliente_id) : null;

    const msg = `ℹ️ Detalhes da Ordem #${item.id}\n\nPet: ${pet ? pet.nome : 'N/A'} (${pet ? pet.raca : ''})\nTutor: ${cliente ? cliente.nome : 'N/A'}\nTelefone: ${cliente ? cliente.telefone : 'N/A'}\nStatus: ${item.status}\nHorário: ${item.horario}\nProfissional: ${item.profissional}`;
    alert(msg);
}

function atualizarOrcamentoDinamicoAgendamento() {
    const servicoSelect = document.getElementById('select-agendar-servico');
    const pelagemSelect = document.getElementById('select-agendar-pelagem');
    const taxiCheck = document.getElementById('check-agendar-taxi');

    const precoDisplay = document.getElementById('calc-agendar-preco');
    const tempoDisplay = document.getElementById('calc-agendar-tempo');
    const taxiDisplay = document.getElementById('calc-agendar-taxi');

    if (!servicoSelect || !precoDisplay) return;

    const produtos = DB.get('produtos') || [];
    const servicoId = parseInt(servicoSelect.value);
    const servico = produtos.find(p => p.id === servicoId);

    let precoBase = servico ? servico.preco : 85.00;
    let tempoBase = servico && servico.tempo_estimado_min ? servico.tempo_estimado_min : 45;

    if (pelagemSelect) {
        if (pelagemSelect.value === 'Longa') precoBase += 15.00;
        if (pelagemSelect.value === 'Com Nós') { precoBase += 35.00; tempoBase += 20; }
    }

    let taxiExtra = 0;
    if (taxiCheck && taxiCheck.checked) {
        taxiExtra = 20.00;
        if (taxiDisplay) taxiDisplay.innerText = 'Sim (+R$ 20)';
    } else {
        if (taxiDisplay) taxiDisplay.innerText = 'Não';
    }

    const valorTotal = precoBase + taxiExtra;
    if (precoDisplay) precoDisplay.innerText = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    if (tempoDisplay) tempoDisplay.innerText = `${tempoBase} min`;
}

function atualizarOrcamentoDinâmicoAgendamento() {
    atualizarOrcamentoDinamicoAgendamento();
}

function getColumnIdByStatus(status) {
    const map = { 'Agendado': 'agendado', 'Em Rota de Busca': 'rota', 'Aguardando Banho': 'aguardando', 'No Banho': 'banho', 'Em Tosa': 'tosa', 'Inspecao QC': 'qc', 'Pronto': 'pronto', 'Entregue': 'entregue' };
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

    const pets = DB.get('pets') || [];
    const clientes = DB.get('clientes') || [];
    const servicos = DB.get('servicos') || [];
    const pet = pets.find(p => p.id === item.pet_id);
    const cliente = clientes.find(c => c.id === (pet ? pet.cliente_id : null));
    const servico = servicos.find(s => s.id === item.servico_id);
    const oldStatus = item.status;

    if (newStatus === 'No Banho' && oldStatus !== 'No Banho') {
        deduzirInsumosFichaTecnica(item.servico_id);
    }

    // 🤖 WhatsApp automático: avisa tutor quando pet fica PRONTO
    if (newStatus === 'Pronto' && oldStatus !== 'Pronto' && cliente && cliente.whatsapp_opt_in && cliente.whatsapp_status_pet) {
        const empresas = DB.get('empresas') || [];
        const empresa = empresas.find(e => e.id === item.empresa_id) || {};
        const msg = `🐾 *${pet ? pet.nome : 'Seu pet'}* está *PRONTO* para retirada!\n\n✅ Serviço: ${servico ? servico.nome : 'Banho & Tosa'}\n📍 Local: ${empresa.nome || 'CatDog Pet Center'}\n\nAguardamos você! 😊🐶`;
        enviarMensagemWhatsApp(cliente.whatsapp_numero, msg, cliente.id, 'status_pet');
    }

    item.status = newStatus;
    DB.set('agendamentos_kanban', kanbanData);
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Transição Kanban', `Pet ${pet ? pet.nome : '#'+cardId} movido de ${oldStatus} para ${newStatus}`);

    renderKanban();
    State.showToast(`Pet ${pet ? pet.nome : ''} movido para ${newStatus}.`, 'info');
}

// 7. VETERINARY CLINICAL RECORDS & PRESCRIPTION ENGINE
function renderProntuariosTable() {
    const prontuarios = (DB.get('prontuarios') || []).filter(p => p.empresa_id === State.currentEmpresaId);
    const pets = DB.get('pets') || [];
    const clientes = DB.get('clientes') || [];
    const tbody = document.getElementById('table-prontuarios-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    prontuarios.forEach(p => {
        const pet = pets.find(item => item.id === p.pet_id);
        const cliente = pet ? clientes.find(c => c.id === pet.cliente_id) : null;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${new Date(p.data).toLocaleDateString('pt-BR')}</td>
            <td><strong>${pet ? pet.nome : 'Pet'}</strong> (${cliente ? cliente.nome : 'Tutor'})</td>
            <td><span class="validade-badge em-dia">${p.veterinario_nome} (${p.crmv})</span></td>
            <td><small>⚖️ ${p.peso}kg | 🌡️ ${p.temperamento || p.temperatura || '38.5'}°C | 🫀 ${p.fc}bpm</small></td>
            <td><strong>${p.diagnostico}</strong></td>
            <td><small>${p.prescricao.substring(0, 45)}...</small></td>
            <td><button class="card-btn" style="color:#14b8a6;" onclick="gerarReceitaImpressao(${p.id})">📄 Imprimir Receita</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function salvarProntuarioSubmit(e) {
    e.preventDefault();
    const petId = parseInt(document.getElementById('select-vet-pet').value);
    const peso = parseFloat(document.getElementById('input-vet-peso').value);
    const temperatura = parseFloat(document.getElementById('input-vet-temp').value);
    const fc = parseInt(document.getElementById('input-vet-fc').value);
    const mucosas = document.getElementById('select-vet-mucosas').value;
    const anamnese = document.getElementById('input-vet-anamnese').value;
    const diagnostico = document.getElementById('input-vet-diagnostico').value;
    const prescricao = document.getElementById('input-vet-prescricao').value;

    const prontuarios = DB.get('prontuarios') || [];
    const newId = prontuarios.length > 0 ? Math.max(...prontuarios.map(p => p.id)) + 1 : 1;

    prontuarios.push({
        id: newId,
        empresa_id: State.currentEmpresaId,
        filial_id: State.currentFilialId,
        pet_id: petId,
        veterinario_id: State.currentUser ? State.currentUser.id : 2,
        veterinario_nome: State.currentUser ? State.currentUser.nome : "Dr. Thiago Ramos",
        crmv: "SP-45678",
        data: new Date().toISOString(),
        peso, temperatura, fc, mucosas, anamnese, diagnostico, prescricao
    });

    DB.set('prontuarios', prontuarios);
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Consulta Veterinária', `Prontuario clínico #${newId} registrado para pet #${petId}`);

    closeModal('modal-prontuario');
    renderProntuariosTable();
    gerarReceitaImpressao(newId);
}

function gerarReceitaImpressao(prontuarioId) {
    const prontuarios = DB.get('prontuarios') || [];
    const p = prontuarios.find(item => item.id === prontuarioId);
    if (!p) return;

    const pet = DB.get('pets').find(item => item.id === p.pet_id);
    const cliente = pet ? DB.get('clientes').find(c => c.id === pet.cliente_id) : null;
    const filial = DB.get('filiais').find(f => f.id === p.filial_id);

    document.getElementById('print-clinic-name').innerText = `CLÍNICA VETERINÁRIA CATDOG SP`;
    document.getElementById('print-clinic-info').innerText = `${filial ? filial.nome : 'Unidade Moema Matriz'} — CRMV Responsável: ${p.crmv}`;
    document.getElementById('print-pet-name').innerText = pet ? pet.nome : 'Pet';
    document.getElementById('print-tutor-name').innerText = cliente ? cliente.nome : 'Tutor';
    document.getElementById('print-pet-peso').innerText = `${p.peso} kg`;
    document.getElementById('print-date').innerText = new Date(p.data).toLocaleDateString('pt-BR');
    document.getElementById('print-prescription-content').innerText = p.prescricao;
    document.getElementById('print-vet-signature').innerText = p.veterinario_nome;

    openModal('modal-receita-impressao');
}

// 8. MULTI-FILIAIS & INTER-BRANCH TRANSFERS
function renderFiliaisTable() {
    const filiais = (DB.get('filiais') || []).filter(f => f.empresa_id === State.currentEmpresaId);
    const tbody = document.getElementById('table-filiais-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    filiais.forEach(f => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>📍 ${f.nome}</strong></td>
            <td>${f.cidade} / ${f.uf}</td>
            <td>${f.gerente}</td>
            <td><span class="validade-badge em-dia">${f.status}</span></td>
            <td><button class="card-btn" onclick="trocarFilialAtiva(${f.id})">🔍 Selecionar Unidade</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function renderTransferenciasTable() {
    const transferencias = (DB.get('transferencias_estoque') || []).filter(t => t.empresa_id === State.currentEmpresaId);
    const filiais = DB.get('filiais') || [];
    const produtos = DB.get('produtos') || [];
    const tbody = document.getElementById('table-transferencias-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    transferencias.forEach(t => {
        const orig = filiais.find(f => f.id === t.origem_filial_id);
        const dest = filiais.find(f => f.id === t.destino_filial_id);
        const prod = produtos.find(p => p.id === t.produto_id);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${t.data}</td>
            <td>${orig ? orig.nome : 'Origem'}</td>
            <td>${dest ? dest.nome : 'Destino'}</td>
            <td><strong>${prod ? prod.nome : 'Produto'}</strong></td>
            <td>${t.quantidade} un</td>
            <td><span class="validade-badge em-dia">${t.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function salvarTransferenciaSubmit(e) {
    e.preventDefault();
    const origemId = parseInt(document.getElementById('select-transf-origem').value);
    const destinoId = parseInt(document.getElementById('select-transf-destino').value);
    const produtoId = parseInt(document.getElementById('select-transf-produto').value);
    const qtd = parseInt(document.getElementById('input-transf-qtd').value);

    if (origemId === destinoId) {
        State.showToast("A filial de origem deve ser diferente da filial de destino!", "error");
        return;
    }

    const transferencias = DB.get('transferencias_estoque') || [];
    const newId = transferencias.length > 0 ? Math.max(...transferencias.map(t => t.id)) + 1 : 1;

    transferencias.push({
        id: newId,
        empresa_id: State.currentEmpresaId,
        origem_filial_id: origemId,
        destino_filial_id: destinoId,
        produto_id: produtoId,
        quantidade: qtd,
        data: new Date().toISOString().split('T')[0],
        status: "Concluída"
    });

    DB.set('transferencias_estoque', transferencias);
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Transferência de Estoque', `Transferência de ${qtd} un entre filiais #${origemId} -> #${destinoId}`);

    closeModal('modal-transferencia');
    renderTransferenciasTable();
    State.showToast(`📦 Remessa de estoque registrada com sucesso!`, 'success');
}

// 9. CAGE GRID & ZOOTIE CARDS
function renderBaiasGrid() {
    const baias = (DB.get('baias') || []).filter(b => b.empresa_id === State.currentEmpresaId);
    const pets = DB.get('pets') || [];
    const container = document.getElementById('baia-grid-container');
    if (!container) return;
    container.innerHTML = '';

    if (baias.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:3rem; color:var(--text-muted);">Nenhuma baia cadastrada para esta unidade.</div>`;
        return;
    }

    baias.forEach(b => {
        const pet = pets.find(p => p.id === b.pet_id);
        const isOcupada = b.status !== 'Livre';
        const card = document.createElement('div');
        card.className = `baia-card ${isOcupada ? 'ocupada' : 'livre'}`;
        const petIcon = pet ? (pet.especie === 'Gato' ? '🐱' : '🐶') : '🏠';
        const petDisplay = pet ? `${petIcon} ${pet.nome}` : `—`;

        card.innerHTML = `
            <div class="baia-number">${b.numero}</div>
            <div style="font-size: 2.4rem; line-height:1;">${isOcupada ? petIcon : '🏠'}</div>
            <div class="baia-status">${isOcupada ? '🟣 Ocupada' : '🟢 Livre'}</div>
            <div class="baia-pet">${petDisplay}</div>
            ${b.temperatura ? `<div style="font-size:0.7rem; color:var(--text-muted);">Temp. ${b.temperatura}</div>` : ''}
        `;
        container.appendChild(card);
    });
}

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
    
    const msg = `🐾 *BOLETIM DO PET - CATDOG SP* 🐾%0A%0AHolá ${cliente.nome}! Segue o boletim do *${pet.nome}* no banho hoje:%0A%0A⭐ Avaliação: ${'⭐'.repeat(parseInt(estrelas))}%0A💨 Secador: ${secador}%0A✂️ Unhas/Ouvidos: ${unhas}%0A💬 Recadinho: ${obs || 'Ficou super cheiroso e lindo!'}`;
    
    State.showToast(`🐶 Boletim do Pet ${pet.nome} gerado! Enviar no WhatsApp do Tutor.`, 'success');
    window.open(`https://api.whatsapp.com/send?phone=55${cliente.telefone.replace(/\D/g, '')}&text=${msg}`, '_blank');
}

// 10. ERP PRODUCT MARGIN CALCULATOR & TABLES
function calcularMargemProduto() {
    const custo = parseFloat(document.getElementById('input-prod-custo').value) || 0;
    const margem = parseFloat(document.getElementById('input-prod-margem').value) || 0;
    const precoVenda = custo * (1 + (margem / 100));
    document.getElementById('input-prod-preco').value = precoVenda.toFixed(2);
}

function calcularPrecoPorVenda() {
    const custo = parseFloat(document.getElementById('input-prod-custo').value) || 0;
    const precoVenda = parseFloat(document.getElementById('input-prod-preco').value) || 0;
    if (custo > 0) {
        const margem = ((precoVenda - custo) / custo) * 100;
        document.getElementById('input-prod-margem').value = margem.toFixed(1);
    }
}

function renderProdutosCrudTable() {
    let produtos = DB.get('produtos') || [];
    const lotes = DB.get('lotes_estoque') || [];
    const tbody = document.getElementById('table-produtos-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    produtos.forEach(p => {
        const totalEstoque = lotes.filter(l => l.produto_id === p.id && l.status === 'Disponivel').reduce((acc, curr) => acc + curr.quantidade, 0);
        const custo = p.preco_custo || (p.preco * 0.6);
        const margem = p.margem_lucro || 66.6;
        const lucro = p.preco - custo;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <img src="${p.foto}" style="width:36px; height:36px; border-radius:6px; object-fit:cover;" />
                    <div>
                        <strong>${p.nome}</strong>
                        <div style="font-size:0.7rem; color:var(--text-secondary);">${p.marca || 'CatDog'}</div>
                    </div>
                </div>
            </td>
            <td><span class="product-category">${p.categoria} (${p.finalidade || 'Comercial'})</span></td>
            <td>R$ ${custo.toFixed(2)}</td>
            <td><span class="validade-badge em-dia">${margem.toFixed(1)}%</span></td>
            <td style="color:#10b981; font-weight:700;">R$ ${p.preco.toFixed(2)}</td>
            <td style="color:#38bdf8; font-weight:700;">R$ ${lucro.toFixed(2)}</td>
            <td>${totalEstoque} un</td>
            <td><button class="card-btn" onclick="openModal('modal-produto')">+ Lote FEFO</button></td>
        `;
        tbody.appendChild(tr);
    });
}

function salvarProduto(e) {
    e.preventDefault();
    const nome = document.getElementById('input-prod-nome').value;
    const marca = document.getElementById('input-prod-marca').value;
    const finalidade = document.getElementById('select-prod-finalidade').value;
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

    produtos.push({ id: newProdId, empresa_id: State.currentEmpresaId, filial_id: State.currentFilialId, nome, marca, finalidade, categoria: finalidade === 'Insumo' ? 'Insumo Operational' : 'Prateleira', codigo_barras, estoque_minimo, preco_custo, margem_lucro, preco, foto });
    
    const newLoteId = lotes.length > 0 ? Math.max(...lotes.map(l => l.id)) + 1 : 1;
    lotes.push({
        id: newLoteId, empresa_id: State.currentEmpresaId, filial_id: State.currentFilialId, produto_id: newProdId,
        lote: `L-${newProdId}01`, quantidade: qtdInicial, data_vencimento: vencimento, status: "Disponivel"
    });

    DB.set('produtos', produtos);
    DB.set('lotes_estoque', lotes);

    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Cadastro Produto ERP', `Produto/Insumo ${nome} cadastrado com finalidade ${finalidade}`);

    closeModal('modal-produto');
    renderProdutosCrudTable();
    renderCaixa();
    State.showToast(`Produto/Insumo ERP ${nome} cadastrado com sucesso!`, 'success');
}

// 11. POS CAIXA & ITEM AVULSO
function renderCaixa() {
    let produtos = DB.get('produtos') || [];
    const catalogContainer = document.getElementById('pos-catalog');
    if (!catalogContainer) return;
    catalogContainer.innerHTML = '';

    const companyProds = produtos.filter(p => p.finalidade !== 'Insumo');
    
    let filteredProds = companyProds;
    if (State.posFilterQuery) {
        const q = State.posFilterQuery.toLowerCase();
        filteredProds = companyProds.filter(p => p.nome.toLowerCase().includes(q) || (p.codigo_barras && p.codigo_barras.includes(q)));
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

function filtrarCategoriaPOS(cat, btn) {
    const filterButtons = document.querySelectorAll('#pos-category-filters .card-btn');
    filterButtons.forEach(b => {
        b.classList.remove('active');
        b.style.background = 'transparent';
        b.style.color = 'var(--text-secondary)';
    });
    if (btn) {
        btn.classList.add('active');
        btn.style.background = 'rgba(56,189,248,0.2)';
        btn.style.color = '#38bdf8';
    }

    if (cat === 'TODOS') State.posFilterQuery = '';
    else State.posFilterQuery = cat;
    renderCaixa();
}

function selecionarFormaPagamentoPOS(metodo, btn) {
    const payButtons = document.querySelectorAll('#pos-payment-methods .card-btn');
    payButtons.forEach(b => {
        b.classList.remove('active');
        b.style.background = 'transparent';
        b.style.color = 'var(--text-secondary)';
    });
    if (btn) {
        btn.classList.add('active');
        btn.style.background = 'rgba(16,185,129,0.2)';
        btn.style.color = '#34d399';
    }
    State.posPaymentMethod = metodo;
}

function atualizarFidelidadeClientePOS(clienteId) {
    const clientes = DB.get('clientes') || [];
    const cliente = clientes.find(c => c.id === parseInt(clienteId));
    const infoDiv = document.getElementById('pos-cliente-fidelidade-info');
    if (infoDiv) {
        if (cliente) {
            infoDiv.innerText = `⭐ Tutor ${cliente.nome}: ${cliente.pontos_fidelidade || 120} pontos de fidelidade disponíveis!`;
        } else {
            infoDiv.innerText = `⭐ Cliente Avulso / Não cadastrado`;
        }
    }
}

function adicionarItemAvulsoPOS(e) {
    e.preventDefault();
    const nome = document.getElementById('input-avulso-nome').value;
    const preco = parseFloat(document.getElementById('input-avulso-preco').value);

    const tempId = Date.now();
    State.cart.push({ id: tempId, nome: `[Avulso] ${nome}`, preco: preco, qty: 1 });

    closeModal('modal-item-avulso');
    renderCart();
    State.showToast(`Item avulso "${nome}" adicionado ao carrinho!`, 'success');
}

function addToCart(productId) {
    const produtos = DB.get('produtos') || [];
    const p = produtos.find(item => item.id === productId);
    if (!p) return;

    const cartItem = State.cart.find(c => c.id === productId);
    if (cartItem) cartItem.qty++;
    else State.cart.push({ ...p, qty: 1 });

    renderCart();
}

function updateCartQty(productId, delta) {
    const cartItem = State.cart.find(c => c.id === productId);
    if (!cartItem) return;

    cartItem.qty += delta;
    if (cartItem.qty <= 0) State.cart = State.cart.filter(c => c.id !== productId);
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
    
    State.cart.forEach(item => {
        if (typeof item.id === 'number' && item.id < 1000000) {
            let qtyToDeduct = item.qty;
            const productLots = lotes.filter(l => l.produto_id === item.id && l.status === 'Disponivel');

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
    movimentacoes.push({
        id: movimentacoes.length + 1,
        empresa_id: State.currentEmpresaId,
        filial_id: State.currentFilialId,
        tipo: 'ENTRADA',
        categoria: 'Venda Balcão POS',
        descricao: `Venda POS CatDog (${State.cart.map(c => `${c.qty}x ${c.nome}`).join(', ')})`,
        valor: totalCheckout,
        data: new Date().toISOString()
    });

    DB.set('lotes_estoque', lotes);
    DB.set('movimentacoes_caixa', movimentacoes);

    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Venda POS', `Venda de balcão concluída no valor de R$ ${totalCheckout.toFixed(2)}`);

    State.showToast(`💸 Venda concluída! Total R$ ${totalCheckout.toFixed(2)}.`, 'success');
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

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // Calcular dias e nível de urgência para cada lote
    const lotesComMeta = lotes.map(l => {
        const p = produtos.find(item => item.id === l.produto_id);
        if (!p) return null;
        const expDate = new Date(l.data_vencimento);
        expDate.setHours(0, 0, 0, 0);
        const diffDays = Math.ceil((expDate - hoje) / (1000 * 60 * 60 * 24));
        let nivel = 'ok';
        if (l.status === 'Esgotado')   nivel = 'esgotado';
        else if (l.status === 'Vencido' || diffDays < 0) nivel = 'vencido';
        else if (diffDays <= 7)        nivel = 'critico';
        else if (diffDays <= 15)       nivel = 'atencao';
        else if (diffDays <= 30)       nivel = 'monitorar';
        return { lote: l, produto: p, diffDays, nivel };
    }).filter(Boolean);

    // Ordenar: vencido/esgotado → crítico → atenção → monitorar → ok
    const ordemNivel = { vencido: 0, esgotado: 1, critico: 2, atencao: 3, monitorar: 4, ok: 5 };
    lotesComMeta.sort((a, b) => (ordemNivel[a.nivel] ?? 9) - (ordemNivel[b.nivel] ?? 9));

    // ── Banner de alertas FEFO ──────────────────────────────────────
    const banner = document.getElementById('estoque-alert-banner');
    if (banner) {
        const nCritico   = lotesComMeta.filter(x => x.nivel === 'critico').length;
        const nAtencao   = lotesComMeta.filter(x => x.nivel === 'atencao').length;
        const nVencido   = lotesComMeta.filter(x => x.nivel === 'vencido').length;
        const nEsgotado  = lotesComMeta.filter(x => x.nivel === 'esgotado').length;

        if (nCritico + nAtencao + nVencido + nEsgotado > 0) {
            const pills = [];
            if (nVencido)  pills.push(`<span class="fefo-pill fefo-vencido">❌ ${nVencido} lote${nVencido > 1 ? 's' : ''} VENCIDO${nVencido > 1 ? 'S' : ''}</span>`);
            if (nEsgotado) pills.push(`<span class="fefo-pill fefo-esgotado">⬛ ${nEsgotado} ESGOTADO${nEsgotado > 1 ? 'S' : ''}</span>`);
            if (nCritico)  pills.push(`<span class="fefo-pill fefo-critico">🔴 ${nCritico} CRÍTICO${nCritico > 1 ? 'S' : ''} — vence em até 7 dias</span>`);
            if (nAtencao)  pills.push(`<span class="fefo-pill fefo-atencao">🟠 ${nAtencao} em ATENÇÃO — vence em até 15 dias</span>`);

            banner.innerHTML = `
                <div class="fefo-alert-banner">
                    <div class="fefo-banner-icon">⚠️</div>
                    <div class="fefo-banner-content">
                        <strong>Alertas FEFO — Ação Necessária</strong>
                        <div class="fefo-pills-row">${pills.join('')}</div>
                    </div>
                </div>`;
        } else {
            banner.innerHTML = `
                <div class="fefo-alert-banner fefo-banner-ok">
                    <div class="fefo-banner-icon">✅</div>
                    <div><strong>Estoque FEFO em ordem</strong> — Nenhum lote crítico ou vencendo nos próximos 30 dias.</div>
                </div>`;
        }
    }

    // ── Linhas da tabela ───────────────────────────────────────────
    lotesComMeta.forEach(({ lote: l, produto: p, diffDays, nivel }) => {
        // Badge de status
        const badgeMap = {
            vencido:   `<span class="fefo-badge fefo-badge-vencido">❌ Vencido</span>`,
            esgotado:  `<span class="fefo-badge fefo-badge-esgotado">⬛ Esgotado</span>`,
            critico:   `<span class="fefo-badge fefo-badge-critico fefo-pulse">🔴 Crítico</span>`,
            atencao:   `<span class="fefo-badge fefo-badge-atencao">🟠 Atenção</span>`,
            monitorar: `<span class="fefo-badge fefo-badge-monitorar">🟡 Monitorar</span>`,
            ok:        `<span class="fefo-badge fefo-badge-ok">✅ Em Dia</span>`,
        };

        // Barra de dias restantes (max referência = 30 dias)
        let diasHTML = '';
        if (nivel === 'vencido') {
            diasHTML = `<span style="color:var(--danger);font-weight:700;">Vencido há ${Math.abs(diffDays)}d</span>`;
        } else if (nivel === 'esgotado') {
            diasHTML = `<span style="color:var(--text-muted);">—</span>`;
        } else {
            const pct = Math.min(100, Math.round((diffDays / 30) * 100));
            const barColor = nivel === 'critico' ? '#ef4444' : nivel === 'atencao' ? '#f97316' : nivel === 'monitorar' ? '#f59e0b' : '#10b981';
            diasHTML = `
                <div style="display:flex;align-items:center;gap:0.5rem;">
                    <span style="font-weight:700;color:${barColor};min-width:32px;">${diffDays}d</span>
                    <div class="fefo-bar-track">
                        <div class="fefo-bar-fill" style="width:${pct}%;background:${barColor};"></div>
                    </div>
                </div>`;
        }

        const tr = document.createElement('tr');
        if (nivel === 'critico')  tr.classList.add('fefo-row-critico');
        if (nivel === 'vencido')  tr.classList.add('fefo-row-vencido');

        tr.innerHTML = `
            <td><strong>${p.nome}</strong></td>
            <td><code>${l.lote}</code></td>
            <td><span class="product-category">${p.finalidade || 'Comercial'}</span></td>
            <td>${l.quantidade} un</td>
            <td>${l.data_vencimento.split('-').reverse().join('/')}</td>
            <td>${diasHTML}</td>
            <td>${badgeMap[nivel] || badgeMap.ok}</td>
        `;
        tbody.appendChild(tr);
    });

    // ── Curva ABC ───────────────────────────────────────────────────────
    renderCurvaABC();
}

// =====================================================================
// CURVA ABC — Análise de Pareto do Estoque
// =====================================================================
function renderCurvaABC() {
    const lotes    = (DB.get('lotes_estoque') || []).filter(l => l.empresa_id === State.currentEmpresaId);
    const produtos = DB.get('produtos') || [];

    // 1. Agrupa valor por produto (soma dos lotes × preço_custo)
    const valorPorProduto = {};
    const qtdPorProduto   = {};
    lotes.forEach(l => {
        const p = produtos.find(x => x.id === l.produto_id);
        if (!p || l.status === 'Esgotado') return;
        const val = l.quantidade * (p.preco_custo || p.preco || 0);
        const qtd = l.quantidade;
        valorPorProduto[p.id] = (valorPorProduto[p.id] || 0) + val;
        qtdPorProduto[p.id]   = (qtdPorProduto[p.id]   || 0) + qtd;
    });

    // Se não há dados de lotes, usa o catálogo de produtos direto
    if (Object.keys(valorPorProduto).length === 0) {
        produtos.forEach(p => {
            if (p.empresa_id !== State.currentEmpresaId) return;
            valorPorProduto[p.id] = p.preco_custo || p.preco || 0;
            qtdPorProduto[p.id]   = 1;
        });
    }

    // 2. Ordena por valor decrescente
    const ranking = Object.entries(valorPorProduto)
        .map(([id, valor]) => {
            const p = produtos.find(x => x.id === parseInt(id));
            return { produto: p, valor, qtd: qtdPorProduto[id] || 0 };
        })
        .filter(x => x.produto)
        .sort((a, b) => b.valor - a.valor);

    if (ranking.length === 0) return;

    // 3. Calcula totais e acumulado
    const totalValor = ranking.reduce((s, x) => s + x.valor, 0);
    let acumulado = 0;
    const itensABC = ranking.map((item, i) => {
        const pct = totalValor > 0 ? (item.valor / totalValor) * 100 : 0;
        acumulado += pct;
        let classe = 'C';
        if (acumulado <= 80)       classe = 'A';
        else if (acumulado <= 95)  classe = 'B';
        return { ...item, rank: i + 1, pct, acumulado: Math.min(acumulado, 100), classe };
    });

    // 4. KPI Cards
    const kpiRow = document.getElementById('abc-kpi-row');
    if (kpiRow) {
        const totA = itensABC.filter(x => x.classe === 'A');
        const totB = itensABC.filter(x => x.classe === 'B');
        const totC = itensABC.filter(x => x.classe === 'C');
        const valA = totA.reduce((s, x) => s + x.valor, 0);
        const valB = totB.reduce((s, x) => s + x.valor, 0);
        const valC = totC.reduce((s, x) => s + x.valor, 0);

        kpiRow.innerHTML = `
            <div class="abc-kpi-card abc-kpi-a">
                <div class="abc-kpi-class">A</div>
                <div class="abc-kpi-count">${totA.length} produto${totA.length !== 1 ? 's' : ''}</div>
                <div class="abc-kpi-value">R$ ${valA.toFixed(2)}</div>
                <div class="abc-kpi-label">~80% do valor</div>
            </div>
            <div class="abc-kpi-card abc-kpi-b">
                <div class="abc-kpi-class">B</div>
                <div class="abc-kpi-count">${totB.length} produto${totB.length !== 1 ? 's' : ''}</div>
                <div class="abc-kpi-value">R$ ${valB.toFixed(2)}</div>
                <div class="abc-kpi-label">~15% do valor</div>
            </div>
            <div class="abc-kpi-card abc-kpi-c">
                <div class="abc-kpi-class">C</div>
                <div class="abc-kpi-count">${totC.length} produto${totC.length !== 1 ? 's' : ''}</div>
                <div class="abc-kpi-value">R$ ${valC.toFixed(2)}</div>
                <div class="abc-kpi-label">~5% do valor</div>
            </div>
        `;
    }

    // 5. Gráfico de Pareto no Canvas
    const canvas = document.getElementById('canvas-abc-pareto');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const W = canvas.offsetWidth || 680;
        const H = 200;
        canvas.width  = W;
        canvas.height = H;
        ctx.clearRect(0, 0, W, H);

        const PAD_L = 48, PAD_R = 48, PAD_T = 18, PAD_B = 40;
        const chartW = W - PAD_L - PAD_R;
        const chartH = H - PAD_T - PAD_B;
        const n = itensABC.length;
        const barW = chartW / n;
        const maxVal = Math.max(...itensABC.map(x => x.valor), 1);

        // Barras coloridas por classe
        const classColors = { A: '#ef4444', B: '#f97316', C: '#10b981' };

        itensABC.forEach((item, i) => {
            const barH = (item.valor / maxVal) * chartH;
            const x = PAD_L + i * barW;
            const y = PAD_T + chartH - barH;
            const color = classColors[item.classe];

            // Gradiente da barra
            const grad = ctx.createLinearGradient(0, y, 0, PAD_T + chartH);
            grad.addColorStop(0, color);
            grad.addColorStop(1, color + '40');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(x + 3, y, barW - 6, barH, [4, 4, 0, 0]);
            ctx.fill();

            // Label do produto (abreviado)
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.font = '10px system-ui';
            ctx.textAlign = 'center';
            const label = item.produto.nome.split(' ').slice(0, 2).join(' ').substring(0, 10);
            ctx.fillText(label, x + barW / 2, H - PAD_B + 14);
        });

        // Linha de curva acumulada
        ctx.beginPath();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        itensABC.forEach((item, i) => {
            const x = PAD_L + i * barW + barW / 2;
            const y = PAD_T + chartH - (item.acumulado / 100) * chartH;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();
        ctx.setLineDash([]);

        // Pontos na curva
        itensABC.forEach((item, i) => {
            const x = PAD_L + i * barW + barW / 2;
            const y = PAD_T + chartH - (item.acumulado / 100) * chartH;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
        });

        // Linhas de referência 80% e 95%
        [80, 95].forEach((pct, idx) => {
            const y = PAD_T + chartH - (pct / 100) * chartH;
            ctx.beginPath();
            ctx.strokeStyle = idx === 0 ? 'rgba(239,68,68,0.4)' : 'rgba(249,115,22,0.4)';
            ctx.lineWidth = 1;
            ctx.setLineDash([6, 4]);
            ctx.moveTo(PAD_L, y);
            ctx.lineTo(W - PAD_R, y);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = idx === 0 ? '#f87171' : '#fb923c';
            ctx.font = 'bold 10px system-ui';
            ctx.textAlign = 'right';
            ctx.fillText(`${pct}%`, PAD_L - 4, y + 4);
        });
    }

    // 6. Tabela ABC rankeada
    const tbody = document.getElementById('table-abc-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    const badgeABC = {
        A: `<span class="abc-badge abc-badge-a">A</span>`,
        B: `<span class="abc-badge abc-badge-b">B</span>`,
        C: `<span class="abc-badge abc-badge-c">C</span>`,
    };

    itensABC.forEach(item => {
        const tr = document.createElement('tr');
        if (item.classe === 'A') tr.classList.add('abc-row-a');
        tr.innerHTML = `
            <td style="color:var(--text-muted);font-size:0.8rem;">${item.rank}º</td>
            <td><strong>${item.produto.nome}</strong></td>
            <td><span class="product-category">${item.produto.categoria || '—'}</span></td>
            <td>${item.qtd} un</td>
            <td style="font-weight:700;">R$ ${item.valor.toFixed(2)}</td>
            <td>${item.pct.toFixed(1)}%</td>
            <td>
                <div style="display:flex;align-items:center;gap:0.4rem;">
                    <div class="fefo-bar-track" style="min-width:60px;">
                        <div class="fefo-bar-fill" style="width:${item.acumulado}%;background:${item.classe === 'A' ? '#ef4444' : item.classe === 'B' ? '#f97316' : '#10b981'};"></div>
                    </div>
                    <span style="font-size:0.75rem;color:var(--text-muted);">${item.acumulado.toFixed(1)}%</span>
                </div>
            </td>
            <td>${badgeABC[item.classe]}</td>
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
    if (tableBody) {
        tableBody.innerHTML = '';
        movimentacoes.slice().reverse().forEach(m => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${new Date(m.data).toLocaleDateString('pt-BR')} ${new Date(m.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</td>
                <td><strong>${m.descricao}</strong></td>
                <td><span class="product-category">${m.categoria}</span></td>
                <td style="color:#10b981; font-weight:700;">+ R$ ${m.valor.toFixed(2)}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // Render Canvas Chart for Analytics Vendas
    const canvas = document.getElementById('canvas-analytics-vendas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth || 700;
        canvas.height = 180;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const days = 14;
        const barW = (canvas.width - 40) / days;
        const maxVal = Math.max(...movimentacoes.map(m => m.valor), 500);

        for (let i = 0; i < days; i++) {
            const val = Math.floor(Math.random() * 800) + 200;
            const h = (val / maxVal) * (canvas.height - 40);
            const x = 20 + i * barW;
            const y = canvas.height - 25 - h;

            const grad = ctx.createLinearGradient(0, y, 0, canvas.height - 25);
            grad.addColorStop(0, '#c084fc');
            grad.addColorStop(1, 'rgba(192,132,252,0.2)');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.roundRect(x + 4, y, barW - 8, h, [4, 4, 0, 0]);
            ctx.fill();
        }
    }
}

// 13b. MÓDULO FINANCEIRO ERP COMPLETO
function renderFinanceiro() {
    const movs = (DB.get('movimentacoes_caixa') || []).filter(m => m.empresa_id === State.currentEmpresaId);
    const despesas = (DB.get('contas_pagar') || []).filter(d => d.empresa_id === State.currentEmpresaId);
    const filialId = State.currentFilialId;

    // ---- KPIs ----
    const hoje = new Date().toISOString().split('T')[0];
    const receitaTotal = movs.filter(m => m.tipo === 'ENTRADA').reduce((a, m) => a + m.valor, 0);
    const despesasPagas = despesas.filter(d => d.status === 'Pago').reduce((a, d) => a + d.valor, 0);
    const despesasPendentes = despesas.filter(d => d.status !== 'Pago').reduce((a, d) => a + d.valor, 0);
    const lucroLiquido = receitaTotal - despesasPagas;
    const receitaHoje = movs.filter(m => m.data.startsWith(hoje) && m.tipo === 'ENTRADA').reduce((a, m) => a + m.valor, 0);
    const despesasVencidas = despesas.filter(d => d.status === 'Vencida').reduce((a, d) => a + d.valor, 0);

    // ---- DRE Simplificado ----
    const produtos = DB.get('produtos') || [];
    const lotes = DB.get('lotes_estoque') || [];
    const cmv = movs.filter(m => m.categoria === 'Venda Balcão POS').reduce((a, m) => a + m.valor * 0.38, 0);
    const margem = receitaTotal - cmv;
    const comissoes = despesas.filter(d => d.categoria === 'Comissões').reduce((a, d) => a + d.valor, 0);

    // ---- Render KPIs ----
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('fin-receita-total', `R$ ${receitaTotal.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`);
    set('fin-despesas-pagas', `R$ ${despesasPagas.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`);
    set('fin-pendente', `R$ ${despesasPendentes.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`);
    set('fin-lucro', `R$ ${lucroLiquido.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`);
    set('fin-hoje', `R$ ${receitaHoje.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`);
    set('fin-vencidas', `R$ ${despesasVencidas.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`);

    // ---- DRE ----
    set('dre-receita', `R$ ${receitaTotal.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`);
    set('dre-cmv', `(R$ ${cmv.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')})`);
    set('dre-margem', `R$ ${margem.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`);
    set('dre-despesas', `(R$ ${despesasPagas.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')})`);
    set('dre-lucro', `R$ ${lucroLiquido.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`);

    // ---- Estoque Valor ----
    let valorEstoque = 0;
    lotes.forEach(l => {
        if (l.empresa_id === State.currentEmpresaId && l.status !== 'Esgotado') {
            const p = produtos.find(pr => pr.id === l.produto_id);
            if (p) valorEstoque += p.preco_custo * l.quantidade;
        }
    });
    set('fin-estoque-valor', `R$ ${valorEstoque.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`);

    // ---- Tabela Despesas ----
    const tBody = document.getElementById('table-despesas-body');
    if (tBody) {
        tBody.innerHTML = '';
        [...despesas].sort((a, b) => new Date(a.data_vencimento) - new Date(b.data_vencimento)).forEach(d => {
            const statusClass = d.status === 'Pago' ? 'em-dia' : d.status === 'Vencida' ? 'vencendo' : 'pendente-badge';
            const statusLabel = d.status === 'Pago' ? '✅ Pago' : d.status === 'Vencida' ? '🔴 Vencida' : '🟡 Pendente';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${d.descricao}</strong></td>
                <td><span class="product-category">${d.categoria}</span></td>
                <td style="color:#f87171; font-weight:700;">R$ ${d.valor.toFixed(2)}</td>
                <td>${d.data_vencimento.split('-').reverse().join('/')}</td>
                <td><span class="validade-badge ${statusClass}">${statusLabel}</span></td>
                <td>
                    ${d.status !== 'Pago' ? `<button class="card-btn" onclick="marcarPago(${d.id})">✅ Marcar Pago</button>` : `<span style="color:var(--text-muted);font-size:0.75rem">${d.data_pagamento || ''}</span>`}
                </td>`;
            tBody.appendChild(tr);
        });
    }

    // ---- Tabela Receitas ----
    const rBody = document.getElementById('table-receitas-fin-body');
    if (rBody) {
        rBody.innerHTML = '';
        [...movs].sort((a, b) => new Date(b.data) - new Date(a.data)).slice(0, 20).forEach(m => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${new Date(m.data).toLocaleDateString('pt-BR')}</td>
                <td>${m.descricao}</td>
                <td><span class="product-category">${m.categoria}</span></td>
                <td style="color:#10b981; font-weight:700;">+ R$ ${m.valor.toFixed(2)}</td>`;
            rBody.appendChild(tr);
        });
    }

    // ---- Gráfico Canvas ----
    renderGraficoFluxo(movs, despesas);
}

function renderGraficoFluxo(movs, despesas) {
    const canvas = document.getElementById('canvas-fluxo');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth || 800;
    canvas.height = 220;

    // Build 30-day data
    const days = [];
    const receitas = [];
    const saidas = [];
    for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split('T')[0];
        days.push(key.slice(5)); // MM-DD
        receitas.push(movs.filter(m => m.data.startsWith(key) && m.tipo === 'ENTRADA').reduce((a, m) => a + m.valor, 0));
        saidas.push(despesas.filter(dp => dp.data_pagamento === key).reduce((a, dp) => a + dp.valor, 0));
    }

    const maxVal = Math.max(...receitas, ...saidas, 1);
    const W = canvas.width, H = canvas.height;
    const pad = { top: 20, bottom: 40, left: 10, right: 10 };
    const barW = (W - pad.left - pad.right) / 30;
    const barGap = 3;

    ctx.clearRect(0, 0, W, H);

    // Grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let g = 0; g <= 4; g++) {
        const y = pad.top + ((H - pad.top - pad.bottom) / 4) * g;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
    }

    // Bars
    days.forEach((day, i) => {
        const x = pad.left + i * barW;
        const availH = H - pad.top - pad.bottom;

        // Receita bar
        const rH = receitas[i] > 0 ? Math.max((receitas[i] / maxVal) * availH, 3) : 0;
        const grad = ctx.createLinearGradient(0, pad.top, 0, H - pad.bottom);
        grad.addColorStop(0, 'rgba(99,102,241,0.9)');
        grad.addColorStop(1, 'rgba(99,102,241,0.3)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x + barGap, H - pad.bottom - rH, barW - barGap * 2 - barW/2, rH, [3, 3, 0, 0]);
        ctx.fill();

        // Saida bar
        const sH = saidas[i] > 0 ? Math.max((saidas[i] / maxVal) * availH, 3) : 0;
        const grad2 = ctx.createLinearGradient(0, pad.top, 0, H - pad.bottom);
        grad2.addColorStop(0, 'rgba(239,68,68,0.8)');
        grad2.addColorStop(1, 'rgba(239,68,68,0.2)');
        ctx.fillStyle = grad2;
        ctx.beginPath();
        ctx.roundRect(x + barGap + barW/2 - barGap, H - pad.bottom - sH, barW - barGap * 2 - barW/2, sH, [3, 3, 0, 0]);
        ctx.fill();

        // Day label (every 5)
        if (i % 5 === 0) {
            ctx.fillStyle = 'rgba(148,163,184,0.7)';
            ctx.font = '9px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(day, x + barW / 2, H - pad.bottom + 14);
        }
    });

    // Legend
    ctx.fillStyle = 'rgba(99,102,241,0.9)'; ctx.fillRect(pad.left, H - 14, 10, 8);
    ctx.fillStyle = 'rgba(148,163,184,0.8)'; ctx.font = '10px Inter, sans-serif';
    ctx.fillText('Receitas', pad.left + 14, H - 7);
    ctx.fillStyle = 'rgba(239,68,68,0.8)'; ctx.fillRect(pad.left + 80, H - 14, 10, 8);
    ctx.fillStyle = 'rgba(148,163,184,0.8)';
    ctx.fillText('Despesas Pagas', pad.left + 94, H - 7);
}

function marcarPago(despesaId) {
    const despesas = DB.get('contas_pagar');
    const item = despesas.find(d => d.id === despesaId);
    if (!item) return;
    item.status = 'Pago';
    item.data_pagamento = new Date().toISOString().split('T')[0];
    DB.set('contas_pagar', despesas);
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Baixa Despesa', `Despesa "${item.descricao}" marcada como paga.`);
    State.showToast(`✅ "${item.descricao}" marcada como Paga!`, 'success');
    renderFinanceiro();
}

function lancarDespesa(e) {
    e.preventDefault();
    const descricao = document.getElementById('fin-input-descricao').value;
    const categoria = document.getElementById('fin-select-categoria').value;
    const valor = parseFloat(document.getElementById('fin-input-valor').value);
    const vencimento = document.getElementById('fin-input-vencimento').value;
    const responsavel = document.getElementById('fin-input-responsavel').value || State.currentProfile;

    if (!descricao || !valor || !vencimento) { State.showToast('Preencha todos os campos obrigatórios.', 'error'); return; }

    const despesas = DB.get('contas_pagar') || [];
    const newId = despesas.length > 0 ? Math.max(...despesas.map(d => d.id)) + 1 : 1;
    const hoje = new Date().toISOString().split('T')[0];
    const vencida = vencimento < hoje;

    despesas.push({
        id: newId, empresa_id: State.currentEmpresaId, filial_id: State.currentFilialId,
        categoria, descricao, valor, data_vencimento: vencimento,
        data_pagamento: null, status: vencida ? 'Vencida' : 'Pendente', responsavel
    });
    DB.set('contas_pagar', despesas);
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Nova Despesa', `Despesa: ${descricao} R$${valor.toFixed(2)}`);
    State.showToast(`💸 Despesa "${descricao}" lançada com sucesso!`, 'success');
    closeModal('modal-lancardespesa');
    e.target.reset();
    renderFinanceiro();
}

function lancarReceita(e) {
    e.preventDefault();
    const descricao = document.getElementById('fin-rec-descricao').value;
    const categoria = document.getElementById('fin-rec-categoria').value;
    const valor = parseFloat(document.getElementById('fin-rec-valor').value);

    if (!descricao || !valor) { State.showToast('Preencha todos os campos.', 'error'); return; }

    const movs = DB.get('movimentacoes_caixa') || [];
    const newId = movs.length > 0 ? Math.max(...movs.map(m => m.id)) + 1 : 1;
    movs.push({
        id: newId, empresa_id: State.currentEmpresaId, filial_id: State.currentFilialId,
        tipo: 'ENTRADA', categoria, descricao, valor, data: new Date().toISOString()
    });
    DB.set('movimentacoes_caixa', movs);
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Receita Manual', `${descricao} R$${valor.toFixed(2)}`);
    State.showToast(`💰 Receita "${descricao}" registrada!`, 'success');
    closeModal('modal-lancarreceita');
    e.target.reset();
    renderFinanceiro();
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
            <div style="font-size:0.85rem; color:var(--text-muted); background:rgba(0,0,0,0.3); padding:0.6rem; border-radius:8px; margin-bottom:0.75rem; border:1px solid rgba(255,255,255,0.08);">
                <div style="margin-bottom:0.4rem;">📍 <strong>${cliente ? cliente.endereco : 'Endereço em SP'}</strong></div>
                <div style="display:flex; gap:0.5rem; margin-top:0.35rem;">
                    <a href="https://maps.google.com/?q=${encodeURIComponent(cliente ? cliente.endereco : 'Alameda Lorena 1450 SP')}" target="_blank" class="card-btn" style="color:#38bdf8; text-decoration:none; font-size:0.75rem;">🗺️ Google Maps</a>
                    <a href="https://waze.com/ul?q=${encodeURIComponent(cliente ? cliente.endereco : 'Alameda Lorena 1450 SP')}" target="_blank" class="card-btn" style="color:#34d399; text-decoration:none; font-size:0.75rem;">🚗 Waze</a>
                </div>
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
                <button class="btn-mobile-secondary" onclick="capturarFoto(${job.id})">📷 Foto da Entrega</button>
            </div>
            
            <button class="btn-mobile-primary" style="width:100%; margin-top:0.75rem;" onclick="finalizarEntregaTaxi(${job.id}, '${job.status}')">
                ✅ Confirmar Operação &amp; Notificar Tutor
            </button>
        `;
        container.appendChild(card);
    });
}

function capturarLocalizacao(jobId) {
    const display = document.getElementById(`gps-display-${jobId}`);
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude.toFixed(6);
            const lng = position.coords.longitude.toFixed(6);
            display.innerHTML = `<span>✅ Capturado: Lat ${lat}, Lng ${lng}</span>`;
            const kanbanData = DB.get('agendamentos_kanban');
            const item = kanbanData.find(k => k.id === jobId);
            if (item) { item.latitude_entrega = lat; item.longitude_entrega = lng; DB.set('agendamentos_kanban', kanbanData); }
            State.showToast("GPS gravado no servidor!", "success");
        },
        (error) => {
            const mockLat = "-23.60" + Math.floor(Math.random() * 900 + 100);
            const mockLng = "-46.66" + Math.floor(Math.random() * 900 + 100);
            display.innerHTML = `<span>⚠️ Mock GPS SP: Lat ${mockLat}, Lng ${mockLng}</span>`;
            const kanbanData = DB.get('agendamentos_kanban');
            const item = kanbanData.find(k => k.id === jobId);
            if (item) { item.latitude_entrega = mockLat; item.longitude_entrega = mockLng; DB.set('agendamentos_kanban', kanbanData); }
            State.showToast("GPS MOCK SP Registrado", "warning");
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
        if (item) { item.foto_comprovante_url = photoData; DB.set('agendamentos_kanban', kanbanData); }
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
                if (item) { item.foto_comprovante_url = fallbackImg; DB.set('agendamentos_kanban', kanbanData); }
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

    if (currentStatus === 'Em Rota de Busca') handleStatusTransition(jobId, 'Aguardando Banho');
    else handleStatusTransition(jobId, 'Entregue');
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

function populateSelectOptions() {
    const clientes = (DB.get('clientes') || []).filter(c => c.empresa_id === State.currentEmpresaId);
    const pets = (DB.get('pets') || []).filter(p => p.empresa_id === State.currentEmpresaId);
    const servicos = (DB.get('servicos') || []).filter(s => s.empresa_id === State.currentEmpresaId);
    const baias = (DB.get('baias') || []).filter(b => b.empresa_id === State.currentEmpresaId && b.status === 'Livre');
    const filiais = (DB.get('filiais') || []).filter(f => f.empresa_id === State.currentEmpresaId);
    const produtos = (DB.get('produtos') || []).filter(p => p.empresa_id === State.currentEmpresaId);

    const petSelect = document.getElementById('select-agendar-pet');
    if (petSelect) {
        petSelect.innerHTML = '';
        pets.forEach(p => {
            const cliente = clientes.find(c => c.id === p.cliente_id);
            petSelect.innerHTML += `<option value="${p.id}">${p.especie === 'Gato' ? '🐱' : '🐶'} ${p.nome} (Tutor: ${cliente ? cliente.nome : 'Sem tutor'})</option>`;
        });
    }

    const vetPetSelect = document.getElementById('select-vet-pet');
    if (vetPetSelect) {
        vetPetSelect.innerHTML = '';
        pets.forEach(p => {
            const cliente = clientes.find(c => c.id === p.cliente_id);
            vetPetSelect.innerHTML += `<option value="${p.id}">${p.especie === 'Gato' ? '🐱' : '🐶'} ${p.nome} (Tutor: ${cliente ? cliente.nome : 'Sem tutor'})</option>`;
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

    const origTransf = document.getElementById('select-transf-origem');
    const destTransf = document.getElementById('select-transf-destino');
    if (origTransf && destTransf) {
        origTransf.innerHTML = ''; destTransf.innerHTML = '';
        filiais.forEach(f => {
            origTransf.innerHTML += `<option value="${f.id}">📍 ${f.nome}</option>`;
            destTransf.innerHTML += `<option value="${f.id}">📍 ${f.nome}</option>`;
        });
    }

    const prodTransf = document.getElementById('select-transf-produto');
    if (prodTransf) {
        prodTransf.innerHTML = '';
        produtos.forEach(p => prodTransf.innerHTML += `<option value="${p.id}">${p.nome} (${p.categoria})</option>`);
    }

    populatePortalLoginOptions();
    atualizarOrcamentoDinâmicoAgendamento();
}

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
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${emp.nome}</strong></td>
            <td><code>${emp.cnpj}</code></td>
            <td>${emp.responsavel} (${emp.email_master || 'julia@catdog.com.br'})</td>
            <td><span class="validade-badge em-dia">${emp.plano}</span></td>
            <td><span class="validade-badge ${emp.status === 'Ativo' ? 'em-dia' : 'vencido'}">${emp.status}</span></td>
            <td><button class="card-btn" onclick="trocarEmpresaAtiva(${emp.id})">🔍 Acessar PetShop</button></td>
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

function enviarLeadLanding(e) {
    e.preventDefault();
    const nome = document.getElementById('lead-nome').value;
    const whatsapp = document.getElementById('lead-whatsapp').value;
    const petshop = document.getElementById('lead-petshop').value;
    const cidade = document.getElementById('lead-cidade').value || 'Não informada';
    const banhos = document.getElementById('lead-banhos').value;
    const btn = document.getElementById('btn-lead-submit');

    if (!nome || !whatsapp || !petshop) {
        State.showToast('Por favor, preencha os campos obrigatórios.', 'error');
        return;
    }

    if (btn) btn.disabled = true;

    // Send to DREasy API
    notificarDREasyNovoLead(petshop, nome, whatsapp, `Plano Solicitado via Landing | ${cidade} | Vol: ${banhos}`);

    State.showToast('🚀 Solicitação recebida! Um consultor entrará em contato em breve via WhatsApp.', 'success');

    setTimeout(() => {
        const cleanTel = whatsapp.replace(/\D/g, '');
        const msg = `Olá! Meu nome é *${nome}*, proprietário do *${petshop}* (${cidade}). Gostaria de agendar a demonstração gratuita do PataForma!`;
        window.open(`https://api.whatsapp.com/send?phone=5566996513050&text=${encodeURIComponent(msg)}`, '_blank');
        e.target.reset();
        if (btn) btn.disabled = false;
    }, 1500);
}

// ============================================================
// CRM DE VENDAS — PIPELINE KANBAN, TIMELINE 360° & LEAD SCORING
// ============================================================

// Seed CRM Deals if empty
function seedCRMDeals() {
    if ((DB.get('crm_deals') || []).length > 0) return;
    const now = new Date();
    const daysAgo = (d) => new Date(now.getTime() - d * 86400000).toISOString();
    const seed = [
        {
            id: 9001, empresa_id: State.currentEmpresaId, title: 'Rede Pet Center 3 Filiais — Plano Ouro',
            client_name: 'Marcos Ferreira', client_phone: '(11) 99123-4567', client_city: 'São Paulo - SP',
            deal_value: 1497, stage: 'negociacao', lead_score: 85, probability: 75, status: 'IN_PROGRESS',
            interactions: [
                { type: 'WHATSAPP_SENT', notes: 'Enviado proposta comercial com desconto 15% para 3 unidades', date: daysAgo(2), author: 'Vitório' },
                { type: 'CALL_LOG', notes: 'Ligação de 12min — Marcos confirmou interesse, pediu prazo até sexta', date: daysAgo(5), author: 'Vitório' },
                { type: 'NOTE', notes: 'Lead capturado via Google Ads — pesquisou "software pet shop rede"', date: daysAgo(10), author: 'Sistema' }
            ],
            tasks: [
                { title: 'Ligar sexta para fechar contrato', due_date: daysAgo(-1), completed: false },
                { title: 'Enviar case de sucesso CatDog SP', due_date: daysAgo(-3), completed: false }
            ],
            created_at: daysAgo(10)
        },
        {
            id: 9002, empresa_id: State.currentEmpresaId, title: 'Pet Shop Bichos & Carinho — Prata',
            client_name: 'Ana Luíza Ribeiro', client_phone: '(21) 98876-5432', client_city: 'Rio de Janeiro - RJ',
            deal_value: 279, stage: 'orcamento', lead_score: 55, probability: 50, status: 'IN_PROGRESS',
            interactions: [
                { type: 'RECEIPT_SENT', notes: 'Orçamento Plano Prata enviado via WhatsApp PDF', date: daysAgo(1), author: 'Vitório' },
                { type: 'MEETING', notes: 'Reunião online de 25min — demonstração completa do Kanban e POS', date: daysAgo(3), author: 'Vitório' }
            ],
            tasks: [
                { title: 'Follow-up pós orçamento em 2 dias', due_date: daysAgo(-1), completed: false }
            ],
            created_at: daysAgo(7)
        },
        {
            id: 9003, empresa_id: State.currentEmpresaId, title: 'Clínica VetPrime Moema — Enterprise',
            client_name: 'Dr. Thiago Ramos', client_phone: '(11) 97654-3210', client_city: 'São Paulo - SP',
            deal_value: 499, stage: 'contato', lead_score: 35, probability: 30, status: 'IN_PROGRESS',
            interactions: [
                { type: 'WHATSAPP_SENT', notes: 'Primeiro contato — perguntou sobre prontuário veterinário', date: daysAgo(1), author: 'Vitório' }
            ],
            tasks: [
                { title: 'Agendar demo do Prontuário Vet', due_date: daysAgo(-2), completed: false }
            ],
            created_at: daysAgo(3)
        },
        {
            id: 9004, empresa_id: State.currentEmpresaId, title: 'Au Au Pet Jardins — Bronze Ativado',
            client_name: 'Camila Duarte', client_phone: '(11) 95555-1234', client_city: 'São Paulo - SP',
            deal_value: 149, stage: 'ganho', lead_score: 100, probability: 100, status: 'WON',
            interactions: [
                { type: 'NOTE', notes: '✅ Contrato assinado! Onboarding iniciado.', date: daysAgo(0), author: 'Vitório' },
                { type: 'CALL_LOG', notes: 'Ligação de fechamento — escolheu Bronze para começar', date: daysAgo(1), author: 'Vitório' },
                { type: 'MEETING', notes: 'Demo de 30min — ficou encantada com Ficha Técnica em ml', date: daysAgo(4), author: 'Vitório' }
            ],
            tasks: [],
            created_at: daysAgo(8)
        },
        {
            id: 9005, empresa_id: State.currentEmpresaId, title: 'Pet Glamour Alphaville — Trial Expirado',
            client_name: 'Roberto Mendes', client_phone: '(11) 94321-8765', client_city: 'Barueri - SP',
            deal_value: 279, stage: 'lead', lead_score: 15, probability: 10, status: 'IN_PROGRESS',
            interactions: [
                { type: 'TRIAL_ACTIVATED', notes: 'Trial 14 dias ativado via landing page', date: daysAgo(16), author: 'Sistema' }
            ],
            tasks: [
                { title: 'Resgatar lead — trial expirou sem uso', due_date: daysAgo(0), completed: false }
            ],
            created_at: daysAgo(16)
        }
    ];
    DB.set('crm_deals', seed);
}

function renderCRM() {
    seedCRMDeals();
    const deals = (DB.get('crm_deals') || []).filter(d => d.empresa_id === State.currentEmpresaId);

    // KPIs
    const ativas = deals.filter(d => d.status === 'IN_PROGRESS').length;
    const valorTotal = deals.filter(d => d.status === 'IN_PROGRESS').reduce((s, d) => s + (d.deal_value || 0), 0);
    const ganhos = deals.filter(d => d.status === 'WON').length;
    const avgScore = deals.length > 0 ? Math.round(deals.reduce((s, d) => s + (d.lead_score || 0), 0) / deals.length) : 0;

    const el = (id) => document.getElementById(id);
    if (el('crm-kpi-ativas')) el('crm-kpi-ativas').textContent = ativas;
    if (el('crm-kpi-valor')) el('crm-kpi-valor').textContent = `R$ ${valorTotal.toLocaleString('pt-BR', {minimumFractionDigits: 0})}`;
    if (el('crm-kpi-ganhos')) el('crm-kpi-ganhos').textContent = ganhos;
    if (el('crm-kpi-score')) el('crm-kpi-score').textContent = `${avgScore} pts`;

    // Pipeline Kanban columns
    const stages = ['lead', 'contato', 'orcamento', 'negociacao', 'ganho'];
    const stageColors = { lead: '#64748b', contato: '#f59e0b', orcamento: '#8b5cf6', negociacao: '#3b82f6', ganho: '#10b981' };

    stages.forEach(stage => {
        const container = el(`crm-cards-${stage}`);
        const badge = el(`crm-badge-${stage}`);
        if (!container) return;

        const stageDeals = deals.filter(d => d.stage === stage);
        if (badge) badge.textContent = stageDeals.length;

        container.innerHTML = stageDeals.map(deal => {
            const scoreColor = deal.lead_score >= 80 ? '#10b981' : deal.lead_score >= 50 ? '#f59e0b' : '#ef4444';
            const nextStages = stages.filter(s => s !== deal.stage && s !== 'ganho');
            const moveOptions = stages.slice(stages.indexOf(stage) + 1).map(s =>
                `<option value="${s}">${s === 'lead' ? '📩 Lead' : s === 'contato' ? '📞 Contato' : s === 'orcamento' ? '📋 Orçamento' : s === 'negociacao' ? '🤝 Negociação' : '🏆 Ganho'}</option>`
            ).join('');

            return `
            <div class="kanban-card" style="border-left:3px solid ${stageColors[stage]};">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
                    <strong style="font-size:0.85rem; color:var(--text-main);">${deal.title}</strong>
                    <span style="font-size:0.7rem; font-weight:700; color:${scoreColor}; background:rgba(${deal.lead_score >= 80 ? '16,185,129' : deal.lead_score >= 50 ? '245,158,11' : '239,68,68'},0.15); padding:2px 6px; border-radius:4px;">${deal.lead_score} pts</span>
                </div>
                <div style="font-size:0.78rem; color:var(--text-secondary); margin-bottom:0.35rem;">👤 ${deal.client_name} — ${deal.client_city}</div>
                <div style="font-size:0.78rem; color:var(--text-secondary); margin-bottom:0.35rem;">📱 ${deal.client_phone}</div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.5rem; padding-top:0.5rem; border-top:1px dashed rgba(255,255,255,0.08);">
                    <strong style="font-size:0.9rem; color:#10b981;">R$ ${(deal.deal_value || 0).toLocaleString('pt-BR')}/mês</strong>
                    <span style="font-size:0.7rem; color:var(--text-muted);">${deal.probability}% prob.</span>
                </div>
                ${deal.status !== 'WON' ? `
                <div style="margin-top:0.5rem; display:flex; gap:0.35rem;">
                    <select onchange="handleCRMStageChange(${deal.id}, this.value)" style="flex:1; font-size:0.75rem; padding:0.3rem; background:rgba(30,41,59,0.8); border:1px solid rgba(255,255,255,0.1); border-radius:6px; color:var(--text-main);">
                        <option value="">Mover para...</option>
                        ${moveOptions}
                    </select>
                </div>` : '<div style="margin-top:0.5rem; text-align:center; font-size:0.75rem; color:#10b981; font-weight:700;">✅ CONTRATO FECHADO</div>'}
            </div>`;
        }).join('');
    });

    // Timeline 360°
    renderCRMTimeline(deals);
    // Follow-up Tasks
    renderCRMTasks(deals);
}

function handleCRMStageChange(dealId, newStage) {
    if (!newStage) return;
    const deals = DB.get('crm_deals') || [];
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;

    const oldStage = deal.stage;
    deal.stage = newStage;

    // Update lead score based on progression
    const scoreMap = { lead: 10, contato: 30, orcamento: 55, negociacao: 80, ganho: 100 };
    deal.lead_score = Math.max(deal.lead_score, scoreMap[newStage] || deal.lead_score);
    deal.probability = newStage === 'ganho' ? 100 : newStage === 'negociacao' ? 75 : newStage === 'orcamento' ? 50 : newStage === 'contato' ? 30 : 15;

    if (newStage === 'ganho') {
        deal.status = 'WON';
        deal.interactions.unshift({ type: 'NOTE', notes: '🏆 Oportunidade GANHA! Contrato fechado.', date: new Date().toISOString(), author: State.currentUserName || 'Admin' });
    } else {
        deal.interactions.unshift({ type: 'NOTE', notes: `Movido de "${oldStage}" para "${newStage}"`, date: new Date().toISOString(), author: State.currentUserName || 'Admin' });
    }

    DB.set('crm_deals', deals);
    renderCRM();
    State.showToast(`🤝 "${deal.title}" movido para ${newStage === 'ganho' ? '🏆 Ganho!' : newStage}`, newStage === 'ganho' ? 'success' : 'info');
}

function criarNovoDealCRM() {
    const clientes = (DB.get('clientes') || []).filter(c => c.empresa_id === State.currentEmpresaId);
    const clienteNome = clientes.length > 0 ? clientes[Math.floor(Math.random() * clientes.length)].nome : 'Novo Prospect';
    const deals = DB.get('crm_deals') || [];
    deals.push({
        id: Date.now(),
        empresa_id: State.currentEmpresaId,
        title: `Interesse ${clienteNome} — Plano Prata`,
        client_name: clienteNome,
        client_phone: '(11) 9XXXX-XXXX',
        client_city: 'São Paulo - SP',
        deal_value: 279,
        stage: 'lead',
        lead_score: 10,
        probability: 15,
        status: 'IN_PROGRESS',
        interactions: [
            { type: 'NOTE', notes: 'Oportunidade criada manualmente pelo operador', date: new Date().toISOString(), author: State.currentUserName || 'Admin' }
        ],
        tasks: [
            { title: `Fazer primeiro contato com ${clienteNome}`, due_date: new Date(Date.now() + 86400000).toISOString(), completed: false }
        ],
        created_at: new Date().toISOString()
    });
    DB.set('crm_deals', deals);
    renderCRM();
    State.showToast('✅ Nova oportunidade criada no CRM!', 'success');
}

function renderCRMTimeline(deals) {
    const container = document.getElementById('crm-timeline-container');
    if (!container) return;

    const allInteractions = [];
    deals.forEach(deal => {
        (deal.interactions || []).forEach(interaction => {
            allInteractions.push({ ...interaction, dealTitle: deal.title, clientName: deal.client_name });
        });
    });

    allInteractions.sort((a, b) => new Date(b.date) - new Date(a.date));
    const top15 = allInteractions.slice(0, 15);

    const iconMap = {
        'WHATSAPP_SENT': '💬', 'CALL_LOG': '📞', 'NOTE': '📝', 'MEETING': '🤝',
        'RECEIPT_SENT': '📄', 'TRIAL_ACTIVATED': '🚀'
    };
    const colorMap = {
        'WHATSAPP_SENT': '#25d366', 'CALL_LOG': '#f59e0b', 'NOTE': '#64748b', 'MEETING': '#8b5cf6',
        'RECEIPT_SENT': '#38bdf8', 'TRIAL_ACTIVATED': '#10b981'
    };

    container.innerHTML = top15.length === 0
        ? '<p style="font-size:0.85rem; color:var(--text-muted); text-align:center;">Nenhuma interação registrada ainda.</p>'
        : top15.map(i => `
        <div style="display:flex; gap:0.75rem; padding:0.6rem 0; border-bottom:1px solid rgba(255,255,255,0.05);">
            <div style="font-size:1.2rem; min-width:28px; text-align:center;">${iconMap[i.type] || '📝'}</div>
            <div style="flex:1;">
                <div style="font-size:0.8rem; font-weight:600; color:${colorMap[i.type] || '#94a3b8'};">${i.dealTitle}</div>
                <div style="font-size:0.78rem; color:var(--text-main); margin:0.15rem 0;">${i.notes}</div>
                <div style="font-size:0.7rem; color:var(--text-muted); display:flex; gap:0.5rem;"><span>👤 ${i.author || 'Sistema'}</span><span>🕐 ${new Date(i.date).toLocaleDateString('pt-BR')} ${new Date(i.date).toLocaleTimeString('pt-BR', {hour:'2-digit', minute:'2-digit'})}</span></div>
            </div>
        </div>
    `).join('');
}

function renderCRMTasks(deals) {
    const container = document.getElementById('crm-tasks-container');
    if (!container) return;

    const allTasks = [];
    deals.forEach(deal => {
        (deal.tasks || []).forEach(task => {
            allTasks.push({ ...task, dealTitle: deal.title, dealId: deal.id });
        });
    });

    const pendingTasks = allTasks.filter(t => !t.completed).sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    const now = new Date();

    container.innerHTML = pendingTasks.length === 0
        ? '<p style="font-size:0.85rem; color:var(--text-muted); text-align:center;">🎉 Todas as tarefas foram concluídas!</p>'
        : pendingTasks.map(task => {
            const due = new Date(task.due_date);
            const isOverdue = due < now;
            const isToday = due.toDateString() === now.toDateString();
            const statusColor = isOverdue ? '#ef4444' : isToday ? '#f59e0b' : '#10b981';
            const statusLabel = isOverdue ? '⚠️ Atrasada' : isToday ? '📌 Hoje' : `📅 ${due.toLocaleDateString('pt-BR')}`;

            return `
            <div style="display:flex; gap:0.75rem; align-items:center; padding:0.6rem 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                <input type="checkbox" onclick="completarTarefaCRM(${task.dealId}, '${task.title.replace(/'/g, "\\'")}')"
                       style="width:18px; height:18px; cursor:pointer; accent-color:${statusColor};">
                <div style="flex:1;">
                    <div style="font-size:0.82rem; font-weight:600; color:var(--text-main);">${task.title}</div>
                    <div style="font-size:0.72rem; color:var(--text-muted); margin-top:0.15rem;">📋 ${task.dealTitle}</div>
                </div>
                <span style="font-size:0.7rem; font-weight:700; color:${statusColor}; white-space:nowrap;">${statusLabel}</span>
            </div>`;
        }).join('');
}

function completarTarefaCRM(dealId, taskTitle) {
    const deals = DB.get('crm_deals') || [];
    const deal = deals.find(d => d.id === dealId);
    if (!deal) return;
    const task = deal.tasks.find(t => t.title === taskTitle);
    if (task) task.completed = true;
    deal.interactions.unshift({ type: 'NOTE', notes: `✅ Tarefa concluída: "${taskTitle}"`, date: new Date().toISOString(), author: State.currentUserName || 'Admin' });
    deal.lead_score = Math.min(100, (deal.lead_score || 0) + 5);
    DB.set('crm_deals', deals);
    renderCRM();
    State.showToast('✅ Tarefa concluída!', 'success');
}

// =====================================================================
// 📱 WHATSAPP EVOLUTION API — MOTOR MULTI-TENANT (SAAS)
// =====================================================================

const EVOLUTION_GLOBAL_URL = 'https://evolution-api-production-ebf6.up.railway.app';
const EVOLUTION_GLOBAL_KEY = '508082bd88fe3bccb52afee3220d41ff30bee226c62f3cde22caf5b7ede22f26';

/** Obtém a configuração de WhatsApp da empresa ativa (Multi-Tenant) */
function getWhatsAppConfig(empresaId = State.currentEmpresaId) {
    const configs = DB.get('whatsapp_configs_multitenant') || {};
    if (!configs[empresaId]) {
        const empresas = DB.get('empresas') || [];
        const emp = empresas.find(e => e.id === empresaId);
        const slug = emp ? emp.nome.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 15) : `empresa_${empresaId}`;
        configs[empresaId] = {
            apiUrl: EVOLUTION_GLOBAL_URL,
            apiKey: EVOLUTION_GLOBAL_KEY,
            instanceName: `pataforma_${slug}_${empresaId}`,
            connected: false,
            empresa_id: empresaId
        };
        DB.set('whatsapp_configs_multitenant', configs);
    }
    return configs[empresaId];
}

/** Salva a configuração de WhatsApp da empresa ativa */
function setWhatsAppConfig(cfg, empresaId = State.currentEmpresaId) {
    const configs = DB.get('whatsapp_configs_multitenant') || {};
    configs[empresaId] = { ...getWhatsAppConfig(empresaId), ...cfg, empresa_id: empresaId };
    DB.set('whatsapp_configs_multitenant', configs);
    DB.set('whatsapp_config', configs[empresaId]); // retrocompatibilidade
}

/**
 * Envia uma mensagem via Evolution API usando a instância do Pet Shop ativo.
 */
async function enviarMensagemWhatsApp(numero, mensagem, clienteId, tipo) {
    const config = getWhatsAppConfig(State.currentEmpresaId);
    const logArr = DB.get('whatsapp_mensagens_log') || [];
    const novoId = logArr.length > 0 ? Math.max(...logArr.map(l => l.id)) + 1 : 1;

    // Salva no log independentemente do modo
    logArr.unshift({
        id: novoId,
        empresa_id: State.currentEmpresaId,
        cliente_id: clienteId || null,
        numero: numero,
        tipo: tipo || 'manual',
        mensagem: mensagem,
        status: 'enviando',
        timestamp: new Date().toISOString()
    });
    DB.set('whatsapp_mensagens_log', logArr);

    const numLimpo = (numero || '').replace(/\D/g, '');

    // Modo REAL: Evolution API configurada
    if (config.apiUrl && config.apiKey && config.instanceName && numLimpo) {
        try {
            const res = await fetch(`${config.apiUrl}/message/sendText/${config.instanceName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': config.apiKey
                },
                body: JSON.stringify({ number: numLimpo, text: mensagem })
            });
            const logAtual = DB.get('whatsapp_mensagens_log') || [];
            const idx = logAtual.findIndex(l => l.id === novoId);
            if (idx !== -1) logAtual[idx].status = res.ok ? 'enviada' : 'erro';
            DB.set('whatsapp_mensagens_log', logAtual);

            if (res.ok) {
                State.showToast(`💬 WhatsApp enviado para ${numLimpo}!`, 'success');
                DB.logAudit(State.currentEmpresaId, State.currentProfile, 'WhatsApp Enviado ✅', `Tipo: ${tipo} | Número: ${numLimpo}`);
            } else {
                State.showToast(`⚠️ Falha ao enviar WhatsApp (HTTP ${res.status})`, 'warning');
            }
        } catch (err) {
            console.warn('WhatsApp send error:', err);
            const logAtual = DB.get('whatsapp_mensagens_log') || [];
            const idx = logAtual.findIndex(l => l.id === novoId);
            if (idx !== -1) logAtual[idx].status = 'erro';
            DB.set('whatsapp_mensagens_log', logAtual);
            State.showToast(`⚠️ Erro de conexão com Evolution API. Abrindo WhatsApp Web...`, 'warning');
            window.open(`https://web.whatsapp.com/send?phone=${numLimpo}&text=${encodeURIComponent(mensagem)}`, '_blank');
        }
    } else {
        // Modo SIMULADO: sem API configurada → abre WhatsApp Web
        const logAtual = DB.get('whatsapp_mensagens_log') || [];
        const idx = logAtual.findIndex(l => l.id === novoId);
        if (idx !== -1) logAtual[idx].status = 'simulado';
        DB.set('whatsapp_mensagens_log', logAtual);

        if (numLimpo) {
            window.open(`https://api.whatsapp.com/send?phone=${numLimpo}&text=${encodeURIComponent(mensagem)}`, '_blank');
            State.showToast(`📱 WhatsApp aberto! Configure a Evolution API nas Configurações para envio direto.`, 'info');
        } else {
            State.showToast(`⚠️ Número não cadastrado para este cliente.`, 'warning');
        }
    }
}

/** Envia convite de opt-in para o cliente cadastrado */
async function enviarConviteOptIn(clienteId) {
    const clientes = DB.get('clientes') || [];
    const cliente = clientes.find(c => c.id === clienteId);
    if (!cliente) return;

    const empresas = DB.get('empresas') || [];
    const empresa = empresas.find(e => e.id === State.currentEmpresaId) || {};

    const msg = `Olá *${cliente.nome.split(' ')[0]}*! 🐾\n\nSou o *${empresa.nome || 'Pet Shop'}*.\n\nPosso te enviar mensagens sobre o(s) seu(s) pet(s) pelo WhatsApp?\n\nResponda com o número da opção desejada:\n\n1️⃣ Status do banho/tosa em tempo real\n2️⃣ Lembretes de agendamento\n3️⃣ Promoções e novidades\n4️⃣ Todas as opções acima\n0️⃣ Não quero receber mensagens\n\n_Sua resposta ficará registrada conforme a LGPD._`;

    await enviarMensagemWhatsApp(cliente.whatsapp_numero, msg, clienteId, 'opt_in');

    // Marca que o convite foi enviado
    const idx = clientes.findIndex(c => c.id === clienteId);
    if (idx !== -1 && !clientes[idx].whatsapp_opt_in_data) {
        clientes[idx].whatsapp_opt_in_data = new Date().toISOString();
        clientes[idx].whatsapp_opt_in_origem = 'plataforma';
        DB.set('clientes', clientes);
    }
}

/** Salva configuração da Evolution API para a empresa ativa */
function salvarConfigWhatsApp() {
    const apiUrl   = (document.getElementById('wa-config-api-url')?.value || '').trim();
    const apiKey   = (document.getElementById('wa-config-api-key')?.value || '').trim();
    const instName = (document.getElementById('wa-config-instance')?.value || '').trim();

    setWhatsAppConfig({ apiUrl, apiKey, instanceName: instName, connected: false });
    State.showToast('✅ Configuração da Evolution API salva para esta empresa!', 'success');
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'Config WhatsApp Salva', `Empresa ID ${State.currentEmpresaId} | Instance: ${instName}`);
    testarConexaoWhatsApp();
}

/** Testa conexão com Evolution API para a empresa ativa */
async function testarConexaoWhatsApp() {
    const config = getWhatsAppConfig(State.currentEmpresaId);
    const statusEl = document.getElementById('wa-connection-status');
    if (!config.apiUrl || !config.apiKey || !config.instanceName) {
        if (statusEl) statusEl.innerHTML = `<span class="wa-status-badge disconnected">⚠️ Preencha a URL, API Key e Instance Name</span>`;
        return;
    }
    if (statusEl) statusEl.innerHTML = `<span class="wa-status-badge connecting">⏳ Testando conexão...</span>`;
    try {
        const res = await fetch(`${config.apiUrl}/instance/fetchInstances`, {
            headers: { 'apikey': config.apiKey }
        });
        const ok = res.ok;
        setWhatsAppConfig({ connected: ok });
        if (statusEl) statusEl.innerHTML = ok
            ? `<span class="wa-status-badge connected">✅ Conectado — Servidor Online (Instância: ${config.instanceName})</span>`
            : `<span class="wa-status-badge disconnected">❌ Falha (HTTP ${res.status}) — verifique URL/APIKey</span>`;
        State.showToast(ok ? `✅ Evolution API conectada (${config.instanceName})!` : '❌ Falha na conexão — verifique as credenciais.', ok ? 'success' : 'error');
    } catch (err) {
        if (statusEl) statusEl.innerHTML = `<span class="wa-status-badge disconnected">❌ Sem resposta — verifique se o servidor está ativo</span>`;
        State.showToast('⚠️ Servidor Evolution API não respondeu.', 'warning');
    }
}

/** Cria a instância do Pet Shop ativo ou busca o QR Code na Evolution API e exibe no modal */
async function conectarOuGerarQRCodeWhatsApp() {
    const config = getWhatsAppConfig(State.currentEmpresaId);
    if (!config.apiUrl || !config.apiKey || !config.instanceName) {
        State.showToast('⚠️ Configure a URL, API Key e Instance antes de conectar.', 'warning');
        return;
    }

    const qrContainer = document.getElementById('wa-qrcode-container');
    const qrStatus = document.getElementById('wa-qrcode-status');
    if (qrStatus) qrStatus.textContent = `⏳ Conectando à instância "${config.instanceName}" e gerando QR Code...`;
    if (qrContainer) qrContainer.innerHTML = '<div style="padding:2rem; color:var(--text-muted);">Gerando QR Code...</div>';
    openModal('modal-wa-qrcode');

    try {
        // 1. Tenta criar a instância única para esta empresa caso não exista
        await fetch(`${config.apiUrl}/instance/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'apikey': config.apiKey },
            body: JSON.stringify({
                instanceName: config.instanceName,
                qrcode: true,
                integration: 'WHATSAPP-BAILEYS'
            })
        }).catch(() => {});

        // 2. Busca o QR Code de conexão da instância da empresa
        const res = await fetch(`${config.apiUrl}/instance/connect/${config.instanceName}`, {
            headers: { 'apikey': config.apiKey }
        });
        const data = await res.json();

        const base64 = data.base64 || data.qrcode?.base64 || data.code;
        if (base64) {
            const imgSrc = base64.startsWith('data:image') ? base64 : `data:image/png;base64,${base64}`;
            if (qrContainer) {
                qrContainer.innerHTML = `<img src="${imgSrc}" alt="QR Code WhatsApp" style="width:260px; height:260px; border-radius:12px; border:2px solid #25d366; background:white; padding:8px; box-shadow:0 8px 24px rgba(0,0,0,0.3);">`;
            }
            if (qrStatus) qrStatus.innerHTML = `📱 WhatsApp de <strong>${config.instanceName}</strong>: abra o WhatsApp no celular &gt; <strong>Aparelhos Conectados</strong> &gt; <strong>Conectar Aparelho</strong> e aponte para o QR Code acima.`;
        } else if (data.instance?.state === 'open' || data.state === 'open') {
            if (qrContainer) qrContainer.innerHTML = '<div style="font-size:3rem; margin:1rem 0;">✅</div><h4 style="color:#25d366;">WhatsApp deste Pet Shop já está Conectado!</h4>';
            if (qrStatus) qrStatus.textContent = 'Esta unidade está pronta para enviar mensagens automáticas.';
            setWhatsAppConfig({ connected: true });
            renderWhatsApp();
        } else {
            if (qrContainer) qrContainer.innerHTML = '<div style="color:#f87171; padding:1.5rem;">⚠️ Não foi possível obter o QR Code.<br><small>Verifique se a Evolution API está ativa.</small></div>';
            if (qrStatus) qrStatus.textContent = 'Erro ao carregar QR Code.';
        }
    } catch (err) {
        if (qrContainer) qrContainer.innerHTML = '<div style="color:#f87171; padding:1.5rem;">❌ Erro de conexão com a Evolution API.<br><small>Servidor inacessível.</small></div>';
        if (qrStatus) qrStatus.textContent = 'Servidor inacessível.';
    }
}

/** Renderiza a seção WhatsApp completa */
function renderWhatsApp() {
    const config = getWhatsAppConfig(State.currentEmpresaId);
    const clientes = (DB.get('clientes') || []).filter(c => c.empresa_id === State.currentEmpresaId);
    const logs     = (DB.get('whatsapp_mensagens_log') || []).filter(l => l.empresa_id === State.currentEmpresaId);

    const totalOpt    = clientes.filter(c => c.whatsapp_opt_in).length;
    const totalMkt    = clientes.filter(c => c.whatsapp_marketing).length;
    const totalStatus = clientes.filter(c => c.whatsapp_status_pet).length;
    const totalSem    = clientes.filter(c => !c.whatsapp_opt_in).length;

    // KPIs
    const setEl = (id, v) => { const el = document.getElementById(id); if (el) el.innerHTML = v; };
    setEl('wa-kpi-opt-in',     totalOpt);
    setEl('wa-kpi-marketing',  totalMkt);
    setEl('wa-kpi-status',     totalStatus);
    setEl('wa-kpi-sem-opt',    totalSem);

    // Preencher config
    const urlEl = document.getElementById('wa-config-api-url');
    const keyEl = document.getElementById('wa-config-api-key');
    const instEl = document.getElementById('wa-config-instance');
    if (urlEl) urlEl.value = config.apiUrl || '';
    if (keyEl) keyEl.value = config.apiKey || '';
    if (instEl) instEl.value = config.instanceName || '';

    const statusEl = document.getElementById('wa-connection-status');
    if (statusEl) {
        statusEl.innerHTML = config.connected
            ? `<span class="wa-status-badge connected">✅ Conectado</span>`
            : (config.apiUrl ? `<span class="wa-status-badge disconnected">❌ Desconectado</span>` : `<span class="wa-status-badge disconnected">⚙️ Não configurado</span>`);
    }

    // Tabela de clientes com opt-in
    const tbody = document.getElementById('wa-clientes-tbody');
    if (tbody) {
        tbody.innerHTML = clientes.map(c => {
            const optBadge = c.whatsapp_opt_in
                ? `<span class="wa-badge active">✅ Ativo</span>`
                : `<span class="wa-badge inactive">❌ Sem opt-in</span>`;
            const mktBadge   = c.whatsapp_marketing  ? `<span class="wa-badge mini mkt">📣 Mkt</span>`   : '';
            const vendasBadge = c.whatsapp_vendas    ? `<span class="wa-badge mini vendas">🛒 Vendas</span>` : '';
            const lemBadge   = c.whatsapp_lembretes  ? `<span class="wa-badge mini lem">📅 Lem.</span>`  : '';
            const stsBadge   = c.whatsapp_status_pet ? `<span class="wa-badge mini sts">🐾 Status</span>` : '';
            const origem     = c.whatsapp_opt_in_origem ? `<small class="wa-origem">${c.whatsapp_opt_in_origem}</small>` : '';
            const numDisplay = c.whatsapp_numero ? c.whatsapp_numero.replace('55', '+55 ') : c.telefone || '—';
            return `<tr>
                <td><strong>${c.nome}</strong></td>
                <td><code style="font-size:0.78rem;">${numDisplay}</code></td>
                <td>${optBadge} ${origem}</td>
                <td style="display:flex;flex-wrap:wrap;gap:0.25rem;padding:0.5rem 0;">${mktBadge}${vendasBadge}${lemBadge}${stsBadge}</td>
                <td>
                    <div style="display:flex;gap:0.35rem;flex-wrap:wrap;">
                        ${!c.whatsapp_opt_in ? `<button class="card-btn" onclick="enviarConviteOptIn(${c.id})" title="Enviar convite de opt-in">📨 Opt-in</button>` : ''}
                        ${c.whatsapp_opt_in  ? `<button class="card-btn" onclick="abrirModalPrefsWhatsApp(${c.id})">⚙️ Prefs</button>` : ''}
                        ${c.whatsapp_opt_in  ? `<button class="card-btn" style="color:#25d366;" onclick="abrirComposerMensagem(${c.id})">💬 Enviar</button>` : ''}
                    </div>
                </td>
            </tr>`;
        }).join('');
    }

    // Log de mensagens
    const logBody = document.getElementById('wa-log-tbody');
    if (logBody) {
        logBody.innerHTML = logs.slice(0, 30).map(l => {
            const cl = (DB.get('clientes') || []).find(c => c.id === l.cliente_id);
            const statusColor = l.status === 'enviada' ? '#10b981' : l.status === 'simulado' ? '#f59e0b' : l.status === 'enviando' ? '#38bdf8' : '#ef4444';
            const tipoEmoji   = { status_pet: '🐾', lembrete: '📅', marketing: '📣', vendas: '🛒', opt_in: '📨', manual: '💬' }[l.tipo] || '💬';
            return `<tr>
                <td><small>${new Date(l.timestamp).toLocaleString('pt-BR')}</small></td>
                <td>${cl ? cl.nome : l.numero}</td>
                <td>${tipoEmoji} ${l.tipo}</td>
                <td style="max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${l.mensagem}"><small>${l.mensagem}</small></td>
                <td><span style="color:${statusColor};font-weight:700;">${l.status}</span></td>
            </tr>`;
        }).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);">Nenhuma mensagem enviada ainda.</td></tr>';
    }
}

/** Abre modal para editar preferências de opt-in do cliente */
function abrirModalPrefsWhatsApp(clienteId) {
    const clientes = DB.get('clientes') || [];
    const c = clientes.find(cl => cl.id === clienteId);
    if (!c) return;

    const setCheck = (id, val) => { const el = document.getElementById(id); if (el) el.checked = !!val; };
    const setVal   = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };

    document.getElementById('wa-prefs-cliente-nome').textContent = c.nome;
    document.getElementById('wa-prefs-cliente-id').value = clienteId;
    setVal('wa-prefs-numero', c.whatsapp_numero || c.telefone?.replace(/\D/g, '') || '');
    setCheck('wa-prefs-opt-in',     c.whatsapp_opt_in);
    setCheck('wa-prefs-marketing',  c.whatsapp_marketing);
    setCheck('wa-prefs-vendas',     c.whatsapp_vendas);
    setCheck('wa-prefs-lembretes',  c.whatsapp_lembretes);
    setCheck('wa-prefs-status-pet', c.whatsapp_status_pet);

    openModal('modal-wa-prefs');
}

/** Salva preferências de opt-in do cliente */
function salvarPrefsWhatsApp() {
    const clienteId = parseInt(document.getElementById('wa-prefs-cliente-id')?.value);
    const clientes  = DB.get('clientes') || [];
    const idx = clientes.findIndex(c => c.id === clienteId);
    if (idx === -1) return;

    const getCheck = id => !!document.getElementById(id)?.checked;
    const numero = (document.getElementById('wa-prefs-numero')?.value || '').replace(/\D/g, '');

    const optIn = getCheck('wa-prefs-opt-in');
    clientes[idx].whatsapp_numero    = numero ? (numero.startsWith('55') ? numero : '55' + numero) : clientes[idx].whatsapp_numero;
    clientes[idx].whatsapp_opt_in    = optIn;
    clientes[idx].whatsapp_marketing = optIn && getCheck('wa-prefs-marketing');
    clientes[idx].whatsapp_vendas    = optIn && getCheck('wa-prefs-vendas');
    clientes[idx].whatsapp_lembretes = optIn && getCheck('wa-prefs-lembretes');
    clientes[idx].whatsapp_status_pet= optIn && getCheck('wa-prefs-status-pet');
    if (optIn && !clientes[idx].whatsapp_opt_in_data) {
        clientes[idx].whatsapp_opt_in_data   = new Date().toISOString();
        clientes[idx].whatsapp_opt_in_origem = 'plataforma';
    }
    if (!optIn) {
        clientes[idx].whatsapp_opt_in_data   = null;
        clientes[idx].whatsapp_opt_in_origem = null;
    }

    DB.set('clientes', clientes);
    DB.logAudit(State.currentEmpresaId, State.currentProfile, 'WhatsApp Prefs Salvas', `Cliente ${clientes[idx].nome} — opt_in: ${optIn}`);
    State.showToast('✅ Preferências de comunicação salvas!', 'success');
    closeModal('modal-wa-prefs');
    renderWhatsApp();
}

/** Abre o composer para envio manual de mensagem */
function abrirComposerMensagem(clienteId) {
    const clientes = DB.get('clientes') || [];
    const c = clientes.find(cl => cl.id === clienteId);
    if (!c) return;

    document.getElementById('wa-composer-cliente-id').value = clienteId;
    document.getElementById('wa-composer-nome').textContent  = c.nome;
    document.getElementById('wa-composer-numero').textContent = c.whatsapp_numero ? `+${c.whatsapp_numero}` : c.telefone;
    document.getElementById('wa-composer-msg').value = '';
    openModal('modal-wa-composer');
}

/** Usa um template pré-definido no composer */
function usarTemplateWA(tipo) {
    const clienteId = parseInt(document.getElementById('wa-composer-cliente-id')?.value);
    const clientes  = DB.get('clientes') || [];
    const pets      = DB.get('pets') || [];
    const c = clientes.find(cl => cl.id === clienteId);
    if (!c) return;

    const pet = pets.find(p => p.cliente_id === c.id);
    const petNome = pet ? pet.nome : 'seu pet';
    const empresas = DB.get('empresas') || [];
    const empresa  = empresas.find(e => e.id === State.currentEmpresaId) || {};
    const nomePet  = petNome;
    const nomeTutor = c.nome.split(' ')[0];

    const templates = {
        pronto:    `🐾 Olá *${nomeTutor}*! *${nomePet}* está PRONTO para retirada! 🎉\n📍 ${empresa.nome || 'CatDog Pet Center'}\n\nAté logo! 😊`,
        lembrete:  `📅 Olá *${nomeTutor}*! Lembrete: *${nomePet}* tem agendamento amanhã!\n\nQualquer dúvida, estamos aqui. 🐾`,
        marketing: `🎉 Olá *${nomeTutor}*! Temos uma novidade especial para *${nomePet}* esta semana.\n\nFale comigo para saber mais! 🐶`,
        nps:       `⭐ Olá *${nomeTutor}*! Como foi a experiência do *${nomePet}* conosco?\n\nAvalie de 1 a 5 ⭐ — sua opinião é muito importante para nós! 🙏`,
        vendas:    `🛒 Olá *${nomeTutor}*! Temos produtos especiais para *${nomePet}* disponíveis.\n\nQuer ver as novidades? 🐾`
    };

    const msgEl = document.getElementById('wa-composer-msg');
    if (msgEl && templates[tipo]) msgEl.value = templates[tipo];
}

/** Envia mensagem do composer */
async function enviarMensagemComposer() {
    const clienteId = parseInt(document.getElementById('wa-composer-cliente-id')?.value);
    const msg = (document.getElementById('wa-composer-msg')?.value || '').trim();
    if (!msg) { State.showToast('⚠️ Digite uma mensagem antes de enviar.', 'warning'); return; }

    const clientes = DB.get('clientes') || [];
    const c = clientes.find(cl => cl.id === clienteId);
    if (!c) return;

    const btn = document.getElementById('btn-wa-composer-enviar');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Enviando...'; }

    await enviarMensagemWhatsApp(c.whatsapp_numero, msg, clienteId, 'manual');

    if (btn) { btn.disabled = false; btn.textContent = '📤 Enviar'; }
    closeModal('modal-wa-composer');
    renderWhatsApp();
}

/** Envio em massa segmentado por categoria de opt-in */
async function enviarMensagemSegmentada() {
    const categoria  = document.getElementById('wa-broadcast-categoria')?.value;
    const msg        = (document.getElementById('wa-broadcast-msg')?.value || '').trim();
    if (!msg || !categoria) { State.showToast('⚠️ Preencha a mensagem e selecione a categoria.', 'warning'); return; }

    const clientes = (DB.get('clientes') || []).filter(c => c.empresa_id === State.currentEmpresaId && c.whatsapp_opt_in);
    const filtrados = clientes.filter(c => {
        if (categoria === 'todos')     return true;
        if (categoria === 'marketing') return c.whatsapp_marketing;
        if (categoria === 'vendas')    return c.whatsapp_vendas;
        if (categoria === 'lembretes') return c.whatsapp_lembretes;
        if (categoria === 'status')    return c.whatsapp_status_pet;
        return false;
    });

    if (filtrados.length === 0) { State.showToast('⚠️ Nenhum cliente elegível para esta segmentação.', 'warning'); return; }

    if (!confirm(`Enviar mensagem para ${filtrados.length} cliente(s) com opt-in "${categoria}"?\n\nMensagem:\n"${msg.slice(0,80)}..."`)) return;

    const btn = document.getElementById('btn-wa-broadcast-enviar');
    if (btn) { btn.disabled = true; btn.textContent = `⏳ Enviando para ${filtrados.length}...`; }

    for (const c of filtrados) {
        const msgPersonalizada = msg.replace('{{nome}}', c.nome.split(' ')[0]).replace('{{pet}}', '');
        await enviarMensagemWhatsApp(c.whatsapp_numero, msgPersonalizada, c.id, categoria);
        await new Promise(r => setTimeout(r, 400)); // delay entre envios
    }

    if (btn) { btn.disabled = false; btn.textContent = '📤 Enviar para Segmento'; }
    State.showToast(`✅ Mensagem enviada para ${filtrados.length} clientes!`, 'success');
    document.getElementById('wa-broadcast-msg').value = '';
    renderWhatsApp();
}

// Initial Load
window.addEventListener('DOMContentLoaded', () => {
    const profileSelector = document.getElementById('current-profile-select');
    if (profileSelector) {
        profileSelector.addEventListener('change', (e) => {
            applyRBAC(e.target.value);
        });
    }

    renderEmpresasSelector();
    renderFiliaisHeaderSelector();
    populateSelectOptions();
    calcularROISimulacao();
    applyRBAC('Admin');

    // Auto-open operational PIN login if URL contains #login or #app
    if (window.location.hash === '#login' || window.location.hash === '#app' || window.location.search.includes('mode=app')) {
        setTimeout(() => {
            abrirLoginOperacionalPIN();
        }, 300);
    }

    switchTab('kanban');

    // ── PWA: Registro do Service Worker ──────────────────────────
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => {
                console.log('[PataForma PWA] Service Worker registrado:', reg.scope);
            })
            .catch((err) => {
                console.warn('[PataForma PWA] Service Worker falhou:', err);
            });
    }

    // ── PWA: Banner "Instalar App" ────────────────────────────────
    let deferredInstallPrompt = null;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredInstallPrompt = e;

        // Mostra banner de instalação após 10 segundos (não intrusivo)
        setTimeout(() => {
            if (!deferredInstallPrompt) return;
            State.showToast('📲 Instale o PataForma como app no seu dispositivo!', 'info', 8000, () => {
                deferredInstallPrompt.prompt();
                deferredInstallPrompt.userChoice.then((choice) => {
                    if (choice.outcome === 'accepted') {
                        State.showToast('🎉 PataForma instalado com sucesso!', 'success');
                    }
                    deferredInstallPrompt = null;
                });
            });
        }, 10000);
    });

    window.addEventListener('appinstalled', () => {
        deferredInstallPrompt = null;
        State.showToast('✅ PataForma instalado! Acesse pelo ícone na tela inicial.', 'success');
    });
});
