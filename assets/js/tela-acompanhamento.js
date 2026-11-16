/* ==========================================================
   tela-acompanhamento.js
   Lê o parâmetro ?rota=<id> da URL e preenche a tela.

   COMO LIGAR AO BACK-END (Java):
   - Troque `buscarRota(id)` por um fetch, ex.:
       const resp = await fetch('/api/rotas/' + id + '/acompanhamento');
       return await resp.json();
   - Para tempo real, chame `buscarRota` num setInterval (polling)
     ou use WebSocket e chame `preencher(dados)` a cada atualização.
   - O mapa deve ser iniciado dentro do elemento #mapa.
   ========================================================== */

(function () {
  "use strict";

  // ---------- Dados de exemplo (substituir pela API) ----------
  const ROTAS_MOCK = {
    centro: {
      nome: "Rota Centro",
      motorista: "Carlos",
      onibus: "N° 02",
      saida: "12:10",
      atualizadoHa: "10s",
      tempoAteSeuPonto: "10 min",
      paradas: [
        { nome: "Garagem", tipo: "garagem", percorrida: true },
        { nome: "Ônibus 02 agora", tipo: "onibus", percorrida: true },
        { nome: "Praça Ayrton Senna", tipo: "seu-ponto" },
        { nome: "Subway" },
        { nome: "Rodoviária" },
        { nome: "Pastel do Bob" },
        { nome: "Jardim Leonor Martins Miranda" },
        { nome: "IFBA - Campus Irecê", tipo: "destino" },
      ],
    },
    "bairro-sul": {
      nome: "Rota Bairro Sul",
      motorista: "Marcos",
      onibus: "N° 05",
      saida: "12:10",
      atualizadoHa: "—",
      tempoAteSeuPonto: "—",
      paradas: [
        { nome: "Garagem", tipo: "garagem", percorrida: true },
        { nome: "Ônibus 05 agora", tipo: "onibus" },
        { nome: "Bairro Sul" },
        { nome: "IFBA - Campus Irecê", tipo: "destino" },
      ],
    },
    norte: {
      nome: "Rota Norte",
      motorista: "Ricardo",
      onibus: "N° 07",
      saida: "17:30",
      atualizadoHa: "—",
      tempoAteSeuPonto: "—",
      paradas: [
        { nome: "Garagem", tipo: "garagem" },
        { nome: "Bairro Norte" },
        { nome: "IFBA - Campus Irecê", tipo: "destino" },
      ],
    },
  };

  async function buscarRota(id) {
    // TODO: trocar por fetch na API Java.
    return ROTAS_MOCK[id] || null;
  }

  // ---------- Render ----------
  function texto(id, valor) {
    document.getElementById(id).textContent = valor;
  }

  function preencher(rota) {
    texto("titulo-rota", rota.nome);
    document.title = rota.nome + " | JáPassou?";
    texto("dado-motorista", rota.motorista);
    texto("dado-onibus", rota.onibus);
    texto("dado-saida", rota.saida);
    texto("resumo-saida", "saiu " + rota.saida);
    texto("resumo-atualizacao", "há " + rota.atualizadoHa);
    texto("resumo-ponto", "seu ponto • " + rota.tempoAteSeuPonto);

    const lista = document.getElementById("lista-paradas");
    lista.replaceChildren();

    rota.paradas.forEach(function (p) {
      const li = document.createElement("li");
      li.className = "parada";
      if (p.tipo) li.classList.add("parada--" + p.tipo);
      if (p.percorrida) li.classList.add("parada--percorrida");

      const nome = document.createElement("span");
      nome.textContent = p.nome;

      const ponto = document.createElement("span");
      ponto.className = "parada__ponto";
      ponto.setAttribute("aria-hidden", "true");

      li.append(nome, ponto);
      lista.appendChild(li);
    });
  }

  function mostrarNaoEncontrada() {
    texto("titulo-rota", "Rota não encontrada");
    texto("dado-motorista", "—");
    texto("dado-onibus", "—");
    texto("dado-saida", "—");
  }

  // ---------- Início ----------
  const id = new URLSearchParams(window.location.search).get("rota");

  buscarRota(id).then(function (rota) {
    if (rota) {
      preencher(rota);
    } else {
      mostrarNaoEncontrada();
    }
  });
})();