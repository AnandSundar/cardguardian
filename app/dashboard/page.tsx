'use client'

import Navigation from '@/components/navigation'
import { getAssessment, getComplianceStats, getEvidence } from '@/lib/db'
import { PCI_DSS_REQUIREMENTS } from '@/lib/data'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts'

export default function DashboardPage() {
  const [assessment, setAssessment] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [evidence, setEvidence] = useState<any[]>([])
  
  useEffect(() => {
    const assessment = getAssessment()
    setAssessment(assessment)
    setStats(getComplianceStats(assessment))
    setEvidence(getEvidence())
  }, [])
  
  if (!assessment || !stats) return <div className="min-h-screen bg-slate-900" />
  
  const complianceData = [
    { name: 'Compliant', value: stats.compliant, color: '#10b981' },
    { name: 'Partial', value: stats.partial, color: '#eab308' },
    { name: 'Not Started', value: stats.notStarted, color: '#475569' },
  ].filter(d => d.value > 0)
  
  const gaps = assessment.requirements.filter((r: any) => r.status !== 'compliant')
  
  const heatmapData = PCI_DSS_REQUIREMENTS.map(req => {
    const reqData = assessment.requirements.find((r: any) => r.requirement_number === req.number)
    const reqEvidence = evidence.filter(e => e.requirement_number === req.number)
    return { ...req, status: reqData?.status, evidenceCount: reqEvidence.length }
  })
  
  return (
    <main className="min-h-screen bg-slate-900 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Compliance Dashboard</h2>
            <p className="text-slate-400 mt-1">Real-time view of your compliance posture</p>
          </div>
          <Link href="/assessment" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg transition">
            Update Assessment
          </Link>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Overall Score</div>
            <div className="text-4xl font-bold text-emerald-400">{stats.percentage}%</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Weighted</div>
            <div className="text-4xl font-bold">{stats.weightedPercentage}%</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Risk Level</div>
            <div className="text-2xl font-bold" style={{ color: stats.riskLevel.color }}>{stats.riskLevel.level}</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Evidence</div>
            <div className="text-4xl font-bold">{evidence.length}</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
            <div className="text-slate-400 text-sm mb-1">Gaps</div>
            <div className="text-4xl font-bold text-red-400">{gaps.length}</div>
          </div>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={complianceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {complianceData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Heatmap */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold mb-4">Compliance Heatmap</h3>
            <div className="grid grid-cols-6 gap-2">
              {heatmapData.map((req) => (
                <div
                  key={req.number}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center ${
                    req.status === 'compliant' ? 'bg-emerald-500/30 border border-emerald-500' :
                    req.status === 'partial' ? 'bg-yellow-500/30 border border-yellow-500' :
                    'bg-slate-700 border border-slate-600'
                  }`}
                >
                  <span className="font-bold">{req.number}</span>
                  <span className="text-xs text-slate-400">{req.evidenceCount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Gaps */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
          <h3 className="text-lg font-semibold mb-4">Gap Analysis</h3>
          {gaps.length === 0 ? (
            <div className="text-center py-8 text-emerald-400">
              <div className="text-4xl mb-2">✅</div>
              <p>All requirements compliant!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {gaps.slice(0, 5).map((gap: any) => (
                <Link key={gap.id} href="/assessment" className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center font-bold">{gap.requirement_number}</div>
                    <div>
                      <div className="font-medium">{gap.title}</div>
                      <div className="text-sm text-slate-400 capitalize">{gap.status.replace('_', ' ')}</div>
                    </div>
                  </div>
                  <span className="text-emerald-400">→</span>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/assessment" className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-lg text-center transition">Assessment</Link>
          <Link href="/evidence" className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg text-center transition">Evidence</Link>
          <Link href="/reports" className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg text-center transition">Reports</Link>
          <Link href="/audit-simulation" className="bg-slate-700 hover:bg-slate-600 text-white p-4 rounded-lg text-center transition">Quiz</Link>
        </div>
      </div>
    </main>
  )
}
