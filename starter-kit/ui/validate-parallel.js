/**
 * PARALLEL BROWSER VALIDATOR
 * ==========================
 * Validates ALL project pages simultaneously using multiple browser contexts.
 * Each page runs in its own parallel context for maximum speed.
 *
 * Usage:
 *   node validate-parallel.js                          # Validate all pages
 *   node validate-parallel.js --url https://mysite.com # Custom base URL
 *   node validate-parallel.js --workers 8              # Use 8 parallel workers
 *   node validate-parallel.js --headed                 # Show browsers (debug)
 *
 * Config:
 *   Edit the PAGES array below to define your routes and checks.
 */

const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

// ============================================================
// CONFIGURATION — Edit these for your project
// ============================================================

const BASE_URL = process.argv.includes("--url")
  ? process.argv[process.argv.indexOf("--url") + 1]
  : "https://YOUR_PROJECT_ID.web.app";

const MAX_WORKERS = process.argv.includes("--workers")
  ? parseInt(process.argv[process.argv.indexOf("--workers") + 1])
  : 6; // Default: 6 parallel browsers

const HEADED = process.argv.includes("--headed");

const SCREENSHOT_DIR = path.join(__dirname, "screenshots");

// Define ALL pages to validate.
// Each page can have custom checks.
const PAGES = [
  {
    name: "Home",
    path: "/",
    checks: [
      { type: "title-contains", value: "" },  // any title = loaded
      { type: "no-error" },
      { type: "screenshot" },
    ],
  },
  {
    name: "Search",
    path: "/search",
    checks: [
      { type: "selector-visible", value: "[data-testid='search']" },
      { type: "no-error" },
      { type: "screenshot" },
    ],
  },
  {
    name: "Settings",
    path: "/settings",
    checks: [
      { type: "no-error" },
      { type: "screenshot" },
    ],
  },
  // Add more pages here...
  // {
  //   name: "Dashboard",
  //   path: "/dashboard",
  //   checks: [
  //     { type: "selector-visible", value: "[data-testid='dashboard']" },
  //     { type: "no-error" },
  //     { type: "screenshot" },
  //   ],
  // },
];

// ============================================================
// PARALLEL VALIDATION ENGINE
// ============================================================

async function validatePage(browser, pageConfig) {
  const startTime = Date.now();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();
  const errors = [];
  const consoleErrors = [];

  // Capture console errors
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  // Capture page errors
  page.on("pageerror", (err) => {
    errors.push(`Page error: ${err.message}`);
  });

  const url = `${BASE_URL}${pageConfig.path}`;
  const results = {
    name: pageConfig.name,
    url,
    status: "PASS",
    duration: 0,
    checks: [],
    errors: [],
    screenshot: null,
  };

  try {
    // Navigate
    const response = await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    const httpStatus = response ? response.status() : 0;
    results.checks.push({
      check: "HTTP Status",
      expected: "2xx",
      actual: httpStatus,
      pass: httpStatus >= 200 && httpStatus < 400,
    });

    if (httpStatus >= 400) {
      results.status = "FAIL";
      results.errors.push(`HTTP ${httpStatus}`);
    }

    // Run checks
    for (const check of pageConfig.checks) {
      switch (check.type) {
        case "title-contains": {
          const title = await page.title();
          const pass = check.value ? title.includes(check.value) : title.length > 0;
          results.checks.push({
            check: `Title contains "${check.value || "(any)}"`,
            actual: title,
            pass,
          });
          if (!pass) {
            results.status = "FAIL";
            results.errors.push(`Title mismatch: got "${title}"`);
          }
          break;
        }

        case "selector-visible": {
          try {
            const visible = await page.locator(check.value).first().isVisible({ timeout: 5000 });
            results.checks.push({
              check: `Selector visible: ${check.value}`,
              pass: visible,
            });
            if (!visible) {
              results.status = "WARN";
              results.errors.push(`Selector not visible: ${check.value}`);
            }
          } catch {
            results.checks.push({
              check: `Selector visible: ${check.value}`,
              pass: false,
            });
            results.status = "WARN";
            results.errors.push(`Selector timeout: ${check.value}`);
          }
          break;
        }

        case "selector-text": {
          try {
            const text = await page.locator(check.selector).first().textContent({ timeout: 5000 });
            const pass = text && text.includes(check.value);
            results.checks.push({
              check: `Text "${check.value}" in ${check.selector}`,
              actual: text,
              pass,
            });
            if (!pass) results.status = "WARN";
          } catch {
            results.checks.push({
              check: `Text "${check.value}" in ${check.selector}`,
              pass: false,
            });
            results.status = "WARN";
          }
          break;
        }

        case "no-error": {
          const hasErrors = consoleErrors.length > 0 || errors.length > 0;
          results.checks.push({
            check: "No console/page errors",
            pass: !hasErrors,
            details: hasErrors ? [...consoleErrors, ...errors].slice(0, 5) : undefined,
          });
          if (hasErrors) {
            results.status = "WARN";
            results.errors.push(`${consoleErrors.length + errors.length} error(s) in console`);
          }
          break;
        }

        case "screenshot": {
          fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
          const filename = `${pageConfig.name.toLowerCase().replace(/\s+/g, "_")}.png`;
          const filepath = path.join(SCREENSHOT_DIR, filename);
          await page.screenshot({ path: filepath, fullPage: true });
          results.screenshot = filepath;
          results.checks.push({
            check: "Screenshot captured",
            pass: true,
            file: filename,
          });
          break;
        }

        case "api-health": {
          try {
            const apiResponse = await page.evaluate(async (apiUrl) => {
              const res = await fetch(apiUrl);
              return { status: res.status, ok: res.ok };
            }, check.value);
            results.checks.push({
              check: `API health: ${check.value}`,
              pass: apiResponse.ok,
              actual: apiResponse.status,
            });
            if (!apiResponse.ok) results.status = "WARN";
          } catch (e) {
            results.checks.push({
              check: `API health: ${check.value}`,
              pass: false,
              error: e.message,
            });
            results.status = "WARN";
          }
          break;
        }
      }
    }
  } catch (err) {
    results.status = "FAIL";
    results.errors.push(`Navigation failed: ${err.message}`);
  }

  results.duration = Date.now() - startTime;
  await context.close();
  return results;
}

async function runParallelValidation() {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`  PARALLEL PAGE VALIDATOR`);
  console.log(`  Base URL:  ${BASE_URL}`);
  console.log(`  Pages:     ${PAGES.length}`);
  console.log(`  Workers:   ${MAX_WORKERS}`);
  console.log(`${"=".repeat(60)}\n`);

  const overallStart = Date.now();

  const browser = await chromium.launch({
    headless: !HEADED,
  });

  // Run all pages in parallel (up to MAX_WORKERS at a time)
  const results = [];
  const queue = [...PAGES];
  const running = new Set();

  async function processNext() {
    if (queue.length === 0) return;
    const pageConfig = queue.shift();
    const promise = validatePage(browser, pageConfig).then((result) => {
      running.delete(promise);
      // Print result as it completes
      const icon = result.status === "PASS" ? "✅" : result.status === "WARN" ? "⚠️" : "❌";
      console.log(`${icon} ${result.name.padEnd(20)} ${result.status.padEnd(6)} ${result.duration}ms  ${result.url}`);
      if (result.errors.length > 0) {
        result.errors.forEach((e) => console.log(`   └── ${e}`));
      }
      results.push(result);
    });
    running.add(promise);
    if (running.size < MAX_WORKERS && queue.length > 0) {
      await processNext();
    }
    return promise;
  }

  // Start workers
  const workers = [];
  for (let i = 0; i < Math.min(MAX_WORKERS, PAGES.length); i++) {
    workers.push(processNext());
  }
  await Promise.all(workers);

  // Wait for all remaining
  while (running.size > 0) {
    await Promise.race(running);
  }

  await browser.close();

  // Summary
  const totalDuration = Date.now() - overallStart;
  const passed = results.filter((r) => r.status === "PASS").length;
  const warned = results.filter((r) => r.status === "WARN").length;
  const failed = results.filter((r) => r.status === "FAIL").length;

  console.log(`\n${"=".repeat(60)}`);
  console.log(`  RESULTS: ${passed} passed, ${warned} warnings, ${failed} failed`);
  console.log(`  TOTAL TIME: ${totalDuration}ms (${(totalDuration / 1000).toFixed(1)}s)`);
  console.log(`  SEQUENTIAL ESTIMATED: ${results.reduce((a, r) => a + r.duration, 0)}ms`);
  console.log(`  SPEEDUP: ${(results.reduce((a, r) => a + r.duration, 0) / totalDuration).toFixed(1)}x faster`);
  console.log(`${"=".repeat(60)}\n`);

  // Write JSON report
  const reportPath = path.join(SCREENSHOT_DIR, "validation_report.json");
  fs.writeFileSync(reportPath, JSON.stringify({ timestamp: new Date().toISOString(), baseUrl: BASE_URL, results, summary: { passed, warned, failed, totalDuration } }, null, 2));
  console.log(`Report saved: ${reportPath}`);

  // Exit code
  process.exit(failed > 0 ? 1 : 0);
}

runParallelValidation().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
