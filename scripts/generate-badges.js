const fs = require('fs')
const path = require('path')
const { makeBadge } = require('badge-maker')

const root = path.join(__dirname, '..')
const config = JSON.parse(fs.readFileSync(path.join(root, 'badges.config.json'), 'utf8'))
const outDir = path.join(root, 'assets', 'badges')

const slug = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

fs.rmSync(outDir, { recursive: true, force: true })
fs.mkdirSync(outDir, { recursive: true })

let count = 0
for (const [group, badges] of Object.entries(config.groups)) {
  for (const b of badges) {
    const svg = makeBadge({
      label: b.label,
      message: b.message,
      color: b.color,
      labelColor: b.labelColor || config.labelColor,
      style: b.style || config.style,
    })
    const file = `${group}-${slug(b.label)}.svg`
    fs.writeFileSync(path.join(outDir, file), svg)
    count++
  }
}
console.log(`${count} badges gerados em assets/badges`)
