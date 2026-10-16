interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  /** Conteúdo alinhado à direita do título — ex.: botão de download da página */
  action?: React.ReactNode;
}

export function PageHeader({ title, description, children, action }: PageHeaderProps) {
  return (
    <section className="section-padding border-b border-border bg-transparent">
      <div className="brand-container animate-soft-reveal">
        <p className="mb-4 text-[11px] uppercase tracking-[0.08em] text-muted-foreground">Brandguide CazéTV</p>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="max-w-5xl text-4xl font-bold uppercase leading-[0.9] text-foreground md:text-6xl">
            {title}
          </h1>
          {action && <div className="max-w-full md:max-w-sm md:self-end">{action}</div>}
        </div>
        {description && <p className="mt-6 max-w-[58ch] text-[12px] uppercase leading-[1.6] tracking-[0.02em] text-muted-foreground md:text-[13px]">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
