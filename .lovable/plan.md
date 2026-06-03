## Objetivo

Dentro do modal de identidades (Programas e Competições), permitir:
1. Adicionar **caixas de texto** entre slides para explicar o conceito da identidade.
2. **Reordenar** slides + caixas de texto via drag-and-drop.
3. **Substituir / adicionar** slides (upload de imagem ou GIF).

Tudo persistido no banco (Lovable Cloud) e visível para todos os visitantes. Edição liberada para qualquer um por enquanto — depois colocamos login.

---

## Modelo de dados (Lovable Cloud)

Uma única tabela `identity_blocks` que descreve a sequência inteira de cada identidade (slide ou texto), na ordem.

```
identity_blocks
- id            uuid pk
- identity_slug text   (ex: "um-dia-com")
- position      int    (ordem; reordenado por drag-and-drop)
- type          text   ("slide" | "text")
- image_url     text   (quando type = "slide")
- text_content  text   (quando type = "text")
- preserve_ratio bool  (quando type = "slide", opcional)
- created_at    timestamptz
```

- **Storage bucket público** `identity-slides` para os uploads (PNG/JPG/GIF).
- RLS: leitura pública; insert/update/delete públicos por enquanto (TODO: travar quando login entrar).
- Seed inicial: migrar os slides atuais de UM DIA COM (slides 1–10 + ASSETS) para o banco, com os mesmos `position` que já existem hoje.

---

## UI dentro do `IdentityModal`

Modo **visualização** (padrão, como hoje):
- Renderiza blocks em ordem. `slide` → imagem 16:9 (ou natural). `text` → bloco de texto centralizado, tipografia editorial.

Modo **edição** (ativado por um botão "Editar" no topo do modal):
- Cada bloco ganha um handle de arrastar (DnD via `@dnd-kit/sortable`, já adequado e leve).
- Botões por bloco: **Mover ↑↓**, **Substituir imagem**, **Excluir**.
- Para `text`: editor inline (textarea) com auto-save no blur.
- Botões "+" entre blocos: **Adicionar slide** (abre file picker → upload pro bucket → cria block) e **Adicionar texto** (cria block vazio).
- Mudança de ordem chama um update batch dos `position` no banco.

Mudanças visuais ficam dentro do modal; nada na home.

---

## Detalhes técnicos

- **Server fns** em `src/lib/identity-blocks.functions.ts`:
  - `listBlocks({ slug })` — leitura pública (usa `supabaseAdmin` dentro do handler, filtrado por slug).
  - `createBlock`, `updateBlock`, `deleteBlock`, `reorderBlocks([{id, position}])`.
  - Sem `requireSupabaseAuth` por enquanto (fase 1). Quando login chegar, adicionamos o middleware.
- **Upload de imagem**: client faz upload direto pro bucket `identity-slides` usando o `supabase` client do browser; pega a `publicUrl` e chama `createBlock`.
- **React Query** para cache + invalidação após mutações.
- **DnD**: `@dnd-kit/core` + `@dnd-kit/sortable` (instalar via `bun add`).
- Manter o menu flutuante de download (LOGO/ASSETS/FONTES/KIT) intocado.

---

## Plano de implementação

1. Habilitar Lovable Cloud (se ainda não estiver).
2. Migration: criar tabela `identity_blocks` + RLS pública + bucket `identity-slides` público.
3. Seed: migration inserindo os 10 slides existentes de `um-dia-com` apontando para os assets atuais em `/src/assets/um-dia-com/...` (movidos pra `/public/identidades/um-dia-com/slides/` para serem servíveis por URL).
4. Server fns CRUD + reorder.
5. Refatorar `IdentityModal.tsx`: estado `mode: "view" | "edit"`, render baseado em `useQuery(listBlocks)`, componentes `SlideBlock` e `TextBlock`.
6. Integrar `@dnd-kit` para reordenar na edição.
7. Botão "Editar" no header do modal + botões "+ Slide / + Texto" entre blocks.
8. Upload de imagem com `supabase.storage.from("identity-slides").upload(...)`.
9. Testar fluxo completo no preview.

---

## Observações

- **Segurança**: por enquanto qualquer visitante pode editar — você pediu assim. Vou deixar o código pronto pra plugar `requireSupabaseAuth` num único lugar quando você quiser ativar login.
- **Outras identidades** (Brasileirão, Paulistão, etc.): a tabela já suporta — qualquer identidade que ainda não tem blocks cai num estado vazio com botão "+ Adicionar primeiro slide".
- O upload de slides é por imagem/GIF único. Suporte a PDF/vídeo fica pra depois, se precisar.
