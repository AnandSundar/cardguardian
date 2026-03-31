'use client'

import Navigation from '@/components/navigation'
import { useState, useEffect } from 'react'
import { logSecurityEvent, checkRateLimit, sanitizeInput, validateInput } from '@/lib/security'

type ReportType = 'executive' | 'technical' | 'audit'

export default function ReportsPage() {
  const [generating, setGenerating] = useState(false)
  const [reportType, setReportType] = useState<ReportType>('executive')
  const [assessment, setAssessment] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [evidence, setEvidence] = useState<any[]>([])
  
  useEffect(() => {
    // Load data from localStorage
    const storedAssessment = localStorage.getItem('pci-dss-assessment')
    const storedEvidence = localStorage.getItem('pci-dss-evidence')
    
    if (storedAssessment) {
      const assessmentData = JSON.parse(storedAssessment)
      setAssessment(assessmentData)
      
      // Calculate stats
      const compliant = assessmentData.requirements.filter((r: any) => r.status === 'compliant').length
      const total = assessmentData.requirements.length
      setStats({
        percentage: Math.round((compliant / total) * 100),
        compliant,
        partial: assessmentData.requirements.filter((r: any) => r.status === 'partial').length,
        notStarted: assessmentData.requirements.filter((r: any) => r.status === 'not_started').length,
        total
      })
    }
    
    if (storedEvidence) {
      setEvidence(JSON.parse(storedEvidence))
    }
  }, [])
  
  const generatePDF = async () => {
    setGenerating(true)
    alert(`Generating ${reportType} PDF report... (This would create a downloadable PDF in production)`)
    setGenerating(false)
  }
  
  const generateCSV = () => {
    alert('CSV export downloaded! (This would create a downloadable CSV in production)')
  }

  const generateEvidencePackage = () => {
    alert('Evidence manifest downloaded! (This would create a ZIP file with all evidence in production)')
  }
  
  // Default data if not loaded yet
  const displayStats = stats || { percentage: 42, compliant: 5, partial: 3, notStarted: 4, total: 12 }
  const displayEvidence = evidence.length > 0 ? evidence.length : 5
  
  return (
    <main className="min-h-screen bg-slate-900 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8">Reports & Export</h2>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <div className="text-2xl font-bold text-emerald-400">{displayStats.percentage}%</div>
            <div className="text-sm text-slate-400">Compliance</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <div className="text-2xl font-bold">{displayStats.compliant}/12</div>
            <div className="text-sm text-slate-400">Compliant</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <div className="text-2xl font-bold text-yellow-400">{displayStats.partial}</div>
            <div className="text-sm text-slate-400">In Progress</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <div className="text-2xl font-bold">{displayEvidence}</div>
            <div className="text-sm text-slate-400">Evidence Files</div>
          </div>
        </div>

        {/* Report Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setReportType('executive')}
            className={`p-6 rounded-xl border text-left transition ${
              reportType === 'executive' 
                ? 'bg-emerald-500/20 border-emerald-500 ring-2 ring-emerald-500' 
                : 'bg-slate-800 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold mb-1">Executive Summary</h3>
            <p className="text-sm text-slate-400">High-level overview for leadership</p>
            {reportType === 'executive' && <div className="text-emerald-400 text-sm mt-2">✓ Selected</div>}
          </button>
          
          <button
            onClick={() => setReportType('technical')}
            className={`p-6 rounded-xl border text-left transition ${
              reportType === 'technical' 
                ? 'bg-emerald-500/20 border-emerald-500 ring-2 ring-emerald-500' 
                : 'bg-slate-800 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold mb-1">Technical Report</h3>
            <p className="text-sm text-slate-400">Detailed findings and evidence</p>
            {reportType === 'technical' && <div className="text-emerald-400 text-sm mt-2">✓ Selected</div>}
          </button>
          
          <button
            onClick={() => setReportType('audit')}
            className={`p-6 rounded-xl border text-left transition ${
              reportType === 'audit' 
                ? 'bg-emerald-500/20 border-emerald-500 ring-2 ring-emerald-500' 
                : 'bg-slate-800 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="text-3xl mb-3">📁</div>
            <h3 className="font-semibold mb-1">Audit Package</h3>
            <p className="text-sm text-slate-400">Complete package for auditors</p>
            {reportType === 'audit' && <div className="text-emerald-400 text-sm mt-2">✓ Selected</div>}
          </button>
        </div>

        {/* Export Actions */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">Export Options</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={generatePDF}
              disabled={generating}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white font-semibold py-3 rounded-lg transition"
            >
              {generating ? '⏳ Generating...' : '📄 Download PDF'}
            </button>
            
            <button
              onClick={generateCSV}
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition"
            >
              📊 Export CSV
            </button>
            
            <button
              onClick={generateEvidencePackage}
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition"
            >
              📁 Export Evidence Manifest
            </button>
          </div>
        </div>

        {/* Report Preview */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">
            {reportType === 'executive' && '📊 Executive Summary Preview'}
            {reportType === 'technical' && '📋 Technical Report Preview'}
            {reportType === 'audit' && '📁 Audit Package Preview'}
          </h3>
          
          <div className="bg-white text-slate-900 rounded-lg p-6 max-h-96 overflow-y-auto">
            {/* Executive Summary Content */}
            {reportType === 'executive' && (
              <div>
                <div className="border-b border-slate-200 pb-4 mb-4">
                  <h2 className="text-xl font-bold">PCI DSS Compliance Report</h2>
                  <p className="text-sm text-slate-500">Generated: {new Date().toLocaleDateString()}</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Executive Summary</h3>
                  <ul className="text-sm space-y-1">
                    <li>• Overall Compliance: <strong className="text-emerald-600">{displayStats.percentage}%</strong></li>
                    <li>• Compliant Requirements: <strong>{displayStats.compliant}/{displayStats.total}</strong></li>
                    <li>• In Progress: <strong className="text-yellow-600">{displayStats.partial}</strong></li>
                    <li>• Not Started: <strong>{displayStats.notStarted}</strong></li>
                    <li>• Evidence Files: <strong>{displayEvidence}</strong></li>
                  </ul>
                </div>
                
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <h4 className="font-semibold text-emerald-800 mb-1">Recommendation</h4>
                  <p className="text-sm text-slate-600">
                    {displayStats.percentage >= 80 
                      ? 'Organization is audit-ready. Continue maintaining compliance posture.'
                      : `Complete ${80 - displayStats.percentage}% more requirements to achieve audit readiness.`
                    }
                  </p>
                </div>
              </div>
            )}
            
            {/* Technical Report Content */}
            {reportType === 'technical' && (
              <div>
                <div className="border-b border-slate-200 pb-4 mb-4">
                  <h2 className="text-xl font-bold">Technical Compliance Report</h2>
                  <p className="text-sm text-slate-500">Detailed findings by requirement</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold mb-3">Requirement Analysis</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2">Req #</th>
                        <th className="text-left py-2">Title</th>
                        <th className="text-left py-2">Status</th>
                        <th className="text-left py-2">Evidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => {
                        const statuses = ['compliant', 'partial', 'not_started']
                        const randomStatus = statuses[num % 3]
                        return (
                          <tr key={num} className="border-b border-slate-100">
                            <td className="py-2 font-medium">{num}</td>
                            <td className="py-2">Requirement {num}</td>
                            <td className="py-2">
                              <span className={`px-2 py-0.5 rounded text-xs ${
                                randomStatus === 'compliant' ? 'bg-green-100 text-green-800' :
                                randomStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {randomStatus.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="py-2">{num % 3 === 0 ? 0 : Math.ceil(num / 3)} files</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Audit Package Content */}
            {reportType === 'audit' && (
              <div>
                <div className="border-b border-slate-200 pb-4 mb-4">
                  <h2 className="text-xl font-bold">Audit Package Contents</h2>
                  <p className="text-sm text-slate-500">Complete documentation for QSA review</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Package Includes:</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded">
                      <span>📄</span>
                      <div>
                        <div className="font-medium">Executive Summary PDF</div>
                        <div className="text-xs text-slate-500">High-level compliance overview</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded">
                      <span>📋</span>
                      <div>
                        <div className="font-medium">Technical Report PDF</div>
                        <div className="text-xs text-slate-500">Detailed findings by requirement</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded">
                      <span>📁</span>
                      <div>
                        <div className="font-medium">Evidence Files ({displayEvidence} total)</div>
                        <div className="text-xs text-slate-500">Organized by requirement number</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded">
                      <span>📊</span>
                      <div>
                        <div className="font-medium">Evidence Manifest (JSON)</div>
                        <div className="text-xs text-slate-500">File inventory with checksums</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-1">Audit Readiness</h4>
                  <p className="text-sm text-slate-600">
                    This package contains all necessary documentation for a PCI DSS assessment.
                    Present to your QSA during the audit engagement.
                  </p>
                </div>
              </div>
            )}
            
            <div className="text-xs text-slate-400 border-t border-slate-200 pt-4 mt-4">
              Generated by PCI DSS Toolkit - Open Source Compliance Tool
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
