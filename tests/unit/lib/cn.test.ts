import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/cn'

describe('cn utility', () => {
  it('combines multiple class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
    expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz')
  })

  it('filters out falsy values', () => {
    expect(cn('foo', null, 'bar')).toBe('foo bar')
    expect(cn('foo', undefined, 'bar')).toBe('foo bar')
    expect(cn('foo', false, 'bar')).toBe('foo bar')
    expect(cn('foo', 0, 'bar')).toBe('foo bar')
    expect(cn('foo', '', 'bar')).toBe('foo bar')
  })

  it('handles arrays of classes', () => {
    expect(cn(['foo', 'bar'])).toBe('foo bar')
    expect(cn('foo', ['bar', 'baz'])).toBe('foo bar baz')
    expect(cn(['foo', null, 'bar'])).toBe('foo bar')
  })

  it('handles nested arrays', () => {
    expect(cn(['foo', ['bar', 'baz']])).toBe('foo bar baz')
    expect(cn(['foo', ['bar', ['baz', 'qux']]])).toBe('foo bar baz qux')
  })

  it('removes duplicate classes', () => {
    expect(cn('foo', 'bar', 'foo')).toBe('foo bar')
    expect(cn('foo bar', 'bar baz')).toBe('foo bar baz')
    expect(cn(['foo', 'bar'], ['bar', 'baz'])).toBe('foo bar baz')
  })

  it('handles empty inputs', () => {
    expect(cn()).toBe('')
    expect(cn('')).toBe('')
    expect(cn([])).toBe('')
    expect(cn(null)).toBe('')
    expect(cn(undefined)).toBe('')
  })

  it('trims whitespace', () => {
    expect(cn('  foo  ', '  bar  ')).toBe('foo bar')
    expect(cn('foo  bar', 'baz')).toBe('foo bar baz')
  })

  it('handles complex combinations', () => {
    expect(
      cn(
        'base-class',
        true && 'conditional-true',
        false && 'conditional-false',
        ['array-class-1', 'array-class-2'],
        null,
        undefined,
        'duplicate-class',
        'duplicate-class'
      )
    ).toBe('base-class conditional-true array-class-1 array-class-2 duplicate-class')
  })

  it('handles number inputs', () => {
    expect(cn('foo', 123, 'bar')).toBe('foo bar')
    expect(cn(456)).toBe('')
  })

  it('preserves order of unique classes', () => {
    expect(cn('a', 'b', 'c', 'a')).toBe('a b c')
    expect(cn('z', 'y', 'x')).toBe('z y x')
  })

  it('handles multiple spaces between classes', () => {
    expect(cn('foo    bar', 'baz')).toBe('foo bar baz')
    // タブ文字のテストは別にする
    expect(cn('foo bar', 'baz')).toBe('foo bar baz')
  })

  it('works with Tailwind-like class names', () => {
    expect(
      cn(
        'px-4 py-2',
        'bg-blue-500 hover:bg-blue-600',
        'text-white',
        'rounded-lg'
      )
    ).toBe('px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg')
  })

  it('handles conditional classes pattern', () => {
    const isActive = true
    const isDisabled = false
    
    expect(
      cn(
        'base',
        isActive && 'active',
        isDisabled && 'disabled'
      )
    ).toBe('base active')
  })
})