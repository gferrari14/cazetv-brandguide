# Página DÚVIDAS

## O que construir
- Criar a rota `/duvidas` (src/routes/duvidas.tsx) dentro do BrandLayout, igual às outras páginas do Brandguide: fundo padrão do site, logo no canto superior esquerdo, barra de navegação inferior e o rodapé padrão (RevealFooter) embaixo, com o texto institucional já usado nas páginas do Brandguide.
- Na página, um formulário com os campos:
  - NOME (nome de quem tem a dúvida)
  - EMAIL
  - TÍTULO (assunto da dúvida)
  - DÚVIDA (campo de texto longo para escrever a pergunta)
- Dois botões no estilo dos botões do site (quadrados, borda branca, hover invertendo para branco com texto preto):
  - ENVIAR: valida os campos (nome, e-mail válido, título e dúvida preenchidos) e mostra uma mensagem de confirmação em tela ("DÚVIDA ENVIADA" com aviso para conferir se preencheu tudo quando faltar algo).
  - LIMPAR: apaga todos os campos.
- Como decidido, por enquanto o envio é apenas visual (não guarda nem envia nada para lugar nenhum). Depois dá para plugar o destino (e-mail ou banco) sem mudar o layout.

## Estilo
- Seguir a tipografia do site: títulos em Druk (font-display), subtítulo/eyebrow em Druk Wide e rótulos/campos/textos em Monoglyphic, tudo em caixa alta.
- Campos de entrada com a mesma linguagem visual dos cards do Brandguide: fundo translúcido escuro, borda branca, texto branco; espaçamentos e largura limitada (coluna única, generosa) para leitura confortável.
- Usar o PageHeader existente para o título DÚVIDAS e uma frase de apoio explicando o objetivo da página.

## Ligações
- O botão DÚVIDAS da home (src/routes/index.tsx) hoje aponta para "/": passar a apontar para /duvidas.
- DÚVIDAS não entra na barra de navegação fixa das páginas (mantida como está).

## Validação
- Conferir /duvidas em largura larga e estreita: fundo contínuo, rodapé revelando ao fim da página, formulário legível.
- Testar ENVIAR com campos vazios (mensagens de erro) e preenchidos (confirmação), e LIMPAR zerando tudo.
- Confirmar que o botão DÚVIDAS da home abre a nova página e que nenhuma outra página é afetada.
