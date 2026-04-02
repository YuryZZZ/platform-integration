const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// The directory where feedback logs are stored
const LOG_DIR = path.join(__dirname, '..', '.template-feedback');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Get the issue title/description from CLI args
const title = process.argv.slice(2).join(' ') || 'Unnamed template improvement';

// Helper to sanitize title for filename
const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const filename = `${timestamp}-${slugify(title)}.md`;
const filepath = path.join(LOG_DIR, filename);

// Determine what to log
// If there are uncommitted changes, log them.
// If the working tree is clean, capture the last commit (which likely contains the fix just made).
let status = '';
let diff = '';
let commitMeta = '';

try {
  status = execSync('git status --porcelain', { encoding: 'utf-8' }).trim();
  
  if (status.length > 0) {
    console.log('Uncommitted changes detected. Capturing current working tree diff...');
    diff = execSync('git diff', { encoding: 'utf-8' });
    const stagedDiff = execSync('git diff --cached', { encoding: 'utf-8' });
    diff = stagedDiff + '\n' + diff;
  } else {
    console.log('Working tree clean. Capturing last commit diff...');
    commitMeta = execSync('git log -1', { encoding: 'utf-8' });
    diff = execSync('git show --format="" HEAD', { encoding: 'utf-8' });
  }
} catch (e) {
  console.error('Warning: Error interacting with git.', e.message);
  diff = 'Git diff unavailable.';
}

const markdownContent = `\
# Template Improvement: ${title}

**Date:** ${new Date().toISOString()}

## Intent
*Describe why this change was needed. Why should it be added to the global template?*

## Changes Captured
> This snippet was automatically captured from the project state to help maintainers apply this action to the global template files.

\`\`\`diff
${commitMeta ? commitMeta + '\n' : ''}${diff}
\`\`\`
`;

fs.writeFileSync(filepath, markdownContent, { encoding: 'utf-8' });

console.log(`\n✅ Template feedback captured to: ${filepath}`);
console.log(`Remember: Do not modify the global template files directly inside this instantiated project. Share this feedback log instead!`);
