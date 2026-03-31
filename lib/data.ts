// PCI DSS Requirements
export const PCI_DSS_REQUIREMENTS = [
  { number: '1', title: 'Firewall Configuration', description: 'Install and maintain firewall configuration to protect cardholder data', weight: 9, category: 'Network Security' },
  { number: '2', title: 'Vendor Passwords', description: 'Do not use vendor-supplied defaults for system passwords and security parameters', weight: 10, category: 'Access Control' },
  { number: '3', title: 'Protect Stored Data', description: 'Protect stored cardholder data', weight: 10, category: 'Data Protection' },
  { number: '4', title: 'Encrypt Transmission', description: 'Encrypt transmission of cardholder data across open, public networks', weight: 10, category: 'Data Protection' },
  { number: '5', title: 'Malware Protection', description: 'Protect all systems against malware and regularly update anti-virus software', weight: 8, category: 'System Security' },
  { number: '6', title: 'Secure Systems', description: 'Develop and maintain secure systems and applications', weight: 9, category: 'System Security' },
  { number: '7', title: 'Restrict Access', description: 'Restrict access to cardholder data by business need to know', weight: 9, category: 'Access Control' },
  { number: '8', title: 'Identify Users', description: 'Identify and authenticate access to system components', weight: 9, category: 'Access Control' },
  { number: '9', title: 'Physical Access', description: 'Restrict physical access to cardholder data', weight: 7, category: 'Physical Security' },
  { number: '10', title: 'Track Access', description: 'Track and monitor all access to network resources and cardholder data', weight: 8, category: 'Monitoring' },
  { number: '11', title: 'Test Security', description: 'Regularly test security systems and processes', weight: 8, category: 'Testing' },
  { number: '12', title: 'Security Policy', description: 'Maintain an information security policy for all personnel', weight: 7, category: 'Policy' },
]

// Evidence Templates per Requirement
export const EVIDENCE_TEMPLATES: Record<string, { title: string; description: string; format: string; auditorLooksFor: string }[]> = {
  '1': [
    { title: 'Firewall Configuration Screenshot', description: 'Screenshot of firewall rules and configurations', format: 'PNG/JPG', auditorLooksFor: 'Explicit deny-all rule, only necessary ports open' },
    { title: 'Network Diagram', description: 'Document showing network segmentation and firewall placement', format: 'PDF/Visio', auditorLooksFor: 'Clear DMZ separation, cardholder data environment isolated' },
    { title: 'Change Management Log', description: 'Record of all firewall changes with approvals', format: 'XLSX/PDF', auditorLooksFor: 'Authorization signatures, timestamps, justification' },
  ],
  '2': [
    { title: 'Password Policy Document', description: 'Written password policy with complexity requirements', format: 'PDF', auditorLooksFor: 'Min 8 chars, complexity, rotation, history requirements' },
    { title: 'Default Password Audit', description: 'Evidence all default passwords have been changed', format: 'XLSX', auditorLooksFor: 'All vendor defaults documented as changed' },
    { title: 'Service Account Inventory', description: 'List of all service accounts with password management', format: 'XLSX', auditorLooksFor: 'Unique passwords, regular rotation schedule' },
  ],
  '3': [
    { title: 'Data Retention Policy', description: 'Document specifying data retention periods', format: 'PDF', auditorLooksFor: 'Clear retention periods, secure deletion procedures' },
    { title: 'Data Encryption Evidence', description: 'Proof of encryption for stored cardholder data', format: 'PDF/Screenshot', auditorLooksFor: 'Strong encryption algorithms (AES-256), key management' },
    { title: 'Data Masking Examples', description: 'Screenshots showing PAN masking in systems', format: 'PNG/JPG', auditorLooksFor: 'First 6/last 4 digits max displayed' },
  ],
  '4': [
    { title: 'TLS Configuration Report', description: 'SSL/TLS certificate and protocol documentation', format: 'PDF', auditorLooksFor: 'TLS 1.2+, valid certificates, strong cipher suites' },
    { title: 'Secure Transmission Policy', description: 'Policy for encrypting data in transit', format: 'PDF', auditorLooksFor: 'All CHD transmission encrypted requirements' },
  ],
  '5': [
    { title: 'Antivirus Deployment Report', description: 'Evidence of AV on all systems', format: 'XLSX/PDF', auditorLooksFor: 'Coverage of all systems, regular updates' },
    { title: 'Malware Incident Log', description: 'Record of detected and remediated malware', format: 'XLSX', auditorLooksFor: 'Detection, response time, resolution' },
  ],
  '6': [
    { title: 'Change Control Records', description: 'Documentation of all system changes', format: 'XLSX/PDF', auditorLooksFor: 'Authorization, testing, rollback procedures' },
    { title: 'SDLC Documentation', description: 'Secure development lifecycle procedures', format: 'PDF', auditorLooksFor: 'Code review, security testing requirements' },
    { title: 'Patch Management Report', description: 'Evidence of timely patching', format: 'XLSX', auditorLooksFor: 'Critical patches within 30 days' },
  ],
  '7': [
    { title: 'Access Control Matrix', description: 'Who has access to what systems', format: 'XLSX', auditorLooksFor: 'Least privilege, need-to-know basis' },
    { title: 'Role-Based Access Document', description: 'Defined roles and their permissions', format: 'PDF', auditorLooksFor: 'Clear role definitions, no excessive permissions' },
  ],
  '8': [
    { title: 'User Access Review Evidence', description: 'Proof of periodic access reviews', format: 'XLSX/PDF', auditorLooksFor: 'Reviews at least quarterly, documented approvals' },
    { title: 'MFA Configuration', description: 'Multi-factor authentication implementation', format: 'PDF/Screenshot', auditorLooksFor: 'MFA for all remote and privileged access' },
  ],
  '9': [
    { title: 'Physical Access Log', description: 'Badge access records to secure areas', format: 'XLSX/PDF', auditorLooksFor: 'Visitor logs, escort requirements' },
    { title: 'CCTV Evidence', description: 'Camera coverage documentation', format: 'PDF', auditorLooksFor: '90+ day retention, coverage of CHD areas' },
  ],
  '10': [
    { title: 'Log Management Policy', description: 'Logging and monitoring procedures', format: 'PDF', auditorLooksFor: 'What is logged, retention, review frequency' },
    { title: 'SIEM Configuration', description: 'Security monitoring setup', format: 'PDF/Screenshot', auditorLooksFor: 'All security events captured, alerting configured' },
  ],
  '11': [
    { title: 'Penetration Test Report', description: 'Results of security testing', format: 'PDF', auditorLooksFor: 'Annual testing, remediation evidence' },
    { title: 'Vulnerability Scan Results', description: 'Quarterly scan documentation', format: 'PDF', auditorLooksFor: 'All vulnerabilities addressed or documented' },
  ],
  '12': [
    { title: 'Information Security Policy', description: 'Comprehensive security policy document', format: 'PDF', auditorLooksFor: 'All 12 requirements addressed, annually reviewed' },
    { title: 'Security Awareness Training Records', description: 'Employee training completion', format: 'XLSX', auditorLooksFor: 'Annual training, completion tracking' },
    { title: 'Incident Response Plan', description: 'Documented IR procedures', format: 'PDF', auditorLooksFor: 'Roles, escalation, testing evidence' },
  ],
}

// Audit Questions for Simulation
export const AUDIT_QUESTIONS: Record<string, { question: string; options: string[]; correctAnswer: number; explanation: string }[]> = {
  '1': [
    { question: 'Your firewall has a rule allowing traffic from any source to your web server. Is this compliant?', options: ['Yes, web servers need public access', 'No, source should be restricted', 'Maybe, depends on the business need'], correctAnswer: 1, explanation: 'Firewall rules should restrict source IPs to only those necessary for business operations.' },
    { question: 'How often should firewall rule reviews be conducted?', options: ['Annually', 'Every 6 months', 'Quarterly or after significant changes'], correctAnswer: 2, explanation: 'Firewall rules should be reviewed at least every 6 months and after any significant network changes.' },
  ],
  '2': [
    { question: 'A vendor device has default credentials. What should you do?', options: ['Accept the risk if it\'s a trusted vendor', 'Change the password immediately', 'Document it as a known exception'], correctAnswer: 1, explanation: 'All vendor defaults must be changed before deployment. No exceptions.' },
    { question: 'What is the minimum password length per PCI DSS?', options: ['6 characters', '7 characters', '8 characters'], correctAnswer: 2, explanation: 'PCI DSS requires a minimum of 8 characters for passwords.' },
  ],
  '3': [
    { question: 'Can you store the CVV code after authorization?', options: ['Yes, if encrypted', 'No, never', 'Only for recurring transactions'], correctAnswer: 1, explanation: 'CVV/CVC codes must never be stored after authorization, even if encrypted.' },
    { question: 'What is the maximum number of PAN digits that can be displayed?', options: ['First 6 and last 4', 'First 4 and last 4', 'Last 6 only'], correctAnswer: 0, explanation: 'Display maximum of first 6 and last 4 digits of the PAN.' },
  ],
}

// Framework Mapping (PCI DSS to SOC 2, ISO 27001, NIST)
export const FRAMEWORK_MAPPING = {
  '1': { soc2: ['CC6.1', 'CC6.6'], iso27001: ['A.13.1.1', 'A.13.1.3'], nist: ['SC-7', 'SC-8'] },
  '2': { soc2: ['CC6.1', 'CC6.2'], iso27001: ['A.9.2.1', 'A.9.4.2'], nist: ['IA-5', 'IA-6'] },
  '3': { soc2: ['CC6.1', 'CC6.7'], iso27001: ['A.8.2.1', 'A.10.1.1'], nist: ['SC-28', 'MP-3'] },
  '4': { soc2: ['CC6.1', 'CC6.7'], iso27001: ['A.10.1.1', 'A.14.1.3'], nist: ['SC-8', 'SC-12'] },
  '5': { soc2: ['CC6.1', 'CC6.8'], iso27001: ['A.12.2.1', 'A.8.1.1'], nist: ['SI-3', 'SI-4'] },
  '6': { soc2: ['CC6.1', 'CC8.1'], iso27001: ['A.6.1.5', 'A.14.2.1'], nist: ['SA-11', 'CM-3'] },
  '7': { soc2: ['CC6.1', 'CC6.3'], iso27001: ['A.9.1.1', 'A.9.4.1'], nist: ['AC-2', 'AC-4'] },
  '8': { soc2: ['CC6.1', 'CC6.2'], iso27001: ['A.9.2.1', 'A.9.3.1'], nist: ['IA-2', 'IA-5'] },
  '9': { soc2: ['CC6.4'], iso27001: ['A.11.1.1', 'A.11.2.1'], nist: ['PE-3', 'PE-6'] },
  '10': { soc2: ['CC6.1', 'CC7.2'], iso27001: ['A.12.4.1', 'A.12.4.2'], nist: ['AU-2', 'AU-6'] },
  '11': { soc2: ['CC6.1', 'CC7.1'], iso27001: ['A.12.6.1', 'A.14.2.8'], nist: ['CA-2', 'CA-8'] },
  '12': { soc2: ['CC1.1', 'CC1.2'], iso27001: ['A.5.1.1', 'A.6.1.1'], nist: ['PL-2', 'AT-1'] },
}

// Risk Categories
export const RISK_LEVELS = {
  critical: { label: 'Critical', color: '#ef4444', score: 0 },
  high: { label: 'High', color: '#f97316', score: 25 },
  medium: { label: 'Medium', color: '#eab308', score: 50 },
  low: { label: 'Low', color: '#22c55e', score: 75 },
  minimal: { label: 'Minimal', color: '#10b981', score: 100 },
}

// Sample Timeline Events
export const SAMPLE_TIMELINE_EVENTS: Array<{ date: string; event: string; type: 'milestone' | 'evidence' | 'action' | 'deadline'; requirement: string | null }> = [
  { date: '2026-01-15', event: 'Assessment Started', type: 'milestone', requirement: null },
  { date: '2026-01-20', event: 'Firewall configuration documented', type: 'evidence', requirement: '1' },
  { date: '2026-02-01', event: 'Password policy updated', type: 'evidence', requirement: '2' },
  { date: '2026-02-15', event: 'Quarter 1 Review Complete', type: 'milestone', requirement: null },
  { date: '2026-03-01', event: 'Penetration test scheduled', type: 'action', requirement: '11' },
  { date: '2026-03-15', event: 'Security awareness training completed', type: 'evidence', requirement: '12' },
  { date: '2026-04-01', event: 'Q2 Audit Date', type: 'deadline', requirement: null },
]

// Blog/Documentation Articles
export const DOCUMENTATION_ARTICLES = [
  { slug: 'what-is-pci-dss', title: 'What is PCI DSS?', category: 'Fundamentals', readTime: '5 min', summary: 'Understanding the Payment Card Industry Data Security Standard' },
  { slug: 'pci-dss-requirements-explained', title: 'All 12 PCI DSS Requirements Explained', category: 'Requirements', readTime: '15 min', summary: 'Deep dive into each requirement with examples' },
  { slug: 'evidence-collection-best-practices', title: 'Evidence Collection Best Practices', category: 'Best Practices', readTime: '8 min', summary: 'How to collect audit-ready evidence efficiently' },
  { slug: 'common-pci-dss-mistakes', title: 'Common PCI DSS Mistakes to Avoid', category: 'Best Practices', readTime: '10 min', summary: 'Learn from common compliance failures' },
]

// Vendor Comparison Data
export const VENDOR_COMPARISON = [
  { name: 'PCI DSS Toolkit (This)', price: 'Free (Open Source)', features: ['Assessment', 'Evidence', 'Dashboard', 'Reports'], limitations: ['Self-hosted'], best: 'Individuals & Small Teams' },
  { name: 'Vanta', price: '$1,000+/month', features: ['Automated Monitoring', 'Integrations', 'Multiple Frameworks'], limitations: ['Expensive', 'Complex'], best: 'SaaS Companies' },
  { name: 'Drata', price: '$500+/month', features: ['Automated Evidence', 'Continuous Monitoring'], limitations: ['Pricey for small teams'], best: 'Growing Startups' },
  { name: 'Hyperproof', price: '$400+/month', features: ['Multi-framework', 'Collaboration'], limitations: ['Learning curve'], best: 'Enterprise Teams' },
]

// Framework Mapping Function
export function getFrameworkMapping(requirementNumber: string) {
  return FRAMEWORK_MAPPING[requirementNumber as keyof typeof FRAMEWORK_MAPPING] || { soc2: [], iso27001: [], nist: [] }
}
