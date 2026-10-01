import React, { useEffect } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  Code2,
  FileText,
  RotateCcw,
  Download,
  BarChart2,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AssessmentData } from '../types';

interface ScorecardViewProps {
  assessment: AssessmentData;
  userMCQAnswers: Record<string, number>;
  codingCompletions: Record<string, boolean>;
  shortAnswerScores: Record<string, number>;
  onRetake: () => void;
  onOpenExport: () => void;
  onNavigateToQuestion: (type: 'mcq' | 'code' | 'sa', index: number) => void;
}

export const ScorecardView: React.FC<ScorecardViewProps> = ({
  assessment,
  userMCQAnswers,
  codingCompletions,
  shortAnswerScores,
  onRetake,
  onOpenExport,
  onNavigateToQuestion,
}) => {
  // Compute MCQ score
  let mcqCorrect = 0;
  const totalMCQs = assessment.mcqs.length;
  assessment.mcqs.forEach((mcq) => {
    if (userMCQAnswers[mcq.id] === mcq.correctIndex) {
      mcqCorrect++;
    }
  });
  const mcqPercentage = totalMCQs > 0 ? Math.round((mcqCorrect / totalMCQs) * 100) : 100;

  // Compute Coding score
  const totalCoding = assessment.codingQuestions.length;
  let codingPassed = 0;
  assessment.codingQuestions.forEach((code) => {
    if (codingCompletions[code.id]) {
      codingPassed++;
    }
  });
  const codingPercentage = totalCoding > 0 ? Math.round((codingPassed / totalCoding) * 100) : 100;

  // Compute Short Answer score
  const totalShortAnswer = assessment.shortAnswerQuestions.length;
  let shortAnswerTotalEarned = 0;
  assessment.shortAnswerQuestions.forEach((sa) => {
    shortAnswerTotalEarned += shortAnswerScores[sa.id] || 0;
  });
  const shortAnswerPercentage =
    totalShortAnswer > 0 ? Math.round(shortAnswerTotalEarned / totalShortAnswer) : 100;

  // Weighted overall score
  let totalParts = 0;
  let accumulatedPct = 0;
  if (totalMCQs > 0) {
    accumulatedPct += mcqPercentage * 0.4;
    totalParts += 0.4;
  }
  if (totalCoding > 0) {
    accumulatedPct += codingPercentage * 0.35;
    totalParts += 0.35;
  }
  if (totalShortAnswer > 0) {
    accumulatedPct += shortAnswerPercentage * 0.25;
    totalParts += 0.25;
  }

  const overallScore = totalParts > 0 ? Math.round(accumulatedPct / totalParts) : 100;

  // Trigger celebratory confetti on high score
  useEffect(() => {
    if (overallScore >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [overallScore]);

  const getGrade = (score: number) => {
    if (score >= 90) return { label: 'A+ (Mastery)', color: 'text-emerald-600', bg: 'bg-emerald-50' };
    if (score >= 80) return { label: 'A (Proficient)', color: 'text-emerald-500', bg: 'bg-emerald-50' };
    if (score >= 70) return { label: 'B (Competent)', color: 'text-indigo-600', bg: 'bg-indigo-50' };
    if (score >= 60) return { label: 'C (Developing)', color: 'text-amber-600', bg: 'bg-amber-50' };
    return { label: 'Review Needed', color: 'text-rose-600', bg: 'bg-rose-50' };
  };

  const grade = getGrade(overallScore);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 border border-indigo-100 shadow-xs">
          <Award className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Assessment Evaluation Summary
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
          Performance Diagnostic Report
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-xl mx-auto">
          {assessment.topicSummary}
        </p>

        {/* Big Overall Score Circle / Pill */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="p-4 px-6 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-semibold block">Overall Score</span>
            <div className="text-4xl font-extrabold text-slate-900">{overallScore}%</div>
          </div>
          <div className={`p-4 px-6 rounded-2xl border ${grade.bg} border-slate-200`}>
            <span className="text-xs text-slate-500 font-semibold block">Proficiency Tier</span>
            <div className={`text-2xl font-extrabold ${grade.color}`}>{grade.label}</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-center space-x-3">
          <button
            onClick={onRetake}
            className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
          <button
            onClick={onOpenExport}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl flex items-center space-x-1.5 shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report / Worksheet</span>
          </button>
        </div>
      </div>

      {/* Component Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* MCQs Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Multiple Choice
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {mcqCorrect} / {totalMCQs}
          </div>
          <div className="text-xs text-slate-500 mt-1">{mcqPercentage}% accuracy rate</div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full"
              style={{ width: `${mcqPercentage}%` }}
            />
          </div>
        </div>

        {/* Coding Challenges Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Coding Challenges
            </span>
            <Code2 className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {codingPassed} / {totalCoding}
          </div>
          <div className="text-xs text-slate-500 mt-1">{codingPercentage}% passed test suites</div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-indigo-500 h-1.5 rounded-full"
              style={{ width: `${codingPercentage}%` }}
            />
          </div>
        </div>

        {/* Short Answer Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Short Answer AI
            </span>
            <FileText className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {shortAnswerPercentage}%
          </div>
          <div className="text-xs text-slate-500 mt-1">Rubric-weighted score</div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className="bg-purple-500 h-1.5 rounded-full"
              style={{ width: `${shortAnswerPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question-by-Question Review List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center space-x-2">
          <BarChart2 className="w-4 h-4 text-indigo-600" />
          <span>Question-by-Question Audit</span>
        </h3>

        <div className="space-y-3">
          {assessment.mcqs.map((mcq, idx) => {
            const isUserCorrect = userMCQAnswers[mcq.id] === mcq.correctIndex;
            const hasAnswered = userMCQAnswers[mcq.id] !== undefined;

            return (
              <div
                key={mcq.id}
                onClick={() => onNavigateToQuestion('mcq', idx)}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center ${
                      isUserCorrect
                        ? 'bg-emerald-100 text-emerald-800'
                        : hasAnswered
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-slate-900 line-clamp-1">
                    {mcq.question}
                  </span>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      isUserCorrect
                        ? 'bg-emerald-50 text-emerald-700'
                        : hasAnswered
                        ? 'bg-rose-50 text-rose-700'
                        : 'bg-slate-50 text-slate-500'
                    }`}
                  >
                    {isUserCorrect ? 'Correct' : hasAnswered ? 'Incorrect' : 'Unanswered'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
