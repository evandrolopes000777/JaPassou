import { CONFIG } from '../config.js';
import { dadosMock } from '../mocks/dados.js';

function removerAcentos(texto) {
    return texto
        ? texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
        : '';
}

// 1. Listar Instituições (Mock e Real)
export async function listarInstituicoes() {
    if (CONFIG.USAR_MOCK) {
        return dadosMock.instituicoes;
    }

    const url = `${CONFIG.SUPABASE_URL}/rest/v1/instituicoes?select=id,nome&order=nome.asc`;
    const resposta = await fetch(url, {
        headers: {
            apikey: CONFIG.SUPABASE_ANON_KEY,
            Authorization: `Bearer ${CONFIG.SUPABASE_ANON_KEY}`
        }
    });

    if (!resposta.ok) return [];
    return await resposta.json();
}

// 2. Listar Rotas por Instituição e Texto (Mock e Real)
export async function listarRotas(instituicaoId, termoBusca = '') {
    let rotas = [];

    if (CONFIG.USAR_MOCK) {
        rotas = dadosMock.rotas.filter(
            (r) => r.instituicao_id === instituicaoId && r.ativa === true
        );
    } else {
        // Consulta real no Supabase filtrando ativa = true e instituição
        const url = `${CONFIG.SUPABASE_URL}/rest/v1/rotas?select=id,nome,instituicao_id,ativa,status,horario_saida,pontos_parada(nome,ordem)&instituicao_id=eq.${instituicaoId}&ativa=eq.true`;
        const resposta = await fetch(url, {
            headers: {
                apikey: CONFIG.SUPABASE_ANON_KEY,
                Authorization: `Bearer ${CONFIG.SUPABASE_ANON_KEY}`
            }
        });

        if (!resposta.ok) return [];
        const dadosReais = await resposta.json();

        // Converte os campos do banco para o formato exato do contrato (igual ao mock)
        rotas = dadosReais.map((rota) => ({
            id: rota.id,
            nome: rota.nome,
            instituicao_id: rota.instituicao_id,
            ativa: rota.ativa,
            status: rota.status,
            horarioSaida: rota.horario_saida,
            pontos_parada: (rota.pontos_parada || []).sort((a, b) => a.ordem - b.ordem)
        }));
    }

    if (!rotas || rotas.length === 0) {
        return [];
    }

    if (!termoBusca || termoBusca.trim() === '') {
        return rotas;
    }

    const termoNormalizado = removerAcentos(termoBusca);

    return rotas.filter((rota) => {
        const nomeRotaMatch = removerAcentos(rota.nome).includes(termoNormalizado);
        const pontoMatch =
            rota.pontos_parada &&
            rota.pontos_parada.some((p) => removerAcentos(p.nome).includes(termoNormalizado));

        return nomeRotaMatch || pontoMatch;
    });
}