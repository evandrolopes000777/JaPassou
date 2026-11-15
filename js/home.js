import { listarRotas } from './services/rotaService.js';

document.addEventListener('DOMContentLoaded', async () => {
    // ID da instituição padrão (IFBA - Campus Irecê)
    const instituicaoId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

    // Elementos visuais do card principal da Home
    const elStatus = document.querySelector('.card .status');
    const elRotaNome = document.querySelector('.card .rota-nome');
    const elValorDestino = document.querySelector('.card .valor-destino');
    const elTextoAviso = document.querySelector('.card .texto-aviso');

    // Função para atualizar o visual do card com os dados da rota
    function preencherCard(rota) {
        if (!rota) return;

        if (elRotaNome) {
            elRotaNome.textContent = rota.nome;
        }

        if (elStatus) {
            const statusFormatado = rota.status === 'em_circulacao' 
                ? 'Em circulação' 
                : rota.status === 'atrasado' 
                ? 'Atrasado' 
                : 'Ainda não saiu';
            elStatus.textContent = statusFormatado;
        }

        if (elValorDestino && rota.pontos_parada && rota.pontos_parada.length > 0) {
            elValorDestino.textContent = `Ponto ${rota.pontos_parada[0].nome}`;
        }

        if (elTextoAviso && rota.horarioSaida) {
            elTextoAviso.textContent = `Você pode mudar até a saída do ônibus (${rota.horarioSaida.substring(0, 5)}).`;
        }
    }

    try {
        // 1. Carrega todas as rotas ativas ao abrir a página
        const rotasIniciais = await listarRotas(instituicaoId);
        if (rotasIniciais && rotasIniciais.length > 0) {
            preencherCard(rotasIniciais[0]);
        }

        // 2. Configura a interatividade do Painel de Teste Temporário
        const inputBusca = document.getElementById('input-busca-teste');
        const btnBuscar = document.getElementById('btn-buscar-teste');
        const divResultado = document.getElementById('resultado-busca-teste');

        if (btnBuscar && inputBusca) {
            btnBuscar.addEventListener('click', async () => {
                const termo = inputBusca.value;
                const rotasEncontradas = await listarRotas(instituicaoId, termo);
                
                if (rotasEncontradas.length > 0) {
                    preencherCard(rotasEncontradas[0]);
                    divResultado.innerHTML = `✅ Sucesso: <b>${rotasEncontradas.length}</b> rota(s) encontrada(s) para "<i>${termo}</i>". Exibindo: <b>${rotasEncontradas[0].nome}</b>`;
                    divResultado.className = 'mt-2 text-success fw-bold';
                } else {
                    divResultado.innerHTML = `⚠️ Nenhuma rota encontrada para "<i>${termo}</i>" (Retornou array vazio [] conforme o contrato).`;
                    divResultado.className = 'mt-2 text-danger fw-bold';
                }
            });
        }

        console.log("✅ Home sincronizada e painel de teste ativado!");
    } catch (error) {
        console.error("Erro ao carregar dados na home:", error);
    }
});