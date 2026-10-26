-- CELIK Learning : table de progression des élèves
-- À coller dans Supabase > SQL Editor > New query, puis cliquer sur « Run ».

create table if not exists public.progress (
  user_id    uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  course     text        not null check (course in ('python', 'ml', 'sql', 'c')),
  state      jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, course)
);

-- Sécurité : chaque élève ne peut lire et modifier QUE sa propre progression.
alter table public.progress enable row level security;

drop policy if exists "lire sa progression" on public.progress;
create policy "lire sa progression" on public.progress
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "créer sa progression" on public.progress;
create policy "créer sa progression" on public.progress
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "modifier sa progression" on public.progress;
create policy "modifier sa progression" on public.progress
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Garde-fou : une progression ne peut pas dépasser 64 Ko (évite qu'un robot remplisse la base ;
-- 16 brouillons de code tiennent largement dedans).
alter table public.progress drop constraint if exists progress_state_size;
alter table public.progress add constraint progress_state_size check (pg_column_size(state) < 65536);

-- Pratique pour toi (admin) : nombre d'inscrits et de leçons terminées par cours.
-- À lancer dans le SQL Editor quand tu veux voir tes statistiques :
-- select course, count(*) as eleves,
--        avg((select count(*) from jsonb_each(state->'units') u where (u.value->>'done')::boolean)) as lecons_terminees_en_moyenne
-- from public.progress group by course;
