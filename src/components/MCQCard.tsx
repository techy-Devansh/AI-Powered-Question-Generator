import React, { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb, ChevronDown, ChevronUp, AlertCircle, Bookmark } from 'lucide-react';
import { MCQQuestion } from '../types';

interface MCQCardProps {
  question: MCQQuestion;
  index: number;
  selectedOption: number | null;
  onSelectOption: (optionIndex: number) => void;
  examMode: boolean;
  isSubmitted: boolean;
}

export const MCQCard: React.FC<MCQCardProps> = ({
  question,
  index,
  selectedOption,
  onSelectOption,
  examMode,
  isSubmitted,
}) => {
  const [showHint, setShowHint] = useState(false);
  const [showDistractorDetails, setShowDistractorDetails] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === question.correctIndex;
  const revealAnswer = !examMode ? isAnswered : isSubmitted;

  const optionLetters = ['A', 'B', 'C', 'D'];

  const getBloomBadgeColor = (level?: string) => {
    switch (level?.toLowerCase()) {
      case 'recall':
      case 'remember':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'understanding':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'application':
      case 'apply':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'analysis':
      case 'analyze':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'evaluation':
      case 'evaluate':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all p-5 sm:p-6 mb-5">
      {/* Top Meta Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center flex-wrap gap-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Multiple-Choice Question
          </span>
          {question.bloomLevel && (
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${getBloomBadgeColor(question.bloomLevel)}`}>
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

          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1.5 rounded-lg border transition-colors ${
              isBookmarked
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Bookmark question for review'}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </button>
        </div>
      </div>

      {/* Socratic Hint Callout */}
      {showHint && question.hint && (
        <div className="mb-4 p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Guiding Hint: </span>
            <span>{question.hint}</span>
          </div>
        </div>
      )}

      {/* Question Stem */}
      <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug mb-4">
        {question.question}
      </h3>

      {/* Options List */}
      <div className="space-y-2.5 mb-4">
        {question.options.map((option, optIdx) => {
          const isSelected = selectedOption === optIdx;
          const isThisCorrect = optIdx === question.correctIndex;

          let btnStyles = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

          if (revealAnswer) {
            if (isThisCorrect) {
              btnStyles = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium ring-1 ring-emerald-500';
            } else if (isSelected && !isThisCorrect) {
              btnStyles = 'border-rose-400 bg-rose-50/70 text-rose-950 ring-1 ring-rose-400';
            } else {
              btnStyles = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-70';
            }
          } else if (isSelected) {
            btnStyles = 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-medium ring-1 ring-indigo-600';
          }

          return (
            <button
              key={optIdx}
              type="button"
              disabled={revealAnswer && !examMode}
              onClick={() => onSelectOption(optIdx)}
              className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-start space-x-3 ${btnStyles}`}
            >
              <span
                className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                  revealAnswer && isThisCorrect
                    ? 'bg-emerald-600 text-white'
                    : revealAnswer && isSelected && !isThisCorrect
                    ? 'bg-rose-500 text-white'
                    : isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {optionLetters[optIdx]}
              </span>

              <span className="flex-1 leading-relaxed">{option}</span>

              {revealAnswer && (
                <div className="shrink-0 mt-0.5">
                  {isThisCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : isSelected ? (
                    <XCircle className="w-5 h-5 text-rose-500" />
                  ) : null}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Answer & Pedagogical Explanation Section */}
      {revealAnswer && (
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
          <div
            className={`p-4 rounded-xl border text-xs sm:text-sm ${
              isCorrect
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                : 'bg-rose-50/60 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center space-x-2 font-bold mb-1.5">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Correct! Option {optionLetters[question.correctIndex]} is right.</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>
                    Incorrect. Option {optionLetters[question.correctIndex]} is the correct answer.
                  </span>
                </>
              )}
            </div>
            <p className="text-slate-700 leading-relaxed font-normal">{question.explanation}</p>
          </div>

          {/* Distractor Misconception Diagnostic Accordion */}
          {question.distractorExplanations && question.distractorExplanations.length > 0 && (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => setShowDistractorDetails(!showDistractorDetails)}
                className="w-full px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center justify-between transition-colors"
              >
                <span className="flex items-center space-x-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Diagnostic Misconception Analysis (Why are distractors wrong?)</span>
                </span>
                {showDistractorDetails ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {showDistractorDetails && (
                <div className="p-3.5 bg-white space-y-2 text-xs border-t border-slate-200">
                  {question.distractorExplanations.map((exp, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                          idx === question.correctIndex
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        Option {optionLetters[idx]}
                      </span>
                      <span className="text-slate-600">{exp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
