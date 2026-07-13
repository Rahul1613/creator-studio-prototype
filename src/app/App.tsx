import { useState, useEffect, useCallback } from "react";
import {
  Home, Search, MessageCircle, Bell, User, ChevronRight, ChevronLeft,
  Star, Heart, Send, Paperclip, Check, X, Upload, DollarSign,
  TrendingUp, Settings, LogOut, Edit3, Filter, MapPin, Users,
  Instagram, Youtube, Twitter, Play, FileText, Clock, CheckCircle,
  AlertCircle, XCircle, Camera, BarChart2, Award, Zap, Shield,
  HelpCircle, ChevronDown, Plus, ArrowRight, Eye, ThumbsUp, Flag,
  Briefcase, Bookmark, Share2, MoreHorizontal, Image, Mic,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
} from "recharts";

// ── Design tokens ────────────────────────────────────────────────
const C = {
  navy:   "#0B1437",
  indigo: "#4F5FF0",
  pink:   "#EC4899",
  bg:     "#F7F8FC",
  card:   "#ffffff",
  text:   "#0B1437",
  muted:  "#6B7280",
  border: "rgba(11,20,55,0.08)",
  green:  "#10B981",
  amber:  "#F59E0B",
  red:    "#EF4444",
  indigoLight: "#EEF0FE",
  pinkLight:   "#FDF2F8",
  teal:   "#14B8A6",
  tealLight: "#F0FDFA",
};

const shadow = "0 2px 12px rgba(11,20,55,0.08)";
const cardStyle: React.CSSProperties = {
  background: C.card,
  borderRadius: 16,
  boxShadow: shadow,
};

// ── Shared components ────────────────────────────────────────────

function PrimaryBtn({ label, onClick, style }: { label: string; onClick?: () => void; style?: React.CSSProperties }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: C.indigo,
        color: "#fff",
        borderRadius: 12,
        padding: "14px 0",
        fontWeight: 600,
        fontSize: 15,
        width: "100%",
        border: "none",
        cursor: "pointer",
        ...style,
      }}
    >
      {label}
    </button>
  );
}

function SecondaryBtn({ label, onClick, style }: { label: string; onClick?: () => void; style?: React.CSSProperties }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: C.indigoLight,
        color: C.indigo,
        borderRadius: 12,
        padding: "14px 0",
        fontWeight: 600,
        fontSize: 15,
        width: "100%",
        border: "none",
        cursor: "pointer",
        ...style,
      }}
    >
      {label}
    </button>
  );
}

function InputField({ label, placeholder, type = "text", value }: { label: string; placeholder: string; type?: string; value?: string }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: C.navy, display: "block", marginBottom: 6 }}>{label}</label>
      <div style={{ background: C.bg, borderRadius: 10, padding: "12px 14px", border: `1px solid ${C.border}` }}>
        <input
          type={type}
          defaultValue={value}
          placeholder={placeholder}
          style={{ background: "transparent", border: "none", outline: "none", width: "100%", fontSize: 14, color: C.text, fontFamily: "Inter, sans-serif" }}
        />
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: "active" | "pending" | "completed" | "rejected" | "review" }) {
  const map = {
    active:    { bg: "#DCFCE7", color: C.green,  label: "Active" },
    pending:   { bg: "#FEF3C7", color: C.amber,  label: "Pending" },
    completed: { bg: "#E0E7FF", color: C.indigo, label: "Completed" },
    rejected:  { bg: "#FEE2E2", color: C.red,    label: "Rejected" },
    review:    { bg: "#FDF2F8", color: C.pink,   label: "In Review" },
  };
  const s = map[status];
  return (
    <span style={{ background: s.bg, color: s.color, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 600 }}>
      {s.label}
    </span>
  );
}

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <span style={{
      background: active ? C.indigo : C.card,
      color: active ? "#fff" : C.muted,
      borderRadius: 20,
      padding: "6px 14px",
      fontSize: 12,
      fontWeight: 500,
      border: `1px solid ${active ? C.indigo : C.border}`,
      whiteSpace: "nowrap" as const,
      cursor: "pointer",
    }}>
      {label}
    </span>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ElementType; color: string }) {
  return (
    <div style={{ ...cardStyle, padding: "14px", flex: 1, minWidth: 0 }}>
      <div style={{ background: color + "15", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
        <Icon size={18} color={color} />
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: C.navy }}>{value}</div>
      <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{label}</div>
    </div>
  );
}

function CreatorCard({ name, niche, followers, rate, img, badge }: {
  name: string; niche: string; followers: string; rate: string; img: string; badge?: boolean;
}) {
  return (
    <div style={{ ...cardStyle, padding: 14, display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
      <div style={{ position: "relative", flexShrink: 0 }}>
        <img src={img} alt={name} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover" }} />
        {badge && (
          <span style={{ position: "absolute", bottom: -2, right: -2, background: C.pink, borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Star size={10} color="#fff" fill="#fff" />
          </span>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: C.navy }}>{name}</div>
        <div style={{ fontSize: 12, color: C.muted }}>{niche}</div>
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <span style={{ fontSize: 11, color: C.indigo, fontWeight: 500 }}><Users size={10} style={{ display: "inline", marginRight: 3 }} />{followers}</span>
          <span style={{ fontSize: 11, color: C.green, fontWeight: 500 }}>${rate}/post</span>
        </div>
      </div>
      <ChevronRight size={16} color={C.muted} />
    </div>
  );
}

function BottomBar({ active, tabs }: { active: number; tabs: Array<{ icon: React.ElementType; label: string }> }) {
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      background: C.card,
      borderTop: `1px solid ${C.border}`,
      display: "flex",
      paddingBottom: 16,
      paddingTop: 10,
    }}>
      {tabs.map((t, i) => {
        const Icon = t.icon;
        const isActive = i === active;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer" }}>
            {isActive
              ? <div style={{ background: C.indigo, borderRadius: 10, padding: "4px 10px" }}><Icon size={18} color="#fff" /></div>
              : <Icon size={18} color={C.muted} />
            }
            <span style={{ fontSize: 10, color: isActive ? C.indigo : C.muted, fontWeight: isActive ? 600 : 400 }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

const businessTabs = [
  { icon: Home, label: "Home" }, { icon: Search, label: "Search" },
  { icon: Briefcase, label: "Jobs" }, { icon: MessageCircle, label: "Chat" }, { icon: User, label: "Profile" },
];
const creatorTabs = [
  { icon: Home, label: "Home" }, { icon: Briefcase, label: "Collabs" },
  { icon: MessageCircle, label: "Chat" }, { icon: TrendingUp, label: "Earnings" }, { icon: User, label: "Profile" },
];

function PhoneHeader({ title, hasBack = false, dark = false }: { title?: string; hasBack?: boolean; dark?: boolean }) {
  const fg = dark ? "#fff" : C.navy;
  return (
    <div style={{ padding: "12px 20px 8px", display: "flex", alignItems: "center", gap: 12, background: dark ? C.navy : "transparent" }}>
      {hasBack && <ChevronLeft size={22} color={fg} style={{ cursor: "pointer", flexShrink: 0 }} />}
      {title && <span style={{ fontWeight: 700, fontSize: 17, color: fg, flex: 1 }}>{title}</span>}
    </div>
  );
}

function StatusBar({ dark = false }: { dark?: boolean }) {
  const fg = dark ? "#fff" : C.navy;
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px 2px", fontSize: 12, fontWeight: 600, color: fg, background: dark ? C.navy : "transparent" }}>
      <span>9:41</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <span style={{ fontSize: 11 }}>●●●</span>
        <span>WiFi</span>
        <span>⚡</span>
      </div>
    </div>
  );
}

// ── SCREENS ──────────────────────────────────────────────────────

function Screen1Splash() {
  return (
    <div style={{ height: "100%", background: C.navy, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, position: "relative" }}>
      <StatusBar dark />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 88, height: 88, background: C.indigo, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, boxShadow: "0 8px 32px rgba(79,95,240,0.4)" }}>
          <Zap size={44} color="#fff" fill="#fff" />
        </div>
        <div style={{ fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: -0.5, textAlign: "center" }}>Creator<br />Studio</div>
        <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginTop: 12, textAlign: "center", lineHeight: 1.5 }}>Where brands meet creators.<br />Collaborate. Create. Grow.</div>
        <div style={{ display: "flex", gap: 8, marginTop: 32 }}>
          {[C.indigo, "#fff", "rgba(255,255,255,0.3)"].map((c, i) => (
            <div key={i} style={{ width: i === 0 ? 24 : 8, height: 8, borderRadius: 4, background: c }} />
          ))}
        </div>
      </div>
      <div style={{ width: "100%", paddingBottom: 24 }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textAlign: "center", marginBottom: 16 }}>Trusted by 10,000+ brands & creators</div>
      </div>
    </div>
  );
}

function Screen2Onboarding({ n, headline, sub, img, last = false }: { n: number; headline: string; sub: string; img: string; last?: boolean }) {
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <img src={img} alt={headline} style={{ width: "100%", height: "55%", objectFit: "cover" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to bottom, transparent, " + C.bg + ")" }} />
      </div>
      <div style={{ padding: "0 28px 32px" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ height: 4, flex: i === n ? 2 : 1, borderRadius: 2, background: i === n ? C.indigo : C.border }} />
          ))}
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: C.navy, lineHeight: 1.2, marginBottom: 10 }}>{headline}</div>
        <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, marginBottom: 28 }}>{sub}</div>
        <div style={{ display: "flex", gap: 10 }}>
          <SecondaryBtn label="Skip" style={{ flex: 1, padding: "12px 0" }} />
          <PrimaryBtn label={last ? "Get Started" : "Next"} style={{ flex: 2, padding: "12px 0" }} />
        </div>
      </div>
    </div>
  );
}

function Screen5ChooseAccount() {
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <div style={{ padding: "20px 24px 0", flex: 1 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: C.navy, marginBottom: 8 }}>Join Creator Studio</div>
        <div style={{ fontSize: 14, color: C.muted, marginBottom: 32 }}>Choose how you want to use the platform</div>
        {[
          { icon: Briefcase, title: "Business / Brand", sub: "Post campaign requirements, view details, fund milestones", color: C.indigo },
          { icon: Star, title: "Creator", sub: "Find brand deals, submit content, grow your income", color: C.pink },
          { icon: MapPin, title: "Event Promoter", sub: "List local festivals, college gatherings, boutique openings", color: C.teal },
        ].map(({ icon: Icon, title, sub, color }) => (
          <div key={title} style={{ ...cardStyle, padding: 20, marginBottom: 16, border: `2px solid ${title === "Business" ? C.indigo : "transparent"}`, cursor: "pointer" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <Icon size={24} color={color} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 18, color: C.navy, marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{sub}</div>
            {title === "Business" && (
              <div style={{ marginTop: 12 }}>
                <span style={{ background: C.indigo, color: "#fff", fontSize: 11, fontWeight: 600, borderRadius: 20, padding: "3px 10px" }}>Selected</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ padding: "0 24px 32px" }}>
        <PrimaryBtn label="Continue" />
        <div style={{ textAlign: "center", fontSize: 13, color: C.muted, marginTop: 14 }}>Already have an account? <span style={{ color: C.indigo, fontWeight: 600 }}>Sign in</span></div>
      </div>
    </div>
  );
}

function Screen6Signup({ role }: { role: "Business" | "Creator" }) {
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <PhoneHeader title={`Create ${role} Account`} hasBack />
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "8px 24px" }}>
        {role === "Business" ? (
          <>
            <InputField label="Company Name" placeholder="Acme Brands Inc." />
            <InputField label="Email Address" placeholder="hello@acmebrands.com" type="email" />
            <InputField label="Phone Number" placeholder="+1 (555) 000-0000" type="tel" />
            <InputField label="Password" placeholder="Create a strong password" type="password" />
            <InputField label="Industry" placeholder="Fashion & Lifestyle" />
          </>
        ) : (
          <>
            <InputField label="Full Name" placeholder="Sophia Martinez" />
            <InputField label="Email Address" placeholder="sophia@gmail.com" type="email" />
            <InputField label="Phone Number" placeholder="+1 (555) 000-0000" type="tel" />
            <InputField label="Password" placeholder="Create a strong password" type="password" />
            <InputField label="Primary Niche" placeholder="Beauty & Skincare" />
          </>
        )}
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 20, lineHeight: 1.5 }}>
          By signing up, you agree to our <span style={{ color: C.indigo }}>Terms of Service</span> and <span style={{ color: C.indigo }}>Privacy Policy</span>.
        </div>
      </div>
      <div style={{ padding: "0 24px 32px" }}>
        <PrimaryBtn label="Create Account" />
        <div style={{ textAlign: "center", fontSize: 13, color: C.muted, marginTop: 14 }}>Already have an account? <span style={{ color: C.indigo, fontWeight: 600 }}>Sign in</span></div>
      </div>
    </div>
  );
}

function Screen8Login() {
  const [role, setRole] = useState<"Business" | "Creator">("Business");
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <div style={{ padding: "20px 24px 0", flex: 1 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: C.navy, marginBottom: 4 }}>Welcome back</div>
        <div style={{ fontSize: 14, color: C.muted, marginBottom: 24 }}>Sign in to your account</div>
        <div style={{ display: "flex", background: C.card, borderRadius: 12, padding: 4, marginBottom: 24, boxShadow: shadow }}>
          {(["Business", "Creator"] as const).map(r => (
            <button key={r} onClick={() => setRole(r)} style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, background: role === r ? C.indigo : "transparent", color: role === r ? "#fff" : C.muted }}>
              {r}
            </button>
          ))}
        </div>
        <InputField label="Email Address" placeholder="you@example.com" type="email" />
        <InputField label="Password" placeholder="Your password" type="password" />
        <div style={{ textAlign: "right", marginBottom: 20 }}>
          <span style={{ fontSize: 13, color: C.indigo, fontWeight: 600 }}>Forgot password?</span>
        </div>
        <PrimaryBtn label="Sign In" />
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: C.border }} />
          <span style={{ fontSize: 12, color: C.muted }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["G", "A"].map(s => (
            <button key={s} style={{ flex: 1, padding: "12px 0", borderRadius: 12, border: `1px solid ${C.border}`, background: C.card, fontWeight: 600, fontSize: 15, color: C.navy, cursor: "pointer" }}>{s}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 24px 32px", textAlign: "center", fontSize: 13, color: C.muted }}>
        New here? <span style={{ color: C.indigo, fontWeight: 600 }}>Create account</span>
      </div>
    </div>
  );
}

function Screen9HomeBusiness() {
  const reqs = [
    { title: "Summer Fashion Campaign", budget: "$2,500", apps: 14, status: "active" as const },
    { title: "Tech Unboxing Series", budget: "$1,800", apps: 7, status: "pending" as const },
    { title: "Skincare Launch", budget: "$3,200", apps: 22, status: "active" as const },
  ];
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ background: C.navy, padding: "10px 24px 20px" }}>
        <StatusBar dark />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
          <div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Good morning,</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Acme Brands 👋</div>
          </div>
          <div style={{ position: "relative" }}>
            <Bell size={22} color="#fff" />
            <div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, background: C.pink, borderRadius: "50%" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <StatCard label="Active Jobs" value="3" icon={Briefcase} color={C.indigo} />
          <StatCard label="Applicants" value="43" icon={Users} color={C.pink} />
          <StatCard label="Live Collabs" value="8" icon={Zap} color={C.green} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "16px 20px" }}>
        <div style={{ ...cardStyle, padding: 20, marginBottom: 16, background: `linear-gradient(135deg, ${C.indigo}, #7C3AED)`, borderRadius: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Post a New Requirement</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 14 }}>Find the perfect creator for your next campaign</div>
          <button style={{ background: "#fff", color: C.indigo, borderRadius: 10, padding: "10px 18px", fontWeight: 600, fontSize: 13, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <Plus size={16} /> Post Requirement
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: C.navy }}>Active Requirements</div>
          <span style={{ fontSize: 13, color: C.indigo, fontWeight: 600 }}>See all</span>
        </div>
        {reqs.map(r => (
          <div key={r.title} style={{ ...cardStyle, padding: 14, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, flex: 1, marginRight: 8 }}>{r.title}</div>
              <StatusPill status={r.status} />
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <span style={{ fontSize: 12, color: C.muted }}><DollarSign size={11} style={{ display: "inline" }} /> {r.budget}</span>
              <span style={{ fontSize: 12, color: C.muted }}><Users size={11} style={{ display: "inline" }} /> {r.apps} applicants</span>
            </div>
          </div>
        ))}
      </div>
      <BottomBar active={0} tabs={businessTabs} />
    </div>
  );
}

function Screen10SearchCreators() {
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <div style={{ padding: "8px 20px 12px" }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Find Creators</div>
        <div style={{ background: C.card, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, boxShadow: shadow, marginBottom: 14 }}>
          <Search size={18} color={C.muted} />
          <input placeholder="Search by name, niche, or platform..." style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: C.text, background: "transparent", fontFamily: "Inter, sans-serif" }} />
          <Filter size={16} color={C.indigo} />
        </div>
        <div style={{ overflowX: "auto" as const, display: "flex", gap: 8, paddingBottom: 4 }}>
          {["All", "Beauty", "Fashion", "Tech", "Food", "Fitness", "Travel"].map((f, i) => (
            <FilterChip key={f} label={f} active={i === 0} />
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "0 20px 12px", overflowX: "auto" as const }}>
        {[
          { label: "Location", icon: MapPin },
          { label: "Followers", icon: Users },
          { label: "Platform", icon: Instagram },
        ].map(({ label, icon: Icon }) => (
          <button key={label} style={{ display: "flex", alignItems: "center", gap: 6, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px", fontSize: 12, color: C.muted, cursor: "pointer", whiteSpace: "nowrap" as const }}>
            <Icon size={13} color={C.indigo} /> {label} <ChevronDown size={12} />
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "0 20px" }}>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>Showing 248 creators</div>
        {[
          { name: "Sophia Martinez", niche: "Beauty & Skincare", followers: "420K", rate: "850", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop", badge: true },
          { name: "Jake Thompson", niche: "Tech & Gadgets", followers: "185K", rate: "620", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop" },
          { name: "Priya Sharma", niche: "Fashion & Style", followers: "312K", rate: "750", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop", badge: true },
          { name: "Marcus Chen", niche: "Fitness & Health", followers: "95K", rate: "380", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" },
        ].map(c => <CreatorCard key={c.name} {...c} />)}
      </div>
      <BottomBar active={1} tabs={businessTabs} />
    </div>
  );
}

function Screen12CreatorProfile() {
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ background: C.navy, paddingBottom: 20 }}>
        <StatusBar dark />
        <PhoneHeader hasBack dark />
        <div style={{ padding: "0 24px", display: "flex", gap: 14, alignItems: "flex-end" }}>
          <div style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" alt="Sophia" style={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid " + C.pink }} />
            <span style={{ position: "absolute", bottom: 0, right: 0, background: C.pink, borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Star size={12} color="#fff" fill="#fff" />
            </span>
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Sophia Martinez</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Beauty & Skincare · Los Angeles</div>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              {[Instagram, Youtube, Twitter].map((Icon, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "4px 8px" }}>
                  <Icon size={14} color="#fff" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "16px 20px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Followers", value: "420K" },
            { label: "Avg. Views", value: "85K" },
            { label: "Eng. Rate", value: "6.2%" },
          ].map(({ label, value }) => (
            <div key={label} style={{ ...cardStyle, flex: 1, padding: "12px 8px", textAlign: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: C.navy }}>{value}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 8 }}>About</div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>Skincare enthusiast and beauty educator. I partner with brands that align with clean, sustainable beauty values. 5+ years creating authentic content.</div>
        </div>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 10 }}>Collaboration Rates</div>
          {[
            { type: "Instagram Post", rate: "$850" },
            { type: "Instagram Reel", rate: "$1,200" },
            { type: "YouTube Video", rate: "$2,500" },
            { type: "TikTok Video", rate: "$900" },
          ].map(({ type, rate }) => (
            <div key={type} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, marginBottom: 8, borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 13, color: C.muted }}>{type}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{rate}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "8px 20px 32px", display: "flex", gap: 10 }}>
        <SecondaryBtn label="View Rates" style={{ flex: 1 }} />
        <PrimaryBtn label="Message" style={{ flex: 1 }} />
      </div>
    </div>
  );
}

function Screen13RequirementDetails() {
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <PhoneHeader title="Requirement Details" hasBack />
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "8px 20px" }}>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: C.navy, flex: 1, marginRight: 8 }}>Summer Fashion Campaign</div>
            <StatusPill status="active" />
          </div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>Looking for fashion-forward creators to showcase our new summer collection across Instagram and TikTok.</div>
        </div>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 10 }}>Specifications</div>
          {[
            ["Budget", "$2,500"],
            ["Platform", "Instagram + TikTok"],
            ["Deliverables", "3 Posts + 2 Reels"],
            ["Followers Required", "50K – 500K"],
            ["Deadline", "July 30, 2026"],
            ["Category", "Fashion & Lifestyle"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, marginBottom: 8, borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 13, color: C.muted }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: C.navy }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 8 }}>Brand Notes</div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>Content should feel authentic and aspirational. No competitors. Must disclose partnership. Send portfolio for review.</div>
        </div>
        <PrimaryBtn label="View Applications (14)" />
      </div>
    </div>
  );
}

function Screen14Applications() {
  const [tab, setTab] = useState(0);
  const tabs = ["All (14)", "Review (6)", "Shortlisted (5)", "Rejected (3)"];
  const applicants = [
    { name: "Sophia Martinez", niche: "Beauty · 420K", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop", status: "review" as const },
    { name: "Priya Sharma", niche: "Fashion · 312K", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop", status: "active" as const },
    { name: "Aisha Nwosu", niche: "Lifestyle · 210K", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop", status: "pending" as const },
    { name: "Marco Rossi", niche: "Fashion · 180K", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop", status: "rejected" as const },
  ];
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <PhoneHeader title="Applications" hasBack />
      <div style={{ overflowX: "auto" as const, display: "flex", gap: 0, padding: "0 20px 12px", borderBottom: `1px solid ${C.border}` }}>
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{ padding: "8px 14px", border: "none", background: "transparent", cursor: "pointer", fontSize: 13, fontWeight: tab === i ? 700 : 400, color: tab === i ? C.indigo : C.muted, borderBottom: `2px solid ${tab === i ? C.indigo : "transparent"}`, whiteSpace: "nowrap" as const }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "12px 20px" }}>
        {applicants.map(a => (
          <div key={a.name} style={{ ...cardStyle, padding: 14, marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <img src={a.img} alt={a.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: C.navy }}>{a.name}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{a.niche}</div>
            </div>
            <StatusPill status={a.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Screen15Chat() {
  const msgs = [
    { from: "them", text: "Hi! I saw your summer campaign requirement and I'd love to collaborate!", time: "10:24 AM" },
    { from: "me", text: "Hey Sophia! Your portfolio looks great. Can you share your media kit?", time: "10:26 AM" },
    { from: "them", text: "Of course! I'll send it over. Also, my rates for Instagram Reels start at $1,200.", time: "10:28 AM" },
    { from: "me", text: "That works for our budget. Let's discuss the deliverables.", time: "10:31 AM" },
    { from: "them", text: "Sure! I can do 2 Reels and 3 Posts over 3 weeks. Would that work?", time: "10:33 AM" },
  ];
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ background: C.navy }}>
        <StatusBar dark />
        <div style={{ padding: "8px 20px 12px", display: "flex", alignItems: "center", gap: 12 }}>
          <ChevronLeft size={22} color="#fff" />
          <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop" alt="Sophia" style={{ width: 38, height: 38, borderRadius: "50%" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 15, color: "#fff" }}>Sophia Martinez</div>
            <div style={{ fontSize: 11, color: C.green }}>● Online</div>
          </div>
          <MoreHorizontal size={20} color="#fff" />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "12px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start" }}>
            <div>
              <div style={{
                background: m.from === "me" ? C.indigo : C.card,
                color: m.from === "me" ? "#fff" : C.navy,
                borderRadius: m.from === "me" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                padding: "10px 14px",
                fontSize: 13,
                maxWidth: 240,
                lineHeight: 1.5,
                boxShadow: shadow,
              }}>{m.text}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 3, textAlign: m.from === "me" ? "right" : "left" }}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "8px 16px 24px", background: C.card, borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
        <Paperclip size={20} color={C.muted} />
        <div style={{ flex: 1, background: C.bg, borderRadius: 24, padding: "10px 14px", fontSize: 13, color: C.muted }}>Type a message...</div>
        <div style={{ width: 38, height: 38, background: C.indigo, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Send size={16} color="#fff" />
        </div>
      </div>
    </div>
  );
}

function Screen16Agreement() {
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <PhoneHeader title="Collaboration Agreement" hasBack />
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "8px 20px" }}>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 12 }}>Parties Involved</div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ width: 44, height: 44, background: C.indigoLight, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}>
                <Briefcase size={22} color={C.indigo} />
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.navy }}>Acme Brands</div>
              <div style={{ fontSize: 11, color: C.muted }}>Business</div>
            </div>
            <ArrowRight size={20} color={C.muted} />
            <div style={{ flex: 1, textAlign: "center" }}>
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop" alt="Sophia" style={{ width: 44, height: 44, borderRadius: "50%", margin: "0 auto 6px", display: "block" }} />
              <div style={{ fontSize: 12, fontWeight: 600, color: C.navy }}>Sophia Martinez</div>
              <div style={{ fontSize: 11, color: C.muted }}>Creator</div>
            </div>
          </div>
        </div>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 10 }}>Deliverables</div>
          {[
            { item: "2 × Instagram Reels", deadline: "Jul 15 & Jul 22" },
            { item: "3 × Instagram Posts", deadline: "Jul 18, 24, 28" },
            { item: "Instagram Stories", deadline: "Ongoing" },
          ].map(({ item, deadline }) => (
            <div key={item} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, marginBottom: 8, borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 13, color: C.muted }}>{item}</span>
              <span style={{ fontSize: 12, color: C.navy, fontWeight: 500 }}>{deadline}</span>
            </div>
          ))}
        </div>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 10 }}>Payment Terms</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: C.muted }}>Total Amount</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: C.navy }}>$2,500</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, color: C.muted }}>50% upfront · 50% on delivery</span>
            <span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>Escrow Protected</span>
          </div>
        </div>
      </div>
      <div style={{ padding: "0 20px 32px", display: "flex", gap: 10 }}>
        <SecondaryBtn label="Request Changes" style={{ flex: 1 }} />
        <PrimaryBtn label="Accept Agreement" style={{ flex: 1.5 }} />
      </div>
    </div>
  );
}

function Screen17ContentSubmission() {
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <PhoneHeader title="Submit Content" hasBack />
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "8px 20px" }}>
        <div style={{ ...cardStyle, marginBottom: 12, overflow: "hidden" }}>
          <div style={{ background: C.muted + "15", height: 140, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderBottom: `2px dashed ${C.border}` }}>
            <Upload size={32} color={C.indigo} />
            <div style={{ fontSize: 14, fontWeight: 600, color: C.navy, marginTop: 8 }}>Upload Files</div>
            <div style={{ fontSize: 12, color: C.muted }}>MP4, MOV, JPG up to 500MB</div>
          </div>
          <div style={{ padding: 14 }}>
            <div style={{ display: "flex", gap: 10, overflowX: "auto" as const }}>
              {["reel1.mp4", "post1.jpg", "story.mp4"].map(f => (
                <div key={f} style={{ flexShrink: 0, background: C.indigoLight, borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                  <Play size={12} color={C.indigo} />
                  <span style={{ fontSize: 11, color: C.indigo, fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 10 }}>Content Details</div>
          <InputField label="Caption / Description" placeholder="Write your post caption here..." />
          <InputField label="Scheduled Post Date" placeholder="July 15, 2026" />
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.navy, display: "block", marginBottom: 6 }}>Hashtags</label>
            <div style={{ background: C.bg, borderRadius: 10, padding: "10px 14px", border: `1px solid ${C.border}`, fontSize: 13, color: C.indigo }}>
              #summerfashion #ootd #acmebrands #styleinspo
            </div>
          </div>
        </div>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 8 }}>Submission Notes</div>
          <textarea placeholder="Any notes for the brand..." style={{ width: "100%", border: "none", outline: "none", background: "transparent", fontSize: 13, color: C.muted, resize: "none" as const, fontFamily: "Inter, sans-serif", height: 60 }} />
        </div>
      </div>
      <div style={{ padding: "0 20px 32px" }}>
        <PrimaryBtn label="Submit for Review" />
      </div>
    </div>
  );
}

function Screen18ReviewApproval() {
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <PhoneHeader title="Review Content" hasBack />
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "8px 20px" }}>
        <div style={{ ...cardStyle, marginBottom: 12, overflow: "hidden", borderRadius: 16 }}>
          <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop" alt="Content preview" style={{ width: "100%", height: 200, objectFit: "cover" }} />
          <div style={{ padding: 14 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 4 }}>Summer Collection Reel #1</div>
            <div style={{ fontSize: 12, color: C.muted }}>Submitted Jul 12, 2026 · 14.2 MB</div>
          </div>
        </div>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 8 }}>Caption</div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>Summer is calling and I am answering ☀️ Check out @AcmeBrands new collection — link in bio! #summerfashion #ootd #ad</div>
        </div>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 10 }}>Brand Feedback</div>
          <textarea placeholder="Add your feedback here..." defaultValue="Love the lighting and styling! Could you add a close-up of the label in the second clip?" style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: C.text, fontFamily: "Inter, sans-serif", resize: "none" as const, height: 70, outline: "none", background: C.bg }} />
        </div>
      </div>
      <div style={{ padding: "0 20px 32px", display: "flex", gap: 10 }}>
        <SecondaryBtn label="Request Changes" style={{ flex: 1 }} />
        <PrimaryBtn label="Approve" style={{ flex: 1 }} />
      </div>
    </div>
  );
}

function Screen19Payment() {
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <StatusBar />
      <PhoneHeader title="Payment" hasBack />
      <div style={{ flex: 1, overflowY: "auto" as const, width: "100%", padding: "8px 20px" }}>
        <div style={{ ...cardStyle, padding: 24, marginBottom: 16, textAlign: "center", borderRadius: 20 }}>
          <div style={{ width: 72, height: 72, background: C.green + "15", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <CheckCircle size={36} color={C.green} />
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: C.navy }}>Payment Sent!</div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>Funds are in escrow and will be released to Sophia upon content approval.</div>
          <div style={{ fontSize: 36, fontWeight: 800, color: C.indigo, marginTop: 16 }}>$1,250</div>
          <div style={{ fontSize: 12, color: C.muted }}>50% Milestone Payment</div>
        </div>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 10 }}>Breakdown</div>
          {[
            ["Campaign Total", "$2,500"],
            ["Platform Fee (5%)", "-$125"],
            ["This Payment", "$1,250"],
            ["Remaining Balance", "$1,250"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, marginBottom: 8, borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 13, color: C.muted }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: k === "This Payment" ? C.indigo : C.navy }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <SecondaryBtn label="Download Invoice" style={{ flex: 1 }} />
          <PrimaryBtn label="Done" style={{ flex: 1 }} />
        </div>
      </div>
    </div>
  );
}

function Screen20HomeCreator() {
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ background: C.navy, paddingBottom: 16 }}>
        <StatusBar dark />
        <div style={{ padding: "4px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Hello,</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Sophia ✨</div>
          </div>
          <div style={{ position: "relative" }}>
            <Bell size={22} color="#fff" />
            <div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, background: C.pink, borderRadius: "50%" }} />
          </div>
        </div>
        <div style={{ margin: "12px 20px 0", background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Profile Completion</span>
            <span style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>78%</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 4, height: 6 }}>
            <div style={{ background: C.pink, width: "78%", height: "100%", borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Add portfolio to reach 100%</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "12px 20px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <StatCard label="Applications" value="12" icon={Briefcase} color={C.indigo} />
          <StatCard label="Active Collabs" value="3" icon={Zap} color={C.pink} />
          <StatCard label="Earnings" value="$4.2K" icon={DollarSign} color={C.green} />
        </div>
        <div style={{ fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 10 }}>Matching Opportunities</div>
        {[
          { brand: "Glow Beauty", budget: "$900–1,200", type: "Instagram Reel", tag: "Beauty" },
          { brand: "FitLife Co.", budget: "$600–800", type: "TikTok Video", tag: "Fitness" },
          { brand: "Urban Threads", budget: "$1,100–1,500", type: "Instagram Post", tag: "Fashion" },
        ].map(({ brand, budget, type, tag }) => (
          <div key={brand} style={{ ...cardStyle, padding: 14, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: C.navy }}>{brand}</div>
              <span style={{ background: C.pinkLight, color: C.pink, fontSize: 11, fontWeight: 600, borderRadius: 20, padding: "3px 10px" }}>{tag}</span>
            </div>
            <div style={{ fontSize: 12, color: C.muted }}>{type} · {budget}</div>
            <button style={{ marginTop: 10, background: C.indigoLight, color: C.indigo, border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Apply Now</button>
          </div>
        ))}
      </div>
      <BottomBar active={0} tabs={creatorTabs} />
    </div>
  );
}

function Screen21MyCollaborations() {
  const [tab, setTab] = useState(0);
  const collabs = [
    { brand: "Acme Brands", type: "Summer Campaign", status: "active" as const, due: "Jul 22", amount: "$2,500" },
    { brand: "Glow Beauty", type: "Skincare Launch", status: "review" as const, due: "Jul 15", amount: "$900" },
    { brand: "TechHub", type: "Product Unbox", status: "completed" as const, due: "Jun 30", amount: "$620" },
    { brand: "FitLife", type: "Workout Series", status: "pending" as const, due: "Aug 5", amount: "$780" },
  ];
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <div style={{ padding: "8px 20px 0", fontWeight: 700, fontSize: 20, color: C.navy }}>My Collaborations</div>
      <div style={{ overflowX: "auto" as const, display: "flex", padding: "10px 20px", gap: 0, borderBottom: `1px solid ${C.border}` }}>
        {["All", "Active", "In Review", "Completed"].map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{ padding: "8px 14px", border: "none", background: "transparent", cursor: "pointer", fontSize: 13, fontWeight: tab === i ? 700 : 400, color: tab === i ? C.indigo : C.muted, borderBottom: `2px solid ${tab === i ? C.indigo : "transparent"}`, whiteSpace: "nowrap" as const }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "12px 20px" }}>
        {collabs.map(c => (
          <div key={c.brand} style={{ ...cardStyle, padding: 14, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: C.navy }}>{c.brand}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{c.type}</div>
              </div>
              <StatusPill status={c.status} />
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
              <span style={{ fontSize: 12, color: C.muted }}><Clock size={10} style={{ display: "inline" }} /> Due {c.due}</span>
              <span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>{c.amount}</span>
            </div>
          </div>
        ))}
      </div>
      <BottomBar active={1} tabs={creatorTabs} />
    </div>
  );
}

function Screen22Earnings() {
  const data = [
    { month: "Jan", amount: 800 },
    { month: "Feb", amount: 1200 },
    { month: "Mar", amount: 950 },
    { month: "Apr", amount: 1800 },
    { month: "May", amount: 1400 },
    { month: "Jun", amount: 2200 },
    { month: "Jul", amount: 1650 },
  ];
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ background: C.navy, paddingBottom: 20 }}>
        <StatusBar dark />
        <div style={{ padding: "4px 24px" }}>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Total Earnings</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#fff" }}>$10,000</div>
          <div style={{ fontSize: 12, color: C.green, marginTop: 4 }}>↑ 24% from last month</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "12px 20px" }}>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 12 }}>Monthly Earnings</div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={data} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: C.muted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="amount" fill={C.indigo} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <StatCard label="This Month" value="$1,650" icon={TrendingUp} color={C.indigo} />
          <StatCard label="Pending" value="$900" icon={Clock} color={C.amber} />
          <StatCard label="Withdrawn" value="$8,350" icon={CheckCircle} color={C.green} />
        </div>
        <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 10 }}>Recent Transactions</div>
        {[
          { brand: "Acme Brands", type: "Milestone 1", amount: "+$1,250", date: "Jul 10", color: C.green },
          { brand: "Glow Beauty", type: "Campaign", amount: "+$900", date: "Jun 28", color: C.green },
          { brand: "Platform Fee", type: "Deduction", amount: "-$50", date: "Jun 28", color: C.red },
          { brand: "TechHub", type: "Final Payment", amount: "+$620", date: "Jun 22", color: C.green },
        ].map(({ brand, type, amount, date, color }) => (
          <div key={brand + date} style={{ ...cardStyle, padding: 12, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: C.navy }}>{brand}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{type} · {date}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color }}>{amount}</div>
          </div>
        ))}
      </div>
      <BottomBar active={3} tabs={creatorTabs} />
    </div>
  );
}

function Screen23ProfileCreator() {
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <PhoneHeader title="Edit Profile" hasBack />
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "8px 20px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 20 }}>
          <div style={{ position: "relative", marginBottom: 12 }}>
            <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop" alt="Sophia" style={{ width: 80, height: 80, borderRadius: "50%", border: `3px solid ${C.pink}` }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, background: C.indigo, borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Camera size={12} color="#fff" />
            </div>
          </div>
          <div style={{ fontWeight: 700, fontSize: 18, color: C.navy }}>Sophia Martinez</div>
          <span style={{ background: C.pinkLight, color: C.pink, fontSize: 11, fontWeight: 600, borderRadius: 20, padding: "3px 10px", marginTop: 4 }}>Top Creator</span>
        </div>
        <InputField label="Full Name" placeholder="" value="Sophia Martinez" />
        <InputField label="Username" placeholder="" value="@sophiamartinez" />
        <InputField label="Bio" placeholder="Tell brands about yourself..." value="Skincare enthusiast & beauty educator" />
        <InputField label="Primary Niche" placeholder="" value="Beauty & Skincare" />
        <InputField label="Location" placeholder="" value="Los Angeles, CA" />
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 10 }}>Social Platforms</div>
          {[
            { icon: Instagram, handle: "@sophiamartinez", followers: "420K" },
            { icon: Youtube, handle: "Sophia Beauty", followers: "85K" },
            { icon: Twitter, handle: "@sophia_m", followers: "32K" },
          ].map(({ icon: Icon, handle, followers }) => (
            <div key={handle} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, background: C.indigoLight, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={18} color={C.indigo} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{handle}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{followers} followers</div>
              </div>
              <Edit3 size={14} color={C.muted} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 20px 32px" }}>
        <PrimaryBtn label="Save Changes" />
      </div>
      <BottomBar active={4} tabs={creatorTabs} />
    </div>
  );
}

function Screen24Notifications() {
  const groups = [
    {
      label: "Today",
      items: [
        { icon: DollarSign, color: C.green, title: "Payment received", sub: "Acme Brands sent you $1,250", time: "2h ago" },
        { icon: MessageCircle, color: C.indigo, title: "New message", sub: "Urban Threads: Are you available for August?", time: "4h ago" },
        { icon: CheckCircle, color: C.green, title: "Content approved", sub: "Glow Beauty approved your Reel", time: "6h ago" },
      ],
    },
    {
      label: "Yesterday",
      items: [
        { icon: Star, color: C.pink, title: "New opportunity match", sub: "FitLife Co. is looking for creators like you", time: "1d ago" },
        { icon: AlertCircle, color: C.amber, title: "Content revision", sub: "TechHub requested changes on Post #2", time: "1d ago" },
        { icon: Award, color: C.indigo, title: "Badge earned", sub: "You earned Top Creator badge!", time: "1d ago" },
      ],
    },
  ];
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <div style={{ padding: "8px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 20, color: C.navy }}>Notifications</div>
        <span style={{ fontSize: 13, color: C.indigo, fontWeight: 600 }}>Mark all read</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "0 20px" }}>
        {groups.map(g => (
          <div key={g.label}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 8, marginTop: 4 }}>{g.label}</div>
            {g.items.map(n => (
              <div key={n.title} style={{ ...cardStyle, padding: 14, marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: n.color + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <n.icon size={20} color={n.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: C.navy }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2, lineHeight: 1.4 }}>{n.sub}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{n.time}</div>
                </div>
                <div style={{ width: 8, height: 8, background: C.indigo, borderRadius: "50%", marginTop: 4, flexShrink: 0 }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Screen25Settings() {
  const groups = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Personal Information" },
        { icon: Shield, label: "Privacy & Security" },
        { icon: Bell, label: "Notification Preferences" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: DollarSign, label: "Payment Methods" },
        { icon: Flag, label: "Language & Region" },
        { icon: Eye, label: "Visibility Settings" },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center" },
        { icon: MessageCircle, label: "Contact Support" },
        { icon: FileText, label: "Terms & Privacy" },
      ],
    },
  ];
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <div style={{ padding: "8px 20px 0", fontWeight: 700, fontSize: 20, color: C.navy }}>Settings</div>
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "12px 20px" }}>
        <div style={{ ...cardStyle, padding: "4px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop" alt="Profile" style={{ width: 52, height: 52, borderRadius: "50%", margin: "12px 0" }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.navy }}>Sophia Martinez</div>
            <div style={{ fontSize: 12, color: C.muted }}>sophia@gmail.com</div>
          </div>
        </div>
        {groups.map(g => (
          <div key={g.title} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 8, textTransform: "uppercase" as const, letterSpacing: 0.5 }}>{g.title}</div>
            <div style={{ ...cardStyle, overflow: "hidden" }}>
              {g.items.map((item, i) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < g.items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ width: 34, height: 34, background: C.indigoLight, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <item.icon size={17} color={C.indigo} />
                  </div>
                  <span style={{ flex: 1, fontSize: 14, color: C.navy }}>{item.label}</span>
                  <ChevronRight size={16} color={C.muted} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button style={{ width: "100%", padding: "14px 0", borderRadius: 12, border: "none", background: "#FEE2E2", color: C.red, fontWeight: 600, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </div>
  );
}

function Screen26HomeUser() {
  const events = [
    { title: "Symbiosis Cultural Fest 2026", budget: "Collab Only", interested: 6, status: "Active" },
    { title: "Boutique Grand Opening - Jaipur", budget: "₹15,000", interested: 2, status: "Active" },
  ];
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ background: C.navy, padding: "10px 24px 20px" }}>
        <StatusBar dark />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
          <div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Good morning,</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Aditya Verma 👋</div>
          </div>
          <div style={{ position: "relative" }}>
            <Bell size={22} color="#fff" />
            <div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, background: C.pink, borderRadius: "50%" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <StatCard label="Active Events" value="2" icon={Briefcase} color={C.teal} />
          <StatCard label="Total Budget" value="₹35,000" icon={DollarSign} color={C.indigo} />
          <StatCard label="Interested Creators" value="8" icon={Users} color={C.pink} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "16px 20px" }}>
        <div style={{ ...cardStyle, padding: 20, marginBottom: 16, background: `linear-gradient(135deg, ${C.teal}, #0D9488)`, borderRadius: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Host a New Event / Fest</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 14 }}>List fests, store openings, fests and invite local creators.</div>
          <button style={{ background: "#fff", color: C.teal, borderRadius: 10, padding: "10px 18px", fontWeight: 600, fontSize: 13, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <Plus size={16} /> Post Event
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: C.navy }}>Active Events</div>
          <span style={{ fontSize: 13, color: C.indigo, fontWeight: 600 }}>See all</span>
        </div>
        {events.map(e => (
          <div key={e.title} style={{ ...cardStyle, padding: 14, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, flex: 1, marginRight: 8 }}>{e.title}</div>
              <span style={{ background: C.teal + "15", color: C.teal, fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 8 }}>{e.status}</span>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <span style={{ fontSize: 12, color: C.muted }}><DollarSign size={11} style={{ display: "inline" }} /> {e.budget}</span>
              <span style={{ fontSize: 12, color: C.muted }}><Users size={11} style={{ display: "inline" }} /> {e.interested} interested</span>
            </div>
          </div>
        ))}
      </div>
      <BottomBar active={0} tabs={businessTabs} />
    </div>
  );
}

function Screen27EventDetailsUser() {
  const interestedCreators = [
    { name: "Sophia Martinez", niche: "Beauty · 420K", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop" },
    { name: "Priya Sharma", niche: "Fashion · 312K", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop" },
    { name: "Arjun Fitness", niche: "Fitness · 520K", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop" }
  ];
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <StatusBar />
      <PhoneHeader title="Event Details" hasBack />
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "8px 20px" }}>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: C.navy, flex: 1, marginRight: 8 }}>Symbiosis Cultural Fest 2026</div>
            <span style={{ background: C.teal + "15", color: C.teal, fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 8 }}>Live</span>
          </div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>Hosting our annual college cultural fest with 5,000+ attendees. Looking for lifestyle, music, and comedy creators to attend and create content. Hospitality covered.</div>
        </div>
        <div style={{ ...cardStyle, padding: 16, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: C.navy, marginBottom: 10 }}>Specifications</div>
          {[
            ["Budget", "Collab Only"],
            ["Location", "Symbiosis Campus, Pune"],
            ["Event Date", "August 22, 2026"],
            ["Niche Wanted", "Lifestyle, Music, Comedy"],
            ["Expected Reach", "50K+ combined"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, marginBottom: 8, borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 13, color: C.muted }}>{k}</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: C.navy }}>{v}</span>
            </div>
          ))}
        </div>
        
        <div style={{ fontWeight: 700, fontSize: 15, color: C.navy, marginBottom: 10, marginTop: 14 }}>Interested Creators ({interestedCreators.length})</div>
        {interestedCreators.map(c => (
          <div key={c.name} style={{ ...cardStyle, padding: 14, marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <img src={c.img} alt={c.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: C.navy }}>{c.name}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{c.niche}</div>
            </div>
            <button style={{ background: C.indigo, color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Invite</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Screen28PlatformDashboard() {
  const disputes = [
    { dealId: "d2", creator: "Priya Sharma", brand: "boAt Lifestyle", amount: "₹22,000", reason: "Delayed delivery", date: "1h ago" },
    { dealId: "d5", creator: "Arjun Fitness", brand: "Zomato Local", amount: "₹18,000", reason: "Incomplete brief", date: "Yesterday" }
  ];
  return (
    <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
      <div style={{ background: C.navy, padding: "10px 24px 20px" }}>
        <StatusBar dark />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
          <div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Control Panel,</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>Platform Operator 🛡️</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <StatCard label="Total Users" value="1.2K" icon={Users} color={C.indigo} />
          <StatCard label="Platform GMV" value="₹12.4L" icon={DollarSign} color={C.green} />
          <StatCard label="Disputes" value="2" icon={AlertCircle} color={C.red} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" as const, padding: "16px 20px" }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: C.navy, marginBottom: 12 }}>Pending Disputes</div>
        {disputes.map(d => (
          <div key={d.dealId} style={{ ...cardStyle, padding: 14, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: C.navy }}>Dispute: Deal #{d.dealId}</div>
              <span style={{ background: C.red + "15", color: C.red, fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 8 }}>Review</span>
            </div>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 8 }}>
              Between <span style={{ fontWeight: 600 }}>{d.creator}</span> & <span style={{ fontWeight: 600 }}>{d.brand}</span> (Value: {d.amount})
            </div>
            <div style={{ fontSize: 12, color: C.red, marginBottom: 10 }}>Reason: {d.reason} • {d.date}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ flex: 1, background: C.green, color: "#fff", border: "none", borderRadius: 8, padding: "8px 0", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Release to Creator</button>
              <button style={{ flex: 1, background: C.red, color: "#fff", border: "none", borderRadius: 8, padding: "8px 0", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Refund Brand</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Screen registry ───────────────────────────────────────────────

type ScreenEntry = { id: number; label: string; group: "Shared" | "Business Flow" | "Creator Flow"; component: React.ReactNode };

const SCREENS: ScreenEntry[] = [
  {
    id: 1, label: "Splash", group: "Shared",
    component: <Screen1Splash />,
  },
  {
    id: 2, label: "Onboarding 1", group: "Shared",
    component: <Screen2Onboarding n={1} headline="Find the Perfect Creator Match" sub="Connect with thousands of authentic creators who align with your brand values and audience." img="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=400&fit=crop" />,
  },
  {
    id: 3, label: "Onboarding 2", group: "Shared",
    component: <Screen2Onboarding n={2} headline="Manage Campaigns Effortlessly" sub="Track applications, review content, approve deliverables — all in one place with zero hassle." img="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop" />,
  },
  {
    id: 4, label: "Onboarding 3", group: "Shared",
    component: <Screen2Onboarding n={3} last headline="Get Paid, Grow Your Brand" sub="Secure payments, transparent agreements, and data-driven insights to scale your collaborations." img="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=400&fit=crop" />,
  },
  {
    id: 5, label: "Choose Account", group: "Shared",
    component: <Screen5ChooseAccount />,
  },
  {
    id: 6, label: "Signup – Business", group: "Business Flow",
    component: <Screen6Signup role="Business" />,
  },
  {
    id: 7, label: "Signup – Creator", group: "Creator Flow",
    component: <Screen6Signup role="Creator" />,
  },
  {
    id: 8, label: "Login", group: "Shared",
    component: <Screen8Login />,
  },
  {
    id: 9, label: "Home – Business", group: "Business Flow",
    component: <Screen9HomeBusiness />,
  },
  {
    id: 10, label: "Search Creators", group: "Business Flow",
    component: <Screen10SearchCreators />,
  },
  {
    id: 11, label: "Creator List", group: "Business Flow",
    component: (
      <div style={{ height: "100%", background: C.bg, display: "flex", flexDirection: "column" }}>
        <StatusBar />
        <div style={{ padding: "8px 20px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: C.navy }}>Beauty Creators</div>
          <span style={{ fontSize: 13, color: C.muted }}>248 results</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto" as const, padding: "0 20px" }}>
          {[
            { name: "Sophia Martinez", niche: "Beauty & Skincare", followers: "420K", rate: "850", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop", badge: true },
            { name: "Priya Sharma", niche: "Makeup & Style", followers: "312K", rate: "750", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop", badge: true },
            { name: "Aisha Nwosu", niche: "Natural Beauty", followers: "210K", rate: "580", img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop" },
            { name: "Chloe Park", niche: "K-Beauty", followers: "178K", rate: "490", img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=80&h=80&fit=crop" },
            { name: "Isabella Cruz", niche: "Drugstore Beauty", followers: "95K", rate: "280", img: "https://images.unsplash.com/photo-1484863137850-59afcfe05386?w=80&h=80&fit=crop" },
          ].map(c => <CreatorCard key={c.name} {...c} />)}
        </div>
        <BottomBar active={1} tabs={businessTabs} />
      </div>
    ),
  },
  {
    id: 12, label: "Creator Profile", group: "Business Flow",
    component: <Screen12CreatorProfile />,
  },
  {
    id: 13, label: "Requirement Details", group: "Business Flow",
    component: <Screen13RequirementDetails />,
  },
  {
    id: 14, label: "Applications", group: "Business Flow",
    component: <Screen14Applications />,
  },
  {
    id: 15, label: "Chat", group: "Shared",
    component: <Screen15Chat />,
  },
  {
    id: 16, label: "Collab Agreement", group: "Shared",
    component: <Screen16Agreement />,
  },
  {
    id: 17, label: "Content Submission", group: "Creator Flow",
    component: <Screen17ContentSubmission />,
  },
  {
    id: 18, label: "Review & Approval", group: "Business Flow",
    component: <Screen18ReviewApproval />,
  },
  {
    id: 19, label: "Payment", group: "Shared",
    component: <Screen19Payment />,
  },
  {
    id: 20, label: "Home – Creator", group: "Creator Flow",
    component: <Screen20HomeCreator />,
  },
  {
    id: 21, label: "My Collaborations", group: "Creator Flow",
    component: <Screen21MyCollaborations />,
  },
  {
    id: 22, label: "Earnings", group: "Creator Flow",
    component: <Screen22Earnings />,
  },
  {
    id: 23, label: "Profile – Creator", group: "Creator Flow",
    component: <Screen23ProfileCreator />,
  },
  {
    id: 24, label: "Notifications", group: "Shared",
    component: <Screen24Notifications />,
  },
  {
    id: 25, label: "Settings", group: "Shared",
    component: <Screen25Settings />,
  },
  {
    id: 26, label: "Home – Promoter", group: "Shared",
    component: <Screen26HomeUser />,
  },
  {
    id: 27, label: "Event Details", group: "Shared",
    component: <Screen27EventDetailsUser />,
  },
  {
    id: 28, label: "Platform Operator Dashboard", group: "Shared",
    component: <Screen28PlatformDashboard />,
  },
];

const GROUPS = ["Shared", "Business Flow", "Creator Flow"] as const;
const GROUP_COLORS: Record<string, string> = {
  Shared: C.navy,
  "Business Flow": C.indigo,
  "Creator Flow": C.pink,
};

// ── Responsive hook ───────────────────────────────────────────────

function useViewport() {
  const [vw, setVw] = useState(window.innerWidth);
  const [vh, setVh] = useState(window.innerHeight);
  useEffect(() => {
    const onResize = () => { setVw(window.innerWidth); setVh(window.innerHeight); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return { vw, vh };
}

// ── Main App ──────────────────────────────────────────────────────

export default function App() {
  const [current, setCurrent] = useState(0);
  const { vw, vh } = useViewport();

  // Sidebar: always open on wide screens, closed by default on narrow
  const isWide = vw >= 900;
  const [sidebarOpen, setSidebarOpen] = useState(isWide);
  useEffect(() => { setSidebarOpen(vw >= 900); }, [vw >= 900]);

  const isMobile = vw < 600;
  const screen = SCREENS[current];

  const go = (dir: -1 | 1) => {
    setCurrent(c => Math.max(0, Math.min(SCREENS.length - 1, c + dir)));
  };

  // Phone frame: native size 430×932. Scale to fit available space.
  const PHONE_W = 430;
  const PHONE_H = 932;
  const TOP_BAR = 52;
  const DOTS_H = 48;
  const SIDE_W = sidebarOpen && isWide ? 240 : 0;
  const availW = vw - SIDE_W - (isMobile ? 16 : 48);
  const availH = vh - TOP_BAR - DOTS_H - 32;
  const scale = Math.min(1, availW / PHONE_W, availH / PHONE_H);

  return (
    <div style={{ height: "100vh", background: "#0D1526", display: "flex", fontFamily: "Inter, system-ui, sans-serif", overflow: "hidden", position: "relative" }}>

      {/* Mobile overlay backdrop */}
      {sidebarOpen && !isWide && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 20 }}
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          position: isWide ? "relative" : "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 30,
          width: 240,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.25s ease",
          background: "#0B1437",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: C.indigo, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={17} color="#fff" fill="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>Creator Studio</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>25 screens · UI Prototype</div>
            </div>
          </div>
          {!isWide && (
            <button onClick={() => setSidebarOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", padding: 4 }}>
              <X size={16} />
            </button>
          )}
        </div>
        <div style={{ flex: 1, overflowY: "auto" as const, padding: "8px 0" }}>
          {GROUPS.map(group => {
            const items = SCREENS.filter(s => s.group === group);
            return (
              <div key={group} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", padding: "8px 16px 4px", letterSpacing: 0.5, textTransform: "uppercase" as const, display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: GROUP_COLORS[group] }} />
                  {group}
                </div>
                {items.map(s => {
                  const globalIdx = SCREENS.indexOf(s);
                  const isActive = globalIdx === current;
                  return (
                    <button
                      key={s.id}
                      onClick={() => { setCurrent(globalIdx); if (!isWide) setSidebarOpen(false); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 10, width: "100%",
                        padding: "8px 16px",
                        background: isActive ? "rgba(79,95,240,0.15)" : "transparent",
                        border: "none", cursor: "pointer",
                        borderLeft: `3px solid ${isActive ? C.indigo : "transparent"}`,
                        textAlign: "left" as const,
                      }}
                    >
                      <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.25)", minWidth: 20 }}>{s.id}</span>
                      <span style={{ fontSize: 13, color: isActive ? "#fff" : "rgba(255,255,255,0.55)", fontWeight: isActive ? 600 : 400 }}>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main canvas */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", minHeight: 0, position: "relative", overflow: "hidden" }}>

        {/* Top bar */}
        <div style={{ width: "100%", display: "flex", alignItems: "center", padding: "10px 16px", gap: 10, flexShrink: 0, height: TOP_BAR }}>
          <button
            onClick={() => setSidebarOpen(o => !o)}
            style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "#fff", display: "flex", flexShrink: 0 }}
          >
            {sidebarOpen && isWide ? <X size={16} /> : <BarChart2 size={16} />}
          </button>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", minWidth: 0, overflow: "hidden", whiteSpace: "nowrap" as const, textOverflow: "ellipsis" }}>
            <span style={{ color: GROUP_COLORS[screen.group], fontWeight: 600 }}>{screen.group}</span>
            <span style={{ margin: "0 5px" }}>›</span>
            <span style={{ color: "rgba(255,255,255,0.8)" }}>{screen.label}</span>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
            <button onClick={() => go(-1)} disabled={current === 0} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, padding: "6px 8px", cursor: current === 0 ? "not-allowed" : "pointer", color: current === 0 ? "rgba(255,255,255,0.2)" : "#fff", display: "flex" }}>
              <ChevronLeft size={15} />
            </button>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", padding: "0 2px" }}>{current + 1}/{SCREENS.length}</span>
            <button onClick={() => go(1)} disabled={current === SCREENS.length - 1} style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 8, padding: "6px 8px", cursor: current === SCREENS.length - 1 ? "not-allowed" : "pointer", color: current === SCREENS.length - 1 ? "rgba(255,255,255,0.2)" : "#fff", display: "flex" }}>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Scaled phone frame */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0 }}>
          <div style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}>
            <div style={{
              width: PHONE_W,
              height: PHONE_H,
              background: "#1A1A2E",
              borderRadius: 54,
              padding: 12,
              boxShadow: "0 30px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.1)",
              position: "relative",
            }}>
              {/* Buttons */}
              <div style={{ position: "absolute", left: -3, top: 140, width: 3, height: 32, background: "#2A2A40", borderRadius: "3px 0 0 3px" }} />
              <div style={{ position: "absolute", left: -3, top: 185, width: 3, height: 56, background: "#2A2A40", borderRadius: "3px 0 0 3px" }} />
              <div style={{ position: "absolute", left: -3, top: 252, width: 3, height: 56, background: "#2A2A40", borderRadius: "3px 0 0 3px" }} />
              <div style={{ position: "absolute", right: -3, top: 190, width: 3, height: 72, background: "#2A2A40", borderRadius: "0 3px 3px 0" }} />
              {/* Screen */}
              <div style={{ width: 393, height: 852, background: C.bg, borderRadius: 44, overflow: "hidden", position: "relative" }}>
                {/* Dynamic island */}
                <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 120, height: 34, background: "#000", borderRadius: 20, zIndex: 10 }} />
                <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                  {screen.component}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: "flex", gap: 5, padding: "8px 16px 12px", flexWrap: "wrap" as const, justifyContent: "center", flexShrink: 0, maxWidth: "100%" }}>
          {SCREENS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              title={s.label}
              style={{
                width: i === current ? 20 : 7,
                height: 7,
                borderRadius: 4,
                background: i === current ? GROUP_COLORS[s.group] : "rgba(255,255,255,0.15)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
