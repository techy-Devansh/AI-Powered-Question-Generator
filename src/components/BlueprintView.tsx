import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  BookOpen,
  Code2,
  FileText,
  ShieldCheck,
  Cpu,
  Download,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Workflow,
  Target,
  Database,
  Terminal,
} from 'lucide-react';
import { ARCHITECTURE_PLAN, BlueprintModule } from '../data/blueprintData';
import { downloadFile } from '../utils/exportUtils';

export const BlueprintView: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(ARCHITECTURE_PLAN[0].id);

  const selectedModule =
    ARCHITECTURE_PLAN.find((m) => m.id === selectedModuleId) || ARCHITECTURE_PLAN[0];

  const handleDownloadPlan = () => {
    let md = `# Architectural & Pedagogical Blueprint: AI Educational Question & Assessment Platform\n\n`;
    md += `This document provides the complete system plan, schema specifications, and pedagogical algorithms for generating educational questions and assessments across MCQs, coding challenges, and short-answer prompts.\n\n`;

    ARCHITECTURE_PLAN.forEach((mod) => {
      md += `## ${mod.title}\n`;
      md += `*Category: ${mod.category}*\n\n`;
      md += `> ${mod.summary}\n\n`;

      mod.details.forEach((det) => {
        md += `### ${det.heading}\n\n`;
        det.points.forEach((pt) => {
          md += `- ${pt}\n`;
        });
        md += `\n`;
      });
      md += `---\n\n`;
    });

    downloadFile(md, 'EduGen_AI_System_Blueprint.md', 'text/markdown');
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      {/* Blueprint Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <Workflow className="w-3.5 h-3.5" />
            <span>Complete Architecture & Pedagogical Blueprint</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            System Design & Educational Plan
          </h1>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Detailed engineering blueprint explaining how topic intake, AI generation, distractor engineering, sandboxed execution, and assessment interfaces are structured.
          </p>
        </div>

        <button
          onClick={handleDownloadPlan}
          className="self-start md:self-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center space-x-2 transition-all active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span>Download Blueprint Markdown</span>
        </button>
      </div>

      {/* Visual System Architecture Diagram */}
      <div className="mb-10 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white tracking-wide uppercase">
              End-to-End System Pipeline Architecture
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">Version 2.4 &bull; Production Spec</span>
        </div>

        {/* Pipeline Diagram Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          {/* Stage 1 */}
          <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80">
            <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">
              Phase 1: Ingestion
            </div>
            <div className="font-bold text-sm text-white mb-2 flex items-center space-x-1.5">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Topic & Scope Intaker</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Accepts subject keyword, syllabus upload, Bloom's cognitive target, and difficulty tier.
            </p>
          </div>

          {/* Stage 2 */}
          <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80">
            <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">
              Phase 2: LLM Synthesis
            </div>
            <div className="font-bold text-sm text-white mb-2 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Gemini 3.8 Flash Core</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enforces strict JSON responseSchema, generates MCQs with plausible distractors, coding challenges, and rubrics.
            </p>
          </div>

          {/* Stage 3 */}
          <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80">
            <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">
              Phase 3: Execution Sandbox
            </div>
            <div className="font-bold text-sm text-white mb-2 flex items-center space-x-1.5">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Sandboxed Test Runner</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Runs user code against test cases with time limits; triggers AI grading for short answers against rubric.
            </p>
          </div>

          {/* Stage 4 */}
          <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80">
            <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">
              Phase 4: Diagnostics
            </div>
            <div className="font-bold text-sm text-white mb-2 flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Adaptive Analytics</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evaluates Bloom's taxonomy mastery, highlights misconception clusters, and suggests targeted remediations.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Blueprint Explorer Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module Sidebar List */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 px-1">
            System Modules & Blueprints
          </span>
          {ARCHITECTURE_PLAN.map((mod) => {
            const isSelected = mod.id === selectedModuleId;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setSelectedModuleId(mod.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start space-x-3 ${
                  isSelected
                    ? 'bg-indigo-50/90 border-indigo-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider block ${
                      isSelected ? 'text-indigo-600' : 'text-slate-400'
                    }`}
                  >
                    {mod.category}
                  </span>
                  <span className="text-xs font-bold text-slate-900 line-clamp-1">
                    {mod.title}
                  </span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isSelected ? 'text-indigo-600 translate-x-0.5' : 'text-slate-300'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Module Content Deep Dive */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              {selectedModule.category}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              {selectedModule.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {selectedModule.summary}
            </p>
          </div>

          <div className="space-y-6">
            {selectedModule.details.map((section, sIdx) => (
              <div key={sIdx} className="space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  <span>{section.heading}</span>
                </h3>
                <ul className="space-y-2 pl-3">
                  {section.points.map((pt, pIdx) => (
                    <li key={pIdx} className="text-xs text-slate-600 leading-relaxed flex items-start space-x-2">
                      <span className="text-indigo-500 font-bold shrink-0">&bull;</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Prompt Engineering Spec Snippet */}
          {selectedModule.id === 'ai-generation-engine' && (
            <div className="mt-6 p-4 rounded-xl bg-slate-950 text-slate-300 text-xs font-mono space-y-2">
              <span className="text-emerald-400 font-bold block">
                // Strict Gemini Schema Definition:
              </span>
              <pre className="overflow-x-auto text-[11px] text-slate-300 leading-tight">
{`responseSchema: {
  type: Type.OBJECT,
  properties: {
    mcqs: { type: Type.ARRAY, items: { ...mcqProps } },
    codingQuestions: { type: Type.ARRAY, items: { ...codeProps } },
    shortAnswerQuestions: { type: Type.ARRAY, items: { ...saProps } }
  }
}`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
