import { PCI_DSS_REQUIREMENTS, EVIDENCE_TEMPLATES, AUDIT_QUESTIONS, FRAMEWORK_MAPPING, SAMPLE_TIMELINE_EVENTS } from './data'

// Types
export interface Requirement {
  id: number
  requirement_number: string
  title: string
  description: string
  status: 'not_started' | 'partial' | 'compliant' | 'non-compliant'
  notes: string | null
  weight: number
  category: string
}

export interface Assessment {
  id: number
  name: string
  status: string
  requirements: Requirement[]
  createdAt: string
  updatedAt: string
}

export interface Evidence {
  id: number
  requirement_id: number
  file_name: string
  requirement_number: string
  uploaded_at: string
  status: 'pending' | 'approved' | 'rejected'
  description?: string
  file_size?: string
  tags?: string[]
}

export interface TimelineEvent {
  id: number
  date: string
  event: string
  type: 'milestone' | 'evidence' | 'action' | 'deadline'
  requirement: string | null
}

export interface User {
  name: string
  role: 'admin' | 'viewer'
  avatar?: string
}

// Storage Keys
const ASSESSMENT_KEY = 'pci-dss-assessment'
const EVIDENCE_KEY = 'pci-dss-evidence'
const TIMELINE_KEY = 'pci-dss-timeline'
const USER_KEY = 'pci-dss-user'
const ONBOARDING_KEY = 'pci-dss-onboarding'
const THEME_KEY = 'pci-dss-theme'

// Initialize default assessment
export function createDefaultAssessment(): Assessment {
  return {
    id: 1,
    name: 'Q1 2026 Assessment',
    status: 'in_progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    requirements: PCI_DSS_REQUIREMENTS.map((req, index) => ({
      id: index + 1,
      requirement_number: req.number,
      title: req.title,
      description: req.description,
      status: 'not_started' as const,
      notes: null,
      weight: req.weight,
      category: req.category
    }))
  }
}

// Assessment Functions
export function getAssessment(): Assessment {
  if (typeof window === 'undefined') return createDefaultAssessment()
  
  const stored = localStorage.getItem(ASSESSMENT_KEY)
  if (!stored) {
    const defaultAssessment = createDefaultAssessment()
    localStorage.setItem(ASSESSMENT_KEY, JSON.stringify(defaultAssessment))
    return defaultAssessment
  }
  return JSON.parse(stored)
}

export function updateRequirementStatus(id: number, status: string, notes?: string): void {
  if (typeof window === 'undefined') return
  
  const assessment = getAssessment()
  assessment.requirements = assessment.requirements.map(req => 
    req.id === id ? { ...req, status: status as Requirement['status'], notes: notes ?? req.notes } : req
  )
  assessment.updatedAt = new Date().toISOString()
  localStorage.setItem(ASSESSMENT_KEY, JSON.stringify(assessment))
  
  // Add timeline event
  addTimelineEvent({
    date: new Date().toISOString().split('T')[0],
    event: `Requirement ${id} updated to ${status}`,
    type: 'evidence',
    requirement: String(id)
  })
}

export function getComplianceStats(assessment: Assessment) {
  const total = assessment.requirements.length
  const compliant = assessment.requirements.filter(r => r.status === 'compliant').length
  const partial = assessment.requirements.filter(r => r.status === 'partial').length
  const notStarted = assessment.requirements.filter(r => r.status === 'not_started').length
  const nonCompliant = assessment.requirements.filter(r => r.status === 'non-compliant').length
  
  // Weighted score
  const weightedScore = assessment.requirements.reduce((acc, req) => {
    const score = req.status === 'compliant' ? 100 : req.status === 'partial' ? 50 : 0
    return acc + (score * req.weight)
  }, 0)
  const maxScore = assessment.requirements.reduce((acc, req) => acc + (100 * req.weight), 0)
  const weightedPercentage = Math.round((weightedScore / maxScore) * 100)
  
  return { 
    total, 
    compliant, 
    partial, 
    notStarted,
    nonCompliant,
    percentage: total > 0 ? Math.round((compliant / total) * 100) : 0,
    weightedPercentage,
    riskLevel: getRiskLevel(weightedPercentage)
  }
}

export function getRiskLevel(score: number): { level: string; color: string; description: string } {
  if (score >= 90) return { level: 'Minimal', color: '#10b981', description: 'Low risk, audit ready' }
  if (score >= 75) return { level: 'Low', color: '#22c55e', description: 'Minor gaps, mostly ready' }
  if (score >= 50) return { level: 'Medium', color: '#eab308', description: 'Significant work needed' }
  if (score >= 25) return { level: 'High', color: '#f97316', description: 'Major compliance gaps' }
  return { level: 'Critical', color: '#ef4444', description: 'Not audit ready' }
}

// Evidence Functions
export function getEvidence(): Evidence[] {
  if (typeof window === 'undefined') return []
  
  const stored = localStorage.getItem(EVIDENCE_KEY)
  if (!stored) {
    // Initialize with sample evidence
    const sampleEvidence: Evidence[] = [
      { id: 1, requirement_id: 1, file_name: 'firewall-config.pdf', requirement_number: '1', uploaded_at: '2026-03-30', status: 'approved', description: 'Current firewall rules', file_size: '245 KB', tags: ['network', 'security'] },
      { id: 2, requirement_id: 2, file_name: 'password-policy.docx', requirement_number: '2', uploaded_at: '2026-03-30', status: 'approved', description: 'Updated password policy', file_size: '128 KB', tags: ['access', 'policy'] },
      { id: 3, requirement_id: 4, file_name: 'encryption-protocols.pdf', requirement_number: '4', uploaded_at: '2026-03-29', status: 'approved', description: 'TLS configuration', file_size: '512 KB', tags: ['encryption'] },
      { id: 4, requirement_id: 8, file_name: 'access-control-matrix.xlsx', requirement_number: '8', uploaded_at: '2026-03-29', status: 'pending', description: 'Q1 access review', file_size: '89 KB', tags: ['access'] },
      { id: 5, requirement_id: 12, file_name: 'security-policy.pdf', requirement_number: '12', uploaded_at: '2026-03-28', status: 'approved', description: 'Information security policy v2.1', file_size: '1.2 MB', tags: ['policy'] },
    ]
    localStorage.setItem(EVIDENCE_KEY, JSON.stringify(sampleEvidence))
    return sampleEvidence
  }
  return JSON.parse(stored)
}

export function addEvidence(evidence: Omit<Evidence, 'id' | 'uploaded_at'>): Evidence {
  if (typeof window === 'undefined') return {} as Evidence
  
  const allEvidence = getEvidence()
  const newEvidence: Evidence = {
    ...evidence,
    id: allEvidence.length + 1,
    uploaded_at: new Date().toISOString()
  }
  
  allEvidence.push(newEvidence)
  localStorage.setItem(EVIDENCE_KEY, JSON.stringify(allEvidence))
  
  // Add timeline event
  addTimelineEvent({
    date: new Date().toISOString().split('T')[0],
    event: `Evidence uploaded: ${evidence.file_name}`,
    type: 'evidence',
    requirement: evidence.requirement_number
  })
  
  return newEvidence
}

export function getEvidenceByRequirement(requirementNumber: string): Evidence[] {
  return getEvidence().filter(e => e.requirement_number === requirementNumber)
}

export function getEvidenceTemplates(requirementNumber: string) {
  return EVIDENCE_TEMPLATES[requirementNumber] || []
}

// Timeline Functions
export function getTimeline(): TimelineEvent[] {
  if (typeof window === 'undefined') return []
  
  const stored = localStorage.getItem(TIMELINE_KEY)
  if (!stored) {
    const initialEvents = SAMPLE_TIMELINE_EVENTS.map((e, i) => ({ ...e, id: i + 1 }))
    localStorage.setItem(TIMELINE_KEY, JSON.stringify(initialEvents))
    return initialEvents
  }
  return JSON.parse(stored)
}

export function addTimelineEvent(event: Omit<TimelineEvent, 'id'>): void {
  if (typeof window === 'undefined') return
  
  const timeline = getTimeline()
  const newEvent: TimelineEvent = { ...event, id: timeline.length + 1 }
  timeline.push(newEvent)
  localStorage.setItem(TIMELINE_KEY, JSON.stringify(timeline))
}

// User Functions
export function getUser(): User {
  if (typeof window === 'undefined') return { name: 'Guest', role: 'viewer' }
  
  const stored = localStorage.getItem(USER_KEY)
  if (!stored) {
    const defaultUser: User = { name: 'Compliance Officer', role: 'admin' }
    localStorage.setItem(USER_KEY, JSON.stringify(defaultUser))
    return defaultUser
  }
  return JSON.parse(stored)
}

export function setUser(user: Partial<User>): void {
  if (typeof window === 'undefined') return
  
  const currentUser = getUser()
  const updatedUser = { ...currentUser, ...user }
  localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))
}

// Onboarding Functions
export function hasCompletedOnboarding(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(ONBOARDING_KEY) === 'true'
}

export function completeOnboarding(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(ONBOARDING_KEY, 'true')
}

// Theme Functions
export function getTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark'
  return (localStorage.getItem(THEME_KEY) as 'dark' | 'light') || 'dark'
}

export function setTheme(theme: 'dark' | 'light'): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(THEME_KEY, theme)
}

// Audit Quiz Functions
export function getAuditQuestions(requirementNumber: string) {
  return AUDIT_QUESTIONS[requirementNumber] || []
}

// Framework Mapping Functions
export function getFrameworkMapping(requirementNumber: string) {
  return FRAMEWORK_MAPPING[requirementNumber as keyof typeof FRAMEWORK_MAPPING] || { soc2: [], iso27001: [], nist: [] }
}

// Export all for convenience
export { PCI_DSS_REQUIREMENTS, FRAMEWORK_MAPPING, EVIDENCE_TEMPLATES }
