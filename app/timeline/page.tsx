'use client'

import Navigation from '@/components/navigation'
import { getTimeline } from '@/lib/db'
import { useEffect, useState } from 'react'

interface TimelineEvent {
  id: number
  date: string
  event: string
  type: 'milestone' | 'evidence' | 'action' | 'deadline'
  requirement: string | null
}

const typeColors = {
  milestone: 'bg-emerald-500',
  evidence: 'bg-blue-500',
  action: 'bg-yellow-500',
  deadline: 'bg-red-500'
}

const typeIcons = {
  milestone: '🏁',
  evidence: '📄',
  action: '✅',
  deadline: '⏰'
}

export default function TimelinePage() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  
  useEffect(() => {
    setEvents(getTimeline())
  }, [])
  
  // Group events by month
  const groupedEvents = events.reduce((acc, event) => {
    const month = new Date(event.date).toLocaleString('default', { month: 'long', year: 'numeric' })
    if (!acc[month]) acc[month] = []
    acc[month].push(event)
    return acc
  }, {} as Record<string, TimelineEvent[]>)
  
  return (
    <main className="min-h-screen bg-slate-900 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">Compliance Timeline</h2>
            <p className="text-slate-400 mt-1">Track your compliance journey</p>
          </div>
          <div className="flex gap-2">
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-1 text-sm text-slate-400">
                <div className={`w-3 h-3 rounded-full ${color}`} />
                <span className="capitalize">{type}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-700" />
          
          {Object.entries(groupedEvents).map(([month, monthEvents]) => (
            <div key={month} className="mb-12">
              {/* Month header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-sm z-10">
                  📅
                </div>
                <h3 className="text-lg font-semibold text-slate-300">{month}</h3>
              </div>
              
              {/* Events */}
              <div className="ml-12 space-y-4">
                {monthEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((event) => (
                  <div 
                    key={event.id}
                    className="bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-2 h-2 rounded-full mt-2 ${typeColors[event.type]}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{typeIcons[event.type]}</span>
                          <span className="font-medium">{event.event}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                          {event.requirement && (
                            <span className="bg-slate-700 px-2 py-0.5 rounded">
                              Req {event.requirement}
                            </span>
                          )}
                          <span className={`px-2 py-0.5 rounded bg-slate-700 capitalize`}>
                            {event.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Upcoming Deadlines */}
        <div className="mt-12 bg-slate-800 border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">⏰ Upcoming Deadlines</h3>
          <div className="space-y-3">
            {events
              .filter(e => e.type === 'deadline' && new Date(e.date) > new Date())
              .slice(0, 3)
              .map((event) => {
                const daysUntil = Math.ceil((new Date(event.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                return (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div>
                      <div className="font-medium">{event.event}</div>
                      <div className="text-sm text-slate-400">{new Date(event.date).toLocaleDateString()}</div>
                    </div>
                    <div className={`text-sm font-semibold ${
                      daysUntil <= 7 ? 'text-red-400' : daysUntil <= 30 ? 'text-yellow-400' : 'text-slate-400'
                    }`}>
                      {daysUntil} days
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </main>
  )
}
