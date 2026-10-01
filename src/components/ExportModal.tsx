import React, { useState } from 'react';
import { X, FileDown, Copy, Check, FileText, Code2 } from 'lucide-react';
import { AssessmentData } from '../types';
import { exportToMarkdown, downloadFile } from '../utils/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: AssessmentData;
  topic: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  assessment,
  topic,
}) => {
  const [includeAnswers, setIncludeAnswers] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const markdownContent = exportToMarkdown(assessment, topic, includeAnswers);
  const jsonContent = JSON.stringify(assessment, null, 2);

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    downloadFile(markdownContent, `${topic.replace(/\s+/g, '_')}_Assessment.md`, 'text/markdown');
  };

  const handleDownloadJSON = () => {
    downloadFile(jsonContent, `${topic.replace(/\s+/g, '_')}_Assessment.json`, 'application/json');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <FileDown className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-base">
              Export Educational Assessment
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="flex items-center space-x-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeAnswers}
              onChange={(e) => setIncludeAnswers(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <span>Include Answer Keys, Explanations & Model Responses in Export</span>
          </label>
          <p className="text-[11px] text-slate-500 pl-6">
            Uncheck if you want to export an un-answered quiz sheet for students to complete.
          </p>
        </div>

        {/* Formats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Markdown Card */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2 font-bold text-xs text-slate-900">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Markdown Document (.md)</span>
              </div>
              <p className="text-[11px] text-slate-600 mb-3">
                Formatted markdown ready for GitHub, Notion, Obsidian, or printable conversion.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDownloadMarkdown}
                className="flex-1 py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center space-x-1"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download .md</span>
              </button>
              <button
                onClick={handleCopyMarkdown}
                className="py-1.5 px-2.5 border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* JSON Schema Card */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2 font-bold text-xs text-slate-900">
                <Code2 className="w-4 h-4 text-emerald-600" />
                <span>Structured JSON (.json)</span>
              </div>
              <p className="text-[11px] text-slate-600 mb-3">
                Raw structured schema suitable for importing into LMS (Canvas, Moodle) or custom apps.
              </p>
            </div>
            <button
              onClick={handleDownloadJSON}
              className="py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center space-x-1"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download .json</span>
            </button>
          </div>
        </div>

        {/* Markdown Preview snippet */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-3 py-1.5 bg-slate-100 border-b border-slate-200 text-[11px] font-mono text-slate-600 flex justify-between">
            <span>Preview</span>
            <span>{markdownContent.length} chars</span>
          </div>
          <pre className="p-3 bg-slate-50 text-[11px] font-mono text-slate-700 max-h-40 overflow-y-auto whitespace-pre-wrap">
            {markdownContent.slice(0, 500)}...
          </pre>
        </div>
      </div>
    </div>
  );
};
