'use client'

import Navigation from '@/components/navigation'
import { useState, useEffect, Suspense, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { logSecurityEvent, validateInput, sanitizeInput, checkRateLimit } from '@/lib/security'

interface EvidenceFile {
  id: number
  fileName: string
  requirementNumber: string
  uploadedAt: string
  status: string
  size: string
}

const requirements = [
  { number: '1', title: 'Firewall Configuration' },
  { number: '2', title: 'Vendor Passwords' },
  { number: '3', title: 'Protect Stored Data' },
  { number: '4', title: 'Encrypt Transmission' },
  { number: '5', title: 'Malware Protection' },
  { number: '6', title: 'Secure Systems' },
  { number: '7', title: 'Restrict Access' },
  { number: '8', title: 'Identify Users' },
  { number: '9', title: 'Physical Access' },
  { number: '10', title: 'Track Access' },
  { number: '11', title: 'Test Security' },
  { number: '12', title: 'Security Policy' },
]

function EvidenceContent({ showUpload, setShowUpload }: { showUpload: boolean; setShowUpload: (v: boolean) => void }) {
  const searchParams = useSearchParams()
  const selectedReq = searchParams.get('req')
  
  const [evidence, setEvidence] = useState<EvidenceFile[]>([])
  const [filterReq, setFilterReq] = useState<string>(selectedReq || 'all')
  const [uploadForm, setUploadForm] = useState({
    fileName: '',
    requirement: selectedReq || '1',
    description: ''
  })
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    const mockEvidence: EvidenceFile[] = [
      { id: 1, fileName: 'firewall-config.pdf', requirementNumber: '1', uploadedAt: '2026-03-30', status: 'approved', size: '245 KB' },
      { id: 2, fileName: 'password-policy.docx', requirementNumber: '2', uploadedAt: '2026-03-30', status: 'approved', size: '128 KB' },
      { id: 3, fileName: 'encryption-protocols.pdf', requirementNumber: '4', uploadedAt: '2026-03-29', status: 'approved', size: '512 KB' },
      { id: 4, fileName: 'access-control-matrix.xlsx', requirementNumber: '8', uploadedAt: '2026-03-29', status: 'pending', size: '89 KB' },
      { id: 5, fileName: 'security-policy.pdf', requirementNumber: '12', uploadedAt: '2026-03-28', status: 'approved', size: '1.2 MB' },
    ]
    setEvidence(mockEvidence)
  }, [])

  const filteredEvidence = filterReq === 'all' 
    ? evidence 
    : evidence.filter(e => e.requirementNumber === filterReq)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files[0]
      setSelectedFile(file)
      setUploadForm(prev => ({
        ...prev,
        fileName: file.name
      }))
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      
      // Security: Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit')
        return
      }
      
      // Security: Validate file type
      const allowedTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'png', 'jpg', 'jpeg', 'txt']
      const ext = file.name.split('.').pop()?.toLowerCase()
      if (!ext || !allowedTypes.includes(ext)) {
        alert('Invalid file type. Allowed: PDF, DOC, XLS, PNG, JPG, TXT')
        return
      }
      
      setSelectedFile(file)
      setUploadForm(prev => ({
        ...prev,
        fileName: file.name
      }))
    }
  }

  const handleUpload = () => {
    if (!uploadForm.fileName.trim()) {
      alert('Please select a file or enter a file name')
      return
    }
    const newEvidence: EvidenceFile = {
      id: evidence.length + 1,
      fileName: uploadForm.fileName,
      requirementNumber: uploadForm.requirement,
      uploadedAt: new Date().toISOString().split('T')[0],
      status: 'pending',
      size: selectedFile ? formatFileSize(selectedFile.size) : '0 KB'
    }
    setEvidence([newEvidence, ...evidence])
    setShowUpload(false)
    setUploadForm({ fileName: '', requirement: '1', description: '' })
    setSelectedFile(null)
  }

  const handleCloseModal = () => {
    setShowUpload(false)
    setUploadForm({ fileName: '', requirement: '1', description: '' })
    setSelectedFile(null)
  }

  const coverageData = requirements.map(req => {
    const count = evidence.filter(e => e.requirementNumber === req.number).length
    return { ...req, evidenceCount: count, hasEvidence: count > 0 }
  })

  return (
    <>
      {/* Coverage Overview */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
        <h3 className="text-lg font-semibold mb-4">Evidence Coverage by Requirement</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {coverageData.map((req) => (
            <div 
              key={req.number}
              className={`p-4 rounded-lg border ${
                req.hasEvidence 
                  ? 'bg-emerald-500/10 border-emerald-500/30' 
                  : 'bg-slate-700/50 border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold">{req.number}</span>
                {req.hasEvidence && <span className="text-emerald-400">✓</span>}
              </div>
              <div className="text-xs text-slate-400 truncate">{req.title}</div>
              <div className="text-sm mt-1">{req.evidenceCount} files</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-4 mb-6">
        <select
          value={filterReq}
          onChange={(e) => setFilterReq(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="all">All Requirements</option>
          {requirements.map((req) => (
            <option key={req.number} value={req.number}>
              Req {req.number}: {req.title}
            </option>
          ))}
        </select>
      </div>

      {/* Evidence List */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-400 text-sm border-b border-slate-700 bg-slate-800/50">
              <th className="px-6 py-4">File Name</th>
              <th className="px-6 py-4">Requirement</th>
              <th className="px-6 py-4">Uploaded</th>
              <th className="px-6 py-4">Size</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvidence.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                  No evidence files found. Click &quot;+ Upload Evidence&quot; to get started.
                </td>
              </tr>
            ) : (
              filteredEvidence.map((file) => (
                <tr key={file.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📄</span>
                      <span className="font-medium">{file.fileName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-700 px-2 py-1 rounded text-sm">
                      Req {file.requirementNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">{file.uploadedAt}</td>
                  <td className="px-6 py-4 text-slate-400">{file.size}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      file.status === 'approved' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {file.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-slate-400 hover:text-white text-sm">View</button>
                      <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleCloseModal}>
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">Upload Evidence</h3>
            
            <div className="space-y-4">
              {/* Drag and Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
                  isDragging 
                    ? 'border-emerald-500 bg-emerald-500/10' 
                    : 'border-slate-600 hover:border-slate-500 bg-slate-700/50'
                }`}
              >
                <input
                  type="file"
                  id="file-input"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.txt"
                />
                <label htmlFor="file-input" className="cursor-pointer">
                  {selectedFile ? (
                    <div>
                      <div className="text-4xl mb-3">📁</div>
                      <div className="font-medium text-emerald-400">{selectedFile.name}</div>
                      <div className="text-sm text-slate-400 mt-1">{formatFileSize(selectedFile.size)}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-4xl mb-3">📤</div>
                      <div className="font-medium text-slate-300">
                        {isDragging ? 'Drop file here' : 'Drag & drop file here'}
                      </div>
                      <div className="text-sm text-slate-500 mt-1">or click to browse</div>
                      <div className="text-xs text-slate-600 mt-2">PDF, DOC, XLS, PNG, JPG, TXT</div>
                    </div>
                  )}
                </label>
              </div>

              {/* Or manually enter filename */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-800 text-slate-500">or enter manually</span>
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">File Name</label>
                <input
                  type="text"
                  value={uploadForm.fileName}
                  onChange={(e) => {
                    setUploadForm({ ...uploadForm, fileName: e.target.value })
                    setSelectedFile(null)
                  }}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., firewall-config.pdf"
                />
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-1">Requirement</label>
                <select
                  value={uploadForm.requirement}
                  onChange={(e) => setUploadForm({ ...uploadForm, requirement: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
                >
                  {requirements.map((req) => (
                    <option key={req.number} value={req.number}>
                      Req {req.number}: {req.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-slate-400 mb-1">Description (Optional)</label>
                <textarea
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 h-20 text-white"
                  placeholder="Brief description of this evidence..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleUpload}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition"
              >
                Upload Evidence
              </button>
              <button
                onClick={handleCloseModal}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default function EvidencePage() {
  const [showUpload, setShowUpload] = useState(false)

  return (
    <main className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🔐</span>
            <h1 className="text-xl font-bold">PCI DSS Toolkit</h1>
          </Link>
          <nav className="flex gap-6">
            <Link href="/dashboard" className="text-slate-400 hover:text-white transition">Dashboard</Link>
            <Link href="/assessment" className="text-slate-400 hover:text-white transition">Assessment</Link>
            <Link href="/evidence" className="text-white font-semibold">Evidence</Link>
            <Link href="/reports" className="text-slate-400 hover:text-white transition">Reports</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Evidence Management</h2>
          <button
            onClick={() => setShowUpload(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            + Upload Evidence
          </button>
        </div>

        <Suspense fallback={<div className="text-slate-400 text-center py-8">Loading...</div>}>
          <EvidenceContent showUpload={showUpload} setShowUpload={setShowUpload} />
        </Suspense>
      </div>
    </main>
  )
}
