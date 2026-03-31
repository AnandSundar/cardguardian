'use client'

import Navigation from '@/components/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getAssessment, updateRequirementStatus, getComplianceStats, getEvidenceByRequirement, createDefaultAssessment } from '@/lib/db'
import { EVIDENCE_TEMPLATES, getFrameworkMapping } from '@/lib/data'

const statusColors: Record<string, string> = {
  compliant: 'bg-emerald-500',
  partial: 'bg-yellow-500',
  'not_started': 'bg-slate-600',
  'non-compliant': 'bg-red-500',
}

const statusLabels: Record<string, string> = {
  compliant: 'Compliant',
  partial: 'Partial',
  'not_started': 'Not Started',
  'non-compliant': 'Non-Compliant',
}

export default function AssessmentPage() {
  const [assessment, setAssessment] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [selectedReq, setSelectedReq] = useState<number | null>(null)
  const [showTemplates, setShowTemplates] = useState(false)
  const [showMapping, setShowMapping] = useState(false)
  
  useEffect(() => {
    try {
      const assessmentData = getAssessment()
      setAssessment(assessmentData)
      if (assessmentData && assessmentData.requirements) {
        setStats(getComplianceStats(assessmentData))
      }
    } catch (error) {
      console.error('Error loading assessment:', error)
      setAssessment(createDefaultAssessment())
      setStats({ total: 12, compliant: 0, partial: 0, notStarted: 12, nonCompliant: 0, percentage: 0, weightedPercentage: 0, riskLevel: { level: 'Critical', color: '#ef4444', description: 'Not audit ready' } })
    }
  }, [])
  
  const handleStatusChange = (reqId: number, newStatus: string, notes?: string) => {
    try {
      updateRequirementStatus(reqId, newStatus, notes)
      const updated = getAssessment()
      setAssessment(updated)
      if (updated && updated.requirements) {
        setStats(getComplianceStats(updated))
      }
    } catch (error) {
      console.error('Error updating requirement status:', error)
    }
  }
  
  if (!assessment) return <div className="min-h-screen bg-slate-900" />
  
  const selectedRequirement = assessment?.requirements?.find((r: any) => r.id === selectedReq)
  const templates = selectedRequirement ? EVIDENCE_TEMPLATES[selectedRequirement.requirement_number] || [] : []
  const frameworkMap = selectedRequirement ? getFrameworkMapping(selectedRequirement.requirement_number) : null
  const evidenceFiles = selectedRequirement ? getEvidenceByRequirement(selectedRequirement.requirement_number) : []

  // Default stats fallback
  const safeStats = stats || {
    total: 12,
    compliant: 0,
    partial: 0,
    notStarted: 12,
    nonCompliant: 0,
    percentage: 0,
    weightedPercentage: 0,
    riskLevel: {
      level: 'Critical',
      color: '#ef4444',
      description: 'Not audit ready'
    }
  }
  
  return (
    <main className="min-h-screen bg-slate-900 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Compliance Assessment</h2>
            <p className="text-slate-400 mt-1">{assessment.name}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-emerald-400">{safeStats.percentage}%</div>
            <div className="text-sm text-slate-400">{safeStats.compliant} of 12 compliant</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Overall Progress</span>
            <span className="text-emerald-400 font-semibold">{safeStats.weightedPercentage}% weighted</span>
          </div>
          <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${safeStats.percentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>Risk Level: <span style={{ color: safeStats.riskLevel.color }}>{safeStats.riskLevel.level}</span></span>
            <span>{safeStats.riskLevel.description}</span>
          </div>
        </div>
        
        {/* Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessment?.requirements?.map((req: any) => (
            <div 
              key={req.id}
              className={`bg-slate-800 rounded-xl border p-6 cursor-pointer transition ${
                selectedReq === req.id ? 'border-emerald-500' : 'border-slate-700 hover:border-slate-600'
              }`}
              onClick={() => setSelectedReq(selectedReq === req.id ? null : req.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    req.status === 'compliant' ? 'bg-emerald-500/20 text-emerald-400' :
                    req.status === 'partial' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-slate-600/50 text-slate-400'
                  }`}>
                    {req.requirement_number}
                  </div>
                  <div>
                    <h3 className="font-semibold">{req.title}</h3>
                    <p className="text-xs text-slate-500">{req.category}</p>
                  </div>
                </div>
              </div>
              
              {/* Status Selector */}
              <select
                value={req.status}
                onChange={(e) => {
                  e.stopPropagation()
                  handleStatusChange(req.id, e.target.value)
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm mb-3"
              >
                <option value="not_started">Not Started</option>
                <option value="partial">Partial</option>
                <option value="compliant">Compliant</option>
                <option value="non-compliant">Non-Compliant</option>
              </select>
              
              {/* Status Badge & Evidence Count */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${statusColors[req.status]}`} />
                  <span className="text-sm text-slate-400">{statusLabels[req.status]}</span>
                </div>
                <span className="text-xs text-slate-500">
                  {getEvidenceByRequirement(req.requirement_number).length} files
                </span>
              </div>
              
              {/* Expanded Details */}
              {selectedReq === req.id && (
                <div className="mt-4 pt-4 border-t border-slate-700 space-y-4">
                  {/* Description */}
                  <p className="text-sm text-slate-400">{req.description}</p>
                  
                  {/* Weight */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Weight</span>
                    <span className="font-semibold">{req.weight}/10</span>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowTemplates(true)
                      }}
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-sm py-2 rounded-lg transition"
                    >
                      📋 Templates
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowMapping(true)
                      }}
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-sm py-2 rounded-lg transition"
                    >
                      🔗 Mapping
                    </button>
                    <Link
                      href={`/evidence?req=${req.requirement_number}`}
                      className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-sm py-2 rounded-lg transition text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      📁 Evidence
                    </Link>
                  </div>
                  
                  {/* Notes */}
                  {req.notes && (
                    <div className="bg-slate-700/50 p-3 rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">Notes</div>
                      <p className="text-sm">{req.notes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Templates Modal */}
      {showTemplates && selectedRequirement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowTemplates(false)}>
          <div className="bg-slate-800 rounded-xl p-6 max-w-lg w-full border border-slate-700 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Evidence Templates</h3>
              <button onClick={() => setShowTemplates(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            
            <p className="text-sm text-slate-400 mb-4">
              Suggested evidence for Requirement {selectedRequirement.requirement_number}: {selectedRequirement.title}
            </p>
            
            <div className="space-y-4">
              {templates.length > 0 ? templates.map((template: any, i: number) => (
                <div key={i} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                  <h4 className="font-semibold mb-2">{template.title}</h4>
                  <p className="text-sm text-slate-400 mb-3">{template.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Format: {template.format}</span>
                  </div>
                  <div className="mt-3 p-2 bg-emerald-500/10 rounded border border-emerald-500/30">
                    <div className="text-xs text-emerald-400 font-semibold mb-1">💡 What auditors look for:</div>
                    <p className="text-xs text-slate-300">{template.auditorLooksFor}</p>
                  </div>
                </div>
              )) : (
                <p className="text-slate-500 text-center py-4">No templates available for this requirement yet.</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Framework Mapping Modal */}
      {showMapping && selectedRequirement && frameworkMap && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowMapping(false)}>
          <div className="bg-slate-800 rounded-xl p-6 max-w-lg w-full border border-slate-700" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Framework Mapping</h3>
              <button onClick={() => setShowMapping(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            
            <p className="text-sm text-slate-400 mb-4">
              Req {selectedRequirement.requirement_number} maps to these controls in other frameworks:
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-emerald-400">SOC 2</h4>
                <div className="flex flex-wrap gap-2">
                  {frameworkMap.soc2.map((c: string, i: number) => (
                    <span key={i} className="bg-slate-700 px-3 py-1 rounded-full text-sm">{c}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-blue-400">ISO 27001</h4>
                <div className="flex flex-wrap gap-2">
                  {frameworkMap.iso27001.map((c: string, i: number) => (
                    <span key={i} className="bg-slate-700 px-3 py-1 rounded-full text-sm">{c}</span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2 text-purple-400">NIST CSF</h4>
                <div className="flex flex-wrap gap-2">
                  {frameworkMap.nist.map((c: string, i: number) => (
                    <span key={i} className="bg-slate-700 px-3 py-1 rounded-full text-sm">{c}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 mt-4">
              💡 Evidence collected for this requirement can satisfy these framework controls.
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
