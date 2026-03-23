#!/usr/bin/env node
'use strict'

// Simple Node.js CLI Calculator
// Supported operations:
// - addition (add or +)
// - subtraction (sub or -)
// - multiplication (mul or * or x)
// - division (div or /)

// Usage examples:
//   node src/calculator.js add 2 3    # 5
//   node src/calculator.js + 2 3      # 5
//   node src/calculator.js sub 5 2    # 3
//   node src/calculator.js mul 3 4    # 12
//   node src/calculator.js div 8 2    # 4

const [, , op, aRaw, bRaw] = process.argv

function printHelp() {
  console.log('Usage: node src/calculator.js <op> <a> <b>')
  console.log('\nOperations:')
  console.log('  add | +    : addition')
  console.log('  sub | -    : subtraction')
  console.log('  mul | * | x: multiplication')
  console.log('  div | /    : division')
  console.log('\nExamples:')
  console.log('  node src/calculator.js add 1 2')
  console.log('  node src/calculator.js / 10 2')
}

if (!op || op === '-h' || op === '--help') {
  printHelp()
  process.exit(0)
}

if (aRaw === undefined || bRaw === undefined) {
  console.error('Error: Two numeric operands are required.')
  printHelp()
  process.exit(2)
}

const a = Number(aRaw)
const b = Number(bRaw)

if (!Number.isFinite(a) || !Number.isFinite(b)) {
  console.error('Error: Operands must be valid numbers.')
  process.exit(2)
}

function calculate(operator, x, y) {
  switch (operator) {
    case 'add':
    case '+':
      return x + y
    case 'sub':
    case '-':
      return x - y
    case 'mul':
    case '*':
    case 'x':
    case 'X':
      return x * y
    case 'div':
    case '/':
      if (y === 0) {
        throw new Error('Division by zero')
      }
      return x / y
    default:
      throw new Error('Unknown operation: ' + operator)
  }
}

try {
  const result = calculate(op, a, b)
  // Print result to stdout
  console.log(result)
  process.exit(0)
} catch (err) {
  if (/Division by zero/.test(err.message)) {
    console.error('Error: Division by zero is not allowed.')
    process.exit(3)
  }
  console.error('Error:', err.message)
  printHelp()
  process.exit(2)
}

