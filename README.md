# Sistema-Gerenciamento-de-refrigeracao

## Requisitos funcionais:

O sistema deve permitir login exclusivo do tecnico prestador de servicos com e-mail e senha.
O sistema deve permitir cadastrar clientes com nome, telefone, e-mail e endereco.
O sistema deve permitir editar, visualizar e desativar clientes cadastrados.
O sistema deve permitir cadastrar aparelhos de A/C vinculados a um cliente, informando marca, modelo e capacidade (BTU).
O sistema deve listar todos os aparelhos de um cliente com seus respectivos status de manutencao.
O sistema deve permitir registrar uma manutencao realizada, informando aparelho, data, tipo de servico e proxima data prevista.
O sistema deve exibir o historico completo de manutencoes por aparelho.
O sistema deve calcular automaticamente os dias restantes ate a proxima manutencao e classificar o status em: Ok, Atencao ou Vencido.
O sistema deve exibir alertas visuais no dashboard para aparelhos com manutencao proxima ou vencida.
O sistema deve exibir um painel resumo com total de clientes, aparelhos ativos e aparelhos com alerta, listando os com manutencao mais proxima.



## Requisitos não funcionais: 
O sistema deve garantir que somente o tecnico autenticado possa acessar e modificar qualquer dado, sem nenhuma informacao publica disponivel.
O sistema deve armazenar todas as senhas com hash seguro (bcrypt ou Argon2), sem jamais persistir senhas em texto puro.
O sistema deve carregar as paginas principais (dashboard e listagem de clientes) em menos de 2 segundos em conexao 4G.
O sistema deve calcular o temporizador de dias restantes em tempo real no frontend, sem realizar chamadas adicionais ao servidor.
O sistema deve estar disponivel pelo menos 99,5% do tempo, tolerando no maximo aproximadamente 3,6 horas de downtime por mes.
O sistema deve ser responsivo e funcionar corretamente em smartphones com largura minima de 375px, tablets e desktops.
O sistema deve exigir confirmacao explicita do usuario antes de executar acoes criticas como excluir ou desativar registros.
O sistema deve ter o codigo frontend desenvolvido em TypeScript com modo strict ativado e componentes bem separados por responsabilidade.
O sistema deve restringir o acesso aos dados sensiveis dos clientes (telefone e e-mail) exclusivamente ao tecnico proprietario da conta.
O sistema deve comunicar os alertas e status de manutencao com icone ou texto complementar, sem depender exclusivamente de cor como unico indicador.

## Regras de negócio

### RN-01 - Temporizador de manutencao
A contagem de dias e calculada como: proxima_manutencao - data_atual (em dias inteiros). O status e determinado da seguinte forma:
Ok: mais de 30 dias restantes - indicador verde
Atencao: entre 1 e 30 dias restantes - indicador amarelo
Vencido: data ja passou - indicador vermelho

### RN-02 - Vinculo obrigatorio aparelho-cliente
Todo aparelho deve estar vinculado a um cliente ativo. Nao e possivel cadastrar aparelhos sem selecionar um cliente.

### RN-03 - Historico imutavel de manutencoes
Registros de manutencoes concluidas nao podem ser excluidos, apenas editados pelo tecnico, garantindo a integridade do historico de servicos prestados.

