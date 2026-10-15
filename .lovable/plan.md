# Ajustes no rodapé (RevealFooter)

Arquivo: `src/components/shared/RevealFooter.tsx`

## Mudanças

1. **Diminuir o bloco branco um pouco**
   - `min-h-[55vh]` → `min-h-[48vh]` no `<footer>`.

2. **Primeiro parágrafo em Druk Wide, um pouco maior**
   - O texto é dividido em parágrafos por `\n\n`. O parágrafo 0 ("AS IDENTIDADES DA CAZÉTV...") recebe a fonte de título expandida (classe `font-display-wide`) e sobe um pouco de tamanho (ex.: `text-base md:text-lg lg:text-xl`).
   - O segundo parágrafo continua em Monoglyphic (texto corrido), tamanho atual.
   - Mantém alinhado à esquerda, cor preta (superfície branca).

3. **Remover a linha de créditos e a linha preta**
   - Excluir o bloco `© CazéTV 2026` / `Todos os direitos reservados` (todo o texto da linha).
   - Excluir o `<div class="h-0.5 bg-black" />` (a linha preta horizontal).

4. **Logo alinhado à margem inferior**
   - O logo fica na base absoluta do rodapé, com espaçamento igual ao padding lateral/padrao usado pelos outros elementos (mesma margem inferior dos demais), sem conteúdo sobrando embaixo depois da remoção da linha de créditos.

## Verificação
- Playwright na home (fim de página) e /brandguide: bloco branco mais curto, primeiro parágrafo em Druk Wide, sem linha de créditos, sem linha preta, logo colado na margem inferior com a mesma margem dos demais elementos.
