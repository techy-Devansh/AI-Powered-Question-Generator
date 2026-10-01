import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Award,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Send,
  Bookmark,
} from 'lucide-react';
import { ShortAnswerQuestion, ShortAnswerEvaluation } from '../types';

interface ShortAnswerCardProps {
  question: ShortAnswerQuestion;
  index: number;
  examMode: boolean;
  isSubmitted: boolean;
  onRecordScore?: (score: number) => void;
}

export const ShortAnswerCard: React.FC<ShortAnswerCardProps> = ({
  question,
  index,
  examMode,
  isSubmitted,
  onRecordScore,
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<ShortAnswerEvaluation | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [showRubricDetails, setShowRubricDetails] = useState(false);

  const wordCount = userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0;

  const handleEvaluate = async () => {
    if (!userAnswer.trim()) return;

    setIsEvaluating(true);
    try {
      const response = await fetch('/api/evaluate-short-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.question,
          modelAnswer: question.modelAnswer,
          rubric: question.rubric,
          keywords: question.keywords,
          userAnswer: userAnswer.trim(),
        }),
      });

      const data: ShortAnswerEvaluation = await response.json();
      setEvaluation(data);
      if (onRecordScore) {
        onRecordScore(data.score);
      }
    } catch (err) {
      console.error('Failed to evaluate answer:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all p-5 sm:p-6 mb-6">
      {/* Top Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Conceptual Short Answer
          </span>
          {question.bloomLevel && (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
              Bloom: {question.bloomLevel}
            </span>
          )}
          {question.difficulty && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
              {question.difficulty}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {question.hint && (
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className={`text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors flex items-center space-x-1 ${
                showHint
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-amber-50/80 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Socratic Hint */}
      {showHint && question.hint && (
        <div className="mb-4 p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Pedagogical Hint: </span>
            <span>{question.hint}</span>
          </div>
        </div>
      )}

      {/* Question Prompt */}
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug mb-3">
        {question.question}
      </h3>

      {/* Rubric Criteria Summary & Essential Keywords */}
      <div className="mb-4 bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>Grading Rubric Dimensions (100 pts total)</span>
          </span>
          <button
            type="button"
            onClick={() => setShowRubricDetails(!showRubricDetails)}
            className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
          >
            <span>{showRubricDetails ? 'Compact' : 'View Criteria'}</span>
            {showRubricDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {showRubricDetails && (
          <div className="space-y-1.5 pt-2 border-t border-slate-200/80 text-xs">
            {question.rubric.map((r, rIdx) => (
              <div key={rIdx} className="flex items-start justify-between text-slate-700">
                <span className="font-medium">
                  &bull; {r.criterion}: <span className="font-normal text-slate-600">{r.description}</span>
                </span>
                <span className="font-bold text-indigo-600 ml-2 shrink-0">{r.points} pts</span>
              </div>
            ))}
          </div>
        )}

        {question.keywords && question.keywords.length > 0 && (
          <div className="pt-2 border-t border-slate-200/80 flex items-center flex-wrap gap-1.5">
            <span className="text-[11px] text-slate-500 font-medium mr-1">Expected Concepts:</span>
            {question.keywords.map((kw, kwIdx) => (
              <span
                key={kwIdx}
                className="text-[10px] font-medium bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200"
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Answer Text Area */}
      <div className="mb-3">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Your Response:
        </label>
        <textarea
          rows={4}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Formulate your explanation here. Clearly state the mechanisms, concepts, and cause-and-effect relationships..."
          className="w-full p-3 text-sm rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-slate-900 bg-white transition-all"
        />
        <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
          <span>{wordCount} words written</span>
          <span>Recommended: 40 - 150 words</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <button
          type="button"
          onClick={handleEvaluate}
          disabled={isEvaluating || !userAnswer.trim()}
          className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs transition-all flex items-center space-x-1.5 ${
            isEvaluating || !userAnswer.trim()
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
          }`}
        >
          {isEvaluating ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>AI Grading Engine Evaluating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Grade Answer with AI</span>
            </>
          )}
        </button>

        {(!examMode || isSubmitted) && (
          <button
            type="button"
            onClick={() => setShowModelAnswer(!showModelAnswer)}
            className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-xl transition-colors flex items-center space-x-1.5 border border-slate-200"
          >
            {showModelAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showModelAnswer ? 'Hide Benchmark' : 'Compare Model Answer'}</span>
          </button>
        )}
      </div>

      {/* AI Evaluation Report Card */}
      {evaluation && (
        <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-3 mb-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                AI Evaluation Report
              </span>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                evaluation.score >= 80
                  ? 'bg-emerald-100 text-emerald-800'
                  : evaluation.score >= 60
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              Score: {evaluation.score} / 100
            </div>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {evaluation.overallFeedback}
          </p>

          {/* Strengths & Missing Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {evaluation.strengths.length > 0 && (
              <div className="p-3 bg-white rounded-lg border border-emerald-200">
                <span className="font-bold text-emerald-800 flex items-center space-x-1 mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Demonstrated Strengths</span>
                </span>
                <ul className="space-y-1 text-slate-600">
                  {evaluation.strengths.map((str, sIdx) => (
                    <li key={sIdx} className="leading-tight">&bull; {str}</li>
                  ))}
                </ul>
              </div>
            )}

            {evaluation.missingPoints.length > 0 && (
              <div className="p-3 bg-white rounded-lg border border-amber-200">
                <span className="font-bold text-amber-800 flex items-center space-x-1 mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Points to Deepen</span>
                </span>
                <ul className="space-y-1 text-slate-600">
                  {evaluation.missingPoints.map((mis, mIdx) => (
                    <li key={mIdx} className="leading-tight">&bull; {mis}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Granular Rubric Scoring */}
          {evaluation.rubricScores && evaluation.rubricScores.length > 0 && (
            <div className="pt-2 border-t border-indigo-100 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                Rubric Item Breakdown:
              </span>
              {evaluation.rubricScores.map((rb, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs text-slate-700">
                  <span>{rb.criterion}</span>
                  <span className="font-semibold text-indigo-700">
                    {rb.pointsEarned} / {rb.maxPoints} pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Benchmark Model Answer */}
      {showModelAnswer && (
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
          <span className="font-bold text-slate-900 uppercase tracking-wider block">
            Expert Benchmark Model Answer:
          </span>
          <p className="text-slate-700 leading-relaxed font-normal">{question.modelAnswer}</p>
        </div>
      )}
    </div>
  );
};
