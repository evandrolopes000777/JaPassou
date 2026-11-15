# Modelo Entidade-Relacionamento (DER) e Banco de Dados
**Projeto:** JáPassou?  
**Referência:** Cartão S1-05 (Modelar e criar o banco)  

---

## 1. Visão Geral do Modelo Relacional
O banco de dados foi modelado utilizando PostgreSQL no Supabase, estruturado em três tabelas principais para atender aos requisitos de gerenciamento de instituições, rotas e pontos de parada da frota estudantil.

### Estrutura das Caixas (Tabelas) e Ligações:

1. **`instituicoes`** (1) ──< (N) **`rotas`**
2. **`rotas`** (1) ──< (N) **`pontos_parada`**

---

## 2. Detalhamento das Tabelas

### `instituicoes`
Armazena as instituições de ensino atendidas pelo transporte estudantil.
* `id` (UUID, PK): Identificador único gerado automaticamente.
* `nome` (VARCHAR, Unique): Nome oficial da instituição (ex: *IFBA - Campus Irecê*).
* `criado_em` (Timestamp): Data e hora de criação do registro.

### `rotas`
Armazena as linhas de ônibus e seu estado operacional atual.
* `id` (UUID, PK): Identificador único da rota.
* `nome` (VARCHAR): Nome descritivo da rota (ex: *Rota Centro (Manhã)*).
* `instituicao_id` (UUID, FK): Referência à tabela `instituicoes` (com exclusão em cascata).
* `ativa` (Boolean): Flag que indica se a rota está ativa (`true`) ou inativa (`false`).
* `status` (VARCHAR): Estado operacional atual (ex: `ainda_nao_saiu`, `em_circulacao`, `atrasado`).
* `horario_saida` (Time): Horário previsto para partida.
* `criado_em` (Timestamp): Data e hora de cadastro.

### `pontos_parada`
Armazena os pontos geográficos e de referência que compõem o itinerário da rota.
* `id` (UUID, PK): Identificador único do ponto.
* `rota_id` (UUID, FK): Referência à tabela `rotas` (com exclusão em cascata).
* `nome` (VARCHAR): Descrição do local de parada (ex: *Praça do Feijão*).
* `ordem` (Integer): Sequência numérica do ponto no trajeto (1, 2, 3...).
* `criado_em` (Timestamp): Data e hora de cadastro.

---

## 3. Segurança e Políticas (RLS)
Todas as tabelas possuem o recurso de **Row Level Security (RLS)** habilitado, garantindo que o acesso público de leitura (`SELECT`) seja permitido de forma controlada conforme a Seção 3.4 do Documento de Visão, enquanto operações de escrita são restritas aos administradores autenticados.