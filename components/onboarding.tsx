'use client'

import { useState } from 'react'
import Link from 'next/link'

const steps = [
  {
    title: 'Welcome to PCI DSS Toolkit! 👋',
    description: 'Your open-source compliance companion. Let me show you around.',
    icon: '🔐'
  },
  {
    title: 'Assessment Module 📋',
    description: 'Track all 12 PCI DSS requirements. Update status, add notes, and monitor progress.',
    icon: '📋'
  },
  {
    title: 'Evidence Management 📁',
    description: 'Upload and organize compliance evidence. Tag by requirement and track coverage.',
    icon: '📁'
  },
  {
    title: 'Dashboard & Reports 📊',
    description: 'View compliance metrics, gap analysis, and generate audit-ready reports.',
    icon: '📊'
  },
  {
    title: 'Ready to Start? 🚀',
    description: 'You\'re all set! Begin your compliance journey now.',
    icon: '🚀'
  }
]

interface OnboardingProps {
  onComplete: () => void
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }
  
  const handleSkip = () => {
    onComplete()
  }
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full text-center">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition ${
                i === currentStep ? 'bg-emerald-500 w-4' : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
        
        {/* Icon */}
        <div className="text-6xl mb-4">{steps[currentStep].icon}</div>
        
        {/* Content */}
        <h2 className="text-2xl font-bold mb-3">{steps[currentStep].title}</h2>
        <p className="text-slate-400 mb-8">{steps[currentStep].description}</p>
        
        {/* Quick Links on last step */}
        {currentStep === steps.length - 1 && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Link
              href="/assessment"
              onClick={onComplete}
              className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-lg transition"
            >
              Start Assessment
            </Link>
            <Link
              href="/dashboard"
              onClick={onComplete}
              className="bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-lg transition"
            >
              View Dashboard
            </Link>
          </div>
        )}
        
        {/* Buttons */}
        <div className="flex gap-3">
          {currentStep < steps.length - 1 && (
            <button
              onClick={handleSkip}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg transition"
            >
              Skip Tour
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold transition"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
