import React from 'react';
import { Sparkles, Brain, Code2, BookOpen, Layers, FileDown, Timer, Award } from 'lucide-react';

interface HeaderProps {
  activeTab: 'generator' | 'assessment' | 'blueprint' | 'review';
  setActiveTab: (tab: 'generator' | 'assessment' | 'blueprint' | 'review') => void;
  examMode: boolean;
  setExamMode: (val: boolean) => void;
  hasAssessment: boolean;
  onOpenExport: () => void;
  answeredCount: number;
  totalQuestions: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  examMode,
  setExamMode,
  hasAssessment,
  onOpenExport,
  answeredCount,
  totalQuestions,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('generator')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">EduGen AI</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200">
                  Pedagogical Engine
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">AI Assessment & Dynamic Question Architecture</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                activeTab === 'generator'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Create</span>
            </button>

            {hasAssessment && (
              <button
                onClick={() => setActiveTab('assessment')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'assessment'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Assessment</span>
                {totalQuestions > 0 && (
                  <span className="ml-1 text-xs px-1.5 py-0.2 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                    {answeredCount}/{totalQuestions}
                  </span>
                )}
              </button>
            )}

            {hasAssessment && (
              <button
                onClick={() => setActiveTab('review')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'review'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Award className="w-4 h-4 text-emerald-500" />
                <span>Scorecard</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('blueprint')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                activeTab === 'blueprint'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span className="font-semibold">System Blueprint</span>
            </button>
          </nav>

          {/* Controls: Mode Switch & Export */}
          <div className="flex items-center space-x-3">
            {hasAssessment && (
              <div className="hidden md:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  onClick={() => setExamMode(false)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    !examMode
                      ? 'bg-white text-slate-800 shadow-xs font-semibold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Immediate feedback, hints & solutions available"
                >
                  Study Mode
                </button>
                <button
                  onClick={() => setExamMode(true)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center space-x-1 ${
                    examMode
                      ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Answers concealed until final review submit"
                >
                  <Timer className="w-3 h-3" />
                  <span>Exam Mode</span>
                </button>
              </div>
            )}

            {hasAssessment && (
              <button
                onClick={onOpenExport}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg flex items-center space-x-1.5 transition-colors shadow-xs"
                title="Export Assessment as PDF/Markdown/JSON"
              >
                <FileDown className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">Export</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
