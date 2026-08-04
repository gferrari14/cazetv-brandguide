export interface AttributeListItem {
  text: string;
  /** Sub-itens numerados com letras (a., b., c.) */
  sub?: string[];
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
  color: string;
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
    color,
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
    <section className="border-t pt-8 md:pt-10" style={{ borderColor: color }}>
      <div
        className={`grid gap-6 md:gap-10 ${
          rightColumnVisible ? "md:grid-cols-[1.5fr_1fr]" : "md:grid-cols-1"
        } ${fitText ? "items-stretch" : "items-start"}`}
      >
        <div>
          <h2
            className="text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl"
            style={{ color }}
          >
            {title}
          </h2>
          <div className="mt-3 space-y-1">
            {lines.map((line) => (
              <p
                key={line}
                className="text-sm uppercase leading-relaxed md:text-base"
                style={{ color }}
              >
                {line}
              </p>
            ))}
          </div>

          {grid && grid.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 md:mt-10 md:grid-cols-3 md:gap-x-10 md:gap-y-10">
              {grid.map((g) => (
                <div key={g.number}>
                  <p
                    className="text-2xl font-extrabold leading-none md:text-3xl"
                    style={{ color }}
                  >
                    {g.number}
                  </p>
                  <p
                    className="mt-2 text-sm uppercase leading-relaxed md:text-base"
                    style={{ color }}
                  >
                    {g.text}
                  </p>
                </div>
              ))}
            </div>
          )}



          {subsections?.map((sub, si) => (
            <div key={sub.heading ?? `sub-${si}`} className="mt-6 md:mt-8">
              {sub.heading && (
                <h3
                  className="text-base font-extrabold uppercase md:text-xl"
                  style={{ color }}
                >
                  {sub.heading}
                </h3>
              )}

              {sub.intro?.map((line) => (
                <p
                  key={line}
                  className="mt-2 text-sm uppercase leading-relaxed md:text-base"
                  style={{ color }}
                >
                  {line}
                </p>
              ))}

              {sub.items && sub.items.length > 0 && (
                <ol className="mt-5 space-y-3 pl-5">
                  {sub.items.map((item, i) => (
                    <li
                      key={item.text}
                      className="list-none text-sm uppercase leading-relaxed md:text-base"
                      style={{ color }}
                    >
                      <span className="mr-2">{i + 1}.</span>
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
                  {Array.from({ length: sub.placeholders ?? 0 }).map((_, i) =>
                    sub.media?.[i] ? (
                      <img
                        key={i}
                        src={sub.media[i]}
                        alt={`${title} ${i + 1}`}
                        className="w-full object-cover"
                      />
                    ) : (
                      <Placeholder key={i} />
                    ),
                  )}
                </div>
              )}

              {sub.imageGrid && sub.imageGrid.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
                  {sub.imageGrid.map((item) => (
                    <div key={item.number}>
                      <p
                        className="text-2xl font-extrabold leading-none md:text-3xl"
                        style={{ color }}
                      >
                        {item.number}
                      </p>
                      {item.media ? (
                        <img
                          src={item.media}
                          alt={item.text}
                          className="mt-3 w-full object-cover"
                        />
                      ) : (
                        <Placeholder className="mt-3 aspect-[16/9]" />
                      )}
                      <p
                        className="mt-3 text-sm uppercase leading-relaxed md:text-base"
                        style={{ color }}
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

        {/* Placeholder para GIF ou foto */}
        {(media || !hideMediaPlaceholder) && (
          <div
            className={`w-full ${
              fitText ? "h-full" : "md:sticky md:top-24"
            }`}
          >
            {media ? (
              <img
                src={media}
                alt={title}
                className="w-full object-cover"
              />
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

      <div className="h-10 md:h-16" />
    </section>
  );
}
