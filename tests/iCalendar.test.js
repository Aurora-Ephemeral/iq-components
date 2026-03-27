import { getKW } from '../src/utils'
import { it, describe, expect } from 'vitest'

describe('getKW', () => {
    it('should return 1 for 2024-01-01', () => {
        expect(getKW('2024-01-01')).toBe(1)
    })

    it('should return 13 for today(26-03-2026)', () => {
        expect(getKW('2026-03-26')).toBe(13)
    })

    it('boundary test: should return 1 for 2024-12-31', () => {
        expect(getKW('2024-12-31')).toBe(1)
    })

    it('boundary test: should return 52 for 2023-12-31', () => {
        expect(getKW('2023-12-31')).toBe(52)
    })
})