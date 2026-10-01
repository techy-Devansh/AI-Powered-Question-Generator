export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type BloomsTaxonomy =
  | 'Recall'
  | 'Understanding'
  | 'Application'
  | 'Analysis'
  | 'Evaluation'
  | 'Synthesis';

export interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  distractorExplanations?: string[];
  bloomLevel?: BloomsTaxonomy | string;
  difficulty?: DifficultyLevel | string;
  hint?: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  explanation?: string;
  isHidden?: boolean;
}

export interface CodingQuestion {
  id: string;
  title: string;
  description: string;
  difficulty?: DifficultyLevel | string;
  language: string;
  starterCode: string;
  solutionCode: string;
  explanation: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  hint?: string;
  testCases: TestCase[];
}

export interface RubricCriterion {
  criterion: string;
  points: number;
  description: string;
}

export interface ShortAnswerQuestion {
  id: string;
  question: string;
  difficulty?: DifficultyLevel | string;
  bloomLevel?: BloomsTaxonomy | string;
  modelAnswer: string;
  keywords: string[];
  rubric: RubricCriterion[];
  hint?: string;
}

export interface AssessmentData {
  topicSummary: string;
  tags: string[];
  estimatedTimeMinutes: number;
  mcqs: MCQQuestion[];
  codingQuestions: CodingQuestion[];
  shortAnswerQuestions: ShortAnswerQuestion[];
}

export interface RubricScoreItem {
  criterion: string;
  pointsEarned: number;
  maxPoints: number;
  notes?: string;
}

export interface ShortAnswerEvaluation {
  score: number;
  overallFeedback: string;
  strengths: string[];
  missingPoints: string[];
  rubricScores: RubricScoreItem[];
}

export interface TestCaseExecutionResult {
  testIndex: number;
  input: string;
  expected: string;
  actual: string;
  passed: boolean;
  timeMs: number;
  errorMessage?: string;
}

export interface AssessmentConfig {
  topic: string;
  subtopics: string;
  difficulty: DifficultyLevel;
  mcqCount: number;
  codingCount: number;
  shortAnswerCount: number;
  bloomsFocus: string;
  language: string;
  contextNotes: string;
}
