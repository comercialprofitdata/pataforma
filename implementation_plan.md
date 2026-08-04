# Plano de Implementação: PataForma — Software de Gestão Inteligente para Pet Shops

> **Slogan Oficial:** *"PataForma: A plataforma inteligente que faz a operação do seu pet shop rodar com precisão do banho ao caixa."*

Este documento apresenta a arquitetura técnica, o estudo comparativo contra o **SimplesVet**, os 9 fluxos operacionais interligados e a matriz de governança do **PataForma**.

## 1. Análise Comparativa: PataForma vs. SimplesVet

Após análise aprofundada da plataforma **SimplesVet** (líder nacional no segmento veterinário e pet shop), mapeamos suas forças e os **5 diferenciais competitivos em que o PataForma supera o mercado**:

| Funcionalidade / Pilar | SimplesVet (Líder Atual) | PataForma (Inovação Superior) |
| :--- | :--- | :--- |
| **Workflow de Atendimento** | Agenda tradicional em tabela/lista de horários | **Kanban Operacional Interativo em Tempo Real** (`Em Rota ➔ Banho ➔ Tosa ➔ QC ➔ Pronto`) |
| **Módulo Táxi Dog (Logística)** | Sem módulo mobile de transporte pet integrado | **App Mobile Táxi Dog com GPS HTML5 + Captura de Foto** na coleta e entrega |
| **Controle de Qualidade (QC)** | O pet é finalizado diretamente no agendamento | **Etapa deQC Obrigatória pelo Supervisor** antes da liberação, com foto enviada ao Tutor |
| **Venda Visual de Balcão** | Busca textual ou código de barras tradicional | **Catálogo de Produtos com Foto** para itens sem código de barras (petiscos a granel, lacinhos) |
| **Gestão de Estoque** | Baixa de quantidade simples por produto | **Estoque FEFO (First-Expired, First-Out)** obrigatório para rações e perecíveis por lote |
| **Arquitetura Financeira** | Monólito interno com módulos pagos | **Financeiro Nativo Completo + Webhook REST Desacoplado** (LOVI 10 e ERPs externos) |

---

## 2. Visão Geral & Arquitetura do PataForma

### 📱 App Único Modular & Responsivo (Full-Stack Monólito PWA)
- **Uma Única Aplicação para Todos os Telefones e Computadores**: O **PataForma** é uma aplicação web responsiva única (PWA/Mobile-First).
- **Controle de Módulos Dinâmico (Feature Toggles & RBAC)**: O administrador habilita ou desabilita as funções conforme o perfil do usuário (Admin, Supervisor, Recepção, Operacional/Banhista, Entregador/Táxi Dog).

### 🔄 Mapeamento dos 9 Fluxos Operacionais Interligados
1. **Agendamento & Onboarding (Cliente & Recepção)**
2. **Logística do Táxi Dog - Coleta (Entregador & Tutor com GPS/Foto)**
3. **Triagem, Inspeção de Entrada & Exceções (Banhista, Supervisor & Recepção)**
4. **Execução de Banho & Tosa (Banhista & Tosador)**
5. **Inspeção de Qualidade - QC (Supervisor de Estética)**
6. **Logística do Táxi Dog - Devolução (Entregador & Tutor com GPS/Foto)**
7. **Automação Financeira & Baixa de Pacotes (PataForma Core & Webhook LOVI 10)**
8. **Gestão de Estoque FEFO & Produtos com Foto (Atendente & Supervisor de Estoque)**
9. **Governança, Audits & Dashboards Analytics (Administrador & Gestor via Pandas)**

---

## 2. Componentes e Entregáveis

### [Atualizado] `pet_shop_management_prompt_v2.md`
Documento estratégico atualizado com:
- Motor financeiro local no DDL SQL (`contas_receber`, `contas_pagar`, `vendas`, `itens_venda`).
- Integração LOVI 10 refatorada como camada externa opcional/modular.
- As 10 sugestões de nomes para o produto.

---

## 3. Plano de Verificação

### Verificação de Regra de Negócio
- Garantir que a finalização do Kanban grava o evento financeiro na tabela local `contas_receber` / `movimentacoes_caixa` do Pet Shop App antes de disparar o Webhook para o LOVI 10.
- Confirmar que a desativação ou falha do LOVI 10 não impede a operação local do Pet Shop App.

