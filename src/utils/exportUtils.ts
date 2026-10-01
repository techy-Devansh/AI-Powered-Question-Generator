import { AssessmentData } from '../types';

export function exportToMarkdown(assessment: AssessmentData, topic: string, includeAnswers = true): string {
  let md = `# Assessment: ${topic}\n\n`;
  md += `**Scope:** ${assessment.topicSummary}\n\n`;
  md += `**Estimated Time:** ${assessment.estimatedTimeMinutes} minutes | **Tags:** ${assessment.tags.join(', ')}\n\n`;
  md += `---\n\n`;

  // MCQs
  if (assessment.mcqs.length > 0) {
    md += `## Part 1: Multiple-Choice Questions (${assessment.mcqs.length})\n\n`;
    assessment.mcqs.forEach((mcq, idx) => {
      md += `### ${idx + 1}. ${mcq.question}\n`;
      if (mcq.bloomLevel) md += `*Cognitive Level: ${mcq.bloomLevel}* | *Difficulty: ${mcq.difficulty || 'Intermediate'}*\n\n`;
      mcq.options.forEach((opt, optIdx) => {
        const letter = String.fromCharCode(65 + optIdx);
        md += `- [ ] **${letter})** ${opt}\n`;
      });
      md += `\n`;

      if (includeAnswers) {
        const correctLetter = String.fromCharCode(65 + mcq.correctIndex);
        md += `> **Correct Answer:** ${correctLetter}) ${mcq.options[mcq.correctIndex]}\n>\n`;
        md += `> **Explanation:** ${mcq.explanation}\n\n`;
      }
    });
    md += `---\n\n`;
  }

  // Coding Questions
  if (assessment.codingQuestions.length > 0) {
    md += `## Part 2: Practical Coding Challenges (${assessment.codingQuestions.length})\n\n`;
    assessment.codingQuestions.forEach((code, idx) => {
      md += `### ${idx + 1}. ${code.title} [${code.language}]\n`;
      md += `*Difficulty: ${code.difficulty || 'Medium'}* | *Time: ${code.timeComplexity || 'O(N)'}* | *Space: ${code.spaceComplexity || 'O(1)'}*\n\n`;
      md += `${code.description}\n\n`;

      md += `#### Test Cases:\n`;
      code.testCases.forEach((tc, tIdx) => {
        md += `- **Input:** \`${tc.input}\` ➔ **Expected Output:** \`${tc.expectedOutput}\`${tc.explanation ? ` *(${tc.explanation})*` : ''}\n`;
      });
      md += `\n`;

      md += `#### Starter Template:\n\`\`\`${code.language.toLowerCase()}\n${code.starterCode}\n\`\`\`\n\n`;

      if (includeAnswers) {
        md += `#### Reference Solution:\n\`\`\`${code.language.toLowerCase()}\n${code.solutionCode}\n\`\`\`\n\n`;
        md += `> **Algorithm Walkthrough:** ${code.explanation}\n\n`;
      }
    });
    md += `---\n\n`;
  }

  // Short-Answer Questions
  if (assessment.shortAnswerQuestions.length > 0) {
    md += `## Part 3: Conceptual & Short-Answer Questions (${assessment.shortAnswerQuestions.length})\n\n`;
    assessment.shortAnswerQuestions.forEach((sa, idx) => {
      md += `### ${idx + 1}. ${sa.question}\n`;
      md += `*Target Cognitive Level: ${sa.bloomLevel || 'Analysis'}*\n\n`;
      md += `**Evaluation Rubric:**\n`;
      sa.rubric.forEach(r => {
        md += `- **${r.criterion}** (${r.points} pts): ${r.description}\n`;
      });
      md += `\n`;

      if (includeAnswers) {
        md += `> **Benchmark Model Answer:**\n> ${sa.modelAnswer}\n>\n`;
        md += `> **Key Vocabulary / Concepts:** ${sa.keywords.join(', ')}\n\n`;
      }
    });
  }

  return md;
}

export function downloadFile(content: string, fileName: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
