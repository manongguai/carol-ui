import { nextZIndex, setZIndex } from './zIndex'

import { expect, test, describe, it } from 'vitest'

describe('zIndex', () => {
  it('nextZIndex should be return zIndex and zIndex+1', () => {
    expect(nextZIndex()).toBe(2000)
    expect(nextZIndex()).toBe(2001)
  })
  it('setZIndex', () => {
    setZIndex(1000)
    expect(nextZIndex()).toBe(1000)
  })
})
