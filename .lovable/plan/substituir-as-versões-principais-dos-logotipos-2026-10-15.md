# Substituir as versões principais dos logotipos

## Contexto
- Uploads: `CAZÉTV_PRETO.svg` e `CAZÉTV_BRANCO.svg` — lockups principais (símbolo Cazé + "CAZÉTV" em preto/branco) em canvas 1920x1080.
- Na página `/logo`, a seção "Logotipos" (Versões oficiais) hoje usa `siteLogos` (mesmos arquivos dos logos de canto do site).

## Mudanças
1. **Novos ponteiros de asset (CDN)**
   - `lovable-assets create` para os dois SVGs: `src/assets/site/cazetv-logo-main-black.svg.asset.json` (de `CAZÉTV_PRETO.svg`) e `cazetv-logo-main-white.svg.asset.json` (de `CAZÉTV_BRANCO.svg`).

2. **`src/lib/site-media.ts`**
   - Importar os novos ponteiros e exportar `siteMainLogos = { black: ..., white: ... }`.
   - `siteLogos` (logos de canto do site, rodapé) permanece intacto — os SVGs novos são 1920x1080 e não servem para o canto pequeno.

3. **`src/routes/logo.tsx`**
   - `logoFullBlack` / `logoFullWhite` passam a usar `siteMainLogos` — atualiza os cards da seção "Logotipos", os downloads individuais e as entradas `LOGOTIPO/cazetv-logo-black.svg` / `LOGOTIPO/cazetv-logo-white.svg` do ZIP "download de todos".
   - Demais seções (símbolo, marca nominativa, marca nominativa símbolo) e o logo colorido não mudam.

## Verificação
- Playwright em `/logo`: cards "PRETO · FUNDO CLARO" e "BRANCO · FUNDO ESCURO" mostram os novos lockups (símbolo + CAZÉTV), download individual e ZIP funcionando, sem erros de console.
- Confirmar que os logos de canto (topo esquerdo) e rodapé seguem com as versões anteriores.
