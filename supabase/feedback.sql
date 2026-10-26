-- CELIK Learning : avis des élèves (sur le site, et sur chaque leçon / module)
-- À coller dans Supabase > SQL Editor > New query, puis cliquer sur « Run ».

create table if not exists public.feedback (
  id         bigint generated always as identity primary key,
  user_id    uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  kind       text        not null check (kind in ('site', 'unit')),          -- avis sur le site, ou sur une leçon / un module
  course     text        not null default '' check (course in ('', 'python', 'ml', 'sql', 'c')),
  unit_id    text        not null default '' check (char_length(unit_id) <= 8), -- p01…p16, s01…s16, c01…c16, m1…m9, a1…a7
  rating     smallint    check (rating between 1 and 5),
  comment    text        not null default '' check (char_length(comment) <= 500),
  dismissed  boolean     not null default false,                              -- « Non merci » / « Passer »
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, kind, course, unit_id),                                    -- un seul avis par élève et par sujet
  check (dismissed or rating is not null)
);

-- Sécurité : chaque élève ne peut écrire et relire QUE ses propres avis. Personne ne peut les supprimer depuis le site.
alter table public.feedback enable row level security;

drop policy if exists "lire ses avis" on public.feedback;
create policy "lire ses avis" on public.feedback
  for select to authenticated using (auth.uid() = user_id);

drop policy if exists "donner son avis" on public.feedback;
create policy "donner son avis" on public.feedback
  for insert to authenticated with check (auth.uid() = user_id);

drop policy if exists "modifier son avis" on public.feedback;
create policy "modifier son avis" on public.feedback
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Pour toi (admin) — à lancer dans le SQL Editor quand tu veux lire les avis.
--
-- Tous les avis avec l'email de l'élève, du plus récent au plus ancien :
-- select f.updated_at, u.email, f.kind, f.course, f.unit_id, f.rating, f.comment
-- from public.feedback f join auth.users u on u.id = f.user_id
-- where not f.dismissed order by f.updated_at desc;
--
-- Note moyenne par leçon / module (les plus faibles d'abord) :
-- select course, unit_id, round(avg(rating), 2) as note, count(*) as avis
-- from public.feedback where kind = 'unit' and not dismissed
-- group by course, unit_id order by note asc;
--
-- Note moyenne du site :
-- select round(avg(rating), 2) as note, count(*) as avis from public.feedback where kind = 'site' and not dismissed;
