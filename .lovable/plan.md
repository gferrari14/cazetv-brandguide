# Ajustes visuais da página Atributos

- Trocar para **DRUK WIDE** os subtítulos internos, como “III. PROFUNDIDADE NO CONTEÚDO”, e os títulos das legendas “ERA DA INFORMAÇÃO” e “ERA DA CONEXÃO”. Manter os títulos principais dos atributos e os textos corridos nas fontes atuais.
- Substituir as cinco linhas de cor única pelo **gradiente oficial da CazéTV**, da esquerda para a direita: rosa → amarelo → azul → verde. Preservar a espessura e a posição das linhas.
- Aplicar uma **moldura branca de 2px** às fotos e aos GIFs do conteúdo de atributos, incluindo a imagem lateral de Paixão. Preservar as proporções, os recortes e as animações atuais; não alterar logos, fundo ou rodapé.
- Conferir a página em tela larga e estreita para garantir que os subtítulos quebrem naturalmente, sem cortes ou sobreposição, e que todas as molduras estejam visíveis.

## Detalhes técnicos

- Ajustar `AttributeBlock` e os dados de `/atributos`, removendo a associação de cor única por atributo.
- Usar `font-display-wide` explicitamente nos subtítulos, sem retorno automático à fonte condensada nesses elementos.
- Reutilizar `--brand-gradient` e o token branco da interface. Na mídia ampliada de Paixão, aplicar a borda ao contêiner externo para que a ampliação não corte a moldura.
- Limitar as alterações à página de atributos e aos estilos necessários para ela.
