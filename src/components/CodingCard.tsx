import React, { useState } from 'react';
import {
  Code2,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Eye,
  EyeOff,
  Copy,
  Check,
  Cpu,
  Clock,
  Zap,
} from 'lucide-react';
import { CodingQuestion, TestCaseExecutionResult } from '../types';
import { runJavaScriptTestCases } from '../utils/codeRunner';

interface CodingCardProps {
  question: CodingQuestion;
  index: number;
  examMode: boolean;
  isSubmitted: boolean;
  onRecordCompletion?: (passedAll: boolean) => void;
}

export const CodingCard: React.FC<CodingCardProps> = ({
  question,
  index,
  examMode,
  isSubmitted,
  onRecordCompletion,
}) => {
  const [code, setCode] = useState(question.starterCode);
  const [testResults, setTestResults] = useState<TestCaseExecutionResult[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRunTests = () => {
    setIsRunning(true);
    // Microtask timeout to allow UI update
    setTimeout(() => {
      try {
        const results = runJavaScriptTestCases(code, question.testCases);
        setTestResults(results);
        const allPassed = results.every((r) => r.passed);
        if (onRecordCompletion) {
          onRecordCompletion(allPassed);
        }
      } catch (err: any) {
        console.error('Test execution error:', err);
      } finally {
        setIsRunning(false);
      }
    }, 150);
  };

  const handleRequestHint = async () => {
    setIsLoadingHint(true);
    try {
      const res = await fetch('/api/code-hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemTitle: question.title,
          problemDescription: question.description,
          userCode: code,
          language: question.language,
        }),
      });
      const data = await res.json();
      setAiHint(data.hint || 'Check edge cases such as empty input arrays or boundary limits.');
    } catch {
      setAiHint('Ensure return type matches expected test output.');
    } finally {
      setIsLoadingHint(false);
    }
  };

  const handleResetCode = () => {
    setCode(question.starterCode);
    setTestResults(null);
    setAiHint(null);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const passedCount = testResults?.filter((r) => r.passed).length || 0;
  const totalCount = question.testCases.length;
  const allTestsPassed = testResults && passedCount === totalCount;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-sm transition-all p-5 sm:p-6 mb-6">
      {/* Header Info */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <div className="flex items-center space-x-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Interactive Coding Challenge
          </span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
            {question.language}
          </span>
          {question.difficulty && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
              {question.difficulty}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-500">
          {question.timeComplexity && (
            <span className="flex items-center space-x-1 font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{question.timeComplexity}</span>
            </span>
          )}
          {question.spaceComplexity && (
            <span className="flex items-center space-x-1 font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded">
              <Cpu className="w-3 h-3 text-slate-400" />
              <span>{question.spaceComplexity}</span>
            </span>
          )}
        </div>
      </div>

      {/* Problem Title & Description */}
      <h3 className="text-lg font-bold text-slate-900 mb-2">{question.title}</h3>
      <p className="text-sm text-slate-700 leading-relaxed mb-4 whitespace-pre-line">
        {question.description}
      </p>

      {/* Test Cases Specification Table */}
      <div className="mb-4 bg-slate-50 rounded-xl p-3.5 border border-slate-200">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
          Example Test Cases & Expectations:
        </span>
        <div className="space-y-2">
          {question.testCases.map((tc, tcIdx) => (
            <div
              key={tcIdx}
              className="text-xs bg-white p-2.5 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="font-mono text-slate-800">
                <span className="text-slate-400 font-sans mr-1">Input:</span>
                <span className="font-semibold text-indigo-700">{tc.input}</span>
              </div>
              <div className="font-mono text-slate-800">
                <span className="text-slate-400 font-sans mr-1">Expected:</span>
                <span className="font-semibold text-emerald-700">{tc.expectedOutput}</span>
              </div>
              {tc.explanation && (
                <div className="text-[11px] text-slate-500 italic max-w-xs">{tc.explanation}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Code Editor */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden mb-4 shadow-inner">
        {/* Editor Toolbar */}
        <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-slate-400">solution.js</span>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              type="button"
              onClick={handleCopyCode}
              className="px-2 py-1 text-slate-400 hover:text-slate-200 text-xs rounded hover:bg-slate-800 transition-colors flex items-center space-x-1"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span className="text-[11px]">{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              type="button"
              onClick={handleResetCode}
              className="px-2 py-1 text-slate-400 hover:text-slate-200 text-xs rounded hover:bg-slate-800 transition-colors flex items-center space-x-1"
              title="Reset code to starter template"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="text-[11px]">Reset</span>
            </button>
          </div>
        </div>

        {/* Code Input Area */}
        <div className="p-3">
          <textarea
            rows={10}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="w-full bg-transparent text-emerald-300 font-mono text-xs sm:text-sm leading-relaxed outline-none resize-y border-0 focus:ring-0 p-1"
            placeholder="// Write your algorithmic code here..."
          />
        </div>
      </div>

      {/* Editor Action Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleRunTests}
            disabled={isRunning}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center space-x-1.5 active:scale-95"
          >
            {isRunning ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Running Tests...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Sandbox Tests</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleRequestHint}
            disabled={isLoadingHint}
            className="px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-semibold text-xs rounded-xl transition-colors flex items-center space-x-1.5"
          >
            {isLoadingHint ? (
              <div className="w-3 h-3 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span>AI Code Hint</span>
          </button>
        </div>

        {(!examMode || isSubmitted) && (
          <button
            type="button"
            onClick={() => setShowSolution(!showSolution)}
            className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-xl transition-colors flex items-center space-x-1.5 border border-slate-200"
          >
            {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showSolution ? 'Hide Solution' : 'Reveal Reference Solution'}</span>
          </button>
        )}
      </div>

      {/* AI Socratic Code Hint Banner */}
      {aiHint && (
        <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-2.5">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold">Pedagogical Debugging Hint:</span>
            <p className="leading-relaxed">{aiHint}</p>
          </div>
        </div>
      )}

      {/* Sandbox Test Case Execution Results Panel */}
      {testResults && (
        <div className="mb-4 p-4 rounded-xl border bg-slate-50 border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Execution Results:
              </span>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                allTestsPassed
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {passedCount} / {totalCount} Passed
            </span>
          </div>

          <div className="space-y-2">
            {testResults.map((tr) => (
              <div
                key={tr.testIndex}
                className={`p-3 rounded-lg border text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  tr.passed
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/70 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {tr.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <div>
                    <span className="font-sans font-semibold">Test {tr.testIndex + 1}: </span>
                    <span className="text-slate-600 font-mono">{tr.input}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-[11px]">
                  <div>
                    <span className="text-slate-500 font-sans">Exp: </span>
                    <span className="font-bold">{tr.expected}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-sans">Got: </span>
                    <span className={tr.passed ? 'font-bold text-emerald-700' : 'font-bold text-rose-700'}>
                      {tr.actual}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-sans">{tr.timeMs}ms</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reference Solution Code & Asymptotic Analysis */}
      {showSolution && (
        <div className="mt-4 p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Code2 className="w-4 h-4 text-indigo-600" />
              <span>Optimal Reference Implementation</span>
            </span>
            <div className="text-xs font-mono text-indigo-700">
              Time: {question.timeComplexity || 'O(N)'} | Space: {question.spaceComplexity || 'O(1)'}
            </div>
          </div>

          <pre className="p-3 bg-slate-900 text-emerald-300 rounded-lg text-xs font-mono overflow-x-auto">
            <code>{question.solutionCode}</code>
          </pre>

          <div className="text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-indigo-900">Algorithmic Explanation: </span>
            {question.explanation}
          </div>
        </div>
      )}
    </div>
  );
};
