## Visão geral

Adicionar uma página de entrada antes do brandguide e uma nova seção "Identidades" inspirada no layout do Stripe Press.

## Mudanças de rota

```text
/                    → NOVA página de entrada (2 botões: BRANDGUIDE / IDENTIDADES)
/brandguide          → conteúdo atual de /  (home do brandguide)
/identidades         → NOVA galeria estilo Stripe Press
/identidades/$slug   → NOVA página individual de cada identidade (placeholder)
```

Todas as rotas internas do brandguide (`/logo`, `/cores`, `/fontes`, `/assets`, `/gradiente`) continuam intactas. Apenas o link "voltar para home" e os botões da home do brandguide passam a apontar para `/brandguide`.

## 1. Nova `/` — Página de entrada

- Fundo preto, vídeo `hero-bg.mp4` discreto ao fundo (mesma vibe atual).
- Logo CazéTV centralizada no topo.
- Dois botões grandes lado a lado no centro vertical da tela: **BRANDGUIDE** e **IDENTIDADES**, usando o mesmo estilo `gradient-hover` (borda + texto gradiente CazéTV no hover) já existente.
- Rodapé "Todos os direitos reservados · CazéTV 2026".

## 2. `/brandguide` — home atual movida

- Mover o conteúdo de `src/routes/index.tsx` para `src/routes/brandguide.tsx`.
- Sem mudanças visuais. Apenas o título "BEM-VINDO AO BRANDGUIDE CAZÉTV" e os botões de seção permanecem.

## 3. `/identidades` — galeria estilo Stripe Press

Layout fiel ao Stripe Press:

- **Topo esquerdo**: logo CazéTV branca + sub-label (ex: "Identidades").
- **Coluna esquerda**: menu vertical de "tracinhos" (linhas horizontais finas), um por identidade. Hover destaca o item; clique navega para `/identidades/$slug`. Cada tracinho mostra o nome da identidade ao passar o cursor (tooltip ou expansão lateral).
- **Centro**: galeria de retângulos placeholder 16:9 distribuídos de forma orgânica (não-grid rígido, posições levemente aleatórias mas equilibradas).
- **Interação drag**: cada card é arrastável livremente com o mouse (pressionar + arrastar muda sua posição na tela). Sem persistência — reset ao recarregar.
- **Barra flutuante de pesquisa**: fixada no rodapé central, estilo "command bar" com ícone de busca e input. Filtra a galeria por nome da identidade enquanto o usuário digita.

Inicialmente, criar ~8–12 identidades placeholder (`{ slug, name }`), todas com o mesmo retângulo cinza/gradiente como arte. O usuário substituirá as artes depois.

## 4. `/identidades/$slug` — página individual (placeholder)

Rota dinâmica simples: header com logo + nome da identidade + botão voltar. Conteúdo placeholder ("Em breve") para ser preenchido futuramente.

## Detalhes técnicos

- **Drag livre**: usar handlers nativos `onPointerDown/Move/Up` em cada card, mantendo `{x, y}` em state local por card. Sem libs externas.
- **Posicionamento inicial**: gerar posições determinísticas a partir do índice (seed simples) para parecer orgânico mas estável entre renders. Container `relative`, cards `absolute`.
- **Menu lateral de tracinhos**: lista vertical de `<button>` com largura variável (ex: 24–48px) baseada no índice, altura 2px, espaçamento ~12px. Hover expande largura e mostra o label à direita.
- **Busca flutuante**: `position: fixed`, bottom 32px, centralizada, `backdrop-blur`, borda sutil. Input controlado que filtra os cards visíveis por nome.
- **Arquivos novos**:
  - `src/routes/brandguide.tsx` (mover conteúdo atual de index)
  - `src/routes/identidades.tsx` (layout + galeria + busca)
  - `src/routes/identidades.$slug.tsx` (página individual)
  - `src/components/identidades/IdentityCard.tsx` (card draggable)
  - `src/components/identidades/IdentitiesSidebar.tsx` (menu de tracinhos)
  - `src/components/identidades/SearchBar.tsx` (barra flutuante)
  - `src/data/identities.ts` (lista placeholder de identidades)
- **Arquivos editados**:
  - `src/routes/index.tsx` (substituído pela nova página de entrada)
  - Botão "voltar" / links internos no `BrandLayout` (se houver) apontando para `/brandguide` em vez de `/`.

## Fora de escopo

- Persistência das posições dos cards arrastados.
- Artes reais das identidades (placeholders por enquanto).
- Conteúdo real das páginas `/identidades/$slug`.
