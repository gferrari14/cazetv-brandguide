export interface AttributeListItem {
  text: string;
  /** Sub-itens numerados com letras (a., b., c.) */
  sub?: string[];
}

export interface AttributeCaption {
  heading?: string;
  lines: string[];
}

export interface AttributeSubsection {
  heading?: string;
  /** Linhas sem numeração exibidas logo abaixo do heading */
  intro?: string[];
  items?: AttributeListItem[];
  /** Quantidade de placeholders exibidos lado a lado nesta subseção */
  placeholders?: number;
  /** URLs de mídia — substituem os placeholders quando informadas */
  media?: string[];
  /** Textos exibidos abaixo de cada placeholder/media (mesma ordem) */
  captions?: AttributeCaption[];
  /** Grade numerada com imagem/placeholder e legenda abaixo */
  imageGrid?: AttributeImageGridItem[];
}

export interface AttributeGridItem {
  number: string;
  text: string;
}

export interface AttributeImageGridItem {
  number: string;
  text: string;
  media?: string;
}

export interface AttributeItem {
  title: string;
  lines: string[];
  /** Grade numerada (01, 02, ...) exibida em 3 colunas */
  grid?: AttributeGridItem[];
  subsections?: AttributeSubsection[];
  media?: string;
  /** Esconde o placeholder lateral (GIF/foto) quando não houver mídia */
  hideMediaPlaceholder?: boolean;
  /** Ajusta a altura do placeholder lateral à altura do texto */
  mediaFit?: "text";
}

function Placeholder({
  label = "PLACEHOLDER",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex aspect-[16/9] max-h-56 w-full items-center justify-center bg-[#D9D9D9] ${className}`}
    >
      <span className="text-center text-sm font-extrabold uppercase tracking-tight text-black md:text-lg">
        {label}
      </span>
    </div>
  );
}

export function AttributeBlock({ attribute }: { attribute: AttributeItem }) {
  const {
    title,
    lines,
    grid,
    subsections,
    media,
    hideMediaPlaceholder,
    mediaFit,
  } = attribute;

  const fitText = mediaFit === "text";

  const rightColumnVisible = !!(media || !hideMediaPlaceholder);

  return (
    <section className="attribute-section pt-6 md:pt-8">
      <div
        className={`grid gap-6 md:gap-10 ${
          rightColumnVisible ? "md:grid-cols-[1.5fr_1fr]" : "md:grid-cols-1"
        } ${fitText ? "items-stretch" : "items-start"}`}
      >
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] md:gap-12">
          <h2
            className="text-3xl font-extrabold uppercase leading-[0.9] text-foreground md:sticky md:top-24 md:self-start md:text-5xl"
          >
            {title}
          </h2>
          <div className="min-w-0">
          <div className="space-y-1">
            {lines.map((line) => (
              <p
                key={line}
                className="max-w-[58ch] text-[12px] uppercase leading-[1.6] tracking-[0.02em] text-white/90 md:text-[13px]"
              >
                {line}
              </p>
            ))}
          </div>

          {grid && grid.length > 0 && (
            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3 md:gap-x-8">
              {grid.map((g) => (
                <div key={g.number} className="border-t border-white/15 pt-3">
                  <p
                    className="text-[11px] font-medium leading-none tracking-[0.08em] text-muted-foreground md:text-xs"
                  >
                    {g.number}
                  </p>
                  <p
                    className="mt-2 text-sm uppercase leading-relaxed text-white md:text-base"
                  >
                    {g.text}
                  </p>
                </div>
              ))}
            </div>
          )}



          {subsections?.map((sub, si) => (
            <div key={sub.heading ?? `sub-${si}`} className="mt-6 first:mt-0 md:mt-10">
              {sub.heading && (
                <h3
                  className="font-display-wide text-sm font-bold uppercase leading-tight text-foreground md:text-base"
                >
                  {sub.heading}
                </h3>
              )}

              {sub.intro &&
                sub.intro.length > 0 &&
                !sub.placeholders &&
                !sub.imageGrid &&
                sub.intro.map((line) => (
                  <p
                    key={line}
                    className="mt-2 text-sm uppercase leading-relaxed text-white md:text-base"
                  >
                    {line}
                  </p>
                ))}

              {sub.items && sub.items.length > 0 && (
                <ol className="mt-4 space-y-3">
                  {sub.items.map((item, i) => (
                    <li
                      key={item.text}
                      className="list-none max-w-[58ch] border-t border-white/15 pt-3 text-[12px] uppercase leading-[1.6] tracking-[0.02em] text-white/90 md:text-[13px]"
                    >
                      <span className="mr-3 text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                      {item.text}
                      {item.sub && (
                        <ol className="mt-2 space-y-2 pl-6">
                          {item.sub.map((s, j) => (
                            <li key={s} className="list-none">
                              <span className="mr-2">
                                {String.fromCharCode(97 + j)}.
                              </span>
                              {s}
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                </ol>
              )}

              {(sub.placeholders ?? 0) > 0 && (
                <div
                  className="mt-6 grid gap-6"
                  style={{
                    gridTemplateColumns: `repeat(${sub.placeholders}, minmax(0, 1fr))`,
                  }}
                >
                  {Array.from({ length: sub.placeholders ?? 0 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-4">
                      {sub.media?.[i] ? (
                        <img
                          src={sub.media[i]}
                          alt={`${title} ${i + 1}`}
                          className="aspect-[4/3] w-full border-2 border-foreground object-cover"
                        />
                      ) : (
                        <div className="flex aspect-[4/3] w-full items-center justify-center bg-[#D9D9D9]">
                          <span className="text-center text-sm font-extrabold uppercase tracking-tight text-black md:text-lg">
                            PLACEHOLDER
                          </span>
                        </div>
                      )}

                      {sub.captions?.[i] && sub.captions[i].lines.length > 0 && (
                        <div className="space-y-2">
                          {sub.captions[i].heading && (
                            <p
                              className="font-display-wide text-xs font-bold uppercase leading-tight text-foreground md:text-sm"
                            >
                              {sub.captions[i].heading}
                            </p>
                          )}
                          {sub.captions[i].lines.map((line) => (
                            <p
                              key={line}
                              className="max-w-[58ch] text-[12px] uppercase leading-[1.6] tracking-[0.02em] text-white/90 md:text-[13px]"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}


              {sub.imageGrid && sub.imageGrid.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
                  {sub.imageGrid.map((item) => (
                    <div key={item.number}>
                      <p
                        className="text-[11px] font-medium leading-none tracking-[0.08em] text-muted-foreground md:text-xs"
                      >
                        {item.number}
                      </p>
                      {item.media ? (
                        <img
                          src={item.media}
                          alt={item.text}
                          className="mt-3 aspect-[16/9] w-full border-2 border-foreground object-cover"
                        />
                      ) : (
                        <Placeholder className="mt-3 aspect-[16/9]" />
                      )}
                      <p
                        className="mt-3 text-[12px] uppercase leading-[1.6] tracking-[0.02em] text-white/90 md:text-[13px]"
                      >
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          </div>
        </div>

        {/* Placeholder para GIF ou foto */}
        {(media || !hideMediaPlaceholder) && (
          <div
            className={`w-full ${
              fitText ? "h-full" : "md:sticky md:top-24"
            }`}
          >
            {media ? (
              <div className="h-full w-full overflow-hidden border-2 border-foreground">
                <img
                  src={media}
                  alt={title}
                  className="h-full w-full scale-[1.6] object-cover object-center"
                />
              </div>
            ) : (
              <Placeholder
                className={
                  fitText ? "aspect-auto max-h-none h-full" : ""
                }
              />
            )}
          </div>
        )}
      </div>

      <div className="h-12 md:h-20" />
    </section>
  );
}
