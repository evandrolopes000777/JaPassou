/* ==========================================================
   tela-busca.js
   Tela "Rotas": busca, filtros, abas e favoritas.

   COMO LIGAR AO BACK-END (Java):
   - Troque a função `carregarRotas()` por um fetch na API, ex.:
       const resp = await fetch('/api/rotas?instituicao=' + id);
       return await resp.json();
     O JSON deve ter o mesmo formato dos objetos de ROTAS_MOCK.
   - Os favoritos hoje ficam no localStorage; para salvar no banco,
     troque `lerFavoritos()` / `salvarFavoritos()` por chamadas à API.
   ========================================================== */

(function () {
  "use strict";

  // ---------- Dados de exemplo (substituir pela API) ----------
  const ROTAS_MOCK = [
    {
      id: "centro",
      nome: "Rota Centro",
      status: "circulacao",
      instituicao: "ifba-irece",
      detalhe: "Praça → Campus · saiu 12:10",
      detalheFavorita: "Ponto padrão: Ayrton Senna",
    },
    {
      id: "bairro-sul",
      nome: "Rota Bairro Sul",
      status: "atrasado",
      instituicao: "ifba-irece",
      detalhe: "Partida prevista 12:10",
      detalheFavorita: "Partida prevista 12:10",
    },
    {
      id: "norte",
      nome: "Rota Norte",
      status: "parado",
      instituicao: "ifba-irece",
      detalhe: "Partida prevista 17:30",
      detalheFavorita: "Partida prevista 17:30",
    },
  ];

  const STATUS = {
    circulacao: { texto: "Em Circulação", classe: "chip--circulacao" },
    atrasado: { texto: "Atrasado", classe: "chip--atrasado" },
    parado: { texto: "Ainda não saiu", classe: "chip--parado" },
  };

  const CHAVE_FAVORITOS = "japassou:rotas-favoritas";
  const FAVORITOS_INICIAIS = ["centro", "norte"]; // como no protótipo
  const PAGINA_ACOMPANHAMENTO = "tela-acompanhamento.html";

  // ---------- Estado ----------
  let rotas = [];
  let favoritos = lerFavoritos();

  // ---------- Elementos ----------
  const listaRotas = document.getElementById("lista-rotas");
  const listaFavoritas = document.getElementById("lista-favoritas");
  const painelBuscar = document.getElementById("painel-buscar");
  const painelFavoritas = document.getElementById("painel-favoritas");
  const abaBuscar = document.getElementById("aba-buscar");
  const abaFavoritas = document.getElementById("aba-favoritas");
  const filtros = document.getElementById("filtros");
  const campoBusca = document.getElementById("filtro-busca");
  const campoInstituicao = document.getElementById("filtro-instituicao");
  const qtdFavoritas = document.getElementById("qtd-favoritas");
  const btnVoltar = document.getElementById("btn-voltar");

  // ---------- Utilitários ----------
  function lerFavoritos() {
    try {
      const salvo = localStorage.getItem(CHAVE_FAVORITOS);
      return salvo ? JSON.parse(salvo) : FAVORITOS_INICIAIS.slice();
    } catch (e) {
      return FAVORITOS_INICIAIS.slice();
    }
  }

  function salvarFavoritos() {
    try {
      localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify(favoritos));
    } catch (e) {
      /* sem armazenamento disponível: segue só em memória */
    }
  }

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "");
  }

  function criar(tag, classe, texto) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  const SVG_NS = "http://www.w3.org/2000/svg";

  function criarIcone(caminho) {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", caminho);
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path);
    return svg;
  }

  const ICONE_FAVORITO = "M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z";
  const ICONE_SETA = "M9 5l7 7-7 7";

  function urlAcompanhamento(rota) {
    return PAGINA_ACOMPANHAMENTO + "?rota=" + encodeURIComponent(rota.id);
  }

  // ---------- Dados ----------
  async function carregarRotas() {
    // TODO: trocar por fetch na API Java.
    return ROTAS_MOCK;
  }

  // ---------- Render ----------
  function criarChip(rota) {
    const s = STATUS[rota.status] || STATUS.parado;
    return criar("span", "chip " + s.classe, s.texto);
  }

  function criarCardBusca(rota) {
    const item = criar("li", "card");

    const info = criar("div", "card__info");
    info.appendChild(criarChip(rota));
    info.appendChild(criar("h2", "card__nome", rota.nome));
    info.appendChild(criar("p", "card__detalhe", rota.detalhe));

    const acoes = criar("div", "card__acoes");

    const ehFavorita = favoritos.includes(rota.id);
    const btnFav = criar("button", "btn-icone btn-favorito");
    btnFav.type = "button";
    btnFav.setAttribute("aria-pressed", String(ehFavorita));
    btnFav.setAttribute(
      "aria-label",
      (ehFavorita ? "Remover dos favoritos: " : "Adicionar aos favoritos: ") + rota.nome
    );
    btnFav.appendChild(criarIcone(ICONE_FAVORITO));
    btnFav.addEventListener("click", function () {
      alternarFavorito(rota.id);
    });

    const linkDetalhes = criar("a", "btn-icone");
    linkDetalhes.href = urlAcompanhamento(rota);
    linkDetalhes.setAttribute("aria-label", "Ver detalhes: " + rota.nome);
    const iconeSeta = criarIcone(ICONE_SETA);
    iconeSeta.setAttribute("fill", "none");
    iconeSeta.setAttribute("stroke", "currentColor");
    iconeSeta.setAttribute("stroke-width", "2.5");
    linkDetalhes.appendChild(iconeSeta);

    acoes.append(btnFav, linkDetalhes);
    item.append(info, acoes);
    return item;
  }

  function criarCardFavorita(rota) {
    const item = criar("li", "card card--favorita");

    const info = criar("div", "card__info");
    info.appendChild(criarChip(rota));
    info.appendChild(criar("h2", "card__nome", rota.nome));
    info.appendChild(criar("p", "card__detalhe", rota.detalheFavorita));

    const botoes = criar("div", "botoes");

    const verAoVivo = criar("a", "btn btn--primario", "Ver ao vivo");
    verAoVivo.href = urlAcompanhamento(rota);

    const remover = criar("button", "btn btn--contorno", "Remover");
    remover.type = "button";
    remover.setAttribute("aria-label", "Remover " + rota.nome + " dos favoritos");
    remover.addEventListener("click", function () {
      alternarFavorito(rota.id);
    });

    botoes.append(verAoVivo, remover);
    item.append(info, botoes);
    return item;
  }

  function mostrarVazio(lista, mensagem) {
    lista.appendChild(criar("li", "vazio", mensagem));
  }

  function renderBusca() {
    const termo = normalizar(campoBusca.value.trim());
    const instituicao = campoInstituicao.value;

    const filtradas = rotas.filter(function (r) {
      const daInstituicao = r.instituicao === instituicao;
      const bateTexto = !termo || normalizar(r.nome + " " + r.detalhe).includes(termo);
      return daInstituicao && bateTexto;
    });

    listaRotas.replaceChildren();
    if (filtradas.length === 0) {
      mostrarVazio(listaRotas, "Nenhuma rota encontrada.");
      return;
    }
    filtradas.forEach(function (r) {
      listaRotas.appendChild(criarCardBusca(r));
    });
  }

  function renderFavoritas() {
    const lista = rotas.filter(function (r) {
      return favoritos.includes(r.id);
    });

    listaFavoritas.replaceChildren();
    if (lista.length === 0) {
      mostrarVazio(listaFavoritas, "Você ainda não tem rotas favoritas.");
      return;
    }
    lista.forEach(function (r) {
      listaFavoritas.appendChild(criarCardFavorita(r));
    });
  }

  function renderTudo() {
    qtdFavoritas.textContent = favoritos.length;
    renderBusca();
    renderFavoritas();
  }

  // ---------- Ações ----------
  function alternarFavorito(id) {
    const i = favoritos.indexOf(id);
    if (i >= 0) {
      favoritos.splice(i, 1);
    } else {
      favoritos.push(id);
    }
    salvarFavoritos();
    renderTudo();
  }

  function selecionarAba(nome) {
    const buscando = nome === "buscar";
    abaBuscar.setAttribute("aria-selected", String(buscando));
    abaFavoritas.setAttribute("aria-selected", String(!buscando));
    painelBuscar.hidden = !buscando;
    painelFavoritas.hidden = buscando;
    filtros.hidden = !buscando; // filtros só fazem sentido na busca
  }

  // ---------- Eventos ----------
  abaBuscar.addEventListener("click", function () {
    selecionarAba("buscar");
  });
  abaFavoritas.addEventListener("click", function () {
    selecionarAba("favoritas");
  });
  campoBusca.addEventListener("input", renderBusca);
  campoInstituicao.addEventListener("change", renderBusca);
  btnVoltar.addEventListener("click", function () {
    if (history.length > 1) {
      history.back();
    } else {
      window.location.href = "home.html";
    }
  });

  // ---------- Início ----------
  carregarRotas().then(function (dados) {
    rotas = dados;
    renderTudo();
  });
})();