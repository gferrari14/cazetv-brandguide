Plano:

1. Ajustar o `CircularCarousel` para que a animação atravesse a tela inteira:
   - a imagem entra vindo de fora da margem esquerda do site;
   - para no centro, no tamanho atual do carrossel, com o movimento de instabilidade em todas as direções;
   - ao passar o mouse, sai pela margem direita do site, ultrapassando totalmente a lateral.
2. Remover o recorte (`overflow-hidden`) que hoje faz a imagem sumir dentro do próprio quadrado do carrossel.
3. Manter o carrossel posicionado sobre o título da home e o hover continua avançando para a próxima imagem.

Detalhes técnicos:

- Em `src/components/shared/CircularCarousel.tsx`, trocar as keyframes para usar deslocamento baseado na viewport: entrada de `translateX(-100vw)` até `translateX(0)` e saída de `translateX(0)` até `translateX(100vw)`.
- Remover `overflow-hidden` do container e deixar o pai (na `index.tsx`) sem clipping, para a imagem poder transitar fora dos limites do quadrado.
- Manter o tamanho fixo do item central (`size`) como referência visual no centro.