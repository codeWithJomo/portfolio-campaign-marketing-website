import { FormEvent, useEffect, useMemo, useState } from "react";
import { supabase } from "../services/supabase";
import {
  Activity,
  BarChart3,
  BriefcaseBusiness,
  ChevronLeft,
  CirclePlus,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  ShoppingBag,
  Bell,
  Check,
  X,
} from "lucide-react";

type Campaign = {
  id: string;
  name: string;
  description: string | null;
  objective: string | null;
  audience: string | null;
  channel: string | null;
  status: string;
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
  created_at: string;
};
type Lead = {
  id: string;
  name: string;
  profile_url: string | null;
  phone: string | null;
  email: string | null;
  source_channel: string | null;
  source_url: string | null;
  status: string;
  first_contacted_at: string | null;
  follow_up_at: string | null;
  notes: string | null;
  created_at: string;
};
type Outreach = {
  id: string;
  lead_id: string;
  campaign_id: string | null;
  channel: string;
  activity_type: string;
  occurred_at: string;
  outcome: string;
  notes: string | null;
  follow_up_at: string | null;
};
type PurchaseRequest = {
  id: number;
  reference_id: string;
  submitted_at: string;
  full_name: string;
  email: string;
  career_field: string;
  preferred_design: string;
  color_option: string;
  custom_primary_color: string | null;
  custom_accent_color: string | null;
  contact_method: string;
  project_notes: string | null;
  cv_builder_waitlist: boolean;
  is_read: boolean;
};
type Section =
  | "Overview"
  | "Purchase Requests"
  | "Campaigns"
  | "Leads"
  | "Outreach Activity"
  | "Analytics"
  | "Settings";
const sections: { name: Section; icon: typeof LayoutDashboard }[] = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Purchase Requests", icon: ShoppingBag },
  { name: "Campaigns", icon: BriefcaseBusiness },
  { name: "Leads", icon: Users },
  { name: "Outreach Activity", icon: Activity },
  { name: "Analytics", icon: BarChart3 },
  { name: "Settings", icon: Settings },
];
const statuses = [
  "Contacted",
  "Conversing",
  "Interested",
  "Follow-up",
  "Converted",
  "Lost",
  "Unresponsive",
];
const emptyLead = {
  name: "",
  profile_url: "",
  phone: "",
  email: "",
  source_channel: "WhatsApp",
  source_url: "",
  status: "Contacted",
  notes: "",
  follow_up_at: "",
  campaign_id: "",
};
const emptyCampaign = {
  name: "",
  description: "",
  objective: "",
  audience: "",
  channel: "WhatsApp",
  status: "Draft",
  start_date: new Date().toISOString().slice(0, 10),
  end_date: "",
  notes: "",
};
const cardClass =
  "rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm";

export function AdminApp({ onExit }: { onExit: () => void }) {
  const [section, setSection] = useState<Section>("Overview");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activities, setActivities] = useState<Outreach[]>([]);
  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>([]);
  const [leadCampaignLinks, setLeadCampaignLinks] = useState<{ lead_id: string; campaign_id: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [campaignFilter, setCampaignFilter] = useState("All campaigns");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadDraft, setLeadDraft] = useState(emptyLead);
  const [editingLead, setEditingLead] = useState<string | null>(null);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [campaignDraft, setCampaignDraft] = useState(emptyCampaign);
  const [campaignDetail, setCampaignDetail] = useState<string | null>(null);
  const [leadDetail, setLeadDetail] = useState<string | null>(null);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [activityDraft, setActivityDraft] = useState({
    lead_id: "",
    campaign_id: "",
    channel: "WhatsApp",
    activity_type: "Initial outreach",
    outcome: "No response",
    occurred_at: new Date().toISOString().slice(0, 16),
    notes: "",
    follow_up_at: "",
  });
  const [analyticsPeriod, setAnalyticsPeriod] = useState("30");

  async function refresh() {
    if (!supabase) {
      setError(
        "Supabase is not configured. Add the VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY settings, then run the admin migration.",
      );
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    const [c, l, a, p, lc] = await Promise.all([
      supabase
        .from("marketing_campaigns")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("marketing_leads")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("marketing_outreach")
        .select("*")
        .order("occurred_at", { ascending: false }),
      supabase
        .from("portfolio_submissions")
        .select("*")
        .order("submitted_at", { ascending: false }),
      supabase.from("marketing_lead_campaigns").select("lead_id, campaign_id"),
    ]);
    const failure = c.error || l.error || a.error || p.error || lc.error;
    if (failure) setError(failure.message);
    setCampaigns((c.data ?? []) as Campaign[]);
    setLeads((l.data ?? []) as Lead[]);
    setActivities((a.data ?? []) as Outreach[]);
    setPurchaseRequests((p.data ?? []) as PurchaseRequest[]);
    setLeadCampaignLinks((lc.data ?? []) as { lead_id: string; campaign_id: string }[]);
    setLoading(false);
  }
  useEffect(() => {
    void refresh();
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);
  const filteredLeads = useMemo(
    () =>
      leads.filter((lead) => {
        const text =
          `${lead.name} ${lead.email ?? ""} ${lead.profile_url ?? ""} ${lead.phone ?? ""}`.toLowerCase();
        const campaignOk =
          campaignFilter === "All campaigns" ||
          activities.some(
            (a) => a.lead_id === lead.id && a.campaign_id === campaignFilter,
          ) ||
          leadCampaignLinks.some(
            (link) => link.lead_id === lead.id && link.campaign_id === campaignFilter,
          );
        return (
          (!query || text.includes(query.toLowerCase())) &&
          (statusFilter === "All statuses" || lead.status === statusFilter) &&
          campaignOk
        );
      }),
    [leads, query, statusFilter, campaignFilter, activities, leadCampaignLinks],
  );
  const due = leads.filter(
    (l) =>
      l.follow_up_at &&
      new Date(l.follow_up_at) <= new Date() &&
      !["Converted", "Lost"].includes(l.status),
  );
  const unreadPurchaseRequests = purchaseRequests.filter((request) => !request.is_read).length;
  async function markPurchaseRequestRead(request: PurchaseRequest) {
    if (!supabase || request.is_read) return;
    const { error: updateError } = await supabase
      .from("portfolio_submissions")
      .update({ is_read: true })
      .eq("id", request.id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setPurchaseRequests((requests) =>
      requests.map((item) => item.id === request.id ? { ...item, is_read: true } : item),
    );
    setToast("Purchase request marked as read.");
  }
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - Number(analyticsPeriod));
  const periodActivities = activities.filter(
    (a) => new Date(a.occurred_at) >= daysAgo,
  );
  const contactedIds = new Set(
    periodActivities
      .filter(
        (a) =>
          a.activity_type.toLowerCase().includes("outreach") ||
          a.activity_type.toLowerCase().includes("follow-up") ||
          a.activity_type.toLowerCase().includes("initial"),
      )
      .map((a) => a.lead_id),
  );
  const replies = periodActivities.filter((a) =>
    ["Replied", "Interested"].includes(a.outcome),
  ).length;
  const positive = periodActivities.filter(
    (a) => a.outcome === "Interested",
  ).length;
  const conversions = periodActivities.filter(
    (a) => a.outcome === "Converted" || a.activity_type === "Payment received",
  ).length;
  const selectedCampaign = campaigns.find((c) => c.id === campaignDetail);
  const selectedLead = leads.find((l) => l.id === leadDetail);
  const leadActivities = selectedLead
    ? activities.filter((a) => a.lead_id === selectedLead.id)
    : [];
  const campaignLeads = campaignDetail
    ? leads.filter((lead) =>
        leadCampaignLinks.some(
          (link) => link.lead_id === lead.id && link.campaign_id === campaignDetail,
        ),
      )
    : [];

  async function saveLead(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    const draft = leadDraft;
    const normalizedUrl = draft.profile_url.trim().replace(/\/$/, "");
    const duplicate = leads.find(
      (l) =>
        l.id !== editingLead &&
        ((normalizedUrl &&
          l.profile_url?.trim().replace(/\/$/, "").toLowerCase() ===
            normalizedUrl.toLowerCase()) ||
          (draft.email.trim() &&
            l.email?.toLowerCase() === draft.email.trim().toLowerCase()) ||
          (draft.phone.trim() &&
            l.phone?.replace(/\D/g, "") === draft.phone.replace(/\D/g, ""))),
    );
    if (
      duplicate &&
      !window.confirm(
        `Possible duplicate found: ${duplicate.name} (${duplicate.profile_url || duplicate.phone || duplicate.email}). Continue creating this record?`,
      )
    )
      return;
    const payload = {
      name: draft.name.trim(),
      profile_url: normalizedUrl || null,
      phone: draft.phone.trim() || null,
      email: draft.email.trim().toLowerCase() || null,
      source_channel: draft.source_channel || null,
      source_url: draft.source_url.trim() || null,
      status: draft.status,
      notes: draft.notes.trim() || null,
      follow_up_at: draft.follow_up_at
        ? new Date(draft.follow_up_at).toISOString()
        : null,
      first_contacted_at:
        draft.status === "Contacted" ? new Date().toISOString() : null,
    };
    const result = editingLead
      ? await supabase
          .from("marketing_leads")
          .update(payload)
          .eq("id", editingLead)
          .select()
          .single()
      : await supabase
          .from("marketing_leads")
          .insert(payload)
          .select()
          .single();
    if (result.error) {
      setError(result.error.message);
      return;
    }
    if (result.data) {
      const { error: deleteLinksError } = await supabase
        .from("marketing_lead_campaigns")
        .delete()
        .eq("lead_id", result.data.id);
      if (deleteLinksError) {
        setError(deleteLinksError.message);
        return;
      }
      if (draft.campaign_id) {
        const { error: linkError } = await supabase
          .from("marketing_lead_campaigns")
          .insert({ lead_id: result.data.id, campaign_id: draft.campaign_id });
        if (linkError) {
          setError(linkError.message);
          return;
        }
      }
    }
    if (
      editingLead &&
      result.data &&
      leads.find((l) => l.id === editingLead)?.status !== draft.status
    ) {
      await supabase.from("marketing_status_history").insert({
        lead_id: editingLead,
        previous_status: leads.find((l) => l.id === editingLead)?.status,
        new_status: draft.status,
        context: "Updated from lead editor",
      });
    }
    setShowLeadForm(false);
    setLeadDraft(emptyLead);
    setEditingLead(null);
    setToast(editingLead ? "Lead updated." : "Lead created.");
    await refresh();
  }
  async function changeStatus(lead: Lead, status: string) {
    if (!supabase || lead.status === status) return;
    const { error: updateError } = await supabase
      .from("marketing_leads")
      .update({ status })
      .eq("id", lead.id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    const { error: historyError } = await supabase
      .from("marketing_status_history")
      .insert({
        lead_id: lead.id,
        previous_status: lead.status,
        new_status: status,
        context: "Status changed in admin",
      });
    if (historyError) setError(historyError.message);
    else setToast("Lead status updated and recorded.");
    await refresh();
  }
  async function saveCampaign(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    const { error: saveError } = await supabase
      .from("marketing_campaigns")
      .insert({
        ...campaignDraft,
        name: campaignDraft.name.trim(),
        end_date: campaignDraft.end_date || null,
        description: campaignDraft.description || null,
        objective: campaignDraft.objective || null,
        audience: campaignDraft.audience || null,
        notes: campaignDraft.notes || null,
      });
    if (saveError) {
      setError(saveError.message);
      return;
    }
    setShowCampaignForm(false);
    setCampaignDraft(emptyCampaign);
    setToast("Campaign created.");
    await refresh();
  }
  async function updateCampaignStatus(campaign: Campaign, status: string) {
    if (!supabase) return;
    const { error: e } = await supabase
      .from("marketing_campaigns")
      .update({ status })
      .eq("id", campaign.id);
    if (e) setError(e.message);
    else {
      setToast(`Campaign ${status.toLowerCase()}.`);
      await refresh();
    }
  }
  async function saveActivity(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    const { error: e2 } = await supabase.from("marketing_outreach").insert({
      ...activityDraft,
      campaign_id: activityDraft.campaign_id || null,
      occurred_at: new Date(activityDraft.occurred_at).toISOString(),
      follow_up_at: activityDraft.follow_up_at
        ? new Date(activityDraft.follow_up_at).toISOString()
        : null,
    });
    if (e2) {
      setError(e2.message);
      return;
    }
    if (activityDraft.follow_up_at)
      await supabase
        .from("marketing_leads")
        .update({
          follow_up_at: new Date(activityDraft.follow_up_at).toISOString(),
          status:
            activityDraft.outcome === "Interested"
              ? "Interested"
              : activityDraft.outcome === "Follow-up required"
                ? "Follow-up"
                : undefined,
        })
        .eq("id", activityDraft.lead_id);
    if (activityDraft.outcome === "Interested")
      await changeStatus(
        leads.find((l) => l.id === activityDraft.lead_id)!,
        "Interested",
      );
    else if (activityDraft.outcome === "Converted")
      await changeStatus(
        leads.find((l) => l.id === activityDraft.lead_id)!,
        "Converted",
      );
    setShowActivityForm(false);
    setToast("Outreach activity saved.");
    await refresh();
  }
  async function logout() {
    await supabase?.auth.signOut();
    onExit();
  }
  function newLead() {
    setEditingLead(null);
    setLeadDraft(emptyLead);
    setShowLeadForm(true);
  }
  function editLead(lead: Lead) {
    setEditingLead(lead.id);
    setLeadDraft({
      name: lead.name,
      profile_url: lead.profile_url ?? "",
      phone: lead.phone ?? "",
      email: lead.email ?? "",
      source_channel: lead.source_channel ?? "",
      source_url: lead.source_url ?? "",
      status: lead.status,
      notes: lead.notes ?? "",
      follow_up_at: lead.follow_up_at?.slice(0, 16) ?? "",
      campaign_id: leadCampaignLinks.find((link) => link.lead_id === lead.id)?.campaign_id ?? "",
    });
    setShowLeadForm(true);
  }

  const nav = (
    <nav className="space-y-1">
      {sections.map(({ name, icon: Icon }) => (
        <button
          key={name}
          onClick={() => {
            setSection(name);
            setMobileNav(false);
            setLeadDetail(null);
            setCampaignDetail(null);
          }}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium ${section === name ? "bg-indigo-50 text-indigo-700" : "text-neutral-600 hover:bg-neutral-100"}`}
        >
          <Icon size={18} />
          {name}
          {name === "Leads" && due.length > 0 && (
            <span className="ml-auto rounded-full bg-rose-100 px-2 py-0.5 text-xs text-rose-700">
              {due.length}
            </span>
          )}
          {name === "Purchase Requests" && unreadPurchaseRequests > 0 && (
            <span className="ml-auto rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">{unreadPurchaseRequests}</span>
          )}
        </button>
      ))}
    </nav>
  );
  const input =
    "w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
  const modal = (
    title: string,
    close: () => void,
    content: React.ReactNode,
  ) => (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-neutral-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <section className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-7">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            className="rounded-lg p-2 hover:bg-neutral-100"
            onClick={close}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        {content}
      </section>
    </div>
  );
  const createLeadForm = (
    <form onSubmit={saveLead} className="grid gap-4 sm:grid-cols-2">
      <label className="text-xs font-semibold text-neutral-600">
        Name *
        <input
          required
          className={`${input} mt-1`}
          value={leadDraft.name}
          onChange={(e) => setLeadDraft({ ...leadDraft, name: e.target.value })}
        />
      </label>
      <label className="text-xs font-semibold text-neutral-600">
        Channel
        <select
          className={`${input} mt-1`}
          value={leadDraft.source_channel}
          onChange={(e) =>
            setLeadDraft({ ...leadDraft, source_channel: e.target.value })
          }
        >
          {[
            "WhatsApp",
            "Email",
            "LinkedIn",
            "Instagram",
            "X",
            "Website",
            "Other",
          ].map((c) => (
            <option>{c}</option>
          ))}
        </select>
      </label>
      <label className="text-xs font-semibold text-neutral-600">
        Profile URL
        <input
          className={`${input} mt-1`}
          type="url"
          value={leadDraft.profile_url}
          onChange={(e) =>
            setLeadDraft({ ...leadDraft, profile_url: e.target.value })
          }
          placeholder="https://…"
        />
      </label>
      <label className="text-xs font-semibold text-neutral-600">
        WhatsApp / phone
        <input
          className={`${input} mt-1`}
          value={leadDraft.phone}
          onChange={(e) =>
            setLeadDraft({ ...leadDraft, phone: e.target.value })
          }
        />
      </label>
      <label className="text-xs font-semibold text-neutral-600">
        Email
        <input
          type="email"
          className={`${input} mt-1`}
          value={leadDraft.email}
          onChange={(e) =>
            setLeadDraft({ ...leadDraft, email: e.target.value })
          }
        />
      </label>
      <label className="text-xs font-semibold text-neutral-600">
        Source URL or community
        <input
          className={`${input} mt-1`}
          value={leadDraft.source_url}
          onChange={(e) =>
            setLeadDraft({ ...leadDraft, source_url: e.target.value })
          }
        />
      </label>
      <label className="text-xs font-semibold text-neutral-600">
        Status
        <select
          className={`${input} mt-1`}
          value={leadDraft.status}
          onChange={(e) =>
            setLeadDraft({ ...leadDraft, status: e.target.value })
          }
        >
          {statuses.map((s) => (
            <option>{s}</option>
          ))}
        </select>
      </label>
      <label className="text-xs font-semibold text-neutral-600">
        Campaign
        <select
          className={`${input} mt-1`}
          value={leadDraft.campaign_id}
          onChange={(e) =>
            setLeadDraft({ ...leadDraft, campaign_id: e.target.value })
          }
        >
          <option value="">None</option>
          {campaigns.map((c) => (
            <option value={c.id}>{c.name}</option>
          ))}
        </select>
      </label>
      <label className="text-xs font-semibold text-neutral-600 sm:col-span-2">
        Follow-up date
        <input
          type="datetime-local"
          className={`${input} mt-1`}
          value={leadDraft.follow_up_at}
          onChange={(e) =>
            setLeadDraft({ ...leadDraft, follow_up_at: e.target.value })
          }
        />
      </label>
      <label className="text-xs font-semibold text-neutral-600 sm:col-span-2">
        Notes
        <textarea
          className={`${input} mt-1`}
          rows={3}
          value={leadDraft.notes}
          onChange={(e) =>
            setLeadDraft({ ...leadDraft, notes: e.target.value })
          }
        />
      </label>
      <div className="flex justify-end gap-2 sm:col-span-2">
        <button
          type="button"
          onClick={() => setShowLeadForm(false)}
          className="rounded-xl border px-4 py-2 text-sm"
        >
          Cancel
        </button>
        <button className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white">
          Save lead
        </button>
      </div>
    </form>
  );
  const activityForm = (
    <form onSubmit={saveActivity} className="grid gap-4 sm:grid-cols-2">
      <label className="text-xs font-semibold text-neutral-600">
        Lead *
        <select
          required
          className={`${input} mt-1`}
          value={activityDraft.lead_id}
          onChange={(e) =>
            setActivityDraft({ ...activityDraft, lead_id: e.target.value })
          }
        >
          <option value="">Choose a lead</option>
          {leads.map((l) => (
            <option value={l.id}>{l.name}</option>
          ))}
        </select>
      </label>
      <label className="text-xs font-semibold text-neutral-600">
        Campaign
        <select
          className={`${input} mt-1`}
          value={activityDraft.campaign_id}
          onChange={(e) =>
            setActivityDraft({ ...activityDraft, campaign_id: e.target.value })
          }
        >
          <option value="">None</option>
          {campaigns.map((c) => (
            <option value={c.id}>{c.name}</option>
          ))}
        </select>
      </label>
      <label className="text-xs font-semibold text-neutral-600">
        Activity type
        <select
          className={`${input} mt-1`}
          value={activityDraft.activity_type}
          onChange={(e) =>
            setActivityDraft({
              ...activityDraft,
              activity_type: e.target.value,
            })
          }
        >
          {[
            "Initial outreach",
            "Follow-up",
            "Reply received",
            "Sample shared",
            "Enquiry received",
            "Offer discussed",
            "Payment received",
            "Other interaction",
          ].map((a) => (
            <option>{a}</option>
          ))}
        </select>
      </label>
      <label className="text-xs font-semibold text-neutral-600">
        Outcome
        <select
          className={`${input} mt-1`}
          value={activityDraft.outcome}
          onChange={(e) =>
            setActivityDraft({ ...activityDraft, outcome: e.target.value })
          }
        >
          {[
            "No response",
            "Message delivered",
            "Replied",
            "Interested",
            "Not interested",
            "Follow-up required",
            "Converted",
          ].map((a) => (
            <option>{a}</option>
          ))}
        </select>
      </label>
      <label className="text-xs font-semibold text-neutral-600">
        Channel
        <input
          required
          className={`${input} mt-1`}
          value={activityDraft.channel}
          onChange={(e) =>
            setActivityDraft({ ...activityDraft, channel: e.target.value })
          }
        />
      </label>
      <label className="text-xs font-semibold text-neutral-600">
        Date & time
        <input
          required
          type="datetime-local"
          className={`${input} mt-1`}
          value={activityDraft.occurred_at}
          onChange={(e) =>
            setActivityDraft({ ...activityDraft, occurred_at: e.target.value })
          }
        />
      </label>
      <label className="text-xs font-semibold text-neutral-600 sm:col-span-2">
        Next follow-up
        <input
          type="datetime-local"
          className={`${input} mt-1`}
          value={activityDraft.follow_up_at}
          onChange={(e) =>
            setActivityDraft({ ...activityDraft, follow_up_at: e.target.value })
          }
        />
      </label>
      <label className="text-xs font-semibold text-neutral-600 sm:col-span-2">
        Notes
        <textarea
          className={`${input} mt-1`}
          rows={3}
          value={activityDraft.notes}
          onChange={(e) =>
            setActivityDraft({ ...activityDraft, notes: e.target.value })
          }
        />
      </label>
      <div className="flex justify-end gap-2 sm:col-span-2">
        <button
          type="button"
          onClick={() => setShowActivityForm(false)}
          className="rounded-xl border px-4 py-2 text-sm"
        >
          Cancel
        </button>
        <button className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white">
          Save activity
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-neutral-200 bg-white p-5 lg:flex">
        <button
          onClick={onExit}
          className="mb-8 flex items-center gap-2 text-left"
        >
          <ChevronLeft size={18} />
          <span className="font-bold tracking-tight">
            jomoCode<span className="text-indigo-600">.</span>{" "}
            <span className="font-normal text-neutral-400">admin</span>
          </span>
        </button>
        {nav}
        <div className="mt-auto rounded-2xl bg-neutral-50 p-4 text-xs leading-5 text-neutral-500">
          Marketing workspace
          <br />
          <span className="font-semibold text-neutral-700">
            Campaign & lead tracking
          </span>
        </div>
        <button
          onClick={logout}
          className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100"
        >
          <LogOut size={17} />
          Sign out
        </button>
      </aside>
      {mobileNav && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/40 lg:hidden"
          onClick={() => setMobileNav(false)}
        >
          <div
            className="h-full w-[min(84vw,320px)] bg-white p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-7 flex items-center justify-between font-bold">
              jomoCode admin
              <button onClick={() => setMobileNav(false)}>
                <X />
              </button>
            </div>
            {nav}
            <button
              onClick={logout}
              className="mt-8 flex items-center gap-2 px-3 py-2 text-sm"
            >
              <LogOut size={17} />
              Sign out
            </button>
          </div>
        </div>
      )}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-neutral-200 bg-white/90 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 hover:bg-neutral-100 lg:hidden"
              onClick={() => setMobileNav(true)}
              aria-label="Open navigation"
            >
              <Menu />
            </button>
            <div>
              <p className="text-sm font-bold">{section}</p>
              <p className="hidden text-xs text-neutral-500 sm:block">
                Marketing workspace
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {unreadPurchaseRequests > 0 && (
              <button
                onClick={() => setSection("Purchase Requests")}
                aria-label={`${unreadPurchaseRequests} unread purchase requests`}
                title={`${unreadPurchaseRequests} unread purchase requests`}
                className="relative rounded-xl border border-neutral-200 p-2 text-neutral-600 hover:bg-neutral-50"
              >
                <Bell size={17} />
                <span className="absolute -right-1 -top-1 min-w-4 rounded-full bg-rose-600 px-1 text-[10px] leading-4 text-white">{unreadPurchaseRequests}</span>
              </button>
            )}
            <button
              onClick={newLead}
              className="hidden items-center gap-2 rounded-xl bg-neutral-900 px-3 py-2 text-xs font-semibold text-white sm:flex"
            >
              <CirclePlus size={15} />
              New lead
            </button>
            <button
              onClick={logout}
              className="rounded-xl border border-neutral-200 p-2 text-neutral-600 hover:bg-neutral-50 lg:hidden"
              aria-label="Sign out"
            >
              <LogOut size={17} />
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 sm:p-7 lg:p-9">
          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
            >
              <span>{error}</span>
              <button onClick={() => setError("")} aria-label="Dismiss">
                <X size={17} />
              </button>
            </div>
          )}
          {loading ? (
            <div className="grid min-h-[50vh] place-items-center text-sm text-neutral-500">
              Loading marketing records…
            </div>
          ) : (
            <>
              {section === "Overview" && (
                <>
                  <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      Marketing overview
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                      Live totals calculated from saved campaigns and activity
                      records.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                    {[
                      ["Campaigns", campaigns.length],
                      ["Unique leads", leads.length],
                      ["Outreach attempts", activities.length],
                      [
                        "Replies",
                        activities.filter(
                          (a) =>
                            a.outcome === "Replied" ||
                            a.outcome === "Interested",
                        ).length,
                      ],
                      [
                        "Interested leads",
                        leads.filter((l) => l.status === "Interested").length,
                      ],
                      [
                        "Sample requests",
                        activities.filter(
                          (a) => a.activity_type === "Sample shared",
                        ).length,
                      ],
                      [
                        "Enquiries",
                        activities.filter(
                          (a) => a.activity_type === "Enquiry received",
                        ).length,
                      ],
                      [
                        "Converted leads",
                        leads.filter((l) => l.status === "Converted").length,
                      ],
                      ["Recorded revenue", "—"],
                      [
                        "Follow-ups due",
                        due.filter(
                          (l) =>
                            new Date(l.follow_up_at!) >=
                            new Date(new Date().toDateString()),
                        ).length,
                      ],
                      [
                        "Overdue follow-ups",
                        due.filter(
                          (l) =>
                            new Date(l.follow_up_at!) <
                            new Date(new Date().toDateString()),
                        ).length,
                      ],
                    ].map(([label, value]) => (
                      <div className={cardClass}>
                        <p className="text-xs font-medium text-neutral-500">
                          {label}
                        </p>
                        <p className="mt-3 text-2xl font-bold tracking-tight">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 grid gap-5 xl:grid-cols-2">
                    <div className={cardClass}>
                      <h2 className="font-bold">Leads by status</h2>
                      <div className="mt-4 space-y-3">
                        {statuses.map((s) => {
                          const count = leads.filter(
                            (l) => l.status === s,
                          ).length;
                          const pct = leads.length
                            ? (count / leads.length) * 100
                            : 0;
                          return (
                            <div key={s}>
                              <div className="mb-1 flex justify-between text-xs">
                                <span>{s}</span>
                                <span className="text-neutral-500">
                                  {count}
                                </span>
                              </div>
                              <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                                <div
                                  className="h-full rounded-full bg-indigo-500"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                        {!leads.length && (
                          <p className="text-sm text-neutral-500">
                            No leads yet. Add your first prospect to see the
                            pipeline.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={cardClass}>
                      <h2 className="font-bold">Recent outreach</h2>
                      <div className="mt-4 space-y-3">
                        {activities.slice(0, 6).map((a) => (
                          <div
                            key={a.id}
                            className="flex justify-between gap-3 border-b border-neutral-100 pb-3 text-sm"
                          >
                            <div>
                              <p className="font-medium">
                                {leads.find((l) => l.id === a.lead_id)?.name ??
                                  "Lead"}{" "}
                                · {a.activity_type}
                              </p>
                              <p className="text-xs text-neutral-500">
                                {a.channel} · {a.outcome}
                              </p>
                            </div>
                            <time className="shrink-0 text-xs text-neutral-400">
                              {new Date(a.occurred_at).toLocaleDateString()}
                            </time>
                          </div>
                        ))}
                        {!activities.length && (
                          <p className="text-sm text-neutral-500">
                            No outreach recorded yet.
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setSection("Outreach Activity");
                          setShowActivityForm(true);
                        }}
                        className="mt-3 text-sm font-semibold text-indigo-700"
                      >
                        Record an interaction →
                      </button>
                    </div>
                  </div>
                </>
              )}
              {section === "Campaigns" &&
                (selectedCampaign ? (
                  <>
                    <button
                      onClick={() => setCampaignDetail(null)}
                      className="mb-5 text-sm font-semibold text-indigo-700"
                    >
                      ← All campaigns
                    </button>
                    <div className={cardClass}>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                            {selectedCampaign.status}
                          </p>
                          <h1 className="mt-1 text-2xl font-bold">
                            {selectedCampaign.name}
                          </h1>
                          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
                            {selectedCampaign.description ||
                              "No description provided."}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            updateCampaignStatus(
                              selectedCampaign,
                              selectedCampaign.status === "Active"
                                ? "Paused"
                                : "Active",
                            )
                          }
                          className="rounded-xl border px-3 py-2 text-sm"
                        >
                          {selectedCampaign.status === "Active"
                            ? "Pause"
                            : "Set active"}
                        </button>
                      </div>
                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <p className="rounded-xl bg-neutral-50 p-3 text-sm">
                          <span className="text-neutral-500">Objective</span>
                          <br />
                          {selectedCampaign.objective || "—"}
                        </p>
                        <p className="rounded-xl bg-neutral-50 p-3 text-sm">
                          <span className="text-neutral-500">
                            Audience · Channel
                          </span>
                          <br />
                          {selectedCampaign.audience || "—"} ·{" "}
                          {selectedCampaign.channel || "—"}
                        </p>
                        <p className="rounded-xl bg-neutral-50 p-3 text-sm">
                          <span className="text-neutral-500">Dates</span>
                          <br />
                          {selectedCampaign.start_date || "—"} to{" "}
                          {selectedCampaign.end_date || "Open"}
                        </p>
                      </div>
                      <h2 className="mt-7 font-bold">
                        Associated leads ({campaignLeads.length})
                      </h2>
                      <div className="mt-3 divide-y">
                        {campaignLeads.map((l) => (
                          <button
                            key={l.id}
                            onClick={() => {
                              setSection("Leads");
                              setLeadDetail(l.id);
                            }}
                            className="flex w-full justify-between py-3 text-left text-sm"
                          >
                            <span>{l.name}</span>
                            <span className="text-neutral-500">{l.status}</span>
                          </button>
                        ))}
                        {!campaignLeads.length && (
                          <p className="py-4 text-sm text-neutral-500">
                            No leads have activity linked to this campaign yet.
                          </p>
                        )}
                      </div>
                      <h2 className="mt-6 font-bold">Campaign notes</h2>
                      <p className="mt-2 whitespace-pre-wrap text-sm text-neutral-600">
                        {selectedCampaign.notes || "No activity notes yet."}
                      </p>
                      <p className="mt-5 text-xs text-neutral-400">
                        Outreach attempts:{" "}
                        {
                          activities.filter(
                            (a) => a.campaign_id === campaignDetail,
                          ).length
                        }{" "}
                        · Responses:{" "}
                        {
                          activities.filter(
                            (a) =>
                              a.campaign_id === campaignDetail &&
                              ["Replied", "Interested"].includes(a.outcome),
                          ).length
                        }{" "}
                        · Revenue: unavailable until payment tracking is
                        configured
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <h1 className="text-2xl font-bold">Campaigns</h1>
                        <p className="mt-1 text-sm text-neutral-500">
                          Organize outreach around audiences and goals.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowCampaignForm(true)}
                        className="flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white"
                      >
                        <CirclePlus size={16} />
                        New campaign
                      </button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {campaigns.map((c) => (
                        <article
                          key={c.id}
                          className={`${cardClass} cursor-pointer transition hover:border-indigo-200`}
                          onClick={() => setCampaignDetail(c.id)}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${c.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-600"}`}
                            >
                              {c.status}
                            </span>
                            <span className="text-xs text-neutral-400">
                              {c.channel}
                            </span>
                          </div>
                          <h2 className="mt-4 font-bold">{c.name}</h2>
                          <p className="mt-1 line-clamp-2 min-h-10 text-sm text-neutral-500">
                            {c.description || "No description"}
                          </p>
                          <div className="mt-4 flex justify-between text-xs text-neutral-500">
                            <span>{c.audience || "Audience not set"}</span>
                            <span>
                              {
                                activities.filter((a) => a.campaign_id === c.id)
                                  .length
                              }{" "}
                              activities
                            </span>
                          </div>
                          <div
                            className="mt-4 flex gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() =>
                                updateCampaignStatus(
                                  c,
                                  c.status === "Active" ? "Paused" : "Active",
                                )
                              }
                              className="rounded-lg border px-3 py-1.5 text-xs"
                            >
                              {c.status === "Active" ? "Pause" : "Activate"}
                            </button>
                            <button
                              onClick={() => setCampaignDetail(c.id)}
                              className="rounded-lg bg-neutral-100 px-3 py-1.5 text-xs"
                            >
                              View details
                            </button>
                          </div>
                        </article>
                      ))}
                      {!campaigns.length && (
                        <div
                          className={`${cardClass} col-span-full py-12 text-center`}
                        >
                          <BriefcaseBusiness className="mx-auto text-neutral-300" />
                          <p className="mt-3 font-semibold">No campaigns yet</p>
                          <p className="mt-1 text-sm text-neutral-500">
                            Create one to group prospects and measure outreach.
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                ))}
              {section === "Leads" &&
                (selectedLead ? (
                  <>
                    <button
                      onClick={() => setLeadDetail(null)}
                      className="mb-5 text-sm font-semibold text-indigo-700"
                    >
                      ← All leads
                    </button>
                    <div className={cardClass}>
                      <div className="flex flex-wrap justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-indigo-600">
                            Lead record
                          </p>
                          <h1 className="mt-1 text-2xl font-bold">
                            {selectedLead.name}
                          </h1>
                          <p className="mt-1 text-sm text-neutral-500">
                            {selectedLead.profile_url ||
                              selectedLead.phone ||
                              selectedLead.email ||
                              "No profile URL or phone recorded"}
                          </p>
                        </div>
                        <button
                          onClick={() => editLead(selectedLead)}
                          className="rounded-xl border px-4 py-2 text-sm"
                        >
                          Edit lead
                        </button>
                      </div>
                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        <label className="text-xs text-neutral-500">
                          Status
                          <select
                            className={`${input} mt-1`}
                            value={selectedLead.status}
                            onChange={(e) =>
                              void changeStatus(selectedLead, e.target.value)
                            }
                          >
                            {statuses.map((s) => (
                              <option>{s}</option>
                            ))}
                          </select>
                        </label>
                        <p className="rounded-xl bg-neutral-50 p-3 text-xs text-neutral-500">
                          Source channel
                          <br />
                          <span className="mt-1 block text-sm text-neutral-800">
                            {selectedLead.source_channel || "Unknown"}
                          </span>
                        </p>
                        <p className="rounded-xl bg-neutral-50 p-3 text-xs text-neutral-500">
                          Follow-up
                          <br />
                          <span className="mt-1 block text-sm text-neutral-800">
                            {selectedLead.follow_up_at
                              ? new Date(
                                  selectedLead.follow_up_at,
                                ).toLocaleString()
                              : "Not scheduled"}
                          </span>
                        </p>
                      </div>
                      <p className="mt-4 whitespace-pre-wrap text-sm text-neutral-600">
                        {selectedLead.notes || "No notes."}
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                        <h2 className="font-bold">Interaction history</h2>
                        <button
                          onClick={() => {
                            setActivityDraft({
                              ...activityDraft,
                              lead_id: selectedLead.id,
                            });
                            setShowActivityForm(true);
                          }}
                          className="rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700"
                        >
                          Add interaction
                        </button>
                      </div>
                      <div className="mt-3 space-y-3">
                        {leadActivities.map((a) => (
                          <div
                            key={a.id}
                            className="border-l-2 border-indigo-200 py-1 pl-4"
                          >
                            <p className="text-sm font-semibold">
                              {a.activity_type} · {a.outcome}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {new Date(a.occurred_at).toLocaleString()} ·{" "}
                              {a.channel}
                              {a.campaign_id
                                ? ` · ${campaigns.find((c) => c.id === a.campaign_id)?.name ?? "Campaign"}`
                                : ""}
                            </p>
                            {a.notes && (
                              <p className="mt-1 text-sm text-neutral-600">
                                {a.notes}
                              </p>
                            )}
                          </div>
                        ))}
                        {!leadActivities.length && (
                          <p className="text-sm text-neutral-500">
                            No interactions recorded yet.
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <h1 className="text-2xl font-bold">Leads</h1>
                        <p className="mt-1 text-sm text-neutral-500">
                          {leads.length} unique records · schedule follow-ups
                          and keep a clear history.
                        </p>
                      </div>
                      <button
                        onClick={newLead}
                        className="flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white"
                      >
                        <CirclePlus size={16} />
                        New lead
                      </button>
                    </div>
                    <div className="mb-4 grid gap-3 sm:grid-cols-3">
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search name, URL, phone or email"
                        className={input}
                      />
                      <select
                        className={input}
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option>All statuses</option>
                        {statuses.map((s) => (
                          <option>{s}</option>
                        ))}
                      </select>
                      <select
                        className={input}
                        value={campaignFilter}
                        onChange={(e) => setCampaignFilter(e.target.value)}
                      >
                        <option>All campaigns</option>
                        {campaigns.map((c) => (
                          <option value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className={`${cardClass} overflow-hidden !p-0`}>
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left text-sm">
                          <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                            <tr>
                              {[
                                "Lead",
                                "Channel",
                                "Status",
                                "Follow-up",
                                "First contacted",
                                "",
                              ].map((h) => (
                                <th className="px-4 py-3 font-semibold">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100">
                            {filteredLeads.map((l) => (
                              <tr key={l.id}>
                                <td className="px-4 py-3">
                                  <button
                                    onClick={() => setLeadDetail(l.id)}
                                    className="font-semibold hover:text-indigo-700"
                                  >
                                    {l.name}
                                  </button>
                                  <p className="max-w-[230px] truncate text-xs text-neutral-500">
                                    {l.profile_url ||
                                      l.phone ||
                                      l.email ||
                                      "No profile"}
                                  </p>
                                </td>
                                <td className="px-4 py-3 text-neutral-600">
                                  {l.source_channel || "—"}
                                </td>
                                <td className="px-4 py-3">
                                  <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs text-indigo-700">
                                    {l.status}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-xs text-neutral-600">
                                  {l.follow_up_at
                                    ? new Date(
                                        l.follow_up_at,
                                      ).toLocaleDateString()
                                    : "—"}
                                </td>
                                <td className="px-4 py-3 text-xs text-neutral-600">
                                  {l.first_contacted_at
                                    ? new Date(
                                        l.first_contacted_at,
                                      ).toLocaleDateString()
                                    : "—"}
                                </td>
                                <td className="px-4 py-3">
                                  <button
                                    onClick={() => editLead(l)}
                                    className="text-xs font-semibold text-neutral-500 hover:text-neutral-900"
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))}
                            {!filteredLeads.length && (
                              <tr>
                                <td
                                  colSpan={6}
                                  className="px-4 py-12 text-center text-sm text-neutral-500"
                                >
                                  No matching leads. Try changing the filters or
                                  create a lead.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <h2 className="mb-3 mt-7 font-bold">Follow-up queue</h2>
                    <div className={`${cardClass} divide-y !py-1`}>
                      {leads
                        .filter(
                          (l) =>
                            l.follow_up_at &&
                            !["Converted", "Lost"].includes(l.status),
                        )
                        .sort(
                          (a, b) =>
                            new Date(a.follow_up_at!).getTime() -
                            new Date(b.follow_up_at!).getTime(),
                        )
                        .slice(0, 8)
                        .map((l) => (
                          <button
                            key={l.id}
                            onClick={() => setLeadDetail(l.id)}
                            className="flex w-full items-center justify-between gap-2 py-3 text-left"
                          >
                            <span className="text-sm font-medium">
                              {l.name}{" "}
                              <span className="ml-2 rounded-full bg-rose-50 px-2 py-1 text-xs text-rose-700">
                                {new Date(l.follow_up_at!) < new Date()
                                  ? "Overdue"
                                  : "Upcoming"}
                              </span>
                            </span>
                            <span className="text-xs text-neutral-500">
                              {new Date(l.follow_up_at!).toLocaleString()}
                            </span>
                          </button>
                        ))}
                      {!leads.some(
                        (l) =>
                          l.follow_up_at &&
                          !["Converted", "Lost"].includes(l.status),
                      ) && (
                        <p className="py-5 text-sm text-neutral-500">
                          No scheduled follow-ups.
                        </p>
                      )}
                    </div>
                  </>
                ))}
              {section === "Outreach Activity" && (
                <>
                  <div className="mb-5 flex flex-wrap items-end justify-between">
                    <div>
                      <h1 className="text-2xl font-bold">Outreach activity</h1>
                      <p className="mt-1 text-sm text-neutral-500">
                        Attempts are separate from replies or confirmed
                        delivery.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowActivityForm(true)}
                      className="mt-3 flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white sm:mt-0"
                    >
                      <CirclePlus size={16} />
                      Record activity
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className={cardClass}>
                      <p className="text-xs text-neutral-500">
                        Recorded interactions
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        {activities.length}
                      </p>
                    </div>
                    <div className={cardClass}>
                      <p className="text-xs text-neutral-500">
                        Unique leads with activity
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        {new Set(activities.map((a) => a.lead_id)).size}
                      </p>
                    </div>
                    <div className={cardClass}>
                      <p className="text-xs text-neutral-500">
                        Replies and positive responses
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        {
                          activities.filter((a) =>
                            ["Replied", "Interested"].includes(a.outcome),
                          ).length
                        }
                      </p>
                    </div>
                  </div>
                  <div className={`${cardClass} mt-5 divide-y !py-1`}>
                    {activities.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setLeadDetail(a.lead_id)}
                        className="flex w-full items-start justify-between gap-3 py-4 text-left"
                      >
                        <div>
                          <p className="text-sm font-semibold">
                            {leads.find((l) => l.id === a.lead_id)?.name ||
                              "Lead"}{" "}
                            · {a.activity_type}
                          </p>
                          <p className="mt-1 text-xs text-neutral-500">
                            {a.channel} · {a.outcome}
                            {a.campaign_id
                              ? ` · ${campaigns.find((c) => c.id === a.campaign_id)?.name ?? ""}`
                              : ""}
                          </p>
                          {a.notes && (
                            <p className="mt-1 text-sm text-neutral-600">
                              {a.notes}
                            </p>
                          )}
                        </div>
                        <time className="shrink-0 text-xs text-neutral-400">
                          {new Date(a.occurred_at).toLocaleString()}
                        </time>
                      </button>
                    ))}
                    {!activities.length && (
                      <p className="py-12 text-center text-sm text-neutral-500">
                        No activity recorded. Log each attempt or reply as it
                        happens.
                      </p>
                    )}
                  </div>
                </>
              )}
              {section === "Analytics" && (
                <>
                  <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h1 className="text-2xl font-bold">Analytics</h1>
                      <p className="mt-1 text-sm text-neutral-500">
                        Actual CRM records; website traffic is available in
                        Supabase separately.
                      </p>
                    </div>
                    <select
                      className={`${input} w-auto`}
                      value={analyticsPeriod}
                      onChange={(e) => setAnalyticsPeriod(e.target.value)}
                    >
                      <option value="7">Last 7 days</option>
                      <option value="30">Last 30 days</option>
                      <option value="90">Last 90 days</option>
                      <option value="365">Last 12 months</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {[
                      ["Attempts", periodActivities.length],
                      ["Unique people contacted", contactedIds.size],
                      ["Replies", replies],
                      ["Positive responses", positive],
                      [
                        "Response rate",
                        contactedIds.size
                          ? `${Math.round((replies / contactedIds.size) * 100)}%`
                          : "—",
                      ],
                      [
                        "Positive response rate",
                        replies
                          ? `${Math.round((positive / replies) * 100)}%`
                          : "—",
                      ],
                      ["Paid conversions", conversions],
                      ["Revenue", "Unavailable"],
                    ].map(([l, v]) => (
                      <div className={cardClass}>
                        <p className="text-xs text-neutral-500">{l}</p>
                        <p className="mt-3 text-2xl font-bold">{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 grid gap-5 xl:grid-cols-2">
                    <div className={cardClass}>
                      <h2 className="font-bold">Performance by campaign</h2>
                      <div className="mt-4 space-y-3">
                        {campaigns.map((c) => {
                          const acts = periodActivities.filter(
                            (a) => a.campaign_id === c.id,
                          );
                          const people = new Set(acts.map((a) => a.lead_id))
                            .size;
                          return (
                            <div
                              key={c.id}
                              className="flex items-center justify-between border-b border-neutral-100 pb-3 text-sm"
                            >
                              <span>{c.name}</span>
                              <span className="text-neutral-500">
                                {acts.length} interactions · {people} people ·{" "}
                                {
                                  acts.filter((a) =>
                                    ["Replied", "Interested"].includes(
                                      a.outcome,
                                    ),
                                  ).length
                                }{" "}
                                replies
                              </span>
                            </div>
                          );
                        })}
                        {!campaigns.length && (
                          <p className="text-sm text-neutral-500">
                            No campaign records.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={cardClass}>
                      <h2 className="font-bold">Performance by channel</h2>
                      <div className="mt-4 space-y-3">
                        {Array.from(
                          new Set(periodActivities.map((a) => a.channel)),
                        ).map((channel) => {
                          const acts = periodActivities.filter(
                            (a) => a.channel === channel,
                          );
                          return (
                            <div
                              key={channel}
                              className="flex items-center justify-between border-b border-neutral-100 pb-3 text-sm"
                            >
                              <span>{channel}</span>
                              <span className="text-neutral-500">
                                {acts.length} attempts ·{" "}
                                {
                                  acts.filter((a) =>
                                    ["Replied", "Interested"].includes(
                                      a.outcome,
                                    ),
                                  ).length
                                }{" "}
                                replies
                              </span>
                            </div>
                          );
                        })}
                        {!periodActivities.length && (
                          <p className="text-sm text-neutral-500">
                            No interactions in this date range.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
                    Website visitors are tracked separately in{" "}
                    <code>performance_events</code>; this interface does not yet
                    query that public event data. Visits, enquiries, and
                    customers are not inferred from clicks. Revenue and
                    paid-customer metrics require an explicit payment record
                    integration.
                  </p>
                </>
              )}
              {section === "Purchase Requests" && (
                <>
                  <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Purchase requests</h1>
                      <p className="mt-1 text-sm text-neutral-500">Website submissions requesting a portfolio website.</p>
                    </div>
                    <button onClick={() => void refresh()} className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium hover:bg-neutral-50">Refresh</button>
                  </div>
                  <div className={cardClass}>
                    <p className="mb-4 text-sm text-neutral-500">{purchaseRequests.length} request{purchaseRequests.length === 1 ? "" : "s"}</p>
                    {!purchaseRequests.length ? (
                      <p className="py-8 text-center text-sm text-neutral-500">No purchase requests yet.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
                          <thead><tr className="border-b border-neutral-200 text-xs text-neutral-500">
                            <th className="px-3 py-3 font-medium">Status</th><th className="px-3 py-3 font-medium">Submitted</th><th className="px-3 py-3 font-medium">Reference</th><th className="px-3 py-3 font-medium">Name / email</th><th className="px-3 py-3 font-medium">Career field</th><th className="px-3 py-3 font-medium">Design</th><th className="px-3 py-3 font-medium">Colors</th><th className="px-3 py-3 font-medium">Contact</th><th className="px-3 py-3 font-medium">Notes / CV waitlist</th><th className="px-3 py-3 font-medium">Action</th>
                          </tr></thead>
                          <tbody>{purchaseRequests.map((request) => (
                            <tr key={request.id} className={`border-b border-neutral-100 align-top ${request.is_read ? "" : "bg-indigo-50/50"}`}>
                              <td className="px-3 py-3"><span className={`rounded-full px-2 py-1 text-xs ${request.is_read ? "bg-neutral-100 text-neutral-600" : "bg-indigo-100 font-semibold text-indigo-700"}`}>{request.is_read ? "Read" : "Unread"}</span></td>
                              <td className="whitespace-nowrap px-3 py-3 text-xs text-neutral-600"><time dateTime={request.submitted_at}>{new Date(request.submitted_at).toLocaleString()}</time></td>
                              <td className="px-3 py-3 text-xs text-neutral-600">{request.reference_id}</td>
                              <td className="px-3 py-3"><div className="font-medium">{request.full_name}</div><a className="text-xs text-indigo-700 hover:underline" href={`mailto:${request.email}`}>{request.email}</a></td>
                              <td className="px-3 py-3">{request.career_field}</td>
                              <td className="px-3 py-3 capitalize">{request.preferred_design}</td>
                              <td className="px-3 py-3 text-xs">{request.color_option}{request.custom_primary_color ? ` · ${request.custom_primary_color}` : ""}{request.custom_accent_color ? ` / ${request.custom_accent_color}` : ""}</td>
                              <td className="px-3 py-3">{request.contact_method}</td>
                              <td className="max-w-xs whitespace-pre-wrap px-3 py-3 text-xs">{request.project_notes || "—"}{request.cv_builder_waitlist && <div className="mt-1 text-indigo-700">CV builder waitlist</div>}</td>
                              <td className="px-3 py-3">{!request.is_read && <button onClick={() => void markPurchaseRequestRead(request)} className="inline-flex items-center gap-1 whitespace-nowrap rounded-lg border border-indigo-200 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-50"><Check size={14} />Mark read</button>}</td>
                            </tr>
                          ))}</tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </>
              )}
              {section === "Settings" && (
                <>
                  <h1 className="text-2xl font-bold">Settings</h1>
                  <p className="mt-1 text-sm text-neutral-500">
                    Secure access is managed by your Supabase project.
                  </p>
                  <div className={`${cardClass} mt-5 max-w-2xl`}>
                    <h2 className="font-bold">Admin access</h2>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      Production sign-in uses Supabase Auth. Create the
                      administrator account in Supabase Authentication, then use
                      that account to enter this workspace. Do not place a
                      shared PIN in frontend configuration; browser code is
                      public.
                    </p>
                    <button
                      onClick={logout}
                      className="mt-4 flex items-center gap-2 rounded-xl border px-4 py-2 text-sm"
                    >
                      <LogOut size={16} />
                      Sign out
                    </button>
                  </div>
                  <div className={`${cardClass} mt-4 max-w-2xl`}>
                    <h2 className="font-bold">Website analytics</h2>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      Anonymous page and CTA events are already collected in the
                      existing performance_events table. Admin read access and
                      campaign attribution can be added after applying the admin
                      SQL migration. Current dashboard does not invent visitor
                      counts.
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </main>
      </div>
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-[100] rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white shadow-xl"
        >
          {toast}
        </div>
      )}
      {showLeadForm &&
        modal(
          editingLead ? "Edit lead" : "Add a lead",
          () => setShowLeadForm(false),
          createLeadForm,
        )}
      {showCampaignForm &&
        modal(
          "Create a campaign",
          () => setShowCampaignForm(false),
          <form onSubmit={saveCampaign} className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-semibold text-neutral-600 sm:col-span-2">
              Campaign name *
              <input
                required
                className={`${input} mt-1`}
                value={campaignDraft.name}
                onChange={(e) =>
                  setCampaignDraft({ ...campaignDraft, name: e.target.value })
                }
              />
            </label>
            <label className="text-xs font-semibold text-neutral-600 sm:col-span-2">
              Description
              <textarea
                className={`${input} mt-1`}
                rows={2}
                value={campaignDraft.description}
                onChange={(e) =>
                  setCampaignDraft({
                    ...campaignDraft,
                    description: e.target.value,
                  })
                }
              />
            </label>
            <label className="text-xs font-semibold text-neutral-600">
              Objective
              <input
                className={`${input} mt-1`}
                value={campaignDraft.objective}
                onChange={(e) =>
                  setCampaignDraft({
                    ...campaignDraft,
                    objective: e.target.value,
                  })
                }
              />
            </label>
            <label className="text-xs font-semibold text-neutral-600">
              Audience segment
              <input
                className={`${input} mt-1`}
                value={campaignDraft.audience}
                onChange={(e) =>
                  setCampaignDraft({
                    ...campaignDraft,
                    audience: e.target.value,
                  })
                }
              />
            </label>
            <label className="text-xs font-semibold text-neutral-600">
              Channel
              <input
                className={`${input} mt-1`}
                value={campaignDraft.channel}
                onChange={(e) =>
                  setCampaignDraft({
                    ...campaignDraft,
                    channel: e.target.value,
                  })
                }
              />
            </label>
            <label className="text-xs font-semibold text-neutral-600">
              Status
              <select
                className={`${input} mt-1`}
                value={campaignDraft.status}
                onChange={(e) =>
                  setCampaignDraft({ ...campaignDraft, status: e.target.value })
                }
              >
                {["Draft", "Active", "Paused", "Completed", "Archived"].map(
                  (s) => (
                    <option>{s}</option>
                  ),
                )}
              </select>
            </label>
            <label className="text-xs font-semibold text-neutral-600">
              Start date
              <input
                type="date"
                className={`${input} mt-1`}
                value={campaignDraft.start_date}
                onChange={(e) =>
                  setCampaignDraft({
                    ...campaignDraft,
                    start_date: e.target.value,
                  })
                }
              />
            </label>
            <label className="text-xs font-semibold text-neutral-600">
              End date
              <input
                type="date"
                className={`${input} mt-1`}
                value={campaignDraft.end_date}
                onChange={(e) =>
                  setCampaignDraft({
                    ...campaignDraft,
                    end_date: e.target.value,
                  })
                }
              />
            </label>
            <label className="text-xs font-semibold text-neutral-600 sm:col-span-2">
              Activity notes
              <textarea
                className={`${input} mt-1`}
                rows={3}
                value={campaignDraft.notes}
                onChange={(e) =>
                  setCampaignDraft({ ...campaignDraft, notes: e.target.value })
                }
              />
            </label>
            <div className="flex justify-end gap-2 sm:col-span-2">
              <button
                type="button"
                onClick={() => setShowCampaignForm(false)}
                className="rounded-xl border px-4 py-2 text-sm"
              >
                Cancel
              </button>
              <button className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-semibold text-white">
                Create campaign
              </button>
            </div>
          </form>,
        )}
      {showActivityForm &&
        modal(
          "Record outreach activity",
          () => setShowActivityForm(false),
          activityForm,
        )}
    </div>
  );
}

export function AdminGate({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [configured, setConfigured] = useState(Boolean(supabase));
  useEffect(() => {
    if (!supabase) return;
    let live = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (live) setAuthenticated(Boolean(data.session));
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) =>
      setAuthenticated(Boolean(session)),
    );
    return () => {
      live = false;
      subscription.unsubscribe();
    };
  }, []);
  async function signIn(e: FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError("");
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (authError) setError(authError.message);
    else setAuthenticated(true);
  }
  if (authenticated)
    return (
      <div className="fixed inset-0 z-[80] overflow-y-auto bg-neutral-50">
        <AdminApp onExit={onClose} />
      </div>
    );
  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-neutral-950/55 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              jomoCode · internal
            </p>
            <h2 className="mt-2 text-2xl font-bold">Authorized only</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Restricted workspace.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-neutral-100"
            aria-label="Close sign in"
          >
            <X size={19} />
          </button>
        </div>
        {!configured && (
          <div
            role="alert"
            className="mt-5 rounded-xl bg-amber-50 p-3 text-sm text-amber-900"
          >
            DEV MODE - no backend access
          </div>
        )}
        <form onSubmit={signIn} className="mt-6 space-y-4">
          <label className="block text-xs font-semibold text-neutral-600">
            Admin email
            <input
              required
              type="email"
              autoComplete="username"
              className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-3 text-sm outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block text-xs font-semibold text-neutral-600">
            Password
            <input
              required
              type="password"
              autoComplete="current-password"
              className="mt-1 w-full rounded-xl border border-neutral-200 px-3 py-3 text-sm outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && (
            <p role="alert" className="text-sm text-rose-700">
              {error}
            </p>
          )}
          <button
            disabled={busy || !configured}
            className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-bold text-white disabled:opacity-50"
          >
            {busy ? "Signing in…" : "Continue"}
          </button>
        </form>
      </section>
    </div>
  );
}
