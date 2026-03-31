'use client'

import Navigation from '@/components/navigation'
import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const [userName, setUserName] = useState('')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [notifications, setNotifications] = useState(true)
  const [saved, setSaved] = useState(false)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('pci-dss-user')
      if (storedUser) {
        const user = JSON.parse(storedUser)
        setUserName(user.name || '')
      }
      setTheme((localStorage.getItem('pci-dss-theme') as 'dark' | 'light') || 'dark')
    }
  }, [])
  
  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pci-dss-user', JSON.stringify({ name: userName, role: 'admin' }))
      localStorage.setItem('pci-dss-theme', theme)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }
  
  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('pci-dss-assessment')
        localStorage.removeItem('pci-dss-evidence')
        localStorage.removeItem('pci-dss-timeline')
        localStorage.removeItem('pci-dss-onboarding')
        alert('All data has been reset. The page will reload.')
        window.location.reload()
      }
    }
  }
  
  const exportData = () => {
    if (typeof window !== 'undefined') {
      const data = {
        assessment: JSON.parse(localStorage.getItem('pci-dss-assessment') || '{}'),
        evidence: JSON.parse(localStorage.getItem('pci-dss-evidence') || '[]'),
        timeline: JSON.parse(localStorage.getItem('pci-dss-timeline') || '[]'),
        exportedAt: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'pci-dss-toolkit-export.json'
      a.click()
      URL.revokeObjectURL(url)
    }
  }
  
  return (
    <main className="min-h-screen bg-slate-900 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h2 className="text-2xl font-bold mb-8">Settings</h2>
        
        {/* Profile Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">👤 Profile</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
                placeholder="Compliance Officer"
              />
            </div>
            
            <div>
              <label className="block text-sm text-slate-400 mb-1">Role</label>
              <input
                type="text"
                value="GRC Analyst"
                disabled
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-400"
              />
            </div>
          </div>
        </div>
        
        {/* Appearance Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">🎨 Appearance</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Theme</div>
              <div className="text-sm text-slate-400">Choose your preferred color scheme</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme('dark')}
                className={`px-4 py-2 rounded-lg transition ${
                  theme === 'dark' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'
                }`}
              >
                🌙 Dark
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`px-4 py-2 rounded-lg transition ${
                  theme === 'light' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'
                }`}
              >
                ☀️ Light
              </button>
            </div>
          </div>
        </div>
        
        {/* Notifications Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">🔔 Notifications</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Enable Notifications</div>
              <div className="text-sm text-slate-400">Get reminders for deadlines</div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition ${
                notifications ? 'bg-emerald-500' : 'bg-slate-600'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition transform ${
                notifications ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
        
        {/* Data Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">💾 Data Management</h3>
          
          <div className="space-y-4">
            <button
              onClick={exportData}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition"
            >
              📤 Export All Data
            </button>
            
            <button
              onClick={handleResetData}
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg transition border border-red-500/30"
            >
              🗑️ Reset All Data
            </button>
          </div>
          
          <p className="text-xs text-slate-500 mt-4">
            All data is stored locally in your browser. No data is sent to any server.
          </p>
        </div>
        
        {/* Keyboard Shortcuts */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">⌨️ Keyboard Shortcuts</h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Navigate Dashboard</span>
              <kbd className="bg-slate-700 px-2 py-0.5 rounded">D</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Open Assessment</span>
              <kbd className="bg-slate-700 px-2 py-0.5 rounded">A</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">View Evidence</span>
              <kbd className="bg-slate-700 px-2 py-0.5 rounded">E</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Generate Reports</span>
              <kbd className="bg-slate-700 px-2 py-0.5 rounded">R</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Open Settings</span>
              <kbd className="bg-slate-700 px-2 py-0.5 rounded">S</kbd>
            </div>
          </div>
        </div>
        
        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            saved ? 'bg-emerald-600 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'
          }`}
        >
          {saved ? '✓ Saved!' : 'Save Changes'}
        </button>
        
        {/* Version Info */}
        <div className="text-center text-slate-500 text-sm mt-8">
          <p>PCI DSS Toolkit v1.0.0</p>
          <p className="mt-1">Built with ❤️ for GRC professionals</p>
        </div>
      </div>
    </main>
  )
}
