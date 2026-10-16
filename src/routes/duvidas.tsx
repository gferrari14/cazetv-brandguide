import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BrandLayout } from "@/components/brandguide/BrandLayout";
import { PageHeader } from "@/components/brandguide/PageHeader";
import { SectionBlock } from "@/components/brandguide/SectionBlock";

export const Route = createFileRoute("/duvidas")({
  head: () => ({
    meta: [
      { title: "Dúvidas — CazéTV Brandguide" },
      { name: "description", content: "Envie sua dúvida para a equipe da marca CazéTV." },
      { property: "og:title", content: "Dúvidas — CazéTV Brandguide" },
      { property: "og:description", content: "Envie sua dúvida para a equipe da marca CazéTV." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DuvidasPage,
});

interface FormState {
  name: string;
  email: string;
  title: string;
  question: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", title: "", question: "" };

const inputClass =
  "w-full border-2 border-border bg-card px-4 py-3 text-sm uppercase text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-foreground";

function DuvidasPage() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const validate = (): Partial<Record<keyof FormState, string>> => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "PREENCHA SEU NOME.";
    if (!form.email.trim()) next.email = "PREENCHA SEU EMAIL.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "EMAIL INVÁLIDO.";
    if (!form.title.trim()) next.title = "PREENCHA O TÍTULO DA DÚVIDA.";
    if (!form.question.trim()) next.question = "ESCREVA SUA DÚVIDA.";
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setSent(false);
      return;
    }
    // Por enquanto o envio é apenas visual — nenhum dado é armazenado.
    setSent(true);
    setForm(EMPTY_FORM);
  };

  const handleClear = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setSent(false);
  };

  return (
    <BrandLayout>
      <PageHeader
        title="DÚVIDAS"
        description="TEM ALGUMA PERGUNTA SOBRE A MARCA CAZÉTV, AS IDENTIDADES OU O USO DOS MATERIAIS? PREENCHA O FORMULÁRIO ABAIXO E ENVIEMOS A SUA DÚVIDA PARA A EQUIPE."
      />

      <SectionBlock
        title="ENVIE SUA DÚVIDA"
        eyebrow="FORMULÁRIO"
        description="TODOS OS CAMPOS SÃO OBRIGATÓRIOS. QUANTO MAIS CONTEXTO VOCÊ DER, MAIS RÁPIDO CONSEGUIMOS AJUDAR."
      >
        <form onSubmit={handleSubmit} noValidate className="max-w-3xl space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="NOME" error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                maxLength={120}
                placeholder="SEU NOME"
                className={inputClass}
                aria-invalid={Boolean(errors.name)}
              />
            </Field>
            <Field label="EMAIL" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                maxLength={255}
                placeholder="SEU EMAIL"
                className={inputClass}
                aria-invalid={Boolean(errors.email)}
              />
            </Field>
          </div>

          <Field label="TÍTULO" error={errors.title}>
            <input
              type="text"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              maxLength={140}
              placeholder="ASSUNTO DA DÚVIDA"
              className={inputClass}
              aria-invalid={Boolean(errors.title)}
            />
          </Field>

          <Field label="DÚVIDA" error={errors.question}>
            <textarea
              value={form.question}
              onChange={(e) => update("question", e.target.value)}
              maxLength={2000}
              rows={8}
              placeholder="ESCREVA SUA DÚVIDA COM DETALHES"
              className={`${inputClass} resize-y`}
              aria-invalid={Boolean(errors.question)}
            />
          </Field>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center border-2 border-white bg-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-transparent hover:text-white"
            >
              ENVIAR
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center border-2 border-white/80 px-8 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
            >
              LIMPAR
            </button>
          </div>

          {sent && (
            <p className="border-2 border-foreground bg-card px-4 py-3 text-sm font-bold uppercase text-foreground">
              DÚVIDA ENVIADA. OBRIGADO POR FALAR COM A GENTE!
            </p>
          )}
        </form>
      </SectionBlock>
    </BrandLayout>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-foreground">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-2 block text-xs font-bold uppercase text-muted-foreground">{error}</span>
      )}
    </label>
  );
}
