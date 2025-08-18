// test.js

// Import the function/module you want to test
const { add, subtract } = require('./math'); // replace with your file

// Test cases
console.log('Running tests...\n');

console.log('Test 1: add(2, 3)');
console.log('Expected: 5');
console.log('Got:      ', add(2, 3), '\n');

console.log('Test 2: subtract(5, 3)');
console.log('Expected: 2');
console.log('Got:      ', subtract(5, 3), '\n');

// Simple pass/fail log
function assertEqual(actual, expected, testName) {
    if (actual === expected) {
        console.log(`✅ ${testName} passed`);
    } else {
        console.error(`❌ ${testName} failed (Expected ${expected}, got ${actual})`);
    }
}

// Example assertions
assertEqual(add(2, 3), 5, 'Addition test');
assertEqual(subtract(5, 3), 2, 'Subtraction test');
