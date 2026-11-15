export const dadosMock = {
    instituicoes: [
        { id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', nome: 'IFBA - Campus Irecê' }
    ],
    rotas: [
        {
            id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
            nome: 'Rota Centro (Manhã)',
            instituicao_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
            ativa: true,
            status: 'em_circulacao',
            horarioSaida: '06:30:00',
            pontos_parada: [
                { nome: 'Praça do Feijão', ordem: 1 },
                { nome: 'Rodoviária', ordem: 2 },
                { nome: 'Em frente à Clínica de Minaura', ordem: 3 },
                { nome: 'Semáforo da AABB', ordem: 4 }
            ]
        },
        {
            id: 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
            nome: 'Rota Bairro Sul (Manhã)',
            instituicao_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
            ativa: true,
            status: 'atrasado',
            horarioSaida: '06:20:00',
            pontos_parada: [
                { nome: 'Material de construção Davi', ordem: 1 },
                { nome: 'Praça da Boa Vista', ordem: 2 },
                { nome: 'Ayrton Senna', ordem: 3 },
                { nome: 'Praça da Prefeitura', ordem: 4 }
            ]
        },
        {
            id: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
            nome: 'Rota Norte',
            instituicao_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
            ativa: true,
            status: 'ainda_nao_saiu',
            horarioSaida: '16:30:00',
            pontos_parada: [
                { nome: 'Praça Ayrton Sena', ordem: 1 },
                { nome: 'Antiga Praça da Prefeitura', ordem: 2 },
                { nome: 'Praça do Feijão', ordem: 3 },
                { nome: 'Rodoviária', ordem: 4 }
            ]
        }
    ]
};