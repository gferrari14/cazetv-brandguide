import { AdaptiveTitle } from "./AdaptiveTitle";

interface SectionBlockProps {
  title: string;
  eyebrow?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}

export function SectionBlock({ title, eyebrow, description, children }: SectionBlockProps) {
  return (
    <section className="section-padding border-b border-border/70">
      <div className="brand-container">
        <div className="mb-10 border-b border-guide-line pb-5">
          {eyebrow && <p className="mb-2 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">{eyebrow}</p>}
          <h2 className="text-2xl font-bold uppercase leading-[0.95] text-foreground md:text-4xl"><AdaptiveTitle text={title} /></h2>
          {description && <p className="mt-3 max-w-[58ch] text-[12px] leading-[1.6] tracking-[0.02em] text-muted-foreground md:text-[13px]">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
