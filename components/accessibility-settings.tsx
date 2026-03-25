"use client"

import { useState, useEffect } from "react"
import {
  Sun,
  Moon,
  Type,
  Eye,
  Zap,
  Settings,
  X,
  Minus,
  Plus,
  MousePointer,
  Volume2,
} from "lucide-react"

export interface AccessibilityOptions {
  theme: "light" | "dark"
  fontSize: "small" | "medium" | "large" | "xlarge"
  highContrast: boolean
  reducedMotion: boolean
  focusIndicators: boolean
  largerClickTargets: boolean
  screenReaderMode: boolean
}

const defaultOptions: AccessibilityOptions = {
  theme: "dark",
  fontSize: "medium",
  highContrast: false,
  reducedMotion: false,
  focusIndicators: true,
  largerClickTargets: false,
  screenReaderMode: false,
}

interface AccessibilitySettingsProps {
  options: AccessibilityOptions
  onChange: (options: AccessibilityOptions) => void
}

export function AccessibilitySettings({ options, onChange }: AccessibilitySettingsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateOption = <K extends keyof AccessibilityOptions>(
    key: K,
    value: AccessibilityOptions[K]
  ) => {
    onChange({ ...options, [key]: value })
  }

  const fontSizes = ["small", "medium", "large", "xlarge"] as const
  const fontSizeIndex = fontSizes.indexOf(options.fontSize)

  const decreaseFontSize = () => {
    if (fontSizeIndex > 0) {
      updateOption("fontSize", fontSizes[fontSizeIndex - 1])
    }
  }

  const increaseFontSize = () => {
    if (fontSizeIndex < fontSizes.length - 1) {
      updateOption("fontSize", fontSizes[fontSizeIndex + 1])
    }
  }

  const resetToDefaults = () => {
    onChange(defaultOptions)
  }

  return (
    <>
      {/* Floating Accessibility Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all
          ${options.theme === "dark" 
            ? "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-600" 
            : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-300"}
          ${options.largerClickTargets ? "p-4" : "p-3"}
          ${options.reducedMotion ? "" : "hover:scale-105"}
        `}
        aria-label="Open accessibility settings"
        title="Accessibility Settings"
      >
        <Settings className={options.largerClickTargets ? "w-6 h-6" : "w-5 h-5"} />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false)
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="accessibility-title"
        >
          <div
            className={`w-full max-w-md mx-4 rounded-lg shadow-xl overflow-hidden
              ${options.theme === "dark" 
                ? "bg-zinc-900 text-white border border-zinc-700" 
                : "bg-white text-gray-900 border border-gray-200"}
            `}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b
              ${options.theme === "dark" ? "border-zinc-700" : "border-gray-200"}
            `}>
              <h2 id="accessibility-title" className="text-lg font-semibold flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Accessibility Settings
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-lg transition-colors
                  ${options.theme === "dark" 
                    ? "hover:bg-zinc-800" 
                    : "hover:bg-gray-100"}
                `}
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Settings Content */}
            <div className="p-4 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Theme Toggle */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  {options.theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  Theme
                </label>
                <div className={`flex rounded-lg overflow-hidden border
                  ${options.theme === "dark" ? "border-zinc-700" : "border-gray-300"}
                `}>
                  <button
                    onClick={() => updateOption("theme", "light")}
                    className={`flex-1 py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors
                      ${options.theme === "light"
                        ? "bg-blue-600 text-white"
                        : options.theme === "dark"
                          ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-600"}
                    `}
                    aria-pressed={options.theme === "light"}
                  >
                    <Sun className="w-4 h-4" />
                    Light
                  </button>
                  <button
                    onClick={() => updateOption("theme", "dark")}
                    className={`flex-1 py-2 px-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors
                      ${options.theme === "dark"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-600"}
                    `}
                    aria-pressed={options.theme === "dark"}
                  >
                    <Moon className="w-4 h-4" />
                    Dark
                  </button>
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Type className="w-4 h-4" />
                  Font Size: {options.fontSize.charAt(0).toUpperCase() + options.fontSize.slice(1)}
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decreaseFontSize}
                    disabled={fontSizeIndex === 0}
                    className={`p-2 rounded-lg border transition-colors
                      ${options.theme === "dark"
                        ? "border-zinc-700 hover:bg-zinc-800 disabled:opacity-40"
                        : "border-gray-300 hover:bg-gray-100 disabled:opacity-40"}
                    `}
                    aria-label="Decrease font size"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className={`flex-1 h-2 rounded-full overflow-hidden
                    ${options.theme === "dark" ? "bg-zinc-700" : "bg-gray-200"}
                  `}>
                    <div
                      className="h-full bg-blue-600 transition-all"
                      style={{ width: `${((fontSizeIndex + 1) / fontSizes.length) * 100}%` }}
                    />
                  </div>
                  <button
                    onClick={increaseFontSize}
                    disabled={fontSizeIndex === fontSizes.length - 1}
                    className={`p-2 rounded-lg border transition-colors
                      ${options.theme === "dark"
                        ? "border-zinc-700 hover:bg-zinc-800 disabled:opacity-40"
                        : "border-gray-300 hover:bg-gray-100 disabled:opacity-40"}
                    `}
                    aria-label="Increase font size"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Toggle Options */}
              <div className="space-y-3">
                {/* High Contrast */}
                <ToggleOption
                  icon={<Eye className="w-4 h-4" />}
                  label="High Contrast"
                  description="Increase color contrast for better visibility"
                  checked={options.highContrast}
                  onChange={(checked) => updateOption("highContrast", checked)}
                  theme={options.theme}
                />

                {/* Reduced Motion */}
                <ToggleOption
                  icon={<Zap className="w-4 h-4" />}
                  label="Reduced Motion"
                  description="Minimize animations and transitions"
                  checked={options.reducedMotion}
                  onChange={(checked) => updateOption("reducedMotion", checked)}
                  theme={options.theme}
                />

                {/* Focus Indicators */}
                <ToggleOption
                  icon={<Eye className="w-4 h-4" />}
                  label="Enhanced Focus Indicators"
                  description="Show larger, more visible focus outlines"
                  checked={options.focusIndicators}
                  onChange={(checked) => updateOption("focusIndicators", checked)}
                  theme={options.theme}
                />

                {/* Larger Click Targets */}
                <ToggleOption
                  icon={<MousePointer className="w-4 h-4" />}
                  label="Larger Click Targets"
                  description="Increase button and link sizes for easier clicking"
                  checked={options.largerClickTargets}
                  onChange={(checked) => updateOption("largerClickTargets", checked)}
                  theme={options.theme}
                />

                {/* Screen Reader Mode */}
                <ToggleOption
                  icon={<Volume2 className="w-4 h-4" />}
                  label="Screen Reader Optimized"
                  description="Add extra context for screen readers"
                  checked={options.screenReaderMode}
                  onChange={(checked) => updateOption("screenReaderMode", checked)}
                  theme={options.theme}
                />
              </div>
            </div>

            {/* Footer */}
            <div className={`flex items-center justify-between p-4 border-t
              ${options.theme === "dark" ? "border-zinc-700" : "border-gray-200"}
            `}>
              <button
                onClick={resetToDefaults}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
                  ${options.theme === "dark"
                    ? "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}
                `}
              >
                Reset to Defaults
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

interface ToggleOptionProps {
  icon: React.ReactNode
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
  theme: "light" | "dark"
}

function ToggleOption({ icon, label, description, checked, onChange, theme }: ToggleOptionProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors
        ${theme === "dark"
          ? "hover:bg-zinc-800 border border-zinc-800"
          : "hover:bg-gray-50 border border-gray-200"}
        ${checked
          ? theme === "dark"
            ? "bg-zinc-800 border-blue-500/50"
            : "bg-blue-50 border-blue-300"
          : ""}
      `}
      role="switch"
      aria-checked={checked}
    >
      <div className={`mt-0.5 ${checked ? "text-blue-500" : theme === "dark" ? "text-zinc-400" : "text-gray-500"}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">{label}</div>
        <div className={`text-xs ${theme === "dark" ? "text-zinc-500" : "text-gray-500"}`}>
          {description}
        </div>
      </div>
      <div
        className={`w-10 h-6 rounded-full p-0.5 transition-colors
          ${checked ? "bg-blue-600" : theme === "dark" ? "bg-zinc-700" : "bg-gray-300"}
        `}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white shadow transition-transform
            ${checked ? "translate-x-4" : "translate-x-0"}
          `}
        />
      </div>
    </button>
  )
}

export function useAccessibility() {
  const [options, setOptions] = useState<AccessibilityOptions>(defaultOptions)

  useEffect(() => {
    const saved = localStorage.getItem("accessibility-options")
    if (saved) {
      try {
        setOptions(JSON.parse(saved))
      } catch {
        // Use defaults if parsing fails
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("accessibility-options", JSON.stringify(options))

    // Apply theme to document
    if (options.theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }

    // Apply reduced motion
    if (options.reducedMotion) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }

    // Apply high contrast
    if (options.highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [options])

  return { options, setOptions }
}

export { defaultOptions }
