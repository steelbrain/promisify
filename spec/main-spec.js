/* @flow */

import FS from 'fs'
import { it } from 'jasmine-fix'
import { promisify, promisifyAll } from '../src'

describe('Promisify', function() {
  it('resolves properly', async function() {
    const promisified = promisify(function(arg1, arg2) {
      expect(arg1).toBe('something')
      arg2(null, 'Doge')
    })
    expect(await promisified('something')).toBe('Doge')
  })
  it('throws properly', async function() {
    const promisified = promisify(function(arg1, arg2) {
      expect(arg1).toBe('something')
      arg2(new Error('Much Much Doge'))
    })
    try {
      await promisified('something')
      expect(false).toBe(true)
    } catch (error) {
      expect(error.message).toBe('Much Much Doge')
    }
  })
  describe('throwError as false', function() {
    it('returns normal output when resolved', async function() {
      const promisified = promisify(function(arg1, arg2) {
        expect(arg1).toBe('something')
        arg2(null, 'Doge')
      }, false)
      expect(await promisified('something')).toBe('Doge')
    })
    it('returns false when rejeted', async function() {
      const promisified = promisify(function(arg1, arg2) {
        expect(arg1).toBe('something')
        arg2(new Error('Much Much Doge'))
      }, false)
      expect(await promisified('something')).toBe(false)
    })
    it('returns true if resolved with undefined', async function() {
      const promisified = promisify(function(arg1, arg2) {
        expect(arg1).toBe('something')
        arg2(null)
      }, false)
      expect(await promisified('something')).toBe(true)
    })
  })

  describe('promisifyAll', function() {
    it('creates async functions and returns similar object', async function() {
      const promisedFS = promisifyAll(FS)
      expect(Buffer.isBuffer(await promisedFS.readFileAsync(__filename))).toBe(true)
    })
  })
})
