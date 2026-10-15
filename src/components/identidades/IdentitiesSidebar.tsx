import { Link } from "@tanstack/react-router";
import type { Identity } from "@/data/identities";

interface Props {
  items: Identity[];
  highlightSlug?: string;
}

export function IdentitiesSidebar({ items, highlightSlug }: Props) {
  return (
    <nav
      aria-label="Identidades"
      className="group/nav fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <ul className="flex flex-col">
        {items.map((item) => {
          const isActive = item.slug === highlightSlug;
          return (
            <li key={item.slug} className="group/item relative flex items-center py-1.5">
              <Link
                to="/identidades/$slug"
                params={{ slug: item.slug }}
                aria-label={item.name}
                className="flex items-center"
              >
                {/* Tick mark — expande quando o mouse entra na nav, e ainda mais no item hover */}
                <span
                  className={[
                    "block h-0.5 transition-all duration-500 ease-out",
                    "w-6 group-hover/nav:w-10 group-hover/item:w-20",
                    isActive
                      ? "bg-white"
                      : "bg-white/40 group-hover/nav:bg-white/70 group-hover/item:bg-white",
                  ].join(" ")}
                />
                {/* Label — surge ao hover da nav, com destaque extra no item */}
                <span
                  className={[
                    "ml-4 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ease-out",
                    "-translate-x-2 opacity-0 group-hover/nav:translate-x-0 group-hover/nav:opacity-60",
                    "group-hover/item:opacity-100 group-hover/item:text-white group-hover/item:scale-110 origin-left",
                    "text-muted-foreground",
                  ].join(" ")}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
