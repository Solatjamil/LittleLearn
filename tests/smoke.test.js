import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('LittleLearn build & data smoke', () => {
  it('index.html exists and has correct branding + counts', () => {
    const html = fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8')
    expect(html).toContain('LittleLearn')
    expect(html).toContain('22 worlds')
    expect(html).toContain('6,467')
    expect(html).toContain('Eye-Safe')
    // mobile bootstrapping guards must be present
    expect(html).toContain('overflow-x:hidden')
    expect(html).toContain('minmax(0,1fr)')
  })

  it('content-manifest is v1.5 with 22 modules and 6467 live', () => {
    const m = JSON.parse(fs.readFileSync('data/content-manifest.json','utf8'))
    expect(m.version).toBe('1.5.0')
    expect(m.live_instances).toBe(6467)
    expect(m.modules.length).toBe(22)
    expect(m.modules.find(x=>x.module_id==='ocean_friends')).toBeTruthy()
    expect(m.modules.find(x=>x.module_id==='space_quest')).toBeTruthy()
  })

  it('books and printables are 20 each', () => {
    const b = JSON.parse(fs.readFileSync('data/books.json','utf8'))
    const p = JSON.parse(fs.readFileSync('data/printables.json','utf8'))
    expect(b.books.length).toBe(20)
    expect(p.templates.length).toBe(20)
    expect(b.version).toBe('1.5.0')
    expect(p.version).toBe('1.5.0')
  })

  it('new packs exist and are valid JSON', () => {
    const dc = JSON.parse(fs.readFileSync('data/daily-challenges.json','utf8'))
    const ach = JSON.parse(fs.readFileSync('data/achievements.json','utf8'))
    const weekly = JSON.parse(fs.readFileSync('data/weekly-activities.json','utf8'))
    expect(dc.challenges.length).toBe(10)
    expect(ach.achievements.length).toBe(10)
    expect(weekly.plan.length).toBe(5)
  })

  it('vite build output exists (if built)', () => {
    // dist may not exist on fresh checkout before build — skip if not yet built
    if (!fs.existsSync('dist/index.html')) return
    const built = fs.readFileSync('dist/index.html','utf8')
    expect(built).toContain('LittleLearn')
  })
})
