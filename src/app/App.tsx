import { useState, useEffect, useMemo } from "react";
import {
  Home, Search, MessageCircle, Bell, User, ChevronRight, ChevronLeft,
  Star, Heart, Send, Paperclip, Check, X, Upload, DollarSign,
  TrendingUp, Settings, LogOut, Edit3, Filter, MapPin, Users,
  Instagram, Youtube, Twitter, Play, FileText, Clock, CheckCircle,
  AlertCircle, XCircle, Camera, BarChart2, Award, Zap, Shield,
  HelpCircle, ChevronDown, Plus, ArrowRight, Eye, ThumbsUp, Flag,
  Briefcase, Bookmark, Share2, MoreHorizontal, Image, Mic, Wallet, Gift, HelpCircle as HelpIcon
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
  darkNavy: "#070C24",
};

const shadow = "0 4px 20px rgba(11,20,55,0.08)";

// ── MOCK DATA ────────────────────────────────────────────────────
const INITIAL_CREATORS = [
  { id: "c1", name: "Sophia Martinez", niche: "Beauty & Skincare", followers: "420K", rate: 850, img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop", badge: true, city: "Mumbai", er: "4.5%", views: "85K", bio: "Skincare enthusiast and beauty educator. I partner with clean, sustainable beauty brands." },
  { id: "c2", name: "Jake Thompson", niche: "Tech & Gadgets", followers: "185K", rate: 620, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop", badge: false, city: "Delhi", er: "5.1%", views: "45K", bio: "Honest gadget unboxings, setups, and gaming product reviews." },
  { id: "c3", name: "Priya Sharma", niche: "Fashion & Style", followers: "312K", rate: 750, img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop", badge: true, city: "Bangalore", er: "3.8%", views: "60K", bio: "Daily outfit inspiration, shopping hauls, and style lookbooks." },
  { id: "c4", name: "Marcus Chen", niche: "Fitness & Health", followers: "95K", rate: 380, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop", badge: false, city: "Pune", er: "6.2%", views: "20K", bio: "Home workouts, high-protein recipes, and calorie-cutting tips." },
  { id: "c5", name: "Chloe Park", niche: "Food & Travel", followers: "240K", rate: 580, img: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=120&h=120&fit=crop", badge: true, city: "Mumbai", er: "7.1%", views: "90K", bio: "Street food explorer and budget luxury travel guide blogger." }
];

const INITIAL_REQUIREMENTS = [
  { id: "r1", title: "Summer Fashion Campaign", budget: 35000, category: "Instagram Reels", description: "Looking for fashion-forward creators to showcase our new summer collection across Instagram. Need 2 reels and 3 stories.", deadline: "2026-08-15", status: "open", postedBy: "Zomato Local", apps: 14 },
  { id: "r2", title: "Tech Earbuds Unboxing", budget: 22000, category: "YouTube Review", description: "Honest unboxing and product review of our latest wireless noise-cancelling earbuds. Focus on ANC quality.", deadline: "2026-08-01", status: "open", postedBy: "boAt Lifestyle", apps: 7 },
  { id: "r3", title: "Skincare Launch Collab", budget: 45000, category: "Instagram Video", description: "Promote our new organic moisturizer line. Describe your routine, skin feel, and include discount codes.", deadline: "2026-08-20", status: "open", postedBy: "Nykaa", apps: 22 },
];

const INITIAL_EVENTS = [
  { id: "e1", title: "Symbiosis Cultural Fest 2026", category: "College Fest", location: "Symbiosis, Pune", date: "2026-08-22", budget: "Collab Only", description: "Looking for lifestyle/music creators to attend and create hype stories.", interested: 4, status: "live" },
  { id: "e2", title: "Nykaa Boutique Launch - Jaipur", category: "Store Opening", location: "MI Road, Jaipur", date: "2026-08-05", budget: 15000, description: "Grand boutique launch. Need 2 fashion creators for ribbon cutting and stories.", interested: 2, status: "live" },
];

const INITIAL_DEALS = [
  { id: "d1", requirementId: "r1", creatorId: "c1", counterparty: "Nykaa", amount: 35000, netPayout: 33250, status: "in_progress", currentMilestone: "funded", date: "2026-07-10" },
  { id: "d2", requirementId: "r2", creatorId: "c3", counterparty: "boAt Lifestyle", amount: 22000, netPayout: 20900, status: "submitted", currentMilestone: "submitted", date: "2026-07-08" },
];

const FAQ_ITEMS = [
  { question: "How does the escrow payment system work?", answer: "When a campaign is agreed, the brand deposits funds into our secure escrow vault. Funds are only released to the creator once the content is submitted and approved by the brand." },
  { question: "What are the subscription benefits?", answer: "Pro and Premium tiers lower your deal commissions (down to 5%), unlock unlimited searches, enable the media kit builder, and offer direct pitch access." },
  { question: "How do fests and local events coordinate?", answer: "Promoters list events and set budgets. Creators register interest, fests approve invitations, and deals are escrowed securely on-platform." },
];

// ── APP CONTAINER ────────────────────────────────────────────────
export default function App() {
  const [authStep, setAuthStep] = useState<"splash" | "onboarding" | "chooseAccount" | "login" | "signup" | "dashboard">("splash");
  const [onboardingIndex, setOnboardingIndex] = useState(0);
  const [userRole, setUserRole] = useState<"business" | "creator" | "user" | "admin">("business");
  const [activeTab, setActiveTab] = useState("home");
  
  // App States
  const [creators, setCreators] = useState(INITIAL_CREATORS);
  const [requirements, setRequirements] = useState(INITIAL_REQUIREMENTS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [walletBalance, setWalletBalance] = useState(45000);
  const [walletTransactions, setWalletTransactions] = useState([
    { id: "t1", label: "Subscribed to Pro Plan", amount: -999, date: "2026-07-12", type: "debit" },
    { id: "t2", label: "Completed Nykaa Campaign", amount: 33250, date: "2026-07-05", type: "credit" },
  ]);
  const [notifications, setNotifications] = useState([
    { id: "n1", title: "New Pitch Received", msg: "Sophia Martinez pitched for 'Skincare Launch Collab'", date: "2h ago", read: false },
    { id: "n2", title: "Payment Secured", msg: "Escrow funds of ₹35,000 are secured in vault", date: "5h ago", read: true },
  ]);
  const [bookmarks, setBookmarks] = useState<string[]>(["c1", "c3"]);
  const [chatMessages, setChatMessages] = useState([
    { sender: "them", text: "Hi! I saw your campaign requirement and I'd love to collaborate!", time: "10:24 AM" },
    { sender: "me", text: "Hey Sophia! Your portfolio looks great. Can you share your media kit?", time: "10:26 AM" },
  ]);
  const [chatInput, setChatInput] = useState("");
  
  // Selection states
  const [selectedCreator, setSelectedCreator] = useState<typeof INITIAL_CREATORS[0] | null>(null);
  const [selectedReq, setSelectedReq] = useState<typeof INITIAL_REQUIREMENTS[0] | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<typeof INITIAL_DEALS[0] | null>(null);

  // Form states
  const [newReqTitle, setNewReqTitle] = useState("");
  const [newReqBudget, setNewReqBudget] = useState("");
  const [newReqCat, setNewReqCat] = useState("Instagram Reels");
  const [newReqDesc, setNewReqDesc] = useState("");
  const [newReqDeadline, setNewReqDeadline] = useState("");
  
  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [searchNiche, setSearchNiche] = useState("All");

  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportSent, setSupportSent] = useState(false);

  const [walletAmount, setWalletAmount] = useState("");
  const [walletUpi, setWalletUpi] = useState("");
  const [walletModal, setWalletModal] = useState<"deposit" | "withdraw" | null>(null);

  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  // Auto Role Sync
  const roleColor = useMemo(() => {
    if (userRole === "business") return C.indigo;
    if (userRole === "creator") return C.pink;
    if (userRole === "user") return C.teal;
    return "#7C3AED"; // Admin
  }, [userRole]);

  const onboardingData = [
    { title: "Find the Perfect Creator Match", sub: "Connect with thousands of authentic creators who align with your brand values and target audience.", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=800&fit=crop" },
    { title: "Manage Campaigns Effortlessly", sub: "Track requirements, review raw deliverables, approve content, and handle secure escrow payments all in one place.", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=800&fit=crop" },
    { title: "Escrow-Protected Payouts", sub: "Secure milestones protect budgets for brands and guarantee on-time payment for creators upon submission.", img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=800&fit=crop" }
  ];

  // Handlers
  const handleNextOnboarding = () => {
    if (onboardingIndex < 2) {
      setOnboardingIndex(onboardingIndex + 1);
    } else {
      setAuthStep("chooseAccount");
    }
  };

  const handlePostReq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReqTitle || !newReqBudget) return;
    const item = {
      id: `r-${Date.now()}`,
      title: newReqTitle,
      budget: parseFloat(newReqBudget),
      category: newReqCat,
      description: newReqDesc,
      deadline: newReqDeadline || "2026-08-30",
      status: "open",
      postedBy: "Acme Brands",
      apps: 0
    };
    setRequirements([item, ...requirements]);
    setNewReqTitle("");
    setNewReqBudget("");
    setNewReqDesc("");
    setNewReqDeadline("");
    setActiveTab("home");
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "LAUNCH50") {
      setPromoDiscount(50);
      setPromoMessage("✓ LAUNCH50 applied! 50% discount on Pro Plan.");
    } else if (promoCode.toUpperCase() === "WELCOME100") {
      setPromoDiscount(100);
      setPromoMessage("✓ WELCOME100 applied! Flat ₹100 discount.");
    } else {
      setPromoDiscount(0);
      setPromoMessage("❌ Invalid coupon code.");
    }
  };

  const handleWalletSubmit = () => {
    const val = parseFloat(walletAmount);
    if (isNaN(val) || val <= 0) return;
    if (walletModal === "deposit") {
      setWalletBalance(b => b + val);
      setWalletTransactions([
        { id: `t-${Date.now()}`, label: "Deposited via UPI", amount: val, date: new Date().toISOString().split("T")[0], type: "credit" },
        ...walletTransactions
      ]);
    } else {
      if (val > walletBalance) return;
      setWalletBalance(b => b - val);
      setWalletTransactions([
        { id: `t-${Date.now()}`, label: `Withdrawn to ${walletUpi || "Bank Link"}`, amount: -val, date: new Date().toISOString().split('T')[0], type: "debit" },
        ...walletTransactions
      ]);
    }
    setWalletModal(null);
    setWalletAmount("");
    setWalletUpi("");
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const msg = { sender: "me", text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatMessages(prev => [...prev, msg]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: "them", text: "Sounds good! I'll review and update the milestone tracking.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1200);
  };

  const toggleBookmark = (id: string) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(x => x !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  // Views Router
  const renderDashboardContent = () => {
    switch (activeTab) {
      case "home":
        if (userRole === "business") {
          return (
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
                <StatCard label="Active Campaigns" value={requirements.length.toString()} icon={Briefcase} color={C.indigo} />
                <StatCard label="Total Applicants" value="48" icon={Users} color={C.pink} />
                <StatCard label="Platform Spend" value="₹1,24,000" icon={DollarSign} color={C.green} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
                <div style={{ background: C.card, borderRadius: 16, padding: 20, boxShadow: shadow }}>
                  <TextTitle>Active Requirements</TextTitle>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
                    {requirements.map(r => (
                      <div key={r.id} onClick={() => { setSelectedReq(r); setActiveTab("requirement-details"); }} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontWeight: 600, color: C.navy }}>{r.title}</div>
                          <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{r.category} • ₹{r.budget}</div>
                        </div>
                        <ChevronRight size={16} color={C.muted} />
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: C.card, borderRadius: 16, padding: 20, boxShadow: shadow }}>
                  <TextTitle>Recommended Creators</TextTitle>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
                    {creators.slice(0, 3).map(c => (
                      <div key={c.id} onClick={() => { setSelectedCreator(c); setActiveTab("creator-profile"); }} style={{ display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }}>
                        <img src={c.img} style={{ width: 44, height: 44, borderRadius: "50%" }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                          <div style={{ fontSize: 12, color: C.muted }}>{c.niche} • {c.followers}</div>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.indigo }}>₹{c.rate}/post</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        if (userRole === "creator") {
          return (
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
                <StatCard label="My Applications" value="12" icon={Briefcase} color={C.indigo} />
                <StatCard label="Active Escrows" value={deals.length.toString()} icon={Shield} color={C.pink} />
                <StatCard label="Total Earned" value="₹84,500" icon={DollarSign} color={C.green} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
                <div style={{ background: C.card, borderRadius: 16, padding: 20, boxShadow: shadow }}>
                  <TextTitle>Matching Opportunities</TextTitle>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
                    {requirements.map(r => (
                      <div key={r.id} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontWeight: 600, color: C.navy }}>{r.title}</span>
                          <span style={{ color: C.pink, fontWeight: 700 }}>₹{r.budget}</span>
                        </div>
                        <div style={{ fontSize: 12, color: C.muted }}>{r.category} • Posted by {r.postedBy}</div>
                        <button onClick={() => { alert("Application submitted successfully!"); }} style={{ background: C.pinkLight, border: "none", color: C.pink, borderRadius: 8, padding: "8px 12px", fontSize: 12, fontWeight: 600, alignSelf: "flex-start", cursor: "pointer", marginTop: 4 }}>Apply Now</button>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: C.card, borderRadius: 16, padding: 20, boxShadow: shadow }}>
                  <TextTitle>Work Progress & Escrow</TextTitle>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
                    {deals.map(d => (
                      <div key={d.id} onClick={() => { setSelectedDeal(d); setActiveTab("deal-milestones"); }} style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontWeight: 600, color: C.navy }}>Deal #{d.id} • {d.counterparty}</div>
                          <div style={{ fontSize: 12, color: C.muted }}>Escrow: ₹{d.amount} • {d.currentMilestone}</div>
                        </div>
                        <ChevronRight size={16} color={C.muted} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        if (userRole === "user") {
          return (
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
                <StatCard label="My Events" value={events.length.toString()} icon={CalendarIcon} color={C.teal} />
                <StatCard label="Budget Allotted" value="₹35,000" icon={DollarSign} color={C.indigo} />
                <StatCard label="Interested Creators" value="6" icon={Users} color={C.pink} />
              </div>
              <div style={{ background: C.card, borderRadius: 16, padding: 20, boxShadow: shadow }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <TextTitle>Live Cultural Events & Promotions</TextTitle>
                  <button onClick={() => setActiveTab("post-requirement")} style={{ background: C.teal, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                    <Plus size={16} /> Post Event
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                  {events.map(e => (
                    <div key={e.id} style={{ border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                      <span style={{ background: C.tealLight, color: C.teal, fontSize: 11, fontWeight: 700, alignSelf: "flex-start", padding: "4px 10px", borderRadius: 20 }}>{e.category}</span>
                      <div style={{ fontWeight: 700, fontSize: 16, color: C.navy }}>{e.title}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>📍 {e.location} • 📅 {e.date}</div>
                      <div style={{ fontSize: 12, color: C.navy, fontWeight: 600 }}>Budget: {typeof e.budget === 'number' ? `₹${e.budget}` : e.budget}</div>
                      <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>🙋 {e.interested} creators registered interest</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        }
        // Admin View
        return (
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24, background: C.darkNavy, minHeight: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
              <StatCard label="Platform GMV" value="₹12.4 Lakhs" icon={DollarSign} color={C.indigo} />
              <StatCard label="Fee Revenue (5-10%)" value="₹87,500" icon={TrendingUp} color={C.green} />
              <StatCard label="Total Signups" value="27" icon={Users} color={C.pink} />
              <StatCard label="Disputes Raised" value="1" icon={AlertCircle} color={C.red} />
            </div>
            <div style={{ background: "#111C44", borderRadius: 16, padding: 20, border: "1px solid #1B2559" }}>
              <Text style={{ fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 14, display: "block" }}>Platform Operations & Audit Log</Text>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { label: "Sophia Martinez requested dispute review on Deal #d2", date: "1h ago", status: "Reviewing" },
                  { label: "New Brand 'Myntra' verified on-platform", date: "3h ago", status: "Verified" },
                  { label: "Payout release executed for Deal #d1 (₹33,250)", date: "12h ago", status: "Success" }
                ].map((item, idx) => (
                  <div key={idx} style={{ padding: "12px 16px", background: "#1B2559", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>{item.label}</div>
                      <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{item.date}</div>
                    </div>
                    <span style={{ background: "rgba(255,255,255,0.08)", color: "#fff", fontSize: 11, fontWeight: 600, borderRadius: 20, padding: "4px 10px" }}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "search":
        const filteredCreators = creators.filter(c => {
          const matchQuery = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.niche.toLowerCase().includes(searchQuery.toLowerCase());
          const matchNiche = searchNiche === "All" || c.niche.includes(searchNiche);
          return matchQuery && matchNiche;
        });
        return (
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 260, background: C.card, borderRadius: 12, padding: "10px 16px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 10 }}>
                <Search size={18} color={C.muted} />
                <input placeholder="Search by name, niche, city..." style={{ width: "100%", border: "none", outline: "none", background: "transparent", color: C.text }} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
                {["All", "Beauty", "Fashion", "Tech", "Food", "Fitness"].map(n => (
                  <button key={n} onClick={() => setSearchNiche(n)} style={{ background: searchNiche === n ? roleColor : C.card, color: searchNiche === n ? "#fff" : C.muted, border: `1px solid ${searchNiche === n ? roleColor : C.border}`, padding: "8px 16px", borderRadius: 20, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{n}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {filteredCreators.map(c => (
                <div key={c.id} style={{ background: C.card, borderRadius: 16, padding: 18, boxShadow: shadow, display: "flex", flexDirection: "column", gap: 12, cursor: "pointer" }} onClick={() => { setSelectedCreator(c); setActiveTab("creator-profile"); }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <img src={c.img} style={{ width: 56, height: 56, borderRadius: "50%" }} />
                    <div>
                      <div style={{ fontWeight: 700, color: C.navy, fontSize: 16 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>📍 {c.city}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    <span style={{ background: C.indigoLight, color: C.indigo, fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>{c.niche}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: 10, fontSize: 12 }}>
                    <div>
                      <div style={{ color: C.muted }}>Followers</div>
                      <div style={{ fontWeight: 700, color: C.navy }}>{c.followers}</div>
                    </div>
                    <div>
                      <div style={{ color: C.muted }}>Eng. Rate</div>
                      <div style={{ fontWeight: 700, color: C.green }}>{c.er}</div>
                    </div>
                    <div>
                      <div style={{ color: C.muted }}>Starting Rate</div>
                      <div style={{ fontWeight: 700, color: C.pink }}>₹{c.rate}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "jobs":
        return (
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <TextTitle>My Active Campaigns</TextTitle>
              <button onClick={() => { setSelectedReq(null); setActiveTab("post-requirement"); }} style={{ background: roleColor, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <Plus size={16} /> Post Requirement
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20 }}>
              {requirements.map(r => (
                <div key={r.id} style={{ background: C.card, borderRadius: 16, padding: 18, boxShadow: shadow, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ background: C.indigoLight, color: C.indigo, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>{r.category}</span>
                    <span style={{ color: C.green, fontSize: 12, fontWeight: 700 }}>● {r.status}</span>
                  </div>
                  <Text style={{ fontWeight: 700, fontSize: 17, color: C.navy, display: "block" }}>{r.title}</Text>
                  <Text style={{ fontSize: 13, color: C.muted, display: "block" }}>{r.description}</Text>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: 10, marginTop: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>Budget: ₹{r.budget}</span>
                    <span style={{ fontSize: 12, color: C.muted }}>Deadline: {r.deadline}</span>
                  </div>
                  <button onClick={() => { setSelectedReq(r); setActiveTab("requirement-details"); }} style={{ background: C.indigoLight, color: C.indigo, border: "none", padding: "10px 0", borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: "pointer", marginTop: 8 }}>Manage Applications</button>
                </div>
              ))}
            </div>
          </div>
        );

      case "post-requirement":
        return (
          <div style={{ padding: 24, maxWidth: 640, margin: "0 auto", width: "100%" }}>
            <div style={{ background: C.card, borderRadius: 16, padding: 24, boxShadow: shadow }}>
              <TextTitle>Post a Requirement / Event</TextTitle>
              <form onSubmit={handlePostReq} style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 14 }}>
                <InputField label="Title" placeholder="e.g. Need Video Editor for YouTube Shorts" value={newReqTitle} onChange={e => setNewReqTitle(e.target.value)} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <InputField label="Budget (₹)" placeholder="e.g. 15000" value={newReqBudget} onChange={e => setNewReqBudget(e.target.value)} />
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: C.navy, display: "block", marginBottom: 6 }}>Category</label>
                    <select style={{ width: "100%", background: C.bg, borderRadius: 10, padding: 12, border: `1px solid ${C.border}`, fontSize: 14, color: C.navy }} value={newReqCat} onChange={e => setNewReqCat(e.target.value)}>
                      <option>Instagram Reels</option>
                      <option>YouTube Review</option>
                      <option>TikTok Video</option>
                      <option>Thumbnail Design</option>
                      <option>Video Editing</option>
                      <option>College Fest</option>
                    </select>
                  </div>
                </div>
                <InputField label="Submission Deadline" placeholder="YYYY-MM-DD" value={newReqDeadline} onChange={e => setNewReqDeadline(e.target.value)} />
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: C.navy, display: "block", marginBottom: 6 }}>Brief / Description</label>
                  <textarea placeholder="Describe deliverables, requirements, brand notes..." style={{ width: "100%", background: C.bg, borderRadius: 10, padding: 12, border: `1px solid ${C.border}`, fontSize: 14, color: C.navy, height: 100, resize: "none" }} value={newReqDesc} onChange={e => setNewReqDesc(e.target.value)} />
                </div>
                <PrimaryBtn label="Publish Requirement" onClick={handlePostReq} />
              </form>
            </div>
          </div>
        );

      case "requirement-details":
        if (!selectedReq) return null;
        return (
          <div style={{ padding: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            <div style={{ background: C.card, borderRadius: 16, padding: 20, boxShadow: shadow, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ background: C.indigoLight, color: C.indigo, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>{selectedReq.category}</span>
                <span style={{ color: C.green }}>● {selectedReq.status}</span>
              </div>
              <TextTitle>{selectedReq.title}</TextTitle>
              <Text style={{ fontSize: 14, color: C.muted }}>{selectedReq.description}</Text>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.muted }}>Budget</span><span style={{ fontWeight: 600 }}>₹{selectedReq.budget}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.muted }}>Deadline</span><span style={{ fontWeight: 600 }}>{selectedReq.deadline}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.muted }}>Brand Coordinator</span><span style={{ fontWeight: 600 }}>{selectedReq.postedBy}</span></div>
              </div>
            </div>
            <div style={{ background: C.card, borderRadius: 16, padding: 20, boxShadow: shadow }}>
              <TextTitle>Applicants (14)</TextTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
                {creators.slice(0, 3).map((c, idx) => (
                  <div key={c.id} style={{ display: "flex", gap: 12, alignItems: "center", borderBottom: `1px solid ${C.border}`, paddingBottom: 10 }}>
                    <img src={c.img} style={{ width: 40, height: 40, borderRadius: "50%" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{c.niche} • {c.followers}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => { alert(`Hired ${c.name}! Initializing Escrow.`); }} style={{ background: C.green, color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Accept</button>
                      <button style={{ background: C.red, color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "creator-profile":
        if (!selectedCreator) return null;
        return (
          <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
            <div style={{ background: C.card, borderRadius: 16, padding: 20, boxShadow: shadow, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10 }}>
              <img src={selectedCreator.img} style={{ width: 90, height: 90, borderRadius: "50%", border: `3px solid ${roleColor}` }} />
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, color: C.navy }}>{selectedCreator.name}</div>
                <div style={{ fontSize: 13, color: C.muted }}>📍 {selectedCreator.city}</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ background: C.indigoLight, color: C.indigo, fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>{selectedCreator.niche}</span>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12, width: "100%" }}>
                <button onClick={() => setActiveTab("chat")} style={{ flex: 1, background: roleColor, color: "#fff", border: "none", borderRadius: 10, padding: "10px 0", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Message</button>
                <button onClick={() => toggleBookmark(selectedCreator.id)} style={{ width: 40, height: 40, border: `1px solid ${C.border}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Bookmark size={18} color={bookmarks.includes(selectedCreator.id) ? C.indigo : C.muted} fill={bookmarks.includes(selectedCreator.id) ? C.indigo : "none"} />
                </button>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: C.card, borderRadius: 16, padding: 20, boxShadow: shadow }}>
                <TextTitle>Key Performance Indicators</TextTitle>
                <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
                  <div style={{ flex: 1, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, textAlign: "center" }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{selectedCreator.followers}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>Reach</div>
                  </div>
                  <div style={{ flex: 1, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, textAlign: "center" }}>
                    <div style={{ fontWeight: 700, fontSize: 16, color: C.green }}>{selectedCreator.er}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>Eng. Rate</div>
                  </div>
                  <div style={{ flex: 1, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, textAlign: "center" }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{selectedCreator.views}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>Avg. Views</div>
                  </div>
                </div>
              </div>
              <div style={{ background: C.card, borderRadius: 16, padding: 20, boxShadow: shadow }}>
                <TextTitle>Biography</TextTitle>
                <Text style={{ fontSize: 14, color: C.muted, marginTop: 10, display: "block" }}>{selectedCreator.bio}</Text>
              </div>
            </div>
          </div>
        );

      case "chat":
        return (
          <div style={{ padding: 24, height: "calc(100vh - 120px)", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
            <div style={{ background: C.card, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column" }}>
              <div style={{ padding: 16, borderBottom: `1px solid ${C.border}`, fontWeight: 700, color: C.navy }}>Active Chats</div>
              <div style={{ flex: 1, overflowY: "auto", padding: 8 }}>
                {[
                  { name: "Sophia Martinez", last: "Sounds good! I'll update details.", time: "10:33 AM" },
                  { name: "Jake Thompson", last: "Send contract proposal", time: "Yesterday" }
                ].map((c, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 10, padding: 12, borderRadius: 10, background: idx === 0 ? C.indigoLight : "transparent", cursor: "pointer" }}>
                    <img src={INITIAL_CREATORS[idx].img} style={{ width: 38, height: 38, borderRadius: "50%" }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: C.muted }} numberOfLines={1}>{c.last}</div>
                    </div>
                    <span style={{ fontSize: 10, color: C.muted }}>{c.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: C.card, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}`, display: "flex", flexDirection: "column" }}>
              <div style={{ padding: 16, borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 700, color: C.navy }}>Sophia Martinez</div>
                <button onClick={() => setActiveTab("agreement")} style={{ background: C.indigo, color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Create Contract Proposal</button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                {chatMessages.map((m, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: m.sender === "me" ? "flex-end" : "flex-start" }}>
                    <div style={{ background: m.sender === "me" ? roleColor : C.bg, color: m.sender === "me" ? "#fff" : C.navy, borderRadius: 12, padding: "10px 14px", fontSize: 13, maxWidth: 360 }}>{m.text}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: 14, borderTop: `1px solid ${C.border}`, display: "flex", gap: 10 }}>
                <input placeholder="Type your message..." style={{ flex: 1, background: C.bg, borderRadius: 20, paddingHorizontal: 16, border: "none", outline: "none", fontSize: 13 }} value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSendMessage()} />
                <button onClick={handleSendMessage} style={{ width: 38, height: 38, borderRadius: "50%", background: roleColor, border: "none", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Send size={16} /></button>
              </div>
            </div>
          </div>
        );

      case "agreement":
        return (
          <div style={{ padding: 24, maxWidth: 640, margin: "0 auto", width: "100%" }}>
            <div style={{ background: C.card, borderRadius: 16, padding: 24, boxShadow: shadow, display: "flex", flexDirection: "column", gap: 16 }}>
              <TextTitle>Collab Agreement Draft</TextTitle>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
                <div style={{ fontWeight: 600, color: C.navy, marginBottom: 8 }}>Agreement Details</div>
                <div style={{ fontSize: 13, color: C.muted }}>This contract establishes that Sophia Martinez (Creator) will produce 2 Instagram Reels and 3 Stories to promote Zomato Local (Client) summer catalog. Payout of ₹35,000 will be held in secure escrow and released upon milestone completion.</div>
              </div>
              <InputField label="Creator Digital Signature" placeholder="Type your full name to sign" />
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => { alert("Agreement Signed! Moving funds to Escrow."); setWalletBalance(b => b - 35000); setActiveTab("payment"); }} style={{ flex: 1, background: C.green, color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 700, cursor: "pointer" }}>Sign & Fund Escrow</button>
                <button onClick={() => router.back()} style={{ flex: 1, background: C.indigoLight, color: C.indigo, border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 700, cursor: "pointer" }}>Decline</button>
              </div>
            </div>
          </div>
        );

      case "payment":
        return (
          <div style={{ padding: 24, maxWidth: 480, margin: "0 auto", width: "100%" }}>
            <div style={{ background: C.card, borderRadius: 16, padding: 30, boxShadow: shadow, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: C.green + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle size={32} color={C.green} />
              </div>
              <div style={{ fontWeight: 800, fontSize: 20 }}>Escrow Funded!</div>
              <div style={{ fontSize: 13, color: C.muted }}>₹35,000 payment was processed securely. Funds are safely locked in Creator Studio Escrow.</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, width: "100%", paddingVertical: 12, marginVertical: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}><span style={{ color: C.muted }}>Amount</span><span style={{ fontWeight: 600 }}>₹35,000</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}><span style={{ color: C.muted }}>Milestone</span><span style={{ fontWeight: 600 }}>Escrow Vault</span></div>
              </div>
              <button onClick={() => { setActiveTab("home"); }} style={{ width: "100%", background: C.indigo, color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 700, cursor: "pointer" }}>Back to Dashboard</button>
            </div>
          </div>
        );

      case "deal-milestones":
        return (
          <div style={{ padding: 24, maxWidth: 640, margin: "0 auto", width: "100%" }}>
            <div style={{ background: C.card, borderRadius: 16, padding: 24, boxShadow: shadow, display: "flex", flexDirection: "column", gap: 16 }}>
              <TextTitle>Milestone Escrow Tracker</TextTitle>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
                <div style={{ fontWeight: 600, color: C.navy, marginBottom: 4 }}>Nykaa Skincare Launch</div>
                <div style={{ fontSize: 12, color: C.muted }}>Escrow Value: ₹35,000 • Status: Active</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { title: "Milestone 1: Funds Escrowed", desc: "Acme Brands deposited ₹35,000 to Escrow Vault", status: "completed" },
                  { title: "Milestone 2: Deliverables Submitted", desc: "Sophia uploaded reel1.mp4", status: "completed" },
                  { title: "Milestone 3: Deliverables Approved", desc: "Review and approve the deliverables below", status: "pending" },
                  { title: "Milestone 4: Funds Released", desc: "Transfer payout directly to creator's wallet", status: "pending" },
                ].map((m, idx) => (
                  <div key={idx} style={{ display: "flex", gap: 12 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: m.status === "completed" ? C.green : C.border, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {m.status === "completed" && <Check size={12} color="#fff" />}
                      </div>
                      {idx < 3 && <div style={{ width: 2, flex: 1, background: C.border }} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: C.navy }}>{m.title}</div>
                      <div style={{ fontSize: 12, color: C.muted }}>{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                <button onClick={() => { alert("Milestones approved and funds released!"); setWalletBalance(b => b + 33250); setActiveTab("home"); }} style={{ flex: 1, background: C.green, color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 700, cursor: "pointer" }}>Approve & Release Payout</button>
                <button onClick={() => { alert("Dispute raised. Admin will review within 24h."); }} style={{ flex: 1, background: C.red, color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 700, cursor: "pointer" }}>Dispute Deal</button>
              </div>
            </div>
          </div>
        );

      case "earnings":
        const graphData = [
          { month: "Feb", amount: 28000 },
          { month: "Mar", amount: 45000 },
          { month: "Apr", amount: 12000 },
          { month: "May", amount: 38000 },
          { month: "Jun", amount: 65000 },
          { month: "Jul", amount: 53000 },
        ];
        return (
          <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
              <div style={{ flex: 1, minWidth: 260, background: C.navy, borderRadius: 16, padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Wallet Balance</div>
                  <div style={{ color: "#fff", fontSize: 32, fontWeight: 800, marginTop: 4 }}>₹{walletBalance}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setWalletModal("deposit")} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "none", borderRadius: 20, padding: "8px 16px", fontWeight: 600, cursor: "pointer" }}>+ Deposit</button>
                  <button onClick={() => setWalletModal("withdraw")} style={{ background: C.pink, color: "#fff", border: "none", borderRadius: 20, padding: "8px 16px", fontWeight: 600, cursor: "pointer" }}>Withdraw</button>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
              <div style={{ background: C.card, borderRadius: 16, padding: 20, boxShadow: shadow }}>
                <TextTitle>Earnings Over 6 Months</TextTitle>
                <div style={{ height: 220, marginTop: 14 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={graphData} barSize={32}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="amount" fill={roleColor} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div style={{ background: C.card, borderRadius: 16, padding: 20, boxShadow: shadow }}>
                <TextTitle>Platform Fees Detail</TextTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.muted }}>Gross Earned</span><span style={{ fontWeight: 600 }}>₹84,500</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: C.muted }}>Platform Commission (5%)</span><span style={{ fontWeight: 600, color: C.red }}>−₹4,225</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: 10 }}><span style={{ fontWeight: 700 }}>Net Payout</span><span style={{ fontWeight: 700, color: C.green }}>₹80,275</span></div>
                </div>
              </div>
            </div>
            <div style={{ background: C.card, borderRadius: 16, padding: 20, boxShadow: shadow }}>
              <TextTitle>Recent Transactions</TextTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
                {walletTransactions.map(t => (
                  <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{t.label}</div>
                      <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{t.date}</div>
                    </div>
                    <span style={{ fontWeight: 700, color: t.type === "credit" ? C.green : C.red }}>{t.amount > 0 ? `+₹${t.amount}` : `−₹${Math.abs(t.amount)}`}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div style={{ padding: 24, maxWidth: 640, margin: "0 auto", width: "100%" }}>
            <div style={{ background: C.card, borderRadius: 16, padding: 24, boxShadow: shadow, display: "flex", flexDirection: "column", gap: 20 }}>
              <TextTitle>Preferences & Settings</TextTitle>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: C.navy, display: "block", marginBottom: 6 }}>Language Preference</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {["English", "Hindi", "Hinglish"].map(l => (
                    <button key={l} style={{ flex: 1, padding: "10px 0", borderRadius: 8, background: l === "English" ? roleColor : C.bg, color: l === "English" ? "#fff" : C.navy, border: "none", cursor: "pointer", fontWeight: 600 }} onClick={() => alert(`Language preference updated to ${l}`)}>{l}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `1px solid ${C.border}`, paddingTop: 20 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>Push Notifications</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Receive real-time deal proposals and chat updates</div>
                </div>
                <input type="checkbox" defaultChecked style={{ width: 44, height: 22, cursor: "pointer" }} />
              </div>
              <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20 }}>
                <button onClick={() => setAuthStep("splash")} style={{ width: "100%", background: "#FEE2E2", color: C.red, border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 600, cursor: "pointer" }}>Sign Out</button>
              </div>
            </div>
          </div>
        );

      case "support":
        return (
          <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 24 }}>
            <div style={{ background: C.card, borderRadius: 16, padding: 20, boxShadow: shadow }}>
              <TextTitle>Submit Ticket</TextTitle>
              {supportSent ? (
                <div style={{ background: C.tealLight, color: C.teal, padding: 14, borderRadius: 8, marginTop: 14, fontWeight: 600 }}>✓ Support ticket submitted successfully!</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 14 }}>
                  <InputField label="Subject" placeholder="e.g. Milestone dispute help" value={supportSubject} onChange={e => setSupportSubject(e.target.value)} />
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: C.navy, display: "block", marginBottom: 6 }}>Message</label>
                    <textarea placeholder="Describe your issue..." style={{ width: "100%", background: C.bg, borderRadius: 10, padding: 12, border: `1px solid ${C.border}`, fontSize: 14, color: C.navy, height: 90, resize: "none" }} value={supportMessage} onChange={e => setSupportMessage(e.target.value)} />
                  </div>
                  <PrimaryBtn label="Send Ticket" onClick={() => { setSupportSent(true); setTimeout(() => setSupportSent(false), 3000); }} />
                </div>
              )}
            </div>
            <div style={{ background: C.card, borderRadius: 16, padding: 20, boxShadow: shadow }}>
              <TextTitle>FAQs Accordion</TextTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
                {FAQ_ITEMS.map((item, idx) => (
                  <div key={idx} style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 10 }}>
                    <button onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)} style={{ width: "100%", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left" }}>
                      <span style={{ fontWeight: 600, fontSize: 14, color: C.navy }}>{item.question}</span>
                      <ChevronDown size={16} color={C.muted} />
                    </button>
                    {activeFAQ === idx && (
                      <p style={{ fontSize: 13, color: C.muted, marginTop: 8, lineHeight: 1.6 }}>{item.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "referral":
        return (
          <div style={{ padding: 24, maxWidth: 640, margin: "0 auto", width: "100%" }}>
            <div style={{ background: C.card, borderRadius: 16, padding: 24, boxShadow: shadow, display: "flex", flexDirection: "column", gap: 20, alignItems: "center", textAlign: "center" }}>
              <Gift size={48} color={C.pink} />
              <div>
                <TextTitle>Invite Friends & Earn Cash</TextTitle>
                <Text style={{ fontSize: 14, color: C.muted, marginTop: 4, display: "block" }}>Refer other creators/brands and get flat ₹500 discount bonus once they sign up.</Text>
              </div>
              <div style={{ background: C.bg, border: `2px dashed ${C.border}`, borderRadius: 12, padding: "14px 28px" }}>
                <span style={{ fontWeight: 800, fontSize: 24, color: C.navy, letterSpacing: 2 }}>CREATOR7X</span>
              </div>
              <button onClick={() => alert("Copied referral link to clipboard!")} style={{ background: C.pink, color: "#fff", border: "none", borderRadius: 20, padding: "10px 24px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Copy Referral Link</button>
            </div>
          </div>
        );

      case "subscription":
        return (
          <div style={{ padding: 24, maxWidth: 800, margin: "0 auto", width: "100%" }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <TextTitle>Select Your Subscription Tier</TextTitle>
              <Text style={{ fontSize: 14, color: C.muted, marginTop: 4, display: "block" }}>Save on deal commission and unlock powerful analytics tools</Text>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
              {[
                { name: "Free Tier", price: 0, commission: "10%", perks: ["3 active campaigns", "Standard reach check"] },
                { name: "Pro Tier", price: 999, commission: "7%", perks: ["Unlimited campaigns", "Priority listing badge", "Advanced analytics"], popular: true },
                { name: "Premium Tier", price: 2499, commission: "5%", perks: ["Media kit generator", "AI match recommendations", "Priority live support"] },
              ].map(plan => (
                <div key={plan.name} style={{ background: C.card, borderRadius: 16, padding: 20, border: plan.popular ? `2px solid ${C.indigo}` : `1px solid ${C.border}`, position: "relative", boxShadow: shadow }}>
                  {plan.popular && <span style={{ position: "absolute", top: -12, right: 20, background: C.indigo, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 12 }}>POPULAR</span>}
                  <div style={{ fontWeight: 800, fontSize: 17 }}>{plan.name}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, margin: "10px 0" }}>₹{plan.price}/mo</div>
                  <div style={{ fontSize: 12, color: C.pink, fontWeight: 700 }}>Commission: {plan.commission}</div>
                  <div style={{ height: 1, background: C.border, margin: "14px 0" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 120 }}>
                    {plan.perks.map(p => (
                      <div key={p} style={{ display: "flex", gap: 6, fontSize: 12, color: C.muted }}><Check size={14} color={C.green} /> {p}</div>
                    ))}
                  </div>
                  {plan.price > 0 && (
                    <div style={{ margin: "14px 0" }}>
                      <input placeholder="Promo Code" style={{ width: "100%", background: C.bg, borderRadius: 8, padding: 8, border: `1px solid ${C.border}`, fontSize: 12 }} value={promoCode} onChange={e => setPromoCode(e.target.value)} />
                      <button onClick={handleApplyPromo} style={{ background: C.navy, color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer", marginTop: 6 }}>Apply Code</button>
                      {promoMessage && <div style={{ fontSize: 11, marginTop: 4, color: promoDiscount > 0 ? C.green : C.red }}>{promoMessage}</div>}
                    </div>
                  )}
                  <button onClick={() => { alert("Subscribed successfully!"); setActiveTab("home"); }} style={{ width: "100%", background: C.indigo, color: "#fff", border: "none", borderRadius: 10, padding: "10px 0", fontWeight: 700, cursor: "pointer" }}>Select Plan</button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div style={{ padding: 24 }}>View not implemented yet</div>;
    }
  };

  // Render App Steps
  if (authStep === "splash") {
    return (
      <div style={{ height: "100vh", background: C.navy, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1 }}>
          <div style={{ width: 90, height: 90, background: C.indigo, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: "0 8px 32px rgba(79,95,240,0.4)" }}>
            <Zap size={44} color="#fff" fill="#fff" />
          </div>
          <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: -0.5, textAlign: "center" }}>Creator Studio</div>
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginTop: 12, textAlign: "center", lineHeight: 1.6 }}>Where brands meet creators.<br />Collaborate. Create. Grow.</div>
        </div>
        <button onClick={() => setAuthStep("onboarding")} style={{ background: C.indigo, color: "#fff", border: "none", borderRadius: 12, padding: "14px 44px", fontWeight: 600, cursor: "pointer" }}>Get Started</button>
      </div>
    );
  }

  if (authStep === "onboarding") {
    const slide = onboardingData[onboardingIndex];
    return (
      <div style={{ height: "100vh", background: C.bg, display: "flex", flexWrap: "wrap", overflow: "hidden" }}>
        <div style={{ flex: 1, minWidth: 320, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", padding: 40, flexDirection: "column" }}>
          <img src={slide.img} style={{ width: "80%", maxHeight: 300, objectFit: "cover", borderRadius: 16 }} />
        </div>
        <div style={{ flex: 1, minWidth: 320, padding: 40, display: "flex", flexDirection: "column", justifyContent: "center", background: "#fff" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
            {[0, 1, 2].map(idx => (
              <div key={idx} style={{ height: 4, width: idx === onboardingIndex ? 24 : 8, borderRadius: 2, background: idx === onboardingIndex ? C.indigo : C.border }} />
            ))}
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: C.navy, marginBottom: 10, lineHeight: 1.2 }}>{slide.title}</div>
          <div style={{ fontSize: 15, color: C.muted, marginBottom: 30, lineHeight: 1.6 }}>{slide.sub}</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setAuthStep("chooseAccount")} style={{ flex: 1, background: C.bg, color: C.navy, border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer", fontWeight: 600 }}>Skip</button>
            <button onClick={handleNextOnboarding} style={{ flex: 2, background: C.indigo, color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", cursor: "pointer", fontWeight: 600 }}>Next</button>
          </div>
        </div>
      </div>
    );
  }

  if (authStep === "chooseAccount") {
    return (
      <div style={{ height: "100vh", background: C.bg, display: "flex", flexWrap: "wrap", overflow: "hidden" }}>
        <div style={{ flex: 1, minWidth: 320, background: C.navy, display: "flex", flexDirection: "column", justifyContent: "center", padding: 40, color: "#fff" }}>
          <div style={{ width: 44, height: 44, background: C.indigo, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><Zap size={22} color="#fff" /></div>
          <div style={{ fontSize: 32, fontWeight: 800 }}>Join the Marketplace</div>
          <div style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", marginTop: 8, lineHeight: 1.6 }}>Select your profile role. We support brands wishing to hire creators, influencers looking for collabs, and event promoters seeking local outreach.</div>
        </div>
        <div style={{ flex: 1, minWidth: 320, padding: 40, display: "flex", flexDirection: "column", justifyContent: "center", background: "#fff" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { id: "business", title: "Business / Brand", desc: "Post campaign requirements, view details, fund milestones.", icon: Briefcase, color: C.indigo },
              { id: "creator", title: "Content Creator", desc: "Find sponsorship deals, upload links, monitor earnings.", icon: Star, color: C.pink },
              { id: "user", title: "Event Promoter", desc: "List local festivals, college gatherings, boutique openings.", icon: CalendarIcon, color: C.teal }
            ].map(item => (
              <div key={item.id} onClick={() => { setUserRole(item.id as any); setAuthStep("signup"); }} style={{ border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, cursor: "pointer", display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: item.color + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><item.icon size={22} color={item.color} /></div>
                <div>
                  <div style={{ fontWeight: 700, color: C.navy, fontSize: 15 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", fontSize: 13, color: C.muted, marginTop: 20 }}>Already have an account? <span onClick={() => setAuthStep("login")} style={{ color: C.indigo, fontWeight: 700, cursor: "pointer" }}>Sign In</span></div>
        </div>
      </div>
    );
  }

  if (authStep === "signup" || authStep === "login") {
    return (
      <div style={{ height: "100vh", background: C.bg, display: "flex", flexWrap: "wrap", overflow: "hidden" }}>
        <div style={{ flex: 1, minWidth: 320, background: C.navy, display: "flex", flexDirection: "column", justifyContent: "center", padding: 40, color: "#fff" }}>
          <div style={{ fontSize: 32, fontWeight: 800 }}>{authStep === "signup" ? `Create ${userRole.toUpperCase()} Account` : "Welcome back"}</div>
          <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 8 }}>Join the premium Indian influencer & local fest marketplace. Secure escrow protected payments on all milestones.</div>
        </div>
        <div style={{ flex: 1, minWidth: 320, padding: 40, display: "flex", flexDirection: "column", justifyContent: "center", background: "#fff" }}>
          {authStep === "signup" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <InputField label="Name" placeholder="Enter full name" />
              <InputField label="Email Address" placeholder="you@example.com" />
              <InputField label="Password" placeholder="Create a secure password" type="password" />
              <button onClick={() => setAuthStep("dashboard")} style={{ background: C.indigo, color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 700, cursor: "pointer" }}>Sign Up</button>
              <div style={{ textAlign: "center", fontSize: 13, color: C.muted, marginTop: 10 }}>Already have an account? <span onClick={() => setAuthStep("login")} style={{ color: C.indigo, fontWeight: 700, cursor: "pointer" }}>Sign In</span></div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <InputField label="Email Address" placeholder="you@example.com" />
              <InputField label="Password" placeholder="Your password" type="password" />
              <button onClick={() => setAuthStep("dashboard")} style={{ background: C.indigo, color: "#fff", border: "none", borderRadius: 10, padding: "12px 0", fontWeight: 700, cursor: "pointer" }}>Sign In</button>
              <div style={{ textAlign: "center", fontSize: 13, color: C.muted, marginTop: 10 }}>New here? <span onClick={() => setAuthStep("chooseAccount")} style={{ color: C.indigo, fontWeight: 700, cursor: "pointer" }}>Sign Up</span></div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── AUTHENTICATED WEB APP DASHBOARD LAYOUT ─────────────────────
  return (
    <div style={{ height: "100vh", display: "flex", background: C.bg, fontFamily: "Inter, sans-serif", overflow: "hidden" }}>
      {/* Left Sidebar */}
      <div style={{ width: 240, background: C.navy, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 32, height: 32, background: roleColor, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={16} color="#fff" fill="#fff" />
          </div>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>Creator Studio</span>
        </div>
        <div style={{ flex: 1, padding: 14, display: "flex", flexDirection: "column", gap: 4, overflowY: "auto" }}>
          {[
            { id: "home", label: "Dashboard", icon: Home, roles: ["business", "creator", "user", "admin"] },
            { id: "search", label: "Search Creators", icon: Search, roles: ["business", "user"] },
            { id: "jobs", label: "Campaigns", icon: Briefcase, roles: ["business"] },
            { id: "post-requirement", label: "Post Job / Fest", icon: Plus, roles: ["business", "user"] },
            { id: "earnings", label: "Wallet & Stats", icon: Wallet, roles: ["business", "creator", "user"] },
            { id: "chat", label: "Messages", icon: MessageCircle, roles: ["business", "creator", "user"] },
            { id: "subscription", label: "Subscription Tiers", icon: Award, roles: ["business", "creator"] },
            { id: "referral", label: "Refer & Earn", icon: Gift, roles: ["business", "creator", "user"] },
            { id: "support", label: "Help & FAQs", icon: HelpIcon, roles: ["business", "creator", "user"] },
            { id: "settings", label: "Settings", icon: Settings, roles: ["business", "creator", "user", "admin"] }
          ].filter(item => item.roles.includes(userRole)).map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8, border: "none", cursor: "pointer", background: activeTab === item.id ? "rgba(255,255,255,0.08)" : "transparent", color: activeTab === item.id ? "#fff" : "rgba(255,255,255,0.5)", width: "100%", textAlign: "left", fontSize: 13, fontWeight: activeTab === item.id ? 700 : 500 }}>
              <item.icon size={16} color={activeTab === item.id ? "#fff" : "rgba(255,255,255,0.4)"} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top Header */}
        <div style={{ height: 64, background: C.card, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyBetween: "space-between", paddingHorizontal: 24, padding: "0 24px", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Quick switcher for mock previewing roles */}
            <span style={{ fontSize: 12, fontWeight: 700, color: C.muted }}>Role View:</span>
            <select style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, color: roleColor }} value={userRole} onChange={e => { setUserRole(e.target.value as any); setActiveTab("home"); }}>
              <option value="business">Business / Brand</option>
              <option value="creator">Influencer / Creator</option>
              <option value="user">Event Promoter</option>
              <option value="admin">Platform Operator</option>
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }} onClick={() => setActiveTab("earnings")}>
              <Wallet size={16} color={C.muted} />
              <span style={{ fontSize: 13, fontWeight: 700 }}>₹{walletBalance}</span>
            </div>
            <div style={{ position: "relative", cursor: "pointer" }}>
              <Bell size={20} color={C.navy} />
              {notifications.some(n => !n.read) && <div style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, background: C.pink, borderRadius: "50%" }} />}
            </div>
            <div style={{ height: 1, width: 1, background: C.border }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" style={{ width: 34, height: 34, borderRadius: "50%" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>Acme Brands</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {renderDashboardContent()}
        </div>
      </div>

      {/* Wallet Action Modal */}
      {walletModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}`, paddingBottom: 10 }}>
              <span style={{ fontWeight: 700 }}>{walletModal === "deposit" ? "Deposit Funds" : "Withdraw Funds"}</span>
              <button onClick={() => setWalletModal(null)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={16} /></button>
            </div>
            <InputField label="Amount (₹)" placeholder="e.g. 5000" value={walletAmount} onChange={e => setWalletAmount(e.target.value)} />
            {walletModal === "withdraw" && (
              <InputField label="UPI ID / Bank details" placeholder="yourname@oksbi" value={walletUpi} onChange={e => setWalletUpi(e.target.value)} />
            )}
            <PrimaryBtn label={walletModal === "deposit" ? "Deposit via Razorpay" : "Withdraw Now"} onClick={handleWalletSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── CUSTOM SMALL COMPONENTS ──────────────────────────────────────
function TextTitle({ children }: { children: React.ReactNode }) {
  return <span style={{ fontWeight: 800, fontSize: 18, color: C.navy, display: "block" }}>{children}</span>;
}

function Text({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <span style={style}>{children}</span>;
}

function CalendarIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function PrimaryBtn({ label, onClick, style }: { label: string; onClick?: (e: any) => void; style?: React.CSSProperties }) {
  return (
    <button onClick={onClick} style={{ background: C.indigo, color: "#fff", borderRadius: 10, padding: "12px 20px", fontWeight: 700, fontSize: 14, width: "100%", border: "none", cursor: "pointer", ...style }}>
      {label}
    </button>
  );
}

function SecondaryBtn({ label, onClick, style }: { label: string; onClick?: () => void; style?: React.CSSProperties }) {
  return (
    <button onClick={onClick} style={{ background: C.indigoLight, color: C.indigo, borderRadius: 10, padding: "12px 20px", fontWeight: 700, fontSize: 14, width: "100%", border: "none", cursor: "pointer", ...style }}>
      {label}
    </button>
  );
}

function InputField({ label, placeholder, type = "text", value, onChange }: { label: string; placeholder: string; type?: string; value?: string; onChange?: (e: any) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={{ background: C.bg, borderRadius: 10, padding: "12px 14px", border: `1px solid ${C.border}`, fontSize: 14, color: C.navy, outline: "none", width: "100%" }} />
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ElementType; color: string }) {
  return (
    <div style={{ background: C.card, borderRadius: 16, padding: 18, flex: 1, minWidth: 200, boxShadow: shadow, display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ background: color + "15", borderRadius: 12, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={20} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.navy }}>{value}</div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}
