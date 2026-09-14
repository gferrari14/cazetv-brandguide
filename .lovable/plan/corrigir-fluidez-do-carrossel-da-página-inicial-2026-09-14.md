# Corrigir fluidez do carrossel da página inicial

## Objetivo
Fazer a troca dos ícones percorrer um arco contínuo, sem engasgos, pausas ou sobreposição, mantendo apenas um ícone visível por vez.

## Ajustes
- Substituir as duas animações CSS separadas de saída e entrada por um único movimento contínuo controlado quadro a quadro.
- Fazer o ícone atual sair pelo arco inferior direito, trocar a imagem somente quando estiver fora da tela e trazer o próximo pelo arco inferior esquerdo.
- Manter velocidade contínua durante o percurso, sem reiniciar a aceleração no meio da troca.
- Preservar o limite entre trocas para evitar avanços rápidos ao movimentar o mouse.
- Manter a leve movimentação do ícone parado, isolada da trajetória do carrossel.

## Validação
- Testar a troca por mouse e clique na página inicial.
- Confirmar visualmente que não há pausa no centro, salto de posição ou dois ícones aparecendo juntos.
- Conferir o comportamento com movimento reduzido ativado.

## Detalhes técnicos
O componente atual encerra uma animação de saída, troca o conteúdo e inicia outra animação de entrada. Essa separação reinicia o ritmo e produz a trava perceptível. A nova implementação usará uma única linha de tempo com `requestAnimationFrame`, trajetória parabólica e troca invisível no ponto inferior do percurso.
