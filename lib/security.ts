// Security utilities for PCI DSS Toolkit
// Implements OWASP Top 10 2021/2025 mitigations

/**
 * A01:2021 - Broken Access Control
 * Role-based access control and authorization
 */
export const ROLES = {
  ADMIN: 'admin',
  VIEWER: 'viewer',
  AUDITOR: 'auditor'
} as const

export function checkPermission(userRole: string, action: string): boolean {
  const permissions: Record<string, string[]> = {
    admin: ['read', 'write', 'delete', 'export', 'admin'],
    auditor: ['read', 'export'],
    viewer: ['read']
  }
  
  return permissions[userRole]?.includes(action) ?? false
}

/**
 * A02:2021 - Cryptographic Failures
 * Secure data handling and encryption helpers
 */
export function sanitizeSensitiveData(data: string): string {
  // Remove potential sensitive patterns
  return data
    .replace(/\b\d{13,16}\b/g, '[PAN REDACTED]') // Credit card numbers
    .replace(/\b\d{3,4}\b/g, '[CVV REDACTED]') // CVV
    .replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/g, '[EMAIL REDACTED]')
}

export function generateSecureId(): string {
  // Cryptographically secure random ID
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * A03:2021 - Injection
 * Input validation and sanitization
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/`/g, '&#96;')
    .replace(/=/g, '&#x3D;')
}

export function validateInput(input: string, type: 'text' | 'email' | 'number' | 'file'): boolean {
  if (!input) return false
  
  const patterns: Record<string, RegExp> = {
    text: /^[a-zA-Z0-9\s\-_.,!?()]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    number: /^\d+$/,
    file: /^[a-zA-Z0-9\s\-_.]+\.(pdf|doc|docx|xls|xlsx|png|jpg|jpeg|txt)$/i
  }
  
  // Check for dangerous patterns
  const dangerousPatterns = [
    /<script\b/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:/i,
    /vbscript:/i,
    /expression\(/i
  ]
  
  if (dangerousPatterns.some(pattern => pattern.test(input))) {
    return false
  }
  
  return patterns[type]?.test(input) ?? true
}

export function escapeHtml(str: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }
  
  return str.replace(/[&<>"']/g, char => htmlEntities[char] || char)
}

/**
 * A04:2021 - Insecure Design
 * Security patterns and validation
 */
export function validateFileSize(size: number, maxSizeMB: number = 10): boolean {
  return size > 0 && size <= maxSizeMB * 1024 * 1024
}

export function validateFileType(filename: string, allowedTypes: string[]): boolean {
  const ext = filename.split('.').pop()?.toLowerCase()
  return ext ? allowedTypes.includes(ext) : false
}

export const ALLOWED_FILE_TYPES = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'png', 'jpg', 'jpeg', 'txt']

/**
 * A05:2021 - Security Misconfiguration
 * Security headers and CSP configuration
 */
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
}

export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Note: unsafe-inline needed for Next.js
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:'],
  'font-src': ["'self'"],
  'connect-src': ["'self'"],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"]
}

/**
 * A06:2021 - Vulnerable and Outdated Components
 * Version checking utility
 */
export function checkDependencySecurity(): { name: string; status: 'ok' | 'warning' | 'critical' }[] {
  // In production, this would check against a vulnerability database
  return [
    { name: 'next', status: 'ok' },
    { name: 'react', status: 'ok' },
    { name: 'recharts', status: 'ok' },
    { name: 'jspdf', status: 'ok' }
  ]
}

/**
 * A07:2021 - Identification and Authentication Failures
 * Session management
 */
export function generateSessionToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

export function validateSession(): boolean {
  if (typeof window === 'undefined') return false
  
  const session = localStorage.getItem('pci-dss-session')
  if (!session) return false
  
  try {
    const { expiry, token } = JSON.parse(session)
    return Date.now() < expiry && token
  } catch {
    return false
  }
}

export function createSession(): void {
  if (typeof window === 'undefined') return
  
  const session = {
    token: generateSessionToken(),
    expiry: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    createdAt: new Date().toISOString()
  }
  
  localStorage.setItem('pci-dss-session', JSON.stringify(session))
}

export function destroySession(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('pci-dss-session')
  localStorage.removeItem('pci-dss-user')
}

/**
 * A08:2021 - Software and Data Integrity Failures
 * Data integrity checks
 */
export function computeChecksum(data: string): string {
  // Simple hash for integrity verification
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString(16)
}

export function verifyDataIntegrity(data: string, checksum: string): boolean {
  return computeChecksum(data) === checksum
}

/**
 * A09:2021 - Security Logging and Monitoring Failures
 * Security event logging
 */
export type SecurityEvent = 
  | 'LOGIN_SUCCESS'
  | 'LOGIN_FAILURE'
  | 'LOGOUT'
  | 'DATA_EXPORT'
  | 'FILE_UPLOAD'
  | 'PERMISSION_DENIED'
  | 'VALIDATION_ERROR'
  | 'SUSPICIOUS_INPUT'

interface SecurityLogEntry {
  timestamp: string
  event: SecurityEvent
  details: string
  userAgent?: string
  ip?: string
}

export function logSecurityEvent(event: SecurityEvent, details: string): void {
  const entry: SecurityLogEntry = {
    timestamp: new Date().toISOString(),
    event,
    details,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
  }
  
  // Store in localStorage (in production, send to logging service)
  if (typeof window !== 'undefined') {
    const logs = JSON.parse(localStorage.getItem('pci-dss-security-logs') || '[]')
    logs.push(entry)
    
    // Keep only last 100 logs
    if (logs.length > 100) logs.shift()
    
    localStorage.setItem('pci-dss-security-logs', JSON.stringify(logs))
  }
  
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[SECURITY] ${event}: ${details}`)
  }
}

export function getSecurityLogs(): SecurityLogEntry[] {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem('pci-dss-security-logs') || '[]')
}

/**
 * A10:2021 - Server-Side Request Forgery (SSRF)
 * URL validation (for future API routes)
 */
export function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    
    // Only allow http/https
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false
    }
    
    // Block internal IPs
    const blockedPatterns = [
      /^localhost$/i,
      /^127\./,
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^192\.168\./,
      /^0\.0\.0\.0$/,
      /^::1$/,
      /^fc00:/i,
      /^fe80:/i
    ]
    
    if (blockedPatterns.some(pattern => pattern.test(parsed.hostname))) {
      return false
    }
    
    return true
  } catch {
    return false
  }
}

/**
 * Rate limiting (client-side)
 */
const rateLimitStore: Map<string, number[]> = new Map()

export function checkRateLimit(key: string, maxRequests: number = 10, windowMs: number = 60000): boolean {
  const now = Date.now()
  const requests = rateLimitStore.get(key) || []
  
  // Remove old requests
  const validRequests = requests.filter(time => now - time < windowMs)
  
  if (validRequests.length >= maxRequests) {
    logSecurityEvent('SUSPICIOUS_INPUT', `Rate limit exceeded for ${key}`)
    return false
  }
  
  validRequests.push(now)
  rateLimitStore.set(key, validRequests)
  return true
}

/**
 * Content Security Policy violation reporter
 */
export function reportCSPViolation(violation: any): void {
  logSecurityEvent('SUSPICIOUS_INPUT', `CSP violation: ${JSON.stringify(violation)}`)
}

/**
 * Secure localStorage wrapper
 */
export const secureStorage = {
  set(key: string, value: any): void {
    if (typeof window === 'undefined') return
    
    try {
      const data = JSON.stringify(value)
      const checksum = computeChecksum(data)
      localStorage.setItem(key, JSON.stringify({ data, checksum, timestamp: Date.now() }))
    } catch (error) {
      logSecurityEvent('VALIDATION_ERROR', `Failed to store ${key}: ${error}`)
    }
  },
  
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null
    
    try {
      const stored = localStorage.getItem(key)
      if (!stored) return null
      
      const { data, checksum } = JSON.parse(stored)
      
      if (!verifyDataIntegrity(data, checksum)) {
        logSecurityEvent('SUSPICIOUS_INPUT', `Data integrity check failed for ${key}`)
        return null
      }
      
      return JSON.parse(data) as T
    } catch {
      return null
    }
  },
  
  remove(key: string): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(key)
  }
}
