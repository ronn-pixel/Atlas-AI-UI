import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Inbox,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Zap,
  Activity,
  Users,
  Truck,
  FileText,
  ClipboardList,
  ArrowRight,
  CheckCircle2,
  Search,
  X,
  ChevronRight,
  Cloud,
  Bell,
  Sun,
  Moon,
  CloudRain,
  Snowflake,
  CloudLightning,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@/app/ThemeContext";
import { useAuth } from "@/store/authStore";
import { generateMembers } from "@/utils/dummyData";

const memberGrowthData = Array.from({ length: 36 }, (_, i) => {
  const date = new Date(new Date().setMonth(new Date().getMonth() - 35 + i));
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  return {
    name: `${month} '${year}`,
    value: 8000 + i * 125 + Math.floor(Math.random() * 800),
  };
});

const claimsOverviewData = [
  { name: "Jan", total: 120, approved: 95, denied: 25 },
  { name: "Feb", total: 150, approved: 110, denied: 40 },
  { name: "Mar", total: 140, approved: 120, denied: 20 },
  { name: "Apr", total: 180, approved: 145, denied: 35 },
  { name: "May", total: 160, approved: 130, denied: 30 },
  { name: "Jun", total: 190, approved: 160, denied: 30 },
];

const plansOverviewData = [
  { name: "Jan", active: 45, new: 5, usage: 70 },
  { name: "Feb", active: 48, new: 8, usage: 65 },
  { name: "Mar", active: 52, new: 12, usage: 80 },
  { name: "Apr", active: 55, new: 6, usage: 75 },
  { name: "May", active: 62, new: 15, usage: 85 },
  { name: "Jun", active: 65, new: 10, usage: 90 },
];

const activityLogs = [
  {
    id: 1,
    type: "claim",
    desc: "New claim initialized for CASE-1024",
    time: "2m ago",
    icon: Zap,
    color: "text-blue-500",
  },
  {
    id: 2,
    type: "case",
    desc: "Operational case #CASE-1022 updated",
    time: "15m ago",
    icon: Activity,
    color: "text-purple-500",
  },
  {
    id: 3,
    type: "vendor",
    desc: "Valenz responding to secondary inquiry",
    time: "45m ago",
    icon: Truck,
    color: "text-orange-500",
  },
  {
    id: 4,
    type: "member",
    desc: "New group registration: BlueCorp Intel",
    time: "2h ago",
    icon: Users,
    color: "text-green-500",
  },
];

const claimsDataTable = [
  {
    category: "Inpatient Facility",
    amount: "₱1,245,000",
    percentage: "34.5%",
    change: "+5.2%",
    isPositive: true,
  },
  {
    category: "Outpatient Services",
    amount: "₱850,000",
    percentage: "23.6%",
    change: "-2.1%",
    isPositive: false,
  },
  {
    category: "Pharmacy Rx",
    amount: "₱620,000",
    percentage: "17.2%",
    change: "+8.4%",
    isPositive: true,
  },
  {
    category: "Specialty Care",
    amount: "₱450,000",
    percentage: "12.5%",
    change: "+1.5%",
    isPositive: true,
  },
  {
    category: "Emergency Room",
    amount: "₱310,000",
    percentage: "8.6%",
    change: "-4.3%",
    isPositive: false,
  },
];

const topVendorsData = [
  { name: "Valenz Health", score: "98%", claims: "12,450", approval: "94.2%" },
  {
    name: "Zelis Healthcare",
    score: "95%",
    claims: "8,230",
    approval: "91.8%",
  },
  { name: "MultiPlan", score: "92%", claims: "6,540", approval: "88.5%" },
  {
    name: "Optum Analytics",
    score: "89%",
    claims: "15,200",
    approval: "85.1%",
  },
  { name: "Magellan Health", score: "86%", claims: "4,120", approval: "82.4%" },
];

const WeatherWidget = () => {
  const [weather, setWeather] = React.useState({ temp: 29, iconName: 'clear-day.svg' });

  React.useEffect(() => {
    const fetchWeather = (lat = 40.7128, lon = -74.0060) => {
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius`)
        .then(res => res.json())
        .then(data => {
          if (data && data.current_weather) {
            const temp = Math.round(data.current_weather.temperature);
            const code = data.current_weather.weathercode;
            let iconName = 'clear-day.svg';
            if (code === 0) iconName = 'clear-day.svg';
            else if (code >= 1 && code <= 3) iconName = 'partly-cloudy-day.svg';
            else if (code >= 45 && code <= 48) iconName = 'fog.svg';
            else if (code >= 51 && code <= 67) iconName = 'rain.svg';
            else if (code >= 71 && code <= 77) iconName = 'snow.svg';
            else if (code >= 95) iconName = 'thunderstorms-rain.svg';
            setWeather({ temp, iconName });
          }
        }).catch(() => {
          // Keep default if API fails
        });
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather()
      );
    } else {
      fetchWeather();
    }
    
    const interval = setInterval(fetchWeather, 60000 * 30);
    return () => clearInterval(interval);
  }, []);

  let WeatherIcon = Sun;
  if (weather.iconName === 'clear-day.svg') WeatherIcon = Sun;
  else if (weather.iconName === 'partly-cloudy-day.svg' || weather.iconName === 'fog.svg') WeatherIcon = Cloud;
  else if (weather.iconName === 'rain.svg') WeatherIcon = CloudRain;
  else if (weather.iconName === 'snow.svg') WeatherIcon = Snowflake;
  else if (weather.iconName === 'thunderstorms-rain.svg') WeatherIcon = CloudLightning;
  else WeatherIcon = Sun;

  return (
    <div className="flex items-center gap-1.5 ml-1">
      <WeatherIcon className="w-[26px] h-[26px] text-accent shrink-0" strokeWidth={1.5} />
      <span>{weather.temp}°C</span>
    </div>
  );
};

const StatCard = ({ title, value, change, icon: Icon }: any) => (
  <Card className="px-5 py-4 flex flex-row items-center justify-start gap-4 h-[84px] bg-card-bg shadow-soft border-none relative transition-all hover:bg-accent/5 group rounded-2xl">
    <div className="flex flex-col justify-center">
      <Icon
        className="w-[30px] h-[30px] text-accent shrink-0 group-hover:scale-110 transition-transform"
        strokeWidth={1.5}
      />
    </div>
    <div className="flex flex-col justify-center">
      <div className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-1 leading-none">
        {title}
      </div>
      <div className="text-[22px] font-black text-slate-900 dark:text-white tabular-nums tracking-tight leading-none">
        {value}
      </div>
    </div>
    <div className="absolute top-3 right-3 flex items-center gap-0.5 text-success text-[9px] font-black uppercase tracking-widest leading-none bg-success/10 px-1.5 py-1 rounded">
      <ArrowUpRight className="w-3 h-3" /> {change}
    </div>
  </Card>
);

export default function Dashboard() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const displayName = (user as any)?.firstName || (user as any)?.fullName?.split(' ')[0] || user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'Agent';

  const isDark = theme === "dark";
  const gridColor = isDark ? "#27272a" : "#F1F5F9";
  const labelColor = isDark ? "#71717a" : "#64748B";
  const tooltipBg = isDark ? "#18181b" : "#FFFFFF";
  const tooltipText = isDark ? "#f4f4f5" : "#111827";

  const [isSearchModalOpen, setIsSearchModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<any[]>([]);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    // Force a resize event to ensure AreaCharts catch correct height
    // especially after layout changes or container mounts
    const tm = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 50);
    return () => clearTimeout(tm);
  }, [isSearchModalOpen]);

  const membersData = React.useMemo(() => generateMembers(150), []);

  React.useEffect(() => {
    if (isSearchModalOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchModalOpen]);

  React.useEffect(() => {
    if (searchQuery.length >= 2) {
      const q = searchQuery.toLowerCase();
      const results = membersData
        .filter(
          (m) =>
            m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q),
        )
        .slice(0, 8);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, membersData]);

  const handleSelectResult = (id: string) => {
    setIsSearchModalOpen(false);
    setSearchQuery("");
    navigate("/clients", { state: { highlightMemberId: id } });
  };

  const [timeState, setTimeState] = React.useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => setTimeState(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dayOfWeek = timeState.toLocaleString("default", { weekday: "long" });
  const dateStr = timeState.toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = timeState.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex flex-col flex-1 animate-in fade-in duration-700">
      {/* SEARCH PANEL */}
      <div className="flex items-center justify-between mb-2 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center text-text-primary">
            <span className="font-semibold text-3xl hover:text-accent transition-colors cursor-default">
              Hi, {displayName}
            </span>
            <span className="mx-3 text-border-strong opacity-50 select-none">|</span>
            <div className="flex items-center gap-3 text-text-muted font-black text-[11px] uppercase tracking-widest">
              <span>{dayOfWeek}</span>
              <span className="w-1 h-1 rounded-full bg-border-strong opacity-50" />
              <span>{dateStr}</span>
              <span className="w-1 h-1 rounded-full bg-border-strong opacity-50" />
              <span className="text-accent">{timeStr}</span>
              <WeatherWidget />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Button
            variant="primaryAction" 
            size="primaryAction"
            style={{ width: '276px' }}
            onClick={() => setIsSearchModalOpen(true)}
          >
            <Search className="w-5 h-5 flex-shrink-0" /> INITIALIZE SEARCH
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isSearchModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsSearchModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-card-bg rounded-2xl shadow-2xl border border-border-subtle overflow-hidden flex flex-col"
            >
              <div className="flex items-center px-4 border-b border-border-subtle">
                <Search className="w-5 h-5 text-text-muted shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Client ID or Name..."
                  className="flex-1 h-14 bg-transparent border-none outline-none px-4 text-sm font-black uppercase tracking-widest text-text-primary placeholder:text-text-muted/50"
                />
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="p-2 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-text-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((result, idx) => (
                      <button
                        key={`${result.type}-${result.id}-${idx}`}
                        onClick={() => handleSelectResult(result.id)}
                        className="w-full flex items-center gap-4 px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group text-left"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-black text-text-primary uppercase tracking-tight truncate">
                            {result.name}
                          </p>
                          <p className="text-[9px] font-bold text-text-muted uppercase tracking-widest truncate mt-0.5">
                            ID: {result.id}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                ) : searchQuery.length >= 2 ? (
                  <div className="py-12 text-center">
                    <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">
                      No matching records found
                    </p>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-[10px] font-black text-text-muted/50 uppercase tracking-widest">
                      Awaiting input...
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SCORES AND MODULES */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 shrink-0">
          <StatCard
            title="Total Members"
            value="12,482"
            change="+3.2%"
            icon={Users}
          />
          <StatCard title="Active Vendors" value="84" change="+2" icon={Truck} />
          <StatCard
            title="Active Plans"
            value="65"
            change="+5"
            icon={ShieldCheck}
          />
          <StatCard
            title="Total Claims"
            value="2,842"
            change="+14%"
            icon={FileText}
          />
          <StatCard
            title="Reports Gen."
            value="1,143"
            change="+22"
            icon={ClipboardList}
          />
          <StatCard
            title="Retention Rate"
            value="98.2%"
            change="+0.4%"
            icon={Activity}
          />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-[10px] shrink-0">
        <Card className="h-[410px] p-6 bg-card-bg border-none shadow-soft rounded-2xl hover:bg-accent/5 transition-all flex flex-col shrink-0">
          <div className="flex justify-between items-center mb-[10px]">
            <div className="space-y-1">
              <h3 className="font-black text-[11px] text-text-primary tracking-[0.2em] uppercase">
                Monthly Claims Overview
              </h3>
              <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em]">
                Adjudication Status Matrix
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-[8px] font-black uppercase text-text-muted tracking-widest hidden xl:inline">
                  Total
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent opacity-60" />
                <span className="text-[8px] font-black uppercase text-text-muted tracking-widest hidden xl:inline">
                  Appr
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent opacity-30" />
                <span className="text-[8px] font-black uppercase text-text-muted tracking-widest hidden xl:inline">
                  Denied
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-0 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={claimsOverviewData}
                margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" stroke={labelColor} fontSize={10} fontWeight="900" axisLine={false} tickLine={false} dy={10} style={{ fontFamily: 'var(--font-sans)' }} />
                <YAxis stroke={labelColor} fontSize={10} fontWeight="900" axisLine={false} tickLine={false} style={{ fontFamily: 'var(--font-sans)' }} />
                <Tooltip
                  contentStyle={{ fontFamily: "var(--font-sans)", backgroundColor: tooltipBg, color: tooltipText, borderRadius: "12px", border: "none", fontSize: "10px", textTransform: "uppercase", fontWeight: 900, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  itemStyle={{ fontFamily: "var(--font-sans)" }}
                  labelStyle={{ fontFamily: "var(--font-sans)" }}
                />
                <Area type="monotone" dataKey="total" stroke="#2563EB" strokeWidth={2} fillOpacity={0.2} fill="#2563EB" />
                <Area type="monotone" dataKey="approved" stroke="#3B82F6" strokeWidth={2} fillOpacity={0.4} fill="#3B82F6" />
                <Area type="monotone" dataKey="denied" stroke="#60A5FA" strokeWidth={2} fillOpacity={0.6} fill="#60A5FA" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        {/* PLANS OVERVIEW */}
        <Card className="h-[410px] p-6 bg-card-bg border-none shadow-soft rounded-2xl hover:bg-accent/5 transition-all flex flex-col shrink-0">
          <div className="flex justify-between items-center mb-[10px]">
            <div className="space-y-1">
              <h3 className="font-black text-[11px] text-text-primary tracking-[0.2em] uppercase">
                Plans Overview
              </h3>
              <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em]">
                Benefit Tier
              </p>
            </div>
          </div>
          <div className="flex-1 min-h-0 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={plansOverviewData}
                margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" stroke={labelColor} fontSize={10} fontWeight="900" axisLine={false} tickLine={false} dy={10} style={{ fontFamily: 'var(--font-sans)' }} />
                <YAxis stroke={labelColor} fontSize={10} fontWeight="900" axisLine={false} tickLine={false} style={{ fontFamily: 'var(--font-sans)' }} />
                <Tooltip
                  contentStyle={{ fontFamily: "var(--font-sans)", backgroundColor: tooltipBg, color: tooltipText, borderRadius: "12px", border: "none", fontSize: "10px", textTransform: "uppercase", fontWeight: 900, boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  itemStyle={{ fontFamily: "var(--font-sans)" }}
                  labelStyle={{ fontFamily: "var(--font-sans)" }}
                />
                <Area type="monotone" dataKey="active" stackId="a" stroke="#2563EB" strokeWidth={2} fillOpacity={0.6} fill="#2563EB" />
                <Area type="monotone" dataKey="new" stackId="a" stroke="#60A5FA" strokeWidth={2} fillOpacity={0.6} fill="#60A5FA" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* MEMBER GROWTH */}
        <Card className="h-[410px] p-6 bg-card-bg border-none shadow-soft rounded-2xl hover:bg-accent/5 transition-all flex flex-col shrink-0">
          <div className="flex justify-between items-center mb-[10px]">
            <div className="space-y-1">
              <h3 className="font-black text-[11px] text-text-primary tracking-[0.2em] uppercase">
                Member Growth
              </h3>
              <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em]">
                Temporal Analysis
              </p>
            </div>
            <Badge className="bg-bg-app text-text-muted border-none uppercase tracking-widest text-[9px] px-3">
              36 month
            </Badge>
          </div>
          <div className="flex-1 min-h-0 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={memberGrowthData}
                margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke={gridColor}
                />
                <XAxis
                  dataKey="name"
                  stroke={labelColor}
                  fontSize={10}
                  fontWeight="900"
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                  minTickGap={30}
                  style={{ fontFamily: 'var(--font-sans)' }}
                />
                <YAxis
                  stroke={labelColor}
                  fontSize={10}
                  fontWeight="900"
                  axisLine={false}
                  tickLine={false}
                  style={{ fontFamily: 'var(--font-sans)' }}
                />
                <Tooltip
                  contentStyle={{
                    fontFamily: "var(--font-sans)",
                    backgroundColor: tooltipBg,
                    color: tooltipText,
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "10px",
                    textTransform: "uppercase",
                    fontWeight: 900,
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ fontFamily: "var(--font-sans)" }}
                  labelStyle={{ fontFamily: "var(--font-sans)" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2563EB"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorGrowth)"
                  activeDot={{
                    r: 6,
                    fill: "#2563EB",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-[10px] shrink-0">
        {/* CLAIMS DATA TABLE */}
        <Card className="h-[410px] p-6 bg-card-bg border-none shadow-soft rounded-2xl hover:bg-accent/5 transition-all flex flex-col shrink-0">
          <div className="flex justify-between items-center mb-[10px]">
            <div className="space-y-1">
              <h3 className="font-black text-[11px] text-text-primary tracking-[0.2em] uppercase">
                Claims Data
              </h3>
              <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em]">
                Financial Telemetry
              </p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
            <table className="w-full">
              <thead className="sticky top-0 z-10 shadow-[0_1px_0_0_theme(colors.border.subtle)] bg-card-bg">
<tr className="border-b border-border-subtle">
                  <th className="h-[46px] py-0 px-1 text-left text-[9px] font-black uppercase tracking-[0.3em] text-text-muted">
                    Category
                  </th>
                  <th className="h-[46px] py-0 px-1 text-left text-[9px] font-black uppercase tracking-[0.3em] text-text-muted">
                    Amount
                  </th>
                  <th className="h-[46px] py-0 px-1 text-right text-[9px] font-black uppercase tracking-[0.3em] text-text-muted">
                    % Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {claimsDataTable.map((row, idx) => (
                  <tr
                    key={`${row.category}-${idx}`}
                    className="border-b border-border-subtle last:border-none hover:bg-accent/5 transition-colors"
                  >
                    <td className="h-[54px] py-0 px-1 text-[11px] font-black text-text-primary uppercase">
                      {row.category}
                    </td>
                    <td className="h-[54px] py-0 px-1 text-[11px] font-black text-slate-700 dark:text-slate-300 tabular-nums">
                      {row.amount}
                    </td>
                    <td className="h-[54px] py-0 px-1 text-right">
                      <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 tabular-nums">
                        {row.percentage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* TOP 5 VENDORS PERFORMANCE */}
        <Card className="h-[410px] p-6 bg-card-bg border-none shadow-soft rounded-2xl hover:bg-accent/5 transition-all flex flex-col shrink-0">
          <div className="flex items-center justify-between mb-[10px]">
            <div className="space-y-1">
              <h3 className="font-black text-[11px] text-text-primary tracking-[0.2em] uppercase">
                Top Vendors
              </h3>
              <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em]">
                Performance Intelligence
              </p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar space-y-2">
            {topVendorsData.map((vendor, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2.5 rounded-2xl border border-border-subtle bg-slate-50/50 dark:bg-slate-900/30 hover:bg-white dark:hover:bg-slate-800 transition-colors"
              >
                <div className="min-w-0 flex-1 pr-4">
                  <p className="text-[11px] font-black text-text-primary uppercase tracking-tight truncate">
                    {vendor.name}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-3">
                  <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: vendor.score }}
                    />
                  </div>
                  <div className="text-[11px] font-black text-accent tabular-nums min-w-[32px] text-right">
                    {vendor.score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* RECENT ACTIVITY */}
        <Card className="h-[410px] p-6 bg-card-bg border-none shadow-soft rounded-2xl hover:bg-accent/5 transition-all flex flex-col shrink-0">
          <div className="flex justify-between items-center mb-[10px]">
            <h3 className="font-black text-[11px] text-text-primary tracking-[0.2em] uppercase">
              Recent Activity
            </h3>
            <button className="text-[9px] font-black text-accent uppercase tracking-widest hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
            {activityLogs.map((log) => (
              <div
                key={log.id}
                className="flex gap-4 group cursor-default items-center"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-2xl bg-bg-app flex items-center justify-center shrink-0 transition-all group-hover:scale-110",
                  )}
                >
                  <log.icon className={cn("w-4 h-4", log.color)} />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-[10px] font-bold text-text-primary leading-tight tracking-tight">
                    {log.desc}
                  </p>
                  <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-text-muted">
                    <span>Source: Matrix</span>
                    <span className="tabular-nums opacity-40">{log.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 shrink-0">
            <Card className="p-4 bg-bg-app border-none rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black text-text-primary uppercase tracking-widest">
                  Network
                </p>
                <p className="text-[8px] font-black text-success uppercase tracking-[0.4em] mt-0.5">
                  99.98%
                </p>
              </div>
              <Badge className="bg-success/10 text-success border-none text-[8px] font-black uppercase px-2 py-0.5">
                Secure
              </Badge>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}
