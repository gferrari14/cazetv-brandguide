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
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <ul className="flex flex-col gap-3">
        {items.map((item) => {
          const isActive = item.slug === highlightSlug;
          return (
            <li key={item.slug} className="group/item relative flex items-center">
              <Link
                to="/identidades/$slug"
                params={{ slug: item.slug }}
                aria-label={item.name}
                className="flex items-center"
              >
                <span
                  className={`block h-0.5 w-6 transition-all duration-300 group-hover/item:w-16 group-hover/item:bg-white ${
                    isActive ? "bg-white" : "bg-white/50"
                  }`}
                />
                <span className="ml-3 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-white opacity-0 transition-opacity duration-200 group-hover/item:opacity-100">
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
