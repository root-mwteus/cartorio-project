-- Mensagens do formulário de contato.
-- O site usa a chave anon apenas para INSERT, nunca para ler (leitura só com
-- service_role). Idempotente: pode ser rodado de novo no SQL Editor do Supabase.
--
-- "create table if not exists" não altera uma tabela já existente. Se ela já
-- existir, confira as colunas e os CHECKs abaixo manualmente.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  -- Limites iguais a MAX_LENGTH em src/lib/validate-contact-form.ts.
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254 and email like '%@%'),
  subject text not null check (char_length(subject) between 1 and 150),
  message text not null check (char_length(message) between 1 and 2000)
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

revoke all on table public.contact_submissions from public, anon, authenticated;

-- Só as colunas de conteúdo: id e created_at não podem ser definidos pelo cliente.
grant insert (name, email, subject, message) on table public.contact_submissions to anon;
grant select, insert, delete on table public.contact_submissions to service_role;

drop policy if exists "Formulário público pode inserir" on public.contact_submissions;
create policy "Formulário público pode inserir"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- Sem políticas de SELECT, UPDATE ou DELETE para anon e authenticated: tudo negado.
-- service_role ignora RLS e é a única forma de ler ou eliminar as mensagens.
