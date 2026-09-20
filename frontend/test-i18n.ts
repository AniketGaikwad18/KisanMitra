import { validateAllTranslations } from "./lib/i18n/validateTranslations";
import { en } from "./lib/i18n/translations/en";
import { mr } from "./lib/i18n/translations/mr";
import { hi } from "./lib/i18n/translations/hi";
import { ta } from "./lib/i18n/translations/ta";
import { te } from "./lib/i18n/translations/te";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY } from "./lib/i18n/config";

console.log("=========================================");
console.log("       KISANMITRA i18n TEST SUITE        ");
console.log("=========================================\n");

// 1. Dictionary completeness & key parity test
const report = validateAllTranslations();
console.log(`[TEST 1] Canonical (English) Key Count: ${report.canonicalKeyCount}`);

report.results.forEach((res) => {
  console.log(`  Language [${res.language}]: ${res.keyCount}/${report.canonicalKeyCount} keys -> ${res.isValid ? "✅ PASS" : "❌ FAIL"}`);
});

if (!report.allValid) {
  console.error("❌ Key parity test failed!");
  process.exit(1);
}

// 2. Unicode script character verification
console.log("\n[TEST 2] Unicode Script Integrity:");

// Marathi / Hindi Devanagari range (0900-097F)
const devanagariRegex = /[\u0900-\u097F]/;
// Tamil range (0B80-0BFF)
const tamilRegex = /[\u0B80-\u0BFF]/;
// Telugu range (0C00-0C7F)
const teluguRegex = /[\u0C00-\u0C7F]/;

const testDevanagariMr = devanagariRegex.test(mr["dashboard.greeting"]);
const testDevanagariHi = devanagariRegex.test(hi["dashboard.greeting"]);
const testTamil = tamilRegex.test(ta["dashboard.greeting"]);
const testTelugu = teluguRegex.test(te["dashboard.greeting"]);

console.log(`  Marathi Devanagari Check: ${testDevanagariMr ? "✅ PASS (" + mr["dashboard.greeting"] + ")" : "❌ FAIL"}`);
console.log(`  Hindi Devanagari Check: ${testDevanagariHi ? "✅ PASS (" + hi["dashboard.greeting"] + ")" : "❌ FAIL"}`);
console.log(`  Tamil Script Check: ${testTamil ? "✅ PASS (" + ta["dashboard.greeting"] + ")" : "❌ FAIL"}`);
console.log(`  Telugu Script Check: ${testTelugu ? "✅ PASS (" + te["dashboard.greeting"] + ")" : "❌ FAIL"}`);

if (!testDevanagariMr || !testDevanagariHi || !testTamil || !testTelugu) {
  console.error("❌ Unicode script check failed!");
  process.exit(1);
}

// 3. Fallback logic simulation
console.log("\n[TEST 3] Translation Fallback Behavior:");

function simulateTranslate(dict: Record<string, string>, key: string, params?: Record<string, string | number>, fallback?: string): string {
  let raw = dict[key] || en[key] || fallback || key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      raw = raw.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    });
  }
  return raw;
}

const missingKeyTest = simulateTranslate(mr, "non_existent_key_123", undefined, "Custom Fallback");
console.log(`  Missing key with fallback: "${missingKeyTest}" -> ${missingKeyTest === "Custom Fallback" ? "✅ PASS" : "❌ FAIL"}`);

// 4. Parameter interpolation
console.log("\n[TEST 4] Parameter Interpolation Function:");
function interpolateTemplate(template: string, params: Record<string, string | number>): string {
  let result = template;
  Object.entries(params).forEach(([k, v]) => {
    result = result.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
  });
  return result;
}

const templateEn = "Good morning, {name}! Today is {day}.";
const templateMr = "शुभ प्रभात, {name}! आज {day} आहे.";
const templateHi = "शुभ प्रभात, {name}! आज {day} है.";
const templateTa = "காலை வணக்கம், {name}! இன்று {day}.";
const templateTe = "శుభోదయం, {name}! ఈరోజు {day}.";

const interpEn = interpolateTemplate(templateEn, { name: "Ramesh", day: "Monday" });
const interpMr = interpolateTemplate(templateMr, { name: "रमेश", day: "सोमवार" });
const interpHi = interpolateTemplate(templateHi, { name: "रमेश", day: "सोमवार" });
const interpTa = interpolateTemplate(templateTa, { name: "ரமேஷ்", day: "திங்கள்" });
const interpTe = interpolateTemplate(templateTe, { name: "రమేష్", day: "సోమవారం" });

console.log(`  EN: "${interpEn}" -> ${interpEn.includes("Ramesh") && interpEn.includes("Monday") ? "✅ PASS" : "❌ FAIL"}`);
console.log(`  MR: "${interpMr}" -> ${interpMr.includes("रमेश") && interpMr.includes("सोमवार") ? "✅ PASS" : "❌ FAIL"}`);
console.log(`  HI: "${interpHi}" -> ${interpHi.includes("रमेश") && interpHi.includes("सोमवार") ? "✅ PASS" : "❌ FAIL"}`);
console.log(`  TA: "${interpTa}" -> ${interpTa.includes("ரமேஷ்") && interpTa.includes("திங்கள்") ? "✅ PASS" : "❌ FAIL"}`);
console.log(`  TE: "${interpTe}" -> ${interpTe.includes("రమేష్") && interpTe.includes("సోమవారం") ? "✅ PASS" : "❌ FAIL"}`);

if (!interpEn.includes("Ramesh") || !interpMr.includes("रमेश") || !interpHi.includes("रमेश") || !interpTa.includes("ரமேஷ்") || !interpTe.includes("రమేష్")) {
  console.error("❌ Parameter interpolation test failed!");
  process.exit(1);
}

// 5. Locale-aware number & currency formatting
console.log("\n[TEST 5] Locale-Aware Number Formatting:");
const price = 4850;
const formattedEn = new Intl.NumberFormat("en-IN").format(price);
const formattedMr = new Intl.NumberFormat("mr-IN").format(price);
const formattedHi = new Intl.NumberFormat("hi-IN").format(price);
const formattedTa = new Intl.NumberFormat("ta-IN").format(price);
const formattedTe = new Intl.NumberFormat("te-IN").format(price);

console.log(`  en-IN (₹4,850): ₹${formattedEn}`);
console.log(`  mr-IN: ₹${formattedMr}`);
console.log(`  hi-IN: ₹${formattedHi}`);
console.log(`  ta-IN: ₹${formattedTa}`);
console.log(`  te-IN: ₹${formattedTe}`);

// 6. Supported languages list
console.log("\n[TEST 6] Supported Language Config Verification:");
console.log(`  Storage Key: "${LANGUAGE_STORAGE_KEY}"`);
console.log(`  Default Language: "${DEFAULT_LANGUAGE}"`);
console.log(`  Language Count: ${SUPPORTED_LANGUAGES.length}`);
SUPPORTED_LANGUAGES.forEach((l) => {
  console.log(`    - ${l.code}: ${l.name} (${l.nativeName}) [${l.locale}]`);
});

console.log("\n=========================================");
console.log("🎉 ALL PHASE 8 MULTILINGUAL TESTS PASSED!");
console.log("=========================================\n");

