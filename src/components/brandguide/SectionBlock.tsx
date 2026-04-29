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
          {eyebrow && <p className="mb-2 text-xs font-bold uppercase text-primary">{eyebrow}</p>}
          <h2 className="text-3xl font-bold uppercase text-foreground md:text-5xl">{title}</h2>
          {description && <p className="mt-3 max-w-4xl text-sm leading-relaxed text-muted-foreground">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
