export function buildPageSpecParserPrompt(pageSpecMarkdown: string): string {
  return [
    'You are a UI specification parser.',
    'Convert the following page description into structured JSON.',
    'Rules:',
    '- identify page',
    '- identify modules',
    '- identify components',
    '- return valid JSON only',
    '',
    pageSpecMarkdown
  ].join('\n');
}

export function buildLayoutFixPrompt(pageJson: unknown): string {
  return [
    'You are a UI layout optimizer.',
    'Given a page JSON structure, improve layout clarity.',
    'Ensure logical module order, consistent spacing, and valid component hierarchy.',
    JSON.stringify(pageJson)
  ].join('\n\n');
}

export function buildPagePlannerPrompt(prd: string): string {
  return [
    'You are a product design assistant.',
    'Given a PRD, generate page structure including modules and components.',
    prd
  ].join('\n\n');
}
