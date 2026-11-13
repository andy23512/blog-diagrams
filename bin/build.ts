import { execFileSync } from 'child_process';
import { mkdirSync, readdirSync } from 'fs';
import { basename, dirname, join } from 'path';

const root = join(__dirname, '..');
const inDir = join(root, 'diagrams');
const outDir = join(root, 'out');
const mmdc = join(root, 'node_modules', '.bin', 'mmdc');

// Diagrams live in diagrams/<edition>/<name>.mmd and render to out/<edition>/<name>.png.
// Optional args filter by "<edition>/<name>", "<name>" or "<edition>" (e.g. `yarn build zh-tw`).
const filters = new Set(process.argv.slice(2));

const targets = readdirSync(inDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .flatMap((d) =>
    readdirSync(join(inDir, d.name))
      .filter((f) => f.endsWith('.mmd'))
      .map((f) => ({ edition: d.name, name: basename(f, '.mmd') }))
  )
  .filter(
    ({ edition, name }) =>
      filters.size === 0 ||
      filters.has(edition) ||
      filters.has(name) ||
      filters.has(`${edition}/${name}`)
  );

if (targets.length === 0) {
  console.error('No diagrams matched.');
  process.exit(1);
}

for (const { edition, name } of targets) {
  const input = join(inDir, edition, `${name}.mmd`);
  const output = join(outDir, edition, `${name}.png`);
  mkdirSync(dirname(output), { recursive: true });
  console.log(`${edition}/${name}.mmd -> out/${edition}/${name}.png`);
  execFileSync(
    mmdc,
    [
      '-i', input,
      '-o', output,
      '-c', join(root, 'mermaid.config.json'),
      '-p', join(root, 'puppeteer.config.json'),
      // Opaque white background so the image reads well in both HackMD and Hexo, light or dark.
      '-b', 'white',
      // 2x scale for crisp text.
      '-s', '2',
    ],
    { stdio: 'inherit' }
  );
}
