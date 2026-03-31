'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getAssessment, getComplianceStats, getTheme, setTheme as saveTheme, getUser, setUser as saveUser } from './db'
import { Assessment } from './db'

interface AppContextType {
  assessment: Assessment | null
  setAssessment: (a: Assessment) => void
  stats: { total: number; compliant: number; partial: number; notStarted: number; percentage: number; weightedPercentage: number; riskLevel: { level: string; color: string; description: string } } | null
  refreshStats: () => void
  theme: 'dark' | 'light'
  toggleTheme: () => void
  user: { name: string; role: string }
  userName: string
  setUserName: (name: string) => void
  showOnboarding: boolean
  completeOnboarding: () => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [assessment, setAssessmentState] = useState<Assessment | null>(null)
  const [stats, setStats] = useState<AppContextType['stats']>(null)
  const [theme, setThemeState] = useState<'dark' | 'light'>('dark')
  const [user, setUserState] = useState({ name: 'Guest', role: 'viewer' })
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    const assessment = getAssessment()
    setAssessmentState(assessment)
    setStats(getComplianceStats(assessment))
    setThemeState(getTheme())
    setUserState(getUser() as { name: string; role: string })
    
    // Check if first visit
    if (typeof window !== 'undefined') {
      const hasOnboarded = localStorage.getItem('pci-dss-onboarding')
      if (!hasOnboarded) {
        setShowOnboarding(true)
      }
    }
  }, [])

  const setAssessment = (a: Assessment) => {
    setAssessmentState(a)
    setStats(getComplianceStats(a))
  }

  const refreshStats = () => {
    if (assessment) {
      setStats(getComplianceStats(assessment))
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setThemeState(newTheme)
    saveTheme(newTheme)
  }

  const setUserName = (name: string) => {
    const updatedUser = { ...user, name } as { name: string; role: 'admin' | 'viewer' }
    setUserState(updatedUser)
    saveUser(updatedUser)
  }

  const completeOnboarding = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pci-dss-onboarding', 'true')
    }
    setShowOnboarding(false)
  }

  return (
    <AppContext.Provider value={{
      assessment,
      setAssessment,
      stats,
      refreshStats,
      theme,
      toggleTheme,
      user,
      userName: user.name,
      setUserName,
      showOnboarding,
      completeOnboarding
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
