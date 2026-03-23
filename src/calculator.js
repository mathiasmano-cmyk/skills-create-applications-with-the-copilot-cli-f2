#!/usr/bin/env node
'use strict'

// Simple Node.js CLI Calculator
// Supported operations:
// - addition (add or +)
// - subtraction (sub or -)
// - multiplication (mul or * or x)
// - division (div or /)
// - modulo (mod or %)
// - exponentiation/power (pow or ^ or power)
// - square root (sqrt)

// Usage examples:
//   node src/calculator.js add 2 3    # 5
//   node src/calculator.js + 2 3      # 5
//   node src/calculator.js sub 5 2    # 3
//   node src/calculator.js mul 3 4    # 12
//   node src/calculator.js div 8 2    # 4
//   node src/calculator.js mod 10 3   # 1
//   node src/calculator.js pow 2 3    # 8
//   node src/calculator.js sqrt 9     # 3

const [, , op, aRaw, bRaw] = process.argv

function printHelp() {
  console.log('Usage: node src/calculator.js <op> <a> <b>')
  console.log('       node src/calculator.js sqrt <a>  # unary operation')
  console.log('\nOperations:')
  console.log('  add | +        : addition')
  console.log('  sub | -        : subtraction')
  console.log('  mul | * | x    : multiplication')
  console.log('  div | /        : division')
  console.log('  mod | %        : modulo (remainder)')
  console.log('  pow | ^ | power: exponentiation')
  console.log('  sqrt           : square root (unary)')
  console.log('\nExamples:')
  console.log('  node src/calculator.js add 1 2')
  console.log('  node src/calculator.js / 10 2')
  console.log('  node src/calculator.js sqrt 25')
}

if (!op || op === '-h' || op === '--help') {
  printHelp()
  process.exit(0)
}

// Allow 'sqrt' as a unary operation (only one operand)
if (op === 'sqrt') {
  if (aRaw === undefined) {
    console.error('Error: One numeric operand is required for sqrt.')
    printHelp()
    process.exit(2)
  }
} else {
  if (aRaw === undefined || bRaw === undefined) {
    console.error('Error: Two numeric operands are required.')
    printHelp()
    process.exit(2)
  }
}

const a = Number(aRaw)
const b = bRaw === undefined ? undefined : Number(bRaw)

if (!Number.isFinite(a) || (bRaw !== undefined && !Number.isFinite(b))) {
  console.error('Error: Operands must be valid numbers.')
  process.exit(2)
}

const { modulo, power, squareRoot, calculate: libCalculate } = require('./lib/calculator')

function calculate(operator, x, y) {
  // Delegate to library calculate for consistent behavior
  return libCalculate(operator, x, y)
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
  if (/Modulo by zero/.test(err.message)) {
    console.error('Error: Modulo by zero is not allowed.')
    process.exit(3)
  }
  if (/Square root of negative number/.test(err.message)) {
    console.error('Error: Square root of negative number is not allowed.')
    process.exit(3)
  }
  console.error('Error:', err.message)
  printHelp()
  process.exit(2)
}

