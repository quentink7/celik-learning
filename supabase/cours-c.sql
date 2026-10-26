-- CELIK Learning : autoriser le cours de langage C (octobre 2026)
-- À coller dans Supabase > SQL Editor > New query, puis cliquer sur « Run ». Une seule fois suffit.
-- Sans ce changement, la progression et les avis du cours C restent seulement dans le navigateur de l'élève.

alter table public.progress drop constraint if exists progress_course_check;
alter table public.progress add constraint progress_course_check check (course in ('python', 'ml', 'sql', 'c'));

alter table public.feedback drop constraint if exists feedback_course_check;
alter table public.feedback add constraint feedback_course_check check (course in ('', 'python', 'ml', 'sql', 'c'));

-- Vérification : les deux lignes « course » doivent contenir 'c'.
select conrelid::regclass as table_name, conname, pg_get_constraintdef(oid) as regle
from pg_constraint
where conrelid in ('public.progress'::regclass, 'public.feedback'::regclass)
  and contype = 'c' and pg_get_constraintdef(oid) like '%course%';
