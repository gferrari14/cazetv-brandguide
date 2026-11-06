# Ordem aleatória das identidades

Toda vez que alguém entrar na página IDENTIDADES, os cards de PROGRAMAS e de COMPETIÇÕES aparecem embaralhados numa ordem nova.

## Comportamento
- Ordem sorteada a cada visita/recarregamento da página.
- Durante a visita a ordem fica fixa (não muda ao trocar entre PROGRAMAS e COMPETIÇÕES, buscar ou abrir/fechar uma apresentação).
- Identidades novas criadas na hora entram no fim da lista até a próxima visita.
- Busca continua funcionando sobre a ordem sorteada.

## Detalhes técnicos
- Em `src/routes/identidades.tsx`, após a hidratação (useEffect, para evitar diferença entre servidor e navegador), gerar uma ordem aleatória (Fisher–Yates) dos slugs do catálogo e guardar em estado.
- `categoryItems` passa a ordenar pelo índice sorteado; itens sem índice vão ao fim.
- Função de embaralhar em `src/lib/shuffle.ts` com um teste pequeno (mesmos itens, mesma quantidade).
