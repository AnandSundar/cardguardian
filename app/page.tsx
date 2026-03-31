import Link from 'next/link'
import { PCI_DSS_REQUIREMENTS } from '@/lib/data'

const features = [
  {
    title: 'Compliance Assessment',
    description: 'Interactive questionnaire covering all 12 PCI DSS requirements with status tracking and notes',
    icon: '📋',
    href: '/assessment'
  },
  {
    title: 'Evidence Management',
    description: 'Drag-and-drop file upload with requirement tagging and coverage tracking',
    icon: '📁',
    href: '/evidence'
  },
  {
    title: 'Real-time Dashboard',
    description: 'Compliance metrics, charts, heatmap, and gap analysis at a glance',
    icon: '📊',
    href: '/dashboard'
  },
  {
    title: 'Audit Simulation',
    description: 'Test your PCI DSS knowledge with mock auditor questions',
    icon: '🎯',
    href: '/audit-simulation'
  },
  {
    title: 'Framework Mapping',
    description: 'See how PCI DSS maps to SOC 2, ISO 27001, and NIST CSF',
    icon: '🔗',
    href: '/framework-mapping'
  },
  {
    title: 'PDF Reports',
    description: 'Generate audit-ready reports and export compliance data',
    icon: '📄',
    href: '/reports'
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      {/* Header */}
      <header className="border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔐</span>
            <h1 className="text-xl font-bold">PCI DSS Toolkit</h1>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full ml-2">v1.0</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-slate-400 hover:text-white transition">Dashboard</Link>
            <Link href="/docs" className="text-slate-400 hover:text-white transition">Docs</Link>
            <a href="https://github.com" className="text-slate-400 hover:text-white transition">GitHub</a>
            <Link
              href="/dashboard"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Launch App
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1 rounded-full text-emerald-400 text-sm mb-6">
            <span>✨</span>
            <span>Open Source GRC Tool</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            PCI DSS Compliance
            <br />
            <span className="text-emerald-400">Made Simple</span>
          </h1>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            The open-source toolkit for managing PCI DSS compliance.
            Track requirements, collect evidence, and generate audit-ready reports.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg transition text-lg"
            >
              🚀 Try Live Demo
            </Link>
            <Link
              href="/assessment"
              className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-3 rounded-lg transition text-lg"
            >
              Start Assessment
            </Link>
            <a
              href="https://github.com"
              className="bg-slate-800 border border-slate-700 hover:border-slate-600 text-white font-semibold px-8 py-3 rounded-lg transition text-lg"
            >
              ⭐ Star on GitHub
            </a>
          </div>
          
          {/* Quick Stats */}
          <div className="flex justify-center gap-8 mt-12 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-400">12</div>
              <div className="text-sm text-slate-500">Requirements</div>
            </div>
            <div>
              <div className="text-3xl font-bold">5+</div>
              <div className="text-sm text-slate-500">Frameworks</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-slate-500">Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Everything You Need</h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            From assessment to audit, all the tools you need to manage PCI DSS compliance in one place.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500/50 transition group"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-emerald-400 transition">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">All 12 PCI DSS Requirements</h2>
          <p className="text-slate-400 text-center mb-12">
            Comprehensive coverage of every PCI DSS requirement
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {PCI_DSS_REQUIREMENTS.map((req) => (
              <Link
                key={req.number}
                href={`/assessment`}
                className="bg-slate-800 p-4 rounded-lg border border-slate-700 hover:border-emerald-500/50 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center font-bold">
                    {req.number}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">{req.category}</div>
                    <div className="font-medium text-sm">{req.title}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose This Toolkit?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="text-2xl mb-3">💰</div>
              <h3 className="font-semibold text-lg mb-2">Free Forever</h3>
              <p className="text-slate-400 text-sm">
                Open source and free. No subscription fees, no hidden costs.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="text-2xl mb-3">🔒</div>
              <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
              <p className="text-slate-400 text-sm">
                All data stored locally in your browser. Nothing sent to servers.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="font-semibold text-lg mb-2">Fast & Lightweight</h3>
              <p className="text-slate-400 text-sm">
                Built with Next.js for speed. No heavy databases required.
              </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
              <div className="text-2xl mb-3">🛠️</div>
              <h3 className="font-semibold text-lg mb-2">Customizable</h3>
              <p className="text-slate-400 text-sm">
                Open source code you can modify for your specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-slate-400 mb-8">
            Jump right in with our pre-populated demo data. No sign-up required.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg transition text-lg"
          >
            🚀 Launch Live Demo
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔐</span>
              <span className="font-semibold">PCI DSS Toolkit</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-400">
              <Link href="/docs" className="hover:text-white transition">Documentation</Link>
              <Link href="/docs?tab=vendors" className="hover:text-white transition">Vendor Comparison</Link>
              <a href="#" className="hover:text-white transition">GitHub</a>
            </div>
            <div className="text-sm text-slate-500">
              Built with ❤️ for GRC professionals
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
