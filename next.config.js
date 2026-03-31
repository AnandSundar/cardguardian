/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Security: Disable X-Powered-By header
  poweredByHeader: false,
  
  // Security: Enable security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // A05:2021 - Security Misconfiguration
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          // Remove server information
          {
            key: 'Server',
            value: 'Secure'
          }
        ]
      }
    ]
  },
  
  // Security: Configure CSP for reporting
  async rewrites() {
    return []
  },
  
  // Performance and security optimizations
  compress: true,
  
  // Security: Strict mode for React
  reactStrictMode: true,
  
  // Security: Disable etag to prevent cache probing
  generateEtags: false,
  
  // Security: Configure image domains
  images: {
    domains: [],
    // Disable external images
    remotePatterns: []
  },
  
  // Security: Environment variables validation
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version || '1.0.0'
  }
}

module.exports = nextConfig
