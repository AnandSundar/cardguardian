'use client'

import Navigation from '@/components/navigation'
import { PCI_DSS_REQUIREMENTS, FRAMEWORK_MAPPING } from '@/lib/data'
import { useState } from 'react'

type Framework = 'soc2' | 'iso27001' | 'nist'

export default function FrameworkMappingPage() {
  const [selectedFramework, setSelectedFramework] = useState<Framework>('soc2')
  const [selectedReq, setSelectedReq] = useState<string | null>(null)
  
  const frameworks: { key: Framework; label: string; description: string }[] = [
    { key: 'soc2', label: 'SOC 2', description: 'Service Organization Control 2' },
    { key: 'iso27001', label: 'ISO 27001', description: 'Information Security Management' },
    { key: 'nist', label: 'NIST CSF', description: 'Cybersecurity Framework' },
  ]
  
  // Calculate overlap statistics
  const getOverlapStats = () => {
    const allMappedControls = new Set<string>()
    PCI_DSS_REQUIREMENTS.forEach(req => {
      const mapping = FRAMEWORK_MAPPING[req.number as keyof typeof FRAMEWORK_MAPPING]
      if (mapping && mapping[selectedFramework]) {
        mapping[selectedFramework].forEach(control => allMappedControls.add(control))
      }
    })
    return allMappedControls.size
  }
  
  return (
    <main className="min-h-screen bg-slate-900 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Framework Mapping</h2>
          <p className="text-slate-400 mt-1">See how PCI DSS maps to other compliance frameworks</p>
        </div>
        
        {/* Framework Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {frameworks.map((fw) => (
            <button
              key={fw.key}
              onClick={() => setSelectedFramework(fw.key)}
              className={`p-4 rounded-xl border text-left transition ${
                selectedFramework === fw.key
                  ? 'bg-emerald-500/10 border-emerald-500'
                  : 'bg-slate-800 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="font-semibold text-lg">{fw.label}</div>
              <div className="text-sm text-slate-400">{fw.description}</div>
              <div className="text-xs text-slate-500 mt-2">
                {getOverlapStats()} controls mapped
              </div>
            </button>
          ))}
        </div>
        
        {/* Visual Mapping */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Control Overlap Visualization</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
                  <th className="pb-3 pr-4">PCI DSS Req</th>
                  <th className="pb-3">Mapped {frameworks.find(f => f.key === selectedFramework)?.label} Controls</th>
                  <th className="pb-3 text-center">Coverage</th>
                </tr>
              </thead>
              <tbody>
                {PCI_DSS_REQUIREMENTS.map((req) => {
                  const mapping = FRAMEWORK_MAPPING[req.number as keyof typeof FRAMEWORK_MAPPING]
                  const controls = mapping?.[selectedFramework] || []
                  const isSelected = selectedReq === req.number
                  
                  return (
                    <tr 
                      key={req.number}
                      className={`border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/30 ${
                        isSelected ? 'bg-slate-700/50' : ''
                      }`}
                      onClick={() => setSelectedReq(isSelected ? null : req.number)}
                    >
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded text-xs flex items-center justify-center font-bold">
                            {req.number}
                          </span>
                          <span className="text-sm">{req.title}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex flex-wrap gap-1">
                          {controls.length > 0 ? (
                            controls.map((control, i) => (
                              <span 
                                key={i}
                                className="bg-slate-700 px-2 py-0.5 rounded text-xs"
                              >
                                {control}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-500 text-sm">No direct mapping</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 text-center">
                        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 transition-all"
                            style={{ width: `${Math.min(controls.length * 25, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 mt-1">{controls.length} controls</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">💡 Why This Matters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="font-medium mb-2">Compliance Efficiency</div>
              <p className="text-sm text-slate-400">
                Evidence collected for PCI DSS can often satisfy requirements in SOC 2, ISO 27001, and NIST frameworks.
              </p>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="font-medium mb-2">Audit Preparation</div>
              <p className="text-sm text-slate-400">
                Understanding overlaps helps you prepare for multiple audits simultaneously, saving time and resources.
              </p>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="font-medium mb-2">Gap Identification</div>
              <p className="text-sm text-slate-400">
                Easily identify which controls need additional work to achieve compliance across frameworks.
              </p>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="font-medium mb-2">Resource Optimization</div>
              <p className="text-sm text-slate-400">
                Prioritize evidence collection for controls that satisfy multiple framework requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
