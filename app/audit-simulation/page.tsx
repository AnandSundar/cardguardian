'use client'

import Navigation from '@/components/navigation'
import { PCI_DSS_REQUIREMENTS, AUDIT_QUESTIONS } from '@/lib/data'
import { useState } from 'react'

interface QuizState {
  currentRequirement: string
  currentQuestion: number
  score: number
  answers: number[]
  showResults: boolean
  started: boolean
}

export default function AuditSimulationPage() {
  const [quiz, setQuiz] = useState<QuizState>({
    currentRequirement: '1',
    currentQuestion: 0,
    score: 0,
    answers: [],
    showResults: false,
    started: false
  })
  
  const questions = AUDIT_QUESTIONS[quiz.currentRequirement] || []
  const currentQ = questions[quiz.currentQuestion]
  
  const startQuiz = (reqNumber: string) => {
    setQuiz({
      currentRequirement: reqNumber,
      currentQuestion: 0,
      score: 0,
      answers: [],
      showResults: false,
      started: true
    })
  }
  
  const answerQuestion = (answerIndex: number) => {
    const isCorrect = answerIndex === currentQ.correctAnswer
    const newAnswers = [...quiz.answers, answerIndex]
    
    if (quiz.currentQuestion < questions.length - 1) {
      setQuiz({
        ...quiz,
        currentQuestion: quiz.currentQuestion + 1,
        score: isCorrect ? quiz.score + 1 : quiz.score,
        answers: newAnswers
      })
    } else {
      setQuiz({
        ...quiz,
        score: isCorrect ? quiz.score + 1 : quiz.score,
        answers: newAnswers,
        showResults: true
      })
    }
  }
  
  const resetQuiz = () => {
    setQuiz({
      currentRequirement: '1',
      currentQuestion: 0,
      score: 0,
      answers: [],
      showResults: false,
      started: false
    })
  }
  
  const getScoreEmoji = () => {
    const percentage = (quiz.score / questions.length) * 100
    if (percentage === 100) return '🏆'
    if (percentage >= 70) return '👍'
    if (percentage >= 50) return '📚'
    return '📖'
  }
  
  return (
    <main className="min-h-screen bg-slate-900 pb-20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Audit Simulation</h2>
          <p className="text-slate-400 mt-1">Test your PCI DSS knowledge with mock auditor questions</p>
        </div>
        
        {!quiz.started ? (
          // Requirement Selection
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PCI_DSS_REQUIREMENTS.map((req) => {
              const hasQuestions = AUDIT_QUESTIONS[req.number] && AUDIT_QUESTIONS[req.number].length > 0
              return (
                <button
                  key={req.number}
                  onClick={() => hasQuestions && startQuiz(req.number)}
                  disabled={!hasQuestions}
                  className={`p-4 rounded-xl border text-left transition ${
                    hasQuestions
                      ? 'bg-slate-800 border-slate-700 hover:border-emerald-500 cursor-pointer'
                      : 'bg-slate-800/50 border-slate-700/50 cursor-not-allowed opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center font-bold">
                      {req.number}
                    </div>
                    <div className="font-medium">{req.title}</div>
                  </div>
                  <div className="text-xs text-slate-500">
                    {hasQuestions ? `${AUDIT_QUESTIONS[req.number].length} questions` : 'Coming soon'}
                  </div>
                </button>
              )
            })}
          </div>
        ) : quiz.showResults ? (
          // Results Screen
          <div className="max-w-lg mx-auto">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">{getScoreEmoji()}</div>
              <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
              <p className="text-slate-400 mb-6">
                You scored {quiz.score} out of {questions.length}
              </p>
              
              <div className="w-full bg-slate-700 rounded-full h-4 mb-6 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all"
                  style={{ width: `${(quiz.score / questions.length) * 100}%` }}
                />
              </div>
              
              {/* Review Answers */}
              <div className="text-left mb-6">
                <h4 className="font-semibold mb-3">Review Your Answers:</h4>
                <div className="space-y-3">
                  {questions.map((q, i) => {
                    const isCorrect = quiz.answers[i] === q.correctAnswer
                    return (
                      <div 
                        key={i}
                        className={`p-3 rounded-lg ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}
                      >
                        <div className="flex items-start gap-2">
                          <span>{isCorrect ? '✅' : '❌'}</span>
                          <div>
                            <div className="text-sm font-medium">{q.question}</div>
                            <div className="text-xs text-slate-400 mt-1">{q.explanation}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => startQuiz(quiz.currentRequirement)}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  Try Again
                </button>
                <button
                  onClick={resetQuiz}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition"
                >
                  Choose Another
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Question Screen
          <div className="max-w-2xl mx-auto">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-400">
                  Requirement {quiz.currentRequirement}: {PCI_DSS_REQUIREMENTS.find(r => r.number === quiz.currentRequirement)?.title}
                </span>
                <span className="text-sm text-slate-400">
                  Question {quiz.currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all"
                  style={{ width: `${((quiz.currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
            
            {/* Question Card */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-6">{currentQ?.question}</h3>
              
              <div className="space-y-3">
                {currentQ?.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => answerQuestion(i)}
                    className="w-full p-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-left transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center font-semibold">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={resetQuiz}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition"
            >
              ← Back to Requirements
            </button>
          </div>
        )}
        
        {/* Info Card */}
        {!quiz.started && (
          <div className="mt-8 bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2">🎯 Why Take This Quiz?</h3>
            <ul className="text-sm text-slate-400 space-y-2">
              <li>• Test your understanding of PCI DSS requirements</li>
              <li>• Prepare for real auditor questions</li>
              <li>• Identify knowledge gaps before your assessment</li>
              <li>• Learn best practices through explanations</li>
            </ul>
          </div>
        )}
      </div>
    </main>
  )
}
