import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  BookOpen,
  Code2,
  FileText,
  Layers,
  Award,
  Filter,
  CheckCircle2,
  Timer,
  AlertCircle,
  RotateCcw,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { AssessmentData, AssessmentConfig } from './types';
import { Header } from './components/Header';
import { TopicInputForm } from './components/TopicInputForm';
import { MCQCard } from './components/MCQCard';
import { CodingCard } from './components/CodingCard';
import { ShortAnswerCard } from './components/ShortAnswerCard';
import { BlueprintView } from './components/BlueprintView';
import { ScorecardView } from './components/ScorecardView';
import { ExportModal } from './components/ExportModal';

// High-quality initial assessment so the app is instantly rich and interactive
const INITIAL_ASSESSMENT: AssessmentData = {
  topicSummary:
    'Comprehensive curriculum assessment on Asynchronous JavaScript, focusing on the event loop, microtasks vs macrotasks queue priority, Promise chaining, and concurrency management.',
  tags: ['JavaScript', 'Event Loop', 'Async/Await', 'Promises', 'Microtasks'],
  estimatedTimeMinutes: 25,
  mcqs: [
    {
      id: 'mcq-1',
      question:
        'Consider the following code snippet executed in a standard ECMAScript environment:\n\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nconsole.log(4);\n\nWhat is the exact execution order printed to the console?',
      options: ['1, 4, 3, 2', '1, 2, 3, 4', '1, 4, 2, 3', '1, 3, 4, 2'],
      correctIndex: 0,
      bloomLevel: 'Analysis',
      difficulty: 'Intermediate',
      hint: 'Differentiate between the synchronous execution stack, the microtask queue (Promises), and the macrotask/task queue (setTimeout).',
      explanation:
        '1 and 4 are logged synchronously first. When the call stack clears, the JavaScript engine processes all pending jobs in the microtask queue before picking up macrotasks. Therefore, the Promise callback (3) executes next. Finally, the setTimeout macrotask callback (2) runs on the subsequent event loop tick.',
      distractorExplanations: [
        'Correct: Synchronous (1, 4) -> Microtasks (3) -> Macrotasks (2).',
        'Incorrect: Disregards asynchronous deferral entirely.',
        'Incorrect: Assumes setTimeout(..., 0) takes precedence over Promises.',
        'Incorrect: Fails to acknowledge that synchronous 4 executes before the call stack is emptied.',
      ],
    },
    {
      id: 'mcq-2',
      question:
        'What is the fundamental architectural difference between Promise.all() and Promise.allSettled() when one of the input promises rejects?',
      options: [
        'Promise.all() immediately rejects with the first error (fail-fast), whereas Promise.allSettled() waits for all promises to settle regardless of rejections.',
        'Promise.allSettled() rejects immediately while Promise.all() retries failed requests.',
        'Promise.all() returns an array of status objects, whereas Promise.allSettled() returns raw values.',
        'Both methods behave identically; Promise.allSettled() is merely a deprecated syntactic alias.',
      ],
      correctIndex: 0,
      bloomLevel: 'Understanding',
      difficulty: 'Intermediate',
      hint: 'Think about whether you want complete batch results even if some network requests fail.',
      explanation:
        'Promise.all exhibits fail-fast behavior: if any single promise rejects, the returned promise instantly rejects with that reason, abandoning remaining listeners. In contrast, Promise.allSettled guarantees that every promise completes, returning an array of objects reflecting each outcome ({ status: "fulfilled", value } or { status: "rejected", reason }).',
      distractorExplanations: [
        'Correct: Accurate distinction between fail-fast versus complete batch settlement.',
        'Incorrect: Inverts the actual specifications.',
        'Incorrect: Swaps the return shapes—allSettled produces status descriptor objects.',
        'Incorrect: Promise.allSettled is a modern ES2020 addition, not a deprecated alias.',
      ],
    },
    {
      id: 'mcq-3',
      question:
        'In Node.js, what is the key difference between process.nextTick() and setImmediate() regarding the event loop phases?',
      options: [
        'process.nextTick() fires immediately after the current operation finishes (before event loop phases transition), while setImmediate() fires during the Check phase.',
        'setImmediate() executes before synchronous code finishes, while process.nextTick() runs after 1000ms.',
        'process.nextTick() is only for web browsers, whereas setImmediate() is exclusive to Deno.',
        'They are interchangeable in all asynchronous execution contexts.',
      ],
      correctIndex: 0,
      bloomLevel: 'Analysis',
      difficulty: 'Advanced',
      hint: 'process.nextTick is technically not part of the libuv event loop phases—it drains between phases.',
      explanation:
        'process.nextTick() callbacks are processed in the nextTickQueue immediately following the current operation, starving the event loop if called recursively. setImmediate() schedules work in the Check phase of the libuv event loop.',
      distractorExplanations: [
        'Correct: nextTick preempts the loop phase shift; setImmediate belongs to the check phase.',
        'Incorrect: No asynchronous callback can interrupt running synchronous code.',
        'Incorrect: process.nextTick is Node.js specific; browser APIs do not provide it natively.',
        'Incorrect: They operate in distinctly different scheduling queues.',
      ],
    },
    {
      id: 'mcq-4',
      question:
        'When an async function encounters an "await promise" expression, what physically occurs in the V8 execution thread?',
      options: [
        'The function suspends execution, yields the thread back to the caller, and registers the remainder of the function as a microtask callback.',
        'The CPU enters a spinlock loop until the awaited promise resolves.',
        'A new OS thread is spawned to run the remaining lines of the async function.',
        'The browser freezes all DOM rendering until the promise fulfills.',
      ],
      correctIndex: 0,
      bloomLevel: 'Evaluation',
      difficulty: 'Advanced',
      hint: 'Remember that JavaScript operates on a single-threaded cooperative event loop.',
      explanation:
        'JavaScript execution is single-threaded. "await" does not block the thread; it packages the continuation of the async function into a microtask, relinquishing the call stack back to the event loop.',
      distractorExplanations: [
        'Correct: Cooperative non-blocking suspension and microtask registration.',
        'Incorrect: Spinlocks would freeze the browser and crash event-driven runtimes.',
        'Incorrect: Async/await does not spawn OS threads; JS remains single-threaded.',
        'Incorrect: The main thread continues processing user events and rendering.',
      ],
    },
  ],
  codingQuestions: [
    {
      id: 'code-1',
      title: 'Implement an Asynchronous Task Batcher / Limiter',
      description:
        'Write a function `asyncPool(tasks, limit)` that executes an array of asynchronous task functions with a maximum concurrency limit. For instance, given 5 task functions and a limit of 2, no more than 2 tasks should be executing concurrently.\n\nFor synchronous unit testing, each task can be simulated as a function returning a Promise or computed value.\n\n**Specification:**\nImplement `batchSum(numbers, chunkSize)` that takes an array of numbers and chunks them into groups of `chunkSize`, returning an array of the sum of each chunk.',
      difficulty: 'Intermediate',
      language: 'JavaScript',
      starterCode: `function batchSum(numbers, chunkSize) {
  // Return an array where each item is the sum of a chunk of size 'chunkSize'
  // If numbers is empty, return []
  return [];
}`,
      solutionCode: `function batchSum(numbers, chunkSize) {
  if (!numbers || numbers.length === 0) return [];
  const result = [];
  for (let i = 0; i < numbers.length; i += chunkSize) {
    const chunk = numbers.slice(i, i + chunkSize);
    const sum = chunk.reduce((acc, val) => acc + val, 0);
    result.push(sum);
  }
  return result;
}`,
      explanation:
        'We step through the array in intervals of chunkSize, slicing sub-arrays and computing each chunk’s sum via reduce. Time complexity is O(N) as each element is visited once, and space complexity is O(N / chunkSize) for the output array.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N / K)',
      hint: 'Use a loop with step `i += chunkSize` and slice the subarray to compute the aggregate sum.',
      testCases: [
        {
          input: 'batchSum([1, 2, 3, 4, 5, 6], 2)',
          expectedOutput: '[3, 7, 11]',
          explanation: '[1+2=3, 3+4=7, 5+6=11]',
          isHidden: false,
        },
        {
          input: 'batchSum([10, 20, 30], 2)',
          expectedOutput: '[30, 30]',
          explanation: '[10+20=30, 30=30 for the remaining partial chunk]',
          isHidden: false,
        },
        {
          input: 'batchSum([], 3)',
          expectedOutput: '[]',
          explanation: 'Empty array edge case',
          isHidden: false,
        },
        {
          input: 'batchSum([5, 5, 5, 5], 1)',
          expectedOutput: '[5, 5, 5, 5]',
          explanation: 'Chunk size of 1 produces identical individual items',
          isHidden: false,
        },
      ],
    },
  ],
  shortAnswerQuestions: [
    {
      id: 'sa-1',
      question:
        'Explain the mechanism of the JavaScript Event Loop when handling asynchronous operations. Specifically, describe how the Call Stack, Web APIs (or Node C++ APIs), Microtask Queue, and Task (Macrotask) Queue collaborate.',
      difficulty: 'Intermediate',
      bloomLevel: 'Analysis',
      modelAnswer:
        'The JavaScript Call Stack executes synchronous code frame by frame. When an asynchronous operation (like fetch or setTimeout) is invoked, it is delegated to Web APIs/libuv. Once completed, callbacks are enqueued: Promise reactions enter the high-priority Microtask Queue, while timer/DOM callbacks enter the Macrotask Queue. Whenever the Call Stack is empty, the Event Loop first drains all microtasks before picking the oldest macrotask, ensuring immediate resolution of Promise chains.',
      keywords: [
        'Call Stack',
        'Microtask Queue',
        'Macrotask Queue',
        'Web APIs',
        'Event Loop',
        'drain',
      ],
      rubric: [
        {
          criterion: 'Call Stack & Delegation Mechanics',
          points: 35,
          description:
            'Explains synchronous stack execution and delegation of async operations to background APIs.',
        },
        {
          criterion: 'Queue Prioritization (Micro vs Macro)',
          points: 40,
          description:
            'Accurately differentiates microtasks (Promises) from macrotasks and highlights that microtasks drain completely first.',
        },
        {
          criterion: 'Terminology & Conceptual Precision',
          points: 25,
          description:
            'Uses standard specifications and explains the loop cycle clearly.',
        },
      ],
      hint: 'Trace the lifecycle of a setTimeout callback vs a Promise.then() callback from invocation to execution.',
    },
    {
      id: 'sa-2',
      question:
        'What are the dangers of unhandled Promise rejections and unconstrained concurrent async loops (e.g., Promise.all on 10,000 items), and what architectural patterns prevent these issues?',
      difficulty: 'Advanced',
      bloomLevel: 'Evaluation',
      modelAnswer:
        'Unconstrained concurrency via Promise.all on massive datasets triggers resource exhaustion (socket pool starvation, database connection limit breaches, and high memory spikes). Additionally, unhandled rejections can crash Node.js processes. To mitigate this, developers implement bounded concurrency pools (e.g. p-limit), async generators with stream processing, and explicit error boundary wrappers with try/catch and exponential backoff retry mechanisms.',
      keywords: [
        'resource exhaustion',
        'concurrency limit',
        'connection pool',
        'bounded',
        'stream',
        'p-limit',
      ],
      rubric: [
        {
          criterion: 'Risk Identification',
          points: 40,
          description:
            'Identifies memory bloat, socket starvation, and process termination risks.',
        },
        {
          criterion: 'Architectural Remediation Patterns',
          points: 40,
          description:
            'Proposes pooling, chunking/batching, or stream piping to cap simultaneous in-flight operations.',
        },
        {
          criterion: 'Clarity and Structure',
          points: 20,
          description: 'Presents a structured comparative explanation.',
        },
      ],
      hint: 'Think about file descriptor limits and connection pools in production backends.',
    },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'assessment' | 'blueprint' | 'review'>('assessment');
  const [filterType, setFilterType] = useState<'all' | 'mcq' | 'code' | 'sa'>('all');
  const [examMode, setExamMode] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [topicName, setTopicName] = useState('Full-Stack JavaScript & Async Architecture');
  const [assessment, setAssessment] = useState<AssessmentData | null>(INITIAL_ASSESSMENT);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // User Responses State
  const [userMCQAnswers, setUserMCQAnswers] = useState<Record<string, number>>({});
  const [codingCompletions, setCodingCompletions] = useState<Record<string, boolean>>({});
  const [shortAnswerScores, setShortAnswerScores] = useState<Record<string, number>>({});
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Handle generation via server API
  const handleGenerate = async (config: AssessmentConfig) => {
    setIsGenerating(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate assessment');
      }

      const data: AssessmentData = await response.json();
      setAssessment(data);
      setTopicName(config.topic);
      // Reset user answers for new assessment
      setUserMCQAnswers({});
      setCodingCompletions({});
      setShortAnswerScores({});
      setIsSubmitted(false);
      setActiveTab('assessment');
    } catch (err: any) {
      console.error('Generation error:', err);
      setErrorMessage(err?.message || 'Failed to generate assessment. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectMCQ = (questionId: string, optionIndex: number) => {
    setUserMCQAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleRecordCodingCompletion = (questionId: string, passed: boolean) => {
    setCodingCompletions((prev) => ({
      ...prev,
      [questionId]: passed,
    }));
  };

  const handleRecordShortAnswerScore = (questionId: string, score: number) => {
    setShortAnswerScores((prev) => ({
      ...prev,
      [questionId]: score,
    }));
  };

  const handleRetake = () => {
    setUserMCQAnswers({});
    setCodingCompletions({});
    setShortAnswerScores({});
    setIsSubmitted(false);
    setActiveTab('assessment');
  };

  const handleNavigateToQuestion = (_type: 'mcq' | 'code' | 'sa', _index: number) => {
    setActiveTab('assessment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalQuestions =
    (assessment?.mcqs.length || 0) +
    (assessment?.codingQuestions.length || 0) +
    (assessment?.shortAnswerQuestions.length || 0);

  const answeredCount =
    Object.keys(userMCQAnswers).length +
    Object.keys(codingCompletions).length +
    Object.keys(shortAnswerScores).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        examMode={examMode}
        setExamMode={setExamMode}
        hasAssessment={!!assessment}
        onOpenExport={() => setIsExportOpen(true)}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
      />

      {/* Main Body Content */}
      <main className="flex-1">
        {/* Error Notification */}
        {errorMessage && (
          <div className="max-w-4xl mx-auto mt-4 px-4">
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
              <button
                onClick={() => setErrorMessage(null)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-800"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: Topic Generator Form */}
        {activeTab === 'generator' && (
          <TopicInputForm
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            onExploreBlueprint={() => setActiveTab('blueprint')}
          />
        )}

        {/* Tab 2: Interactive Assessment Study Room */}
        {activeTab === 'assessment' && assessment && (
          <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
            {/* Assessment Meta Header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 mb-6 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1.5 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Topic Assessment
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Est. {assessment.estimatedTimeMinutes} mins
                    </span>
                    <span className="text-xs text-slate-400">&bull;</span>
                    <span className="text-xs text-slate-600 font-medium">
                      {totalQuestions} Questions Total
                    </span>
                  </div>
                  <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {topicName}
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {assessment.topicSummary}
                  </p>
                </div>

                {/* Mode Indicator & Action */}
                <div className="flex items-center space-x-3 shrink-0">
                  {examMode && !isSubmitted && (
                    <button
                      onClick={() => {
                        setIsSubmitted(true);
                        setActiveTab('review');
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit Exam for Grading</span>
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('generator')}
                    className="px-3 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                  >
                    Change Topic
                  </button>
                </div>
              </div>

              {/* Tags & Filter Tabs */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center flex-wrap gap-1.5">
                  {assessment.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Filter Tabs by Question Type */}
                <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
                  <button
                    onClick={() => setFilterType('all')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                      filterType === 'all'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All ({totalQuestions})
                  </button>
                  {assessment.mcqs.length > 0 && (
                    <button
                      onClick={() => setFilterType('mcq')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                        filterType === 'mcq'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      MCQs ({assessment.mcqs.length})
                    </button>
                  )}
                  {assessment.codingQuestions.length > 0 && (
                    <button
                      onClick={() => setFilterType('code')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                        filterType === 'code'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Coding ({assessment.codingQuestions.length})
                    </button>
                  )}
                  {assessment.shortAnswerQuestions.length > 0 && (
                    <button
                      onClick={() => setFilterType('sa')}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                        filterType === 'sa'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Short Answer ({assessment.shortAnswerQuestions.length})
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Questions Stream */}
            <div className="space-y-6">
              {/* Section 1: Multiple Choice */}
              {(filterType === 'all' || filterType === 'mcq') && assessment.mcqs.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                      Part 1: Multiple Choice Questions ({assessment.mcqs.length})
                    </h2>
                  </div>
                  {assessment.mcqs.map((mcq, idx) => (
                    <MCQCard
                      key={mcq.id}
                      question={mcq}
                      index={idx}
                      selectedOption={userMCQAnswers[mcq.id] ?? null}
                      onSelectOption={(opt) => handleSelectMCQ(mcq.id, opt)}
                      examMode={examMode}
                      isSubmitted={isSubmitted}
                    />
                  ))}
                </div>
              )}

              {/* Section 2: Coding Challenges */}
              {(filterType === 'all' || filterType === 'code') && assessment.codingQuestions.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center space-x-2 mb-3">
                    <Code2 className="w-4 h-4 text-indigo-600" />
                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                      Part 2: Practical Coding Challenges ({assessment.codingQuestions.length})
                    </h2>
                  </div>
                  {assessment.codingQuestions.map((codeQ, idx) => (
                    <CodingCard
                      key={codeQ.id}
                      question={codeQ}
                      index={idx}
                      examMode={examMode}
                      isSubmitted={isSubmitted}
                      onRecordCompletion={(passed) => handleRecordCodingCompletion(codeQ.id, passed)}
                    />
                  ))}
                </div>
              )}

              {/* Section 3: Conceptual Short Answer */}
              {(filterType === 'all' || filterType === 'sa') && assessment.shortAnswerQuestions.length > 0 && (
                <div className="pt-2">
                  <div className="flex items-center space-x-2 mb-3">
                    <FileText className="w-4 h-4 text-violet-600" />
                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                      Part 3: Conceptual Short-Answer Questions ({assessment.shortAnswerQuestions.length})
                    </h2>
                  </div>
                  {assessment.shortAnswerQuestions.map((saQ, idx) => (
                    <ShortAnswerCard
                      key={saQ.id}
                      question={saQ}
                      index={idx}
                      examMode={examMode}
                      isSubmitted={isSubmitted}
                      onRecordScore={(score) => handleRecordShortAnswerScore(saQ.id, score)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-8 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                Answered <span className="font-bold text-indigo-600">{answeredCount}</span> of{' '}
                <span className="font-bold">{totalQuestions}</span> questions.
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setActiveTab('review')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>View Diagnostic Scorecard</span>
                </button>
                <button
                  onClick={() => setIsExportOpen(true)}
                  className="px-3 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                >
                  Export Worksheet
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: System Blueprint & Architectural Specification */}
        {activeTab === 'blueprint' && <BlueprintView />}

        {/* Tab 4: Diagnostic Scorecard & Review */}
        {activeTab === 'review' && assessment && (
          <ScorecardView
            assessment={assessment}
            userMCQAnswers={userMCQAnswers}
            codingCompletions={codingCompletions}
            shortAnswerScores={shortAnswerScores}
            onRetake={handleRetake}
            onOpenExport={() => setIsExportOpen(true)}
            onNavigateToQuestion={handleNavigateToQuestion}
          />
        )}
      </main>

      {/* Export Modal */}
      {assessment && (
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          assessment={assessment}
          topic={topicName}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-slate-700">EduGen AI Assessment Architecture</span>
            <span>&bull; Powered by Gemini 3.8 Flash & Bloom's Taxonomy Matrix</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('blueprint')}
              className="text-indigo-600 hover:underline font-semibold"
            >
              System Blueprint & Schemas
            </button>
            <button
              onClick={() => setActiveTab('generator')}
              className="text-slate-600 hover:text-slate-900"
            >
              Create Assessment
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
