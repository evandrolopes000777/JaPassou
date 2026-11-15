# 🚌 JáPassou? — Sistema de Transporte Estudantil

O **JáPassou?** é uma aplicação web responsiva voltada para a consulta e o monitoramento em tempo real do transporte de estudantes do IFBA. A solução foi concebida para substituir a dependência de informações informais ("boca a boca") por dados centralizados de rastreamento de ônibus, itinerários e horários previstos, garantindo previsibilidade e segurança aos alunos no ponto de embarque.

---

## 📌 Visão Geral e Declaração do Problema

### O Problema
Atualmente, a comunicação sobre o transporte estudantil ocorre de maneira descentralizada e informal. Os estudantes enfrentam a incerteza constante nos pontos de ônibus, dependendo do boca a boca ou de grupos de mensagens para saber se o veículo já passou, se está atrasado ou qual o seu trajeto.

### A Solução
O **JáPassou?** ataca diretamente a falha de comunicação ao oferecer uma **plataforma centralizada com rastreamento contínuo**. Projetado com uma abordagem **Mobile-First** e suporte a **Progressive Web App (PWA)**, o sistema permite que o estudante acesse as informações diretamente pelo celular, com interface leve e otimizada para redes móveis de internet.

---

## 👥 Perfis de Usuários (Atores do Sistema)

A aplicação atende quatro perfis de acessos distintos:

1. **👑 Administrador (Admin):** Possui acesso total para cadastrar e gerenciar frotas, motoristas e rotas, publicar avisos no mural e emitir relatórios operacionais.
2. **轨 Motorista:** Responsável por acionar o "Início de Trajeto", sinalizar ocorrências ou atrasos em tempo real e encerrar a viagem.
3. **🎓 Usuário Logado (Aluno):** Acompanha os ônibus em tempo real no mapa, salva rotas favoritas, recebe alertas de aproximação do veículo, envia sugestões e avalia as viagens.
4. **👤 Usuário Não Logado (Visitante):** Possui acesso livre para consultar o mural de avisos, pesquisar linhas por instituição de ensino e rastrear ônibus no mapa sem necessidade de cadastro.

---

## 🚀 Funcionalidades Principais

* **📍 Rastreamento em Tempo Real:** Visualização no mapa dos veículos em circulação, seus itinerários e pontos de parada.
* **⭐ Rotas Favoritas:** Acesso rápido na aba de perfil para consultar linhas salvas e receber alertas configurados.
* **🔔 Notificação de Chegada:** Alertas automáticos quando o ônibus de uma rota favoritada estiver próximo ao ponto de embarque do aluno.
* **📢 Mural de Avisos:** Exibição cronológica de comunicados importantes, alterações de itinerário ou imprevistos reportados pela administração e motoristas.
* **🚦 Gestão de Trajeto pelo Motorista:** Controles simplificados para alterar o status da viagem ("ainda não saiu", "em circulação", "atrasado" e "encerrado").

---

## 🛠️ Arquitetura Técnica e Relação com Sistemas Operacionais

### Stack Tecnológica
* **Front-end:** HTML5, CSS3 puro (com variáveis e componentes modulares) e JavaScript ES6 Nativo (ES Modules).
* **Back-end & Banco de Dados:** Supabase (PostgreSQL) com suporte a *Row Level Security* (RLS).
* **Arquitetura de Dados Flexível:** Suporte a desenvolvimento offline/local através da chave `USAR_MOCK` em `js/config.js`.

### Suporte e Recursos de Sistemas Operacionais
A aplicação se conecta diretamente aos serviços do Sistema Operacional no servidor e no cliente para manter alta performance:
* **Gerenciamento de Processos e Multithreading:** Escalonamento de threads paralelas no servidor para suportar acessos simultâneos nos horários de pico escolar sem travamentos.
* **Gerenciamento de Memória e Sockets (Rede):** Alocação dinâmica de buffers na memória RAM e suporte a chamadas de sistema/sockets (TCP/IP e WebSockets) para atualização dinâmica de coordenadas.
* **Segurança e E/S:** Criptografia de dados via HTTPS, hash unidirecional para senhas e bloqueio de arquivos durante acessos concorrentes no banco de dados.

---

## 📂 Estrutura do Projeto e Divisão da Equipe (Seção 3.6 do SLA)

A organização das pastas e os responsáveis por módulo seguem o planejamento de engenharia do grupo:

```text
japassou/
├── index.html              # Entrada da aplicação e redirecionamento (Anriu)
├── home.html               # Estrutura principal da Dashboard (Evandro)
├── rotas.html              # Estrutura da consulta de rotas (Nayelen)
├── css/
│   ├── base.css            # Variáveis globais e resets visuais (Evandro)
│   ├── componentes.css     # Estilos de cards e botões genéricos (Evandro)
│   ├── home.css            # Estilos específicos da Home (Evandro)
│   ├── rotas.css           # Estilos da consulta de rotas (Nayelen)
│   ├── navbar.css          # Estilos do menu de navegação (Nayelen)
│   ├── toast.css           # Estilos das notificações Toast (Júllia)
│   └── mural.css           # Estilos do painel de avisos (Júllia)
├── js/
│   ├── config.js           # Parâmetros globais (chave USAR_MOCK) (Anriu)
│   ├── services/           # Comunicação com dados e Supabase (Anriu & Davi)
│   ├── mocks/              # Dados simulados para testes locais (Davi)
│   ├── components/         # Componentes interativos JS (Júllia & Nayelen)
│   └── pages/              # Controladores das páginas (Evandro & Nayelen)
├── database/               # Scripts SQL DDL (schema.sql) e DML (seed.sql) (Davi)
└── docs/                   # Especificações de contratos, DER e rotas reais (Júllia & Davi)
```

### Integrantes do Projeto (IFBA Campus Irecê)
* **Anriu Oliveira dos Santos:** Estrutura, Configurações, Preferências e Deploy.
* **Davi:** Modelagem de Banco de Dados, Mocks e Services de Dados.
* **Evandro Lopes Barbosa:** Design de Interface, CSS Base e Página Home.
* **Júllia Maria de Freitas Silva:** Scrum Master, Garantia de Qualidade (QA), Notificações e Documentação.
* **Nayelen dos Santos Menezes:** Barra de Navegação, Interface de Rotas e Testes.

---

## ⚡ Como Executar o Projeto

1. Clone ou baixe este repositório em sua máquina.
2. Abra a pasta do projeto no **VS Code**.
3. Execute a aplicação utilizando a extensão **Live Server** a partir do arquivo `index.html` ou `home.html`.
4. Para alternar entre o modo offline (dados simulados) e a conexão real com o banco de dados em nuvem, altere a variável `USAR_MOCK` no arquivo `js/config.js`.

---

## 🔀 Fluxo Git e Organização do Trabalho

1. **Branch Principal (`main`):** Protegida contra commits diretos. Alterações somente via Pull Request (PR) aprovado por pelo menos 1 integrante.
2. **Nomenclatura de Branches:** Padrão `<nome>/<codigo-do-card>` (ex: `evandro/S1-04-css-base`).
3. **Duplas de Code Review:**
   * Front-end: Nayelen ↔ Evandro
   * Dados & Infraestrutura: Anriu ↔ Davi
   * QA & Docs: Júllia (revisados pelo responsável do módulo)
