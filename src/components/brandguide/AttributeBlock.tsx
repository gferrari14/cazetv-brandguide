export interface AttributeSubsection {
  heading?: string;
  items: string[];
  ordered?: boolean;
}

export interface AttributeItem {
  title: string;
  color: string;
  lines: string[];
  subsections?: AttributeSubsection[];
  media?: string;
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
            <div className="flex aspect-[16/10] w-full items-center justify-center bg-[#D9D9D9]">
              <span className="text-xl font-extrabold uppercase tracking-tight text-black md:text-3xl">
                PLACEHOLDER
              </span>
            </div>
          )}
        </div>
      </div>

      {subsections?.map((sub) => (
        <div key={sub.heading ?? sub.items[0]} className="mt-10 md:mt-14">
          {sub.heading && (
            <h3
              className="text-base font-extrabold uppercase md:text-xl"
              style={{ color }}
            >
              {sub.heading}
            </h3>
          )}
          <ol className="mt-5 space-y-1.5 pl-5">
            {sub.items.map((item, i) => (
              <li
                key={item}
                className="list-none text-sm uppercase leading-relaxed md:text-base"
                style={{ color }}
              >
                <span className="mr-2">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      ))}

      <div className="h-14 md:h-24" />
    </section>
  );
}
