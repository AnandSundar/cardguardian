'use client'

import Navigation from '@/components/navigation'
import { DOCUMENTATION_ARTICLES, VENDOR_COMPARISON } from '@/lib/data'
import { useState } from 'react'

type Tab = 'docs' | 'vendors' | 'about'

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('docs')
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
  
  return (
    <main className="min-h-screen bg-slate-900 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Documentation & Resources</h2>
          <p className="text-slate-400 mt-1">Learn about PCI DSS and compare tools</p>
        </div>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          {[
            { key: 'docs' as Tab, label: '📚 Documentation' },
            { key: 'vendors' as Tab, label: '⚖️ Vendor Comparison' },
            { key: 'about' as Tab, label: 'ℹ️ About' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 px-2 transition border-b-2 -mb-px ${
                activeTab === tab.key
                  ? 'border-emerald-500 text-white'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {activeTab === 'docs' && (
          <div>
            {!selectedArticle ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DOCUMENTATION_ARTICLES.map((article) => (
                  <button
                    key={article.slug}
                    onClick={() => setSelectedArticle(article.slug)}
                    className="bg-slate-800 border border-slate-700 rounded-xl p-6 text-left hover:border-slate-600 transition"
                  >
                    <div className="text-xs text-emerald-400 mb-2">{article.category}</div>
                    <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                    <p className="text-sm text-slate-400 mb-3">{article.summary}</p>
                    <div className="text-xs text-slate-500">{article.readTime} read</div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-slate-400 hover:text-white mb-6 flex items-center gap-2"
                >
                  ← Back to articles
                </button>
                
                {selectedArticle === 'what-is-pci-dss' && (
                  <div className="prose prose-invert max-w-none">
                    <h1>What is PCI DSS?</h1>
                    <p className="text-slate-400">
                      The Payment Card Industry Data Security Standard (PCI DSS) is a set of security standards 
                      designed to ensure that all companies that accept, process, store, or transmit credit card 
                      information maintain a secure environment.
                    </p>
                    
                    <h2>Key Facts</h2>
                    <ul>
                      <li>Created in 2004 by major credit card brands (Visa, MasterCard, American Express, Discover, JCB)</li>
                      <li>Currently on version 4.0 (released March 2022)</li>
                      <li>Applies to any organization that handles cardholder data</li>
                      <li>Non-compliance can result in fines of $5,000 to $100,000 per month</li>
                    </ul>
                    
                    <h2>Who Needs to Comply?</h2>
                    <p className="text-slate-400">
                      Any organization that accepts, processes, stores, or transmits cardholder data, 
                      regardless of size or transaction volume. This includes:
                    </p>
                    <ul>
                      <li>Merchants (retailers, e-commerce)</li>
                      <li>Service providers</li>
                      <li>Financial institutions</li>
                      <li>Any third-party that touches cardholder data</li>
                    </ul>
                    
                    <h2>Compliance Levels</h2>
                    <div className="bg-slate-700/50 p-4 rounded-lg">
                      <p><strong>Level 1:</strong> &gt;6 million transactions/year - Full annual assessment by QSA</p>
                      <p><strong>Level 2:</strong> 1-6 million transactions/year - Annual self-assessment</p>
                      <p><strong>Level 3:</strong> 20,000-1 million transactions/year - Annual SAQ</p>
                      <p><strong>Level 4:</strong> &lt;20,000 transactions/year - Annual SAQ</p>
                    </div>
                  </div>
                )}
                
                {selectedArticle === 'pci-dss-requirements-explained' && (
                  <div className="prose prose-invert max-w-none">
                    <h1>All 12 PCI DSS Requirements Explained</h1>
                    <p className="text-slate-400">
                      PCI DSS consists of 12 core requirements organized into 6 control objectives.
                      Here&apos;s a detailed breakdown of each requirement.
                    </p>
                    
                    <h2>Build and Maintain a Secure Network</h2>
                    <h3>Requirement 1: Install and maintain firewall configuration</h3>
                    <p className="text-slate-400">
                      Firewalls are your first line of defense. This requirement mandates proper 
                      configuration, regular reviews, and documentation of all firewall rules.
                    </p>
                    
                    <h3>Requirement 2: Do not use vendor-supplied defaults</h3>
                    <p className="text-slate-400">
                      All vendor-default passwords must be changed before deployment. This includes 
                      system passwords, SNMP community strings, and any other default security parameters.
                    </p>
                    
                    <h2>Protect Cardholder Data</h2>
                    <h3>Requirement 3: Protect stored cardholder data</h3>
                    <p className="text-slate-400">
                      Cardholder data must be protected at rest through encryption, tokenization, 
                      or truncation. Sensitive authentication data must never be stored.
                    </p>
                    
                    <h3>Requirement 4: Encrypt transmission of cardholder data</h3>
                    <p className="text-slate-400">
                      All cardholder data must be encrypted during transmission over open, public 
                      networks using strong cryptography (TLS 1.2 or higher).
                    </p>
                    
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg mt-6">
                      <p className="text-sm">
                        💡 <strong>Tip:</strong> Continue reading the full documentation to understand 
                        all 12 requirements in detail.
                      </p>
                    </div>
                  </div>
                )}
                
                {!['what-is-pci-dss', 'pci-dss-requirements-explained'].includes(selectedArticle) && (
                  <div className="text-center py-12">
                    <p className="text-slate-400">Full article coming soon!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'vendors' && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-slate-400 text-sm border-b border-slate-700 bg-slate-800/50">
                    <th className="px-6 py-4">Tool</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Features</th>
                    <th className="px-6 py-4">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {VENDOR_COMPARISON.map((vendor, i) => (
                    <tr key={i} className="border-b border-slate-700/50">
                      <td className="px-6 py-4 font-medium">
                        {vendor.name.includes('This') && <span className="text-emerald-400">✓ </span>}
                        {vendor.name}
                      </td>
                      <td className="px-6 py-4 text-slate-400">{vendor.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {vendor.features.map((f, j) => (
                            <span key={j} className="bg-slate-700 px-2 py-0.5 rounded text-xs">
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">{vendor.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 bg-emerald-500/10 border-t border-emerald-500/30">
              <h3 className="font-semibold mb-2">Why Choose Open Source?</h3>
              <ul className="text-sm text-slate-400 space-y-1">
                <li>✓ Free forever - no subscription fees</li>
                <li>✓ Customize to your specific needs</li>
                <li>✓ No vendor lock-in</li>
                <li>✓ Transparent - audit the code yourself</li>
                <li>✓ Community-driven improvements</li>
              </ul>
            </div>
          </div>
        )}
        
        {activeTab === 'about' && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">About PCI DSS Toolkit</h3>
            <p className="text-slate-400 mb-6">
              An open-source compliance toolkit built by a GRC professional with 4+ years of 
              experience in PCI DSS and SOC 2 compliance. This tool was created to help 
              organizations manage their compliance journey efficiently.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h4 className="font-semibold mb-2">🎯 Mission</h4>
                <p className="text-sm text-slate-400">
                  Make PCI DSS compliance accessible to everyone, from solo practitioners 
                  to growing startups.
                </p>
              </div>
              <div className="p-4 bg-slate-700/50 rounded-lg">
                <h4 className="font-semibold mb-2">💡 Philosophy</h4>
                <p className="text-sm text-slate-400">
                  Compliance doesn&apos;t have to be expensive or complicated. Open-source tools 
                  empower everyone to achieve security.
                </p>
              </div>
            </div>
            
            <h4 className="font-semibold mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Recharts', 'jsPDF'].map((tech) => (
                <span key={tech} className="bg-slate-700 px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition">
                GitHub
              </a>
              <a href="#" className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition">
                LinkedIn
              </a>
              <a href="#" className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg transition">
                Twitter
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
