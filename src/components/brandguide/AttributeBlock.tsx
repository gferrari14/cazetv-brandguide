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
}

export interface AttributeItem {
  title: string;
  color: string;
  lines: string[];
  subsections?: AttributeSubsection[];
  media?: string;
}

function Placeholder({ label = "PLACEHOLDER" }: { label?: string }) {
  return (
    <div className="flex aspect-[16/10] w-full items-center justify-center bg-[#D9D9D9]">
      <span className="text-base font-extrabold uppercase tracking-tight text-black md:text-2xl">
        {label}
      </span>
    </div>
  );
}

export function AttributeBlock({ attribute }: { attribute: AttributeItem }) {
  const { title, color, lines, subsections, media } = attribute;

  return (
    <section className="border-t pt-10 md:pt-14" style={{ borderColor: color }}>
      <div className="grid items-start gap-8 md:grid-cols-[1.15fr_1fr]">
        <div>
          <h2
            className="text-5xl font-extrabold uppercase leading-[0.95] md:text-7xl"
            style={{ color }}
          >
            {title}
          </h2>
          <div className="mt-4 space-y-1">
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
        </div>

        {/* Placeholder para GIF ou foto */}
        <div className="w-full">
          {media ? (
            <img src={media} alt={title} className="w-full object-cover" />
          ) : (
            <Placeholder />
          )}
        </div>
      </div>

      {subsections?.map((sub, si) => (
        <div key={sub.heading ?? `sub-${si}`} className="mt-10 md:mt-14">
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
        </div>
      ))}

      <div className="h-14 md:h-24" />
    </section>
  );
}
