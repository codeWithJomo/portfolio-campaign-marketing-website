-- Marketing CRM schema and policies. Apply after schema.sql.
-- Create an administrator in Supabase Auth and set app_metadata.role = admin.
create extension if not exists pgcrypto;

create table if not exists public.marketing_campaigns (
  id uuid primary key default gen_random_uuid(), name text not null, description text, objective text,
  audience text, channel text, start_date date, end_date date,
  status text not null default 'Draft' check (status in ('Draft','Active','Paused','Completed','Archived')),
  notes text, created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create table if not exists public.marketing_leads (
  id uuid primary key default gen_random_uuid(), name text not null, profile_url text, phone text, email text,
  source_channel text, source_url text,
  status text not null default 'Contacted' check (status in ('Contacted','Conversing','Interested','Converted','Follow-up','Lost','Unresponsive')),
  first_contacted_at timestamptz, follow_up_at timestamptz, notes text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create unique index if not exists marketing_leads_profile_url_unique on public.marketing_leads ((lower(regexp_replace(regexp_replace(trim(profile_url), '/+$', ''), '^https?://(www\\.)?', '')))) where nullif(trim(profile_url), '') is not null;
create unique index if not exists marketing_leads_email_unique on public.marketing_leads ((lower(trim(email)))) where nullif(trim(email), '') is not null;
create unique index if not exists marketing_leads_phone_unique on public.marketing_leads ((regexp_replace(coalesce(phone,''), '\\D', '', 'g'))) where nullif(regexp_replace(coalesce(phone,''), '\\D', '', 'g'), '') is not null;

create table if not exists public.marketing_lead_campaigns (
  lead_id uuid not null references public.marketing_leads(id) on delete cascade,
  campaign_id uuid not null references public.marketing_campaigns(id) on delete cascade,
  created_at timestamptz not null default now(), primary key (lead_id, campaign_id)
);
create table if not exists public.marketing_outreach (
  id uuid primary key default gen_random_uuid(), lead_id uuid not null references public.marketing_leads(id) on delete cascade,
  campaign_id uuid references public.marketing_campaigns(id) on delete set null, channel text not null,
  activity_type text not null check (activity_type in ('Initial outreach','Follow-up','Reply received','Sample shared','Enquiry received','Offer discussed','Payment received','Other interaction')),
  occurred_at timestamptz not null default now(),
  outcome text not null check (outcome in ('No response','Message delivered','Replied','Interested','Not interested','Follow-up required','Converted')),
  notes text, follow_up_at timestamptz, revenue numeric(12,2) check (revenue is null or revenue >= 0), currency text,
  created_at timestamptz not null default now()
);
create index if not exists marketing_outreach_date_idx on public.marketing_outreach(occurred_at);
create index if not exists marketing_outreach_lead_idx on public.marketing_outreach(lead_id, occurred_at desc);
create index if not exists marketing_outreach_campaign_idx on public.marketing_outreach(campaign_id, occurred_at desc);
create table if not exists public.marketing_status_history (
  id uuid primary key default gen_random_uuid(), lead_id uuid not null references public.marketing_leads(id) on delete cascade,
  previous_status text, new_status text not null, context text, changed_at timestamptz not null default now()
);

create or replace function public.marketing_touch_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end $$;
drop trigger if exists marketing_campaign_touch on public.marketing_campaigns;
create trigger marketing_campaign_touch before update on public.marketing_campaigns for each row execute function public.marketing_touch_updated_at();
drop trigger if exists marketing_lead_touch on public.marketing_leads;
create trigger marketing_lead_touch before update on public.marketing_leads for each row execute function public.marketing_touch_updated_at();

create or replace function public.is_marketing_admin() returns boolean language sql stable security definer set search_path = '' as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false)
$$;
-- Admins can read website purchase requests in the CRM. Public visitors retain insert-only access from schema.sql.
alter table public.portfolio_submissions enable row level security;
drop policy if exists portfolio_submissions_admin_read on public.portfolio_submissions;
create policy portfolio_submissions_admin_read on public.portfolio_submissions for select to authenticated using (public.is_marketing_admin());
grant select on public.portfolio_submissions to authenticated;
alter table public.portfolio_submissions add column if not exists is_read boolean not null default false;
drop policy if exists portfolio_submissions_admin_update on public.portfolio_submissions;
create policy portfolio_submissions_admin_update on public.portfolio_submissions for update to authenticated using (public.is_marketing_admin()) with check (public.is_marketing_admin());
grant update (is_read) on public.portfolio_submissions to authenticated;

-- Only marketing admins can read first-party website performance events.
alter table public.performance_events enable row level security;
drop policy if exists performance_events_admin_read on public.performance_events;
create policy performance_events_admin_read on public.performance_events for select to authenticated using (public.is_marketing_admin());
grant select on public.performance_events to authenticated;

alter table public.marketing_campaigns enable row level security;
alter table public.marketing_leads enable row level security;
alter table public.marketing_lead_campaigns enable row level security;
alter table public.marketing_outreach enable row level security;
alter table public.marketing_status_history enable row level security;

drop policy if exists marketing_admin_all_campaigns on public.marketing_campaigns;
create policy marketing_admin_all_campaigns on public.marketing_campaigns for all to authenticated using (public.is_marketing_admin()) with check (public.is_marketing_admin());
drop policy if exists marketing_admin_all_leads on public.marketing_leads;
create policy marketing_admin_all_leads on public.marketing_leads for all to authenticated using (public.is_marketing_admin()) with check (public.is_marketing_admin());
drop policy if exists marketing_admin_all_lead_campaigns on public.marketing_lead_campaigns;
create policy marketing_admin_all_lead_campaigns on public.marketing_lead_campaigns for all to authenticated using (public.is_marketing_admin()) with check (public.is_marketing_admin());
drop policy if exists marketing_admin_all_outreach on public.marketing_outreach;
create policy marketing_admin_all_outreach on public.marketing_outreach for all to authenticated using (public.is_marketing_admin()) with check (public.is_marketing_admin());
drop policy if exists marketing_admin_all_status_history on public.marketing_status_history;
create policy marketing_admin_all_status_history on public.marketing_status_history for all to authenticated using (public.is_marketing_admin()) with check (public.is_marketing_admin());
grant select, insert, update, delete on public.marketing_campaigns, public.marketing_leads, public.marketing_lead_campaigns, public.marketing_outreach, public.marketing_status_history to authenticated;

create or replace view public.marketing_performance_event_counts with (security_barrier = true) as
  select event_name, event_label, date_trunc('day', occurred_at) as event_day, count(*) as event_count, count(distinct visitor_id) as unique_visitors
  from public.performance_events group by event_name, event_label, date_trunc('day', occurred_at);
grant select on public.marketing_performance_event_counts to authenticated;
revoke all on public.marketing_performance_event_counts from anon;
