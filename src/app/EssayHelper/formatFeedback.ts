// Formatting utility for AI essay feedback

const SECTION_TITLES = [
  {
    keys: [
      /Sentence-level Edits/i,
      /Sentence-level Suggestions/i,
      /Sentence level Edits/i,
      /Sentence-level Improvements/i
    ],
    label: 'Sentence-level Edits',
  },
  {
    keys: [
      /Structure & Flow Suggestions/i,
      /Structure and Flow Suggestions/i,
      /Structure\/Flow Suggestions/i,
      /Structure and Flow/i
    ],
    label: 'Structure & Flow Suggestions',
  },
  {
    keys: [
      /Final Polish Suggestions/i,
      /Final Polish/i,
      /Polish Suggestions/i
    ],
    label: 'Final Polish Suggestions',
  },
];

function cleanLine(line: string): string {
  // Remove emojis, extra whitespace, jokes/casual phrases, and leading symbols
  return line
    .replace(/^[\s\-\*\d\.\)]+/, '') // Remove leading bullets, numbers, dashes
    .replace(/:[^\w\s]|[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '') // Remove emojis
    .replace(/\s+/g, ' ')
    .replace(/^(Try|Consider|Maybe|You could|Just|Honestly|So,|Hey,|Well,|Like,|Perhaps|Also,|Overall,|Basically|\s+)/i, '')
    .trim();
}

export function formatFeedback(raw: string): Array<{ label: string, bullets: string[] }> {
  if (!raw) return [];
  const lines = raw.split(/\r?\n/);
  let currentSection: string | null = null;
  const sections: Record<string, string[]> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    // Detect section headers
    for (const { keys, label } of SECTION_TITLES) {
      if (keys.some((re) => re.test(line))) {
        currentSection = label;
        if (!sections[label]) sections[label] = [];
        continue;
      }
    }
    // If in a section, add as bullet
    if (currentSection) {
      // Accept lines that look like bullets or are not headers
      if (/^(\-|\*|•|\d+\.|\d+\))/i.test(line) || line.length > 10) {
        const cleaned = cleanLine(line);
        if (cleaned && !/^(Sentence-level Edits|Structure & Flow Suggestions|Final Polish Suggestions)$/i.test(cleaned)) {
          sections[currentSection].push(cleaned);
        }
      }
    }
  }
  // Build output array, omitting empty sections
  return SECTION_TITLES
    .map(({ label }) => ({ label, bullets: sections[label] || [] }))
    .filter(({ bullets }) => bullets.length > 0);
}
