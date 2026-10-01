import { TestCase, TestCaseExecutionResult } from '../types';

export function runJavaScriptTestCases(
  userCode: string,
  testCases: TestCase[]
): TestCaseExecutionResult[] {
  const results: TestCaseExecutionResult[] = [];

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const startTime = performance.now();

    try {
      // Create a function runner that executes the user code and calls the test input
      // Wrap in an isolated scope to avoid leaking globals
      const runnerCode = `
        ${userCode}
        try {
          return (${tc.input});
        } catch (e) {
          throw new Error("Evaluation error: " + e.message);
        }
      `;

      // Function constructor is safe for client-side sandbox execution of pure algorithmic logic
      const runFn = new Function(runnerCode);
      const actualVal = runFn();
      const endTime = performance.now();

      // Normalize expected and actual outputs for comparison
      const actualStr = normalizeOutput(actualVal);
      const expectedStr = tc.expectedOutput.trim();

      const passed = areOutputsEqual(actualStr, expectedStr, actualVal);

      results.push({
        testIndex: i,
        input: tc.input,
        expected: expectedStr,
        actual: actualStr,
        passed,
        timeMs: Math.round((endTime - startTime) * 100) / 100,
      });
    } catch (err: any) {
      const endTime = performance.now();
      results.push({
        testIndex: i,
        input: tc.input,
        expected: tc.expectedOutput.trim(),
        actual: 'Error: ' + (err?.message || String(err)),
        passed: false,
        timeMs: Math.round((endTime - startTime) * 100) / 100,
        errorMessage: err?.message || String(err),
      });
    }
  }

  return results;
}

function normalizeOutput(val: any): string {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'function') return val.toString();
  try {
    return JSON.stringify(val);
  } catch {
    return String(val);
  }
}

function areOutputsEqual(actualStr: string, expectedStr: string, actualVal: any): boolean {
  // Direct string equality
  if (actualStr === expectedStr) return true;

  // Unquoted string comparison
  if (actualStr.replace(/^"|"$/g, '') === expectedStr.replace(/^"|"$/g, '')) return true;

  // Boolean or number comparison
  if (String(actualVal) === expectedStr) return true;

  // Parse JSON if possible and compare objects
  try {
    const parsedExpected = JSON.parse(expectedStr);
    const parsedActual = JSON.parse(actualStr);
    return JSON.stringify(parsedExpected) === JSON.stringify(parsedActual);
  } catch {
    // If not valid JSON, check trimmed insensitive match
    return actualStr.trim().toLowerCase() === expectedStr.trim().toLowerCase();
  }
}
