'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/assessment', label: 'Assessment' },
  { href: '/evidence', label: 'Evidence' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/reports', label: 'Reports' },
  { href: '/framework-mapping', label: 'Mapping' },
  { href: '/audit-simulation', label: 'Quiz' },
  { href: '/security', label: 'Security' },
  { href: '/docs', label: 'Docs' },
]

export default function Navigation() {
  const pathname = usePathname()
  
  return (
    <header className="border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <span className="text-2xl">🔐</span>
          <h1 className="text-xl font-bold">PCI DSS Toolkit</h1>
        </Link>
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition ${
                pathname === item.href 
                  ? 'text-white font-semibold' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/settings" className="text-slate-400 hover:text-white transition">
            ⚙️
          </Link>
        </div>
      </div>
    </header>
  )
}

export function MobileNav() {
  const pathname = usePathname()
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-50">
      <div className="flex justify-around py-2">
        {navItems.slice(0, 5).map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center p-2 text-xs ${
              pathname === item.href ? 'text-emerald-400' : 'text-slate-400'
            }`}
          >
            <span className="text-lg mb-1">
              {item.label === 'Dashboard' && '📊'}
              {item.label === 'Assessment' && '📋'}
              {item.label === 'Evidence' && '📁'}
              {item.label === 'Timeline' && '📅'}
              {item.label === 'Reports' && '📄'}
            </span>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
