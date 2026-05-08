import * as React from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { AvatarIcon } from "@/components/ui/AvatarIcon";
import { generateMembers } from "@/utils/dummyData";
import { useLocation } from "react-router-dom";
import {
  Search,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  CheckCircle,
  X,
  History,
  Mail,
  Activity,
  Users,
  UserCheck,
  UserX,
  Clock,
  User,
  Phone,
  Calendar,
  MapPin,
  ExternalLink,
  ClipboardList,
  Briefcase,
  Smartphone,
  ShieldAlert,
  ShieldCheck,
  Lock,
  FileText,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "motion/react";
import { HipaModal } from "@/components/feedback/HipaModal";
import { SimpleAuthModal } from "@/components/feedback/SimpleAuthModal";
import { useAuth } from "@/store/authStore";

const HipaaBadge = ({ hipaaVerificationState }: { hipaaVerificationState: string }) => {
  if (hipaaVerificationState !== "VERIFIED") {
    return null;
  }

  return (
    <div className="pointer-events-none flex items-center justify-center animate-in fade-in duration-1000">
      <div className="bg-success/5 border border-success/20 shadow-[0_0_15px_rgba(34,197,94,0.1)] rounded px-4 h-[36px] flex items-center gap-2.5 relative overflow-hidden">
        <div className="absolute inset-0 bg-success/10 animate-pulse"></div>
        <ShieldCheck className="w-5 h-5 text-success relative z-10" />
        <span className="text-[14px] font-black tracking-wider text-success uppercase mt-0.5 relative z-10">HIPAA VERIFIED</span>
      </div>
    </div>
  );
};

const ALL_MEMBERS = generateMembers(128);

const MOCK_ACTIVITIES = [
  {
    id: "1",
    description: "Address updated via member portal",
    timestamp: "2024-05-01 14:30",
    status: "Resolved",
    agent: "Agent M. Roberts",
  },
  {
    id: "2",
    description: "Inquiry regarding PPO Gold coverage limits",
    timestamp: "2024-05-01 11:15",
    status: "FCR",
    agent: "Agent J. Doe",
  },
  {
    id: "3",
    description: "Coordinated benefit verification with BlueCorp Intel",
    timestamp: "2024-04-30 16:45",
    status: "Resolved",
    agent: "System Auto",
  },
  {
    id: "4",
    description: "New dependent added to policy",
    timestamp: "2024-04-30 09:00",
    status: "FCR",
    agent: "Agent T. Swift",
  },
  {
    id: "5",
    description: "Claim CLM-9921 status inquiry",
    timestamp: "2024-04-29 13:20",
    status: "Resolved",
    agent: "Agent P. Parker",
  },
  ...Array.from({ length: 45 }).map((_, i) => ({
    id: `A-${i + 6}`,
    description: `System automated activity log #${i + 6}`,
    timestamp: "2024-04-28 10:00",
    status: i % 2 === 0 ? "FCR" : "Resolved",
    agent: i % 3 === 0 ? "Agent L. Croft" : "System Auto",
  })),
];

const MOCK_POLICIES = [
  {
    id: "POL-88291",
    type: "PPO Gold Luxury",
    effectiveDate: "2024-01-01",
    status: "Active",
    dependents: [
      {
        id: "DEP-001",
        name: "Smith, Jane A.",
        relation: "Spouse",
        dob: "1992-08-15",
        gender: "Female",
      },
      {
        id: "DEP-002",
        name: "Smith, Leo M.",
        relation: "Child",
        dob: "2015-10-22",
        gender: "Male",
      },
    ],
  },
  {
    id: "POL-77102",
    type: "Dental Plus",
    effectiveDate: "2024-02-15",
    status: "Active",
    dependents: [],
  },
];

const MOCK_CLAIMS = Array.from({ length: 55 }).map((_, i) => ({
  id: `CLM-${9900 - i}`,
  type: i % 3 === 0 ? "Medical" : i % 3 === 1 ? "Dental" : "Vision",
  status: i % 2 === 0 ? "Processed" : "Pending",
  provider: i % 2 === 0 ? "Northside Clinic" : "Apex Dental",
  claimed: `$${(Math.random() * 500).toFixed(2)}`,
  approved: `$${(Math.random() * 400).toFixed(2)}`,
  dos: "2024-04-10",
}));

const MOCK_CASES = Array.from({ length: 32 }).map((_, i) => ({
  id: `CASE-${1024 - i}`,
  status: i % 2 === 0 ? "Open" : "Closed",
  priority: i % 3 === 0 ? "High" : "Normal",
  assignedAgent: "Agent Smith",
  updatedAt: "2024-04-30",
}));

export function ClientProfilePanel({
  selectedMember,
  onClose,
  onEditProfile,
  timelinePage,
  setTimelinePage,
  timelinePageSize,
  setTimelinePageSize,
  policyPage,
  setPolicyPage,
  policyPageSize,
  setPolicyPageSize,
  claimsPage,
  setClaimsPage,
  claimsPageSize,
  setClaimsPageSize,
  casesPage,
  setCasesPage,
  casesPageSize,
  setCasesPageSize,
  selectedPolicy,
  setSelectedPolicy,
  selectedActivity,
  setSelectedActivity,
  selectedDependent,
  setSelectedDependent,
  selectedClaim,
  setSelectedClaim,
  selectedCase,
  setSelectedCase,
  activeTab,
  setActiveTab,
  renderMemberPagination,
  MOCK_ACTIVITIES: prop_MOCK_ACTIVITIES,
  MOCK_POLICIES: prop_MOCK_POLICIES,
  MOCK_CLAIMS: prop_MOCK_CLAIMS,
  MOCK_CASES: prop_MOCK_CASES,
  sessionLogs,
}: any) {
  const [activities, setActivities] = React.useState<any[]>([]);
  const [policies, setPolicies] = React.useState<any[]>([]);
  const [claims, setClaims] = React.useState<any[]>([]);
  const [cases, setCases] = React.useState<any[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    if (active) {
      if (!selectedMember) return;
      const memName = selectedMember.name || "Client";
      const lastName = memName.split(" ").slice(-1)[0] || "Doe";

      setActivities([
        ...(sessionLogs?.filter((l: any) => l.memberId === selectedMember.id) || []),
        ...(prop_MOCK_ACTIVITIES || [])
      ]);
      setPolicies(prop_MOCK_POLICIES || []);
      setClaims(prop_MOCK_CLAIMS || []);
      setCases(prop_MOCK_CASES || []);
    }
    return () => {
      active = false;
    };
  }, [selectedMember, sessionLogs, prop_MOCK_ACTIVITIES, prop_MOCK_POLICIES, prop_MOCK_CLAIMS, prop_MOCK_CASES]);

  return (
    <div
      key={selectedMember.id}
      className="flex-1 w-full flex flex-col max-w-full overflow-hidden h-full"
    >
      <Card className="relative p-6 border-none bg-white dark:bg-[#1F2937] rounded-2xl shadow-soft flex flex-col xl:flex-row gap-6 items-start w-full shrink-0 mb-[10px]">
        <div className="flex flex-col items-center gap-[10px] shrink-0 w-full xl:w-32 relative">
          <div className="text-center w-full">
            <span className="text-accent font-black tracking-[0.2em] text-[10px] tabular-nums uppercase opacity-70 block leading-none h-[10px]">
              {selectedMember.id}
            </span>
          </div>

          <div className="w-32 h-32 rounded-2xl bg-slate-50 dark:bg-black/20 flex items-center justify-center relative shadow-xl overflow-hidden group border-4 border-white dark:border-slate-800">
            <AvatarIcon
              gender={selectedMember.gender || selectedMember.sex || "UNKNOWN"}
              seedString={selectedMember.id || selectedMember.name}
              className="w-full h-full"
            />
          </div>
          <div className="text-center flex flex-col gap-2 mt-[2px] w-full items-center">
            <Badge className="bg-success/10 text-success border-none text-[8px] px-3 py-1 font-semibold tracking-wider uppercase">
              Active Member
            </Badge>
          </div>
        </div>

        <div className="flex-1 w-full flex flex-col justify-start h-full xl:pl-2 pt-[20px] pr-16 xl:pr-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-6 gap-x-6">
            {[
              {
                l: "Full Name",
                v: `${selectedMember.name.split(" ").slice(-1)[0]}, ${selectedMember.name.split(" ").slice(0, -1).join(" ")} MI Extension`,
                icon: User,
              },
              { l: "SSN", v: "***-**-1234", icon: Lock },
              { l: "Age", v: "34 Years", icon: Activity },
              { l: "Sex", v: "MALE", icon: Users },
              { l: "Address", v: "123 Enterprise Way, NY 10001", icon: MapPin },
              { l: "Birthday", v: "1990.05.14", icon: Calendar },
              { l: "Phone Number", v: "+1 (555) 049-9213", icon: Smartphone },
              { l: "Email", v: selectedMember.email, icon: Mail },
            ].map((x) => (
              <div key={x.l} className="space-y-1 group">
                <p className="text-[11px] uppercase tracking-wide text-text-muted dark:text-slate-500 font-medium flex items-center gap-2">
                  <x.icon className="w-3.5 h-3.5 text-trust opacity-60" />
                  {x.l}
                </p>
                <p className="text-[14px] font-semibold text-text-primary dark:text-white truncate">
                  {x.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card className="bg-white dark:bg-[#1F2937] border-none shadow-soft flex flex-col rounded-2xl flex-1 min-h-0 overflow-hidden !p-[0px] !px-[0px] !pt-[15px] !pb-[15px]">
        {/* CTA TABS */}
        <div className="flex flex-wrap items-center gap-2 px-6 !mt-[10px] !pb-[15px] !mb-[10px] border-b border-border-subtle dark:border-white/5 shrink-0 justify-start">
          {[
            { id: "activity", label: "Activity Log" },
            { id: "policy", label: "Policy" },
            { id: "claims", label: "Claims" },
            { id: "cases", label: "Cases" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id as "activity" | "policy" | "claims" | "cases",
                )
              }
              className={cn(
                "flex-1 min-w-[100px] max-w-[140px] px-3 py-1.5 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 text-center",
                activeTab === tab.id
                  ? "bg-accent text-white shadow-md shadow-accent/20"
                  : "bg-slate-100 dark:bg-white/5 text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="flex-1 min-h-0 flex flex-col">
          {activeTab === "activity" && (
            /* 1. Activity Log */
            <div className="group flex flex-col flex-1 min-h-0">
              {selectedActivity && (
                <div className="pb-2 flex justify-end items-center shrink-0 p-4">
                  <button
                    onClick={() => setSelectedActivity(null)}
                    className="text-[11px] font-semibold uppercase tracking-wider text-text-muted hover:text-accent transition-colors"
                  >
                    Back to List
                  </button>
                </div>
              )}
              {!selectedActivity ? (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="grid grid-cols-[40px_minmax(140px,2fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(80px,1fr)] justify-start gap-4 px-6 !pt-0 pb-1 border-b border-border-subtle shrink-0 items-center">
                    <div></div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      Activity
                    </div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      Agent
                    </div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      Date
                    </div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider text-right">
                      Status
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 mt-0 px-4 pb-0 !mb-[10px]">
                    {activities.length === 0 ? (
                      <div className="py-12 text-center text-[12px] font-medium text-text-muted">
                        No activities recorded.
                      </div>
                    ) : (
                      activities
                        .slice(
                          (timelinePage - 1) * timelinePageSize,
                          timelinePage * timelinePageSize,
                        )
                        .map((event: any) => (
                          <div
                            key={event.id}
                            className="grid grid-cols-[40px_minmax(140px,2fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(80px,1fr)] justify-start gap-4 items-center p-3 bg-slate-50/30 dark:bg-white/5 border border-transparent rounded-2xl hover:border-border-subtle dark:hover:border-white/10 hover:bg-slate-50/50 dark:hover:bg-white/5 cursor-pointer transition-all group/item"
                            onClick={() => setSelectedActivity(event)}
                          >
                            <div className="w-10 h-10 rounded-2xl bg-trust/10 text-trust flex items-center justify-center shrink-0 group-hover/item:bg-trust group-hover/item:text-white transition-colors">
                              <Clock className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col min-w-0 pr-2">
                              <span className="text-[13px] font-semibold text-text-primary dark:text-white tracking-tight group-hover/item:text-trust transition-colors truncate">
                                {event.description}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 min-w-0 pr-2">
                              <AvatarIcon
                                seedString={event.agent}
                                className="w-5 h-5 rounded-md shrink-0"
                              />
                              <span className="text-[12px] font-medium text-text-muted truncate">
                                {event.agent}
                              </span>
                            </div>
                            <div className="text-[12px] font-medium text-text-muted tabular-nums whitespace-nowrap truncate">
                              {event.timestamp}
                            </div>
                            <div className="text-right">
                              <Badge
                                className={cn(
                                  "text-[10px] font-semibold uppercase tracking-wider px-2 py-1.5 border-none",
                                  event.status === "FCR"
                                    ? "bg-success/10 text-success"
                                    : event.status === "Pending"
                                      ? "bg-warning/10 text-warning"
                                      : "bg-trust/10 text-trust",
                                )}
                              >
                                {event.status === "FCR"
                                  ? "Resolv."
                                  : event.status === "Pending"
                                    ? "Pend."
                                    : "Follow-up"}
                              </Badge>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-8 space-y-6 flex-1 overflow-y-auto no-scrollbar">
                  <div className="bg-slate-50/50 dark:bg-black/10 rounded-2xl p-6 border border-border-subtle">
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="text-sm font-black text-text-primary dark:text-white uppercase tracking-widest">
                        {selectedActivity.description}
                      </h4>
                      <span className="text-[10px] text-text-muted font-black tracking-widest opacity-40 uppercase tabular-nums">
                        {selectedActivity.timestamp}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-6 pb-6 border-b border-border-subtle mb-6">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-1">
                          Status
                        </p>
                        <Badge className="bg-trust/10 text-trust border-none text-[9px] font-black uppercase tracking-widest px-3 py-1 mt-1">
                          {selectedActivity.status}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-2">
                          Agent
                        </p>
                        <div className="flex items-center gap-2">
                          <AvatarIcon
                            seedString={selectedActivity.agent}
                            className="w-6 h-6 rounded-md shrink-0"
                          />
                          <p className="text-[12px] font-black text-text-primary dark:text-white">
                            {selectedActivity.agent}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-slate-500 mb-2">
                        Details
                      </p>
                      <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">
                        {selectedActivity.details || "No additional context."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {!selectedActivity &&
                renderMemberPagination(
                  activities.length,
                  timelinePage,
                  timelinePageSize,
                  setTimelinePage,
                  setTimelinePageSize,
                )}
            </div>
          )}

          {activeTab === "policy" && (
            /* 2. Policy Information */
            <div className="group flex flex-col flex-1 min-h-0">
              {selectedPolicy && (
                <div className="pb-2 flex justify-end items-center shrink-0 p-4">
                  <button
                    onClick={() => setSelectedPolicy(null)}
                    className="text-[11px] font-semibold uppercase tracking-wider text-text-muted hover:text-trust transition-colors"
                  >
                    Back to List
                  </button>
                </div>
              )}
              {!selectedPolicy ? (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="grid grid-cols-[40px_minmax(140px,2fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(80px,1fr)] justify-start gap-4 px-6 !pt-0 pb-1 border-b border-border-subtle shrink-0 items-center">
                    <div></div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      Policy ID
                    </div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      Policy Type
                    </div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      Effective Date
                    </div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider text-right">
                      Status
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 mt-0 px-4 pb-0 !mb-[10px]">
                    {policies.length === 0 ? (
                      <div className="py-12 text-center text-[12px] font-medium text-text-muted">
                        No active policies found.
                      </div>
                    ) : (
                      policies
                        .slice(
                          (policyPage - 1) * policyPageSize,
                          policyPage * policyPageSize,
                        )
                        .map((policy: any) => (
                          <div
                            key={policy.id}
                            onClick={() => setSelectedPolicy(policy.id)}
                            className="grid grid-cols-[40px_minmax(140px,2fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(80px,1fr)] justify-start gap-4 items-center p-3 bg-slate-50/30 dark:bg-white/5 border border-transparent rounded-2xl hover:border-border-subtle dark:hover:border-white/10 hover:bg-slate-50/50 dark:hover:bg-white/5 cursor-pointer transition-all group/item"
                          >
                            <div className="w-10 h-10 rounded-2xl bg-trust/10 text-trust flex items-center justify-center shrink-0 group-hover/item:bg-trust group-hover/item:text-white transition-colors">
                              <ClipboardList className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col min-w-0 pr-2">
                              <span className="text-[13px] font-semibold text-text-primary dark:text-white group-hover/item:text-trust transition-colors truncate">
                                {policy.id}
                              </span>
                              <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider mt-0.5 opacity-70 truncate">
                                Contract ID
                              </span>
                            </div>
                            <div className="text-[12px] font-medium text-text-primary dark:text-white whitespace-nowrap truncate">
                              {policy.type || "PPO"}
                            </div>
                            <div className="text-[12px] font-medium text-text-muted tabular-nums whitespace-nowrap truncate">
                              {policy.effectiveDate || "2023.01.01"}
                            </div>
                            <div className="text-right">
                              <Badge className="bg-success/10 text-success border-none text-[10px] font-semibold tracking-wider px-2 py-1.5 uppercase shrink-0">
                                {policy.status || "Active"}
                              </Badge>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-8 space-y-8 flex-1 overflow-y-auto no-scrollbar">
                  {(() => {
                    const policy = policies.find(
                      (p) => p.id === selectedPolicy,
                    );
                    if (!policy) return null;
                    return (
                      <>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                              Plan Type
                            </label>
                            <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">
                              {policy.type}
                            </p>
                          </div>
                          <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                              Effective Date
                            </label>
                            <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">
                              {policy.effectiveDate}
                            </p>
                          </div>
                        </div>

                        {policy.dependents && policy.dependents.length > 0 && (
                          <div className="bg-slate-50 dark:bg-black/10 rounded-2xl p-6 border border-border-subtle">
                            <h5 className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                              <Users className="w-4 h-4" /> Linked Dependents
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {policy.dependents.map((dep: any) => (
                                <div
                                  key={dep.id}
                                  onClick={() => setSelectedDependent(dep)}
                                  className="flex items-center justify-between p-4 bg-white dark:bg-[#1F2937] border border-border-subtle rounded-2xl cursor-pointer hover:border-trust transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <User className="w-4 h-4 text-trust" />
                                    <div className="flex flex-col">
                                      <span className="text-[11px] font-black uppercase tracking-widest text-text-primary dark:text-white">
                                        {dep.name}
                                      </span>
                                      <span className="text-[9px] text-text-muted font-black uppercase tracking-widest mt-1">
                                        {dep.relation} • {dep.dob}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}
              {!selectedPolicy &&
                renderMemberPagination(
                  policies.length,
                  policyPage,
                  policyPageSize,
                  setPolicyPage,
                  setPolicyPageSize,
                )}
            </div>
          )}

          {activeTab === "claims" && (
            /* 3. Claims Section */
            <div className="group flex flex-col flex-1 min-h-0">
              {selectedClaim && (
                <div className="pb-2 flex justify-end items-center shrink-0 p-4">
                  <button
                    onClick={() => setSelectedClaim(null)}
                    className="text-[11px] font-semibold uppercase tracking-wider text-text-muted hover:text-indigo-500 transition-colors"
                  >
                    Back to List
                  </button>
                </div>
              )}
              {!selectedClaim ? (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="grid grid-cols-[40px_minmax(140px,2fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(80px,1fr)] justify-start gap-4 px-6 !pt-0 pb-1 border-b border-border-subtle shrink-0 items-center">
                    <div></div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      Claim ID
                    </div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      Date
                    </div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      Claimed
                    </div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider text-right">
                      Status
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 mt-0 px-4 pb-0 !mb-[10px]">
                    {[...claims]
                      .sort((a, b) => b.id.localeCompare(a.id))
                      .slice(
                        (claimsPage - 1) * claimsPageSize,
                        claimsPage * claimsPageSize,
                      )
                      .map((claim) => (
                        <div
                          key={claim.id}
                          onClick={() => setSelectedClaim(claim)}
                          className="grid grid-cols-[40px_minmax(140px,2fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(80px,1fr)] justify-start gap-4 items-center p-3 bg-slate-50/30 dark:bg-white/5 border border-transparent rounded-2xl hover:border-border-subtle dark:hover:border-white/10 hover:bg-slate-50/50 dark:hover:bg-white/5 cursor-pointer transition-all group/item"
                        >
                          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 group-hover/item:bg-indigo-500 group-hover/item:text-white transition-colors">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col min-w-0 pr-2">
                            <span className="text-[13px] font-semibold text-text-primary dark:text-white group-hover/item:text-indigo-500 transition-colors truncate">
                              {claim.id}
                            </span>
                            <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider mt-0.5 opacity-70 truncate">
                              {claim.provider || claim.type || "Claim Record"}
                            </span>
                          </div>
                          <div className="text-[12px] font-medium text-text-muted tabular-nums whitespace-nowrap truncate">
                            {claim.dos || claim.date}
                          </div>
                          <div className="text-[12px] font-medium text-text-primary dark:text-white tabular-nums truncate">
                            {claim.claimed}
                          </div>
                          <div className="text-right">
                            <Badge
                              className={cn(
                                "text-[10px] font-semibold tracking-wider border-none px-2 py-1.5 shrink-0 uppercase",
                                claim.status === "Processed"
                                  ? "bg-success/10 text-success"
                                  : "bg-warning/10 text-warning",
                              )}
                            >
                              {claim.status === "Processed" ? "Done" : "Pend."}
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 space-y-8 flex-1 overflow-y-auto no-scrollbar">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                        Provider
                      </label>
                      <p
                        className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight truncate"
                        title={selectedClaim.provider}
                      >
                        {selectedClaim.provider || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                        Date of Service
                      </label>
                      <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight tabular-nums">
                        {selectedClaim.dos || selectedClaim.date}
                      </p>
                    </div>
                    <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                        Claimed Amount
                      </label>
                      <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight tabular-nums">
                        {selectedClaim.claimed}
                      </p>
                    </div>
                    <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                        Allowed Amount
                      </label>
                      <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight tabular-nums">
                        {selectedClaim.allowed || "$0.00"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-black/10 rounded-2xl p-6 border border-border-subtle">
                    <h5 className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                      <Activity className="w-4 h-4" /> Diagnosis & Context
                    </h5>
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">
                      {selectedClaim.diagnosis ||
                        "No diagnosis data available for this claim record."}
                    </p>
                  </div>
                </div>
              )}
              {!selectedClaim &&
                renderMemberPagination(
                  claims.length,
                  claimsPage,
                  claimsPageSize,
                  setClaimsPage,
                  setClaimsPageSize,
                )}
            </div>
          )}

          {activeTab === "cases" && (
            /* 4. Cases Section */
            <div className="group flex flex-col flex-1 min-h-0">
              {selectedCase && (
                <div className="pb-2 flex justify-end items-center shrink-0 p-4">
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="text-[11px] font-semibold uppercase tracking-wider text-text-muted hover:text-orange-500 transition-colors"
                  >
                    Back to List
                  </button>
                </div>
              )}
              {!selectedCase ? (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="grid grid-cols-[40px_minmax(140px,2fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(80px,1fr)] justify-start gap-4 px-6 !pt-0 pb-1 border-b border-border-subtle shrink-0 items-center">
                    <div></div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      Case ID
                    </div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      Date
                    </div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                      Agent
                    </div>
                    <div className="text-[10px] font-semibold text-text-muted uppercase tracking-wider text-right">
                      Status
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 mt-0 px-4 pb-0 !mb-[10px]">
                    {[...cases]
                      .sort((a, b) => b.id.localeCompare(a.id))
                      .slice(
                        (casesPage - 1) * casesPageSize,
                        casesPage * casesPageSize,
                      )
                      .map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedCase(item)}
                          className="grid grid-cols-[40px_minmax(140px,2fr)_minmax(100px,1fr)_minmax(100px,1fr)_minmax(80px,1fr)] justify-start gap-4 items-center p-3 bg-slate-50/30 dark:bg-white/5 border border-transparent rounded-2xl hover:border-border-subtle dark:hover:border-white/10 hover:bg-slate-50/50 dark:hover:bg-white/5 cursor-pointer transition-all group/item"
                        >
                          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0 group-hover/item:bg-orange-500 group-hover/item:text-white transition-colors">
                            <Briefcase className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col min-w-0 pr-2">
                            <span className="text-[13px] font-semibold text-text-primary dark:text-white group-hover/item:text-orange-500 transition-colors truncate">
                              {item.id}
                            </span>
                            <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider mt-0.5 opacity-70 truncate">
                              {item.priority} Priority / Category
                            </span>
                          </div>
                          <div className="text-[12px] font-medium text-text-muted tabular-nums whitespace-nowrap truncate">
                            {item.updatedAt || item.date}
                          </div>
                          <div className="flex items-center gap-2 min-w-0 pr-2">
                            <AvatarIcon
                              seedString={item.agent}
                              className="w-5 h-5 rounded-md shrink-0"
                            />
                            <span className="text-[12px] font-medium text-text-primary dark:text-white truncate">
                              {item.agent || "Agent"}
                            </span>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={cn(
                                "text-[10px] font-semibold tracking-wider border-none px-2 py-1.5 shrink-0 uppercase",
                                item.status === "Open"
                                  ? "bg-success/10 text-success"
                                  : "bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
                              )}
                            >
                              {item.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 space-y-8 flex-1 overflow-y-auto no-scrollbar">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                        Case Subject
                      </label>
                      <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">
                        {selectedCase.subject || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                        Last Updated
                      </label>
                      <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight tabular-nums">
                        {selectedCase.updatedAt || selectedCase.date}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-black/10 rounded-2xl p-6 border border-border-subtle">
                    <h5 className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
                      <Activity className="w-4 h-4" /> Description & History
                    </h5>
                    <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">
                      {selectedCase.description ||
                        "No detailed description available for this case."}
                    </p>
                  </div>
                </div>
              )}
              {!selectedCase &&
                renderMemberPagination(
                  cases.length,
                  casesPage,
                  casesPageSize,
                  setCasesPage,
                  setCasesPageSize,
                )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default function Members() {
  const { user } = useAuth();
  const location = useLocation();
  const highlightMemberId = location.state?.highlightMemberId;

  const [membersData, setMembersData] = React.useState<any[]>(ALL_MEMBERS);
  const [selectedMember, setSelectedMember] = React.useState<any>(null);
  const [pageSize, setPageSize] = React.useState(20);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isClientEnrollModalOpen, setIsClientEnrollModalOpen] =
    React.useState(false);
  const [selectedActivity, setSelectedActivity] = React.useState<any>(null);
  const [selectedPolicy, setSelectedPolicy] = React.useState<any>(null);
  const [timelinePage, setTimelinePage] = React.useState(1);
  const [timelinePageSize, setTimelinePageSize] = React.useState(20);
  const [policyPage, setPolicyPage] = React.useState(1);
  const [policyPageSize, setPolicyPageSize] = React.useState(20);
  const [claimsPage, setClaimsPage] = React.useState(1);
  const [claimsPageSize, setClaimsPageSize] = React.useState(20);
  const [casesPage, setCasesPage] = React.useState(1);
  const [casesPageSize, setCasesPageSize] = React.useState(20);
  const [selectedDependent, setSelectedDependent] = React.useState<any>(null);
  const [selectedClaim, setSelectedClaim] = React.useState<any>(null);
  const [selectedCase, setSelectedCase] = React.useState<any>(null);

  const [activeTab, setActiveTab] = React.useState<
    "activity" | "policy" | "claims" | "cases"
  >("activity");

  const [actionVerificationType, setActionVerificationType] = React.useState<
    "Edit" | "Delete" | "View" | null
  >(null);
  
  const [hipaaVerificationState, setHipaaVerificationState] = React.useState<
    "IDLE" | "ACTIVE" | "VERIFIED" | "DENIED" | "FAILED" | "EXPIRED" | "CANCELLED"
  >("IDLE");
  
  const [memberActionTarget, setMemberActionTarget] = React.useState<any>(null);
  const [sessionLogs, setSessionLogs] = React.useState<any[]>([]);

  React.useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;
    let totalTimer: NodeJS.Timeout;

    if (hipaaVerificationState === "ACTIVE" || hipaaVerificationState === "VERIFIED") {
      const resetToIdle = () => setHipaaVerificationState("IDLE");

      // 30 minutes inactivity
      inactivityTimer = setTimeout(resetToIdle, 30 * 60 * 1000);
      
      // 1 hour total lifecycle
      totalTimer = setTimeout(resetToIdle, 60 * 60 * 1000);

      const resetInactivity = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(resetToIdle, 30 * 60 * 1000);
      };

      const events = ['mousemove', 'keydown', 'scroll', 'click'];
      events.forEach(e => window.addEventListener(e, resetInactivity));

      return () => {
        clearTimeout(inactivityTimer);
        clearTimeout(totalTimer);
        events.forEach(e => window.removeEventListener(e, resetInactivity));
      };
    }
  }, [hipaaVerificationState]);

  React.useEffect(() => {
    if (highlightMemberId) {
      const member = ALL_MEMBERS.find((m) => m.id === highlightMemberId);
      if (member) {
        handleViewMember(member);
        window.history.replaceState({}, document.title);
      }
    }
  }, [highlightMemberId]);

  const sortedMembersData = React.useMemo(() => {
    let filtered = [...membersData];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(m => 
        (m.name && m.name.toLowerCase().includes(q)) || 
        (m.id && m.id.toLowerCase().includes(q)) ||
        (m.enrollmentDate && m.enrollmentDate.toLowerCase().includes(q)) ||
        (m.email && m.email.toLowerCase().includes(q))
      );
    }
    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [membersData, searchQuery]);
  const totalPages = Math.ceil(sortedMembersData.length / pageSize);
  const currentMembers = sortedMembersData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleViewMemberDirect = (member: any) => {
    setSelectedMember(member);
    setTimelinePage(1);
    setPolicyPage(1);
    setClaimsPage(1);
    setCasesPage(1);

    const newLog = {
      memberId: member.id,
      id: `ACT-SEC-${Date.now()}`,
      description: `Profile accessed directly via Client Menu`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: "Logged",
      agent: user?.name || "Current User",
    };
    setSessionLogs((prev) => [newLog, ...prev]);
  };

  const handleViewMember = (member: any) => {
    setSelectedMember(member);
    setMemberActionTarget(member);
    setActionVerificationType("View");
    setHipaaVerificationState("ACTIVE");
  };

  const handleEditClick = (member: any) => {
    setMemberActionTarget(member);
    setActionVerificationType("Edit");
  };

  const handleDeleteClick = (member: any) => {
    setMemberActionTarget(member);
    setActionVerificationType("Delete");
  };

  const handleVerificationSuccess = (method: string) => {
    if (actionVerificationType === "View") {
      setTimelinePage(1);
      setPolicyPage(1);
      setClaimsPage(1);
      setCasesPage(1);

      const newLog = {
        memberId: memberActionTarget.id,
        id: `ACT-SEC-${Date.now()}`,
        description: `Profile accessed securely via HIPAA Verification (${method})`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: "Logged",
        agent: user?.name || "Current User",
      };
      setSessionLogs((prev) => [newLog, ...prev]);
    } else if (actionVerificationType === "Edit") {
      setSelectedMember(memberActionTarget);
      setIsEditModalOpen(true);
    } else if (actionVerificationType === "Delete") {
      setMembersData((members) =>
        members.filter((m) => m.id !== memberActionTarget.id),
      );
      if (selectedMember && selectedMember.id === memberActionTarget.id) {
        setSelectedMember(null);
      }
    }
    setActionVerificationType(null);
    setMemberActionTarget(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const renderMemberPagination = (
    total: number,
    current: number,
    size: number,
    setPage: (p: number) => void,
    setSize: (s: number) => void,
  ) => (
    <Pagination
      currentPage={current}
      totalPages={Math.ceil(total / size) || 1}
      pageSize={size}
      totalRecords={total}
      onPageChange={setPage}
      onPageSizeChange={(newSize) => {
        setSize(newSize);
        setPage(1);
      }}
      className="shrink-0 w-full"
    />
  );

  return (
    <div className="flex flex-col gap-[10px] pb-0 m-0 h-full min-h-0 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[15px] shrink-0">
        <div className="flex items-center flex-1 min-w-0 mr-8">
          <div className={cn(
            "shrink-0 flex flex-col justify-center min-w-0 transition-all duration-300",
            selectedMember ? "w-auto" : "w-[270px]"
          )}>
            <div className="min-w-0 shrink">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-widest uppercase shrink-0 truncate">
                  CLIENT PROFILE
                </h1>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] font-black uppercase tracking-[0.4em] mt-2 truncate">
                Comprehensive Client Management
              </p>
            </div>
          </div>
          {!selectedMember && <div className="w-[20px] shrink-0" />}
          {!selectedMember && (
            <div className="h-12 w-px bg-border-subtle dark:bg-white/10 shrink-0" />
          )}
          {!selectedMember && <div className="w-[20px] shrink-0" />}
          
          {!selectedMember && (
            <div className="flex-1 min-w-0 flex flex-nowrap items-center gap-4">
              {[
                {
                  label: "Total Clients",
                    value: "14,284",
                    icon: Users,
                  },
                  {
                    label: "Active Clients",
                    value: "12,042",
                    icon: UserCheck,
                  },
                  {
                    label: "Pending Clients",
                    value: "1,842",
                    icon: Clock,
                  },
                  {
                    label: "Terminated Clients",
                    value: "400",
                    icon: UserX,
                  },
                ].map((s) => (
                  <Card
                    key={s.label}
                    className="px-5 py-4 flex flex-row items-center justify-start gap-4 h-[84px] bg-card-bg shadow-soft border-none relative transition-all hover:bg-accent/5 group rounded-2xl flex-1 min-w-0 shrink-0"
                  >
                    <div className="flex flex-col justify-center">
                      <s.icon className="w-[30px] h-[30px] text-accent shrink-0 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                      <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-1 leading-none truncate">
                        {s.label}
                      </div>
                      <div className="text-[22px] font-black text-slate-900 dark:text-white tabular-nums tracking-tight leading-none truncate">
                        {s.value}
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          )}
        </div>
        {!selectedMember ? (
          <Button
            variant="primaryAction"
            size="primaryAction"
            onClick={() => setIsClientEnrollModalOpen(true)}
          >
            <UserPlus className="w-5 h-5 flex-shrink-0" /> ENROLL CLIENT
          </Button>
        ) : (
          <div className="flex items-center w-full justify-between gap-3 relative flex-1">
            <button
              onClick={() => setSelectedMember(null)}
              style={{ transform: 'translateX(-700px)' }}
              className="text-text-muted hover:text-text-primary dark:text-slate-500 dark:hover:text-slate-300 font-semibold uppercase tracking-wider text-[12px] flex items-center gap-2 transition-all whitespace-nowrap"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Registry
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <HipaaBadge hipaaVerificationState={hipaaVerificationState} />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Button
                variant="primaryAction"
                className="h-[38px] px-5 w-auto min-w-0 max-w-none text-[12px] gap-2 rounded-xl"
                onClick={() => {
                  setMemberActionTarget(selectedMember);
                  setActionVerificationType("Edit");
                }}
              >
                <Edit className="w-4 h-4 opacity-70" /> Edit
              </Button>
              <Button
                variant="primaryAction"
                className="h-[38px] px-5 w-auto min-w-0 max-w-none text-[12px] gap-2 rounded-xl bg-danger hover:bg-danger/90 shadow-danger/20"
                onClick={() => {
                  setMemberActionTarget(selectedMember);
                  setActionVerificationType("Delete");
                }}
              >
                <Trash2 className="w-4 h-4 opacity-70" /> Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex gap-[15px] relative flex-col lg:flex-row w-full shrink-0 h-[900px] m-0 items-stretch",
          selectedMember ? "items-stretch" : "items-stretch",
        )}
      >
        {/* LEFT: Entity Registry */}
        <div
          className={cn(
            "w-full flex flex-col h-full shrink-0 min-w-0",
            selectedMember
              ? "hidden lg:flex lg:w-[280px] xl:w-[320px]"
              : "flex-1 min-w-0",
          )}
        >
          <Card
            className={cn(
              "overflow-hidden border-none shadow-soft flex flex-col h-full shrink-0",
              selectedMember
                ? "bg-white dark:bg-[#1F2937] rounded-2xl"
                : "bg-card-bg rounded-2xl",
            )}
          >
            <div className="w-full flex-1 overflow-auto min-h-0 relative">
              <table
                className={cn(
                  "w-full border-collapse table-fixed",
                  selectedMember ? "min-w-[200px]" : "min-w-[1200px]",
                )}
              >
                <thead className="bg-bg-app sticky top-0 z-10 shadow-[0_1px_0_0_theme(colors.border.subtle)]">
                  <tr className="bg-bg-app">
                    <th
                      className={cn(
                        "h-[46px] py-0 px-6 font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 text-[10px] text-left align-middle",
                        selectedMember ? "w-full" : "w-1/5",
                      )}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="relative flex-1 w-full font-semibold text-slate-900 dark:text-white normal-case tracking-normal">
                          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search using ID or Client Name"
                            className="w-full h-[38px] pl-11 pr-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-full outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-slate-400 placeholder:font-normal"
                          />
                        </div>
                      </div>
                    </th>
                    {!selectedMember && (
                      <>
                        <th className="h-[46px] py-0 px-6 font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 text-[10px] w-1/5 text-left align-middle">
                          Email
                        </th>
                        <th className="h-[46px] py-0 px-6 font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 text-[10px] w-1/5 text-left align-middle">
                          Date Registered
                        </th>
                        <th className="h-[46px] py-0 px-6 font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 text-[10px] w-1/5 text-left align-middle">
                          Status
                        </th>
                        <th className="h-[46px] py-0 px-10 font-black uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400 text-[10px] w-1/5 text-center align-middle">
                          Action
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-[13px]">
                  {currentMembers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="h-[54px] py-0 px-6 text-center text-[11px] font-black uppercase tracking-widest text-text-muted"
                      >
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    currentMembers.map((member) => (
                      <tr
                        key={member.id}
                        className={cn(
                          "transition-all duration-300 group",
                          !selectedMember && "hover:bg-bg-app",
                          selectedMember
                            ? "hover:bg-slate-50/30 dark:hover:bg-white/5 cursor-pointer"
                            : "",
                          selectedMember?.id === member.id &&
                            "bg-accent/5 dark:bg-accent/10 border-l-4 border-l-accent",
                        )}
                        onClick={
                          selectedMember
                            ? () => handleViewMemberDirect(member)
                            : undefined
                        }
                      >
                        <td className="h-[54px] py-0 px-6 text-left">
                          <div className="flex flex-col justify-center">
                            <span className="font-black text-text-primary uppercase tracking-tight text-sm truncate">
                              {member.name}
                            </span>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-wider mt-px">
                              ID: {member.id}
                            </span>
                          </div>
                        </td>
                        {!selectedMember && (
                          <>
                            <td className="h-[54px] py-0 px-6 font-black text-text-primary uppercase tracking-widest text-[11px] tabular-nums text-left">
                              {member.email}
                            </td>
                            <td className="h-[54px] py-0 px-6 text-text-muted font-bold uppercase tracking-widest text-[10px] truncate text-left">
                              {member.enrollmentDate}
                            </td>
                            <td className="h-[54px] py-0 px-6 text-left">
                              <Badge
                                className={cn(
                                  "text-[8.5px] font-black uppercase tracking-[0.2em] px-3 py-1 border-none shadow-none",
                                  member.status === "Active"
                                    ? "bg-success/10 text-success"
                                    : member.status === "Renewed"
                                      ? "bg-indigo-500/10 text-indigo-500"
                                      : "bg-danger/10 text-danger",
                                )}
                              >
                                {member.status}
                              </Badge>
                            </td>
                            <td className="h-[54px] py-0 px-10 text-center align-middle">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewMemberDirect(member);
                                  }}
                                  className="p-2 text-text-muted hover:text-accent transition-all transform active:scale-90"
                                  title="View / Entity Registry"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditClick(member);
                                  }}
                                  className="p-2 text-text-muted hover:text-accent transition-all transform active:scale-90"
                                  title="Edit Record"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteClick(member);
                                  }}
                                  className="p-2 text-text-muted hover:text-danger transition-all transform active:scale-90"
                                  title="Terminate Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Custom Pagination for Clients List */}
            {!selectedMember ? (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalRecords={ALL_MEMBERS.length}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            ) : (
              <div className="flex flex-col gap-3 px-6 pt-3 pb-3 shrink-0 border-t border-border-subtle bg-card-bg m-0 mt-auto w-full min-h-[50px]">
                {/* Row 1: Records and Total */}
                <div className="flex items-center justify-between w-full">
                  {/* Left Section */}
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                    <span>Show</span>
                    <select
                      value={pageSize}
                      onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                      className="bg-bg-app border border-border-subtle rounded px-1 outline-none focus:ring-2 focus:ring-accent/20 transition-all cursor-pointer h-5 text-[10px]"
                    >
                      {[10, 20, 50, 100].map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    <span>records</span>
                  </div>
                  
                  {/* Right Section */}
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                    Total: <span className="text-text-primary ml-1">{ALL_MEMBERS.length}</span>
                  </div>
                </div>

                {/* Row 2: Pagination Controls */}
                <div className="flex items-center justify-center w-full">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      &lt;&lt;
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      &lt;
                    </button>
                    <div className="text-[11px] font-black uppercase tracking-widest text-text-muted w-[80px] text-center">
                       Page {currentPage}/{Math.max(1, totalPages)}
                    </div>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      &gt;
                    </button>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      &gt;&gt;
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* RIGHT: Client Profile Detail Panel */}
        <div
          className={cn(
            "flex-1 min-w-0 w-full",
            selectedMember ? "block h-full" : "hidden",
          )}
        >
          {selectedMember && (
            <ClientProfilePanel
              selectedMember={selectedMember}
              onClose={() => setSelectedMember(null)}
              onEditProfile={() => {}}
              timelinePage={timelinePage}
              setTimelinePage={setTimelinePage}
              timelinePageSize={timelinePageSize}
              setTimelinePageSize={setTimelinePageSize}
              policyPage={policyPage}
              setPolicyPage={setPolicyPage}
              policyPageSize={policyPageSize}
              setPolicyPageSize={setPolicyPageSize}
              claimsPage={claimsPage}
              setClaimsPage={setClaimsPage}
              claimsPageSize={claimsPageSize}
              setClaimsPageSize={setClaimsPageSize}
              casesPage={casesPage}
              setCasesPage={setCasesPage}
              casesPageSize={casesPageSize}
              setCasesPageSize={setCasesPageSize}
              selectedPolicy={selectedPolicy}
              setSelectedPolicy={setSelectedPolicy}
              selectedActivity={selectedActivity}
              setSelectedActivity={setSelectedActivity}
              selectedDependent={selectedDependent}
              setSelectedDependent={setSelectedDependent}
              selectedClaim={selectedClaim}
              setSelectedClaim={setSelectedClaim}
              selectedCase={selectedCase}
              setSelectedCase={setSelectedCase}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              renderMemberPagination={renderMemberPagination}
              MOCK_ACTIVITIES={MOCK_ACTIVITIES}
              MOCK_POLICIES={MOCK_POLICIES}
              MOCK_CLAIMS={MOCK_CLAIMS}
              MOCK_CASES={MOCK_CASES}
              sessionLogs={sessionLogs}
            />
          )}

          {isEditModalOpen && (
            <EditModal
              isOpen={true}
              onClose={() => setIsEditModalOpen(false)}
              onSave={(data) => {
                console.log("Operational update:", data);
                setIsEditModalOpen(false);
              }}
            />
          )}
        </div>
      </div>

      {/* ENROLL MODAL SYSTEM */}
      <AnimatePresence>
        {isClientEnrollModalOpen && (
          <ClientEnrollModal
            isOpen={true}
            onClose={() => setIsClientEnrollModalOpen(false)}
            onSave={(data) => {
              const newMember = {
                id: `MEM-${Math.floor(Math.random() * 900000) + 100000}`,
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                status: data.status || "Active",
                plan: data.planName || "PPO Gold",
                dob: data.dob,
                zip: data.zip,
                enrollmentDate:
                  data.effectiveDate || new Date().toISOString().split("T")[0],
                enrollmentDateSort: data.effectiveDate
                  ? new Date(data.effectiveDate).toISOString()
                  : new Date().toISOString(),
              };
              setMembersData((prev) => [newMember, ...prev]);
              setIsClientEnrollModalOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* MODALS */}
      <AnimatePresence>
        <HipaModal
          isOpen={hipaaVerificationState === "ACTIVE"}
          onClose={() => {
            setHipaaVerificationState("CANCELLED");
            setTimeout(() => setHipaaVerificationState("IDLE"), 0);
            setActionVerificationType(null);
            setMemberActionTarget(null);
          }}
          onVerify={(method) => {
            setHipaaVerificationState("VERIFIED");
            handleVerificationSuccess(method);
          }}
          actionType={actionVerificationType}
        />
        <SimpleAuthModal
          isOpen={actionVerificationType === "Edit" || actionVerificationType === "Delete"}
          onClose={() => {
            setActionVerificationType(null);
            setMemberActionTarget(null);
          }}
          onVerify={() => handleVerificationSuccess('Password')}
          actionType={actionVerificationType === "Edit" || actionVerificationType === "Delete" ? actionVerificationType : null}
        />
        {selectedActivity && (
          <DetailModal
            title="Activity Details"
            subtitle="Interaction Log"
            data={selectedActivity}
            onClose={() => setSelectedActivity(null)}
          />
        )}
        {selectedPolicy && (
          <PolicyModal
            policy={MOCK_POLICIES.find((p) => p.id === selectedPolicy)}
            onClose={() => setSelectedPolicy(null)}
            onDependentClick={setSelectedDependent}
          />
        )}
        {selectedDependent && (
          <DetailModal
            title="Dependent Intelligence"
            subtitle="Linked Family Member Data"
            data={selectedDependent}
            onClose={() => setSelectedDependent(null)}
            hasEdit
            requireVerification
          />
        )}
        {selectedClaim && (
          <DetailModal
            title="Claim Analysis"
            subtitle="Medical Billing Record Details"
            data={selectedClaim}
            onClose={() => setSelectedClaim(null)}
          />
        )}
        {selectedCase && (
          <DetailModal
            title="Operational Case"
            subtitle="System Interaction Protocol"
            data={selectedCase}
            onClose={() => setSelectedCase(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function DetailModal({
  title,
  subtitle,
  data,
  onClose,
  hasEdit,
  requireVerification,
}: {
  title: string;
  subtitle: string;
  data: any;
  onClose: () => void;
  hasEdit?: boolean;
  requireVerification?: boolean;
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [showVerification, setShowVerification] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);
  const [verificationValue, setVerificationValue] = React.useState("");
  const [verificationMethod, setVerificationMethod] = React.useState<
    "OTP" | "FTA" | null
  >(null);

  const handleSave = () => {
    if (showVerification) {
      if (!verificationValue || !verificationMethod) {
        alert("Verification required");
        return;
      }
      console.log("Verified via", verificationMethod);
      setIsVerified(true);
      setShowVerification(false);
      setIsEditing(true);
      return;
    }

    console.log("Saving changes for", data.id);
    onClose();
  };

  const handleEditClick = () => {
    if (requireVerification && !isVerified) {
      setShowVerification(true);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white dark:bg-[#111827] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/5"
      >
        <div className="px-10 py-8 border-b border-border-subtle dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/20">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-widest uppercase">
              {title}
            </h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {hasEdit && !isEditing && !showVerification && (
              <Button
                onClick={handleEditClick}
                variant="outline"
                className="h-10 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest border-border-subtle hover:text-trust"
              >
                Edit Profile
              </Button>
            )}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto no-scrollbar">
          {showVerification ? (
            <div className="space-y-8 py-6 text-center animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 rounded-2xl bg-danger/10 text-danger mx-auto flex items-center justify-center shadow-xl shadow-danger/5">
                <ShieldAlert className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                  Security Verification Required
                </h3>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2 italic">
                  Confirm enterprise authorization to enable editing
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setVerificationMethod("OTP")}
                  className={cn(
                    "p-4 rounded-2xl border-2 transition-all text-center",
                    verificationMethod === "OTP"
                      ? "border-trust bg-trust/5 text-trust"
                      : "border-border-subtle dark:border-white/5 text-text-muted hover:border-trust",
                  )}
                >
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none">
                    OTP Integration
                  </p>
                </button>
                <button
                  onClick={() => setVerificationMethod("FTA")}
                  className={cn(
                    "p-4 rounded-2xl border-2 transition-all text-center",
                    verificationMethod === "FTA"
                      ? "border-trust bg-trust/5 text-trust"
                      : "border-border-subtle dark:border-white/5 text-text-muted hover:border-trust",
                  )}
                >
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none">
                    FTA Protocol
                  </p>
                </button>
              </div>

              <input
                type="text"
                value={verificationValue}
                onChange={(e) => setVerificationValue(e.target.value)}
                placeholder={
                  verificationMethod === "OTP"
                    ? "Enter 6-digit Secret"
                    : "Enter Auth Token"
                }
                className="h-14 w-full px-6 bg-slate-50 dark:bg-slate-900 border border-border-subtle dark:border-white/5 rounded-2xl text-[12px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] outline-none focus:ring-4 focus:ring-trust/10"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(data)
                .filter(([k]) => k !== "dependents" && k !== "id")
                .map(([key, value]: [string, any]) => (
                  <div
                    key={key}
                    className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent hover:border-border-subtle transition-all"
                  >
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        defaultValue={value}
                        className="w-full bg-white dark:bg-black/20 border-border-subtle dark:border-white/5 rounded-2xl px-3 py-2 text-[11px] font-black uppercase outline-none focus:ring-2 focus:ring-trust/20 text-text-primary dark:text-white"
                      />
                    ) : (
                      <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">
                        {value}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="px-10 py-8 border-t border-border-subtle dark:border-white/5 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-900/20">
          <Button
            variant="outline"
            onClick={
              showVerification ? () => setShowVerification(false) : onClose
            }
            className="h-12 px-8 rounded-2xl text-[11px] font-black uppercase tracking-widest border-border-subtle"
          >
            Cancel
          </Button>
          {(isEditing || showVerification || !hasEdit) && (
            <Button
              onClick={handleSave}
              className="h-12 px-10 bg-trust hover:opacity-90 text-white border-none rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-trust/20"
            >
              {showVerification ? "Finalize Verification" : "Save Changes"}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function PolicyModal({
  policy,
  onClose,
  onDependentClick,
}: {
  policy: any;
  onClose: () => void;
  onDependentClick: (dep: any) => void;
}) {
  if (!policy) return null;
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-white dark:bg-[#111827] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/5"
      >
        <div className="px-10 py-8 border-b border-border-subtle dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/20">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-widest uppercase">
              Policy Details
            </h2>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">
              {policy.id}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                Plan Type
              </label>
              <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">
                {policy.type}
              </p>
            </div>
            <div className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                Effective Date
              </label>
              <p className="text-[12px] font-black text-text-primary dark:text-white uppercase tracking-tight">
                {policy.effectiveDate}
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-black/10 rounded-2xl p-6 border border-border-subtle">
            <h5 className="text-[10px] font-black text-text-muted uppercase tracking-[0.4em] mb-4 flex items-center gap-3">
              <Users className="w-4 h-4" /> Linked Dependents
            </h5>
            <div className="grid grid-cols-1 gap-4">
              {policy.dependents.length > 0 ? (
                policy.dependents.map((dep: any) => (
                  <div
                    key={dep.id}
                    onClick={() => onDependentClick(dep)}
                    className="flex items-center justify-between p-4 bg-white dark:bg-[#1F2937] border border-border-subtle rounded-2xl cursor-pointer hover:border-trust transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-trust" />
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black uppercase tracking-widest text-text-primary dark:text-white">
                          {dep.name}
                        </span>
                        <span className="text-[9px] text-text-muted font-black uppercase tracking-widest">
                          {dep.relation} • {dep.dob} • {dep.gender}
                        </span>
                      </div>
                    </div>
                    <ChevronLeft className="w-4 h-4 rotate-180 opacity-50" />
                  </div>
                ))
              ) : (
                <p className="text-[10px] font-black text-text-muted uppercase">
                  No dependents linked to this policy.
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function EditModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
    plan: "PPO Gold",
    dob: "",
    zip: "",
    enrollmentDate: "",
  });
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#111827] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/5">
        <div className="px-10 py-8 border-b border-border-subtle dark:border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-widest uppercase">
            Edit Member
          </h2>
          <button onClick={onClose} className="text-slate-500">
            X
          </button>
        </div>
        <div className="p-10 space-y-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-border-subtle p-3 rounded-2xl bg-slate-50 text-[11px] font-black uppercase text-slate-700"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-border-subtle p-3 rounded-2xl bg-slate-50 text-[11px] font-black uppercase text-slate-700"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border border-border-subtle p-3 rounded-2xl bg-slate-50 text-[11px] font-black uppercase text-slate-700"
            />
          </div>
        </div>
        <div className="px-10 py-8 border-t border-border-subtle flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 border border-border-subtle rounded-2xl text-[11px] font-black uppercase"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-6 py-3 bg-trust text-white rounded-2xl text-[11px] font-black uppercase shadow-lg shadow-trust/20"
          >
            Save Member
          </button>
        </div>
      </div>
    </div>
  );
}

const EnrollSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-6 mb-8">
    <h3 className="text-[11px] font-black text-accent uppercase tracking-[0.4em] border-b border-border-subtle dark:border-white/5 pb-3">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  </div>
);

const EnrollField = ({
  label,
  value,
  fieldKey,
  updateForm,
  errors,
  type = "text",
  options,
  placeholder,
  disabled = false,
  required = false,
}: any) => (
  <div className="space-y-1.5 flex flex-col">
    <label className="text-[12px] font-black uppercase tracking-widest text-slate-500">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {options ? (
      <select
        value={value}
        onChange={(e) => updateForm(fieldKey, e.target.value)}
        disabled={disabled}
        className={`h-11 w-full px-4 bg-white dark:bg-slate-950 border ${errors[fieldKey] ? "border-red-500 focus:ring-red-500/20" : "border-border-subtle dark:border-white/10 focus:ring-accent/20"} rounded-2xl text-[12px] font-bold text-slate-900 dark:text-white outline-none focus:ring-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <option value="" disabled>
          {placeholder || `Select ${label}`}
        </option>
        {options.map((o: string) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => updateForm(fieldKey, e.target.value)}
        placeholder={placeholder || `Enter ${label}`}
        disabled={disabled}
        className={`h-11 w-full px-4 bg-white dark:bg-slate-950 border ${errors[fieldKey] ? "border-red-500 focus:ring-red-500/20" : "border-border-subtle dark:border-white/10 focus:ring-accent/20"} rounded-2xl text-[12px] font-bold text-slate-900 dark:text-white outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      />
    )}
    {errors[fieldKey] && (
      <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider">
        {errors[fieldKey]}
      </span>
    )}
  </div>
);

const EnrollReviewItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex flex-col border-b border-border-subtle/50 dark:border-white/5 pb-2">
    <span className="text-[11px] text-slate-500 uppercase font-black tracking-widest mb-1">
      {label}
    </span>
    <span className="text-[12px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight">
      {value || "-"}
    </span>
  </div>
);

export function ClientEnrollModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [step, setStep] = React.useState(1);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const [formData, setFormData] = React.useState({
    firstName: "",
    middleInitial: "",
    lastName: "",
    dob: "",
    gender: "",
    ssn: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    accountGroup: "",
    groupNumber: "",
    planName: "",
    planId: "",
    cobra: "No",
    effectiveDate: "",
    termDate: "",
    tier: "",
    relationship: "",
  });

  const updateForm = (key: string, value: string) => {
    let formattedValue = value;
    if (key === "ssn") {
      formattedValue = value.replace(/\D/g, "").slice(0, 9);
      if (formattedValue.length > 5)
        formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 5)}-${formattedValue.slice(5)}`;
      else if (formattedValue.length > 3)
        formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
    }
    if (key === "phone") {
      formattedValue = value.replace(/\D/g, "").slice(0, 10);
      if (formattedValue.length > 6)
        formattedValue = `(${formattedValue.slice(0, 3)}) ${formattedValue.slice(3, 6)}-${formattedValue.slice(6)}`;
      else if (formattedValue.length > 3)
        formattedValue = `(${formattedValue.slice(0, 3)}) ${formattedValue.slice(3)}`;
    }
    if (key === "zip") {
      formattedValue = value.replace(/\D/g, "").slice(0, 5);
    }

    // Auto-fill group number hack based on group selection
    let extraUpdates = {};
    if (key === "accountGroup" && value) {
      extraUpdates = {
        groupNumber: `GRP-${Math.floor(Math.random() * 9000) + 1000}`,
      };
    }

    setFormData((p) => ({ ...p, [key]: formattedValue, ...extraUpdates }));
    if (errors[key]) {
      setErrors((e) => {
        const newE = { ...e };
        delete newE[key];
        return newE;
      });
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.firstName) newErrors.firstName = "Required";
      if (!formData.lastName) newErrors.lastName = "Required";
      if (!formData.dob) newErrors.dob = "Required";
      if (!formData.gender) newErrors.gender = "Required";
      if (!formData.ssn || formData.ssn.length < 11)
        newErrors.ssn = "Valid SSN Required";
      if (!formData.phone || formData.phone.length < 14)
        newErrors.phone = "Valid Phone Required";
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
        newErrors.email = "Valid Email Required";
      if (!formData.address1) newErrors.address1 = "Required";
      if (!formData.city) newErrors.city = "Required";
      if (!formData.state) newErrors.state = "Required";
      if (!formData.zip || formData.zip.length < 5) newErrors.zip = "Required";
    } else if (currentStep === 2) {
      if (!formData.accountGroup) newErrors.accountGroup = "Required";
      if (!formData.groupNumber) newErrors.groupNumber = "Required";
      if (!formData.planName) newErrors.planName = "Required";
      if (!formData.planId) newErrors.planId = "Required";
    } else if (currentStep === 3) {
      if (!formData.effectiveDate) newErrors.effectiveDate = "Required";
      if (!formData.termDate) newErrors.termDate = "Required";
      if (!formData.tier) newErrors.tier = "Required";
      if (!formData.relationship) newErrors.relationship = "Required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, 4));
    } else {
      alert("Please resolve the required fields before proceeding.");
    }
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSaveInit = () => {
    setShowConfirm(true);
  };

  const handleConfirmSave = () => {
    setShowConfirm(false);
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-[1000px] max-h-[90vh] bg-card-bg rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="px-8 py-4 border-b border-border-subtle dark:border-white/10 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/20">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-widest uppercase">
              Member Enrollment
            </h2>
            <p className="text-[11px] font-medium text-slate-500 mt-1">
              Complete the required information to enroll a new member.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex bg-slate-50 border-b border-border-subtle dark:bg-slate-900/50 dark:border-white/5 py-4 shrink-0 justify-center">
          <div className="flex items-center justify-center gap-6 text-slate-500 w-full overflow-x-auto no-scrollbar">
            {[
              { num: 1, title: "Identity Information" },
              { num: 2, title: "Policy Information" },
              { num: 3, title: "Coverage Information" },
              { num: 4, title: "Review & Save" },
            ].map((s, i) => (
              <React.Fragment key={s.num}>
                <div
                  className={`flex flex-col items-center justify-center whitespace-nowrap px-2 tracking-widest uppercase ${step === s.num ? "text-accent" : step > s.num ? "text-success" : "text-slate-400 opacity-60"}`}
                >
                  <span className="text-[13px] font-bold leading-none">
                    Step {s.num}
                  </span>
                  <span className="text-[11px] font-normal mt-1.5">
                    {s.title}
                  </span>
                </div>
                {i < 3 && (
                  <ChevronRight className="w-5 h-5 opacity-20 shrink-0 mx-2" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto w-full p-10 relative">
          <div className="absolute top-4 right-10 flex items-center gap-2 text-slate-400">
            <Lock className="w-3 h-3" />
            <span className="text-[9px] uppercase tracking-wider font-semibold">
              Sensitive information (e.g., SSN) is securely handled.
            </span>
          </div>

          {step === 1 && (
            <div className="mt-4">
              <EnrollSection title="Personal Information">
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="First Name"
                  fieldKey="firstName"
                  value={formData.firstName}
                  required
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Middle Initial"
                  fieldKey="middleInitial"
                  value={formData.middleInitial}
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Last Name"
                  fieldKey="lastName"
                  value={formData.lastName}
                  required
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Date of Birth"
                  fieldKey="dob"
                  value={formData.dob}
                  type="date"
                  required
                  placeholder="Select birthdate"
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Gender"
                  fieldKey="gender"
                  value={formData.gender}
                  options={["Male", "Female", "Other", "Prefer not to say"]}
                  required
                  placeholder="Select gender"
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="SSN"
                  fieldKey="ssn"
                  value={formData.ssn}
                  placeholder="XXX-XX-XXXX"
                  required
                />
              </EnrollSection>

              <EnrollSection title="Contact Information">
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Phone Number"
                  fieldKey="phone"
                  value={formData.phone}
                  type="tel"
                  placeholder="(555) 123-4567"
                  required
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Email Address"
                  fieldKey="email"
                  value={formData.email}
                  type="email"
                  placeholder="example@email.com"
                  required
                />
              </EnrollSection>

              <EnrollSection title="Address">
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Address Line 1"
                  fieldKey="address1"
                  value={formData.address1}
                  required
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Address Line 2"
                  fieldKey="address2"
                  value={formData.address2}
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="City"
                  fieldKey="city"
                  value={formData.city}
                  required
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="State"
                  fieldKey="state"
                  value={formData.state}
                  options={[
                    "AL",
                    "AK",
                    "AZ",
                    "AR",
                    "CA",
                    "CO",
                    "CT",
                    "DE",
                    "FL",
                    "GA",
                    "HI",
                    "ID",
                    "IL",
                    "IN",
                    "IA",
                    "KS",
                    "KY",
                    "LA",
                    "ME",
                    "MD",
                    "MA",
                    "MI",
                    "MN",
                    "MS",
                    "MO",
                    "MT",
                    "NE",
                    "NV",
                    "NH",
                    "NJ",
                    "NM",
                    "NY",
                    "NC",
                    "ND",
                    "OH",
                    "OK",
                    "OR",
                    "PA",
                    "RI",
                    "SC",
                    "SD",
                    "TN",
                    "TX",
                    "UT",
                    "VT",
                    "VA",
                    "WA",
                    "WV",
                    "WI",
                    "WY",
                  ]}
                  required
                  placeholder="Select state"
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Zip Code"
                  fieldKey="zip"
                  value={formData.zip}
                  placeholder="12345"
                  required
                />
              </EnrollSection>
            </div>
          )}

          {step === 2 && (
            <div className="mt-4">
              <EnrollSection title="Policy Information">
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Account / Group Name"
                  fieldKey="accountGroup"
                  value={formData.accountGroup}
                  options={[
                    "Acme Corp",
                    "Globex",
                    "Soylent Corp",
                    "Initech",
                    "Umbrella Corp",
                  ]}
                  required
                  placeholder="Select account/group"
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Group Number"
                  fieldKey="groupNumber"
                  value={formData.groupNumber}
                  disabled
                  required
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Plan Name"
                  fieldKey="planName"
                  value={formData.planName}
                  required
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Plan ID / Plan Number"
                  fieldKey="planId"
                  value={formData.planId}
                  required
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="COBRA Flag"
                  fieldKey="cobra"
                  value={formData.cobra}
                  options={["Yes", "No"]}
                />
              </EnrollSection>
            </div>
          )}

          {step === 3 && (
            <div className="mt-4">
              <EnrollSection title="Coverage Details">
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Coverage Effective Date"
                  fieldKey="effectiveDate"
                  value={formData.effectiveDate}
                  type="date"
                  required
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Coverage Term Date"
                  fieldKey="termDate"
                  value={formData.termDate}
                  type="date"
                  required
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Coverage Tier"
                  fieldKey="tier"
                  value={formData.tier}
                  options={[
                    "Employee Only",
                    "Employee + Spouse",
                    "Employee + Children",
                    "Family",
                  ]}
                  required
                  placeholder="Select tier"
                />
                <EnrollField
                  updateForm={updateForm}
                  errors={errors}
                  label="Relationship Type"
                  fieldKey="relationship"
                  value={formData.relationship}
                  options={["Self", "Spouse", "Child", "Dependent"]}
                  required
                  placeholder="Select relationship"
                />
              </EnrollSection>
            </div>
          )}

          {step === 4 && (
            <div className="mt-4">
              <div className="text-center border-b border-border-subtle dark:border-white/10 pb-6 mb-8">
                <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">
                  Review & Save
                </h3>
                <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-wider">
                  Please review all information before saving.
                </p>
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                    Identity Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50/50 dark:bg-slate-900/30 p-6 rounded-2xl border border-border-subtle">
                    <EnrollReviewItem
                      label="Name"
                      value={`${formData.firstName} ${formData.middleInitial ? formData.middleInitial + ". " : ""}${formData.lastName}`}
                    />
                    <EnrollReviewItem
                      label="Date of Birth"
                      value={formData.dob}
                    />
                    <EnrollReviewItem label="Gender" value={formData.gender} />
                    <EnrollReviewItem
                      label="SSN"
                      value={formData.ssn.replace(/\d(?=\d{4})/g, "*")}
                    />
                    <EnrollReviewItem label="Phone" value={formData.phone} />
                    <EnrollReviewItem label="Email" value={formData.email} />
                    <div className="col-span-2">
                      <EnrollReviewItem
                        label="Address"
                        value={`${formData.address1}${formData.address2 ? ", " + formData.address2 : ""}, ${formData.city}, ${formData.state} ${formData.zip}`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                    Policy Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50/50 dark:bg-slate-900/30 p-6 rounded-2xl border border-border-subtle">
                    <EnrollReviewItem
                      label="Account/Group"
                      value={formData.accountGroup}
                    />
                    <EnrollReviewItem
                      label="Group Number"
                      value={formData.groupNumber}
                    />
                    <EnrollReviewItem
                      label="Plan Name"
                      value={formData.planName}
                    />
                    <EnrollReviewItem label="Plan ID" value={formData.planId} />
                    <EnrollReviewItem label="COBRA" value={formData.cobra} />
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                    Coverage Information
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50/50 dark:bg-slate-900/30 p-6 rounded-2xl border border-border-subtle">
                    <EnrollReviewItem
                      label="Effective Date"
                      value={formData.effectiveDate}
                    />
                    <EnrollReviewItem
                      label="Term Date"
                      value={formData.termDate}
                    />
                    <EnrollReviewItem label="Tier" value={formData.tier} />
                    <EnrollReviewItem
                      label="Relationship"
                      value={formData.relationship}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-10 py-6 border-t border-border-subtle dark:border-white/10 flex justify-end gap-4 shrink-0 bg-slate-50/50 dark:bg-slate-900/20">
          {step > 1 ? (
            <Button
              variant="outline"
              onClick={prevStep}
              className="h-12 px-8 rounded-2xl text-[11px] font-black uppercase tracking-widest border-border-subtle dark:border-white/10"
            >
              Previous
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={onClose}
              className="h-12 px-8 rounded-2xl text-[11px] font-black uppercase tracking-widest border-border-subtle dark:border-white/10"
            >
              Cancel
            </Button>
          )}

          {step < 4 ? (
            <Button
              onClick={nextStep}
              className="h-12 px-10 bg-accent hover:bg-accent/90 text-white border-none rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-accent/20 transition-all"
            >
              Next Step
            </Button>
          ) : (
            <Button
              onClick={handleSaveInit}
              className="h-12 px-10 bg-success hover:bg-success/90 text-white border-none rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-success/20 transition-all"
            >
              Review & Save
            </Button>
          )}
        </div>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowConfirm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-2xl border border-border-subtle"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest">
                  Confirm Enrollment
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  Do you want to proceed and save this member's enrollment
                  information?
                </p>
                <div className="flex gap-4 w-full pt-4 border-t border-border-subtle dark:border-white/10">
                  <Button
                    variant="outline"
                    className="flex-1 rounded-2xl h-12"
                    onClick={() => setShowConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-accent hover:bg-accent/90 text-white rounded-2xl h-12 border-none"
                    onClick={handleConfirmSave}
                  >
                    Save Member
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
