# 🏆 cardguardian

**Your award-winning PCI DSS compliance toolkit** - Built for GRC professionals to crush audits.

> *"Don't let auditors cry (by passing quickly)"*


<img width="1024" height="1536" alt="image" src="https://github.com/user-attachments/assets/8a25f29d-ecbb-4f91-8584-528badd62a2a" />


---

## 📊 Overview

`cardguardian` is a comprehensive PCI DSS compliance toolkit built with modern web technologies. It helps GRC professionals track requirements, collect evidence, generate reports, and maintain audit readiness throughout the year.

## 🎯 Features

- ✅ **Compliance Assessment** - Interactive questionnaire covering all 12 PCI DSS requirements with status tracking
- ✅ **Evidence Management** - Drag-and-drop file upload with requirement tagging
- ✅ **Dashboard** - Real-time compliance metrics, charts, and gap analysis
- ✅ **Timeline** - Track your compliance journey and milestones
- ✅ **Reports** - Generate audit-ready PDF reports and CSV exports
- ✅ **Audit Simulation** - Test your PCI DSS knowledge with mock auditor questions
- ✅ **Framework Mapping** - See how PCI DSS maps to SOC 2, ISO 27001, and NIST CSF
- ✅ **Documentation** - Built-in docs explaining PCI DSS requirements
- ✅ **Security Dashboard** - Monitor your security posture and OWASP compliance

## 🛠️ Security First

All data is stored locally in your browser. No data is sent to external servers. Your compliance evidence stays on your machine, giving you complete control and privacy.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/AnandSundar96/cardguardian.git
cd cardguardian
npm install
npm run dev
```

Or use the live demo:
```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
cardguardian/
├── app/
│   ├── page.tsx          # Landing page
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   ├── dashboard/       # Compliance metrics
│   ├── assessment/       # PCI DSS requirements
│   ├── evidence/         # Evidence management
│   ├── reports/          # Report generation
│   ├── timeline/         # Compliance journey
│   ├── security/         # Security dashboard
│   └── settings/         # User settings
├── lib/
│   ├── db.ts             # Data layer (LocalStorage)
│   ├── data.ts           # Static data & templates
│   ├── context.tsx       # React context
│   ├── security.ts       # Security utilities
│   └── types/           # TypeScript types
├── components/
│   ├── Navigation.tsx   # Navigation component
│   └── Onboarding.tsx   # User onboarding
├── middleware.ts          # Security headers
├── next.config.js         # Next.js config
├── tailwind.config.js      # Tailwind config
├── postcss.config.js       # PostCSS config
├── tsconfig.json         # TypeScript config
├── package.json          # Dependencies
├── README.md             # This file
└── .gitignore           # Git ignore
```

## 🎯 PCI DSS Requirements Covered

All 12 PCI DSS requirements are implemented with:

1. 🔐 Firewall Configuration
2. 🔐 Vendor Passwords
3. 🔐 Protect Stored Data
4. 🔐 Encrypt Transmission
5. 🔐 Malware Protection
6. 🔐 Secure Systems
7. 🔐 Restrict Access
8. 🔐 Identify Users
9. 🔐 Physical Access
10. 🔐 Track Access
11. 🔐 Test Security
12. 🔐 Security Policy

## 🔒 Security Hardening

This project implements industry-leading security practices:

- **OWASP Top 10 2025 Compliance** - All mitigations implemented
- **Content Security Policy** - CSP headers configured
- **Input Sanitization** - All user inputs validated
- **Secure Headers** - HTTP security headers active
- **XSS Prevention** - Output encoding enabled
- **Rate Limiting** - Client-side abuse prevention
- **Audit Logging** - Complete security event trail
- **Session Management** - Secure token generation and validation
- **Data Integrity** - Checksums and integrity verification

## 📊 Dashboard Features

- **Overall Compliance Score** - Weighted algorithm
- **Requirements Breakdown** - Visual status for all 12 requirements
- **Gap Analysis** - Identify non-compliant areas
- **Evidence Coverage** - Track evidence per requirement
- **Risk Level** - Calculate compliance risk
- **Progress Trends** - Visual timeline of improvements
- **Compliance Heatmap** - Color-coded status grid


<img width="1606" height="733" alt="image" src="https://github.com/user-attachments/assets/c8028a25-6bf0-4849-bb32-e0ccb6b08ca9" />


<img width="1379" height="878" alt="image" src="https://github.com/user-attachments/assets/f28e6333-9f46-4165-8d46-f5519f634b72" />



<img width="1556" height="776" alt="image" src="https://github.com/user-attachments/assets/001212a3-c765-4405-bb40-eb4dd91c18a1" />



<img width="1284" height="947" alt="image" src="https://github.com/user-attachments/assets/bc16a1ac-4083-4b3a-bb43-cf8f38918160" />





## 📋 Assessment Features

- **Interactive Questionnaire** - Guided assessment flow
- **Status Tracking** - Not Started, Partial, Compliant, Non-Compliant
- **Progress Visualization** - Real-time progress updates
- **Notes System** - Add detailed notes per requirement
- **Evidence Templates** - Know what auditors look for
- **Framework Mapping** - See which controls satisfy multiple frameworks


<img width="1254" height="852" alt="image" src="https://github.com/user-attachments/assets/150e8899-e435-4c81-ad8c-b69d210387ca" />


## 📁 Evidence Management

- **Drag-and-Drop Upload** - Drag files directly onto page
- **Requirement Tagging** - Auto-tag with requirement number
- **File Validation** - Type and size validation
- **Evidence Metadata** - Description, uploaded date, status
- **Coverage Tracking** - Visual indicator of evidence per requirement
- **Bulk Operations** - Upload multiple files at once
- **Filter & Search** - Find evidence by requirement or filename


<img width="1448" height="851" alt="image" src="https://github.com/user-attachments/assets/a66c2e05-afe1-47db-8277-b36b0c5df42a" />


## 📄 Reports & Export

- **PDF Generation** - Audit-ready reports with jsPDF
- **CSV Export** - Spreadsheet-compatible data export
- **Evidence Manifest** - File inventory for audit package
- **Executive Summary** - High-level overview for stakeholders
- **Technical Report** - Detailed findings by requirement
- **Audit Package** - Complete documentation package


<img width="1209" height="850" alt="image" src="https://github.com/user-attachments/assets/831eeb19-5bfb-4083-abc5-773bde926dc8" />



## 📅 Timeline Tracking

- **Event Log** - Record all compliance activities
- **Milestones** - Track key dates (assessment, audit, renewal)
- **Visual Timeline** - Chronological view of your journey
- **Type Indicators** - Milestone, Evidence, Action, Deadline
- **Search & Filter** - Find events by type or date


<img width="1235" height="880" alt="image" src="https://github.com/user-attachments/assets/9e584bae-7919-4287-822c-1992ed625ad9" />



## 🎯 Audit Simulation

- **Practice Mode** - Test your PCI DSS knowledge
- **Mock Auditor Questions** - Realistic audit scenarios
- **Feedback System** - Immediate feedback on answers
- **Explanations** - Learn why answers are correct or incorrect
- **Score Tracking** - Track your performance
- **Coverage** - All 12 PCI DSS requirements included

## 🔗 Framework Mapping

- **PCI to SOC 2** - Visualize which controls map to SOC 2 Trust Services Criteria
- **PCI to ISO 27001** - See alignment with ISO 27001 security controls
- **PCI to NIST CSF** - Understand relationship to NIST Cybersecurity Framework
- **Cross-Framework Overlap** - Identify controls that satisfy multiple standards
- **Gap Analysis** - Find areas where PCI controls don't map to other frameworks
- **Coverage Visualizer** - See at a glance which requirements have framework mappings


<img width="1222" height="901" alt="image" src="https://github.com/user-attachments/assets/10c8f63a-4110-4b42-97e3-118b4abf8bb1" />



## 📚 Documentation

- **PCI DSS Requirements Explained** - Deep dive into each requirement
- **Implementation Guides** - How to implement controls
- **Best Practices** - Learn from common mistakes
- **Vendor Comparisons** - Understand the market landscape
- **Templates** - Sample policies and procedures
- **FAQ** - Common questions about PCI DSS compliance

## 🔐 Security Dashboard

- **OWASP Compliance Status** - Track mitigations for all 10 OWASP categories
- **Dependency Security** - Monitor third-party library versions
- **Security Headers** - Verify active security configuration
- **Event Logging** - Complete audit trail of all security events
- **Rate Limiting Monitor** - Watch for abuse prevention
- **CSP Violations** - Track Content Security Policy violations


<img width="1318" height="896" alt="image" src="https://github.com/user-attachments/assets/7a3fe224-8f8c-443a-b10d-49956de18096" />



## 🚀 Deployment

### Vercel

The project is ready to deploy to Vercel for free hosting.

```bash
vercel --prod
```

Then add your custom domain:
```bash
vercel domains add cardguardian.com
```

### GitHub

Push to GitHub:
```bash
git add .
git commit -m "feat: Award-winning PCI DSS toolkit"
git push origin main
```

---

## 👨 About the Author

**Anand Sundar** - GRC Professional | 4 Years Experience

**LinkedIn:** [linkedin.com/in/anandsundar96](https://linkedin.com/in/anandsundar96)
**GitHub:** [github.com/AnandSundar96](https://github.com/AnandSundar96)
**Email:** anandsundar.96@gmail.com

**Current Focus:** GRC Analyst role in Canada

**Goal:** To leverage this award-winning project to get hired as a GRC Analyst at a top tech company.

---

## 🎯 License

MIT License - Free to use for commercial and personal projects

---

## 🙏 Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

### Development Setup

1. Fork the repository
2. Create your feature branch
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`
5. Make your changes
6. Submit a pull request

### Pull Request Guidelines

- Write clear commit messages
- Add tests for new features
- Ensure code quality follows existing patterns
- Update documentation as needed
- Be patient with review process

---

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the author.

---

## 🏆 Acknowledgments

Built by Anand Sundar for GRC professionals worldwide.

*"Don't let auditors cry (by passing quickly)"*

This project is dedicated to everyone working in compliance, security, and GRC. May your audits be swift, your controls be effective, and your career be successful.

---

**Made with ❤️ in Edmonton, Canada** 🇨🇦🇸
