import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Sliders,
  Code2,
  FileText,
  HelpCircle,
  CheckCircle2,
  Cpu,
  Layers,
  Dna,
  Binary,
  ArrowRight,
  Flame,
  FlaskConical,
  Orbit,
  Zap,
  Sigma,
  Grid,
  Calculator,
} from 'lucide-react';
import { AssessmentConfig, DifficultyLevel } from '../types';
import { PRESET_TOPICS, PresetTopic } from '../data/blueprintData';

interface TopicInputFormProps {
  onGenerate: (config: AssessmentConfig) => Promise<void>;
  isGenerating: boolean;
  onExploreBlueprint: () => void;
}

export const TopicInputForm: React.FC<TopicInputFormProps> = ({
  onGenerate,
  isGenerating,
  onExploreBlueprint,
}) => {
  const [topic, setTopic] = useState('Full-Stack JavaScript & Async Architecture');
  const [subtopics, setSubtopics] = useState('Event Loop, Microtasks vs Macrotasks, Promises, Web APIs');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Intermediate');
  const [mcqCount, setMcqCount] = useState(4);
  const [codingCount, setCodingCount] = useState(2);
  const [shortAnswerCount, setShortAnswerCount] = useState(3);
  const [bloomsFocus, setBloomsFocus] = useState('Balanced');
  const [language, setLanguage] = useState('JavaScript');
  const [contextNotes, setContextNotes] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [presetCategory, setPresetCategory] = useState<string>('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    onGenerate({
      topic: topic.trim(),
      subtopics: subtopics.trim(),
      difficulty,
      mcqCount,
      codingCount,
      shortAnswerCount,
      bloomsFocus,
      language,
      contextNotes: contextNotes.trim(),
    });
  };

  const handleSelectPreset = (preset: PresetTopic) => {
    setTopic(preset.topic);
    setSubtopics(preset.subtopics);
    setDifficulty(preset.difficulty);
  };

  const getPresetIcon = (iconName: string) => {
    switch (iconName) {
      case 'Orbit':
        return <Orbit className="w-4 h-4 text-sky-500" />;
      case 'Zap':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'Sigma':
        return <Sigma className="w-4 h-4 text-emerald-600" />;
      case 'Grid':
        return <Grid className="w-4 h-4 text-purple-500" />;
      case 'Calculator':
        return <Calculator className="w-4 h-4 text-teal-600" />;
      case 'FlaskConical':
        return <FlaskConical className="w-4 h-4 text-cyan-600" />;
      case 'Code2':
        return <Code2 className="w-4 h-4 text-indigo-500" />;
      case 'Binary':
        return <Binary className="w-4 h-4 text-emerald-500" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-amber-500" />;
      case 'Dna':
        return <Dna className="w-4 h-4 text-rose-500" />;
      case 'Layers':
        return <Layers className="w-4 h-4 text-violet-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-blue-500" />;
    }
  };

  const topicLower = topic.toLowerCase();
  const isPhysics =
    topicLower.includes('physic') ||
    topicLower.includes('kinematic') ||
    topicLower.includes('mechanic') ||
    topicLower.includes('projectile') ||
    topicLower.includes('gravity') ||
    topicLower.includes('electromagnet');

  const isMath =
    topicLower.includes('math') ||
    topicLower.includes('calculus') ||
    topicLower.includes('derivative') ||
    topicLower.includes('integral') ||
    topicLower.includes('algebra') ||
    topicLower.includes('matrix');

  const isChemistryOrBio =
    topicLower.includes('chem') ||
    topicLower.includes('titrat') ||
    topicLower.includes('bio');

  const filteredPresets =
    presetCategory === 'All'
      ? PRESET_TOPICS
      : PRESET_TOPICS.filter((p) => p.category === presetCategory);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Hero Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generative Educational Intelligence Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Generate Comprehensive Assessments on Any Topic
        </h1>
        <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
          Produce diverse Multiple-Choice questions with diagnostic distractors, real-world coding challenges with test suites, and rubric-graded short answers.
        </p>

        {/* Blueprint callout banner */}
        <div className="mt-4 flex items-center justify-center">
          <button
            type="button"
            onClick={onExploreBlueprint}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50/60 hover:bg-indigo-100/70 border border-indigo-200/80 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Read Website Architecture, Taxonomy & Accuracy Plan</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Preset Topics Carousel & Category Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span>Curriculum Presets & Popular Subjects</span>
          </span>
          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Physics & Math', 'Chemistry & Bio', 'Computer Science', 'Humanities'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setPresetCategory(cat)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all shrink-0 ${
                  presetCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {filteredPresets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className="text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-400 bg-white hover:bg-indigo-50/30 transition-all group flex flex-col justify-between shadow-xs"
            >
              <div className="flex items-center space-x-2 mb-1.5">
                <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-indigo-100 transition-colors">
                  {getPresetIcon(p.icon)}
                </div>
                <div className="font-semibold text-xs text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                  {p.topic}
                </div>
              </div>
              <div className="text-[11px] text-slate-500 line-clamp-1 mb-2">
                {p.subtopics}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="px-1.5 py-0.5 rounded bg-slate-100 font-medium text-slate-600">
                  {p.difficulty}
                </span>
                <span className="text-indigo-600 font-medium group-hover:translate-x-0.5 transition-transform flex items-center">
                  Load &rarr;
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Generation Form Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Topic Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1.5">
              Subject or Topic to Assess <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Asynchronous JavaScript, Microservices, Quantum Mechanics, Organic Chemistry"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-slate-900 text-sm font-medium transition-all"
            />
            <p className="mt-1 text-xs text-slate-500">
              The AI decomposes this subject into curricular objectives and Bloom’s taxonomy categories.
            </p>
          </div>

          {/* Subtopics / Granular Focus */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1.5">
              Specific Subtopics or Focus Areas <span className="text-xs font-normal text-slate-400">(Optional)</span>
            </label>
            <input
              type="text"
              value={subtopics}
              onChange={(e) => setSubtopics(e.target.value)}
              placeholder="e.g. Call Stack, Event Loop, Promises, Microtasks vs Macrotasks, Async/Await"
              className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-slate-900 text-sm transition-all"
            />
          </div>

          {/* Difficulty Tier & Bloom's Focus */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Target Learner Tier
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Beginner', 'Intermediate', 'Advanced', 'Expert'] as DifficultyLevel[]).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                      difficulty === level
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Bloom's Taxonomy Focus
              </label>
              <select
                value={bloomsFocus}
                onChange={(e) => setBloomsFocus(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800 text-xs font-medium focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 bg-white"
              >
                <option value="Balanced">Balanced Spectrum (Recall to Synthesis)</option>
                <option value="Analytical & Problem Solving">High Analytical & Problem-Solving</option>
                <option value="Recall & Conceptual Foundations">Foundational Concepts & Recall</option>
                <option value="Evaluation & Synthesis">High-Order Evaluation & Architectural Trade-offs</option>
              </select>
              <p className="mt-1.5 text-[11px] text-slate-500">
                Calibrates cognitive depth across factual, procedural, and metacognitive levels.
              </p>
            </div>
          </div>

          {/* Question Mix Distribution */}
          <div className="border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-500" />
                <span>Question Format Composition</span>
              </span>
              <span className="text-xs font-medium text-indigo-600">
                Total: {mcqCount + codingCount + shortAnswerCount} Questions
              </span>
            </div>

            {isPhysics && (
              <div className="mb-3 px-3.5 py-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 text-xs flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Orbit className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Physics topic detected: Coding questions solve kinematic equations, trajectory physics, or energy conservation.</span>
                </div>
                {codingCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setCodingCount(0)}
                    className="text-[11px] font-bold text-sky-700 hover:text-sky-900 underline ml-2 shrink-0"
                  >
                    Set Coding to 0
                  </button>
                )}
              </div>
            )}

            {isMath && (
              <div className="mb-3 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sigma className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mathematics topic detected: Coding challenges compute numerical integration, matrix algebra, or optimization algorithms.</span>
                </div>
                {codingCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setCodingCount(0)}
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 underline ml-2 shrink-0"
                  >
                    Set Coding to 0
                  </button>
                )}
              </div>
            )}

            {isChemistryOrBio && !isPhysics && !isMath && (
              <div className="mb-3 px-3.5 py-2 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-950 text-xs flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FlaskConical className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Chemistry/Biology detected: Coding questions focus on quantitative stoichiometry, kinetics, or molarity calculations.</span>
                </div>
                {codingCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setCodingCount(0)}
                    className="text-[11px] font-bold text-cyan-700 hover:text-cyan-900 underline ml-2 shrink-0"
                  >
                    Set Coding to 0
                  </button>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* MCQs */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-semibold text-slate-900">MCQs</span>
                  </div>
                  <span className="text-sm font-bold text-indigo-600">{mcqCount}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={mcqCount}
                  onChange={(e) => setMcqCount(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                  <span>1 min</span>
                  <span>With distractors</span>
                  <span>8 max</span>
                </div>
              </div>

              {/* Coding Challenges */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1.5">
                    <Code2 className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-semibold text-slate-900">Coding</span>
                  </div>
                  <span className="text-sm font-bold text-indigo-600">{codingCount}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={codingCount}
                  onChange={(e) => setCodingCount(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                  <span>0 min</span>
                  <span>With test cases</span>
                  <span>4 max</span>
                </div>
              </div>

              {/* Short Answer Questions */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1.5">
                    <FileText className="w-4 h-4 text-violet-600" />
                    <span className="text-xs font-semibold text-slate-900">Short Answer</span>
                  </div>
                  <span className="text-sm font-bold text-indigo-600">{shortAnswerCount}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={shortAnswerCount}
                  onChange={(e) => setShortAnswerCount(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <div className="text-[10px] text-slate-500 mt-1 flex justify-between">
                  <span>0 min</span>
                  <span>With AI grading</span>
                  <span>5 max</span>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Grounding Context Accordion */}
          <div className="border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center space-x-1 transition-colors"
            >
              <span>{showAdvanced ? '− Hide Context & Grounding Settings' : '+ Add Custom Notes, Syllabus Text or Coding Language'}</span>
            </button>

            {showAdvanced && (
              <div className="mt-3 space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Coding Language (for coding problems)
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-800 bg-white"
                  >
                    <option value="JavaScript">JavaScript (Runnable in-browser)</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Custom Notes / Lecture Excerpts / Syllabus Grounding
                  </label>
                  <textarea
                    rows={3}
                    value={contextNotes}
                    onChange={(e) => setContextNotes(e.target.value)}
                    placeholder="Paste specific paragraphs, lecture notes, textbook excerpts, or code documentation here to ground the generated questions in your exact study material..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 bg-white"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    Grounding text ensures the AI generates questions strictly aligned with your course curriculum.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isGenerating || !topic.trim()}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white shadow-md transition-all flex items-center justify-center space-x-2 ${
                isGenerating
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-[0.99]'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing Pedagogical Assessment via Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Educational Assessment Now</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
