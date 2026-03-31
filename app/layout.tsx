import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PCI DSS Compliance Toolkit',
  description: 'Open-source toolkit for PCI DSS compliance - assessment, evidence, and reporting',
  keywords: 'PCI DSS, compliance, security, GRC, audit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white antialiased">
        {children}
      </body>
    </html>
  )
}
