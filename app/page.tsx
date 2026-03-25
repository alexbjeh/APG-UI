"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronUp, ChevronDown, Search, Keyboard } from "lucide-react"
import {
  AccessibilitySettings,
  useAccessibility,
  type AccessibilityOptions,
} from "@/components/accessibility-settings"

interface Application {
  name: string
  description: string
  function: string
  importance: boolean
  color: string
  icon?: string
}

const applications: Application[] = [
  {
    name: "Unity",
    description: "Content-Processor",
    function: "Data Processing / Orchestration",
    importance: false,
    color: "text-green-500",
    icon: "/icons/unity.png",
  },
  {
    name: "Accumulo",
    description: "Key-value data store for cell-level security",
    function: "Storage, Discovery, Configuration",
    importance: false,
    color: "text-zinc-300 dark:text-zinc-300",
    icon: "/icons/accumulo.png",
  },
  {
    name: "Admin Portal",
    description: "Administrators manage permissions, configurations, and system operations",
    function: "Platform Management",
    importance: false,
    color: "text-yellow-500",
    icon: "/icons/admin.png",
  },
  {
    name: "Airflow",
    description: "Workflow orchestrator to build, schedule, and monitor data pipelines with Python-DAG flows",
    function: "Data Processing / Orchestration",
    importance: true,
    color: "text-fuchsia-500",
    icon: "/icons/airflow.png",
  },
  {
    name: "Consul",
    description:
      "Service mesh and service-discovery tool that provides health checks, configuration management, and secure service-to-service communication",
    function: "Storage, Discovery, Configuration",
    importance: false,
    color: "text-cyan-500",
    icon: "/icons/consul.png",
  },
  {
    name: "Documentation Portal",
    description: "Organized and searchable technical documentation, guides, and reference material",
    function: "Platform Management",
    importance: true,
    color: "text-orange-500",
    icon: "/icons/docs.png",
  },
  {
    name: "Grafana",
    description:
      "Visualization and monitoring platform that turns metrics and logs into interactive dashboards for observability in the system",
    function: "Monitoring, Logging, Observability, Analysis",
    importance: true,
    color: "text-lime-500",
    icon: "/icons/grafana.png",
  },
  {
    name: "Kibana",
    description: "Data exploration and visualization tool for Elasticsearch",
    function: "Monitoring, Logging, Observability, Analysis",
    importance: true,
    color: "text-pink-500",
    icon: "/icons/kibana.png",
  },
  {
    name: "Nagios",
    description: "Infrastructure monitoring system that tracks hosts, services, and network resources",
    function: "Monitoring, Logging, Observability, Analysis",
    importance: false,
    color: "text-blue-500",
    icon: "/icons/nagios.png",
  },
  {
    name: "NiFi",
    description: "Dataflow automation tool that moves and transforms data",
    function: "Data Processing / Orchestration",
    importance: true,
    color: "text-red-500",
    icon: "/icons/nifi.png",
  },
  {
    name: "NiFi Registry",
    description: "Stores versions of NiFi flow configurations, enabling change tracking and deployment consistency",
    function: "Monitoring, Logging, Observability, Analysis",
    importance: false,
    color: "text-violet-500",
    icon: "/icons/nifi-registry.png",
  },
  {
    name: "Prometheus",
    description: "Metrics-based monitoring and alerting system",
    function: "Monitoring, Logging, Observability, Analysis",
    importance: true,
    color: "text-amber-500",
    icon: "/icons/prometheus.svg",
  },
  {
    name: "RDA Deployer",
    description: "Custom Application Deployer",
    function: "Platform Management",
    importance: false,
    color: "text-teal-500",
    icon: "/icons/rda-deployer.png",
  },
  {
    name: "Spark History Server",
    description: "Displays logs and metrics of Spark Applications",
    function: "Data Processing / Orchestration",
    importance: false,
    color: "text-emerald-500",
    icon: "/icons/spark.png",
  },
]

export default function Dashboard() {
  const { options, setOptions } = useAccessibility()
  const [pinnedApps, setPinnedApps] = useState<Application[]>(applications.slice(0, 5))
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)

  const otherApps = applications.filter((app) => !pinnedApps.includes(app))
  const filteredOtherApps = otherApps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.function.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
      // Escape to close modals
      if (e.key === "Escape") {
        setSearchOpen(false)
        setSelectedApp(null)
        setShowKeyboardShortcuts(false)
      }
      // ? to show keyboard shortcuts
      if (e.key === "?" && !searchOpen) {
        setShowKeyboardShortcuts((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [searchOpen])

  const movePinnedApp = (index: number, direction: "up" | "down") => {
    const newPinned = [...pinnedApps]
    const newIndex = direction === "up" ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= pinnedApps.length) return
    ;[newPinned[index], newPinned[newIndex]] = [newPinned[newIndex], newPinned[index]]
    setPinnedApps(newPinned)
  }

  const pinApp = (app: Application) => {
    if (pinnedApps.length < 5) {
      setPinnedApps([...pinnedApps, app])
      setSelectedApp(null)
    }
  }

  const unpinApp = (app: Application) => {
    setPinnedApps(pinnedApps.filter((p) => p !== app))
  }

  // Font size classes
  const fontSizeClasses = {
    small: "text-xs",
    medium: "text-sm",
    large: "text-base",
    xlarge: "text-lg",
  }

  const headingFontSizeClasses = {
    small: "text-base",
    medium: "text-xl",
    large: "text-2xl",
    xlarge: "text-3xl",
  }

  const baseFontClass = fontSizeClasses[options.fontSize]
  const headingFontClass = headingFontSizeClasses[options.fontSize]

  // Theme classes
  const isDark = options.theme === "dark"
  const bgMain = isDark ? "bg-slate-950" : "bg-slate-50"
  const bgHeader = isDark ? "bg-slate-900" : "bg-white"
  const bgSidebar = isDark ? "bg-slate-900" : "bg-slate-100"
  const bgCard = isDark ? "bg-slate-800" : "bg-white"
  const bgCardHover = isDark ? "hover:bg-slate-700" : "hover:bg-slate-50"
  const textPrimary = isDark ? "text-slate-100" : "text-slate-900"
  const textSecondary = isDark ? "text-slate-400" : "text-slate-600"
  const textMuted = isDark ? "text-slate-500" : "text-slate-500"
  const borderColor = isDark ? "border-slate-700" : "border-slate-200"
  const inputBg = isDark ? "bg-slate-800" : "bg-white"

  // High contrast adjustments
  const contrastBorder = options.highContrast
    ? isDark
      ? "border-white"
      : "border-black"
    : borderColor
  const contrastText = options.highContrast
    ? isDark
      ? "text-white"
      : "text-black"
    : textPrimary

  // Focus indicators
  const focusClass = options.focusIndicators
    ? "focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
    : "focus:outline-none focus:ring-2 focus:ring-blue-500"

  // Motion classes
  const transitionClass = options.reducedMotion ? "" : "transition-all duration-200"

  // Click target classes
  const buttonPadding = options.largerClickTargets ? "p-4" : "p-3"
  const smallButtonPadding = options.largerClickTargets ? "p-3" : "p-2"

  return (
    <div className={`min-h-screen ${bgMain} ${textPrimary} font-sans ${baseFontClass}`}>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className={`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 ${buttonPadding} bg-blue-600 text-white rounded-lg ${focusClass}`}
      >
        Skip to main content
      </a>

      {/* Header */}
      <header
        className={`flex items-center justify-between px-4 py-3 ${bgHeader} border-b ${borderColor}`}
        role="banner"
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={`px-4 ${smallButtonPadding} ${bgCard} ${bgCardHover} border ${contrastBorder} rounded text-green-500 font-medium ${transitionClass} ${focusClass}`}
            aria-label="Toggle search"
            aria-expanded={searchOpen}
          >
            Search
          </button>
          <button
            onClick={() => setShowKeyboardShortcuts(true)}
            className={`${smallButtonPadding} ${bgCard} ${bgCardHover} border ${contrastBorder} rounded ${textSecondary} ${transitionClass} ${focusClass}`}
            aria-label="Show keyboard shortcuts"
            title="Keyboard shortcuts (?)"
          >
            <Keyboard className="w-4 h-4" />
          </button>
        </div>
        <h1 className={`${headingFontClass} font-bold ${contrastText}`}>
          APG
        </h1>
        <button
          className={`px-4 ${smallButtonPadding} ${bgCard} ${bgCardHover} border ${contrastBorder} rounded text-blue-500 font-medium ${transitionClass} ${focusClass}`}
        >
          branch categories
        </button>
      </header>

      {/* Search Bar */}
      {searchOpen && (
        <div className={`px-4 py-3 ${bgHeader} border-b ${borderColor}`} role="search">
          <div className="relative max-w-md">
            <Search
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${textMuted}`}
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search applications... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 ${buttonPadding} ${inputBg} border ${contrastBorder} rounded ${textPrimary} placeholder:${textMuted} ${focusClass}`}
              autoFocus
              aria-label="Search applications"
            />
          </div>
        </div>
      )}

      <div className="flex flex-1">
        {/* Left Sidebar - Pinned Applications */}
        <aside
          className={`w-48 ${bgSidebar} border-r ${borderColor} p-4`}
          role="complementary"
          aria-label="Pinned applications"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className={`${baseFontClass} font-semibold ${textSecondary} underline`}>
              ~Pinned Applications~
            </h2>
          </div>
          <nav aria-label="Pinned applications list">
            <ul className="space-y-2" role="list">
              {pinnedApps.map((app, index) => (
                <li
                  key={app.name}
                  className={`relative ${bgCard} border ${contrastBorder} rounded ${buttonPadding} ${bgCardHover} ${transitionClass} group`}
                >
                  {index > 0 && (
                    <button
                      onClick={() => movePinnedApp(index, "up")}
                      className={`absolute -top-1 left-1/2 -translate-x-1/2 w-5 h-5 ${bgCard} ${bgCardHover} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 ${transitionClass} ${focusClass}`}
                      aria-label={`Move ${app.name} up`}
                    >
                      <ChevronUp className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={() => unpinApp(app)}
                    className={`w-full text-left flex items-center gap-3 ${focusClass}`}
                    title={`Click to unpin ${app.name}`}
                    aria-label={`Unpin ${app.name}`}
                  >
                    {app.icon && (
                      <Image
                        src={app.icon}
                        alt={`${app.name} icon`}
                        width={28}
                        height={28}
                        className="rounded flex-shrink-0"
                      />
                    )}
                    <span className={`font-medium ${app.color} text-sm truncate`}>{app.name}</span>
                    {options.screenReaderMode && (
                      <span className="sr-only"> - {app.description}</span>
                    )}
                  </button>
                  {index < pinnedApps.length - 1 && (
                    <button
                      onClick={() => movePinnedApp(index, "down")}
                      className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 ${bgCard} ${bgCardHover} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 ${transitionClass} ${focusClass}`}
                      aria-label={`Move ${app.name} down`}
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main id="main-content" className="flex-1 p-4 flex flex-col gap-4" role="main">
          {/* Other Applications */}
          <section
            className={`flex-1 ${bgCard} border ${contrastBorder} rounded-lg ${buttonPadding}`}
            aria-labelledby="other-apps-heading"
          >
            <h3 id="other-apps-heading" className={`${textSecondary} text-center mb-4`}>
              Other applications
              {options.screenReaderMode && (
                <span className="sr-only"> - {filteredOtherApps.length} applications available</span>
              )}
            </h3>
            <div
              className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              role="list"
              aria-label="Available applications"
            >
              {filteredOtherApps.map((app) => (
                <button
                  key={app.name}
                  onClick={() => setSelectedApp(app)}
                  className={`${buttonPadding} ${isDark ? "bg-slate-900" : "bg-slate-50"} border ${contrastBorder} rounded-lg ${bgCardHover} ${transitionClass} flex flex-col items-center justify-center aspect-square ${focusClass} ${
                    selectedApp?.name === app.name
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  role="listitem"
                  aria-pressed={selectedApp?.name === app.name}
                  aria-label={`${app.name}${app.importance ? " - Important" : ""}`}
                  title={app.name}
                >
                  {app.icon && (
                    <Image
                      src={app.icon}
                      alt={`${app.name} icon`}
                      width={48}
                      height={48}
                      className="rounded"
                    />
                  )}
                  {app.importance && (
                    <span className="absolute top-1 right-1 text-yellow-500 text-xs" aria-hidden="true">
                      *
                    </span>
                  )}
                  {options.screenReaderMode && (
                    <span className="sr-only">{app.name} - {app.function}</span>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Notifications */}
          <section
            className={`h-40 ${bgCard} border ${contrastBorder} rounded-lg ${buttonPadding}`}
            aria-labelledby="notifications-heading"
            role="region"
          >
            <h3 id="notifications-heading" className={`${textSecondary} text-center mb-2`}>
              notifications
            </h3>
            <div className={`${textMuted} text-center`}>No new notifications</div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside
          className={`w-64 ${bgSidebar} border-l ${borderColor} p-4 flex flex-col gap-4`}
          role="complementary"
          aria-label="Account information and application details"
        >
          {/* Account Info */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full bg-gradient-to-br ${isDark ? "from-slate-600 to-slate-800" : "from-slate-400 to-slate-600"} border ${borderColor}`}
              aria-hidden="true"
            />
            <div>
              <p className="text-green-500">account name</p>
              <p className={`text-xs text-blue-500`}>time on server</p>
            </div>
          </div>

          {/* App Description */}
          <div
            className={`flex-1 ${bgCard} border ${contrastBorder} rounded-lg ${buttonPadding}`}
            role="region"
            aria-label="Selected application details"
            aria-live="polite"
          >
            {selectedApp ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {selectedApp.icon && (
                    <Image
                      src={selectedApp.icon}
                      alt={`${selectedApp.name} icon`}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                  )}
                  <h4 className={`font-semibold ${selectedApp.color}`}>{selectedApp.name}</h4>
                </div>
                <p className={textSecondary}>{selectedApp.description}</p>
                <div className={`pt-2 border-t ${borderColor}`}>
                  <p className={`text-xs ${textMuted}`}>Function:</p>
                  <p className={textSecondary}>{selectedApp.function}</p>
                </div>
                {selectedApp.importance && (
                  <div className="pt-2">
                    <span
                      className={`text-xs text-yellow-500 ${isDark ? "bg-yellow-500/10" : "bg-yellow-100"} px-2 py-1 rounded`}
                    >
                      * Important
                    </span>
                  </div>
                )}
                {pinnedApps.length < 5 && !pinnedApps.includes(selectedApp) && (
                  <button
                    onClick={() => pinApp(selectedApp)}
                    className={`w-full mt-2 px-3 ${smallButtonPadding} bg-green-600 hover:bg-green-500 text-white font-medium rounded ${transitionClass} ${focusClass}`}
                  >
                    Pin Application
                  </button>
                )}
              </div>
            ) : (
              <div className={textMuted}>
                <p className="mb-4">
                  descriptions of selected app before allowing you to access the application
                </p>
                <p className={`text-xs ${isDark ? "text-slate-600" : "text-slate-400"}`}>
                  (only shows up when app is not part of your pinned application)
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showKeyboardShortcuts && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowKeyboardShortcuts(false)
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="shortcuts-title"
        >
          <div
            className={`w-full max-w-sm mx-4 ${bgCard} border ${contrastBorder} rounded-lg shadow-xl overflow-hidden`}
          >
            <div className={`flex items-center justify-between p-4 border-b ${borderColor}`}>
              <h2 id="shortcuts-title" className="font-semibold flex items-center gap-2">
                <Keyboard className="w-5 h-5" />
                Keyboard Shortcuts
              </h2>
              <button
                onClick={() => setShowKeyboardShortcuts(false)}
                className={`${smallButtonPadding} rounded ${bgCardHover} ${focusClass}`}
                aria-label="Close"
              >
                x
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className={textSecondary}>Open search</span>
                <kbd className={`px-2 py-1 ${isDark ? "bg-slate-700" : "bg-slate-200"} rounded text-xs font-mono`}>
                  Ctrl + K
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className={textSecondary}>Close dialogs</span>
                <kbd className={`px-2 py-1 ${isDark ? "bg-slate-700" : "bg-slate-200"} rounded text-xs font-mono`}>
                  Esc
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className={textSecondary}>Show shortcuts</span>
                <kbd className={`px-2 py-1 ${isDark ? "bg-slate-700" : "bg-slate-200"} rounded text-xs font-mono`}>
                  ?
                </kbd>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accessibility Settings */}
      <AccessibilitySettings options={options} onChange={setOptions} />
    </div>
  )
}
