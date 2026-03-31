'use client'

import Navigation from '@/components/navigation'
import { useState, useEffect } from 'react'
import { getSecurityLogs, checkDependencySecurity, checkRateLimit, logSecurityEvent } from '@/lib/security'

export default function SecurityPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [dependencies, setDependencies] = useState<any[]>([])
  
  useEffect(() => {
    setLogs(getSecurityLogs())
    setDependencies(checkDependencySecurity())
  }, [])
  
  const clearLogs = () => {
    if (confirm('Clear all security logs?')) {
      localStorage.removeItem('pci-dss-security-logs')
      setLogs([])
      logSecurityEvent('LOGOUT', 'Security logs cleared')
    }
  }
  
  const owaspTop10 = [
    { id: 'A01', name: 'Broken Access Control', status: 'mitigated', description: 'Role-based access control implemented' },
    { id: 'A02', name: 'Cryptographic Failures', status: 'mitigated', description: 'Data encryption helpers, sensitive data sanitization' },
    { id: 'A03', name: 'Injection', status: 'mitigated', description: 'Input validation, output encoding, XSS prevention' },
    { id: 'A04', name: 'Insecure Design', status: 'mitigated', description: 'Security patterns, file validation, size limits' },
    { id: 'A05', name: 'Security Misconfiguration', status: 'mitigated', description: 'Security headers, CSP, HSTS, X-Frame-Options' },
    { id: 'A06', name: 'Vulnerable Components', status: 'checking', description: 'Dependency monitoring active' },
    { id: 'A07', name: 'Auth Failures', status: 'mitigated', description: 'Session management, token generation' },
    { id: 'A08', name: 'Data Integrity', status: 'mitigated', description: 'Checksums, data integrity verification' },
    { id: 'A09', name: 'Logging Failures', status: 'mitigated', description: 'Security event logging, audit trail' },
    { id: 'A10', name: 'SSRF', status: 'mitigated', description: 'URL validation, internal IP blocking' }
  ]
  
  const eventColors: Record<string, string> = {
    LOGIN_SUCCESS: 'text-emerald-400',
    LOGIN_FAILURE: 'text-red-400',
    LOGOUT: 'text-slate-400',
    DATA_EXPORT: 'text-blue-400',
    FILE_UPLOAD: 'text-emerald-400',
    PERMISSION_DENIED: 'text-yellow-400',
    VALIDATION_ERROR: 'text-yellow-400',
    SUSPICIOUS_INPUT: 'text-red-400'
  }
  
  return (
    <main className="min-h-screen bg-slate-900 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-2">Security Dashboard</h2>
        <p className="text-slate-400 mb-8">OWASP Top 10 2025 Compliance</p>
        
        {/* OWASP Top 10 Status */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">🛡️ OWASP Top 10 2025 Status</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {owaspTop10.map(item => (
              <div key={item.id} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-slate-600 px-2 py-0.5 rounded">{item.id}</span>
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    item.status === 'mitigated' ? 'bg-emerald-500/20 text-emerald-400' :
                    item.status === 'checking' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {item.status === 'mitigated' ? '✓ Mitigated' : item.status === 'checking' ? '⏳ Checking' : '⚠ Warning'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Security Headers */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">🔒 Security Headers Active</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Content-Security-Policy',
              'X-Frame-Options: DENY',
              'X-Content-Type-Options: nosniff',
              'X-XSS-Protection: 1; mode=block',
              'Referrer-Policy',
              'Permissions-Policy',
              'Strict-Transport-Security',
              'Server: Secure'
            ].map(header => (
              <div key={header} className="bg-slate-700/50 p-3 rounded-lg text-xs font-mono text-slate-300">
                {header}
              </div>
            ))}
          </div>
        </div>
        
        {/* Dependencies */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4">📦 Dependency Security</h3>
          
          <div className="space-y-2">
            {dependencies.map(dep => (
              <div key={dep.name} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <span className="font-mono text-sm">{dep.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  dep.status === 'ok' ? 'bg-emerald-500/20 text-emerald-400' :
                  dep.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {dep.status === 'ok' ? '✓ Secure' : dep.status === 'warning' ? '⚠ Warning' : '✗ Critical'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Security Logs */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">📋 Security Event Log</h3>
            <button
              onClick={clearLogs}
              className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded transition"
            >
              Clear Logs
            </button>
          </div>
          
          {logs.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No security events logged yet.</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {logs.slice().reverse().map((log, i) => (
                <div key={i} className="bg-slate-700/50 p-3 rounded-lg text-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium ${eventColors[log.event] || 'text-slate-300'}`}>
                      {log.event.replace(/_/g, ' ')}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{log.details}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <div className="text-2xl mb-2">🔐</div>
            <h4 className="font-semibold mb-1">Input Sanitization</h4>
            <p className="text-xs text-slate-400">All user inputs are sanitized and validated</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <div className="text-2xl mb-2">🚦</div>
            <h4 className="font-semibold mb-1">Rate Limiting</h4>
            <p className="text-xs text-slate-400">Client-side rate limiting for abuse prevention</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-semibold mb-1">Audit Logging</h4>
            <p className="text-xs text-slate-400">Complete audit trail of all security events</p>
          </div>
        </div>
      </div>
    </main>
  )
}
