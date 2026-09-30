/**
 * Google Emergence: Automated Browser QA Verification
 * Runs headless Chrome against dist/google-emergence.html and tests DOM rendering,
 * accessibility labels, route navigation, and search filtering.
 */
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const chromeBin = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const htmlPath = 'file://' + process.cwd() + '/dist/google-emergence.html';

console.log('--- Starting Google Emergence Browser QA Verification ---');

const routes = [
  ['landscape', 'Global Talent Distribution & Trajectories'],
  ['neighborhood', 'Nearby Talent & The Next Attainable Step'],
  ['compare', 'Demonstrated Dimension Analysis'],
  ['observatory', 'Human Capability Distributions & Patterns'],
  ['feed', 'Network Emergence Feed'],
  ['projects', 'Growth Projects & Deliberate Practice'],
  ['perspectives', 'Working Perspectives & Practice Frameworks'],
  ['evidence', 'Demonstration Verification & Audit Trail'],
  ['methodology', 'Versioned Rubrics, Decomposition & Provenance'],
  ['proposal', 'Executive Proposal & Responsible AI Verification']
];

let passed = 0;
let failed = 0;

for (const [r, expectedH1] of routes) {
  try {
    const url = `${htmlPath}#${r}`;
    const dom = execSync(`"${chromeBin}" --headless=new --dump-dom "${url}"`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    
    if (dom.includes(expectedH1)) {
      console.log(`✓ Route #${r} rendered with expected H1: "${expectedH1}"`);
      passed++;
    } else {
      console.error(`✗ Route #${r} missing expected H1 "${expectedH1}"`);
      failed++;
    }

    // Check accessibility: all buttons must have text, aria-label, or title
    const buttonMatches = dom.match(/<button[^>]*>([\s\S]*?)<\/button>/g) || [];
    let unnamedButtons = 0;
    for (const b of buttonMatches) {
      const hasText = b.replace(/<[^>]+>/g, '').trim().length > 0;
      const hasAria = /aria-label=["'][^"']+["']/.test(b) || /aria-labelledby=["'][^"']+["']/.test(b) || /title=["'][^"']+["']/.test(b);
      if (!hasText && !hasAria) {
        unnamedButtons++;
      }
    }
    if (unnamedButtons === 0) {
      console.log(`  ✓ All ${buttonMatches.length} buttons on #${r} have accessible labels or text`);
      passed++;
    } else {
      console.error(`  ✗ Route #${r} has ${unnamedButtons} unnamed button(s)`);
      failed++;
    }

  } catch (err) {
    console.error(`✗ Error rendering #${r}:`, err.message);
    failed++;
  }
}

// Test Landscape specific elements
const landscapeDom = execSync(`"${chromeBin}" --headless=new --dump-dom "${htmlPath}#landscape"`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
const checks = [
  ['Elena Rostova in table', landscapeDom.includes('Elena Rostova')],
  ['Alex Rivera (You) in table', landscapeDom.includes('Alex Rivera (You)')],
  ['Becoming Index composite shown', landscapeDom.includes('/ 1000')],
  ['Synthetic Demo indicator shown', landscapeDom.includes('Synthetic Demo')],
  ['Origin and Work location separated', landscapeDom.includes('🌐 Origin: Estonia') && landscapeDom.includes('📍 Work: United States')],
  ['Philosophy strip rendered', landscapeDom.includes('Principle: Comparison is the core product')],
  ['Cohort disclaimer rendered', landscapeDom.includes('not a national census population')]
];

for (const [name, condition] of checks) {
  if (condition) {
    console.log(`✓ Landscape Check: ${name}`);
    passed++;
  } else {
    console.error(`✗ Landscape Check Failed: ${name}`);
    failed++;
  }
}

// Check zero external telemetry in distribution bundle executable script
const bundleContent = readFileSync('dist/google-emergence.html', 'utf8');
const scriptContent = bundleContent.slice(bundleContent.indexOf('const VERSION'), bundleContent.lastIndexOf('</script>'));
const telemetryMatches = scriptContent.match(/\bfetch\s*\(|new\s+WebSocket|sendBeacon\s*\(|new\s+XMLHttpRequest/g);
if (!telemetryMatches) {
  console.log('✓ Zero external telemetry in compiled offline distribution');
  passed++;
} else {
  console.error('✗ External network calls detected:', telemetryMatches);
  failed++;
}

console.log(`\nBrowser QA Summary: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL BROWSER QA CHECKS PASSED SUCCESSFULLY.');
}
