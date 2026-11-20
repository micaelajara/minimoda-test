const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
try {
  const event = JSON.parse(fs.readFileSync(0, 'utf8'));
  const root = process.cwd();
  const file = path.resolve(root, event.tool_input?.file_path || '.');
  const relative = path.relative(root, file);
  if (!relative.startsWith('tests' + path.sep)) process.exit(0);
  const result = spawnSync('npx', ['playwright', 'test'], {
    cwd: root, stdio: 'inherit'
  });
  if (result.error || result.status !== 0) {
    console.error('La suite no terminó en verde. Revisá el reporte y el diff.');
    process.exit(2);
  }
} catch {
  console.error('No se pudo validar el evento PostToolUse. Revisá el hook.');
  process.exit(2);
}
