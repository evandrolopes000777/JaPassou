# Contrato de Serviços e Camada de Dados - JáPassou?
**Versão:** 1.0  
**Referência:** Cartões S1-03 e S1-07 do Trello  

Este documento define o contrato de comunicação entre a camada de interface (Front-End) e a camada de dados (Supabase / Mocks) do sistema **JáPassou?**, em conformidade com a Seção 3.3 do Documento de Visão.

---

## 1. Configuração do Ambiente (`js/config.js`)
O sistema utiliza um objeto de configuração centralizado que permite alternar entre o modo Mock (para desenvolvimento offline/testes rápidos) e o modo Real (conectado ao banco Supabase).

```javascript
export const CONFIG = {
    USAR_MOCK: false, // true para usar mocks locais, false para conectar ao Supabase
    SUPABASE_URL: 'https://ljbhyhewwsegvarzimte.supabase.co',
    SUPABASE_ANON_KEY: 'sb_publishable_InABSK_Av6znz9LIgMtyjQ_mRirThXD'
};
```
*Nota de Segurança:* A chave `service_role` (Secret key) nunca deve ser incluída no repositório ou exposta no código do front-end. Utiliza-se exclusivamente a chave pública (`Publishable key`) protegida pelas regras de Row Level Security (RLS) do Supabase.

---

## 2. Contrato de Funções de Serviço (`js/services/rotaService.js`)

### 2.1. `listarInstituicoes()`
* **Objetivo:** Retorna a lista de instituições de ensino cadastradas no sistema (RF32).
* **Parâmetros:** Nenhum.
* **Retorno (Promise<Array>):** Array de objetos contendo `id` e `nome`.
* **Exemplo de Retorno:**
```json
[
  {
    "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    "nome": "IFBA - Campus Irecê"
  }
]
```

### 2.2. `listarRotas(instituicaoId, termoBusca = '')`
* **Objetivo:** Consulta as rotas ativas de uma instituição específica, permitindo filtro opcional por texto (nome da rota ou nome dos pontos de parada), ignorando maiúsculas e acentos (RF07, RF10).
* **Parâmetros:**
  * `instituicaoId` (String / UUID): Identificador da instituição.
  * `termoBusca` (String, opcional): Texto digitado pelo usuário para busca.
* **Retorno (Promise<Array>):** Array de rotas ativas contendo seus respectivos pontos de parada ordenados. Caso não encontre registros, retorna um array vazio `[]`.
* **Contrato do Objeto de Rota:**
```json
{
  "id": "b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22",
  "nome": "Rota Centro (Manhã)",
  "instituicao_id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
  "ativa": true,
  "status": "em_circulacao",
  "horarioSaida": "06:30:00",
  "pontos_parada": [
    { "nome": "Praça do Feijão", "ordem": 1 },
    { "nome": "Rodoviária", "ordem": 2 },
    { "nome": "Em frente à Clínica de Minaura", "ordem": 3 },
    { "nome": "Semáforo da AABB", "ordem": 4 }
  ]
}
```