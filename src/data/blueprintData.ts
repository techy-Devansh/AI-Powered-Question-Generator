export interface BlueprintModule {
  id: string;
  category: 'Input Architecture' | 'AI Generation Core' | 'Accuracy & Diversity' | 'UI & UX Design' | 'Evaluation & Execution' | 'Pedagogical Model';
  title: string;
  summary: string;
  details: {
    heading: string;
    points: string[];
    codeSnippet?: string;
  }[];
}

export const ARCHITECTURE_PLAN: BlueprintModule[] = [
  {
    id: 'input-intake',
    category: 'Input Architecture',
    title: '1. Topic Ingestion & Context Scoping Engine',
    summary: 'Multi-modal topic input accepting natural language subjects, curriculum standards, syllabus uploads, and target learner constraints.',
    details: [
      {
        heading: 'Topic Decomposition & Entity Extraction',
        points: [
          'Deconstructs broad topics (e.g., "Operating Systems") into discrete cognitive subtopics (Memory Management, Virtual Paging, Mutex/Semaphores, Race Conditions).',
          'Identifies prerequisite concepts and taxonomy boundaries to avoid generating out-of-scope or excessively trivial questions.',
          'Supports custom notes, lecture transcripts, syllabus bullet points, and code repos via contextual grounding.',
        ],
      },
      {
        heading: 'Learner Persona & Difficulty Calibration',
        points: [
          'Four discrete tiers: Beginner (declarative knowledge, definitions, syntax basics), Intermediate (application, debugging, standard patterns), Advanced (system design, edge cases, algorithmic optimization), and Expert (concurrency race conditions, formal proofs, architectural tradeoffs).',
          'Configurable distribution of question formats (e.g. 50% MCQs, 25% Coding Challenges, 25% Free-Form Short Answers).',
        ],
      },
      {
        heading: 'Input Parameters Schema',
        points: [
          'Topic Query: Primary subject string with optional subtopic tags.',
          'Bloom’s Taxonomy Target: Balanced, Problem-Solving heavy, or Conceptual Synthesis.',
          'Programming Language: Auto-detected or chosen (JavaScript, TypeScript, Python, C++, Java).',
          'Context Notes / Custom Syllabus: Raw text ingested into the prompt context for grounded generation.',
        ],
      },
    ],
  },
  {
    id: 'ai-generation-engine',
    category: 'AI Generation Core',
    title: '2. Multi-Modal Question Generation Pipeline',
    summary: 'Structured generation of MCQs, coding environments, and conceptual short-answer items using strict JSON schema contracts with Gemini.',
    details: [
      {
        heading: 'Multiple-Choice Question (MCQ) Engine',
        points: [
          'Strict 4-option schema with zero-ambiguity single correct response.',
          'Plausible Diagnostic Distractors: Wrong options are engineered based on documented student misconceptions, common cognitive traps, and boundary errors rather than arbitrary gibberish.',
          'Dual-layer explanations: Explains why the correct option is sound AND provides diagnostic commentary for each distractor.',
          'Progressive cognitive hint system enabling Socratic guidance without spoiling answers.',
        ],
      },
      {
        heading: 'Interactive Coding Problem Engine',
        points: [
          'Real-world problem framing with clear inputs, outputs, and algorithmic constraints (e.g., time O(N), space O(1)).',
          'Starter code template with clean boilerplate and typed function signatures.',
          'Dual-tier test cases: Public visible test cases for rapid iteration + hidden edge cases (empty inputs, negative bounds, scale limits).',
          'Reference solution with asymptotic Big-O analysis for both time and space complexity.',
        ],
      },
      {
        heading: 'Short-Answer & Conceptual Synthesis Engine',
        points: [
          'Prompts targeting deeper understanding (e.g., "Contrast event-loop microtasks vs macrotasks under heavy I/O").',
          'Multi-dimensional rubric with explicit point weights summing to 100 points.',
          'Semantic keyword list and model benchmark answer representing a perfect score.',
        ],
      },
    ],
  },
  {
    id: 'diversity-relevance',
    category: 'Accuracy & Diversity',
    title: '3. Relevance, Variety & Anti-Hallucination Guarantees',
    summary: 'Techniques and algorithms deployed to prevent repetitive patterns, factual drift, and trivial distractors.',
    details: [
      {
        heading: 'Bloom’s Taxonomy Cognitive Matrix',
        points: [
          'Enforces cognitive diversity across 6 Bloom’s tiers: Remember (15%), Understand (25%), Apply (30%), Analyze (15%), Evaluate (10%), Create (5%).',
          'Prevents question banks from degenerating into rote memorization quizzes by demanding procedural and diagnostic items.',
        ],
      },
      {
        heading: 'Prompt Engineering & Anti-Hallucination Guardrails',
        points: [
          'Server-side schema validation via Google GenAI responseSchema enforcing strict typing.',
          'Temperature calibration (0.6 - 0.7) for optimal creative variety while preserving factual determinism in code and science.',
          'Grounded system instructions forbidding fake API functions or nonexistent library methods.',
        ],
      },
      {
        heading: 'Dynamic Subtopic Shuffling & Jaccard Dissimilarity',
        points: [
          'Question sets actively partition the topic into orthogonal sub-domains to guarantee complete curricular coverage.',
          'Distractor similarity filtering ensures options are distinct in length and semantic phrasing to prevent elimination biases.',
        ],
      },
    ],
  },
  {
    id: 'evaluation-execution',
    category: 'Evaluation & Execution',
    title: '4. AI Assessment & Sandboxed Code Execution Subsystem',
    summary: 'Automated evaluation mechanisms providing real-time code execution and nuanced semantic grading for free-form responses.',
    details: [
      {
        heading: 'In-Browser Test-Runner & Code Execution',
        points: [
          'Safe browser-based sandbox execution for JavaScript/TypeScript and simulated evaluation for other languages.',
          'Executes user function against all test cases, comparing normalized JSON serialization.',
          'Measures execution latency (milliseconds) and isolates runtime exceptions with friendly stack traces.',
          'Pedagogical AI Code Hint: Analyzes current user code without spoiling the solution.',
        ],
      },
      {
        heading: 'Rubric-Based Semantic Short-Answer Evaluator',
        points: [
          'Grades free-form answers via server-side Gemini evaluator comparing against the question rubric, model answer, and keywords.',
          'Outputs granular rubric breakdown (points per criterion), identified strengths, and specific missing conceptual nuances.',
          'Encourages student mastery through growth-oriented constructive feedback.',
        ],
      },
    ],
  },
  {
    id: 'ui-ux-design',
    category: 'UI & UX Design',
    title: '5. Clear, User-Friendly Interface & Assessment Modes',
    summary: 'Ergonomic, modern study platform offering dual operating modes (Practice vs Exam), accessibility, and multi-format exports.',
    details: [
      {
        heading: 'Dual Assessment Modes',
        points: [
          'Practice / Study Mode: Socratic hints, immediate distractor feedback, step-by-step code walkthroughs, and flashcard toggles.',
          'Exam / Assessment Mode: Timed environment, hidden answer keys until submission, comprehensive diagnostic scorecard and analytics.',
        ],
      },
      {
        heading: 'Unified Dashboard & Type-Specific Explorers',
        points: [
          'Split-screen responsive layout: Left-hand problem specification / Right-hand code playground or answer workbench.',
          'Progress ring tracking completion rates, accuracy scores, and Bloom’s level distribution.',
          'Export utility: One-click export to printable test sheets, Markdown notes, Anki/Quizlet flashcards, or JSON assessment formats.',
        ],
      },
    ],
  },
  {
    id: 'pedagogical-model',
    category: 'Pedagogical Model',
    title: '6. Spaced Repetition & Adaptive Learning Integration',
    summary: 'Long-term learning retention through mistake bookmarking, weakness analytics, and adaptive difficulty scaling.',
    details: [
      {
        heading: 'Diagnostic Analytics & Gap Detection',
        points: [
          'Identifies exact cognitive blindspots (e.g., student excels in MCQs but struggles with coding implementation or algorithmic edge cases).',
          'Generates focused remedial question sets specifically targeting previously missed concepts.',
        ],
      },
      {
        heading: 'Portability & Interoperability',
        points: [
          'LMS-compliant output options (QTI standard, Canvas/Moodle compatible JSON).',
          'Offline study print mode formatting questions with optional detached answer keys.',
        ],
      },
    ],
  },
];

export interface PresetTopic {
  category: 'Physics & Math' | 'Chemistry & Bio' | 'Computer Science' | 'Humanities';
  topic: string;
  subtopics: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  tags: string[];
  icon: string;
}

export const PRESET_TOPICS: PresetTopic[] = [
  {
    category: 'Physics & Math',
    topic: 'Physics: Classical Mechanics & Projectile Motion',
    subtopics: 'Kinematic Equations, Maximum Height, Range, Conservation of Energy, Momentum, Friction',
    difficulty: 'Intermediate',
    tags: ['Physics', 'Mechanics', 'Kinematics', "Newton's Laws", 'Energy'],
    icon: 'Orbit',
  },
  {
    category: 'Physics & Math',
    topic: 'Physics: Electromagnetism & Maxwell’s Equations',
    subtopics: 'Gauss’s Law, Faraday’s Law, Induced EMF, Lorentz Force, Ampere-Maxwell, Flux',
    difficulty: 'Advanced',
    tags: ['Physics', 'Electromagnetism', 'Maxwell', 'Magnetic Flux', 'Fields'],
    icon: 'Zap',
  },
  {
    category: 'Physics & Math',
    topic: 'Mathematics: Differential Calculus & Optimization',
    subtopics: 'Chain Rule, Critical Points, Second Derivative Test, Related Rates, L’Hôpital’s Rule',
    difficulty: 'Intermediate',
    tags: ['Mathematics', 'Calculus', 'Derivatives', 'Optimization', 'Analysis'],
    icon: 'Sigma',
  },
  {
    category: 'Physics & Math',
    topic: 'Mathematics: Linear Algebra & Matrix Transformations',
    subtopics: 'Eigenvalues & Eigenvectors, Matrix Determinants, Orthogonal Projections, Vector Spaces',
    difficulty: 'Advanced',
    tags: ['Mathematics', 'Linear Algebra', 'Matrices', 'Vectors', 'Eigenvalues'],
    icon: 'Grid',
  },
  {
    category: 'Chemistry & Bio',
    topic: 'Chemistry: Acid-Base Titrations & Buffer Equilibria',
    subtopics: 'Equivalence Point, End Point, Phenolphthalein, Henderson-Hasselbalch, Hydrolysis',
    difficulty: 'Intermediate',
    tags: ['Chemistry', 'Titration', 'Acids & Bases', 'Equilibrium', 'Stoichiometry'],
    icon: 'FlaskConical',
  },
  {
    category: 'Chemistry & Bio',
    topic: 'Cellular Biology: Photosynthesis & Respiration',
    subtopics: 'Calvin Cycle, ATP Synthase, Electron Transport Chain, Chloroplast Thylakoids',
    difficulty: 'Intermediate',
    tags: ['Biology', 'Science', 'Biochemistry', 'Cellular'],
    icon: 'Dna',
  },
  {
    category: 'Computer Science',
    topic: 'Full-Stack JavaScript & Async Architecture',
    subtopics: 'Event Loop, Promises, Microtasks vs Macrotasks, Web APIs, Closures',
    difficulty: 'Intermediate',
    tags: ['Web Dev', 'JavaScript', 'Architecture', 'Async'],
    icon: 'Code2',
  },
  {
    category: 'Computer Science',
    topic: 'Data Structures: Binary Trees & Graph Traversal',
    subtopics: 'BST Inversion, BFS, DFS, Dijkstra, Cycle Detection, Recursion',
    difficulty: 'Advanced',
    tags: ['Algorithms', 'Data Structures', 'Trees', 'Graphs'],
    icon: 'Binary',
  },
  {
    category: 'Computer Science',
    topic: 'Machine Learning: Neural Networks & Backprop',
    subtopics: 'Gradient Descent, Loss Functions, Activation Functions, Overfitting, Backpropagation calculus',
    difficulty: 'Advanced',
    tags: ['AI & ML', 'Deep Learning', 'Math', 'Optimization'],
    icon: 'Cpu',
  },
  {
    category: 'Computer Science',
    topic: 'System Design: Distributed Caching & Message Queues',
    subtopics: 'Cache Invalidation, Redis, Kafka, Eventual Consistency, CAP Theorem',
    difficulty: 'Expert',
    tags: ['System Design', 'Backend', 'Distributed Systems'],
    icon: 'Layers',
  },
  {
    category: 'Humanities',
    topic: 'World History: The Scientific Revolution & Enlightenment',
    subtopics: 'Empiricism, Heliocentrism, Social Contract, Galileo, Newton, Voltaire',
    difficulty: 'Beginner',
    tags: ['History', 'Philosophy', 'Science', 'Humanities'],
    icon: 'BookOpen',
  },
];
