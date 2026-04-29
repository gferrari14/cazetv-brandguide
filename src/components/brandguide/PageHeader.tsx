interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <section className="section-padding border-b border-border bg-background">
      <div className="brand-container animate-soft-reveal">
        <p className="mb-4 text-xs font-bold uppercase text-primary">Brandguide CazéTV</p>
        <h1 className="max-w-5xl text-5xl font-bold uppercase leading-none text-foreground md:text-7xl">
          {title}
        </h1>
        {description && <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
